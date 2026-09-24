import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AssetMedia} from '../components/AssetMedia';
import {
  BrowserMockup,
  DemoDashboard,
  LaptopMockup,
  PhoneMockup,
  TabletMockup,
} from '../components/Mockups';
import type {
  FeatureShot,
  MediaShot,
  MockupShot,
  OutroShot,
  TitleShot,
} from '../lib/shots';

const ink = '#eaf8fa';
const muted = '#9fb8c5';
const accent = '#54dfd8';

const rise = (frame: number, offset = 0) =>
  interpolate(frame, [offset, offset + 22], [52, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const appear = (frame: number, offset = 0) =>
  interpolate(frame, [offset, offset + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const ShotBackground = ({children}: {children: React.ReactNode}) => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(circle at 72% 25%, #20506c 0%, #0e2944 36%, #08192d 78%)',
      color: ink,
      fontFamily: 'Arial, Helvetica, sans-serif',
      overflow: 'hidden',
    }}
  >
    <AbsoluteFill
      style={{
        backgroundImage:
          'linear-gradient(#88c9d40d 1px, transparent 1px), linear-gradient(90deg, #88c9d40d 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'linear-gradient(90deg, transparent, black 50%, transparent)',
      }}
    />
    {children}
  </AbsoluteFill>
);

const Eyebrow = ({children}: {children: React.ReactNode}) => (
  <div
    style={{
      color: accent,
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: 7,
      textTransform: 'uppercase',
      marginBottom: 28,
    }}
  >
    {children}
  </div>
);

export const TitleScene = ({shot}: {shot: TitleShot}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 75], [0, 70], {
    extrapolateRight: 'clamp',
  });

  return (
    <ShotBackground>
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          right: 100,
          top: 135,
          borderRadius: '50%',
          border: '2px solid #5ce4da44',
          boxShadow: '0 0 0 75px #5ce4da0b, 0 0 0 150px #5ce4da08',
          transform: 'rotate(-18deg) scale(' + (1 + glow / 500) + ')',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 112,
          display: 'flex',
          alignItems: 'center',
          gap: 15,
          fontSize: 23,
          fontWeight: 800,
          letterSpacing: 2,
        }}
      >
        <span style={{fontSize: 40, color: accent}}>◈</span> VIDEO STUDIO
      </div>
      <div style={{position: 'absolute', left: 112, top: 315, width: 1100}}>
        <div style={{opacity: appear(frame, 3), transform: 'translateY(' + rise(frame, 3) + 'px)'}}>
          <Eyebrow>{shot.eyebrow ?? 'NEW PROJECT'}</Eyebrow>
        </div>
        <div
          style={{
            fontSize: 124,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -7,
            opacity: appear(frame, 9),
            transform: 'translateY(' + rise(frame, 9) + 'px)',
          }}
        >
          {shot.title}
        </div>
        {shot.subtitle && (
          <div
            style={{
              fontSize: 35,
              lineHeight: 1.35,
              color: muted,
              maxWidth: 950,
              marginTop: 38,
              opacity: appear(frame, 20),
              transform: 'translateY(' + rise(frame, 20) + 'px)',
            }}
          >
            {shot.subtitle}
          </div>
        )}
      </div>
      <div style={{position: 'absolute', left: 112, bottom: 105, width: 125, height: 7, borderRadius: 5, background: accent}} />
    </ShotBackground>
  );
};

export const MockupScene = ({shot}: {shot: MockupShot}) => {
  const frame = useCurrentFrame();
  const screen = shot.asset ? <AssetMedia asset={shot.asset} defaultVolume={0} /> : <DemoDashboard />;
  const device = shot.device ?? 'browser';

  let mockup: React.ReactNode;
  if (device === 'laptop') {
    mockup = <LaptopMockup url={shot.url}>{screen}</LaptopMockup>;
  } else if (device === 'phone') {
    mockup = <PhoneMockup>{screen}</PhoneMockup>;
  } else if (device === 'tablet') {
    mockup = <TabletMockup>{screen}</TabletMockup>;
  } else if (device === 'floating') {
    mockup = (
      <div style={{width: 1200, height: 690, overflow: 'hidden', borderRadius: 28, boxShadow: '0 45px 95px #00112699'}}>
        {screen}
      </div>
    );
  } else {
    mockup = <BrowserMockup url={shot.url}>{screen}</BrowserMockup>;
  }

  return (
    <ShotBackground>
      <div style={{position: 'absolute', left: 105, top: 230, width: 500, zIndex: 2}}>
        <Eyebrow>{shot.asset ? 'REAL PRODUCT' : 'DEMO PREVIEW'}</Eyebrow>
        <div style={{fontSize: 70, fontWeight: 800, lineHeight: 1.08, letterSpacing: -3}}>
          {shot.title}
        </div>
        {shot.caption && (
          <div style={{fontSize: 29, lineHeight: 1.35, color: muted, marginTop: 30}}>
            {shot.caption}
          </div>
        )}
        <div style={{height: 7, width: 100, background: accent, borderRadius: 5, marginTop: 45}} />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 75,
          top: 150,
          width: 1270,
          height: 800,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: appear(frame, 5),
          transform: 'translateY(' + rise(frame, 5) + 'px) scale(0.94)',
          transformOrigin: 'center center',
        }}
      >
        {mockup}
      </div>
    </ShotBackground>
  );
};

export const MediaScene = ({shot}: {shot: MediaShot}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: '#061827', fontFamily: 'Arial, Helvetica, sans-serif'}}>
      <AbsoluteFill>
        <AssetMedia asset={shot.asset} />
      </AbsoluteFill>
      {(shot.title || shot.caption) && (
        <AbsoluteFill
          style={{
            background: 'linear-gradient(transparent 40%, #051729cc 83%, #051729ee)',
            color: ink,
            justifyContent: 'flex-end',
            padding: '0 105px 110px',
          }}
        >
          {shot.title && (
            <div
              style={{
                fontSize: 70,
                fontWeight: 800,
                maxWidth: 1150,
                opacity: appear(frame, 9),
                transform: 'translateY(' + rise(frame, 9) + 'px)',
              }}
            >
              {shot.title}
            </div>
          )}
          {shot.caption && (
            <div style={{fontSize: 30, color: '#d9e7eb', marginTop: 18, maxWidth: 1100}}>
              {shot.caption}
            </div>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const FeatureScene = ({shot}: {shot: FeatureShot}) => {
  const frame = useCurrentFrame();
  return (
    <ShotBackground>
      <div style={{position: 'absolute', left: 105, top: 160}}>
        <Eyebrow>{shot.eyebrow ?? 'THE IDEA'}</Eyebrow>
        <div style={{fontSize: 84, fontWeight: 800, letterSpacing: -4, maxWidth: 1450}}>
          {shot.title}
        </div>
      </div>
      <div style={{position: 'absolute', left: 105, right: 105, top: 500, display: 'flex', gap: 28}}>
        {shot.points.map((point, i) => (
          <div
            key={point}
            style={{
              flex: 1,
              height: 310,
              boxSizing: 'border-box',
              padding: 40,
              borderRadius: 25,
              border: '1px solid #7bdedb50',
              background: 'linear-gradient(145deg, #2e668072, #193b5677)',
              boxShadow: '0 20px 50px #05182766',
              opacity: appear(frame, 7 + i * 9),
              transform: 'translateY(' + rise(frame, 7 + i * 9) + 'px)',
            }}
          >
            <div style={{fontSize: 26, color: accent, fontWeight: 800, marginBottom: 55}}>
              0{i + 1}
            </div>
            <div style={{fontSize: 38, lineHeight: 1.2, fontWeight: 700}}>{point}</div>
          </div>
        ))}
      </div>
    </ShotBackground>
  );
};

export const OutroScene = ({shot}: {shot: OutroShot}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <ShotBackground>
      <div
        style={{
          position: 'absolute',
          left: width / 2 - 420,
          top: height / 2 - 420,
          width: 840,
          height: 840,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #47d6cd28, transparent 67%)',
        }}
      />
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: 70, color: accent, marginBottom: 32, opacity: appear(frame, 2)}}>◈</div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -5,
            textAlign: 'center',
            opacity: appear(frame, 8),
            transform: 'translateY(' + rise(frame, 8) + 'px)',
          }}
        >
          {shot.title}
        </div>
        {shot.subtitle && (
          <div style={{fontSize: 31, color: muted, marginTop: 26, opacity: appear(frame, 18)}}>
            {shot.subtitle}
          </div>
        )}
        <div style={{width: 100, height: 7, borderRadius: 5, background: accent, marginTop: 55}} />
      </div>
    </ShotBackground>
  );
};