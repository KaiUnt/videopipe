import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  dryRun,
  generateApprovedPlan,
  loadPlan,
  writeRemotionProps,
} from "../src/lib/fal/index";

const projectRoot = process.cwd();

function usage(): never {
  throw new Error(
    "Usage:\n" +
    "  npm run fal -- dry-run <plan.json>\n" +
    "  npm run fal -- generate <plan.json> --approved <hash-from-dry-run> [--base <props.json>]\n" +
    "  npm run fal -- props <plan.json> [--base <props.json>] [--out <path>]",
  );
}

function option(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  if (!args[index + 1] || args[index + 1].startsWith("--")) usage();
  return args[index + 1];
}

async function loadEnvKey(): Promise<void> {
  if (process.env.FAL_KEY?.trim()) return;
  let content: string;
  try {
    content = await readFile(join(projectRoot, ".env"), "utf8");
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") return;
    throw error;
  }
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?FAL_KEY\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    let value = match[1];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "").trim();
    }
    if (value) process.env.FAL_KEY = value;
    return;
  }
}

async function main(): Promise<void> {
  const [command, planFile, ...args] = process.argv.slice(2);
  if (!command || !planFile) usage();
  const plan = await loadPlan(resolve(planFile));
  if (command === "dry-run") {
    if (args.length !== 0) usage();
    const result = await dryRun(plan, projectRoot);
    console.log(JSON.stringify(result, null, 2));
    console.log("\nAfter user approval, pass this exact plan hash with --approved: " + result.planHash);
    return;
  }
  if (command === "generate") {
    const approved = option(args, "--approved");
    const base = option(args, "--base");
    if (!approved || !/^[a-f0-9]{64}$/.test(approved) || args.length !== (base ? 4 : 2)) usage();
    await loadEnvKey();
    const records = await generateApprovedPlan(plan, approved, projectRoot);
    const propsPath = join(projectRoot, "generated", "remotion-props.json");
    const baseProps = base ? await loadPlan(resolve(base)) : undefined;
    await writeRemotionProps(plan, propsPath, projectRoot, baseProps);
    console.log(JSON.stringify({
      generated: records.map((record) => ({
        shotId: record.shotId,
        model: record.model,
        requestId: record.requestId,
        reusedFrom: record.reusedFrom,
        assets: record.assets.map((asset) => asset.remotionPath),
      })),
      propsPath,
      render: "npm run render -- --props=generated/remotion-props.json",
    }, null, 2));
    return;
  }
  if (command === "props") {
    const output = option(args, "--out");
    const base = option(args, "--base");
    if (args.length !== (output ? 2 : 0) + (base ? 2 : 0)) usage();
    const propsPath = output ? resolve(output) : join(projectRoot, "generated", "remotion-props.json");
    const baseProps = base ? await loadPlan(resolve(base)) : undefined;
    await writeRemotionProps(plan, propsPath, projectRoot, baseProps);
    console.log(propsPath);
    return;
  }
  usage();
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
