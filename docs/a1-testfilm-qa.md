# A1 · Testfilm und QA

Stand: 24.09.2026. Produziert nach [Planfassung 1](a1-testfilm-plan.md), vom Nutzer mit „go“ freigegeben.

## Ergebnis

- Composition: **`A1Test`**.
- [Film](../output/a1-test/final/a1-test.mp4) · [Vorschaubild](../output/a1-test/final/a1-test.png) · [Szenenübersicht](../output/a1-test/qa/overview.png).
- 16,000 Sekunden, 480 Frames, 1920 × 1080, 30 fps, MP4/H.264, ohne Audiospur.
- Vier getrennte Shots: Intro 0–4 s, Serviceportal 4–9 s, Übersicht 9–13 s, Outro 13–16 s.
- Kurze Überblendungen von zehn Frames an den Schnitten; der ausgehende Shot bleibt währenddessen als Hintergrund bestehen. Im Portal genau ein Fokuswechsel von Übersicht zu Terminen bei lokalen Frames 65–77.

## Quellen und Umsetzung

Verwendet werden die unveränderten Originale `a1-standard-positive.png` und `a1-standard-negative.png` aus `public/assets/brand/logos/a1/`, die drei lokalen Schriften A1 Serif Regular, A1 Sans Regular und A1 Sans Bold sowie die Palette aus [brand/a1/brand.json](../brand/a1/brand.json). Originalfarben und Proportionen der Logos bleiben erhalten.

Die positive Variante steht auf Weiß, die negative auf Schwarz. Serif-Headlines, Sans-Fließtext und echte Bold-Hervorhebungen verwenden ihre eigenen Font-Dateien. `A1Brand.tsx` lädt diese vor dem Render über [`loadFont()`](https://www.remotion.dev/docs/fonts-api/load-font); synthetische Schriftschnitte sind deaktiviert. Die Animationen sind framebasiert und deterministisch.

Das Serviceportal ist ein neu gebauter, ausdrücklich fiktiver React-/Remotion-Entwurf mit Beispieldaten. „Fiktive Demo“ bleibt durchgehend sichtbar, das Portal trägt zusätzlich „UI-Entwurf · Beispieldaten“. Es werden kein reales A1-Produkt und kein offizieller Claim behauptet. Keine generativen Medien, keine fal.ai-Aufrufe, **keine Generierungskosten**.

## Ausgeführte Prüfung

- TypeScript mit `npm run typecheck` und Patch-Format mit `git diff --check` geprüft.
- Finale MP4 mit `ffprobe` geprüft: H.264, Full HD, 30 fps, exakt 480 dekodierte Frames und 16 Sekunden; eine Videospur, keine Audiospur. [Metadaten](../output/a1-test/qa/metadata.json).
- Gesamte MP4 mit FFmpeg fehlerfrei dekodiert.
- Repräsentative Bilder direkt aus der finalen MP4 bei Frames **60, 150, 225, 340, 450 und 479** als Übersicht angesehen; Intro und Portal zusätzlich in voller Größe kontrolliert.
- Bewegungs- und Schnittkontrolle anhand von **160 Bildern**, jedes dritte Frame von 0 bis 477. Alle vier Bildfolgen `motion-01.png` bis `motion-04.png` unter `output/a1-test/qa/` tatsächlich angesehen; Zuordnung im [Frame-Index](../output/a1-test/qa/motion-index.json).
- Kontrolliert: Schriftwirkung und Lesbarkeit, vollständige Logos, helle/dunkle Variante, rote Farbrollen, Browser-Inhalte, Abstände, Textüberläufe, Standzeiten, Fokuswechsel und Übergang zum schwarzen Schlussbild. Keine verbleibenden sichtbaren Überläufe oder abgeschnittenen Inhalte festgestellt.
- Zusätzlicher unabhängiger Code- und Bildreview ohne konkreten Befund. Die World-Direct-Dateien und das bestehende MP4 bleiben unverändert; Prüfsummen werden im lokalen QA-Verzeichnis festgehalten.

Die Bewegungsprüfung erfolgte über die dichte Bildfolge, nicht über eine behauptete Echtzeitwiedergabe. Der Film ist planmäßig stumm. Die im [A1-Kit](../brand/a1/BRAND.md) dokumentierten offenen Angaben zu Lizenzumfang, Logo-Schutzraum/Mindestgröße und verbindlicher Motion-CI bleiben offen; dieser Test definiert keine neuen allgemeinen CI-Regeln.

## Erneut rendern

```bash
npm run render:a1-test
npm run still:a1-test
npm run studio
```

Im Studio `A1Test` auswählen. Timeline: `src/compositions/A1Test.tsx`; Shots: `src/scenes/A1Scenes.tsx` und `src/scenes/A1Portal.tsx`; A1-Bausteine: `src/components/A1Brand.tsx`. Vorhandene World-Direct-Kompositionen verwenden weiterhin ihr separates Kit. Renderings und lokale Originalmedien sind gemäß Repository-Regel nicht in Git enthalten.
