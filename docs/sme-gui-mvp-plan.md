# SME GUI · Screenrecording MVP 16:9

## Auftrag und Umfang

Umsetzungsauftrag vom 24.09.2026: erste 16:9-Fassung aus den beiden gelieferten Screenrecordings und der vorhandenen Sprecheraufnahme. Das gelieferte Drehbuch gibt die Geschichte vor; seine Zeitangaben werden ausdrücklich ignoriert. Der konkrete Auftrag „mach zuerst einfach mal die 16:9 variante … wirklich nur die screenrecords verbunden mit dem narrator“ autorisiert diesen lokalen MVP-Schnitt. Die Schnittfolge wurde im Arbeitsverlauf erläutert; eine gesonderte Freigabe der exakten Framezahlen wurde nicht eingeholt.

- Aussage: Netzwerkverwaltung für KMU wird durch die neue Oberfläche verständlich und selbst bedienbar.
- Format: 1920 × 1080, 16:9, 30 fps, H.264/AAC MP4; 1562 Frames / 52,067 Sekunden.
- Ton: vollständige englische Originalaufnahme, natürliche Geschwindigkeit, Pegel lokal angepasst.
- Gestaltung: reale Screenrecordings, direkte Schnitte, keine ergänzenden Titel, Musik, Mockups oder generativen Assets.
- Brand: A1 ist bereits Teil der realen Oberfläche. `brand/a1/brand.json` und `brand/a1/BRAND.md` wurden gelesen; keine zusätzlichen Brand-Elemente notwendig.
- Bildwechsel: Sprecherpausen und gesprochene Funktionsnamen. Wiedergabegeschwindigkeit ausschließlich beim stummen Screenrecording angepasst.

## Quellen

Quellordner: `/Users/Kai.Unterrainer/Library/CloudStorage/OneDrive-world-direct.at/Marketing - Dokumente/WD/Projekte/SME GUI Huawei/Promovideo`.

| Gelieferte Quelle | Lokale Originalkopie | Inhalt |
| --- | --- | --- |
| `nce-gui.mov` | `public/assets/screenrecordings/sme-gui/nce-gui.mov` | Alte Oberfläche, 85,292 s, 2442 × 1672, variable Framerate, ohne Ton |
| `SME GUI_1.mov` | `public/assets/screenrecordings/sme-gui/sme-gui.mov` | Neue Oberfläche, 48,25 s, 3840 × 2160, variable Framerate, ohne Ton |
| MP3 in `Narration/` | `public/assets/audio/sme-gui/narration.mp3` | Mark / ElevenLabs, 52,062 s, mono, 44,1 kHz |
| `Drehbuch für einen kurzen Videoclip.docx` | Nur gelesen; Extrakt in `output/sme-gui-mvp/work/analysis/screenplay.txt` | Handlung und Sprechertext, Zeitangaben ignoriert |

Die lokalen Originalkopien sind per SHA-256 mit den Quellen abgeglichen. Technische Metadaten und Hashes: `output/sme-gui-mvp/work/analysis/source-manifest.json`. Vorhandene Medien und Sprecher wurden ausschließlich lokal verarbeitet. Das mitgelieferte ElevenLabs-Audio wurde wiederverwendet; keine neue Sprachsynthese.

## Schnittliste

Zeiten in Sekunden, gerundet. Maßgebliche Framezahlen und austauschbare Shot-IDs: `src/lib/sme-gui-plan.ts`. Für jeden Shot reicht vorhandenes Nutzermaterial mit deterministischem Remotion-Schnitt; generative Bilder oder Videos sind nicht erforderlich.

| Shot | Filmzeit | Zweck / Sprecher | Quelle und In–Out | Umsetzung / Begründung |
| --- | --- | --- | --- | --- |
| sme-01a-problem-ssid | 0,000–5,300 | Specialist knowledge | Alt 43,000–46,200 | Dichte SSID-, Funk- und Radio-Optionen; leicht verlangsamt |
| sme-01b-problem-radio | 5,300–10,267 | Too technical and complex | Alt 48,000–53,000 | Weitere Radio-Einstellungen; Ladeunterbrechung übersprungen |
| sme-02-solution | 10,267–16,800 | New experience for small and medium business customers | Neu 0,400–2,700 | Ruhiger Einstieg in die neue Oberfläche |
| sme-03-overview | 16,800–22,800 | Locations and key network metrics | Neu 2,700–4,800 | Nahtlose Fortsetzung derselben Overview-Einstellung |
| sme-04-wifi | 22,800–28,400 | View and configure Wi-Fi | Neu 6,000–13,500 | Übersicht, Standortwechsel, Bearbeitungsdialog; an Satzlänge angepasst |
| sme-05-devices | 28,400–30,067 | Network devices | Neu 15,000–16,667 | Geladene vollständige Geräteliste, ohne Suchfilter |
| sme-06-clients | 30,067–37,167 | Connected clients and health ratings | Neu 23,000–26,800 | Client-Liste mit sichtbaren Health-Werten; ohne verdeckenden Detaildialog |
| sme-07-changes | 37,167–44,467 | Track every network change | Neu 33,000–38,000 | Geladenes englisches Änderungsprotokoll; vor Sprach-/Theme-Wechsel geschnitten |
| sme-08-close | 44,467–52,067 | Less complexity … Network management made simple | Neu 0,800–4,500 | Zurück zur ruhigen Übersicht bis zum Ende des vollständigen Claims |

Alte Aufnahme: Ausschnitt 2304 × 1296 bei x70/y226 entfernt Browserrahmen und schwarzen Rand; proportional auf 1920 × 1080. Der Ausschnitt lässt die technischen Einstellungen stehen. Die bereits in der Quellaufnahme horizontal angeschnittenen linken Menütexte können durch Schnitt nicht wiederhergestellt werden. Neue Aufnahme: vollständiges 16:9-Bild, auf 1080p skaliert.

## Reproduktion

1. Originaldateien an die oben genannten lokalen Pfade kopieren; die Quelldateien bleiben unverändert.
2. `npm run prepare:sme-gui`: FFmpeg erstellt CFR-Arbeitskopien bei 30 fps sowie eine pegelangepasste WAV-Datei. Keine Schnittentscheidungen oder Retimings in diesem Schritt.
3. `npm run typecheck`.
4. `npm run studio -- --no-open` → Composition `SmeGuiMvp`.
5. `npm run render:sme-gui` → `output/sme-gui-mvp/final/sme-gui-mvp-16x9.mp4`.
6. `npm run still:sme-gui` → Beispielbild im WLAN-Abschnitt.

Alle Quell- und Arbeitsmedien sowie `output/` sind durch die bestehenden Ignore-Regeln lokal gehalten. Verwendete technische Guidance: [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills), insbesondere create, markup, studio und render; [Video API](https://www.remotion.dev/docs/media/video) für Quelltrims, Geschwindigkeit und Crop.

## Generierung und Kosten

Keine neuen generativen Medien, kein fal.ai-Aufruf, keine kostenpflichtige API. Transkription zur Schnittplanung lokal mit faster-whisper; Modell nur heruntergeladen, Audiodatei nicht hochgeladen. Bestehende Kosten der gelieferten ElevenLabs-Aufnahme sind unbekannt.

## QA und Grenzen

Sprecherabgleich: `docs/sme-gui-narration.md`. Renderprüfung und verbleibende Einschränkungen: `docs/sme-gui-mvp-qa.md`.
