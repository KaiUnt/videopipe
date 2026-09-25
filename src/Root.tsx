import {Composition, Still, type CalculateMetadataFunction} from 'remotion';
import {A1Test, a1TestDuration} from './compositions/A1Test';
import {BrandKit} from './compositions/BrandKit';
import {StudioFilm} from './compositions/StudioFilm';
import {SmeGuiMvp, SmeGuiMvpV2, SmeGuiMvpV3} from './compositions/SmeGuiMvp';
import {SmeGuiStory} from './compositions/SmeGuiStory';
import {WorldDirectTest, worldDirectTestDuration} from './compositions/WorldDirectTest';
import {demoPlan} from './lib/demo-plan';
import {totalDuration, type StudioVideoProps} from './lib/shots';
import {smeGuiDuration, smeGuiFps, smeGuiV3Duration} from './lib/sme-gui-plan';
import {smeGuiStoryDuration, smeGuiStoryFps} from './lib/sme-gui-story-plan';

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
    <Composition id="SmeGuiMvpV2" component={SmeGuiMvpV2} width={1920} height={1080} fps={smeGuiFps} durationInFrames={smeGuiDuration} />
    <Composition id="SmeGuiMvpV3" component={SmeGuiMvpV3} width={1920} height={1080} fps={smeGuiFps} durationInFrames={smeGuiV3Duration} />
    <Composition id="SmeGuiStory" component={SmeGuiStory} width={1920} height={1080} fps={smeGuiStoryFps} durationInFrames={smeGuiStoryDuration} />
  </>
);
