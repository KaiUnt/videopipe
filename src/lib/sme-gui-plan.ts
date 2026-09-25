export const smeGuiFps = 30;
export const smeGuiDuration = 1562; // Complete 52.062-second narration, rounded up.

export type SmeGuiShot = {
  id: string;
  name: string;
  from: number;
  duration: number;
  source: 'old' | 'new';
  sourceIn: number;
  sourceOut: number;
  narration: string;
};

// All positions are integer composition frames at 30 fps, including source
// trims. Source timing refers to the uncut recordings, not screenplay timings.
export const smeGuiShots: SmeGuiShot[] = [
  {
    id: 'sme-01a-problem-ssid', name: 'Problem · technische WLAN-Konfiguration',
    from: 0, duration: 159, source: 'old', sourceIn: 1290, sourceOut: 1386,
    narration: 'Managing networks for small and medium enterprises shouldn’t require specialist knowledge.',
  },
  {
    id: 'sme-01b-problem-radio', name: 'Problem · Radio-Einstellungen',
    from: 159, duration: 149, source: 'old', sourceIn: 1440, sourceOut: 1590,
    narration: 'Yet traditional tools are often too technical and complex for everyday users.',
  },
  {
    id: 'sme-02-solution', name: 'Lösung · neue Oberfläche',
    from: 308, duration: 196, source: 'new', sourceIn: 12, sourceOut: 81,
    narration: 'That’s why we created a new experience. Built especially for small and medium business customers.',
  },
  {
    id: 'sme-03-overview', name: 'Overview · Standorte und Kennzahlen',
    from: 504, duration: 180, source: 'new', sourceIn: 81, sourceOut: 144,
    narration: 'Get an instant overview of all locations and key network metrics in a single dashboard.',
  },
  {
    id: 'sme-04-wifi', name: 'WiFi · Netzwerke und Bearbeitung',
    from: 684, duration: 168, source: 'new', sourceIn: 180, sourceOut: 405,
    narration: 'Easily view and configure Wi-Fi networks without digging through complicated technical settings.',
  },
  {
    id: 'sme-05-devices', name: 'Devices · Netzwerkgeräte',
    from: 852, duration: 50, source: 'new', sourceIn: 450, sourceOut: 500,
    narration: 'See all network devices',
  },
  {
    id: 'sme-06-clients', name: 'Clients · Verbindungen und Health',
    from: 902, duration: 213, source: 'new', sourceIn: 690, sourceOut: 804,
    narration: 'and connected clients at a glance, including easy to read health ratings that help identify issues before they become problems.',
  },
  {
    id: 'sme-07-changes', name: 'Changes · Änderungen nachvollziehen',
    from: 1115, duration: 219, source: 'new', sourceIn: 990, sourceOut: 1140,
    narration: 'Track every network change in one place, making troubleshooting faster and enabling users to resolve issues on their own.',
  },
  {
    id: 'sme-08-close', name: 'Abschluss · Überblick behalten',
    from: 1334, duration: 228, source: 'new', sourceIn: 24, sourceOut: 135,
    narration: 'Less complexity. Fewer support requests. Complete control of your network. Network management made simple.',
  },
];

export const smeGuiMedia = {
  old: 'assets/screenrecordings/sme-gui/nce-gui-30fps.mp4',
  new: 'assets/screenrecordings/sme-gui/sme-gui-1080p.mp4',
  narration: 'assets/audio/sme-gui/narration-normalized.wav',
};
