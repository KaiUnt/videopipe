import {Composition, type CalculateMetadataFunction} from 'remotion';
import {StudioFilm} from './compositions/StudioFilm';
import {demoPlan} from './lib/demo-plan';
import {totalDuration, type StudioVideoProps} from './lib/shots';

const calculateMetadata: CalculateMetadataFunction<StudioVideoProps> = ({props}) => ({
  durationInFrames: totalDuration(props.shots),
});

export const Root = () => (
  <Composition
    id="StudioDemo"
    component={StudioFilm}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={totalDuration(demoPlan.shots)}
    defaultProps={demoPlan}
    calculateMetadata={calculateMetadata}
  />
);