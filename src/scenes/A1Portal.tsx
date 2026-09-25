import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {A1Headline, A1Text, a1Enter, a1Palette as palette} from '../components/A1Brand';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const navigation = [
  {label: 'Übersicht', left: 0, width: 151},
  {label: 'Termine', left: 219, width: 131},
  {label: 'Dokumente', left: 418, width: 177},
];

/** Shot 02: a fictional interface, with one focus change in its 150 frames. */
export const A1Portal = () => {
  const frame = useCurrentFrame();
  const entry = a1Enter(frame, 0, 18);
  const focus = interpolate(frame, [65, 77], [0, 1], clamp);

  return (
    <AbsoluteFill style={{background: palette.white, color: palette.black}}>
      <div
        style={{
          position: 'absolute', left: 112, top: 74,
          opacity: entry, transform: `translateY(${12 * (1 - entry)}px)`,
        }}
      >
        <A1Headline style={{fontSize: 76, lineHeight: 1.12}}>
          Ein Ort für Ihre Services.
        </A1Headline>
      </div>

      <div
        style={{
          position: 'absolute', left: 112, top: 242, width: 1696, height: 690,
          boxSizing: 'border-box', border: `1px solid ${palette.border}`,
          borderRadius: 4, overflow: 'hidden', background: palette.white,
          opacity: entry, transform: `translateY(${12 * (1 - entry)}px)`,
        }}
      >
        <div
          style={{
            height: 74, boxSizing: 'border-box', padding: '0 38px',
            background: palette.surface, borderBottom: `1px solid ${palette.border}`,
            display: 'flex', alignItems: 'center',
          }}
        >
          <div style={{display: 'flex', gap: 9, marginRight: 28}}>
            {[0, 1, 2].map((dot) => (
              <div key={dot} style={{width: 8, height: 8, borderRadius: '50%', background: palette.border}} />
            ))}
          </div>
          <A1Text style={{fontSize: 25, lineHeight: 1, color: palette.copy}}>
            serviceportal.example
          </A1Text>
          <A1Text style={{marginLeft: 'auto', fontSize: 25, lineHeight: 1, color: palette.copy}}>
            UI-Entwurf · Beispieldaten
          </A1Text>
        </div>

        <div
          style={{
            position: 'relative', height: 102, boxSizing: 'border-box',
            borderBottom: `1px solid ${palette.border}`,
            display: 'flex', alignItems: 'center', padding: '0 48px',
          }}
        >
          <A1Text bold style={{fontSize: 32, lineHeight: 1}}>Serviceportal</A1Text>
          <div style={{position: 'absolute', left: 680, top: 0, height: 102, width: 595}}>
            {navigation.map((item, index) => (
              <div key={item.label} style={{position: 'absolute', left: item.left, top: 0, height: 101, width: item.width, display: 'flex', alignItems: 'center'}}>
                <A1Text style={{fontSize: 31, lineHeight: 1, color: palette.copy}}>
                  {item.label}
                </A1Text>
                {index < 2 ? (
                  <A1Text
                    style={{
                      position: 'absolute', left: 0, fontSize: 31, lineHeight: 1,
                      color: palette.interactionRed, opacity: index === 0 ? 1 - focus : focus,
                    }}
                  >
                    {item.label}
                  </A1Text>
                ) : null}
              </div>
            ))}
            <div
              style={{
                position: 'absolute', left: navigation[1].left * focus, bottom: 0,
                width: navigation[0].width + (navigation[1].width - navigation[0].width) * focus,
                height: 3, background: palette.interactionRed,
              }}
            />
          </div>
        </div>

        <div style={{position: 'absolute', left: 48, right: 48, top: 218, opacity: 1 - focus}}>
          <A1Headline style={{fontSize: 50, lineHeight: 1.15}}>Übersicht</A1Headline>
          <div style={{display: 'flex', gap: 32, marginTop: 34}}>
            <div style={{flex: 1, height: 268, boxSizing: 'border-box', padding: '35px 38px', background: palette.surface}}>
              <A1Text style={{fontSize: 28, lineHeight: 1.25, color: palette.copy}}>Nächster Termin</A1Text>
              <A1Text bold style={{fontSize: 40, lineHeight: 1.2, marginTop: 23}}>Projektgespräch</A1Text>
              <A1Text style={{fontSize: 28, lineHeight: 1.3, marginTop: 22, color: palette.copy}}>Besprechung zum Projekt</A1Text>
            </div>
            <div style={{flex: 1, height: 268, boxSizing: 'border-box', padding: '35px 38px', border: `1px solid ${palette.border}`}}>
              <A1Text style={{fontSize: 28, lineHeight: 1.25, color: palette.copy}}>Dokumente</A1Text>
              <A1Text bold style={{fontSize: 40, lineHeight: 1.2, marginTop: 23}}>Projektübersicht.pdf</A1Text>
              <A1Text style={{fontSize: 28, lineHeight: 1.3, marginTop: 22, color: palette.copy}}>Unterlagen zum Gespräch</A1Text>
            </div>
          </div>
        </div>

        <div style={{position: 'absolute', left: 48, right: 48, top: 218, opacity: focus}}>
          <A1Headline style={{fontSize: 50, lineHeight: 1.15}}>Termine</A1Headline>
          <div style={{position: 'relative', height: 268, marginTop: 34, boxSizing: 'border-box', padding: '35px 38px', background: palette.surface}}>
            <A1Text style={{fontSize: 28, lineHeight: 1.25, color: palette.copy}}>Nächster Termin</A1Text>
            <A1Text bold style={{fontSize: 40, lineHeight: 1.2, marginTop: 23}}>Projektgespräch</A1Text>
            <A1Text style={{fontSize: 28, lineHeight: 1.3, marginTop: 22, color: palette.copy}}>Besprechung zum Projekt</A1Text>
            <div
              style={{
                position: 'absolute', right: 38, top: 93, height: 78,
                padding: '0 36px', boxSizing: 'border-box',
                background: palette.red, color: palette.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <A1Text bold style={{fontSize: 31, lineHeight: 1, color: palette.white}}>Termin ansehen</A1Text>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
