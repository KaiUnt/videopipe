import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Freeze, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {A1Headline, A1Logo, A1Text, a1Enter, a1Palette} from '../components/A1Brand';
import {smeGuiContentDuration, smeGuiIntroDuration, smeGuiMedia, smeGuiOutroDuration, smeGuiShots, smeGuiV3ContentDuration, smeGuiV3Shots, type SmeGuiShot} from '../lib/sme-gui-plan';

type SmeGuiMvpProps = {
  narration?: 'narration' | 'narrationMvpV2' | 'narrationV3';
  shots?: SmeGuiShot[];
  contentDuration?: number;
};

export const IntroScreen = () => {
  const frame = useCurrentFrame();
  const enter = a1Enter(frame, 4, 24);

  return (
    <AbsoluteFill style={{backgroundColor: a1Palette.white, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{opacity: enter, transform: `translateY(${(1 - enter) * 18}px)`, textAlign: 'center'}}>
        <A1Logo style={{width: 176, margin: '0 auto 74px'}} />
        <A1Headline style={{fontSize: 92, lineHeight: 1, color: a1Palette.black, marginBottom: 24, letterSpacing: 0}}>
          SME-GUI
        </A1Headline>
        <A1Text bold style={{fontSize: 38, lineHeight: 1.16, color: a1Palette.red, letterSpacing: 0}}>
          Network Management<br />Made Simple
        </A1Text>
      </div>
    </AbsoluteFill>
  );
};

export const ScreenrecordingVideo = ({shot}: {shot: SmeGuiShot}) => (
  <Video
    src={staticFile(smeGuiMedia[shot.source])}
    trimBefore={shot.sourceIn}
    trimAfter={shot.sourceOut}
    playbackRate={(shot.sourceOut - shot.sourceIn) / shot.duration}
    muted
    // Remove the old recording's browser/surround. The remaining 2304x1296
    // region is 16:9; the initial scroll reveals the clipped table columns.
    objectFit="contain"
    style={shot.source === 'old'
      ? {position: 'absolute', width: 2442 * (1920 / 2304), height: 1672 * (1920 / 2304), left: -70 * (1920 / 2304), top: -226 * (1920 / 2304)}
      : {width: '100%', height: '100%'}}
  />
);

const ScreenrecordingShot = ({shot}: {shot: SmeGuiShot}) => (
  <>
    <ScreenrecordingVideo shot={shot} />
    {shot.freezeFrom === undefined ? null : (
      <Sequence from={shot.freezeFrom} durationInFrames={shot.duration - shot.freezeFrom}>
        <Freeze frame={shot.freezeFrom}>
          <ScreenrecordingVideo shot={shot} />
        </Freeze>
      </Sequence>
    )}
  </>
);

export const SmeGuiMvp = ({narration = 'narration', shots = smeGuiShots, contentDuration = smeGuiContentDuration}: SmeGuiMvpProps) => (
  <AbsoluteFill style={{backgroundColor: '#ffffff', overflow: 'hidden'}}>
    <Sequence name="Intro · A1 SME-GUI" from={0} durationInFrames={smeGuiIntroDuration}>
      <IntroScreen />
    </Sequence>
    {shots.map((shot) => (
      <Sequence key={shot.id} name={`${shot.id} · ${shot.name}`} from={shot.from} durationInFrames={shot.duration}>
        <ScreenrecordingShot shot={shot} />
      </Sequence>
    ))}
    <Sequence name="Outro · A1 SME-GUI" from={contentDuration} durationInFrames={smeGuiOutroDuration}>
      <IntroScreen />
    </Sequence>
    {/* The mono WAV is normalized to -16 LUFS. Compensate for Remotion's
        dual-mono stereo export so the delivered programme stays at that level. */}
    <Sequence name="Narration" from={smeGuiIntroDuration}>
      <Audio name="Original narrator · level adjusted" src={staticFile(smeGuiMedia[narration])} volume={Math.SQRT1_2} />
    </Sequence>
  </AbsoluteFill>
);

export const SmeGuiMvpV2 = () => <SmeGuiMvp narration="narrationMvpV2" />;

export const SmeGuiMvpV3 = () => <SmeGuiMvp narration="narrationV3" shots={smeGuiV3Shots} contentDuration={smeGuiV3ContentDuration} />;
