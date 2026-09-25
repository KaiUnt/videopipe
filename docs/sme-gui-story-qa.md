# SME GUI Story-Fassung · Renderprüfung

Geprüft am 25.09.2026. Storyboard und Freigaben: [sme-gui-story-storyboard.md](sme-gui-story-storyboard.md). Basis: das unveränderte MVP `SmeGuiMvpV3`.

## Lieferung

- Composition: `SmeGuiStory`; Render: `npm run render:sme-gui-story`.
- Film: `output/sme-gui-story/final/sme-gui-story-16x9.mp4`.
- 1920 × 1080, 30 fps, 1759 Frames / 58,633 s; H.264 yuv420p, AAC 48 kHz stereo. Länge und Sprecher identisch mit dem MVP.

## Quellen

- Echte Screenrecordings wie im MVP (alte NCE-Oberfläche 37,5–41,1 s und 42,6–44,7 s ohne Ladebildschirm; neue SME-GUI).
- Sprecher `narration-v3.wav`, unverändert.
- A1-Brandkit für Startkarte, Texteinblendungen und Endkarte.
- Generativ (fal.ai, freigegeben in drei Stufen): Referenzbilder und Keyframes mit Nano Banana 2 / Nano Banana 2 Edit, 7 Clips mit Kling V3 Pro Image-to-Video ohne Ton. Provenienz mit Prompt, Parametern, Request-ID und Zeit: `generated/manifest.json`; Pläne unter `output/sme-gui-story/work/fal/`.

| Stufe | Request-IDs | Kosten laut offizieller Preisliste |
| --- | --- | --- |
| 1a Referenzen (6 Bilder, 2K) | 3 Requests | 0,72 $ |
| 1b Keyframes (14 Bilder, 2K) | 7 Requests | 1,68 $ |
| 2 Clips (7 × 5 s, ohne Audio) | 7 Requests | 3,92 $ |
| 2b Retake Shot 10 (1 × 5 s) | 1. Versuch `01a0d9b5…` fehlgeschlagen; 2. Versuch `01a0d9c9-9389-77c1-bd33-20660e95f9e3` erfolgreich | 0,56 $; ob der Fehlversuch berechnet wurde, ist unbekannt (+ bis zu 0,56 $) |
| **Summe** | | **6,88 $**, höchstens 7,44 $ falls der Fehlversuch berechnet wurde (aus Preisliste × Menge; fal-Abrechnung nicht eingesehen) |

Nicht verwendet: Café-Wien-Referenzen (nach der Entscheidung für einen Standort) und die jeweils zweite Keyframe-Variante.

## Prüfung

- `npm run typecheck` bestanden; Render erfolgreich.
- Ton: −16,0 LUFS, −3,8 dBTP, LRA 2,7 LU. Identisch mit dem MVP.
- `blackdetect`: keine schwarzen Bilder. `freezedetect`: Standbild-Abschnitte nur in den ruhigen UI-Einstellungen wie im MVP, im Intro und auf der Endkarte; keine in den B-Roll-Shots.
- Clips: 1928 × 1072, 24 fps, ohne Tonspur. Remotion rechnet sie auf 30 fps um und schneidet mit `objectFit: cover` minimal am Rand. Jeder Clip wurde in 0,5-s-Schritten angesehen; der verwendete Ausschnitt ist per `clipIn` in `src/lib/sme-gui-story-plan.ts` gewählt.
- Keyframes und Clips vergrößert auf Schriftzüge und Logos geprüft: keine lesbaren Marken an Espressomaschinen, Laptop, Tablet oder Handy; kein lesbarer Bildschirminhalt, das Handy bleibt dunkel.
- Kontaktbogen des finalen Films angesehen: `output/sme-gui-story/qa/final/contact-sheet.jpg`. Prüfbild der roten Lichtblende: `output/sme-gui-story/qa/draft/glare-check.jpg`.

## Feedback-Runde 1 (25.09.)

- Shot 01a: durchgestrichenes WLAN-Symbol in A1-Rot `#EB140A` auf weißer runder Plakette links neben Lena (selbst gezeichnetes SVG, kein Stockbild). Es springt kurz ein, die äußeren Bögen flackern zweimal.
- Alte → neue Oberfläche: längerer Übergang. Die alte UI wird ab 0,5 s vor dem Schnitt grau und unscharf. Ein schräges A1-Rot-Band mit dunkelrotem Nachläufer zieht in rund 0,9 s über das Bild und verdeckt den Schnitt ≈ 8 Frames komplett. Prüfbilder: `output/sme-gui-story/qa/fixes/wipe-v2.jpg`.
- Schlusstexte auf Fläche in A1 Main Interaction Red `#B90A05` (laut `brand/a1/brand.json`), Fläche wischt von links ein, Text folgt. Prüfbild: `output/sme-gui-story/qa/fixes/icon-captions.jpg`.
- Shot 10: Retake mit klar fröhlichem Lächeln vorbereitet (`output/sme-gui-story/work/fal/stage-2b-laptop-retake.json`, 0,56 $), wartet auf Freigabe.
- Neu gerendert: 1759 Frames, −16,0 LUFS, −3,8 dBTP, keine schwarzen Bilder.

## Feedback-Runde 2 (25.09.)

- WLAN-Symbol deutlich größer (400 px), ohne weiße Plakette, direkt im Bild mit leichtem Schatten; Lücke um den Querstrich per Maske.
- Die roten Lichtblenden sind entfernt. Alle anderen Szenenwechsel nutzen jetzt ebenfalls das rote Band, in schneller Variante (≈ 0,45 s Durchlauf, ≈ 3 Frames Vollabdeckung). Die lange Variante bleibt nur für alte → neue Oberfläche. Prüfbilder: `output/sme-gui-story/qa/fixes2/`.
- Schlusstext-Flächen höher (38/40 px Innenabstand) und mit 82 % Deckkraft.
- Shot-10-Retake (Request `01a0d9b5-cbf8-7992-9962-96cd68ad5d51`): von fal.ai als abgeschlossen gemeldet, Ergebnis aber `downstream_service_error` (Kling), kein Video. Laut fal-Doku kann der Fehler wiederholbar sein oder nicht; ob er berechnet wird, steht dort nicht. Im Manifest als `failed` protokolliert; die Pipeline kennt dafür jetzt den Status `failed`.
- Neu gerendert: 1759 Frames, −16,0 LUFS, −3,8 dBTP, keine schwarzen Bilder. Shot 10 vorerst mit dem bisherigen Clip.

## Retake Shot 10

Zweiter Versuch mit unverändertem, freigegebenem Plan erfolgreich (`generated/video/story-clip-10-laptop-v2-e041762fde32.mp4`). Lena klappt den Laptop zu, richtet sich auf und lacht deutlich. Verwendeter Ausschnitt 1,0–4,0 s (`clipIn: 30`). Neu gerendert: 1759 Frames, −16,0 LUFS, −3,8 dBTP, keine schwarzen Bilder. Kontaktbogen: `output/sme-gui-story/qa/final/contact-sheet-v3.jpg`.

## Feedback-Runde 3 (25.09.)

- WLAN-Symbol vertikal zentriert (y 540), größer (560 px), links vor dem Fenster (x 290), damit es nicht rot auf der roten Espressomaschine liegt; dunklerer weicher Schatten statt Hintergrund. Das ganze Icon blinkt dreimal.
- Schnelle rote Übergänge entfernt: alle Szenenwechsel sind wieder harte Schnitte. Das lange rote Band bleibt ausschließlich beim Wechsel alte → neue Oberfläche.
- Neu gerendert: 1759 Frames, −16,0 LUFS, −3,8 dBTP, keine schwarzen Bilder. Schnittpunkte: `output/sme-gui-story/qa/final/cuts-v4.jpg`.

## Feedback-Runde 4 (25.09.)

- WLAN-Symbol wieder näher an Lena (x 600, vertikal zentriert) auf leichter, halbtransparenter Milchglas-Scheibe (Weiß 50 %, Hintergrundunschärfe). Das Symbol blinkt dreimal, die Scheibe bleibt stehen.
- Alte Oberfläche neu geschnitten: 37,5–41,1 s (Zeilenanfang mit Checkbox, Scroll nach rechts, Klick auf Modify), Ladebildschirm 41,1–42,6 s entfernt, dann 42,6–44,7 s volle Detailansicht mit Scroll nach unten, vor dem Zurückscrollen beendet. Gleiche Shot-Länge (5,2 s); Teil 1 ≈ 1,38×, Teil 2 ≈ 0,81×. Prüfbilder: `output/sme-gui-story/qa/fixes4/`, `output/sme-gui-story/qa/final/opening-v5.jpg`.
- Neu gerendert: 1759 Frames, −16,0 LUFS, −3,8 dBTP, keine schwarzen Bilder.

## Bekannte Grenzen

- Die echten Clients- und Changes-Aufnahmen zeigen den Standort „Office Vienna“, die Overview „Office Linz“. So ist es im Originalmaterial; bei einem Ein-Standort-Case fällt das Aufmerksamen eventuell auf.
- Keine subjektive Hörkontrolle; der Ton ist technisch identisch mit dem MVP.
