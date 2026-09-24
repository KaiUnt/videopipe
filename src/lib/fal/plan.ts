import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";
import { DEFAULT_MODEL, MODEL_CATALOG, type FalTask, type FieldRule, type ModelDefinition } from "./models";

export interface GenerationShot {
  id: string;
  task: FalTask;
  prompt: string;
  model?: string;
  parameters?: Record<string, unknown>;
  reason?: string;
  durationInFrames?: number;
}

export interface GenerationPlan {
  version: 1;
  shots: GenerationShot[];
}

export interface PreparedShot {
  id: string;
  task: FalTask;
  prompt: string;
  model: string;
  modelDefinition: ModelDefinition;
  input: Record<string, unknown>;
  reason?: string;
  durationInFrames: number;
  fingerprint: string;
}

export interface PreparedPlan {
  version: 1;
  shots: PreparedShot[];
  planHash: string;
}

const tasks: FalTask[] = ["textToVideo", "imageToVideo", "referenceToVideo", "textToImage"];
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".heic", ".heif"]);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (isObject(value)) {
    return "{" + Object.keys(value).sort().map((key) => JSON.stringify(key) + ":" + canonical(value[key])).join(",") + "}";
  }
  return JSON.stringify(value) ?? "null";
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function assertField(name: string, value: unknown, rule: FieldRule): void {
  if (value === undefined) {
    if (rule.required) throw new Error("Missing required parameter: " + name);
    return;
  }
  if (rule.type === "integer") {
    if (!Number.isInteger(value) || (rule.min !== undefined && (value as number) < rule.min) || (rule.max !== undefined && (value as number) > rule.max)) {
      throw new Error("Invalid integer parameter: " + name);
    }
  } else if (rule.type === "boolean") {
    if (typeof value !== "boolean") throw new Error("Invalid boolean parameter: " + name);
  } else if (rule.type === "string" || rule.type === "image") {
    if (typeof value !== "string" || !value.trim() || (rule.type === "string" && rule.maxLength !== undefined && value.length > rule.maxLength)) {
      throw new Error("Invalid string parameter: " + name);
    }
  } else if (rule.type === "images") {
    if (!Array.isArray(value) || value.length < rule.min || value.length > rule.max || value.some((item) => typeof item !== "string" || !item.trim())) {
      throw new Error("Invalid image list parameter: " + name);
    }
  } else if (rule.type === "enum") {
    if (typeof value !== "string" || !rule.values.includes(value)) {
      throw new Error("Invalid " + name + "; allowed: " + rule.values.join(", "));
    }
  }
}

export function resolveLocalImage(value: string, projectRoot: string): string | undefined {
  if (value.startsWith("https://")) return undefined;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) && !isAbsolute(value)) {
    throw new Error("Image inputs must be HTTPS URLs or project-local file paths: " + value);
  }
  const root = resolve(projectRoot);
  const path = resolve(root, value);
  const rel = relative(root, path);
  if (rel === ".." || rel.startsWith("../") || rel.startsWith("..\\") || isAbsolute(rel)) {
    throw new Error("Local image is outside the project: " + value);
  }
  return path;
}

async function fileDigest(path: string): Promise<string> {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}

async function imageIdentity(value: string, projectRoot: string): Promise<unknown> {
  const path = resolveLocalImage(value, projectRoot);
  if (!path) return value;
  const file = await stat(path);
  if (!file.isFile()) throw new Error("Image input is not a file: " + value);
  const extension = path.slice(path.lastIndexOf(".")).toLowerCase();
  if (!imageExtensions.has(extension)) throw new Error("Unsupported local image type: " + value);
  return { localPath: relative(resolve(projectRoot), path).replaceAll("\\", "/"), sha256: await fileDigest(path) };
}

function fallbackFrames(definition: ModelDefinition, input: Record<string, unknown>): number {
  if (definition.media === "images") return 90;
  return (typeof input.duration === "number" ? input.duration : 5) * 30;
}

export async function preparePlan(raw: unknown, projectRoot = process.cwd()): Promise<PreparedPlan> {
  if (!isObject(raw) || raw.version !== 1 || !Array.isArray(raw.shots) || raw.shots.length === 0) {
    throw new Error("Plan must be { version: 1, shots: [...] } with at least one shot");
  }
  const ids = new Set<string>();
  const shots: PreparedShot[] = [];
  for (const item of raw.shots) {
    if (!isObject(item)) throw new Error("Each shot must be an object");
    const id = item.id;
    const task = item.task;
    const prompt = item.prompt;
    if (typeof id !== "string" || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(id)) {
      throw new Error("Shot id must use lowercase letters, digits, or hyphens (1-64 chars)");
    }
    if (ids.has(id)) throw new Error("Duplicate shot id: " + id);
    ids.add(id);
    if (typeof task !== "string" || !tasks.includes(task as FalTask)) {
      throw new Error("Unknown task for " + id + ": " + String(task));
    }
    if (typeof prompt !== "string" || !prompt.trim()) throw new Error("Missing prompt for " + id);
    const model = item.model === undefined ? DEFAULT_MODEL[task as FalTask] : item.model;
    if (typeof model !== "string" || !(model in MODEL_CATALOG)) {
      throw new Error("Unknown model for " + id + "; add a documented model to src/lib/fal/models.ts");
    }
    const definition = MODEL_CATALOG[model];
    if (definition.task !== task) throw new Error("Model " + model + " does not support " + task);
    if (definition.promptMaxLength !== undefined && prompt.length > definition.promptMaxLength) {
      throw new Error("Prompt too long for model " + model);
    }
    if (item.reason !== undefined && typeof item.reason !== "string") throw new Error("reason must be a string for " + id);
    if (item.durationInFrames !== undefined && (!Number.isInteger(item.durationInFrames) || (item.durationInFrames as number) < 30)) {
      throw new Error("durationInFrames must be an integer of at least 30 for " + id);
    }
    const parameters = item.parameters === undefined ? {} : item.parameters;
    if (!isObject(parameters)) throw new Error("parameters must be an object for " + id);
    for (const key of Object.keys(parameters)) {
      if (!(key in definition.fields)) throw new Error("Undocumented parameter " + key + " for " + model);
    }
    const input: Record<string, unknown> = { ...definition.defaults, ...parameters, prompt };
    for (const [key, rule] of Object.entries(definition.fields)) {
      assertField(key, input[key], rule);
    }
    if (task === "imageToVideo" && input.end_image_url !== undefined && input.resolution === "360p") {
      throw new Error("360p is unavailable with end_image_url for " + model);
    }
    const identityInput: Record<string, unknown> = { ...input };
    for (const [key, rule] of Object.entries(definition.fields)) {
      if (rule.type === "image" && typeof input[key] === "string") {
        identityInput[key] = await imageIdentity(input[key] as string, projectRoot);
      } else if (rule.type === "images" && Array.isArray(input[key])) {
        identityInput[key] = await Promise.all((input[key] as string[]).map((value) => imageIdentity(value, projectRoot)));
      }
    }
    const fingerprint = sha256(canonical({ task, model, input: identityInput }));
    shots.push({
      id,
      task: task as FalTask,
      prompt,
      model,
      modelDefinition: definition,
      input,
      reason: item.reason as string | undefined,
      durationInFrames: (item.durationInFrames as number | undefined) ?? fallbackFrames(definition, input),
      fingerprint,
    });
  }
  const planHash = sha256(canonical({ version: 1, shots: shots.map(({ id, task, model, fingerprint, reason, durationInFrames }) => ({
    id, task, model, fingerprint, reason, durationInFrames,
  })) }));
  return { version: 1, shots, planHash };
}

export async function loadPlan(path: string): Promise<unknown> {
  return JSON.parse((await readFile(path, "utf8")).replace(/^\uFEFF/, "")) as unknown;
}
