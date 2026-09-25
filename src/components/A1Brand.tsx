import {loadFont} from '@remotion/fonts';
import type {CSSProperties, PropsWithChildren} from 'react';
import {Easing, Img, interpolate, staticFile} from 'remotion';
import definition from '../../brand/a1/brand.json';

export const a1 = definition;
export const a1Palette = a1.palette;

// Each face has its own real file and weight; loadFont waits before rendering.
for (const font of a1.fonts.faces) {
  void loadFont({
    family: font.family,
    url: staticFile(font.path),
    weight: font.weight,
    style: font.style,
  });
}

type TextProps = PropsWithChildren<{style?: CSSProperties}>;

export const A1Headline = ({children, style}: TextProps) => (
  <div style={{
    fontFamily: `"${a1.fonts.headline.family}", Georgia, serif`,
    fontWeight: Number(a1.fonts.headline.weight),
    fontSynthesis: 'none',
    ...style,
  }}>{children}</div>
);

export const A1Text = ({children, style, bold = false}: TextProps & {bold?: boolean}) => (
  <div style={{
    fontFamily: `"${a1.fonts.body.family}", ${a1.fonts.fallback}`,
    fontWeight: Number(bold ? a1.fonts.emphasis.weight : a1.fonts.body.weight),
    fontSynthesis: 'none',
    ...style,
  }}>{children}</div>
);

export const A1Logo = ({variant = 'primary', style}: {
  variant?: keyof typeof a1.logos;
  style?: CSSProperties;
}) => (
  <Img src={staticFile(a1.logos[variant])} alt="A1" style={{display: 'block', ...style, objectFit: 'contain'}} />
);

export const a1Enter = (frame: number, start = 0, duration = 20) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
