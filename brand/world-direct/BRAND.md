# World Direct · erstes CI-Kit

Status: **Arbeitsstand, keine abschließende CI-Freigabe.** Farbpalette und Logo-Priorität wurden vom Nutzer am **24.09.2026** bestätigt. Weitere Grundlage ist das bereitgestellte [WD CI Manual_2025.pptx](<../../public/assets/brand/references/WD CI Manual_2025.pptx>) vom **11.09.2025**. Die Titelfolie nennt es „Content Collection / Work in Progress“. Es enthält auch Seiten des Manuals Version 1.2 von Februar 2020. Foliennummern hier meinen die Position in der 67-seitigen PPTX, nicht deren gedruckte Seitenzahlen.

## Einstieg

- [brand.json](brand.json): maschinenlesbare Farben, Schriften und Asset-Pfade.
- [assets.json](assets.json): Herkunft, Prüfsummen, Metadaten und Zielpfade aller Originale.
- [COLOR-REVIEW.md](COLOR-REVIEW.md): bestätigte Palette, digitale Umsetzung und historische Farbabweichungen.
- [OPEN-POINTS.md](OPEN-POINTS.md): Rückfragen und nachzureichende Dateien.
- `npm run brand:preview`: CI-Übersichtsblatt nach `output/brand/world-direct/final/world-direct-ci-kit.png` rendern. Im Studio heißt die Still-Composition `WorldDirectBrandKit`.

Originale in `World Direct/` bleiben unverändert. Produktionskopien liegen unter `public/assets/brand/`, die Logoanimation unter `public/assets/video/brand/`; JSON-Pfade sind relativ zu `public/` und werden mit `staticFile()` eingebunden. Medien und Renderings sind laut `.gitignore` lokal: Für die Übergabe auch die Asset-Ordner mitgeben. Ein Git-Checkout allein enthält sie nicht.

## Identität und Sprache

**Claim:** `<we code your digital future>` · **Hashtag:** `#YourDigitalFuture`.

Der Claim darf außerhalb des Logos im Fließtext stehen; die Code-Klammern stellen den Softwarebezug her. Der Hashtag ist für Social Media, Giveaways und Kleidung vorgesehen. Kernwerte: Innovationskraft, Kundenorientierung, Firmenkultur und Kompetenz. Quellen: Folien 3–6.

Aus der **Wir-Perspektive** sprechen und die Zielgruppe direkt adressieren. Im normalen Unternehmenskontext **Sie**, im Recruiting ist **Du** möglich. Professionell, sympathisch, authentisch, selbstbewusst, partnerschaftlich und zukunftsgerichtet schreiben. Kurze aktive Sätze; Lösungen und belegbare Beispiele statt Floskeln und Selbstdarstellung. Fachbegriffe erklären und deutsche Begriffe verwenden; Ausnahmen sind Eigennamen und Begriffe ohne etablierte deutsche Übersetzung. Keine „man“-Formulierungen, Textwüsten oder belehrende Ansprache. Quellen: Folien 16–18.

Die Mission nennt Softwareentwicklung und IT-Infrastruktur für Medizin, Energie, Immobilien, Finanz, Telekommunikation und Public Services (Folie 3). Unternehmensangaben stammen aus dem Manual 2025 und sollten für neue Veröffentlichungen aktualisiert werden.

## Farben

Verbindliche Quelle für die Palette ist das vom Nutzer am **24.09.2026 bestätigte Farbblatt** „Die Farbpalette – Primär- und Sekundär-Farben“. Es entspricht der beschrifteten Tabelle auf Folie 8. Für digitale Tokens verwenden wir einheitlich die dort gedruckten **Hex-Werte**. Diese Umsetzungsregel löst die Abweichungen zwischen Hex-Text, RGB-Text und Farbfeldfüllungen; sie ist keine zusätzliche CI-Vorgabe. Die Quellenentscheidung ist geklärt, die historischen Unterschiede bleiben im [Farbabgleich](COLOR-REVIEW.md) dokumentiert.

| Token | Wert | Bezeichnung im bestätigten Farbblatt |
| --- | --- | --- |
| `blue1` | `#003A5D` | WD-Blau 1 |
| `blue2` | `#006EAD` | WD-Blau 2 |
| `blue3` | `#6EA1CF` | WD-Blau 3 |
| `green` | `#AFCA0B` | WD-Grün 1 |
| `ink` | `#1E1F16` | Dunkles Grau |
| `gray1` | `#EFEDEB` | Grau 1 |
| `gray2` | `#E0DCD8` | Grau 2 |
| `gray3` | `#D1CBC7` | Grau 3 |
| `gray4` | `#C6C0BB` | Grau 4 |
| `white` / `black` | `#FFFFFF` / `#000000` | Weiß / Schwarz |

Komponenten-Rollen: Weiß als Hintergrund, `ink` für Text und Begleittext (`colors.text` und `colors.muted`) sowie `blue1` als Standardakzent. `textGray` und `lightGray` aus der früheren Arbeitsauswahl gehören nicht zur bestätigten Palette. **Grün sehr sparsam**, nicht als Standard für große Flächen oder Fließtext. Farbige Hintergründe und helle Blautöne nur nach Lesbarkeitsprüfung hinter Text verwenden. Quellen: bestätigtes Farbblatt sowie Folien 33, 65–66.

**Original-Assets behalten ihre eingebetteten Farben.** Logo- und Hintergrund-SVGs werden unverändert verwendet; ihre teils abweichenden Werte sind Eigenschaften dieser gelieferten Dateien, keine alternativen Tokens für neue Gestaltung. Das betrifft etwa Logo-Blau `#006FAD` / `#6FA1CE`, die Wortmarke `#1D1D1B` und das Hintergrund-Grün `#94AC0D` in `Poly_BG_01.svg`. Der [Farbabgleich](COLOR-REVIEW.md) und [das Inventar](assets.json) trennen diese Werte von der bestätigten Palette.

## Typografie

**Cairo** ist die Primärschrift für Digital und Video. Alle sechs lokalen TTF-Schnitte werden mit ihrem tatsächlichen Gewicht geladen. **Arial** ist Sekundär-/Systemschrift, für PowerPoint und Newsletter ausdrücklich wegen Plattformkompatibilität vorgesehen. Digitaler Fallback: `Cairo, Arial, sans-serif`. Quellen: Folien 43–44, 49–51, 54–55.

| Schnitt | CSS-Gewicht | Arbeitsverwendung |
| --- | --- | --- |
| ExtraLight | **250** | vorhanden; feine Akzente auf Lesbarkeit prüfen |
| Light | 300 | Headlines / Leadtext als Startwert |
| Regular | 400 | Fließtext / Bildlegenden |
| SemiBold | 600 | zurückhaltende Hervorhebung bei Bedarf |
| Bold | 700 | punktuelle Hervorhebung |
| Black | 900 | vorhanden, kein Standard für Headlines |

ExtraLight meldet in dieser Datei tatsächlich `usWeightClass=250`. Die Fonts melden Version 2.009 und SIL Open Font License 1.1 in den Metadaten. Die nachgereichte Lizenzdatei aus `World Direct/Fonts/OFL.txt` liegt bei den Produktionskopien als [OFL.txt](../../public/assets/brand/fonts/OFL.txt); bei Weitergabe des Font-Pakets mitgeben. Kein Italic-Schnitt geliefert. Die Brand-Komponenten vermeiden synthetische Schriftschnitte.

Das Manual fordert feine klare Schrift und wenig Bold (Folie 65). Die Light-/Regular-Rollen sind aus den Beispielen auf Folie 44 abgeleitet, deren finale Definition ausdrücklich offen ist. Größen, Zeilenhöhen, Laufweiten und responsive Hierarchien sind **nicht verbindlich definiert**. Folie 54 enthält den Hinweis „Achtung falsche Schrift“: Die Formatierung dieser Muster ist kein verlässlicher Nachweis. Umbrüche und Lesbarkeit am Zielformat prüfen.

## Logos

| Schlüssel | Original | Verwendung im Kit |
| --- | --- | --- |
| `primary` / `claim` | `WD_Logo claim.svg` | bevorzugtes farbiges Logo mit Claim; beide Schlüssel zeigen auf dieselbe Datei |
| `icon` | `WD_Isotype.svg` | farbige Bildmarke für stilistische Anwendungen |
| `block` | `WD_Logo_Block.svg` | Blockversion nur im Ausnahmefall als letzte Option |

Die Nutzerentscheidung vom **24.09.2026** legt die Reihenfolge fest: **farbig mit Claim zuerst**, bei stilistischer Gestaltung eher die **Bildmarke**, **Block nur im Notfall**. Das Logo mit Claim ausreichend groß und lesbar zeigen. Die Hinweise des Manuals zu kompakten, einfarbigen und Social-Media-Anwendungen (Folien 11–13) ergänzen diese Priorität, ersetzen sie aber nicht.

Originalproportionen beibehalten. Die Bildmarke ist 907,1 × 370,5 SVG-Einheiten breit; das Motiv füllt den Canvas tatsächlich und ist kein quadratisches App-Icon. Nicht verzerren oder ungeprüft quadratisch beschneiden. Keine künstlichen Inversvarianten oder Filterfarben ableiten. Für dunkle Flächen fehlt ein freigegebenes helles/negatives Logo; bis dahin eine ruhige helle Logofläche verwenden. Numerischer Schutzraum, Mindestgröße und gegebenenfalls A1-Co-Branding sind offen. Freien Raum als Arbeitsregel lassen, ohne eine offizielle Maßeinheit zu erfinden. Canvas-Ränder sind keine Schutzraumvorgabe.

## Polygone und Bildsprache

Polygone sind das Key Visual und ersetzen die frühere 3D-„Papierbühne“. Menschlichkeit entsteht durch den Kontext. Das „Almbild“ zugunsten anderer Standorte weniger einsetzen (Folie 25).

| Schlüssel | Original | Charakter |
| --- | --- | --- |
| `polygonColor` | `Poly_BG_01.svg` | Grau/Blau und kleine grüne Teilfläche; Farbkonflikt dokumentiert |
| `polygonBlue` | `Poly_BG_02.svg` | vollflächige Blaustufen; allgemeiner Einsatz offen |
| `polygonSide` | `Poly_BG_07.svg` | Polygone links, große weiße Freifläche rechts |

`Poly_BG_01 2.svg` ist byteidentisch mit `Poly_BG_01.svg` und als Duplikat im Inventar geführt. Originalmaße jeweils 963,8 × 538,6, also annähernd 16:9. `contain` zeigt das ganze Muster, `cover` kann Kanten beschneiden. Hochformat gezielt komponieren, nicht strecken. Es gibt bewusst keinen automatisch auf jede Szene gelegten Hintergrund.

Folie 33 nennt Graustufen, Grau/Blau und Grau/Blau mit **einem kleinen grünen Polygon**. Farbige Varianten dezent und vor allem auf Titelseiten oder Social-Headern einsetzen. Der rein blaue Hintergrund ist als geliefertes Asset verfügbar, wird aber nicht zur allgemeinen Regel erklärt. Keine freistehenden, sehr kleinen oder ineinanderliegenden Polygone (Folie 36). Polygone bleiben eigenständige Hintergrund-/Gestaltungselemente, ersetzen keine Inhalte und verbinden sich nicht mit dem Text (Folien 65–67).

Branchenbilder zeigen Menschen, Aktivität und möglichst einen branchenrelevanten Vorgang mit Digitalisierungsbezug (Folie 24). Eingebettete Manual-Fotos sind **Referenzen**, keine automatisch freigegebene Produktionsbibliothek. Originale und Nutzungsrechte sind offen.

Stencils nur für Branchenbilder: waagrecht, vollständig mit erkennbarem Motiv gefüllt, ausreichender Kontrast, kein Schlagschatten, vollflächiger weißer/grauer Untergrund (Folie 21). Davon unterscheiden sich Low-Poly-Overlays: Dort ist ein leichter Schatten am diagonalen Anschnitt beschrieben (Folien 26–27). Maximal zwei diagonale Anschnitte, Hauptmotiv sichtbar halten; Text in der Freifläche an derselben Seite bündig setzen (Folien 29–30). Freisteller: Einzelprodukt, transparente Hintergründe, realistische Schatten; graue Polygone sind erlaubt (Folie 31).

Icons: einfache, möglichst eckige Outline-Formen, einfarbig. Keine gefüllten, handgezeichneten oder Cartoon-Icons. Eine WD-Icon-Library ist angekündigt, aber nicht geliefert. Die Isometrie-Formulierung auf Folie 40 ist uneindeutig; keine zusätzliche Regel daraus ableiten (Folien 38–40).

## Video und Remotion

Belegt: **2D-Design, Cairo, Polygone, WD-Logo und Bildmarke** (Folie 51). Die nachgereichte Logo-Build-up-Referenz `World Direct/Logos/WD_Logo.mov` steht unter [public/assets/video/brand/WD_Logo.mov](../../public/assets/video/brand/WD_Logo.mov) bereit: etwa **11,33 Sekunden**, **1920 × 1080**, rund **30 fps**, QuickTime Animation mit Alpha-Kanal, ohne Audiospur. Laut Nutzer ist sie sehr lang und **optional**: Sie ist keine Pflicht für Intro oder Outro und wird weder automatisch eingesetzt noch gekürzt. Eine konkrete Verwendung oder Bearbeitung gehört in den jeweiligen Filmplan.

Textbalken, Musik, Übergänge, Zeitverhalten und konkrete Schriftgrößen sind noch auszuarbeiten. Für einen Markenfilm zuerst den konkreten Plan besprechen; dieses Kit ist die Grundlage.

`BrandHeadline` verwendet Light, `BrandText` Regular. `BrandLogo` unterstützt `primary`, `claim`, `icon`, `block`; fehlende Varianten werden nicht erfunden. `BrandBackground` startet auf Weiß. Einen Hintergrund pro Anwendung gezielt wählen:

```tsx
<BrandBackground image={brand.images?.polygonSide}>
  <div style={{position: 'absolute', left: 800, top: 240, width: 960}}>
    <BrandHeadline style={{fontSize: 72, lineHeight: 1.15}}>
      Ihre digitale Zukunft
    </BrandHeadline>
  </div>
</BrandBackground>
```

Die Zahlen sind Layout-Startwerte, keine CI-Maße. Lokale Fonts laden über [`@remotion/fonts`](https://www.remotion.dev/docs/fonts-api/load-font); die Vorschau verwendet [`Still`](https://www.remotion.dev/docs/still). `StudioDemo` bleibt eine technische Beispieltimeline: Texte, Mockups, explizite Typogrößen und Animationen sind kein freigegebenes WD-Videotemplate. Zur CI-Beurteilung das separate Übersichtsblatt verwenden.

## Prüfung dieses Arbeitsstands · 24.09.2026

- 15 importierte Originaldateien einschließlich Lizenz und Logoanimation gegen Quelle und SHA-256 im Inventar geprüft; alle konfigurierten Medienpfade vorhanden.
- Alle elf Farb-Tokens gegen die bestätigten Hex-Werte geprüft; `primary` und `claim` verweisen auf dieselbe Logo-Datei.
- `npm run typecheck` und `git diff --check` erfolgreich.
- `WorldDirectBrandKit` mit `npm run brand:preview` als aktualisiertes PNG in 1920 × 1440 gerendert und tatsächlich angesehen: Logos, Schriftschnitte, Farbwerte und Hintergrundmuster kontrolliert.
- Repräsentative Frames der optionalen Logoanimation als [Kontaktbogen](../../output/brand/world-direct/qa/WD_Logo-contact-sheet.png) angesehen; Metadaten, Alpha-Kanal und fehlende Audiospur technisch geprüft.
- Quellenabgleich der Regeln und Farbkonflikte gegen das Manual durchgeführt. Keine generativen Medien, keine kostenpflichtigen API-Aufrufe.

Die Prüfung betrifft das statische CI-Kit und repräsentative Frames der Logo-Referenz. Eine vollständige Wiedergabeprüfung der Animation und ein finaler Markenfilm stehen aus; es wurde kein Intro-/Outro-Einsatz freigegeben.
