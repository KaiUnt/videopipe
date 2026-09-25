# SME GUI · Story-Fassung mit B-Roll · Storyboard

Stand 25.09.2026. Status: **Story und Storyboard vom Nutzer freigegeben („find ich geil … versuchen wir das mal“), mit Stilvorgaben unten. Generierung je Stufe separat freizugeben; Stand siehe „Freigabestand fal.ai“.**

## Ausgangslage

- **Basis und Referenz:** `SmeGuiMvpV3` → `output/sme-gui-mvp-v3/final/sme-gui-mvp-v3-16x9.mp4`. Diese Fassung ist das MVP und bleibt unverändert. Die Story-Fassung wird eine eigene Composition (`SmeGuiStory`, Ausgabe `output/sme-gui-story/`).
- **Ton:** neue Vollstimme `narration-v3.wav` (53,63 s), unverändert. Alle Bildwechsel richten sich weiter nach den gemessenen Sprechpausen.
- **Format:** 1920 × 1080, 30 fps, Länge wie MVP ≈ 58,6 s.
- **Brand:** A1 (`brand/a1/`). Texte in A1 Serif / A1 Sans, Rot `#EB140A`, weiße Flächen, echte Logos. UI immer aus den echten Screenrecordings, nie generiert.

## Look und Stil (Nutzervorgabe 25.09.)

- **A1-Anmutung:** hell, klar, natürliches Tageslicht, leicht warmer Grade mit dezentem Rotstich. Rot als Akzent, nie als Fläche. „Nicht übertreiben mit Rot.“
- **Café:** helles Eichenholz, weiße Wände; rotes Inventar nur punktuell: Espressomaschine, einige Stühle, Pendelleuchten.
- **Lena:** weißes Hemd, tiefrote Barista-Schürze; dezent.
- **Ein Standort, ein Case (Nutzervorgabe 25.09.):** Alles spielt in einem Café. Keine weiteren Betriebe, kein zweiter Standort.
- **Konsistenz:** Eine Figurenreferenz und eine Set-Referenz (Café Linz) wurden zuerst erzeugt und von dir ausgewählt. Alle Keyframes entstehen dann mit genau diesen Referenzen (Nano Banana 2 Edit, bis zu 14 Referenzbilder).
- **Übergänge:** rote Lichtblende bzw. Light-Leak, deterministisch in Remotion gebaut (weicher roter Verlauf mit Screen-Blending, 8–12 Frames), nicht generiert. Nur an Wechseln zwischen Café-Welt und UI sowie in die Endkarte, sonst harte Schnitte.

## Story

**Figur:** Lena (fiktiv), führt ein kleines Café. Ein Standort, ein Case.

1. **Problem:** Morgens vor dem Aufsperren streikt das WLAN. Lena steht ratlos vor dem Netzwerkschrank. Das alte Tool zeigt nur Fachbegriffe.
2. **Lösung:** Die neue Oberfläche, gemacht für Betriebe wie ihren: Lena hinter ihrer Theke. Danach der Überblick in der Oberfläche.
3. **Beweis:** WiFi, Geräte, Clients und Änderungen aus dem MVP, unverändert. Am Ende löst Lena das Problem selbst.
4. **Payoff:** Das Café läuft und Lena hat den Kopf frei. Die drei Schlusssätze erscheinen als A1-Texteinblendungen, danach die A1-Endkarte mit dem Claim.

## Storyboard

n = Zeit in der Sprecheraufnahme, Film = n + 2,5 s (Intro). **G** = generativ, **R** = echtes Material bzw. Remotion.

| # | Film (s) | Sprecher | Bild | Umsetzung |
| --- | --- | --- | --- | --- |
| 00 | 0,0–2,5 | – | A1-Startkarte „SME-GUI · Network Management Made Simple“ | R, wie MVP |
| 01a | 2,5–4,9 | „Managing networks for small and medium enterprises …“ | Café am frühen Morgen, Stühle noch auf den Tischen. Lena sperrt auf und schaut aufs Handy, das „kein Netz“ meldet (Display nicht lesbar). | **G** |
| 01b | 4,9–7,5 | „… shouldn't require specialist knowledge.“ | Nahaufnahme: Lena vor einem offenen Netzwerkschrank mit blinkenden LEDs und Kabeln, unschlüssig, Laptop im Arm. | **G** |
| 02 | 7,5–12,7 | „Yet traditional tools are often too technical and complex …“ | Alte NCE-Oberfläche: Zeilenanfang, Scroll nach rechts, Klick auf Modify; Ladebildschirm herausgeschnitten; volle Detailansicht mit Scroll nach unten. Leichter Push-in, danach langes rotes Band zur neuen Oberfläche. | R, alte Aufnahme 37,5–41,1 s + 42,6–44,7 s |
| 03 | 12,7–15,3 | „That's why we created a new experience,“ | Neue Oberfläche erscheint: Overview, weicher Scale-in auf Weiß | R |
| 04 | 15,3–19,0 | „built especially for small and medium business customers.“ | Lena reicht hinter ihrer Theke einen Cappuccino über den Tresen; ein durchgehender Shot | **G** |
| 05 | 19,0–25,2 | „Get an instant overview of all locations and key network metrics …“ | Echte Overview. Remotion-Zoom auf die Kennzahlen-Karten; die Standortauswahl bleibt im Bild, wird aber nicht betont | R, nur Kamerabewegung auf der echten Aufnahme |
| 06 | 25,2–30,8 | WiFi | wie MVP | R |
| 07 | 30,8–34,95 | Devices | wie MVP | R |
| 08 | 34,95–40,4 | Clients / Health | wie MVP | R |
| 09 | 40,4–45,3 | „Track every network change … troubleshooting faster“ | Changes wie MVP, ≈ 3 s kürzer; Schnitt in der Pause nach „faster“ | R |
| 10 | 45,3–48,3 | „and enabling users to resolve issues on their own.“ | Lena am Laptop im Café (Bildschirm abgewandt), nickt erleichtert und klappt den Laptop zu. | **G** |
| 11 | 48,3–50,2 | „Less complexity.“ | Café voll, Lena serviert entspannt. Text: **Less complexity.** | **G** + A1-Text |
| 12 | 50,2–51,7 | „Fewer support requests.“ | Handy liegt ruhig auf der Theke, kein Anruf. Lena lächelt einer Kollegin zu. Text: **Fewer support requests.** | **G** + A1-Text |
| 13 | 51,7–54,0 | „Complete control of your network.“ | Später Nachmittag im selben Café: Lena steht am Ende der Theke, überblickt ihr Café und wirft einen kurzen, sicheren Blick aufs Tablet. Text: **Complete control of your network.** | **G** + A1-Text |
| 14 | 54,0–58,6 | „Network management made simple.“ | A1-Endkarte. Der Claim baut sich synchron zum gesprochenen Satz auf und steht danach 2,5 s. | R, Intro-Karte des MVP |

Die Texteinblendungen setzen jeweils auf das gesprochene Wort ein: „Less“ 48,8 s, „fewer“ 50,3 s, „complete“ 51,9 s, „Network management“ 54,2 s (Film). A1 Sans Bold in Weiß, dahinter ein ruhiger Verlauf nach unten. Kein Logo im B-Roll.

## Was sich gegenüber dem MVP ändert

- Der Einstieg ist kürzer: Die alte UI läuft 5,2 statt 10,2 s. Dafür zeigen zwei Bilder das Problem aus Nutzersicht.
- Die lange Overview (bisher ≈ 12,5 s) wird aufgebrochen: Reveal, Lena an der Theke, danach gezielter Zoom.
- Der Schluss bekommt Bilder und die drei Kernsätze als Text statt eines Standbilds.
- WiFi, Devices und Clients bleiben 1:1 wie im MVP.

## Generative Shots · Vorschlag

Prüfreihenfolge je Shot: Für Café-, Menschen- und Hardware-Szenen gibt es kein vorhandenes Material. In Remotion lassen sie sich nicht fotorealistisch bauen, und ein Standbild wirkt neben den Screenrecordings zu statisch. Deshalb generatives Video, aber immer aus einem vorher freigegebenen Standbild.

**Vorgehen:**
1. Figurenreferenz von Lena und dem Café erzeugen.
2. Daraus Keyframes je Shot, mit der Figur als Referenz für Konsistenz.
3. Du wählst die Keyframes aus.
4. Erst dann Bild-zu-Video, ohne Audio, 1080p.

| Schritt | Modell (Vorschlag) | Menge | Preis laut offizieller Modellseite | Schätzung |
| --- | --- | --- | --- | --- |
| Figur und Keyframes | Nano Banana 2 (`fal-ai/nano-banana-2`, 16:9, 2K, mit Referenzbildern) | 3 Referenzen + 7 Keyframes, je 2 Varianten = 20 Bilder | 0,12 $ pro Bild bei 2K | 2,40 $ |
| Clips | Kling V3 Pro Image-to-Video (`fal-ai/kling-video/v3/pro/image-to-video`), `generate_audio: false` | 7 × 5 s = 35 s | 0,112 $/s ohne Audio | ≈ 3,92 $ |
| **Summe ohne Neuversuche** | | | | **≈ 6,32 $** |
| Deckel mit ≈ 50 % Neuversuchen | | | | **≈ 10 $** |

Alternativen für die Clips:

| Modell | Preis | Eigenschaften | Schätzung für 35 s |
| --- | --- | --- | --- |
| Vidu Q3 (schon im Projektkatalog) | 0,07 $/s × 2,2 bei 1080p = 0,154 $/s | Kann mehrere Referenzbilder übernehmen | ≈ 5,39 $ |
| Veo 3.1 1080p | 0,20 $/s ohne Audio | Nur 4, 6 oder 8 s lang; Premium-Look | ≈ 8,40 $ (7 × 6 s) |

Begründung für Kling V3 Pro: Es rendert nativ 1080p und erlaubt 3–15 s. Start- und Endbild lassen sich vorgeben, der Ton lässt sich abschalten, und der Preis pro Sekunde ist moderat.

Quellen, geprüft am 25.09.2026: [Nano Banana 2](https://fal.ai/models/fal-ai/nano-banana-2), [Kling V3 Pro I2V](https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video), [Vidu Q3 I2V](https://fal.ai/models/fal-ai/vidu/q3/image-to-video), [Veo 3.1 I2V](https://fal.ai/models/fal-ai/veo3.1/image-to-video). Die allgemeine Seite fal.ai/pricing wirkt veraltet und wurde nicht verwendet. Preise werden unmittelbar vor der Generierung erneut geprüft.

**Regeln für alle Prompts:** kein lesbarer Bildschirminhalt (Displays abgewandt oder unscharf), keine Marken- oder Herstellerlogos auf Geräten, kein Text im Bild. Europäisches Café-Setting, natürliches Licht, ruhige Kamera. Die Clips werden in Remotion auf 30 fps gebracht und auf Länge geschnitten.

**Technisch:** Kling V3 Pro und Nano Banana 2 Edit wurden am 25.09. gegen die offiziellen API-Seiten in `src/lib/fal/models.ts` ergänzt, inklusive Kostenschätzung im Dry-Run.

## Entscheidungen

Festgelegt: ein Café, ein Standort (Nutzervorgabe). Ohne Gegenrede umgesetzte Vorschläge: A1-Startkarte bleibt, Shot 10 wird aufgenommen, Kling V3 Pro, keine Musik. Jederzeit änderbar.

### Ursprünglich offene Punkte

1. **Figur und Branche:** Café mit zwei Standorten (Vorschlag) oder eine andere Branche, z. B. Bäckerei, Hotel oder Handwerksbetrieb?
2. **Einstieg:** A1-Startkarte behalten (Vorschlag) oder kalt mit dem Café-Bild öffnen und das Logo erst am Ende zeigen?
3. **Shot 10** (Lena löst das Problem selbst): aufnehmen, oder Changes wie im MVP länger stehen lassen?
4. **Clip-Modell:** Kling V3 Pro (Vorschlag), Vidu Q3 oder Veo 3.1?
5. **Musik:** Aktuell gibt es keine. Falls gewünscht, bitte einen lizenzierten Track liefern; wird nicht generiert.

## Freigabestand fal.ai

| Stufe | Inhalt | Plan | Schätzung | Status |
| --- | --- | --- | --- | --- |
| 1a | Referenzen: Lena, Café Linz, Café Wien, je 2 Varianten (6 Bilder, 2K); Wien wird nach der Ein-Standort-Entscheidung nicht verwendet | `output/sme-gui-story/work/fal/stage-1a-references.json`, Hash `fc730f3b…24eb7dc` | 0,72 $ laut Preisliste | freigegeben und generiert 25.09.; Auswahl: Lena A (`story-ref-lena-b9faeb451fc9.png`), Linz A (`story-ref-cafe-linz-c4e8235de013.png`), Wien B (`story-ref-cafe-wien-4622b62c3234-02.png`) |
| 1b | 7 Keyframes × 2 Varianten (14 Bilder, 2K), alle mit Lena- und Café-Linz-Referenz | `output/sme-gui-story/work/fal/stage-1b-keyframes.json`, Hash `6d859c96…455dfea` | 1,68 $ laut Preisliste | freigegeben und generiert 25.09.; Prüfung in `output/sme-gui-story/qa/stage-1b/` (Espressomaschinen ohne Schriftzug; 01b-B und 12-B zeigen Herstellerlogos und scheiden aus) |
| 2 | 7 Clips Kling V3 Pro, je 5 s, ohne Audio; Keyframes 01a A, 01b A, 04 A, 10 B, 11 A, 12 A, 13 A (Empfehlung) | `output/sme-gui-story/work/fal/stage-2-clips.json`, Hash `584e6f4c…9f4d7b1` | 3,92 $ laut Preisliste | freigegeben und generiert 25.09.; eingebaut, siehe [QA](sme-gui-story-qa.md) |

## Freigabeablauf

1. Du gibst Story und Storyboard frei, gegebenenfalls mit Änderungen.
2. Stufe 1a/1b: Ich zeige jeweils den fal-Dry-Run für Referenzen bzw. Keyframes. Generiert wird nur nach deiner ausdrücklichen Freigabe dieses Plans.
3. Du wählst die Keyframes aus.
4. Stufe 2: Dry-Run für die Clips (≈ 3,92 $ zuzüglich Neuversuche), wieder mit eigener Freigabe.
5. Danach baue ich autonom in Remotion und prüfe das Ergebnis visuell.
