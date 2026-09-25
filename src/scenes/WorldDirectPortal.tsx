import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import definition from '../../brand/world-direct/brand.json';
import {BrandHeadline, BrandText} from '../components/Brand';

const palette = definition.palette;
const sections = [
  {
    name: 'Anfragen',
    subtitle: 'Im Gespräch bleiben.',
    rows: [
      ['Beispielanfrage', 'Abstimmung zum Projektstart', 'In Abstimmung'],
      ['Rückfrage zum Ablauf', 'Kontakt und nächste Schritte', 'Entwurf'],
    ],
  },
  {
    name: 'Termine',
    subtitle: 'Den nächsten Schritt gemeinsam planen.',
    rows: [
      ['Kennenlerngespräch', 'Persönlicher Austausch', 'Geplant'],
      ['Projektabstimmung', 'Gemeinsamer Blick auf nächste Schritte', 'Offen'],
    ],
  },
  {
    name: 'Dokumente',
    subtitle: 'Wissen teilen. Den Überblick behalten.',
    rows: [
      ['Projektübersicht.pdf', 'Gemeinsamer Ausgangspunkt', 'PDF'],
      ['Gesprächsnotizen.pdf', 'Raum für Vereinbarungen', 'PDF'],
    ],
  },
];

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const SectionIcon = ({index, color}: {index: number; color: string}) => (
  <svg width={30} height={30} viewBox="0 0 30 30" fill="none" stroke={color} strokeWidth={1.8}>
    {index === 0 ? (
      <>
        <path d="M4 6h22v16H10l-6 4V6Z" />
        <path d="M9 11h12M9 16h8" />
      </>
    ) : index === 1 ? (
      <>
        <path d="M4 7h22v19H4ZM4 13h22M9 3v8M21 3v8" />
        <path d="M9 18h4M17 18h4M9 22h4" />
      </>
    ) : (
      <>
        <path d="M6 3h12l6 6v18H6V3ZM18 3v7h6M11 16h8M11 21h8" />
      </>
    )}
  </svg>
);

export const WorldDirectPortal = () => {
  const frame = useCurrentFrame();
  const entry = interpolate(frame, [0, 18], [0, 1], clamp);
  const focus = interpolate(frame, [44, 54, 86, 98], [0, 1, 1, 2], clamp);
  const activeIndex = frame < 50 ? 0 : frame < 92 ? 1 : 2;
  const contentOpacity = (index: number) => {
    if (index === 0) return interpolate(frame, [44, 54], [1, 0], clamp);
    if (index === 1) return interpolate(frame, [44, 54, 86, 98], [0, 1, 1, 0], clamp);
    return interpolate(frame, [86, 98], [0, 1], clamp);
  };

  return (
    <AbsoluteFill style={{background: palette.white, color: palette.ink}}>
      <div style={{position: 'absolute', left: 96, top: 86, opacity: entry, transform: `translateY(${12 * (1 - entry)}px)`}}>
        <BrandHeadline style={{fontSize: 82, lineHeight: 1.2, color: palette.blue1}}>
          Alles an einem Ort.
        </BrandHeadline>
        <BrandText style={{fontSize: 38, lineHeight: 1.35, marginTop: 17}}>
          Anfragen. Termine. Dokumente.
        </BrandText>
      </div>

      <div
        style={{
          position: 'absolute', left: 96, top: 305, width: 1728, height: 630,
          border: `2px solid ${palette.gray2}`, borderRadius: 4, overflow: 'hidden',
          boxSizing: 'border-box', background: palette.white, opacity: entry,
          transform: `translateY(${24 * (1 - entry)}px)`,
        }}
      >
        <div style={{height: 66, background: palette.gray1, borderBottom: `1px solid ${palette.gray2}`, display: 'flex', alignItems: 'center', padding: '0 32px', gap: 24}}>
          <div style={{display: 'flex', gap: 10, marginRight: 12}}>
            {[0, 1, 2].map((dot) => <div key={dot} style={{width: 9, height: 9, border: `1px solid ${palette.ink}`, borderRadius: '50%', opacity: 0.35}} />)}
          </div>
          <BrandText style={{fontSize: 25, lineHeight: 1}}>serviceportal.example</BrandText>
          <BrandText style={{marginLeft: 'auto', fontSize: 25, color: palette.blue1, lineHeight: 1}}>
            Fiktiver UI-Entwurf · Beispieldaten
          </BrandText>
        </div>

        <div style={{position: 'absolute', top: 67, bottom: 0, left: 0, width: 310, borderRight: `1px solid ${palette.gray2}`, background: palette.white}}>
          <BrandText style={{position: 'absolute', top: 34, left: 32, fontSize: 29, color: palette.blue1}}>
            Serviceportal
          </BrandText>
          <div style={{position: 'absolute', top: 107 + focus * 86, left: 0, height: 66, width: 5, background: palette.blue2}} />
          <div style={{position: 'absolute', top: 107 + focus * 86, left: 18, right: 18, height: 66, background: palette.gray1}} />
          {sections.map((section, index) => (
            <div key={section.name} style={{position: 'absolute', top: 107 + index * 86, left: 32, height: 66, display: 'flex', alignItems: 'center', gap: 18}}>
              <SectionIcon index={index} color={activeIndex === index ? palette.blue2 : palette.ink} />
              <BrandText style={{fontSize: 31, color: activeIndex === index ? palette.blue1 : palette.ink}}>
                {section.name}
              </BrandText>
            </div>
          ))}
          <div style={{position: 'absolute', bottom: 38, left: 32, display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{width: 8, height: 8, background: palette.green}} />
            <BrandText style={{fontSize: 24}}>Demo-Ansicht</BrandText>
          </div>
        </div>

        {sections.map((section, index) => (
          <div key={section.name} style={{position: 'absolute', left: 360, right: 50, top: 93, opacity: contentOpacity(index)}}>
            <BrandHeadline style={{fontSize: 47, lineHeight: 1.25, color: palette.blue1}}>{section.name}</BrandHeadline>
            <BrandText style={{fontSize: 28, lineHeight: 1.35, marginTop: 7}}>{section.subtitle}</BrandText>
            <div style={{marginTop: 32, borderTop: `1px solid ${palette.gray2}`}}>
              {section.rows.map(([title, description, status]) => (
                <div key={title} style={{height: 135, boxSizing: 'border-box', borderBottom: `1px solid ${palette.gray2}`, display: 'flex', alignItems: 'center', gap: 24}}>
                  <div style={{width: 54, height: 58, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${palette.gray2}`}}>
                    <SectionIcon index={index} color={palette.blue2} />
                  </div>
                  <div style={{flex: 1}}>
                    <BrandText style={{fontSize: 34, lineHeight: 1.35}}>{title}</BrandText>
                    <BrandText style={{fontSize: 26, lineHeight: 1.4, marginTop: 5}}>{description}</BrandText>
                  </div>
                  <BrandText style={{fontSize: 24, lineHeight: 1.25, color: palette.blue1, padding: '10px 18px', background: palette.gray1, whiteSpace: 'nowrap'}}>{status}</BrandText>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
