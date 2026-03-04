import { registerRoot, Composition } from 'remotion';
import { Hello } from './Hello';
import { ShortVideo } from './YouTubeShort';

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
      id="YouTubeShort"
      component={ShortVideo}
      durationInFrames={750}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
));
