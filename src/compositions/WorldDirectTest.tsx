import type {ComponentType} from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import definition from '../../brand/world-direct/brand.json';
import {BrandText} from '../components/Brand';
import {WorldDirectIntro, WorldDirectOutro, WorldDirectOverview} from '../scenes/WorldDirectScenes';
import {WorldDirectPortal} from '../scenes/WorldDirectPortal';

// The four independent shots follow the approved plan, with brief dissolves at cuts.
export const worldDirectTestShots = [
  {id: 'wd-test-01-intro', from: 0, duration: 120, component: WorldDirectIntro},
  {id: 'wd-test-02-portal', from: 120, duration: 150, component: WorldDirectPortal},
  {id: 'wd-test-03-overview', from: 270, duration: 120, component: WorldDirectOverview},
  {id: 'wd-test-04-outro', from: 390, duration: 90, component: WorldDirectOutro},
] as const;

export const worldDirectTestDuration = worldDirectTestShots.reduce((total, shot) => total + shot.duration, 0);
const dissolve = 10;

const ShotLayer = ({component: Component, first}: {component: ComponentType; first: boolean}) => {
  const frame = useCurrentFrame();
  // Outgoing shot stays opaque underneath until the incoming shot fully covers it.
  const opacity = first ? 1 : interpolate(frame, [0, dissolve], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity}}><Component /></AbsoluteFill>;
};

export const WorldDirectTest = () => {
  const frame = useCurrentFrame();
  const current = worldDirectTestShots.filter((shot) => frame >= shot.from).length - 1;
  return (
    <AbsoluteFill style={{background: definition.palette.white}}>
      {worldDirectTestShots.map((shot, index) => (
        <Sequence
          key={shot.id}
          name={shot.id}
          from={shot.from}
          durationInFrames={shot.duration + (index < worldDirectTestShots.length - 1 ? dissolve : 0)}
        >
          <ShotLayer component={shot.component} first={index === 0} />
        </Sequence>
      ))}
      <div style={{position: 'absolute', left: 96, right: 96, bottom: 40, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <BrandText style={{fontSize: 23, lineHeight: 1.2, color: definition.palette.ink, background: definition.palette.white, padding: '7px 12px'}}>
          Fiktive Demo
        </BrandText>
        <BrandText style={{fontSize: 23, lineHeight: 1.2, color: definition.palette.ink, background: definition.palette.white, padding: '7px 12px'}}>
          0{current + 1} / 04
        </BrandText>
      </div>
    </AbsoluteFill>
  );
};
