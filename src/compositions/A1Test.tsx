import type {ComponentType} from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {a1Palette, A1Text} from '../components/A1Brand';
import {A1Intro, A1Outro, A1Overview} from '../scenes/A1Scenes';
import {A1Portal} from '../scenes/A1Portal';

export const a1TestShots = [
  {id: 'a1-test-01-intro', from: 0, duration: 120, component: A1Intro},
  {id: 'a1-test-02-portal', from: 120, duration: 150, component: A1Portal},
  {id: 'a1-test-03-overview', from: 270, duration: 120, component: A1Overview},
  {id: 'a1-test-04-outro', from: 390, duration: 90, component: A1Outro},
] as const;

export const a1TestDuration = a1TestShots.reduce((sum, shot) => sum + shot.duration, 0);
const dissolveFrames = 10;

const ShotLayer = ({component: Component, first}: {component: ComponentType; first: boolean}) => {
  const frame = useCurrentFrame();
  const opacity = first ? 1 : interpolate(frame, [0, dissolveFrames], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity}}><Component /></AbsoluteFill>;
};

export const A1Test = () => {
  const frame = useCurrentFrame();
  const current = a1TestShots.filter((shot) => frame >= shot.from).length - 1;
  // Switch after the dark closing background passes mid-gray during its dissolve.
  const footerColor = frame >= a1TestShots[3].from + 6
    ? a1Palette.white
    : frame >= a1TestShots[3].from ? a1Palette.black : a1Palette.copy;

  return (
    <AbsoluteFill style={{background: a1Palette.white}}>
      {a1TestShots.map((shot, index) => (
        <Sequence
          key={shot.id}
          name={shot.id}
          from={shot.from}
          durationInFrames={shot.duration + (index < a1TestShots.length - 1 ? dissolveFrames : 0)}
        >
          {/* Keep the outgoing image opaque underneath the incoming dissolve. */}
          <ShotLayer component={shot.component} first={index === 0} />
        </Sequence>
      ))}
      <div style={{position: 'absolute', left: 112, right: 112, bottom: 42, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: footerColor}}>
        <A1Text style={{fontSize: 23, lineHeight: 1.3}}>Fiktive Demo</A1Text>
        <A1Text style={{fontSize: 23, lineHeight: 1.3}}>0{current + 1} / 04</A1Text>
      </div>
    </AbsoluteFill>
  );
};
