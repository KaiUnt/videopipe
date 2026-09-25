import { createHash, randomUUID } from "node:crypto";
import { File } from "node:buffer";
import { createReadStream, createWriteStream } from "node:fs";
import { copyFile, mkdir, rename, stat } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import {
  addOrReplaceRecord,
  ensurePublicCopies,
  isReusable,
  readGenerationManifest,
  sanitizeParameters,
  writeGenerationManifest,
  type GeneratedAsset,
  type GenerationManifest,
  type GenerationRecord,
} from "./catalog";
import { DEFAULT_MODEL, MODEL_CATALOG, type FalTask } from "./models";
import { preparePlan, resolveLocalImage, type PreparedPlan, type PreparedShot } from "./plan";

export { DEFAULT_MODEL, MODEL_CATALOG };
export { loadPlan, preparePlan, type GenerationPlan, type GenerationShot } from "./plan";
export { manifestPath, readGenerationManifest, type GeneratedAsset, type GenerationManifest, type GenerationRecord } from "./catalog";
export type { FalTask } from "./models";

interface FalResult {
  data: unknown;
  requestId: string;
}

interface FalApi {
  queue: {
    submit(model: string, options: { input: Record<string, unknown> }): Promise<{ request_id: string }>;
    subscribeToStatus(model: string, options: { requestId: string; mode: "polling" }): Promise<unknown>;
    result(model: string, options: { requestId: string }): Promise<FalResult>;
  };
  storage: {
    upload(file: File): Promise<string>;
  };
}

async function getFal(): Promise<FalApi> {
  if (!process.env.FAL_KEY?.trim()) {
    throw new Error("FAL_KEY is required for approved generation. Dry-run works without it.");
  }
  const sdk = await import("@fal-ai/client");
  return sdk.fal as unknown as FalApi;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function resultFiles(shot: PreparedShot, data: unknown): Array<{ url: string; contentType?: string }> {
  if (!isObject(data)) throw new Error("fal.ai returned no result object for " + shot.id);
  const candidates = shot.modelDefinition.media === "video" ? [data.video] : data.images;
  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new Error("fal.ai returned no " + shot.modelDefinition.media + " for " + shot.id);
  }
  return candidates.map((item, index) => {
    if (!isObject(item) || typeof item.url !== "string") {
      throw new Error("fal.ai result file " + index + " has no URL for " + shot.id);
    }
    const url = new URL(item.url);
    if (url.protocol !== "https:") throw new Error("fal.ai result URL must be HTTPS");
    return { url: item.url, contentType: typeof item.content_type === "string" ? item.content_type : undefined };
  });
}

function outputExtension(shot: PreparedShot, contentType?: string): string {
  if (shot.modelDefinition.media === "video") return ".mp4";
  const format = shot.input.output_format;
  if (format === "jpeg") return ".jpg";
  if (format === "webp") return ".webp";
  if (format === "png") return ".png";
  if (contentType === "image/jpeg") return ".jpg";
  if (contentType === "image/webp") return ".webp";
  return ".png";
}

async function digestFile(path: string): Promise<string> {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}

async function downloadAsset(
  shot: PreparedShot,
  remote: { url: string; contentType?: string },
  index: number,
  projectRoot: string,
): Promise<GeneratedAsset> {
  const response = await fetch(remote.url);
  if (!response.ok || !response.body) throw new Error("Asset download failed: HTTP " + response.status);
  const mediaFolder = shot.modelDefinition.media === "video" ? "video" : "images";
  const extension = outputExtension(shot, remote.contentType);
  const suffix = index === 0 ? "" : "-" + String(index + 1).padStart(2, "0");
  const name = shot.id + "-" + shot.fingerprint.slice(0, 12) + suffix + extension;
  const remotionPath = "generated/" + mediaFolder + "/" + name;
  const localPath = remotionPath;
  const publicPath = "public/" + remotionPath;
  const destination = join(projectRoot, localPath);
  const mirror = join(projectRoot, publicPath);
  await mkdir(dirname(destination), { recursive: true });
  await mkdir(dirname(mirror), { recursive: true });
  const temp = destination + "." + randomUUID() + ".tmp";
  try {
    await pipeline(
      Readable.fromWeb(response.body as unknown as NodeReadableStream),
      createWriteStream(temp, { flags: "wx" }),
    );
    const bytes = (await stat(temp)).size;
    if (bytes === 0) throw new Error("fal.ai returned an empty asset for " + shot.id);
    const sha256 = await digestFile(temp);
    await rename(temp, destination);
    await copyFile(destination, mirror);
    return {
      localPath,
      publicPath,
      remotionPath,
      contentType: remote.contentType ?? response.headers.get("content-type") ?? (extension === ".mp4" ? "video/mp4" : "image/" + extension.slice(1)),
      bytes,
      sha256,
    };
  } catch (error) {
    const { rm } = await import("node:fs/promises");
    await rm(temp, { force: true });
    throw error;
  }
}

function mimeFromPath(path: string): string {
  switch (extname(path).toLowerCase()) {
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".png": return "image/png";
    case ".webp": return "image/webp";
    case ".gif": return "image/gif";
    case ".avif": return "image/avif";
    case ".heic": return "image/heic";
    case ".heif": return "image/heif";
    default: throw new Error("Unsupported image file: " + path);
  }
}

async function uploadImage(value: string, fal: FalApi, projectRoot: string): Promise<string> {
  const path = resolveLocalImage(value, projectRoot);
  if (!path) return value;
  const { readFile } = await import("node:fs/promises");
  const bytes = await readFile(path);
  return fal.storage.upload(new File([bytes], basename(path), { type: mimeFromPath(path) }));
}

async function inputWithUploadedImages(shot: PreparedShot, fal: FalApi, projectRoot: string): Promise<Record<string, unknown>> {
  const input = { ...shot.input };
  for (const [name, rule] of Object.entries(shot.modelDefinition.fields)) {
    if (rule.type === "image" && typeof input[name] === "string") {
      input[name] = await uploadImage(input[name] as string, fal, projectRoot);
    } else if (rule.type === "images" && Array.isArray(input[name])) {
      input[name] = await Promise.all((input[name] as string[]).map((value) => uploadImage(value, fal, projectRoot)));
    }
  }
  return input;
}

function makeRecord(shot: PreparedShot, planHash: string, requestId: string): GenerationRecord {
  const { prompt: _prompt, ...parameters } = shot.input;
  return {
    shotId: shot.id,
    task: shot.task,
    model: shot.model,
    docsUrl: shot.modelDefinition.docsUrl,
    prompt: shot.prompt,
    parameters: sanitizeParameters(parameters),
    reason: shot.reason,
    fingerprint: shot.fingerprint,
    planHash,
    createdAt: new Date().toISOString(),
    requestId,
    status: "pending",
    assets: [],
  };
}

async function findReusable(manifest: GenerationManifest, fingerprint: string, projectRoot: string): Promise<GenerationRecord | undefined> {
  for (const record of manifest.generations.slice().reverse()) {
    if (record.fingerprint === fingerprint && await isReusable(record, projectRoot)) return record;
  }
  return undefined;
}

const pricingCheckedAt = "2026-09-25";
const pricingMaxAgeMs = 7 * 24 * 60 * 60 * 1000;

function estimateCostUsd(shot: PreparedShot): number | null {
  const age = Date.now() - Date.parse(pricingCheckedAt + "T00:00:00Z");
  if (age < 0 || age > pricingMaxAgeMs) return null;
  if (shot.model === "fal-ai/kling-video/v3/pro/image-to-video") {
    const seconds = Number(shot.input.duration);
    if (!Number.isFinite(seconds)) return null;
    return Math.round(seconds * (shot.input.generate_audio === false ? 0.112 : 0.168) * 1000) / 1000;
  }
  if (shot.model.startsWith("fal-ai/vidu/q3/")) {
    const seconds = shot.input.duration;
    const resolution = shot.input.resolution;
    if (typeof seconds !== "number" || typeof resolution !== "string") return null;
    const rate = resolution === "360p" || resolution === "540p" ? 0.07 : 0.07 * 2.2;
    return Math.round(seconds * rate * 1000) / 1000;
  }
  if ((shot.model === "fal-ai/nano-banana-2" || shot.model === "fal-ai/nano-banana-2/edit") &&
    shot.input.limit_generations === true &&
    shot.input.enable_web_search !== true &&
    shot.input.thinking_level === undefined) {
    const count = shot.input.num_images;
    const resolution = shot.input.resolution;
    if (typeof count !== "number") return null;
    const scale = resolution === "0.5K" ? 0.75 : resolution === "2K" ? 1.5 : resolution === "4K" ? 2 : 1;
    return Math.round(count * 0.08 * scale * 1000) / 1000;
  }
  return null;
}
export interface DryRunShot {
  id: string;
  task: FalTask;
  model: string;
  prompt: string;
  parameters: Record<string, unknown>;
  reason?: string;
  durationInFrames: number;
  docsUrl: string;
  estimatedCostUsd: number | null;
  pricingUrl: string;
  reusable: boolean;
  remotionPaths: string[];
}

export interface DryRunResult {
  planHash: string;
  shots: DryRunShot[];
  pricingNote: string;
}

export async function dryRun(rawPlan: unknown, projectRoot = process.cwd()): Promise<DryRunResult> {
  const plan = await preparePlan(rawPlan, projectRoot);
  const manifest = await readGenerationManifest(projectRoot);
  const shots: DryRunShot[] = [];
  for (const shot of plan.shots) {
    const existing = await findReusable(manifest, shot.fingerprint, projectRoot);
    const { prompt: _prompt, ...parameters } = shot.input;
    shots.push({
      id: shot.id,
      task: shot.task,
      model: shot.model,
      prompt: shot.prompt,
      parameters: sanitizeParameters(parameters),
      reason: shot.reason,
      durationInFrames: shot.durationInFrames,
      docsUrl: shot.modelDefinition.docsUrl,
      estimatedCostUsd: existing ? 0 : estimateCostUsd(shot),
      pricingUrl: shot.modelDefinition.docsUrl.replace(/\/api$/, ""),
      reusable: Boolean(existing),
      remotionPaths: existing?.assets.map((asset) => asset.remotionPath) ?? [],
    });
  }
  return {
    planHash: plan.planHash,
    shots,
    pricingNote: "Approximate USD estimates use official model pages checked " + pricingCheckedAt + " and expire after 7 days. Null means nicht verlässlich verfügbar. Verify live pricing before approval.",
  };
}

async function generateShot(
  shot: PreparedShot,
  plan: PreparedPlan,
  manifest: GenerationManifest,
  projectRoot: string,
): Promise<GenerationRecord> {
  const existing = await findReusable(manifest, shot.fingerprint, projectRoot);
  if (existing) {
    await ensurePublicCopies(existing, projectRoot);
    if (existing.shotId === shot.id) return existing;
    const alias: GenerationRecord = {
      ...existing,
      shotId: shot.id,
      planHash: plan.planHash,
      reusedFrom: existing.shotId,
    };
    addOrReplaceRecord(manifest, alias);
    await writeGenerationManifest(manifest, projectRoot);
    return alias;
  }

  const fal = await getFal();
  let pending = manifest.generations.find((item) => item.shotId === shot.id && item.fingerprint === shot.fingerprint && item.status === "pending" && item.requestId);
  if (!pending) {
    const input = await inputWithUploadedImages(shot, fal, projectRoot);
    const queued = await fal.queue.submit(shot.model, { input });
    if (!queued.request_id) throw new Error("fal.ai returned no request ID for " + shot.id);
    pending = makeRecord(shot, plan.planHash, queued.request_id);
    addOrReplaceRecord(manifest, pending);
    await writeGenerationManifest(manifest, projectRoot);
  }
  // A pending request is resumed by ID, never submitted again.
  await fal.queue.subscribeToStatus(shot.model, { requestId: pending.requestId, mode: "polling" });
  let result: Awaited<ReturnType<FalApi["queue"]["result"]>>;
  try {
    result = await fal.queue.result(shot.model, { requestId: pending.requestId });
  } catch (error) {
    // A finished request with an error result will never yield media; record it as
    // failed so a later, separately approved run submits a new request.
    const failed: GenerationRecord = { ...pending, status: "failed", error: String((error as Error)?.message ?? error) };
    addOrReplaceRecord(manifest, failed);
    await writeGenerationManifest(manifest, projectRoot);
    throw new Error("fal.ai request " + pending.requestId + " for " + shot.id + " failed: " + failed.error);
  }
  const files = resultFiles(shot, result.data);
  const assets: GeneratedAsset[] = [];
  for (let index = 0; index < files.length; index++) {
    assets.push(await downloadAsset(shot, files[index], index, projectRoot));
  }
  const complete: GenerationRecord = { ...pending, status: "complete", assets };
  addOrReplaceRecord(manifest, complete);
  await writeGenerationManifest(manifest, projectRoot);
  return complete;
}

/**
 * The caller must pass the exact hash from a reviewed dry-run. The hash changes
 * whenever the plan or local reference images change.
 */
export async function generateApprovedPlan(
  rawPlan: unknown,
  approvedPlanHash: string,
  projectRoot = process.cwd(),
): Promise<GenerationRecord[]> {
  const plan = await preparePlan(rawPlan, projectRoot);
  if (!approvedPlanHash || approvedPlanHash !== plan.planHash) {
    throw new Error("Approval hash mismatch. Run dry-run again and obtain explicit user approval for this exact plan.");
  }
  const manifest = await readGenerationManifest(projectRoot);
  const records: GenerationRecord[] = [];
  for (const shot of plan.shots) {
    records.push(await generateShot(shot, plan, manifest, projectRoot));
  }
  return records;
}

export interface RemotionMediaShot {
  id: string;
  kind: "media";
  durationInFrames: number;
  asset: { path: string; type: "video" | "image" };
}

export async function remotionPropsFromPlan(rawPlan: unknown, projectRoot = process.cwd()): Promise<{ shots: RemotionMediaShot[] }> {
  const plan = await preparePlan(rawPlan, projectRoot);
  const manifest = await readGenerationManifest(projectRoot);
  const shots: RemotionMediaShot[] = [];
  for (const planned of plan.shots) {
    const record = await findReusable(manifest, planned.fingerprint, projectRoot);
    if (!record) throw new Error("No completed local generation for " + planned.id);
    await ensurePublicCopies(record, projectRoot);
    const asset = record.assets[0];
    shots.push({
      id: planned.id,
      kind: "media",
      durationInFrames: planned.durationInFrames,
      asset: { path: asset.remotionPath, type: planned.modelDefinition.media === "video" ? "video" : "image" },
    });
  }
  return { shots };
}

export function mergeRemotionProps(base: unknown, generated: { shots: RemotionMediaShot[] }): Record<string, unknown> {
  if (!isObject(base) || !Array.isArray(base.shots)) {
    throw new Error("Base Remotion props must contain a shots array");
  }
  const shots: Array<Record<string, unknown> & { id: string }> = base.shots.map((item): Record<string, unknown> & { id: string } => {
    if (!isObject(item) || typeof item.id !== "string") throw new Error("Invalid base Remotion shot");
    return { ...item, id: item.id };
  });
  const ids = new Set<string>();
  for (const shot of shots) {
    if (ids.has(shot.id)) throw new Error("Duplicate base Remotion shot id: " + shot.id);
    ids.add(shot.id);
  }
  for (const generatedShot of generated.shots) {
    const index = shots.findIndex((shot) => shot.id === generatedShot.id);
    if (index < 0) {
      shots.push({ ...generatedShot });
      continue;
    }
    const shot = shots[index];
    if (shot.kind !== "media" && shot.kind !== "mockup") {
      throw new Error("Generated asset can replace only media or mockup shot: " + generatedShot.id);
    }
    const previousAsset = isObject(shot.asset) ? shot.asset : {};
    shots[index] = {
      ...shot,
      durationInFrames: shot.durationInFrames ?? generatedShot.durationInFrames,
      asset: { ...previousAsset, ...generatedShot.asset },
    };
  }
  return { ...base, shots };
}

export async function writeRemotionProps(
  rawPlan: unknown,
  outputPath: string,
  projectRoot = process.cwd(),
  baseProps?: unknown,
): Promise<void> {
  const generated = await remotionPropsFromPlan(rawPlan, projectRoot);
  const props = baseProps === undefined ? generated : mergeRemotionProps(baseProps, generated);
  await mkdir(dirname(outputPath), { recursive: true });
  const { writeFile } = await import("node:fs/promises");
  await writeFile(outputPath, JSON.stringify(props, null, 2) + "\n", "utf8");
}

export async function textToVideo(prompt: string, parameters: Record<string, unknown>, approvedPlanHash: string, id = "text-to-video", projectRoot = process.cwd()): Promise<GenerationRecord> {
  return (await generateApprovedPlan({ version: 1, shots: [{ id, task: "textToVideo", prompt, parameters }] }, approvedPlanHash, projectRoot))[0];
}

export async function imageToVideo(prompt: string, parameters: Record<string, unknown>, approvedPlanHash: string, id = "image-to-video", projectRoot = process.cwd()): Promise<GenerationRecord> {
  return (await generateApprovedPlan({ version: 1, shots: [{ id, task: "imageToVideo", prompt, parameters }] }, approvedPlanHash, projectRoot))[0];
}

export async function referenceToVideo(prompt: string, parameters: Record<string, unknown>, approvedPlanHash: string, id = "reference-to-video", projectRoot = process.cwd()): Promise<GenerationRecord> {
  return (await generateApprovedPlan({ version: 1, shots: [{ id, task: "referenceToVideo", prompt, parameters }] }, approvedPlanHash, projectRoot))[0];
}

export async function textToImage(prompt: string, parameters: Record<string, unknown>, approvedPlanHash: string, id = "text-to-image", projectRoot = process.cwd()): Promise<GenerationRecord> {
  return (await generateApprovedPlan({ version: 1, shots: [{ id, task: "textToImage", prompt, parameters }] }, approvedPlanHash, projectRoot))[0];
}
