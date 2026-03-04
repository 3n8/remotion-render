import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Sequence, Audio, staticFile } from 'remotion';

const ShortVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shake = interpolate(Math.sin(frame * 0.3), [-1, 1], [-3, 3]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <Sequence from={0} duration={120}>
        <Audio src={staticFile('assets/chunk1.mp3')} />
      </Sequence>
      <Sequence from={120} duration={120}>
        <Audio src={staticFile('assets/chunk2.mp3')} />
      </Sequence>
      <Sequence from={240} duration={300}>
        <Audio src={staticFile('assets/chunk3.mp3')} />
      </Sequence>
      <Sequence from={540} duration={210}>
        <Audio src={staticFile('assets/chunk4.mp3')} />
      </Sequence>

      <Sequence from={0} duration={120}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #1a0a00 0%, #3d1a0a 50%, #1a0500 100%)',
        }}>
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 80,
          }}>⚠️</div>
          <div style={{
            position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 60, fontWeight: 900, color: '#ff3333', textAlign: 'center',
            textShadow: '0 0 30px rgba(255,0,0,0.8)',
            transform: `translateX(-50%) translateY(${shake}px)`,
          }}>
            90% COULD BE<br/>GONE IN 25 YEARS
          </div>
          <div style={{
            position: 'absolute', top: '55%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 28, color: '#ff6666', fontWeight: 'bold',
          }}>
            And it's happening faster than scientists predicted
          </div>
        </div>
      </Sequence>

      <Sequence from={120} duration={120}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(90deg, #1d4d1d 0%, #8b4513 50%, #3d1a0a 100%)',
        }}>
          <div style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 100,
          }}>😱</div>
          <div style={{
            position: 'absolute', top: '45%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 44, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}>
            BUT HERE'S WHAT'S<br/>EVEN SCARIER...
          </div>
        </div>
      </Sequence>

      <Sequence from={240} duration={75}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #0d1f0d 0%, #1a3a1a 100%)',
        }}>
          <div style={{
            position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 120,
          }}>🌬️</div>
          <div style={{
            position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 50, fontWeight: 'bold', color: '#fff',
          }}>20% OF EARTH'S OXYGEN</div>
        </div>
      </Sequence>

      <Sequence from={315} duration={75}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #1a2d1a 0%, #0f200f 100%)',
        }}>
          <div style={{
            position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 120,
          }}>🦜</div>
          <div style={{
            position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 50, fontWeight: 'bold', color: '#fff',
          }}>10% OF ALL SPECIES</div>
          <div style={{
            position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 28, color: '#88ff88',
          }}>Live in the Amazon</div>
        </div>
      </Sequence>

      <Sequence from={390} duration={75}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #2d1a1a 0%, #1a0d0d 100%)',
        }}>
          <div style={{
            position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 120,
          }}>🔥</div>
          <div style={{
            position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 50, fontWeight: 'bold', color: '#ff4444',
          }}>17% ALREADY GONE</div>
          <div style={{
            position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 28, color: '#ff8888',
          }}>In just 50 years</div>
        </div>
      </Sequence>

      <Sequence from={465} duration={75}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #1a0d0d 0%, #0d0505 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontSize: 100 }}>⏱️</div>
          <div style={{
            fontSize: 40, fontWeight: 'bold', color: '#ff6666',
            textAlign: 'center', marginTop: 20,
          }}>EVERY SECOND</div>
          <div style={{
            fontSize: 32, color: '#fff',
            textAlign: 'center', marginTop: 10,
          }}>A forest the size of a<br/>football field is cut down</div>
        </div>
      </Sequence>

      <Sequence from={540} duration={210}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #0d3d0d 0%, #1a5a1a 50%, #0d4d0d 100%)',
        }}>
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 100,
          }}>🌱</div>
          <div style={{
            position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 42, fontWeight: 'bold', color: '#fff', textAlign: 'center',
          }}>BUT IT'S NOT<br/>TOO LATE</div>
          <div style={{
            position: 'absolute', top: '55%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 32, color: '#88ff88', textAlign: 'center',
          }}>Follow for more<br/>Save this and share</div>
          <div style={{
            position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 32, color: '#fff',
          }}>#amazon #rainforest #environment</div>
        </div>
      </Sequence>

      <Sequence from={690} duration={60}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #0d3d0d 0%, #1a5a1a 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 60, fontWeight: 'bold', color: '#fff',
            textShadow: '0 0 20px rgba(255,255,255,0.5)',
          }}>@opencode</div>
          <div style={{ fontSize: 40, color: '#88ff88', marginTop: 20 }}>💚</div>
          <div style={{ fontSize: 32, color: '#aaa', marginTop: 10 }}>Subscribe</div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export { ShortVideo };
