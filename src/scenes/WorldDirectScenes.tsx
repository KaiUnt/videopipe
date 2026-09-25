import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import definition from '../../brand/world-direct/brand.json';
import {BrandHeadline, BrandLogo, BrandText} from '../components/Brand';

const {palette, images} = definition;
const enter = (frame: number, start = 0, duration = 22) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

export const WorldDirectIntro = () => {
  const frame = useCurrentFrame();
  const headline = enter(frame, 6);
  const subtitle = enter(frame, 16);

  return (
    <AbsoluteFill style={{background: palette.white, color: palette.blue1}}>
      <Img src={staticFile(images.polygonSide)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <div style={{position: 'absolute', left: 760, top: 240, opacity: enter(frame, 0, 15)}}>
        <BrandLogo style={{width: 650, height: 140, objectPosition: 'left center'}} />
      </div>
      <div style={{position: 'absolute', left: 760, top: 446, width: 1064}}>
        <BrandHeadline style={{
          fontSize: 112, lineHeight: 1.16, letterSpacing: -1.3,
          opacity: headline, transform: `translateY(${(1 - headline) * 28}px)`,
        }}>
          Ihre digitale<br />Zukunft.
        </BrandHeadline>
        <BrandText style={{
          fontSize: 44, lineHeight: 1.35, marginTop: 30, color: palette.ink,
          opacity: subtitle, transform: `translateY(${(1 - subtitle) * 18}px)`,
        }}>
          Einfach im Blick.
        </BrandText>
      </div>
    </AbsoluteFill>
  );
};

export const WorldDirectOverview = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: palette.white, color: palette.blue1}}>
      <div style={{position: 'absolute', left: 96, top: 132, opacity: enter(frame, 0)}}>
        <BrandLogo variant="icon" style={{width: 310, height: 128}} />
      </div>
      <BrandText style={{position: 'absolute', right: 96, top: 163, fontSize: 26, color: palette.ink, opacity: enter(frame, 5)}}>
        Ihre digitale Zukunft.
      </BrandText>
      <div style={{position: 'absolute', left: 96, top: 416, right: 96, display: 'flex'}}>
        {['Klar.', 'Verbunden.', 'Für Sie.'].map((word, i) => {
          const reveal = enter(frame, 10 + i * 12, 24);
          return (
            <div key={word} style={{width: 576, boxSizing: 'border-box', paddingLeft: i === 0 ? 0 : 48}}>
              <BrandText style={{fontSize: 24, color: palette.ink, opacity: reveal, marginBottom: 36}}>
                0{i + 1}
              </BrandText>
              <BrandHeadline style={{fontSize: 92, lineHeight: 1.2, opacity: reveal, transform: `translateY(${(1 - reveal) * 24}px)`}}>
                {word}
              </BrandHeadline>
              <div style={{marginTop: 56, width: 462, height: 2, background: palette.gray2}}>
                <div style={{height: '100%', width: `${reveal * 100}%`, background: palette.blue1}} />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 96, top: 814, width: 11, height: 11, background: palette.green, opacity: enter(frame, 46)}} />
    </AbsoluteFill>
  );
};

export const WorldDirectOutro = () => {
  const frame = useCurrentFrame();
  const headline = enter(frame, 3, 20);
  return (
    <AbsoluteFill style={{background: palette.white, color: palette.blue1}}>
      <Img src={staticFile(images.polygonSide)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <div style={{position: 'absolute', left: 800, top: 240, width: 1024}}>
        <BrandLogo style={{width: 840, height: 180, objectPosition: 'left center', opacity: enter(frame, 0, 15)}} />
        <BrandHeadline style={{
          marginTop: 88, fontSize: 82, lineHeight: 1.22, letterSpacing: -0.6,
          opacity: headline, transform: `translateY(${(1 - headline) * 20}px)`,
        }}>
          Gestalten wir Ihre<br />digitale Zukunft.
        </BrandHeadline>
      </div>
    </AbsoluteFill>
  );
};
