import {loadFont} from '@remotion/fonts';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import definition from '../../brand/world-direct/brand.json';

type BrandFont = {
  family: string;
  path: string;
  weight?: string;
  style?: string;
};

type BrandConfig = {
  name?: string;
  colors?: {
    background?: string;
    text?: string;
    muted?: string;
    accent?: string;
  };
  palette?: Record<string, string>;
  fonts?: {
    headline?: BrandFont;
    body?: BrandFont;
    emphasis?: BrandFont;
    faces?: BrandFont[];
    fallback?: string;
    license?: string;
  };
  logos?: {
    primary?: string;
    inverse?: string;
    icon?: string;
    claim?: string;
    block?: string;
  };
  images?: Record<string, string>;
  references?: Record<string, {
    path: string;
    usage?: string;
    automaticUse?: boolean;
    note?: string;
  }>;
};

export const brand = definition as BrandConfig;
export const hasBrandConfiguration = Boolean(
  brand.name ||
  Object.keys(brand.colors ?? {}).length ||
  Object.keys(brand.fonts ?? {}).length ||
  Object.keys(brand.logos ?? {}).length ||
  Object.keys(brand.images ?? {}).length,
);

const loadedFonts = new Set<string>();
for (const font of [
  ...(brand.fonts?.faces ?? []),
  brand.fonts?.headline,
  brand.fonts?.body,
  brand.fonts?.emphasis,
]) {
  if (font?.family && font.path) {
    const key = JSON.stringify([font.family, font.path, font.weight, font.style]);
    if (loadedFonts.has(key)) continue;
    loadedFonts.add(key);
    void loadFont({family: font.family, url: staticFile(font.path), weight: font.weight, style: font.style});
  }
}

export const brandColors = {
  background: brand.colors?.background,
  text: brand.colors?.text ?? '#eaf8fa',
  muted: brand.colors?.muted ?? '#9fb8c5',
  accent: brand.colors?.accent ?? '#54dfd8',
};

type TextProps = React.PropsWithChildren<{style?: React.CSSProperties}>;

const fontStyle = (font?: BrandFont): React.CSSProperties => ({
  fontFamily: font?.family
    ? `"${font.family}", ${brand.fonts?.fallback ?? 'Arial, sans-serif'}`
    : undefined,
  fontWeight: font?.weight ? Number(font.weight) : undefined,
  fontStyle: font?.style,
  fontSynthesis: font ? 'none' : undefined,
});

export const BrandHeadline = ({children, style}: TextProps) => (
  <div style={{...fontStyle(brand.fonts?.headline), ...style}}>{children}</div>
);

export const BrandText = ({children, style}: TextProps) => (
  <div style={{...fontStyle(brand.fonts?.body), ...style}}>{children}</div>
);

export const BrandLogo = ({
  variant = 'primary',
  style,
}: {
  variant?: keyof NonNullable<BrandConfig['logos']>;
  style?: React.CSSProperties;
}) => {
  const path = brand.logos?.[variant];
  return path ? <Img src={staticFile(path)} alt={brand.name || 'Brand logo'} style={{objectFit: 'contain', ...style}} /> : null;
};

export const BrandBackground = ({
  children,
  image = brand.images?.background,
  style,
}: React.PropsWithChildren<{image?: string | null; style?: React.CSSProperties}>) => (
  <AbsoluteFill
    style={{
      background: brandColors.background ?? (image ? 'transparent' : 'radial-gradient(circle at 72% 25%, #20506c 0%, #0e2944 36%, #08192d 78%)'),
      color: brandColors.text,
      ...fontStyle(brand.fonts?.body),
      fontFamily: fontStyle(brand.fonts?.body).fontFamily ?? 'Arial, Helvetica, sans-serif',
      overflow: 'hidden',
      ...style,
    }}
  >
    {image && (
      <Img src={staticFile(image)} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
    )}
    {children}
  </AbsoluteFill>
);
