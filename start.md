# Auftrag: Agentic AI Video Studio aufsetzen

Richte in diesem Repository ein möglichst schlankes, agentisches AI-Video-Projekt ein.

Ziel ist eine Umgebung, in der leistungsfähige Coding Agents komplette Videos planen, erstellen, rendern, visuell prüfen und iterativ verbessern können.

Das Projekt darf nicht von einem bestimmten Agent-Harness oder Anbieter abhängig sein.

Es soll insbesondere mit unterschiedlichen Coding Agents und Harnesses wie:

* Claude Code
* Codex
* GitHub Copilot
* vergleichbaren zukünftigen Coding Agents

funktionieren.

Die Kernarchitektur besteht zunächst ausschließlich aus:

1. **Remotion** für programmatische Videos, Motion Graphics, Typografie, Mockups, Compositing, Editing und finales Rendering.
2. **fal.ai** als optionale Quelle für generative Bild- und Videoinhalte.

**Existing Assets First → Remotion First → Generative AI Where It Adds Value.**

**Plan Together → Approve → Produce Autonomously.** Der Coding Agent ist Creative Director und technischer Orchestrator; fal.ai MCP kann ihn bei der Modellwahl unterstützen, ist aber kein Bestandteil der Produktionslaufzeit.

Halte das Setup bewusst klein und modular.

Keine unnötige Workflow-Engine, kein Multi-Agent-System und keine zusätzliche Orchestrierungsplattform für den MVP.

---

# 1. Grundprinzip

Das System ist kein automatischer „Prompt rein → Video raus“-Generator.

Der Coding Agent arbeitet zunächst gemeinsam mit dem Nutzer als Creative Director.

Der Nutzer kann bereits mitbringen:

* konkrete Ideen
* Skripte oder Textfragmente
* Storyboards
* Screenrecordings
* bestehende Videos
* Fotos
* Logos
* Brand Assets
* Musik
* Voiceovers
* Screenshots
* Produktmaterial
* Referenzvideos
* visuelle Beispiele

Dieses vorhandene Material und die Ideen des Nutzers haben grundsätzlich Vorrang vor neu generierten Inhalten.

Der Agent soll vorhandenes Material möglichst intelligent weiterverwenden und daraus gemeinsam mit dem Nutzer das Video entwickeln.

Generative Modelle sollen ergänzen, nicht unnötig vorhandenes Material ersetzen.

---

# 2. Projekt initialisieren

Erstelle ein sauberes TypeScript/Node.js-Projekt mit aktueller stabiler Remotion-Version.

Nutze:

* React
* TypeScript
* Remotion

Installiere nur tatsächlich benötigte Dependencies.

Prüfe aktuelle offizielle Remotion Skills oder Agent-Instructions und integriere sie sinnvoll, sofern sie für unterschiedliche Coding Agents nutzbar sind.

Eine mögliche Struktur:

video-studio/
├── .github/
├── .claude/
├── agents/
├── skills/
├── src/
│   ├── compositions/
│   ├── scenes/
│   ├── components/
│   ├── lib/
│   │   └── fal/
│   └── utils/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── video/
│   │   ├── screenrecordings/
│   │   ├── audio/
│   │   └── brand/{logos,fonts,images,references}/
│   └── generated/
├── brand/
│   ├── brand.json
│   └── BRAND.md
├── generated/
│   ├── images/
│   └── video/
├── output/
│   └── <projekt>/
│       ├── final/
│       ├── qa/
│       └── work/
├── AGENTS.md
├── .env.example
└── README.md

Passe die Struktur an, wenn eine einfachere oder bessere Lösung sinnvoll ist.

---

# 3. Agent-agnostische Architektur

Die zentralen Projektregeln dürfen nicht ausschließlich in proprietären Instructions eines einzelnen Agent-Harnesses liegen.

Nutze `AGENTS.md` als zentrale, allgemein verständliche Projektanweisung und Single Source of Truth.

Spezifische Dateien für Claude Code, Codex, GitHub Copilot oder andere Harnesses dürfen zusätzlich erstellt werden.

Diese sollen möglichst auf dieselben zentralen Regeln, Skills und Projektkonventionen verweisen.

Vermeide doppelte oder widersprüchliche Instructions.

---

# 4. Remotion als zentrale Produktionsumgebung

Remotion ist die zentrale Engine für:

* Timeline
* Schnitt
* Szenen
* Compositing
* Motion Graphics
* Typografie
* Übergänge
* Animation
* Mockups
* Screenrecordings
* Audio
* vorhandene Videos
* generierte Videos
* finales Rendering

Remotion soll immer dann bevorzugt werden, wenn sich ein gewünschtes Ergebnis deterministisch mit vorhandenen Assets und Code erzeugen lässt.

Insbesondere bei:

* echten Screenrecordings
* Produkt-UI
* Logos
* Text
* Corporate Design
* Screenshots
* Browser-Mockups
* Smartphone-Mockups
* Laptop-Mockups
* Diagrammen
* Infografiken

soll das Originalmaterial erhalten bleiben und nicht unnötig durch ein generatives Modell neu interpretiert werden.

## Brand / Corporate Identity

Vorhandene Corporate-Identity-Assets und Design-Guidelines haben Vorrang vor erfundenen Farben, Fonts, Logos oder visuellen Regeln. Analysiere und verwende Logos (SVG, PNG oder andere geeignete Formate), lokale Fonts (OTF, TTF, WOFF, WOFF2), Brand-Farben, Typografie, Bildsprache, Logo-Regeln sowie Motion- und Animationsprinzipien.

Lege Brand-Material unter `public/assets/brand/{logos,fonts,images,references}/` ab, damit Remotion es mit `staticFile()` laden kann. Jedes Kit hat einen eigenen Ordner: `brand/<brand>/brand.json` beschreibt maschinenlesbare Farben, Fonts und Asset-Pfade; `brand/<brand>/BRAND.md` dokumentiert qualitative Gestaltungsregeln. Vorhandene Kits liegen unter `brand/world-direct/` und `brand/a1/`. Die bestehenden Brand-Komponenten importieren ausdrücklich die World-Direct-Konfiguration. Fehlende Werte bleiben bewusst offen, bis der Nutzer Brand-Material bereitstellt.

Bei Bedarf können wiederverwendbare Remotion-Komponenten wie `BrandLogo`, `BrandHeadline`, `BrandText`, `BrandBackground`, `BrandIntro` und `BrandOutro` die CI konsistent anwenden. Halte die Struktur so einfach, dass später mehrere Brands möglich sind, ohne den MVP mit einer Brand-Verwaltung zu belasten.

---

# 5. Multi-Shot Video Composition

Das System muss Videos grundsätzlich als Komposition mehrerer unabhängiger Shots bzw. Szenen verstehen.

Ein finales Video kann kombinieren:

* mehrere bestehende Videos
* mehrere Screenrecordings
* Bilder
* Audio
* Remotion-generierte Szenen
* Motion Graphics
* Mockups
* über fal.ai generierte Videoclips
* über fal.ai generierte Bilder

Ein Nutzerauftrag kann beispielsweise automatisch in folgende Struktur zerlegt werden:

Shot 1
→ Remotion Intro

Shot 2
→ vorhandenes Screenrecording im Laptop-Mockup

Shot 3
→ vorhandenes Video

Shot 4
→ optional generativer fal.ai Shot

Shot 5
→ UI Animation mit Remotion

Shot 6
→ Remotion Outro

Remotion übernimmt anschließend die zentrale Timeline und kombiniert alle Teile zu einem zusammenhängenden finalen Video.

Jeder Shot soll unabhängig bearbeitet, ersetzt und wiederverwendet werden können.

---

# 6. Screenrecordings und Mockups

Screenrecordings sind ein wichtiger Kern-Usecase.

Der Agent soll echte Screenrecordings beispielsweise verwenden können als:

* Laptop-Display
* Smartphone-Display
* Tablet
* Browserfenster
* Floating UI
* perspektivisch transformiertes Display
* Teil einer größeren Motion-Graphic-Komposition

Das Screenrecording soll dabei möglichst unverändert und lesbar erhalten bleiben.

Remotion soll für:

* Skalierung
* Positionierung
* Masking
* Clipping
* Perspektive
* Rotation
* Zoom
* Schatten
* Animation
* Highlights
* Callouts
* Cursor-Hervorhebungen
* Übergänge

verwendet werden.

Generative Videomodelle sollen nicht verwendet werden, wenn dadurch echte UI-Inhalte, Texte oder Produktdetails verfälscht werden könnten.

---

# 7. fal.ai integrieren

Installiere das aktuelle offizielle fal.ai JavaScript/TypeScript SDK.

Secrets dürfen niemals im Repository gespeichert werden.

Verwende Environment Variables und erstelle `.env.example`.

Implementiere eine schlanke fal.ai-Abstraktionsschicht für Aufgaben wie:

* textToVideo()
* imageToVideo()
* referenceToVideo()
* textToImage()

Die Architektur soll verschiedene aktuelle fal.ai-Modelle unterstützen.

Prüfe aktuelle offizielle fal.ai-Dokumentation, bevor Modell-IDs oder Parameter verwendet werden.

Keine Modell-IDs oder Parameter erfinden.

Die Modellschicht soll einfach aktualisierbar bleiben.

Die reproduzierbare Pipeline verwendet das SDK: **Approved Shot → fal.ai SDK → generiertes Asset → lokales Asset Management → Remotion → finales Video**. Sie funktioniert ohne Coding Agent und ohne MCP.

Prüfe zusätzlich den aktuellen offiziellen fal.ai MCP Server und die Unterstützung im jeweiligen Coding-Agent-Harness. Wenn der Client Streamable HTTP und sichere Authentifizierung unterstützt, kann MCP optional für den Agenten eingerichtet werden. MCP dient bei Planung und Entwicklung der Modellsuche, Prüfung von Fähigkeiten, Eingaben und Preisen sowie dem Modellvergleich. Kleine Modelltests sind nur mit ausdrücklicher Freigabe möglicher Kosten erlaubt. MCP ist **keine Laufzeit-Abhängigkeit** und ersetzt weder das SDK noch das Approval Gate.

---

# 8. fal.ai ist optional, nicht Standard

Generative Modelle sind eine Ergänzung.

Grundprinzip:

**Remotion first. Existing assets first. Generation only where useful.**

fal.ai soll insbesondere verwendet werden für Inhalte, die nicht sinnvoll aus vorhandenem Material oder programmatisch erzeugt werden können, beispielsweise:

* neue fotorealistische Szenen
* Menschen
* Landschaften
* komplexe natürliche Bewegungen
* generative B-Roll
* Image-to-Video
* Reference-to-Video
* kreative Übergangsshots
* Szenen, für die kein passendes Ausgangsmaterial existiert

Der Agent soll nie automatisch für jeden Shot ein generatives Modell verwenden.

---

# 9. Creative Planning gemeinsam mit dem Nutzer

Bevor produziert wird, entwickelt der Agent das Video gemeinsam mit dem Nutzer.

Der Nutzer kann bereits eine klare Idee haben.

Der Agent soll diese Idee nicht ungefragt ersetzen, sondern:

1. verstehen
2. strukturieren
3. verbessern
4. ergänzen
5. in einen umsetzbaren Produktionsplan übersetzen

Der Agent soll zuerst alle vorhandenen relevanten Assets berücksichtigen.

Für **jeden** Shot gilt vor einem Modellvorschlag diese Reihenfolge:

1. Gibt es geeignetes Originalmaterial des Nutzers?
2. Kann Remotion den Shot mit vorhandenen Assets deterministisch umsetzen?
3. Hilft ein generatives Bild, statt eines Videos?
4. Ist ein generatives Video wirklich erforderlich?

Erst wenn Generierung einen konkreten Mehrwert bringt, prüft der Agent aktuelle Modellinformationen über den offiziellen fal.ai MCP Server (falls vorhanden) oder die offiziellen fal.ai-Modellseiten. Er vergleicht Modelle und begründet die Wahl, ohne Modell-ID, Parameter oder Preis zu erfinden.

Danach gemeinsam mit dem Nutzer entwickeln:

Briefing
→ Kernidee
→ Story / Dramaturgie
→ Skript
→ Storyboard
→ Shot List
→ Produktionsmethode pro Shot

Der Agent darf Vorschläge machen, aber kreative Entscheidungen des Nutzers haben Vorrang.

---

# 10. Shot List als Produktionsplan

Vor der eigentlichen Produktion soll eine klare Shot List entstehen.

Beispiel:

| Shot | Inhalt               | Material           | Umsetzung            | Modell (falls nötig)      | Begründung                   |
| ---- | -------------------- | ------------------ | -------------------- | ------------------------- | ---------------------------- |
| 01   | Hook + Logo          | Brand Assets       | Remotion             | –                         | CI-konformes Intro           |
| 02   | Produktdemo          | Screenrecording 01 | Remotion Mockup      | –                         | Original-UI erhalten         |
| 03   | Produktfoto          | Foto des Nutzers   | Image-to-Video       | aktuelles geeignetes Modell | natürliche Bewegung         |
| 04   | atmosphärische Szene | keines             | generatives Video    | aktuelles geeignetes Modell | neue Szene erforderlich      |
| 05   | Outro                | Logo + Claim       | Remotion             | –                         | CI-konformes Outro           |

Für fal.ai-Shots soll zusätzlich ersichtlich sein:

* warum Generierung sinnvoll ist
* vorgeschlagenes Modell
* ungefähre Länge
* gewünschte Qualität/Auflösung
* geschätzte Kosten, sofern zuverlässig verfügbar

---

# 11. Approval Gate vor kostenpflichtiger Generierung

Während Creative Planning dürfen keine kostenpflichtigen generativen APIs unnötig aufgerufen werden.

Vor fal.ai-Generierungen gilt:

**PLAN → REVIEW → APPROVE → GENERATE**

Der Agent erstellt zunächst:

* Skript
* Storyboard
* Shot List
* Vorschlag für generative Shots

Diese werden gemeinsam mit dem Nutzer abgestimmt.

Erst nach Zustimmung des Nutzers sollen kostenpflichtige fal.ai-Generierungen durchgeführt werden.

Das gilt auch für kostenpflichtige Tests über MCP: Modellrecherche und Preisabfragen allein sind keine Freigabe für `run_model` oder `submit_job`.

Dadurch können kreative Änderungen vorgenommen werden, bevor API-Kosten entstehen.

---

# 12. Generierte Medien automatisch verarbeiten

Nach Freigabe sollen fal.ai-Ergebnisse automatisch:

1. erzeugt,
2. heruntergeladen,
3. lokal gespeichert,
4. katalogisiert,
5. in Remotion integriert

werden.

Beispiel:

Approved Shot
↓
fal.ai
↓
generated/video/shot-04.mp4
↓
Remotion
↓
final composition

Speichere geeignete Metadaten:

* Modell
* Prompt
* Parameter
* Erstellungszeit
* Request-ID
* lokale Datei
* Kosten, sofern zuverlässig verfügbar

Vorhandene Generierungen sollen wiederverwendet werden.

---

# 13. Modellwahl

Wenn ein generativer Shot benötigt wird, soll der Agent ein geeignetes Modell vorschlagen.

Nicht automatisch das teuerste Modell wählen.

Berücksichtige:

* Aufgabe
* Text-to-Video vs. Image-to-Video
* Referenztreue
* Bewegung
* Menschen
* Kamera
* Audio
* Auflösung
* Geschwindigkeit
* Preis

Der Nutzer kann das vorgeschlagene Modell vor der Generierung ändern.

---

# 14. Kostenkontrolle

fal.ai kann reale Kosten verursachen.

Vermeide unnötige Wiederholungen.

Vor größeren Generierungen soll ein Dry-Run möglich sein.

Beispiel:

| Shot | Modell | Dauer | Auflösung | geschätzte Kosten |
| ---- | ------ | ----: | --------- | ----------------: |

Wenn keine verlässlichen aktuellen Preisdaten verfügbar sind, keine Kosten erfinden.

---

# 15. Produktionsphase

Nach Freigabe des Produktionsplans soll der Agent möglichst autonom arbeiten.

Ablauf:

APPROVED PLAN
↓
Assets vorbereiten
↓
fal.ai-Shots erzeugen
↓
Remotion-Komposition erstellen
↓
Schnitt
↓
Motion Graphics
↓
Mockups
↓
Audio
↓
Render

Der Nutzer muss nicht jeden technischen Zwischenschritt freigeben.

---

# 16. Qualitätsloop

Ein technisch erfolgreich gerendertes Video ist nicht automatisch fertig.

Arbeite nach:

PLAN
↓
BUILD
↓
RENDER
↓
INSPECT
↓
IMPROVE
↓
RENDER
↓
FINAL

Nutze repräsentative Frames oder Preview-Renderings, um das Ergebnis visuell zu überprüfen.

Prüfe insbesondere:

* Storytelling
* Komposition
* Lesbarkeit
* Typografie
* Timing
* Rhythmus
* Animation
* Übergänge
* Mockups
* Konsistenz
* Qualität der generierten Assets
* Corporate Design
* Seitenverhältnis

Verbessere erkennbare technische oder gestalterische Probleme selbstständig.

---

# 17. Erweiterbarkeit

Halte die Architektur modular.

Trenne:

Creative Planning
→ Shot Planning
→ Existing Asset Management
→ Generative Asset Creation
→ Composition
→ Rendering
→ Evaluation

Dadurch können später weitere Modelle, APIs oder Tools ergänzt werden, ohne die Grundarchitektur umzubauen.

---

# 18. Erster Systemtest

Nach Abschluss des technischen Setups soll zunächst ein einfacher Test durchgeführt werden.

Der bevorzugte erste Testcase verwendet möglichst vorhandenes Material.

Beispielsweise:

* ein oder mehrere Screenrecordings
* ein Browser-/Laptop-/Smartphone-Mockup
* animierte Typografie
* Motion Graphics
* Übergänge
* finales MP4

fal.ai soll im ersten Test nur verwendet werden, wenn ein generatives Asset tatsächlich sinnvoll ist und der Nutzer die Generierung zuvor freigegeben hat.

---

# Definition of Done

Das initiale Setup ist abgeschlossen, wenn:

* Remotion korrekt eingerichtet ist
* Remotion Studio funktioniert
* lokales Rendering funktioniert
* Multi-Shot-Kompositionen möglich sind
* vorhandene Videos und Screenrecordings verarbeitet werden können
* Mockup-basierte Screenrecording-Kompositionen möglich sind
* fal.ai technisch integriert ist
* fal.ai optional bleibt
* Secrets sicher behandelt werden
* generierte Assets automatisch gespeichert und verarbeitet werden können
* ein einfaches Asset-/Generation-Manifest vorhanden ist
* ein Dry-Run für geplante Generierungen möglich ist
* ein Approval Gate vor kostenpflichtigen Generierungen besteht
* zentrale agent-agnostische Projektanweisungen vorhanden sind
* unterschiedliche Coding Agents sinnvoll mit dem Repository arbeiten können
* vorhandene Brand Assets und Guidelines über `brand/` und `public/assets/brand/` nutzbar sind, ohne CI-Werte zu erfinden
* die Modellentscheidung pro Shot bestehendes Material, Remotion, generatives Bild und generatives Video in dieser Reihenfolge abwägt
* optionales fal MCP von der produktiven SDK-Pipeline getrennt bleibt
* ein End-to-End-Test erfolgreich durchgeführt wurde
* ein finales MP4 erzeugt wurde
* README Installation, Architektur und grundlegende Verwendung dokumentiert

Arbeite den technischen Setup-Auftrag möglichst autonom ab.

Frage nicht nach technischen Entscheidungen, die anhand aktueller Dokumentation und sinnvoller Defaults selbst getroffen werden können.

Bei kreativen Entscheidungen arbeite hingegen mit dem Nutzer zusammen.

Insbesondere sollen vorhandene Ideen, Assets und Ausgangsmaterial des Nutzers aktiv in die Planung einbezogen werden, bevor neue Inhalte generiert werden.

Verwende aktuelle offizielle Dokumentation und keine veralteten Modellnamen, APIs oder Integrationsmethoden.
