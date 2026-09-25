# World Direct · Testfilm und QA

Stand: 24.09.2026. Produziert nach [freigegebenem Plan, Fassung 1](world-direct-testfilm-plan.md), Nutzerfreigabe „passt los“.

## Ergebnis

- Composition: `WorldDirectTest`.
- Film: [output/world-direct-test/final/world-direct-test.mp4](../output/world-direct-test/final/world-direct-test.mp4).
- Vorschaubild: [output/world-direct-test/final/world-direct-test.png](../output/world-direct-test/final/world-direct-test.png).
- Szenenübersicht: [Kontaktbogen](../output/world-direct-test/qa/overview.png).
- 16,000 Sekunden, 480 Frames, 1920 × 1080, 30 fps, MP4/H.264, ohne Tonspur.
- Vier getrennte Shots: Intro 0–4 s, Portal 4–9 s, Überblick 9–13 s, Outro 13–16 s. An den Schnittpunkten blenden die Szenen über zehn Frames ineinander; der ausgehende Shot bleibt währenddessen als Hintergrund bestehen.

## Quellen und Produktion

Originale `WD_Logo claim.svg`, `WD_Isotype.svg` und `Poly_BG_07.svg` aus `public/assets/brand/`, lokale Cairo Light/Regular inklusive OFL; bestätigte digitale Palette aus `brand/world-direct/brand.json`. Logo- und Hintergrunddateien sind unverändert. Der separate Portalentwurf und die einfarbigen Outline-Symbole sind deterministische React-/SVG-Gestaltung mit erfundenen Beispieldaten. Keine reale Produktoberfläche oder Kundenreferenz wird behauptet.

„Fiktive Demo“ bleibt durchgehend sichtbar. Die Portalansicht trägt zusätzlich „Fiktiver UI-Entwurf · Beispieldaten“. Die lange MOV-Logoanimation wurde wie geplant nicht eingebaut. Keine generativen Medien, keine fal.ai-Aufrufe, keine Generierungskosten. Der vorherige Film `output/studio-demo/final/studio-demo.mp4` wurde nicht überschrieben.

## Ausgeführte Prüfung

- TypeScript mit `npm run typecheck`; Patch-Format mit `git diff --check` geprüft.
- Finale MP4 mit `ffprobe` geprüft: H.264, Auflösung, 30 fps, exakt 480 dekodierte Frames und 16 Sekunden. Keine Audiospur, entsprechend dem stummen Testplan.
- Gesamte MP4 mit FFmpeg fehlerfrei dekodiert.
- Repräsentative Frames **aus der finalen MP4** bei 60, 155, 190, 235, 340 und 450 als Übersicht angesehen; Intro, Portal und Outro zusätzlich groß betrachtet.
- Bewegungs- und Schnittkontrolle anhand von **160 Bildern**, jedes dritte Frame von 0 bis 477, über die gesamte Timeline. Die vier tatsächlich angesehenen Bildfolgen liegen in `output/world-direct-test/qa/motion-01.png` bis `motion-04.png`; genaue Frame-Zuordnung in `motion-index.json`.
- Kontrolliert: Claim-Lesbarkeit, vollständige Logos, Kontrast, UI-Texte, Fiktiv-Kennzeichnung, Abstände, Standzeiten, sequenzieller Textaufbau, Portalwechsel und durchgehende Bilddeckung während der Übergänge.

Im ersten Render lag die Bildmarke im Intro teilweise auf einer blauen Polygonkante. Das gesamte Claim-Logo wurde weiter unten auf die weiße Freifläche gesetzt; auch im Outro wurde der Abstand vergrößert. Danach den vollständigen Film erneut gerendert und die Kontrollbilder neu aus der finalen Datei erzeugt. Keine verbleibenden sichtbaren Überlappungen oder abgeschnittenen Inhalte festgestellt.

Die Bewegungsprüfung erfolgte über die dichte Bildfolge, nicht durch eine behauptete Echtzeitwiedergabe. Ein Audiotest ist nicht erforderlich, da der Film planmäßig keine Audiospur besitzt. Der Film ist ein interner fiktiver CI-Test, keine Produktdarstellung oder allgemeine Freigabe einer Motion-CI.

## Prüfung nach Ordnerumzug · 24.09.2026

Das CI-Kit liegt jetzt unter `brand/world-direct/`. Alle fünf Konfigurationsimporte und die Dokumentationsverweise wurden angepasst. TypeScript-Prüfung und Kontrolle der lokalen Links sind erfolgreich. Die CI-Vorschau und Testfilm-Frame 195 wurden neu gerendert und angesehen. Ein zusätzlicher vollständiger Render von `WorldDirectTest` ist **byteidentisch zur bisherigen MP4**; auch das CI-Übersichtsbild ist byteidentisch. Der lokale [Prüfsummenvergleich](../output/brand/world-direct/qa/migration/render-comparison.json) hält den Abgleich fest.

## Erneut rendern

```bash
npm run render:wd-test
npm run still:wd-test
npm run studio
```

Im Studio `WorldDirectTest` auswählen. Szenen: `src/scenes/WorldDirectScenes.tsx` und `src/scenes/WorldDirectPortal.tsx`; Timeline: `src/compositions/WorldDirectTest.tsx`. Renderings und lokale Originalmedien sind gemäß Repository-Regel nicht in Git enthalten.
