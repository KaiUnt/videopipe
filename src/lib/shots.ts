export type MediaAsset = {
  // Path below public/, for example assets/screenrecordings/demo.mp4
  // or generated/video/shot-04.mp4. Remote http(s) URLs also work.
  path: string;
  type: 'video' | 'image';
  fit?: 'contain' | 'cover';
  trimBefore?: number;
  volume?: number;
};

type BaseShot = {
  id: string;
  durationInFrames: number;
};

export type TitleShot = BaseShot & {
  kind: 'title';
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export type MockupShot = BaseShot & {
  kind: 'mockup';
  title: string;
  caption?: string;
  url?: string;
  device?: 'browser' | 'laptop' | 'phone' | 'tablet' | 'floating';
  asset?: MediaAsset;
};

export type MediaShot = BaseShot & {
  kind: 'media';
  asset: MediaAsset;
  title?: string;
  caption?: string;
};

export type FeatureShot = BaseShot & {
  kind: 'feature';
  eyebrow?: string;
  title: string;
  points: string[];
};

export type OutroShot = BaseShot & {
  kind: 'outro';
  title: string;
  subtitle?: string;
};

export type Shot = TitleShot | MockupShot | MediaShot | FeatureShot | OutroShot;

export type StudioVideoProps = {
  shots: Shot[];
  soundtrack?: {
    path: string;
    volume?: number;
  };
};

export const totalDuration = (shots: Shot[]): number => {
  if (shots.length === 0) {
    throw new Error('A video needs at least one shot.');
  }

  const ids = new Set<string>();
  let total = 0;
  for (const shot of shots) {
    if (!shot.id || ids.has(shot.id)) {
      throw new Error('Each shot needs a unique, non-empty id.');
    }
    if (!Number.isInteger(shot.durationInFrames) || shot.durationInFrames < 30) {
      throw new Error('Shot ' + shot.id + ' needs at least 30 whole frames.');
    }
    ids.add(shot.id);
    total += shot.durationInFrames;
  }
  return total;
};