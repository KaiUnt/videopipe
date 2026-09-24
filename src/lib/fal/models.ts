/**
 * Model IDs and input fields checked against the official fal.ai API pages on
 * 2026-09-24. Update this catalog when switching or adding a model.
 */

export type FalTask =
  | "textToVideo"
  | "imageToVideo"
  | "referenceToVideo"
  | "textToImage";

export type FieldRule =
  | { type: "integer"; min?: number; max?: number; required?: boolean }
  | { type: "boolean"; required?: boolean }
  | { type: "string"; required?: boolean; maxLength?: number }
  | { type: "image"; required?: boolean }
  | { type: "images"; required?: boolean; min: number; max: number }
  | { type: "enum"; values: readonly string[]; required?: boolean };

export interface ModelDefinition {
  task: FalTask;
  docsUrl: string;
  media: "video" | "images";
  fields: Record<string, FieldRule>;
  defaults: Record<string, unknown>;
  promptMaxLength?: number;
}

const videoAspectRatios = ["16:9", "9:16", "4:3", "3:4", "1:1"] as const;
const videoResolutions = ["360p", "540p", "720p", "1080p"] as const;

export const MODEL_CATALOG: Record<string, ModelDefinition> = {
  "fal-ai/vidu/q3/text-to-video": {
    task: "textToVideo",
    docsUrl: "https://fal.ai/models/fal-ai/vidu/q3/text-to-video/api",
    media: "video",
    promptMaxLength: 2000,
    fields: {
      duration: { type: "integer", min: 1, max: 16 },
      seed: { type: "integer", min: 0 },
      aspect_ratio: { type: "enum", values: videoAspectRatios },
      resolution: { type: "enum", values: videoResolutions },
      audio: { type: "boolean" },
    },
    defaults: { duration: 5, aspect_ratio: "16:9", resolution: "720p", audio: true },
  },
  "fal-ai/vidu/q3/image-to-video": {
    task: "imageToVideo",
    docsUrl: "https://fal.ai/models/fal-ai/vidu/q3/image-to-video/api",
    media: "video",
    promptMaxLength: 2000,
    fields: {
      image_url: { type: "image", required: true },
      end_image_url: { type: "image" },
      duration: { type: "integer", min: 1, max: 16 },
      seed: { type: "integer", min: 0 },
      resolution: { type: "enum", values: videoResolutions },
      audio: { type: "boolean" },
    },
    defaults: { duration: 5, resolution: "720p", audio: true },
  },
  "fal-ai/vidu/q3/reference-to-video/mix": {
    task: "referenceToVideo",
    docsUrl: "https://fal.ai/models/fal-ai/vidu/q3/reference-to-video/mix/api",
    media: "video",
    promptMaxLength: 2000,
    fields: {
      reference_image_urls: { type: "images", required: true, min: 1, max: 4 },
      duration: { type: "integer", min: 1, max: 16 },
      seed: { type: "integer", min: 0 },
      aspect_ratio: { type: "enum", values: videoAspectRatios },
      resolution: { type: "enum", values: videoResolutions },
      audio: { type: "boolean" },
    },
    defaults: { duration: 5, aspect_ratio: "16:9", resolution: "720p", audio: true },
  },
  "fal-ai/nano-banana-2": {
    task: "textToImage",
    docsUrl: "https://fal.ai/models/fal-ai/nano-banana-2/api",
    media: "images",
    fields: {
      num_images: { type: "integer", min: 1, max: 4 },
      seed: { type: "integer", min: 0 },
      aspect_ratio: {
        type: "enum",
        values: ["auto", "21:9", "16:9", "3:2", "4:3", "5:4", "1:1", "4:5", "3:4", "2:3", "9:16", "4:1", "1:4", "8:1", "1:8"],
      },
      output_format: { type: "enum", values: ["jpeg", "png", "webp"] },
      safety_tolerance: { type: "enum", values: ["1", "2", "3", "4", "5", "6"] },
      system_prompt: { type: "string" },
      resolution: { type: "enum", values: ["0.5K", "1K", "2K", "4K"] },
      limit_generations: { type: "boolean" },
      enable_web_search: { type: "boolean" },
      thinking_level: { type: "enum", values: ["minimal", "high"] },
    },
    defaults: {
      num_images: 1,
      aspect_ratio: "auto",
      output_format: "png",
      resolution: "1K",
      limit_generations: true,
    },
  },
};

export const DEFAULT_MODEL: Record<FalTask, string> = {
  textToVideo: "fal-ai/vidu/q3/text-to-video",
  imageToVideo: "fal-ai/vidu/q3/image-to-video",
  referenceToVideo: "fal-ai/vidu/q3/reference-to-video/mix",
  textToImage: "fal-ai/nano-banana-2",
};
