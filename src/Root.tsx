import {Composition, Still, type CalculateMetadataFunction} from 'remotion';
import {A1Test, a1TestDuration} from './compositions/A1Test';
import {BrandKit} from './compositions/BrandKit';
import {StudioFilm} from './compositions/StudioFilm';
import {SmeGuiMvp} from './compositions/SmeGuiMvp';
import {WorldDirectTest, worldDirectTestDuration} from './compositions/WorldDirectTest';
import {demoPlan} from './lib/demo-plan';
import {totalDuration, type StudioVideoProps} from './lib/shots';
import {smeGuiDuration, smeGuiFps} from './lib/sme-gui-plan';

const calculateMetadata: CalculateMetadataFunction<StudioVideoProps> = ({props}) => ({
  durationInFrames: totalDuration(props.shots),
});

export const Root = () => (
  <>
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
    <Still id="WorldDirectBrandKit" component={BrandKit} width={1920} height={1440} />
    <Composition id="WorldDirectTest" component={WorldDirectTest} width={1920} height={1080} fps={30} durationInFrames={worldDirectTestDuration} />
    <Composition id="A1Test" component={A1Test} width={1920} height={1080} fps={30} durationInFrames={a1TestDuration} />
    <Composition id="SmeGuiMvp" component={SmeGuiMvp} width={1920} height={1080} fps={smeGuiFps} durationInFrames={smeGuiDuration} />
  </>
);
