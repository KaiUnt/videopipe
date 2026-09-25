import type {CSSProperties, PropsWithChildren} from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import definition from '../../brand/world-direct/brand.json';
import {BrandHeadline, BrandLogo, BrandText} from '../components/Brand';

const {palette} = definition;
const ink = palette.blue1;
const muted = palette.ink;
const rule = palette.gray2;
const weights = [
  ['ExtraLight', 250], ['Light', 300], ['Regular', 400],
  ['SemiBold', 600], ['Bold', 700], ['Black', 900],
] as const;
const blues = [palette.blue1, palette.blue2, palette.blue3];
const neutrals = [palette.ink, palette.black, palette.white, palette.gray1, palette.gray2, palette.gray3, palette.gray4];

const Area = ({children, style}: PropsWithChildren<{style: CSSProperties}>) => (
  <div style={{position: 'absolute', ...style}}>{children}</div>
);
const Label = ({children}: PropsWithChildren) => (
  <BrandText style={{fontSize: 18, fontWeight: 400, color: muted, letterSpacing: 1.5, lineHeight: 1.3}}>
    {children}
  </BrandText>
);
const Divider = ({top}: {top: number}) => (
  <Area style={{left: 96, right: 96, top, borderTop: `1px solid ${rule}`}} />
);
const Swatch = ({hex, width, height = 64}: {hex: string; width: number; height?: number}) => (
  <div style={{width}}>
    <div style={{height, background: hex, border: hex === '#FFFFFF' ? `1px solid ${rule}` : undefined}} />
    <BrandText style={{fontSize: width < 100 ? 16 : 18, color: muted, paddingTop: 9, lineHeight: 1.2}}>{hex}</BrandText>
  </div>
);

/** Static reference sheet using the confirmed palette and logo priorities. */
export const BrandKit = () => (
  <AbsoluteFill style={{background: palette.white, color: ink}}>
    <Area style={{left: 96, top: 62}}>
      <BrandHeadline style={{fontSize: 72, fontWeight: 300, lineHeight: 1.2}}>World Direct</BrandHeadline>
      <BrandText style={{fontSize: 26, fontWeight: 400, color: muted, marginTop: 10}}>Corporate Identity · Arbeitsgrundlage</BrandText>
    </Area>
    <Area style={{right: 96, top: 80, textAlign: 'right'}}>
      <BrandText style={{fontSize: 23, fontWeight: 400}}>CI-Kit · Stand 02</BrandText>
      <BrandText style={{fontSize: 19, color: muted, marginTop: 6}}>Manual 11.09.2025 · WIP</BrandText>
    </Area>
    <Divider top={204} />

    <Area style={{left: 96, top: 236}}><Label>01 · LOGOS</Label></Area>
    {([
      ['primary', 'Standard · farbig mit Claim', 'WD_Logo claim.svg'],
      ['icon', 'Gestalterische Anwendungen · Isotype', 'WD_Isotype.svg'],
      ['block', 'Nur im Ausnahmefall · Block', 'WD_Logo_Block.svg'],
    ] as const).map(([variant, title, filename], i) => (
      <Area key={variant} style={{left: 96 + i * 592, top: 287, width: 544}}>
        <div style={{height: 116, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
          <BrandLogo variant={variant} style={{width: variant === 'icon' ? 284 : 458, height: 112, objectPosition: 'left center'}} />
        </div>
        <BrandText style={{fontSize: 23, marginTop: 14, lineHeight: 1.2}}>{title}</BrandText>
        <BrandText style={{fontSize: 17, color: muted, marginTop: 6}}>{filename}</BrandText>
      </Area>
    ))}
    <Divider top={489} />

    <Area style={{left: 96, top: 526, width: 808}}>
      <Label>02 · TYPOGRAFIE</Label>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 30, marginTop: 19}}>
        <BrandHeadline style={{fontSize: 68, fontWeight: 300, lineHeight: 1.2}}>Cairo</BrandHeadline>
        <BrandText style={{fontSize: 21, color: muted}}>Headlines Light · Fließtext Regular</BrandText>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 24, marginTop: 26}}>
        {weights.map(([name, weight]) => (
          <div key={name}>
            <BrandText style={{fontSize: 39, fontWeight: weight, lineHeight: 1.15}}>Aa 0123</BrandText>
            <BrandText style={{fontSize: 17, fontWeight: 400, marginTop: 9, color: muted}}>{name} · {weight}</BrandText>
          </div>
        ))}
      </div>
    </Area>

    <Area style={{left: 992, top: 526, width: 832}}>
      <Label>03 · FARBFAMILIE</Label>
      <BrandText style={{fontSize: 20, color: muted, marginTop: 21}}>Hex-Werte des bestätigten Farbblatts</BrandText>
      <div style={{display: 'flex', gap: 20, marginTop: 20}}>
        {blues.map((hex) => <Swatch key={hex} hex={hex} width={218} />)}
        <div style={{width: 118}}>
          <div style={{height: 64, display: 'flex', alignItems: 'center'}}>
            <div style={{width: 32, height: 32, background: palette.green}} />
          </div>
          <BrandText style={{fontSize: 18, color: muted, paddingTop: 9, lineHeight: 1.2}}>{palette.green}</BrandText>
          <BrandText style={{fontSize: 15, color: muted, marginTop: 5}}>sparsam einsetzen</BrandText>
        </div>
      </div>
      <div style={{display: 'flex', gap: 14, marginTop: 23}}>
        {neutrals.map((hex) => <Swatch key={hex} hex={hex} width={106} height={51} />)}
      </div>
    </Area>
    <Divider top={890} />

    <Area style={{left: 96, top: 929, width: 1168}}>
      <Label>04 · POLYGON-HINTERGRÜNDE</Label>
      <div style={{display: 'flex', gap: 24, marginTop: 27}}>
        {['01', '02', '07'].map((number) => (
          <div key={number} style={{width: 368}}>
            <Img
              src={staticFile(`assets/brand/images/backgrounds/Poly_BG_${number}.svg`)}
              style={{display: 'block', width: 368, height: 206, objectFit: 'contain', background: palette.white}}
            />
            <BrandText style={{fontSize: 20, color: muted, marginTop: 13}}>Poly_BG_{number}</BrandText>
          </div>
        ))}
      </div>
    </Area>
    <Area style={{left: 1328, top: 929, width: 496}}>
      <Label>05 · ANWENDUNG</Label>
      <BrandHeadline style={{fontSize: 35, fontWeight: 300, lineHeight: 1.25, marginTop: 27}}>Klar. Fein. Zweidimensional.</BrandHeadline>
      <BrandText style={{fontSize: 22, fontWeight: 400, lineHeight: 1.65, color: muted, marginTop: 17}}>
        Headlines fein und mit viel Weißraum.<br />
        Polygone dezent einsetzen.<br />
        Im normalen Wording mit „Sie“ ansprechen.<br />
        Logo-Aufbau als optionale Referenz.
      </BrandText>
    </Area>
    <Divider top={1294} />
    <Area style={{left: 96, top: 1328}}>
      <BrandText style={{fontSize: 19, color: muted}}>Farbblatt + Logo-Priorität bestätigt · Original-SVGs unverändert · Cairo inkl. OFL-Lizenz</BrandText>
    </Area>
    <Area style={{right: 96, top: 1328}}>
      <BrandText style={{fontSize: 19, color: muted}}>CI-Übersicht · 02</BrandText>
    </Area>
  </AbsoluteFill>
);
