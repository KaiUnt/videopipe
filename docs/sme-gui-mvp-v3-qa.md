# SME GUI MVP-v3 · Neue Vollstimme

## Lieferung

- Composition: `SmeGuiMvpV3`; Render: `npm run render:sme-gui-v3`.
- Film: `output/sme-gui-mvp-v3/final/sme-gui-mvp-v3-16x9.mp4`.
- 1920 × 1080, 16:9, 30 fps, 1759 Videoframes / 58,633 s; Containerdauer etwa 58,688 s (AAC-Padding).
- MVP (`SmeGuiMvp`) und V2 (`SmeGuiMvpV2`) bleiben unverändert erhalten.

## Audio

Quelle: `Promovideo/Narration/FullNarrator_new.mp3` (53,629 s, mono, 44,1 kHz, 192 kbit/s). Lokale Kopie `public/assets/audio/sme-gui/narration-v3.mp3`, SHA-256 identisch mit der OneDrive-Datei.

Die Aufnahme lag bereits bei −15,9 LUFS. Daher nur statische Pegelanpassung um −0,07 dB und Wandlung auf 48 kHz / 24 bit: `public/assets/audio/sme-gui/narration-v3.wav`. Keine Schnitte, kein Retiming, keine dynamische Normalisierung.

## Schnitt

Gleiche Quellen und Trims wie im MVP; nur die Bildwechsel wurden in die gemessenen Sprecherpausen der neuen Aufnahme gelegt (`smeGuiV3Cuts` in `src/lib/sme-gui-plan.ts`). Zeiten als Filmzeit inkl. 2,5-s-Intro.

| Shot | Filmzeit | Einsatz des Sprechers (Export) |
| --- | --- | --- |
| intro-a1-sme-gui | 0,000–2,500 | – |
| sme-01a-problem-ssid | 2,500–12,700 | „Managing networks …“ 2,20 s* |
| sme-02-solution | 12,700–19,000 | „That's why …“ 12,94 s |
| sme-03-overview | 19,000–25,200 | „Get an instant overview …“ 19,16 s |
| sme-04-wifi | 25,200–30,800 | „Easily view and configure Wi-Fi …“ 25,20 s |
| sme-05-devices | 30,800–34,967 | „See all network devices …“ 31,42 s |
| sme-06-clients | 34,967–40,400 | „including easy-to-read health ratings …“ 35,06 s |
| sme-07-changes | 40,400–48,300 | „Track every network change …“ 40,72 s |
| sme-08-close | 48,300–56,133 | „Less complexity …“ 49,00 s; Claim endet ≈ 56,0 s |
| outro-a1-sme-gui | 56,133–58,633 | – |

\* Frühe ASR-Zeitmarke; Sprecher setzt laut Signal erst nach dem Intro ein.

Erster Shot (Feedback 25.09.): Quell-Out von 50,0 s auf 46,0 s vorgezogen. Der alte Ablauf zeigt Scroll und Modify, endet aber auf der SSID-Detailansicht, bevor der Cursor zum Radio-Tab fährt (Klick bei ≈ 46,9 s). Wiedergabe dadurch 0,88× statt 1,27×. Nachweis: `output/sme-gui-mvp-v3/qa/final-check/first-shot-sheet.jpg` und `first-shot-end.jpg`.

Korrektur gegenüber MVP: Dort lagen die Wechsel zu Changes und zum Schluss rund 1,3–1,5 s nach Beginn der jeweiligen Sätze. In V3 sitzen alle Wechsel vor dem passenden Satz.

## Prüfung

- `npm run typecheck` bestanden; Render erfolgreich.
- Export-Tonspur lokal transkribiert (faster-whisper base.en): vollständiger Text inkl. „Network management made simple“.
- Export: −16,0 LUFS, −3,8 dBTP, LRA 2,7 LU; 48 kHz stereo.
- `blackdetect`: keine schwarzen Bilder.
- Kontaktbogen an allen Schnittpunkten angesehen: `output/sme-gui-mvp-v3/qa/final-check/contact-sheet.jpg`.
- Nachweise: `output/sme-gui-mvp-v3/qa/audio/`, Transkript der Quelle unter `output/sme-gui-mvp-v3/work/audio/`.

Grenzen: keine subjektive Hörkontrolle behauptet; kein fal.ai-Aufruf, keine bezahlte API. Kosten der ElevenLabs-Aufnahme unbekannt.
