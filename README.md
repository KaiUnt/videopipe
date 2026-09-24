# Agentic AI Video Studio

Ein kleines, agentunabhängiges Studio für programmatisch erstellte Videos. **Remotion** baut die Timeline, Szenen, Mockups, Animationen und das finale MP4. **fal.ai** kann nach Freigabe fehlende Bilder oder Videoclips ergänzen. Vorhandene Ideen und Medien des Nutzers sind der Ausgangspunkt.

## Schnellstart

Voraussetzung: Node.js ab Version 20 und npm. Für Remotion-Videos ohne generative Shots ist kein fal.ai-Konto nötig.

```bash
npm install
npm run studio
```

Das Studio öffnet eine lokale Vorschau. Die mitgelieferte Composition heißt `StudioDemo` und kann ohne externe Medien gerendert werden. Weitere Befehle:

```bash
npm run compositions   # verfügbare Compositions anzeigen
npm run render         # Demo als MP4 in output/ rendern
npm run render:still   # einen Kontrollframe in output/ rendern
npm run typecheck      # TypeScript prüfen
```

Für ein reales Video zuerst Bildformat und Framerate festlegen, Nutzerdateien nach `public/assets/` kopieren, einen Plan erstellen und die Shots in Remotion umsetzen. Die Demo ist der technische Startpunkt, kein festes Format für künftige Filme.

## Mit einem Coding Agent arbeiten

`AGENTS.md` enthält die verbindlichen Projektregeln für Codex, Claude Code, GitHub Copilot und andere Agenten. Die kleinen Dateien unter `.claude/` und `.github/` verweisen nur dorthin. Ein typischer Auftrag beginnt so:

> Ich möchte ein 30-Sekunden-Produktvideo im 16:9-Format. Hier sind mein Skript, Logo und zwei Screenrecordings. Sieh dir zuerst das Material an, schlage Storyboard und Shot List vor und besprich die kreativen Entscheidungen mit mir.

Der Ablauf ist:

1. **Briefing und Material sichten:** Idee, Skript, Videos, Screenrecordings, Screenshots, Logos, Fotos, Audio, Brand Assets und Referenzen des Nutzers erfassen.
2. **Gemeinsam planen:** Kernidee, Dramaturgie, Text, Storyboard und Shot List ausarbeiten. Die Vorlage steht in [`docs/shot-list-template.md`](docs/shot-list-template.md).
3. **Plan prüfen und freigeben:** Pro Shot Quelle, Länge, Umsetzung und offene Fragen zeigen. Nutzerentscheidungen gehen vor. Für kostenpflichtige Generierung gibt es eine separate, ausdrückliche Freigabe des konkreten fal-Plans.
4. **Produzieren:** Assets aufbereiten, Shots unabhängig bauen, in der Remotion-Timeline zusammensetzen, Ton und Übergänge ergänzen, rendern.
5. **Visuell prüfen:** Repräsentative Frames und den Film auf Lesbarkeit, Timing, Schnitt, Mockups, Markenbild und Medienqualität prüfen; erkennbare Fehler beheben und neu rendern.

Die Freigabe des Produktionsplans erlaubt normale technische Arbeit ohne Bestätigung jedes Einzelschritts. Sie erlaubt keine unbenannten, kostenpflichtigen fal.ai-Aufrufe.

## Projektaufbau

| Pfad | Zweck |
| --- | --- |
| `src/` | React-/TypeScript-Code für Remotion-Compositions, Shots und Hilfsfunktionen |
| `src/lib/fal/` | optionale serverseitige fal.ai-Anbindung |
| `public/assets/video/`, `screenrecordings/`, `images/`, `audio/`, `brand/` | lokale Originalmedien des Nutzers |
| `generated/` | heruntergeladene generative Quellen und `manifest.json` mit Herkunftsdaten |
| `public/generated/` | für Remotion zugängliche Kopien generierter Medien |
| `output/` | lokale Renderings und Kontrollbilder |
| `docs/` | Planungsunterlagen und Shot-List-Vorlage |

Dateien unter `public/` werden in Remotion über `staticFile()` referenziert. Originalmedien, generierte Dateien und Renderings sind standardmäßig nicht für Git vorgesehen. Wer Medien bewusst veröffentlichen will, sollte deren Rechte und Dateigröße prüfen und sie gezielt hinzufügen. Die Projektstruktur erlaubt es, einzelne Shots zu ändern oder auszutauschen, ohne die gesamte Produktion neu zu planen.

### Screenrecordings und Mockups

Echte Aufzeichnungen der Produktoberfläche bleiben das Bildmaterial. Remotion kann sie schneiden, skalieren, maskieren, in Browser-, Laptop-, Telefon- oder Tablet-Rahmen setzen, mit Zooms und Callouts versehen und mit Typografie kombinieren. UI-Text, Logos und Produktdetails sollen dabei lesbar und korrekt bleiben. Generierte Videos sind für exakte Benutzeroberflächen ungeeignet.

## Optionale Generierung mit fal.ai

Die fal.ai-Anbindung unterstützt Text-zu-Video, Bild-zu-Video, Referenz-zu-Video und Text-zu-Bild. Sie ist für Motive gedacht, die mit vorhandenem Material und Remotion nicht sinnvoll entstehen: etwa neue reale Szenen, Menschen, Landschaften oder natürliche Bewegung. Jeder generative Shot benötigt einen Grund in der Shot List.

Einen API-Schlüssel nur lokal in einer nicht eingecheckten `.env` oder in der Prozessumgebung setzen:

```bash
cp .env.example .env
# FAL_KEY in .env eintragen
```

Unter Windows PowerShell kann die Datei stattdessen mit `Copy-Item .env.example .env` kopiert werden. `FAL_KEY` bleibt serverseitig; Remotion-React-Code darf ihn nicht importieren.

Die Abfolge für geplante Generierungen ist **Plan → Review → Approve → Generate**. Ein Plan beschreibt die Shots, Aufgabe, Prompt, Modell und Parameter. Modell-IDs, Eingaben und Preise müssen vor Verwendung auf den aktuellen offiziellen fal.ai-Modellseiten überprüft werden.

```bash
npm run fal -- dry-run <plan.json>
# Ausgabe und Plan-Hash mit dem Nutzer prüfen; Kosten nur bei verlässlicher Quelle nennen.
# Erst nach ausdrücklicher Freigabe genau dieses Plans:
npm run fal -- generate <plan.json> --approved <hash-aus-dem-dry-run>
```

Der Dry-Run löst keine kostenpflichtige Generierung aus. Die Generierung speichert Ergebnisse lokal, protokolliert bekannte Metadaten in `generated/manifest.json` und stellt die Medien unter `public/generated/` für Remotion bereit. Bereits passende Ergebnisse sollen wiederverwendet werden. Ein technischer Hash ersetzt keine Zustimmung des Nutzers. Das Repository-Setup und der Demo-Render benötigen keinen kostenpflichtigen fal-Aufruf.

Der Beispielplan unter `examples/fal-plan.example.json` lässt sich direkt per Dry-Run prüfen. Nach einer freigegebenen Generierung legt die CLI zusätzlich `generated/remotion-props.json` an. Damit kann `StudioDemo` die generierten Shots direkt rendern:

```bash
npm run render -- --props=generated/remotion-props.json
```

`npm run fal -- props <plan.json>` baut diese Props später aus bereits katalogisierten Ergebnissen erneut auf, ohne einen fal.ai-Aufruf. Ohne `--base` enthält die Datei nur generierte Shots. Für einen Mischfilm die vorhandene Shot List als Basis angeben:

```bash
npm run fal -- props <plan.json> --base <existing-props.json>
npm run render -- --props=generated/remotion-props.json
```

`--base` funktioniert ebenso bei `generate`, nach Freigabe: `npm run fal -- generate <plan.json> --approved <hash> --base <existing-props.json>`. Bei gleicher Shot-ID ersetzt die CLI nur `asset.path` und `asset.type`; Titel, Gerät und Timing bleiben erhalten. Neue generierte Shots werden hinten angefügt. `examples/with-screenrecording.props.json` zeigt eine Basis mit echter Aufnahme.

## Eigene Shot-Props und fal-Plan

Ein minimales `plan.json` für den fal-Dry-Run hat diese Form. Ohne `model` verwendet die Integration den hinterlegten Standard für die Aufgabe:

```json
{
  "version": 1,
  "shots": [
    {
      "id": "shot-04",
      "task": "textToVideo",
      "prompt": "Eine ruhige Berglandschaft bei Sonnenaufgang",
      "reason": "Es gibt keine passende Aufnahme im vorhandenen Material."
    }
  ]
}
```

Der Dry-Run benötigt keinen `FAL_KEY` und ruft fal.ai nicht auf. Er zeigt den Hash, den Link zur offiziellen Modellpreis-Seite und eine Schätzung nur dort, wo die Kosten verlässlich ableitbar sind. Hinterlegte Preisdaten gelten sieben Tage; danach oder bei unsicheren Zuschlägen bleibt die Schätzung leer. Der Hash muss zusammen mit dem genauen Plan vom Nutzer freigegeben werden.

Ein generierter Clip lässt sich ohne Codeänderung als Shot einbinden. Der Medienpfad ist relativ zu `public/`:

```json
{
  "shots": [
    {
      "id": "product",
      "kind": "mockup",
      "durationInFrames": 120,
      "title": "Echte Produktaufnahme",
      "device": "laptop",
      "asset": {
        "path": "assets/screenrecordings/demo.mp4",
        "type": "video",
        "fit": "contain"
      }
    },
    {
      "id": "shot-04",
      "kind": "media",
      "durationInFrames": 90,
      "asset": {
        "path": "generated/video/shot-04.mp4",
        "type": "video",
        "fit": "contain",
        "trimBefore": 0,
        "volume": 0
      },
      "title": "Neue Szene"
    }
  ]
}
```

Diese Daten als `video-props.json` speichern und mit `npm run render -- --props=video-props.json` rendern. `StudioDemo` berechnet die Länge aus den Shots; das MP4 liegt unter `output/studio-demo.mp4`. Die Demo verwendet 30 Bilder pro Sekunde. Für den Mockup-Shot muss die genannte Screenrecording-Datei vorhanden sein.

## Qualität und Grenzen des ersten Tests

Mit `npm run studio`, `npm run typecheck` und `npm run render` lässt sich die lokale Remotion-Strecke prüfen. Für den ersten kreativen End-to-End-Test sollten, sobald vorhanden, echte Nutzeraufnahmen und Brand Assets in eine mehrteilige Composition einfließen. Ein finales MP4 wird anschließend anhand von Standbildern oder einer Vorschau sichtbar kontrolliert. Ein erfolgreicher Render allein bestätigt nur die Technik.

## Aktuelle technische Referenzen

- [Remotion-Dokumentation](https://www.remotion.dev/docs/) und [Remotion Studio](https://www.remotion.dev/docs/studio)
- [Offizielle Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills), bei Bedarf mit `npx skills add remotion-dev/skills` installierbar. Besonders relevant: `remotion-best-practices`, `remotion-create`, `remotion-markup`, `remotion-studio` und `remotion-render`.
- [fal.ai-Dokumentation](https://docs.fal.ai/) und die jeweils aktuellen Modellseiten

Die Agent Skills liefern Remotion-Technikwissen für mehrere Agent-Harnesses. Die Projektregeln zu Creative Planning, Originalmaterial und Kostenfreigabe stehen ausschließlich in `AGENTS.md`.
