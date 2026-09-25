# SME GUI MVP · Renderprüfung

Geprüft am 24.09.2026. Auftrag und Schnittliste: [Produktionsplan](sme-gui-mvp-plan.md). Sprecheranalyse: [Narration](sme-gui-narration.md).

## Lieferung

- Composition: `SmeGuiMvp`.
- Film: `output/sme-gui-mvp/final/sme-gui-mvp-16x9.mp4`.
- Beispielbild: `output/sme-gui-mvp/final/sme-gui-mvp-16x9.png`.
- 1920 × 1080, 16:9, 30 fps, 1757 Videoframes / 58,566667 s; H.264, yuv420p; AAC, 48 kHz, Stereo aus Monoquelle.
- AAC-Padding ergibt eine Containerlaufzeit von etwa 58,624 s. Kein Sprecherwort wird abgeschnitten.
- Remotion Studio: `npm run studio`, Composition `SmeGuiMvp`; Render: `npm run render:sme-gui`.

## Bild und Schnitt

Quellaufnahmen über Kontaktbögen und ausgewählte Vollbilder tatsächlich angesehen. Anschließend 21 repräsentative Frames direkt aus der gerenderten MP4 extrahiert und den Kontaktbogen angesehen. Zusätzlich alte Oberfläche in 0,5-Sekunden-Abständen sowie WLAN in 0,4-Sekunden-Abständen unabhängig visuell kontrolliert; WLAN-Dialog und Client-Health-Liste auch bei 1920 × 1080 angesehen.

Kontrolliert:

- Neuer A1-Startscreen mit „SME-GUI Network Management Made Simple“ vor Beginn der Sprecheraufnahme.
- Start der alten Aufnahme bei Quellsekunde 37 mit horizontalem Scroll nach rechts; der alte Abschnitt läuft nun kontinuierlich über Modify in die Detail-/Radio-Bereiche, ohne zweiten alten Zwischenschnitt.
- Browserrahmen / schwarze Außenränder der alten Aufnahme wieder mit dem ursprünglichen 16:9-Ausschnitt entfernt; der Scroll zeigt die zuvor seitlich verborgenen Tabellenbereiche.
- Vollständige neue Oberfläche und originales A1-Branding, keine erfundenen UI-Inhalte.
- Reihenfolge passend zur Aufnahme: Lösung / Overview → WLAN → Geräte → Clients / Health → Änderungen → Abschluss auf Overview.
- Einzelne Funktionsseiten zu den passenden gesprochenen Wörtern. Geräte rund 4,17 s inklusive Suchfeldeingabe und gefilterter Anzeige; der folgende Clients-Clip wurde vorne gekürzt und wechselt bei „including easy to read …“.
- WLAN bei rund 1,34-facher Quellgeschwindigkeit; Bearbeitungsdialog etwa 2,7 s erkennbar, alle Bedienelemente innerhalb des Bildes.
- Sprach- und Theme-Wechsel aus dem Ende der neuen Quellaufnahme ausgelassen.
- Ab 50,000 s hält der Schluss-Shot als Standbild, weil sich der Screeninhalt nicht mehr sinnvoll verändert und nur der Cursor bewegt.
- Outro entspricht dem A1-Startscreen.
- Keine schwarzen Zwischenbilder: vollständiger FFmpeg-Decodelauf und `blackdetect` ohne Fund.
- Ruhige lange Einstellungen auf Overview, Client-Liste und Änderungsprotokoll sind beabsichtigt. Der Freeze-Detektor erkennt diese weitgehend unveränderten UI-Zustände; keine fehlenden Quellframes festgestellt.

Nachweise: `output/sme-gui-mvp/qa/rendering/final/` und `output/sme-gui-mvp/qa/footage-review/final/review.md`. Frühe Prüfbilder unter `output/sme-gui-mvp/qa/rendering/frames/` sind Entwicklungsartefakte; maßgeblich ist die finale MP4.

## Sprecher und Ton

Die vollständige gelieferte Narration wurde lokal transkribiert und gegen das Drehbuch abgeglichen. Auch die erste vollständige Export-Tonspur wurde lokal transkribiert: 125 von 125 normalisierten Wörtern stimmen mit der Quelle überein, einschließlich „Network management made simple“. Nach dieser Inhaltsprüfung wurde nur der konstante Exportpegel um 3,01 dB abgesenkt, um den Lautheitsanstieg durch Mono-zu-Stereo zu kompensieren.

Keine Schnitte, Beschleunigung, Synthese oder inhaltliche Änderung der Stimme. Wellenformvergleiche über den gesamten Film bestätigen unverändertes Tempo und Pausen ohne zunehmenden Versatz. Konstanter AAC-/Render-Versatz etwa 42,7 ms, Schlussclaim vollständig und rund 0,37 s Ausklang erhalten.

Pegelaufbereitung mit FFmpeg-Zweipass-Loudnorm; Original-MP3 unverändert. Fertiger Stereoexport: **−16,2 LUFS**, **−4,4 dBTP**, LRA 2,8 LU; keine Audio-Decodierfehler. Der vollständige PCM-Vergleich nach der letzten Pegelanpassung bestätigt alle 2.498.978 Quellsamples mit Korrelation 0,999941 bei konstantem Versatz. Endgültige Messwerte, Decodierprüfung und Korrelationsnachweise: `output/sme-gui-mvp/work/analysis/render-narration-qa.md` und `.json`.

**Grenze der Audioprüfung:** lokale Transkription, Signalvergleich, Pegel- und Decodierprüfung aus der Erstfassung. Für die zweite Fassung wurde die unveränderte Sprecheraufnahme um den 2,5-s-Startscreen verschoben, aber nicht neu inhaltlich transkribiert. Keine subjektive Hörkontrolle behauptet.

## Technische Prüfung

- `npm run typecheck` bestanden.
- Intro, sieben austauschbare Screenrecording-Shots und Outro bilden eine lückenlose Timeline ohne unbeabsichtigte Überlappung; Summe 1757 Frames.
- Remotion-Rendering erfolgreich; Video aus fertiger MP4 vollständig decodiert.
- Originalkopien per SHA-256 mit OneDrive-Quellen abgeglichen.
- Vorhandene Repository-Änderungen erhalten; keine neuen Runtime-Abhängigkeiten.
- Remotion benötigt in dieser macOS-Umgebung einen Browserstart außerhalb der Sandbox; der lokale Render wurde dafür über die automatische Freigabe ausgeführt.

## Verbleibende Grenzen und Kosten

- Linke Menütexte der alten Oberfläche sind teilweise bereits im Ausgangsmaterial horizontal angeschnitten; der Schnitt rekonstruiert sie nicht.
- Der Film bleibt ein Screenrecording-MVP. Kleine Tabellenwerte sind bei Darstellung deutlich unter 1080p entsprechend klein; keine nachgebauten Vergrößerungen oder erklärenden Overlays hinzugefügt.
- Die vorhandene Overview-Aufnahme zeigt einen ausgewählten Standort. Zusätzliche Standorte oder Kennzahlen wurden nicht erfunden, auch wenn der Sprecher die allgemeine Mehrstandort-Funktion beschreibt.
- Keine generativen Bilder/Videos, kein fal.ai-Aufruf, keine bezahlte API. Die vorhandene ElevenLabs-Aufnahme wurde wiederverwendet; ihre ursprünglichen Kosten sind unbekannt.
