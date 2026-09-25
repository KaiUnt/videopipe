# Agentic AI Video Studio

Ein kleines, agentunabhängiges Studio für programmatisch erstellte Videos. **Remotion** baut die Timeline, Szenen, Mockups, Animationen und das finale MP4. **fal.ai** kann nach Freigabe fehlende Bilder oder Videoclips ergänzen. Vorhandene Ideen und Medien des Nutzers sind der Ausgangspunkt.

**Existing Assets First → Remotion First → Generative AI Where It Adds Value.** Gemeinsam planen, freigeben, danach autonom produzieren.

## Schnellstart

Voraussetzung: Node.js ab Version 20 und npm. Für Remotion-Videos ohne generative Shots ist kein fal.ai-Konto nötig.

```bash
npm install
npm run studio
```

Das Studio öffnet eine lokale Vorschau. Die mitgelieferte Composition heißt `StudioDemo` und kann ohne externe Medien gerendert werden. Weitere Befehle:

```bash
npm run compositions   # verfügbare Compositions anzeigen
npm run render         # output/studio-demo/final/studio-demo.mp4
npm run render:still   # output/studio-demo/final/studio-demo.png
npm run typecheck      # TypeScript prüfen
```

Für ein reales Video zuerst Bildformat und Framerate festlegen, Nutzerdateien nach `public/assets/` kopieren, einen Plan erstellen und die Shots in Remotion umsetzen. Die Demo ist der technische Startpunkt, kein festes Format für künftige Filme.

## Mit einem Coding Agent arbeiten

`AGENTS.md` enthält die verbindlichen Projektregeln für Codex, Claude Code, GitHub Copilot und andere Agenten. Die kleinen Dateien unter `.claude/` und `.github/` verweisen nur dorthin. Ein typischer Auftrag beginnt so:

> Ich möchte ein 30-Sekunden-Produktvideo im 16:9-Format. Hier sind mein Skript, Logo und zwei Screenrecordings. Sieh dir zuerst das Material an, schlage Storyboard und Shot List vor und besprich die kreativen Entscheidungen mit mir.

Der Ablauf ist:

1. **Briefing und Material sichten:** Idee, Skript, Videos, Screenrecordings, Screenshots, Logos, Fotos, Audio, Brand Assets und Referenzen des Nutzers erfassen.
2. **Gemeinsam planen:** Kernidee, Dramaturgie, Text, Storyboard und Shot List ausarbeiten. Pro Shot zuerst Nutzer-Material, dann Remotion, dann ein generatives Bild und erst zuletzt ein generatives Video prüfen. Die Vorlage steht in [`docs/shot-list-template.md`](docs/shot-list-template.md).
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
| `public/assets/brand/{logos,fonts,images,references}/` | Originaldateien der Corporate Identity |
| `brand/<brand>/brand.json`, `brand/<brand>/BRAND.md` | maschinenlesbare CI-Werte und qualitative Gestaltungsregeln je Marke |
| `src/components/Brand.tsx` | Remotion-Bausteine für Logo, Schrift und Hintergrund |
| `generated/` | heruntergeladene generative Quellen und `manifest.json` mit Herkunftsdaten |
| `public/generated/` | für Remotion zugängliche Kopien generierter Medien |
| `output/<projekt>/{final,qa,work}/` | lokale Lieferung, Prüfbelege und Arbeitsdateien je Projekt |
| `docs/` | Planungsunterlagen und Shot-List-Vorlage |
| `docs/` | Planungsunterlagen und Shot-List-Vorlage |

Unter `final/` liegen abgabefertige Exporte, unter `qa/` Sicht- und Technikprüfungen, unter `work/` Analysen sowie Zwischenstände. Brand-Kit-Artefakte kommen unter `output/brand/<marke>/`.

Dateien unter `public/` werden in Remotion über `staticFile()` referenziert. Originalmedien, generierte Dateien und Renderings sind standardmäßig nicht für Git vorgesehen. Wer Medien bewusst veröffentlichen will, sollte deren Rechte und Dateigröße prüfen und sie gezielt hinzufügen. Die Projektstruktur erlaubt es, einzelne Shots zu ändern oder auszutauschen, ohne die gesamte Produktion neu zu planen.

### Corporate Identity verwenden

Das erste **World-Direct-CI-Kit** ist eingerichtet. Einstieg: [`brand/world-direct/BRAND.md`](brand/world-direct/BRAND.md), Asset-Inventar: [`brand/world-direct/assets.json`](brand/world-direct/assets.json), Rückfragen: [`brand/world-direct/OPEN-POINTS.md`](brand/world-direct/OPEN-POINTS.md). Der Nutzer hat am 24.09.2026 das Farbblatt und die Logo-Priorität bestätigt. Digitale Tokens folgen den gedruckten Hex-Werten dieses Blatts; der [Farbabgleich](brand/world-direct/COLOR-REVIEW.md) dokumentiert die Umsetzung und trennt abweichende Farben der unveränderten Original-SVGs davon. Schutzräume, Mindestgrößen und die finale Typografie-Hierarchie bleiben offen. `npm run brand:preview` rendert die Still-Composition `WorldDirectBrandKit` nach `output/brand/world-direct/final/world-direct-ci-kit.png`; sie ist auch in `npm run studio` verfügbar. `StudioDemo` bleibt eine technische Beispieltimeline und ist kein freigegebenes WD-Videotemplate.

Ein separates, kompaktes **A1-CI-Kit** liegt unter [`brand/a1/`](brand/a1/BRAND.md): vier Original-Logos, drei Schriften, acht Grundfarben, Quelleninventar und [lokale HTML-Vorschau](brand/a1/preview.html). `Brand.tsx` und die bestehenden World-Direct-Kompositionen importieren ausdrücklich `brand/world-direct/brand.json`. Eine weitere Komposition kann das passende Kit direkt importieren.

Lege echte Logos (auch SVG oder PNG), lizenzierte OTF-/TTF-/WOFF-/WOFF2-Schriften und weitere Brand-Dateien in die passenden Unterordner von `public/assets/brand/`. Trage nur belegte Werte in die jeweilige `brand/<brand>/brand.json` ein, für World Direct in [`brand/world-direct/brand.json`](brand/world-direct/brand.json). Darin sind `name`, `colors` (`background`, `text`, `muted`, `accent`), `fonts` (`headline`, `body`, jeweils `family`, `path` und optional `weight`/`style`), `logos` (`primary`, `inverse`, `icon`) und `images` (z. B. `background`) vorgesehen. Asset-Pfade beginnen relativ zu `public/`, z. B. `assets/brand/logos/primary.svg`; trage diesen Pfad nur ein, wenn die Datei tatsächlich existiert.

Zusätzlich enthält das World-Direct-Kit eine vollständige `palette`, sechs lokale Schnitte in `fonts.faces` samt [OFL-Lizenz](public/assets/brand/fonts/OFL.txt), einen `fonts.fallback`, die Logo-Varianten `claim` und `block` sowie drei benannte Polygon-Hintergründe. `primary` und `claim` verwenden das bevorzugte farbige Logo mit Claim; `icon` ist für stilistische Anwendungen vorgesehen, `block` nur für Ausnahmefälle. Das optionale Logo-Build-up liegt unter `public/assets/video/brand/WD_Logo.mov` und wird nicht automatisch in Filme eingefügt oder gekürzt.

`BrandHeadline` und `BrandText` setzen das konfigurierte Gewicht; `BrandBackground` kann einen gezielt gewählten `image`-Pfad erhalten. Alle sechs Schnitte werden vor dem Rendering über `@remotion/fonts` geladen. Schutzräume, Bildsprache, Typografie-Hierarchie, Logo-Varianten und Motion-Prinzipien gehören in die jeweilige `brand/<brand>/BRAND.md`, für World Direct in [`brand/world-direct/BRAND.md`](brand/world-direct/BRAND.md). Ohne Konfiguration bleibt die Gestaltung ausdrücklich eine Demo; bei teilweiser Konfiguration können noch Demo-Fallbacks sichtbar sein. Vor dem finalen Markenfilm fehlende Werte abstimmen und den Render prüfen. Die Konfiguration bleibt für spätere Marken austauschbar.

### Fiktiver World-Direct-Testfilm

Der freigegebene CI-Test ist als separate Composition `WorldDirectTest` umgesetzt: 16 Sekunden, Full HD, 30 fps, vier Shots und bewusst ohne Ton. Er nutzt die Original-Logos, Cairo und Polygon-Hintergründe sowie einen deutlich als fiktiv gekennzeichneten Portalentwurf. [Produktionsplan](docs/world-direct-testfilm-plan.md) und [QA mit Sichtprüfung](docs/world-direct-testfilm-qa.md) dokumentieren den Test.

```bash
npm run render:wd-test  # output/world-direct-test/final/world-direct-test.mp4
npm run still:wd-test   # output/world-direct-test/final/world-direct-test.png
```

In `npm run studio` die Composition `WorldDirectTest` auswählen. Der bisherige `StudioDemo`-Render bleibt separat.

### Screenrecordings und Mockups

Echte Aufzeichnungen der Produktoberfläche bleiben das Bildmaterial. Remotion kann sie schneiden, skalieren, maskieren, in Browser-, Laptop-, Telefon- oder Tablet-Rahmen setzen, mit Zooms und Callouts versehen und mit Typografie kombinieren. UI-Text, Logos und Produktdetails sollen dabei lesbar und korrekt bleiben. Generierte Videos sind für exakte Benutzeroberflächen ungeeignet.

## Optionale Generierung mit fal.ai

Die serverseitige Anbindung über das offizielle `@fal-ai/client`-SDK unterstützt Text-zu-Video, Bild-zu-Video, Referenz-zu-Video und Text-zu-Bild. Sie ist für Motive gedacht, die mit vorhandenem Material und Remotion nicht sinnvoll entstehen: etwa neue reale Szenen, Menschen, Landschaften oder natürliche Bewegung. Jeder generative Shot benötigt einen Grund in der Shot List. Die reproduzierbare Strecke ist **freigegebener Shot → SDK → lokal katalogisiertes Asset → Remotion → Video** und funktioniert ohne MCP oder aktiven Coding Agent.

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

### Optionaler fal.ai MCP Server für Coding Agents

Der [offizielle fal MCP Server](https://fal.ai/docs/model-apis/mcp) stellt Modellsuche, Parameter-Schemas, Preise und Empfehlungen für die Creative-Planning-Phase bereit. Er ist **keine Projekt- oder Laufzeit-Abhängigkeit**. Unterstützt der jeweilige Agent Streamable HTTP und sichere Authentifizierung, kann man ihn optional verbinden. VS Code/GitHub Copilot unterstützt entfernte HTTP-MCP-Server; für Claude Code und Codex beschreibt fal eigene Wege in der verlinkten Anleitung.

Für eine lokale VS-Code-Sitzung kann man unter **MCP: Open User Configuration** optional folgende Konfiguration eintragen (nicht samt Schlüssel ins Repository einchecken):

```json
{
  "servers": {
    "falAi": {
      "type": "http",
      "url": "https://mcp.fal.ai/mcp",
      "headers": {"Authorization": "Bearer ${input:fal-key}"}
    }
  },
  "inputs": [
    {"type": "promptString", "id": "fal-key", "description": "fal.ai API key", "password": true}
  ]
}
```

VS Code fragt den Schlüssel geschützt ab; Agent-Host-Sitzungen übernehmen interaktive `${input:...}`-Konfigurationen nicht automatisch. Für sie gelten die [aktuellen VS-Code-MCP-Hinweise](https://code.visualstudio.com/docs/agents/reference/mcp-configuration). Eine reine Modellsuche ist ein sicherer Verbindungstest. `run_model` und `submit_job` können dagegen Kosten auslösen: Auch kleine MCP-Tests brauchen vorher eine ausdrückliche Kostenfreigabe. Produktive Generierung läuft ausschließlich über den freigegebenen SDK-Plan mit Dry-Run und Plan-Hash.

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

Diese Daten als `video-props.json` speichern und mit `npm run render -- --props=video-props.json` rendern. `StudioDemo` berechnet die Länge aus den Shots; das MP4 liegt unter `output/studio-demo/final/studio-demo.mp4`. Die Demo verwendet 30 Bilder pro Sekunde. Für den Mockup-Shot muss die genannte Screenrecording-Datei vorhanden sein.

## Qualität und Grenzen des ersten Tests

Mit `npm run studio`, `npm run typecheck` und `npm run render` lässt sich die lokale Remotion-Strecke prüfen. Für den ersten kreativen End-to-End-Test sollten, sobald vorhanden, echte Nutzeraufnahmen und Brand Assets in eine mehrteilige Composition einfließen. Ein finales MP4 wird anschließend anhand von Standbildern oder einer Vorschau sichtbar kontrolliert. Ein erfolgreicher Render allein bestätigt nur die Technik.

### Fiktiver A1-Testfilm

`A1Test` setzt den [freigegebenen Ablauf](docs/a1-testfilm-plan.md) mit dem separaten A1-Kit um: 16 Sekunden, Full HD, 30 fps und ohne Ton. Vier Shots zeigen die Original-Logos auf Weiß/Schwarz, A1 Serif und Sans sowie einen klar gekennzeichneten fiktiven Serviceportal-Entwurf. [Film](output/a1-test/final/a1-test.mp4), [Vorschaubild](output/a1-test/final/a1-test.png) und [QA](docs/a1-testfilm-qa.md) liegen lokal vor.

```bash
npm run render:a1-test  # output/a1-test/final/a1-test.mp4
npm run still:a1-test   # output/a1-test/final/a1-test.png
```

Im Studio `A1Test` auswählen. Die A1-Bausteine in `src/components/A1Brand.tsx` laden gezielt das A1-Kit; bestehende World-Direct-Kompositionen bleiben eigenständig.

## Aktuelle technische Referenzen

- [Remotion-Dokumentation](https://www.remotion.dev/docs/) und [Remotion Studio](https://www.remotion.dev/docs/studio)
- [Offizielle Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills), bei Bedarf mit `npx skills add remotion-dev/skills` installierbar. Besonders relevant: `remotion-best-practices`, `remotion-create`, `remotion-markup`, `remotion-studio` und `remotion-render`.
- [fal.ai-Dokumentation](https://docs.fal.ai/) und die jeweils aktuellen Modellseiten
- [Offizieller fal MCP Server](https://fal.ai/docs/model-apis/mcp) und [VS-Code-MCP-Konfiguration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration)

Die Agent Skills liefern Remotion-Technikwissen für mehrere Agent-Harnesses. Die Projektregeln zu Creative Planning, Originalmaterial und Kostenfreigabe stehen ausschließlich in `AGENTS.md`.
