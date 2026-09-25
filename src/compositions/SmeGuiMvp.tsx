import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Sequence, staticFile} from 'remotion';
import {smeGuiMedia, smeGuiShots, type SmeGuiShot} from '../lib/sme-gui-plan';

const ScreenrecordingShot = ({shot}: {shot: SmeGuiShot}) => (
  <Video
    src={staticFile(smeGuiMedia[shot.source])}
    trimBefore={shot.sourceIn}
    trimAfter={shot.sourceOut}
    playbackRate={(shot.sourceOut - shot.sourceIn) / shot.duration}
    muted
    // Remove the old recording's browser/surround. The remaining 2304×1296
    // region is 16:9; no stretching or reconstruction of the actual product UI.
    objectFit="contain"
    style={shot.source === 'old'
      ? {position: 'absolute', width: 2442 * (1920 / 2304), height: 1672 * (1920 / 2304), left: -70 * (1920 / 2304), top: -226 * (1920 / 2304)}
      : {width: '100%', height: '100%'}}
  />
);

export const SmeGuiMvp = () => (
  <AbsoluteFill style={{backgroundColor: '#ffffff', overflow: 'hidden'}}>
    {smeGuiShots.map((shot) => (
      <Sequence key={shot.id} name={`${shot.id} · ${shot.name}`} from={shot.from} durationInFrames={shot.duration}>
        <ScreenrecordingShot shot={shot} />
      </Sequence>
    ))}
    {/* The mono WAV is normalized to -16 LUFS. Compensate for Remotion's
        dual-mono stereo export so the delivered programme stays at that level. */}
    <Audio name="Original narrator · level adjusted" src={staticFile(smeGuiMedia.narration)} volume={Math.SQRT1_2} />
  </AbsoluteFill>
);
