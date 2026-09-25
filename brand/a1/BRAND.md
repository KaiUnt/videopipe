# A1 · Kompaktes CI-Kit

Stand: 24.09.2026. Arbeitsgrundlage aus dem lokalen Projekt **A1 Design**, zugeschnitten auf einfache Layouts und spätere Videopläne. Die Auswahl basiert auf dokumentierten Foundations und Originaldateien im Katalog. Sie ersetzt kein vollständiges A1-CI-Manual.

## Inhalt und Einstieg

- [Vorschau im Browser](preview.html): Logos, Farben und Schriften nebeneinander; ohne Server oder externe Dienste.
- [Gerendertes Vorschaubild](../../output/brand/a1/final/a1-ci-kit.png): lokale PNG-Übersicht.
- [brand.json](brand.json): Farben, Schriftrollen, Logo-Pfade und Quellenbelege.
- [kit.css](kit.css): drei lokale Font-Faces und acht Farbvariablen unter `[data-brand="a1"]`.
- [assets.json](assets.json): Herkunft, SHA-256, Dateigrößen und Abmessungen der sieben Originaldateien.
- [Logos](../../public/assets/brand/logos/a1/) und [Schriften](../../public/assets/brand/fonts/a1/): getrennte A1-Unterordner im öffentlichen Asset-Verzeichnis.

Dieses Kit liegt separat neben `brand/world-direct/`. Seine Medienpfade sind relativ zu `public/` und können in Remotion mit `staticFile()` verwendet werden. Für eine A1-Komposition gezielt `brand/a1/brand.json` importieren und die dortigen Font-Faces laden. Die bestehende `Brand.tsx` importiert ausdrücklich `brand/world-direct/brand.json`; ein zentraler Marken-Umschalter ist nicht eingerichtet.

## Farben

| Rolle | HEX |
| --- | --- |
| Primäre Buttons | `#EB140A` |
| Links, Icons, Fehlerhinweise | `#B90A05` |
| Headlines, aktive Elemente | `#000000` |
| Fließtext und Sublines | `#4F4F4F` |
| Trennlinien auf Weiß | `#BCBCBC` |
| Heller Hintergrund | `#F8F8F8` |
| Basis / inverse Schrift | `#FFFFFF` |
| Optionaler blauer Hintergrund | `#E2ECFF` |

Maßgeblich sind `documented_colors` in `design-system/foundations/colors.json`. Dort ist der Konflikt um Main Red explizit zugunsten **`#EB140A`** aufgelöst; der ältere Figma-Style `#DA291C` gilt als abweichender Quellenbeleg. Logo-Schattierungen sind Bestandteil der gelieferten Grafik und werden nicht an einen Farbtoken angeglichen.

## Logos

| Datei | Auswahl |
| --- | --- |
| `a1-standard-positive.png` | Standard auf hellem Grund; Default der Katalogkomponente |
| `a1-standard-negative.png` | Standard auf dunklem Grund |
| `a1-simplified-positive.svg` | Vereinfachte Vektorvariante auf hellem Grund |
| `a1-simplified-negative.svg` | Vereinfachte Vektorvariante auf dunklem Grund |

Alle vier Dateien wurden unverändert kopiert. Proportionen und vorhandenen Bildausschnitt erhalten; `object-fit: contain` verwenden. Keine Neufärbung, Verzerrung oder zusätzlichen Logo-Effekte. Die vereinfachte Variante ist eine belegte Stiloption, aber es liegt keine verbindliche Größen-Schwelle für ihren Einsatz vor. Das Standardlogo wird als transparentes PNG übernommen; die ebenfalls vorhandenen großen SVG-Dateien mit eingebetteten Bitmaps bringen hierfür keinen Vektorvorteil.

## Typografie

- **Headlines:** A1 Serif Regular, 400 → CSS-Familie `A1 DS Serif`.
- **Fließtext / Sublines:** A1 Sans Regular, 400 → CSS-Familie `A1 DS Sans`.
- **Hervorhebungen / Microheadlines:** A1 Sans Bold, 700.

Die CSS-Familien entsprechen den Aliasnamen im Quellprojekt. Kein synthetisches Bold oder Italic. Als belegte Desktop-Referenzen gelten beispielsweise H1 40/52 px, H2 32/40 px und Copy 16/24 px. Diese Web-Maße sind keine Vorgabe für 1080p-Videos; Schriftgröße und Timing werden im jeweiligen Filmplan festgelegt. Die Vorschau zeigt frei gesetzte Schriftproben, kein rekonstruiertes Kataloglayout.

## Auswahlgrenze und offene Punkte

Für das kleine Setup genügen vier Logos, drei OTF-Dateien und die Grundpalette. Business-Zusatz, Condensed-/Light-Schnitte, große Raster-SVG-Duplikate, UI-Komponenten, Produktbilder und der vollständige Token-Katalog wurden nicht übernommen. Es wird kein Claim ergänzt.

Bei Gelegenheit nachreichen:

1. **Schriftlizenz / Nutzungsumfang:** Im übernommenen Designsystem wurde keine separate Lizenzdatei gefunden. Das Quellprojekt unterscheidet ausdrücklich zwischen technischer Verfügbarkeit und Lizenzfreigabe.
2. **Logo-Schutzraum und Mindestgrößen:** In den ausgewählten Quellen nicht verbindlich belegt.
3. **Für einen späteren Film:** Falls vorhanden, Motion-Regeln, Intro/Outro und freigegebener Claim.

## Fiktiver Testfilm

Der freigegebene 16-Sekunden-Test ist als Composition `A1Test` umgesetzt: [Film](../../output/a1-test/final/a1-test.mp4), [Produktionsplan](../../docs/a1-testfilm-plan.md), [QA](../../docs/a1-testfilm-qa.md). Er verwendet die beiden Standardlogos, alle drei Fonts und eine ausdrücklich fiktive Serviceoberfläche; ohne Ton.

`src/components/A1Brand.tsx` bindet dieses Kit gezielt ein. `npm run render:a1-test` rendert die MP4, `npm run still:a1-test` das Vorschaubild. Im Remotion Studio ist `A1Test` separat auswählbar.

## Herkunft

Quelle: `/Users/Kai.Unterrainer/A1 Design/design-system/`. Farben aus `foundations/colors.json`, Typografie aus `foundations/typography.json`, Font-Zuordnung aus `foundations/fonts.json`, Varianten und Default aus `catalog/components/a1-logo-2180-53062.json`. Die Bilddateien stammen aus `logos/A1_Identifier_Business/`, die Fonts aus `fonts/`.

Quellpfade, JSON-Pointer und Dokument-Hashes stehen in `brand.json`; die Datei-Hashes in `assets.json`. Das Kit ist eine lokale Auswahl aus diesem Stand, keine Installation oder Validierung eines versionierten Consumer-Pakets. Das Quellprojekt wurde ausschließlich gelesen.

Geprüft am 24.09.2026: sieben byteidentische Asset-Kopien, Konfigurations- und CSS-Verweise sowie Quellen-Hashes. Die HTML-Vorschau wurde bei 1440 und 390 px Breite in Chromium gerendert und visuell geprüft; alle drei Font-Faces und alle Logos laden lokal, ohne horizontalen Überlauf. Lokale Prüfbilder und Lade-Metadaten liegen unter `output/brand/a1/qa/`.
