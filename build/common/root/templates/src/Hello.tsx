import { AbsoluteFill, useVideoConfig, spring, useCurrentFrame } from 'remotion';

export const Hello: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          transform: `scale(${scale})`,
        }}
      >
        Hello World
      </div>
      <div
        style={{
          fontSize: 30,
          color: '#4a4a6a',
          marginTop: 20,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Rendered with Remotion
      </div>
    </AbsoluteFill>
  );
};
