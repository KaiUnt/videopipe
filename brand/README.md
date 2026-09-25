# CI-Kits

Jede Marke hat einen eigenen Ordner mit Konfiguration, Nutzungsregeln und Asset-Inventar:

| Marke | Einstieg | Konfiguration | Inventar |
| --- | --- | --- | --- |
| World Direct | [BRAND.md](world-direct/BRAND.md) | [brand.json](world-direct/brand.json) | [assets.json](world-direct/assets.json) |
| A1 | [BRAND.md](a1/BRAND.md) | [brand.json](a1/brand.json) | [assets.json](a1/assets.json) |

In `brand.json` ist `palette` die vollständige Sammlung benannter Markentokens. `colors` ordnet die semantischen Rollen `background`, `text`, `muted` und `accent` zu. Beides sind getrennte Werte, keine automatisch synchronisierten Aliase: `src/components/Brand.tsx` verwendet `colors`, während `src/components/A1Brand.tsx` derzeit direkt `palette` nutzt.

Die vorhandenen World-Direct-Kompositionen und `src/components/Brand.tsx` importieren ausdrücklich `brand/world-direct/brand.json`. Für eine neue Markenkomposition die entsprechende Konfiguration gezielt einbinden; es gibt keinen automatischen Markenwechsel.

Der A1-Testfilm `A1Test` verwendet über `src/components/A1Brand.tsx` ausschließlich das A1-Kit. Die Testfilme sind im Remotion Studio getrennt auswählbar.

Medien bleiben unter `public/assets/`. Die Medienpfade in den JSON-Dateien sind relativ zu `public/`, unabhängig vom Ablageort des Kits. Die ursprünglichen World-Direct-Dateien im Repository-Ordner `World Direct/` sind das gelieferte Quellmaterial.
