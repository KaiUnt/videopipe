export const smeGuiFps = 30;
export const smeGuiIntroDuration = 75;
export const smeGuiOutroDuration = 75;
export const smeGuiContentDuration = 1682; // Intro plus complete 52.062-second narration, rounded up.
export const smeGuiDuration = smeGuiContentDuration + smeGuiOutroDuration;

export type SmeGuiShot = {
  id: string;
  name: string;
  from: number;
  duration: number;
  source: 'old' | 'new';
  sourceIn: number;
  sourceOut: number;
  freezeFrom?: number;
  narration: string;
};

// All positions are integer composition frames at 30 fps, including source
// trims. Source timing refers to the uncut recordings, not screenplay timings.
export const smeGuiShots: SmeGuiShot[] = [
  {
    id: 'sme-01a-problem-ssid', name: 'Problem · technische WLAN-Konfiguration',
    from: 75, duration: 308, source: 'old', sourceIn: 1110, sourceOut: 1500,
    narration: 'Managing networks for small and medium enterprises shouldn’t require specialist knowledge. Yet traditional tools are often too technical and complex for everyday users.',
  },
  {
    id: 'sme-02-solution', name: 'Lösung · neue Oberfläche',
    from: 383, duration: 196, source: 'new', sourceIn: 12, sourceOut: 81,
    narration: 'That’s why we created a new experience. Built especially for small and medium business customers.',
  },
  {
    id: 'sme-03-overview', name: 'Overview · Standorte und Kennzahlen',
    from: 579, duration: 180, source: 'new', sourceIn: 81, sourceOut: 144,
    narration: 'Get an instant overview of all locations and key network metrics in a single dashboard.',
  },
  {
    id: 'sme-04-wifi', name: 'WiFi · Netzwerke und Bearbeitung',
    from: 759, duration: 168, source: 'new', sourceIn: 180, sourceOut: 405,
    narration: 'Easily view and configure Wi-Fi networks without digging through complicated technical settings.',
  },
  {
    id: 'sme-05-devices', name: 'Devices · Netzwerkgeräte',
    from: 927, duration: 125, source: 'new', sourceIn: 450, sourceOut: 600,
    narration: 'See all network devices',
  },
  {
    id: 'sme-06-clients', name: 'Clients · Verbindungen und Health',
    from: 1052, duration: 183, source: 'new', sourceIn: 720, sourceOut: 804,
    narration: 'and connected clients at a glance, including easy to read health ratings that help identify issues before they become problems.',
  },
  {
    id: 'sme-07-changes', name: 'Changes · Änderungen nachvollziehen',
    from: 1235, duration: 219, source: 'new', sourceIn: 990, sourceOut: 1140,
    narration: 'Track every network change in one place, making troubleshooting faster and enabling users to resolve issues on their own.',
  },
  {
    id: 'sme-08-close', name: 'Abschluss · Überblick behalten',
    from: 1454, duration: 228, source: 'new', sourceIn: 24, sourceOut: 135, freezeFrom: 46,
    narration: 'Less complexity. Fewer support requests. Complete control of your network. Network management made simple.',
  },
];

export const smeGuiMedia = {
  old: 'assets/screenrecordings/sme-gui/nce-gui-30fps.mp4',
  new: 'assets/screenrecordings/sme-gui/sme-gui-1080p.mp4',
  narration: 'assets/audio/sme-gui/narration-normalized.wav',
  narrationMvpV2: 'assets/audio/sme-gui/narration-mvp-v2.wav',
  narrationV3: 'assets/audio/sme-gui/narration-v3.wav',
};

// V3 uses the complete re-recorded narration (FullNarrator_new.mp3, 53.629 s).
// Same sources and trims; cuts sit in the new recording's measured pauses.
// Values are narration frames, i.e. relative to the end of the intro.
const smeGuiV3Cuts = [0, 306, 495, 681, 849, 974, 1137, 1374, 1609];
export const smeGuiV3ContentDuration = smeGuiIntroDuration + smeGuiV3Cuts[smeGuiV3Cuts.length - 1];
export const smeGuiV3Duration = smeGuiV3ContentDuration + smeGuiOutroDuration;
// The opening ends after Modify at source 46.0 s, before the cursor moves to
// the Radio tab (click at about 46.9 s); the old UI therefore plays slower.
const smeGuiV3Overrides: Record<string, Partial<SmeGuiShot>> = {
  'sme-01a-problem-ssid': {sourceOut: 1380},
};
export const smeGuiV3Shots: SmeGuiShot[] = smeGuiShots.map((shot, index) => ({
  ...shot,
  ...smeGuiV3Overrides[shot.id],
  from: smeGuiIntroDuration + smeGuiV3Cuts[index],
  duration: smeGuiV3Cuts[index + 1] - smeGuiV3Cuts[index],
}));
