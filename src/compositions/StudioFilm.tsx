import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {Soundtrack} from '../components/AssetMedia';
import {brandColors} from '../components/Brand';
import type {Shot, StudioVideoProps} from '../lib/shots';
import {totalDuration} from '../lib/shots';
import {
  FeatureScene,
  MediaScene,
  MockupScene,
  OutroScene,
  TitleScene,
} from '../scenes/Shots';

const ShotContent = ({shot}: {shot: Shot}) => {
  switch (shot.kind) {
    case 'title':
      return <TitleScene shot={shot} />;
    case 'mockup':
      return <MockupScene shot={shot} />;
    case 'media':
      return <MediaScene shot={shot} />;
    case 'feature':
      return <FeatureScene shot={shot} />;
    case 'outro':
      return <OutroScene shot={shot} />;
  }
};

export const StudioFilm = ({shots, soundtrack}: StudioVideoProps) => {
  const duration = totalDuration(shots);
  const frame = useCurrentFrame();
  const fadeFrames = 12;
  const curtainOpacity = interpolate(
    frame,
    [0, fadeFrames, duration - fadeFrames - 1, duration - 1],
    [1, 0, 0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  let cursor = 0;

  return (
    <AbsoluteFill style={{backgroundColor: brandColors.background ?? '#08192d'}}>
      {shots.map((shot) => {
        const from = cursor;
        cursor += shot.durationInFrames;
        return (
          <Sequence
            key={shot.id}
            from={from}
            durationInFrames={shot.durationInFrames}
            name={shot.id}
          >
            <ShotContent shot={shot} />
          </Sequence>
        );
      })}
      {soundtrack && <Soundtrack path={soundtrack.path} volume={soundtrack.volume} />}
      <AbsoluteFill
        style={{
          backgroundColor: brandColors.background ?? '#08192d',
          opacity: curtainOpacity,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};