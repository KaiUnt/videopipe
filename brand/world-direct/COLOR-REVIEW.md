# World Direct · Farbabgleich

Status: **Farbquelle vom Nutzer am 24.09.2026 bestätigt.** Das im Gespräch gelieferte Farbblatt „Die Farbpalette – Primär- und Sekundär-Farben“ entspricht der beschrifteten Tabelle auf Folie 8 von `WD CI Manual_2025.pptx`. Es ist die Quelle der digitalen Palette. Das WIP-Manual enthält zusätzlich eine unbeschriftete Palette und abweichende SVG-Farben; diese ersetzen die bestätigte Quelle nicht.

## Bestätigte Palette und digitale Umsetzung

Für [brand.json](brand.json) gelten einheitlich die **gedruckten Hex-Werte** des bestätigten Farbblatts. Das ist eine dokumentierte technische Umsetzungsregel, weil RGB-Text und Farbfeldfüllungen teilweise abweichen. Die Entscheidung für die Farbquelle ist abgeschlossen; diese Restabweichungen erfordern keine erneute Quellenfreigabe.

| Token | Bezeichnung | Digitaler Hex-Wert |
| --- | --- | --- |
| `blue1` | WD-Blau 1 | `#003A5D` |
| `blue2` | WD-Blau 2 | `#006EAD` |
| `blue3` | WD-Blau 3 | `#6EA1CF` |
| `green` | WD-Grün 1 | `#AFCA0B` |
| `ink` | Dunkles Grau | `#1E1F16` |
| `black` | Schwarz | `#000000` |
| `white` | Weiß | `#FFFFFF` |
| `gray1` | Grau 1 | `#EFEDEB` |
| `gray2` | Grau 2 | `#E0DCD8` |
| `gray3` | Grau 3 | `#D1CBC7` |
| `gray4` | Grau 4 | `#C6C0BB` |

`gray1` bis `gray4` entsprechen den benannten Sekundärfarben des bestätigten Blatts. `textGray` und `lightGray` aus der ersten Arbeitsauswahl entfallen als Tokens. Für Begleittext verwendet `colors.muted` jetzt `ink`. Original-SVGs bleiben byteidentisch und behalten ihre eingebetteten Farben; neue Gestaltung verwendet die obigen Tokens.

## Dokumentierte Abweichungen innerhalb des bestätigten Farbblatts

Diese Tabelle hält die beim ersten Quellenabgleich gefundenen Unterschiede fest. Die Spalte „Hex-Text“ ist die digitale Umsetzungsquelle; „RGB → Hex“ ist nur die mathematische Umrechnung des ausgeschriebenen RGB-Werts. Die tatsächlichen Füllfarben wurden aus der PPTX ermittelt, nicht aus dem Screenshot abgelesen.

| Bezeichnung | Hex-Text | RGB-Text → Hex | Tatsächliche Füllfarbe des Farbfelds |
| --- | --- | --- | --- |
| WD-Blau 1 | `#003A5D` | 0, 58, 93 → `#003A5D` | `#003A5D` |
| WD-Blau 2 | `#006EAD` | 0, 111, 174 → `#006FAE` | `#006EAD` |
| WD-Blau 3 | `#6EA1CF` | 111, 162, 207 → `#6FA2CF` | `#6EA1CF` |
| WD-Grün 1 | `#AFCA0B` | 175, 202, 11 → `#AFCA0B` | `#AFCA0B` |
| Dunkles Grau | `#1E1F16` | 30, 31, 22 → `#1E1F16` | `#25251E` |
| Schwarz | `#000000` | 0, 0, 0 → `#000000` | `#020203` |
| Weiß | `#FFFFFF` | 255, 255, 255 → `#FFFFFF` | kein direktes `solidFill` am alten Feld |
| Grau 1 | `#EFEDEB` | 240, 237, 236 → `#F0EDEC` | `#F0EDEC` |
| Grau 2 | `#E0DCD8` | 224, 220, 217 → `#E0DCD9` | `#E0DCD8` |
| Grau 3 | `#D1CBC7` | 209, 204, 200 → `#D1CCC8` | `#D1CCC8` |
| Grau 4 | `#C6C0BB` | 199, 192, 188 → `#C7C0BC` | `#C7C0BC` |

## Historische Vergleichswerte: zusätzliche unbeschriftete Palette

Farbfelder und Beschriftungen stimmen überein bei `#AFCA0B`, `#003A5D`, `#6FA1CE`, `#C7C5C1`, `#E0DCD8`, `#EFEDEC`, `#F6F6F6`, `#1D1D1B`, `#4C4C4C`. Weiß ist mit `#FFFFFF` beschriftet und verwendet die Theme-Farbe `bg1`.

Das mittlere Blau trägt die Beschriftung `#006DAF`, die tatsächliche Füllfarbe ist jedoch **`#006FAD`** und entspricht damit den gelieferten Logos und Hintergründen. Diese zusätzliche Palette ist keine Quelle der bestätigten Tokens.

## Abweichende Werte in Originaldateien und PowerPoint-Theme

| Quelle | Festgestellte Werte / Abweichungen |
| --- | --- |
| Drei Logo-SVGs | Blau `#003A5D`, `#006FAD`, `#6FA1CE`; Grün `#AFCA0B`; Wortmarken `#1D1D1B` |
| `Poly_BG_01.svg` | Grün **`#94AC0D`**; Grau `#EFEDEC`, `#E0DCD8`, `#D1CCC8`; Weiß und die drei Logo-Blautöne |
| `Poly_BG_02.svg` | ausschließlich die drei Logo-Blautöne |
| `Poly_BG_07.svg` | drei Logo-Blautöne, Weiß, `#EFEDEC`, `#E0DCD8` |
| PPT-Theme `WD CD 2_2020` | Blau 2 `#006DAC`, Blau 3 `#6DA0CF`, Grün `#95AB0C`; weitere abweichende Werte |

Diese Werte dokumentieren die gelieferten Dateien und sind von der bestätigten Palette zu unterscheiden. Die Originaldateien werden nicht umgefärbt. Das Theme wird nicht als CI-Palette importiert. `#94AC0D` bleibt eine Eigenschaft des gelieferten Hintergrunds, kein zusätzlicher Markenfarb-Token. Vollständige tatsächliche SVG-Paletten stehen in [assets.json](assets.json).

## Druckfarben

CMYK, Pantone und NCS werden für dieses digitale Kit nicht umgerechnet oder aus RGB abgeleitet. Die alten Druckangaben einschließlich Platzhaltern stehen im Originalmanual; verbindliche Produktionswerte für Druck separat bestätigen lassen.
