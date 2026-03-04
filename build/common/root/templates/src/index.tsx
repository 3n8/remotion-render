import { registerRoot, Composition } from 'remotion';
import { Hello } from './Hello';
import { ShortVideo } from './YouTubeShort';
import { LayersStyle } from './YouTubeShort_Layers';
import { SVGStyle } from './YouTubeShort_SVG';

registerRoot(() => (
  <>
    <Composition
      id="Hello"
      component={Hello}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="YouTubeShort_Basic"
      component={ShortVideo}
      durationInFrames={750}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="YouTubeShort_Layers"
      component={LayersStyle}
      durationInFrames={750}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="YouTubeShort_SVG"
      component={SVGStyle}
      durationInFrames={750}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
));
