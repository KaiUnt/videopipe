# SME GUI MVP-v2 · Schlussnarration

## Lieferung

- Composition: `SmeGuiMvpV2`.
- Film: `output/sme-gui-mvp-v2/final/sme-gui-mvp-v2-16x9.mp4`.
- Referenzsicherung des vorherigen Exports: `output/sme-gui-mvp-v2/final/sme-gui-mvp-v2-before-audio.mp4`.
- 1920 × 1080, 16:9, 30 fps, 1757 Videoframes; Containerdauer etwa 58,624 s.

## Audioänderung

Nur der Schluss wurde ersetzt. Der alte Anfang der normalisierten Sprecheraufnahme läuft bis Audiozeit 45,966667 s. Danach folgt die neue ElevenLabs-Aufnahme:

`Ending_ElevenLabs_2026-09-25T09_05_52_Mark - Natural Conversations_pvc_sp100_s44_sb71_v3.mp3`

Verwendeter Text:

> Less complexity. Fewer support requests and Complete control of your network. Network Management made simple.

Die neue Aufnahme wurde auf 48 kHz mono gewandelt, am leisen Ende gekürzt und auf die bestehende Programm-Lautheit angepasst. Ergebnisdatei für Remotion: `public/assets/audio/sme-gui/narration-mvp-v2.wav`.

## Prüfung

- `npm run typecheck` bestanden.
- `npm run render:sme-gui-v2` erfolgreich.
- Zusammengesetzte V2-WAV: 53,314688 s, 48 kHz mono, gemessen −16,28 LUFS, −1,49 dBTP.
- Gerenderte MP4-Audiospur: 48 kHz stereo, gemessen −16,27 LUFS, −4,40 dBTP.
- Finaler visueller Spotcheck: `output/sme-gui-mvp-v2/qa/final-check/contact-sheet.jpg`.

Grenze: Die Anpassung ist technisch über Lautheit, True Peak, Schnittpunkt und Format erfolgt. Keine subjektive Hörkontrolle behauptet.