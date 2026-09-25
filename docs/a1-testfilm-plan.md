# A1 · fiktiver CI-Testfilm

Status: **Fassung 1 vom Nutzer am 24.09.2026 mit „go“ freigegeben, umgesetzt und lokal geprüft.** Ergebnis: [a1-test.mp4](../output/a1-test/final/a1-test.mp4), [QA-Protokoll](a1-testfilm-qa.md). Keine kostenpflichtige Generierung.

## Briefing

- Auftrag: ein weiterer Testfilm mit dem neu zusammengestellten A1-Design.
- Referenz: der freigegebene [World-Direct-Test](world-direct-testfilm-plan.md); vergleichbare Länge, vier Shots und ein fiktives digitales Serviceportal.
- Ziel: A1 Serif und A1 Sans, rote Akzente, helle/dunkle Flächen und originale A1-Logos in Bewegung beurteilen.
- Freigegebenes Format: **16 Sekunden, 1920 × 1080, 16:9, 30 fps, MP4/H.264, ohne Ton**.
- Zielgruppe/Kanal: interne Sichtung, keine Veröffentlichung vorgesehen.
- Look: großzügige weiße Flächen, schwarze Serif-Headlines, grauer Sans-Fließtext, präzise rote Akzente. Optionales Hellblau nur als kleine Hintergrundfläche. Ruhige Einblendungen und kurze Verschiebungen; keine Rotation oder Verformung des Logos.
- Kennzeichnung: durchgehend „Fiktive Demo“. Das Portal trägt zusätzlich „UI-Entwurf · Beispieldaten“; kein reales A1-Produkt oder offizieller Mein-A1-Screen wird behauptet. Die Texte sind eigens gesetzte Demo-Texte, kein offizieller Claim.

## Storyboard und Shot List

Alle Asset-Pfade in der Tabelle sind relativ zu `public/`.

| Shot-ID | Zeit / Frames | Inhalt und Zweck | Material | Methode und Begründung |
| --- | --- | --- | --- | --- |
| `a1-test-01-intro` | 0–4 s / 0–119 | „Alles im Blick.“ / „Ein fiktiver digitaler Service.“ Große Serif-Headline links, positives Standardlogo rechts auf Weiß. Marke und Schriftwirkung etablieren. | `assets/brand/logos/a1/a1-standard-positive.png`, A1 Serif Regular, A1 Sans Regular | Originale in Remotion; Text sanft einblenden und wenige Pixel versetzen, Logo unverändert zeigen. |
| `a1-test-02-portal` | 4–9 s / 120–269 | „Ein Ort für Ihre Services.“ Browser-Mockup mit „Übersicht“, „Termine“, „Dokumente“. Ein Fokuswechsel von Übersicht zu Terminen; Beispieltermin „Projektgespräch“, roter Button „Termin ansehen“. UI-Lesbarkeit und Farbrollen testen. | A1 Sans Regular/Bold, A1 Serif Regular, konfigurierte Palette; vorhandene Browser-Mockup-Technik als Referenz | Fiktives UI deterministisch in React/Remotion gestalten. Für diesen Anschauungstest liegt kein reales Produkt-Screenrecording vor. Wenige große Inhalte statt vollständiger Produktoberfläche. |
| `a1-test-03-overview` | 9–13 s / 270–389 | „Das Wesentliche zählt.“ Drei geordnet aufgebaute Begriffe: „Übersicht“, „Termine“, „Dokumente“. Typografische Hierarchie und Rhythmus zeigen. | Konfigurierte Fonts und Farben; Weiß, helle Grauflächen, eine kleine hellblaue Fläche | Remotion-Typografie, Nummern und feine Trennlinien. Rote Hervorhebungen verwenden das dokumentierte Interaktionsrot. Keine Bilder oder zusätzlichen Icons erforderlich. |
| `a1-test-04-outro` | 13–16 s / 390–479 | „Alles im Blick.“ Weiß auf Schwarz, negatives Standardlogo daneben. Schlussbild mit ruhiger Standzeit; inverse Variante beurteilen. | `assets/brand/logos/a1/a1-standard-negative.png`, A1 Serif Regular, A1 Sans Regular | Kurze Remotion-Überblendung, danach stabiler Abschluss; Originalproportionen und freie Fläche um das Logo erhalten. |

Vorhandenes Material deckt Logos und Typografie ab; Layout und Bewegung lassen sich vollständig in Remotion bauen. Generative Bilder und Videos sind hierfür nicht erforderlich. **Keine fal.ai-Aufrufe, keine Generierungskosten.**

## Verbindliche Quellen und Arbeitsentscheidungen

- CI: [brand/a1/brand.json](../brand/a1/brand.json), [Nutzungsregeln](../brand/a1/BRAND.md) und [Asset-Inventar](../brand/a1/assets.json).
- Fonts: `assets/brand/fonts/a1/A1Serif-Regular.otf`, `A1Sans-Regular.otf`, `A1Sans-Bold.otf`; alle drei lokal laden, keine synthetischen Schnitte.
- Primärer Button: `#EB140A`; Links/Interaktionsakzente: `#B90A05`; Headlines: `#000000`; Copy: `#4F4F4F`; Hintergründe und Linien aus dem Kit. Original-Logofarben bleiben unangetastet.
- Die beiden Standardlogos genügen für diese Geschichte. Simplified-Varianten bleiben im Kit verfügbar.
- Layout-Abstände, Videoschriftgrößen und Bewegung werden als Gestaltung dieses Tests festgelegt. Sie sind keine nachträglich behaupteten A1-CI-Regeln.
- Die bereits im Kit dokumentierten offenen Punkte zu Schriftlizenz, Logo-Mindestgrößen/Schutzraum und Motion-Vorgaben bleiben bestehen. Für den lokalen Test ist keine zusätzliche Materiallieferung eingeplant.

## Umsetzung und Prüfung

- Eigenständige Composition `A1Test`, vier austauschbare Shots und gezielter Import des A1-Kits. Bestehende World-Direct-Kompositionen verwenden weiterhin ihr eigenes Kit.
- Ausgabe: `output/a1-test/final/a1-test.mp4`, `output/a1-test/final/a1-test.png`; lokale Kontrollbilder unter `output/a1-test/qa/`.
- Prüfen: tatsächliche Font-Ladung, unveränderte Logo-Proportionen, helle/dunkle Logoauswahl, Kontrast, Textumbrüche, UI-Lesbarkeit, Übergänge und Standzeiten.
- Finale MP4 vollständig dekodieren; 480 Frames, 30 fps, 16 Sekunden, Full HD und erwartetes Fehlen einer Audiospur kontrollieren.
- Repräsentative Frames und eine ausreichend dichte Bildfolge tatsächlich ansehen; erkennbare Probleme korrigieren und erneut rendern.

## Review

- Freigegebene Planfassung: **Fassung 1, Nutzerfreigabe „go“ am 24.09.2026**.
- Umsetzung, Rendering und lokale QA erfolgen autonom auf Basis dieses Ablaufs.
- Grundlage: [AGENTS.md, Produktionsworkflow 3](../AGENTS.md): „Present the plan for creative review before production.“
