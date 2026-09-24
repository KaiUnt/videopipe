import { randomUUID } from "node:crypto";
import { access, copyFile, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { FalTask } from "./models";

export interface GeneratedAsset {
  localPath: string;
  publicPath: string;
  remotionPath: string;
  contentType: string;
  bytes: number;
  sha256: string;
}

export interface GenerationRecord {
  shotId: string;
  task: FalTask;
  model: string;
  docsUrl: string;
  prompt: string;
  parameters: Record<string, unknown>;
  reason?: string;
  fingerprint: string;
  planHash: string;
  createdAt: string;
  requestId: string;
  status: "pending" | "complete";
  assets: GeneratedAsset[];
  reusedFrom?: string;
}

export interface GenerationManifest {
  version: 1;
  generations: GenerationRecord[];
}

const emptyManifest = (): GenerationManifest => ({ version: 1, generations: [] });

export function manifestPath(projectRoot = process.cwd()): string {
  return join(projectRoot, "generated", "manifest.json");
}

export async function readGenerationManifest(projectRoot = process.cwd()): Promise<GenerationManifest> {
  try {
    const parsed = JSON.parse((await readFile(manifestPath(projectRoot), "utf8")).replace(/^\uFEFF/, "")) as unknown;
    if (typeof parsed !== "object" || parsed === null || !("version" in parsed) || parsed.version !== 1 ||
      !("generations" in parsed) || !Array.isArray(parsed.generations)) {
      throw new Error("Unsupported generated/manifest.json format");
    }
    return parsed as GenerationManifest;
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
      return emptyManifest();
    }
    throw error;
  }
}

export async function writeGenerationManifest(manifest: GenerationManifest, projectRoot = process.cwd()): Promise<void> {
  const path = manifestPath(projectRoot);
  await mkdir(dirname(path), { recursive: true });
  const temp = path + "." + randomUUID() + ".tmp";
  await writeFile(temp, JSON.stringify(manifest, null, 2) + "\n", { encoding: "utf8", flag: "wx" });
  await rename(temp, path);
}

export function sanitizeParameters(parameters: Record<string, unknown>): Record<string, unknown> {
  const sanitize = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(sanitize);
    if (typeof value === "string") {
      if (value.startsWith("data:")) return "<data-uri>";
      if (/^https?:\/\//i.test(value)) {
        try {
          const url = new URL(value);
          return url.origin + url.pathname;
        } catch {
          return "<invalid-url>";
        }
      }
      return value;
    }
    return value;
  };
  return Object.fromEntries(Object.entries(parameters).map(([key, value]) => [key, sanitize(value)]));
}

export async function isReusable(record: GenerationRecord, projectRoot = process.cwd()): Promise<boolean> {
  if (record.status !== "complete" || record.assets.length === 0) return false;
  for (const asset of record.assets) {
    try {
      await access(join(projectRoot, asset.localPath));
    } catch {
      return false;
    }
  }
  return true;
}

export async function ensurePublicCopies(record: GenerationRecord, projectRoot = process.cwd()): Promise<void> {
  for (const asset of record.assets) {
    const source = join(projectRoot, asset.localPath);
    const destination = join(projectRoot, asset.publicPath);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(source, destination);
  }
}

export function addOrReplaceRecord(manifest: GenerationManifest, record: GenerationRecord): void {
  const index = manifest.generations.findIndex((item) => item.shotId === record.shotId && item.fingerprint === record.fingerprint);
  if (index < 0) manifest.generations.push(record);
  else manifest.generations[index] = record;
}
