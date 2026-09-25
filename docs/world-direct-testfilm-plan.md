# World Direct · fiktiver CI-Testfilm

Status: **Fassung 1 vom Nutzer am 24.09.2026 freigegeben** („passt los“), umgesetzt und lokal geprüft. Ergebnis: [world-direct-test.mp4](../output/world-direct-test/final/world-direct-test.mp4), [QA-Protokoll](world-direct-testfilm-qa.md). Keine kostenpflichtige Generierung.

## Briefing

- Auftrag: fiktiver Testlauf mit den neuen World-Direct-Daten, ähnlich dem bisherigen Test.
- Referenz: `StudioDemo` / `output/studio-demo/final/studio-demo.mp4` (12 Sekunden, vier Shots: Intro, Mockup, Merkmale, Outro; ohne Ton).
- Ziel: Logo-Prioritäten, bestätigte Farbpalette, Cairo, Polygon-Hintergründe und lesbare UI-Darstellung im Zusammenspiel prüfen.
- Freigegebenes Format: **16 Sekunden, 1920 × 1080, 16:9, 30 fps, MP4/H.264**, ohne Ton. Etwas mehr Lesezeit als im ersten Demo-Film.
- Publikum/Kanal: interne Sichtung; fiktives digitales Serviceportal als Anschauungsbeispiel, keine Veröffentlichung geplant.
- Tonalität: deutsch, klar, partnerschaftlich; Cairo Light/Regular, viel Weißraum, Blau, wenig Grün. Ruhige kurze Einblendungen und Verschiebungen als Testgestaltung, noch keine verbindliche Motion-CI.
- Kennzeichnung: „Fiktive Demo“ bleibt im Film sichtbar. Die UI trägt zusätzlich „Beispieldaten“ und behauptet kein reales WD-Produkt oder Kundenprojekt.

## Story und Shot List

| Shot-ID | Zeit / Frames | Text und Zweck | Quelle | Methode und Begründung |
| --- | --- | --- | --- | --- |
| `wd-test-01-intro` | 0–4 s / 0–119 | „Ihre digitale Zukunft.“ / „Einfach im Blick.“; Marke und Thema etablieren | `assets/brand/logos/WD_Logo claim.svg`, `assets/brand/images/backgrounds/Poly_BG_07.svg`, Cairo-Fonts | Originale mit Remotion einblenden; feine Typografie, ruhige weiße Textfläche, kurze Bewegung |
| `wd-test-02-portal` | 4–9 s / 120–269 | „Alles an einem Ort.“ / „Anfragen. Termine. Dokumente.“; fiktives Serviceportal in einem Browser-Mockup zeigen | vorhandene Mockup-Struktur als technische Referenz; deterministisch gebautes UI mit sichtbar erfundenen Beispieldaten, kein Produkt-Screenrecording vorhanden | React/Remotion; lesbare UI und ein klarer Fokuswechsel zwischen Bereichen, ohne erfundene Erfolgskennzahlen |
| `wd-test-03-overview` | 9–13 s / 270–389 | „Klar. Verbunden. Für Sie.“; drei Begriffe nacheinander aufbauen | `assets/brand/logos/WD_Isotype.svg`, konfigurierte Farben und Cairo | Remotion-Typografie und einfache Linien; Isotype als gestalterischer Markenanker, Grün nur klein und gezielt |
| `wd-test-04-outro` | 13–16 s / 390–479 | „Gestalten wir Ihre digitale Zukunft.“; Abschluss mit farbigem Claim-Logo | `assets/brand/logos/WD_Logo claim.svg`, vorhandener Polygon-Hintergrund | ruhiger Remotion-Abschluss; genügend Standzeit für Claim und Lesbarkeit |

Die Methodenentscheidung pro Shot folgt: gelieferte Originale zuerst, ergänzende Gestaltung deterministisch in Remotion. Generative Bilder oder Videos bieten hier keinen Nutzen. Es gibt keinen fal-Plan, keinen billablen Aufruf und keine Generierungskosten.

## Quellen und Abgrenzung

- CI: `brand/world-direct/brand.json` und `brand/world-direct/BRAND.md`; digitale Farben gemäß bestätigtem Farbblatt, Logo-SVGs unverändert.
- Logos: Claim als Standard, Isotype für Gestaltung; Blocklogo wird für diesen Plan nicht benötigt.
- Schriften: lokale Cairo-Dateien inklusive `assets/brand/fonts/OFL.txt`.
- Referenzanimation: `assets/video/brand/WD_Logo.mov` ist vorhanden, 11,33 Sekunden lang und optional. Für den kurzen Test sind einfache Einblendungen vorgesehen; der Clip wird nicht automatisch eingebaut oder beschleunigt.
- Keine geeigneten Produktaufnahmen oder Audio-Assets geliefert. Das ausdrücklich fiktive UI wird als solches gekennzeichnet; der Film bleibt wie der bisherige Test ohne Ton.

## Umsetzung und Prüfung

- Eigenständige Composition `WorldDirectTest`, vier getrennt austauschbare Shots; die bisherige Demo bleibt als Vergleich erhalten.
- Ergebnis: `output/world-direct-test/final/world-direct-test.mp4`, Vorschaubild `output/world-direct-test/final/world-direct-test.png`, Kontrollbilder unter `output/world-direct-test/qa/` und [QA-Notiz](world-direct-testfilm-qa.md).
- Prüfung: Schriftladung, Logo/Claim vollständig und lesbar, Farben, UI-Texte, Umbrüche, Abstände, Schnitte und Bewegungsabläufe. Gesamtlänge/Bildrate/Dateiformat sowie erwartetes Fehlen einer Tonspur technisch prüfen.
- Repräsentative Frames tatsächlich ansehen, Bewegung anhand einer lokalen Vorschau bzw. ausreichend dichter Bildfolge kontrollieren; erkennbare Probleme beheben und erneut rendern.

## Review

- Nutzerfreigabe dieser Fassung: **erteilt** am 24.09.2026 mit „passt los“.
- Der vorgeschlagene 16-Sekunden-Ablauf ist übernommen; keine offene Entscheidung zum Timing.
- Grundlage für diesen Review-Schritt: `AGENTS.md`, Produktionsworkflow 3: „Present the plan for creative review before production.“ Nach Freigabe erfolgen Aufbau, Render und lokale QA autonom.
