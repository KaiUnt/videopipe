# Project instructions for every coding agent

This file is the single source of truth for agents working in this repository. Follow it regardless of whether the harness is Codex, Claude Code, GitHub Copilot, or another coding agent. Harness-specific files only point here.

## Goal and scope

Build videos with React, TypeScript, and Remotion. Treat fal.ai as an optional source of generated stills or clips. Keep the project small: no extra workflow engine, agent framework, or hosted orchestration for the MVP.

The production order is **existing assets first → deterministic Remotion work → generation only where useful**. The agent works with the user as a creative partner. Preserve the user's concept, script, source footage, screen recordings, product UI, logos, brand material, audio, and references. Suggestions may improve or fill gaps in the brief; they do not override the user's creative decisions.

## Production workflow

1. **Discover.** Read the brief and inventory relevant material in `public/assets/` and any paths the user supplied. Ask for missing creative direction only when needed. Check aspect ratio, duration, audience, message, voice, brand requirements, and delivery format.
2. **Plan with the user.** Prepare a concise brief, script or narration if relevant, storyboard, and shot list. Use [`docs/shot-list-template.md`](docs/shot-list-template.md) as a starting point. Each shot needs an ID, purpose, timing, source asset, production method, and notes. Make generative shots explicit and justify them.
3. **Review and approval.** Present the plan for creative review before production. For every proposed paid fal.ai shot, show the model, task, approximate duration and output quality, prompt intent, reason for generation, and reliable cost estimate if available. Never invent a price. A plan review is not permission to spend; obtain explicit user approval for the exact generation plan before calling a billable API. If the plan changes materially, review it again. Use the CLI dry run and its plan hash when applicable.
4. **Build.** Once the plan is approved, work through the technical steps autonomously. Reuse existing sources, then create isolated Remotion shots, integrate any approved generated assets, and assemble the final timeline. Do not make the user approve ordinary edits, renders, or local QA steps.
5. **Inspect and improve.** Render previews or representative frames and the final MP4. Actually inspect the visuals and audio; a successful process exit is insufficient. Check story, readability, crop and aspect ratio, timing, motion, transitions, UI fidelity, brand consistency, and generated-asset quality. Fix clear issues and render again.

## Shot and asset rules

- Structure videos as multiple replaceable shots, with Remotion as the timeline, compositing, animation, editing, and render engine.
- Use real screen recordings and product imagery for UI demonstrations. Keep displayed text and product details readable and faithful. Build laptop, phone, tablet, browser, and floating-UI treatments in Remotion instead of asking a generative video model to redraw the interface.
- Keep user media under `public/assets/{video,screenrecordings,images,audio,brand}/`. Put generated source files and metadata under `generated/`; the fal integration places media needed by Remotion under `public/generated/`. Reference browser-served files with Remotion's `staticFile()`.
- Name shots and files consistently so one shot can be replaced without rebuilding unrelated content. Record provenance for generated media: shot ID, model, prompt, parameters, creation time, request ID, local file path, and cost only when reliably known. Reuse existing generations when the plan and content match.
- Do not commit secrets. `FAL_KEY` is server-side only. Follow `.env.example`; never embed it in client code, prompts, logs, metadata, or checked-in files.

## fal.ai boundary

fal.ai is optional. It fits genuinely new footage or imagery such as photoreal scenes, people, landscapes, natural motion, generative B-roll, or image/reference-to-video when no suitable asset exists. It is unsuitable for redrawing exact text, interfaces, and brand details.

Before selecting a model or setting parameters, check the current official [fal.ai documentation](https://docs.fal.ai/) and the relevant model page. Do not guess model IDs, API inputs, capabilities, prices, or cost totals. Compare task fit, reference fidelity, motion, camera, audio, resolution, speed, and price. The user can change the model before approval.

For a proposed batch, run `npm run fal -- dry-run <plan.json>` to validate and show the plan. Only run `npm run fal -- generate <plan.json> --approved <hash>` after the user explicitly approves that exact plan/hash and any spend. The CLI is a technical guard, not a substitute for the conversation. A user request to set up this repository does not authorize paid generation. Successful generation writes `generated/remotion-props.json`; `npm run fal -- props <plan.json>` can rebuild those Remotion props from existing catalog entries without a fal.ai call.

## Remotion guidance

Use the current official [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills) as technical guidance when available. In particular, consult `remotion-best-practices` for routing, `remotion-create` when creating a video, `remotion-markup` for React compositions, `remotion-studio` for previews, and `remotion-render` for output. These skills can be installed with `npx skills add remotion-dev/skills`; they are not a required runtime dependency and do not override this project's creative or approval rules. For API details, verify against the current [Remotion docs](https://www.remotion.dev/docs/).

Use `npm run studio` to preview, `npm run compositions` to list compositions, `npm run render` for the sample MP4, `npm run render:still` for a still, and `npm run typecheck` for TypeScript validation. Keep animations deterministic with frame-based Remotion APIs so previews and renders agree.

## Delivery

Report the approved plan, sources used, any generated media and actual known cost, composition ID, output file, QA performed, and any remaining limits. Do not claim visual inspection unless you viewed frames or a preview. Do not claim fal.ai was tested end to end if no authorized paid call was made.
