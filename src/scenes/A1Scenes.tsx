import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {A1Headline, A1Logo, A1Text, a1Enter, a1Palette} from '../components/A1Brand';

const IdentityScene = ({inverse = false}: {inverse?: boolean}) => {
  const frame = useCurrentFrame();
  const headline = a1Enter(frame, 4, 22);
  const subtitle = a1Enter(frame, 16, 22);

  return (
    <AbsoluteFill style={{
      background: inverse ? a1Palette.black : a1Palette.white,
      color: inverse ? a1Palette.white : a1Palette.black,
    }}>
      <div style={{position: 'absolute', left: 112, top: 350, width: 1110}}>
        <A1Headline style={{
          fontSize: 124,
          lineHeight: 1.18,
          letterSpacing: -1.2,
          opacity: headline,
          transform: `translateY(${(1 - headline) * 20}px)`,
        }}>
          Alles im Blick.
        </A1Headline>
        {!inverse && (
          <A1Text style={{
            marginTop: 32,
            fontSize: 38,
            lineHeight: 1.4,
            color: a1Palette.copy,
            opacity: subtitle,
            transform: `translateY(${(1 - subtitle) * 16}px)`,
          }}>
            Ein fiktiver digitaler Service.
          </A1Text>
        )}
      </div>
      <A1Logo
        variant={inverse ? 'inverse' : 'primary'}
        style={{
          position: 'absolute',
          left: 1418,
          top: 286,
          width: 350,
          height: 388,
          objectFit: 'contain',
          opacity: a1Enter(frame, 0, 18),
        }}
      />
      <div style={{
        position: 'absolute',
        left: 112,
        right: 112,
        top: 798,
        height: 1,
        background: inverse ? a1Palette.copy : a1Palette.border,
        opacity: a1Enter(frame, 14, 24),
      }} />
    </AbsoluteFill>
  );
};

export const A1Intro = () => <IdentityScene />;

export const A1Overview = () => {
  const frame = useCurrentFrame();
  const headline = a1Enter(frame, 0, 22);

  return (
    <AbsoluteFill style={{background: a1Palette.white, color: a1Palette.black}}>
      <A1Headline style={{
        position: 'absolute',
        left: 112,
        top: 100,
        fontSize: 88,
        lineHeight: 1.2,
        opacity: headline,
        transform: `translateY(${(1 - headline) * 16}px)`,
      }}>
        Das Wesentliche zählt.
      </A1Headline>
      <div style={{
        position: 'absolute',
        left: 112,
        right: 112,
        top: 378,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
      }}>
        {['Übersicht', 'Termine', 'Dokumente'].map((label, index) => {
          const reveal = a1Enter(frame, 8 + index * 12, 22);

          return (
            <div key={label} style={{
              height: 352,
              padding: 40,
              boxSizing: 'border-box',
              background: a1Palette.surface,
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 18}px)`,
            }}>
              <A1Text bold style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 60,
                fontSize: 28,
                lineHeight: 1,
                color: a1Palette.interactionRed,
                background: index === 2 ? a1Palette.surfaceBlue : a1Palette.white,
              }}>
                0{index + 1}
              </A1Text>
              <A1Text bold style={{
                marginTop: 66,
                fontSize: 54,
                lineHeight: 1.2,
                color: a1Palette.black,
              }}>
                {label}
              </A1Text>
              <div style={{marginTop: 34, height: 1, background: a1Palette.border}} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const A1Outro = () => <IdentityScene inverse />;
