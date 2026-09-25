import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

// Deterministic local derivatives only. Editing and timing live in Remotion.
const run = (args, capture = false) => {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-nostdin', '-y', ...args], {
    encoding: 'utf8',
    stdio: capture ? 'pipe' : 'inherit',
    maxBuffer: 10 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || 'FFmpeg failed');
  return result.stderr;
};

const readMeasurement = (log) => JSON.parse(log.slice(log.lastIndexOf('{'), log.lastIndexOf('}') + 1));

const videoDirectory = 'public/assets/screenrecordings/sme-gui';
const audioDirectory = 'public/assets/audio/sme-gui';
for (const [input, output, filter] of [
  ['nce-gui.mov', 'nce-gui-30fps.mp4', 'fps=30'],
  ['sme-gui.mov', 'sme-gui-1080p.mp4', 'fps=30,scale=1920:1080:flags=lanczos'],
]) {
  if (!existsSync(`${videoDirectory}/${input}`)) throw new Error(`Missing ${input}; see docs/sme-gui-mvp-plan.md`);
  run(['-loglevel', 'warning', '-i', `${videoDirectory}/${input}`, '-map', '0:v:0', '-an',
    '-vf', filter, '-c:v', 'libx264', '-preset', 'fast', '-crf', '16', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', `${videoDirectory}/${output}`]);
}

const audioInput = `${audioDirectory}/narration.mp3`;
const measurement = run(['-i', audioInput, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=7:print_format=json', '-f', 'null', '-'], true);
const measured = readMeasurement(measurement);
const filter = [
  'loudnorm=I=-16:TP=-1.5:LRA=7',
  `measured_I=${measured.input_i}`,
  `measured_TP=${measured.input_tp}`,
  `measured_LRA=${measured.input_lra}`,
  `measured_thresh=${measured.input_thresh}`,
  `offset=${measured.target_offset}`,
  'linear=true:print_format=json',
].join(':');
const normalization = run(['-i', audioInput, '-af', filter, '-ar', '48000', '-c:a', 'pcm_s24le',
  `${audioDirectory}/narration-normalized.wav`], true);
mkdirSync('output/sme-gui-mvp/work/analysis', {recursive: true});
writeFileSync('output/sme-gui-mvp/work/analysis/audio-normalization.json', JSON.stringify({
  input: audioInput,
  output: `${audioDirectory}/narration-normalized.wav`,
  target: {integratedLufs: -16, truePeakDb: -1.5, loudnessRange: 7},
  measurement: measured,
  normalization: readMeasurement(normalization),
}, null, 2) + '\n');
console.log('SME GUI media prepared. Source recordings and narration are unchanged.');
