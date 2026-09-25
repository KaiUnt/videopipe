import {smeGuiFps, smeGuiIntroDuration, smeGuiV3Shots, type SmeGuiShot} from './sme-gui-plan';

// Story version on top of the frozen MVP (SmeGuiMvpV3). Same narration and
// total length; B-roll cuts sit in measured narration pauses.
// Storyboard: docs/sme-gui-story-storyboard.md.
export const smeGuiStoryFps = smeGuiFps;
export const smeGuiStoryDuration = 1759;
export const smeGuiStoryIntroDuration = smeGuiIntroDuration;

type Base = {id: string; name: string; from: number; duration: number};
export type StoryScreenShot = Base & {
  kind: 'screen'; shot: SmeGuiShot; zoom?: 'overview-metrics' | 'push-in'; reveal?: boolean; exit?: boolean;
  // Optional internal cuts within the same recording (source frames, output frames).
  segments?: {sourceIn: number; sourceOut: number; frames: number}[];
};
export type StoryBrollShot = Base & {
  kind: 'broll';
  still: string;
  // Approved Kling clip (24 fps, 5 s); clipIn in composition frames picks the used part.
  clip?: string;
  clipIn?: number;
  caption?: {text: string; at: number};
  // Crossed-out WiFi badge (centre in px, start frame within the shot).
  wifiOff?: {x: number; y: number; at: number};
};
export type StoryEndShot = Base & {kind: 'end'; claimAt: number};
export type StoryShot = StoryScreenShot | StoryBrollShot | StoryEndShot;

const mvp = (id: string) => {
  const shot = smeGuiV3Shots.find((item) => item.id === id);
  if (!shot) throw new Error('Unknown MVP shot ' + id);
  return shot;
};
const screen = (base: Base, source: Omit<SmeGuiShot, 'from' | 'duration'>, extra: Partial<StoryScreenShot> = {}): StoryScreenShot => ({
  ...base, kind: 'screen', shot: {...source, from: base.from, duration: base.duration}, ...extra,
});
const still = (name: string) => 'generated/images/' + name + '.png';
const clip = (name: string) => 'generated/video/' + name + '.mp4';

export const smeGuiStoryShots: StoryShot[] = [
  {id: 'story-01a-opening', name: 'Morgen · Handy', kind: 'broll', from: 75, duration: 72, still: still('story-kf-01a-opening-a8649abf9dc0'), wifiOff: {x: 600, y: 540, at: 6}, clip: clip('story-clip-01a-opening-a2dbf4f3317d'), clipIn: 75},
  {id: 'story-01b-cabinet', name: 'Netzwerkschrank', kind: 'broll', from: 147, duration: 78, still: still('story-kf-01b-cabinet-7399e3660878'), clip: clip('story-clip-01b-cabinet-ea51bf18b89c'), clipIn: 0},
  // Old UI: row start, scroll right, Modify click (37.5–41.1 s); loading screen cut
  // out; dense SSID detail view scrolling down (42.6–44.7 s, before it scrolls back up).
  // User feedback 25.09.
  screen({id: 'story-02-old-ui', name: 'Alte Oberfläche', from: 225, duration: 156}, {...mvp('sme-01a-problem-ssid'), sourceIn: 1125, sourceOut: 1341}, {
    zoom: 'push-in', exit: true,
    segments: [{sourceIn: 1125, sourceOut: 1233, frames: 78}, {sourceIn: 1278, sourceOut: 1341, frames: 78}],
  }),
  screen({id: 'story-03-reveal', name: 'Neue Oberfläche · Reveal', from: 381, duration: 78}, {...mvp('sme-02-solution'), sourceIn: 12, sourceOut: 40}, {reveal: true}),
  {id: 'story-04-counter', name: 'Lena an der Theke', kind: 'broll', from: 459, duration: 111, still: still('story-kf-04a-counter-84d0670de868'), clip: clip('story-clip-04-counter-238b6d0da482'), clipIn: 0},
  screen({id: 'story-05-overview', name: 'Overview · Kennzahlen', from: 570, duration: 186}, {...mvp('sme-03-overview'), sourceIn: 40, sourceOut: 144}, {zoom: 'overview-metrics'}),
  ...(['sme-04-wifi', 'sme-05-devices', 'sme-06-clients'] as const).map((id) => {
    const shot = mvp(id);
    return screen({id: 'story-' + id.slice(4), name: shot.name, from: shot.from, duration: shot.duration}, shot);
  }),
  screen({id: 'story-09-changes', name: 'Changes', from: 1212, duration: 147}, {...mvp('sme-07-changes'), sourceIn: 990, sourceOut: 1137}),
  {id: 'story-10-laptop', name: 'Lena löst es selbst', kind: 'broll', from: 1359, duration: 90, still: still('story-kf-10-laptop-1a83cf6e9eff-02'), clip: clip('story-clip-10-laptop-v2-e041762fde32'), clipIn: 30},
  {id: 'story-11-serving', name: 'Less complexity', kind: 'broll', from: 1449, duration: 57, still: still('story-kf-11-serving-cfdd6a536afe'), clip: clip('story-clip-11-serving-80c6668fbaa5'), clipIn: 60, caption: {text: 'Less complexity.', at: 16}},
  {id: 'story-12-phone', name: 'Fewer support requests', kind: 'broll', from: 1506, duration: 45, still: still('story-kf-12-phone-d9550466cd65'), clip: clip('story-clip-12-phone-807a9add8b3b'), clipIn: 30, caption: {text: 'Fewer support requests.', at: 4}},
  {id: 'story-13-control', name: 'Complete control', kind: 'broll', from: 1551, duration: 69, still: still('story-kf-13-control-e7ad54b0bd45'), clip: clip('story-clip-13-control-f5a9c71aa4a8'), clipIn: 45, caption: {text: 'Complete control of your network.', at: 6}},
  {id: 'story-14-end', name: 'Endkarte', kind: 'end', from: 1620, duration: 139, claimAt: 7},
];

// Old-to-new UI cut, covered by the longer red wipe.
export const smeGuiStoryWipe = 381;
