import {Audio, Video} from '@remotion/media';
import {Img, staticFile} from 'remotion';
import type {MediaAsset} from '../lib/shots';

export const mediaUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return staticFile(path.replace(/\\/g, '/').replace(/^\/+/, ''));
};

export const AssetMedia = ({
  asset,
  defaultVolume = 1,
}: {
  asset: MediaAsset;
  defaultVolume?: number;
}) => {
  const src = mediaUrl(asset.path);
  const fit = asset.fit ?? 'contain';
  const style = {width: '100%', height: '100%'};

  if (asset.type === 'image') {
    return <Img src={src} style={{...style, objectFit: fit}} />;
  }

  return (
    <Video
      src={src}
      trimBefore={asset.trimBefore ?? 0}
      volume={asset.volume ?? defaultVolume}
      objectFit={fit}
      style={style}
    />
  );
};

export const Soundtrack = ({
  path,
  volume = 0.5,
}: {
  path: string;
  volume?: number;
}) => <Audio src={mediaUrl(path)} volume={volume} />;