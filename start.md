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
├── assets/
│   ├── images/
│   ├── video/
│   ├── screenrecordings/
│   ├── audio/
│   └── brand/
├── generated/
│   ├── images/
│   └── video/
├── output/
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

| Shot | Inhalt               | Quelle             | Umsetzung            |
| ---- | -------------------- | ------------------ | -------------------- |
| 1    | Hook + Logo          | Brand Assets       | Remotion             |
| 2    | Produktdemo          | Screenrecording 01 | Remotion Mockup      |
| 3    | Feature-Zoom         | Screenrecording 02 | Remotion             |
| 4    | atmosphärische Szene | neu                | fal.ai vorgeschlagen |
| 5    | Produktvorteil       | UI + Text          | Remotion             |
| 6    | Outro                | Logo + Claim       | Remotion             |

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
* ein End-to-End-Test erfolgreich durchgeführt wurde
* ein finales MP4 erzeugt wurde
* README Installation, Architektur und grundlegende Verwendung dokumentiert

Arbeite den technischen Setup-Auftrag möglichst autonom ab.

Frage nicht nach technischen Entscheidungen, die anhand aktueller Dokumentation und sinnvoller Defaults selbst getroffen werden können.

Bei kreativen Entscheidungen arbeite hingegen mit dem Nutzer zusammen.

Insbesondere sollen vorhandene Ideen, Assets und Ausgangsmaterial des Nutzers aktiv in die Planung einbezogen werden, bevor neue Inhalte generiert werden.

Verwende aktuelle offizielle Dokumentation und keine veralteten Modellnamen, APIs oder Integrationsmethoden.
