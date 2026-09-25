import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {A1Headline, A1Logo, A1Text, a1Enter, a1Palette} from '../components/A1Brand';
import {smeGuiMedia} from '../lib/sme-gui-plan';
import {
  smeGuiStoryWipe,
  smeGuiStoryIntroDuration,
  smeGuiStoryShots,
  type StoryBrollShot,
  type StoryEndShot,
  type StoryScreenShot,
} from '../lib/sme-gui-story-plan';
import {IntroScreen, ScreenrecordingVideo} from './SmeGuiMvp';

const ease = Easing.bezier(0.22, 1, 0.36, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const ScreenShot = ({shot}: {shot: StoryScreenShot}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, shot.duration], [0, 1], {...clamp, easing: Easing.inOut(Easing.sin)});
  // Camera moves only scale the real recording; no UI content is redrawn.
  const scale = shot.zoom === 'overview-metrics'
    ? interpolate(frame, [18, shot.duration - 12], [1, 1.3], {...clamp, easing: Easing.inOut(Easing.cubic)})
    : shot.zoom === 'push-in' ? 1 + 0.04 * progress : 1;
  // Origin keeps the A1 header whole while the metric cards fill the frame.
  const origin = shot.zoom === 'overview-metrics' ? '952px 40px' : '50% 50%';
  const reveal = shot.reveal ? interpolate(frame, [0, 14], [0, 1], {...clamp, easing: ease}) : 1;
  // Old UI fades to grey and recedes before the red wipe to the new UI.
  const exit = shot.exit ? interpolate(frame, [shot.duration - 16, shot.duration], [0, 1], {...clamp, easing: Easing.in(Easing.quad)}) : 0;

  return (
    <AbsoluteFill style={{backgroundColor: a1Palette.white}}>
      <AbsoluteFill style={{
        opacity: reveal,
        transform: `scale(${scale * (0.94 + 0.06 * reveal) * (1 - 0.05 * exit)})`,
        transformOrigin: origin,
        filter: exit > 0 ? `grayscale(${exit}) blur(${exit * 6}px)` : undefined,
      }}>
        {shot.segments ? shot.segments.map((segment, index) => {
          const from = shot.segments!.slice(0, index).reduce((sum, item) => sum + item.frames, 0);
          return (
            <Sequence key={index} from={from} durationInFrames={segment.frames}>
              <ScreenrecordingVideo shot={{...shot.shot, sourceIn: segment.sourceIn, sourceOut: segment.sourceOut, duration: segment.frames}} />
            </Sequence>
          );
        }) : <ScreenrecordingVideo shot={shot.shot} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Caption = ({text, at}: {text: string; at: number}) => {
  const frame = useCurrentFrame();
  const enter = a1Enter(frame, at, 12);
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end'}}>
      {/* A1 Main Interaction Red panel; it wipes in from the left, then the text follows. */}
      <div style={{
        position: 'relative', alignSelf: 'flex-start', margin: '0 0 96px 112px', padding: '38px 40px 40px',
        // Interaction red #B90A05 at 82 % so the image shows through slightly.
        backgroundColor: 'rgba(185, 10, 5, 0.82)', clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
      }}>
        <A1Text bold style={{
          fontSize: 64, lineHeight: 1.1, color: a1Palette.white, letterSpacing: 0,
          opacity: a1Enter(frame, at + 4, 10), transform: `translateX(${(1 - a1Enter(frame, at + 4, 10)) * -16}px)`,
        }}>
          {text}
        </A1Text>
      </div>
    </AbsoluteFill>
  );
};

// Large crossed-out WiFi symbol in A1 red on a light disc: makes the outage readable.
const WifiOffIcon = ({x, y, at}: {x: number; y: number; at: number}) => {
  const frame = useCurrentFrame();
  const pop = interpolate(frame - at, [0, 8, 13], [0, 1.08, 1], {...clamp, easing: Easing.out(Easing.quad)});
  // The whole icon blinks three times, like a dropping signal.
  const blink = frame - at > 16 && frame - at < 40 && Math.floor((frame - at - 16) / 4) % 2 === 0 ? 0.2 : 1;
  const arc = (r: number) => `M ${50 - r * 0.7071} ${74 - r * 0.7071} A ${r} ${r} 0 0 1 ${50 + r * 0.7071} ${74 - r * 0.7071}`;
  const size = 380;
  const disc = 470;
  if (pop <= 0) return null;
  return (
    // Light, translucent disc so the red symbol reads on any part of the café.
    <div style={{
      position: 'absolute', left: x - disc / 2, top: y - disc / 2, width: disc, height: disc, borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
      transform: `scale(${pop})`, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
    <svg viewBox="0 0 100 100" width={size} height={size} style={{opacity: blink, overflow: 'visible'}}>
      <defs>
        {/* Transparent gap around the slash instead of a white outline. */}
        <mask id="wifi-off-gap" maskUnits="userSpaceOnUse" x={-10} y={-10} width={120} height={120}>
          <rect x={-10} y={-10} width={120} height={120} fill="white" />
          <line x1={20} y1={16} x2={82} y2={88} stroke="black" strokeWidth={17} strokeLinecap="round" />
        </mask>
      </defs>
      <g mask="url(#wifi-off-gap)">
        <g fill="none" stroke={a1Palette.red} strokeWidth={8.5} strokeLinecap="round">
          <path d={arc(44)} />
          <path d={arc(30)} />
          <path d={arc(16)} />
        </g>
        <circle cx={50} cy={74} r={6.5} fill={a1Palette.red} />
      </g>
      <line x1={20} y1={16} x2={82} y2={88} stroke={a1Palette.red} strokeWidth={8.5} strokeLinecap="round" />
    </svg>
    </div>
  );
};

const BrollShot = ({shot}: {shot: StoryBrollShot}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, shot.duration], [1.02, 1.07], clamp);
  return (
    <AbsoluteFill style={{backgroundColor: a1Palette.black}}>
      {shot.clip ? (
        <Video src={staticFile(shot.clip)} trimBefore={shot.clipIn ?? 0} muted objectFit="cover" style={{width: '100%', height: '100%'}} />
      ) : (
        // Placeholder until the approved clip exists: keyframe with a slow push.
        <Img src={staticFile(shot.still)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${drift})`}} />
      )}
      {shot.wifiOff ? <WifiOffIcon {...shot.wifiOff} /> : null}
      {shot.caption ? <Caption {...shot.caption} /> : null}
    </AbsoluteFill>
  );
};

const EndCard = ({shot}: {shot: StoryEndShot}) => {
  const frame = useCurrentFrame();
  const enter = a1Enter(frame, 0, 18);
  const claim = a1Enter(frame, shot.claimAt, 16);
  return (
    <AbsoluteFill style={{backgroundColor: a1Palette.white, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <div style={{opacity: enter, transform: `translateY(${(1 - enter) * 18}px)`}}>
          <A1Logo style={{width: 176, margin: '0 auto 74px'}} />
          <A1Headline style={{fontSize: 92, lineHeight: 1, color: a1Palette.black, marginBottom: 24, letterSpacing: 0}}>
            SME-GUI
          </A1Headline>
        </div>
        <A1Text bold style={{fontSize: 38, lineHeight: 1.16, color: a1Palette.red, letterSpacing: 0, opacity: claim, transform: `translateY(${(1 - claim) * 14}px)`}}>
          Network Management<br />Made Simple
        </A1Text>
      </div>
    </AbsoluteFill>
  );
};

// Skewed A1-red band that sweeps across and hides the cut. Used only for the
// old-to-new UI change; all other scene changes are hard cuts (user feedback 25.09.).
const RedWipe = ({cut}: {cut: number}) => {
  const frame = useCurrentFrame();
  // Band width is chosen so it covers the whole frame only for a few frames around the cut.
  const width = 2500;
  const left = interpolate(frame, [cut - 12, cut - 1, cut + 3, cut + 14], [-2700, -420, -200, 2100], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const band = (x: number, w: number, background: string) => (
    <div style={{position: 'absolute', top: -60, bottom: -60, left: x, width: w, transform: 'skewX(-18deg)', background}} />
  );
  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      {band(left - 300, 140, a1Palette.interactionRed)}
      {band(left, width, `linear-gradient(90deg, ${a1Palette.interactionRed} 0%, ${a1Palette.red} 10%, ${a1Palette.red} 90%, ${a1Palette.interactionRed} 100%)`)}
      {band(left + width - 26, 26, 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,240,234,0.85) 60%, rgba(255,255,255,0) 100%)')}
    </AbsoluteFill>
  );
};

export const SmeGuiStory = () => (
  <AbsoluteFill style={{backgroundColor: a1Palette.white, overflow: 'hidden'}}>
    <Sequence name="Intro · A1 SME-GUI" from={0} durationInFrames={smeGuiStoryIntroDuration}>
      <IntroScreen />
    </Sequence>
    {smeGuiStoryShots.map((shot) => (
      <Sequence key={shot.id} name={`${shot.id} · ${shot.name}`} from={shot.from} durationInFrames={shot.duration}>
        {shot.kind === 'screen' ? <ScreenShot shot={shot} /> : shot.kind === 'broll' ? <BrollShot shot={shot} /> : <EndCard shot={shot} />}
      </Sequence>
    ))}
    <Sequence name="Red wipe · old → new UI" from={smeGuiStoryWipe - 14} durationInFrames={32}>
      <RedWipe cut={14} />
    </Sequence>
    {/* Same level handling as the MVP: -16 LUFS mono WAV, dual-mono compensation. */}
    <Sequence name="Narration" from={smeGuiStoryIntroDuration}>
      <Audio name="Narrator v3" src={staticFile(smeGuiMedia.narrationV3)} volume={Math.SQRT1_2} />
    </Sequence>
  </AbsoluteFill>
);
