import type {StudioVideoProps} from './shots';

// The starter renders without external media. Replace a mockup asset or
// add media shots in a --props JSON file to work with real recordings.
export const demoPlan: StudioVideoProps = {
  shots: [
    {
      id: 'intro',
      kind: 'title',
      durationInFrames: 75,
      eyebrow: 'AGENTIC VIDEO STUDIO',
      title: 'Ideas become motion.',
      subtitle: 'A focused workspace for stories built from your own material.',
    },
    {
      id: 'product',
      kind: 'mockup',
      durationInFrames: 120,
      title: 'Show the real product.',
      caption: 'Drop in a screen recording and keep every UI detail intact.',
      url: 'studio.example / workspace',
      device: 'laptop',
    },
    {
      id: 'principles',
      kind: 'feature',
      durationInFrames: 90,
      eyebrow: 'THE WORKFLOW',
      title: 'One film. Independent shots.',
      points: ['Existing assets first', 'Edit every shot in code', 'Generate only when useful'],
    },
    {
      id: 'outro',
      kind: 'outro',
      durationInFrames: 75,
      title: 'Make the next frame.',
      subtitle: 'Remotion-first video production',
    },
  ],
};