import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Sequence, Audio, staticFile } from 'remotion';

const LayersStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const shake = interpolate(Math.sin(frame * 0.3), [-1, 1], [-3, 3]);
  const fogMove = interpolate(Math.sin(frame * 0.05), [-1, 1], [0, 100]);
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.95, 1.05]);
  const slide = interpolate(frame, [0, 60], [100, 0], { extrapolateRight: 'clamp' });

  const renderTrees = (count: number, baseHeight: string, color: string, offset: number) => {
    const trees = [];
    for (let i = 0; i < count; i++) {
      const left = (i / count) * 100;
      const height = 150 + Math.random() * 100;
      const skew = -20 + Math.random() * 40;
      trees.push(
        <div key={i} style={{
          position: 'absolute',
          bottom: baseHeight,
          left: `${left}%`,
          width: 0,
          height: 0,
          borderLeft: `${20 + Math.random() * 20}px solid transparent`,
          borderRight: `${20 + Math.random() * 20}px solid transparent`,
          borderBottom: `${height}px solid ${color}`,
          transform: `skewX(${skew}deg)`,
          opacity: 0.6 + Math.random() * 0.4,
        }} />
      );
    }
    return trees;
  };

  const renderLeaves = (count: number) => {
    const leaves = [];
    for (let i = 0; i < count; i++) {
      leaves.push(
        <div key={i} style={{
          position: 'absolute',
          width: 80 + Math.random() * 60,
          height: 80 + Math.random() * 60,
          borderRadius: '0 50% 0 50%',
          background: `linear-gradient(135deg, #228B22 ${Math.random() * 30}%, #006400)`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: 0.3 + Math.random() * 0.5,
        }} />
      );
    }
    return leaves;
  };

  const renderFireParticles = () => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      const delay = i * 10;
      const y = interpolate(Math.max(0, frame - delay), [0, 60], [100, -20], { extrapolateRight: 'clamp' });
      particles.push(
        <div key={i} style={{
          position: 'absolute',
          bottom: 0,
          left: `${5 + i * 6}%`,
          width: 20,
          height: 40,
          background: `linear-gradient(to top, #ff4500, #ff8c00, transparent)`,
          borderRadius: '50% 50% 20% 20%',
          opacity: 0.8,
          transform: `translateY(${y}px)`,
        }} />
      );
    }
    return particles;
  };

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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a00 30%, #2d1a0a 70%, #1a0500 100%)',
          }} />
          <div style={{
            position: 'absolute', top: '60%', left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(20,10,0,0.8) 100%)',
          }} />
          {renderTrees(20, '20%', '#0d1a0d', 0)}
          {renderTrees(15, '10%', '#1a3a1a', 50)}
          {renderTrees(10, '0%', '#2d4d2d', 100)}
          <div style={{
            position: 'absolute', top: 0, left: `${fogMove}%`, right: 0, bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(100,100,100,0.1), transparent)',
          }} />
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 80,
          }}>⚠️</div>
          <div style={{
            position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 56, fontWeight: 900, color: '#ff3333', textAlign: 'center',
            textShadow: '0 0 40px rgba(255,0,0,0.9), 0 0 80px rgba(255,0,0,0.5)',
            transform: `translateX(-50%) translateY(${shake}px) scale(${pulse})`,
          }}>
            90% COULD BE<br/>GONE IN 25 YEARS
          </div>
          <div style={{
            position: 'absolute', top: '55%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 26, color: '#ff6666', fontWeight: 'bold',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}>
            And it's happening faster than scientists predicted
          </div>
        </div>
      </Sequence>

      <Sequence from={120} duration={120}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: `${slide}%`,
            background: 'linear-gradient(180deg, #0d2d0d 0%, #1a4a1a 50%, #0d3d0d 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0, width: `${100 - slide}%`,
            background: 'linear-gradient(180deg, #3d1a0a 0%, #5a2d0a 50%, #3d1a0a 100%)',
          }} />
          {renderLeaves(30)}
          <div style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 100,
          }}>😱</div>
          <div style={{
            position: 'absolute', top: '45%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 40, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(255,100,0,0.3)',
          }}>
            BUT HERE'S WHAT'S<br/>EVEN SCARIER...
          </div>
        </div>
      </Sequence>

      <Sequence from={240} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(ellipse at center, #1a4a3a 0%, #0a2a1a 50%, #051510 100%)',
          }} />
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              bottom: -30,
              left: `${i * 5}%`,
              width: 30,
              height: 30 + Math.random() * 50,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              animation: `rise ${2 + Math.random()}s infinite`,
            }} />
          ))}
          <div style={{
            position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 130,
          }}>🌬️</div>
          <div style={{
            position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 48, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 0 20px rgba(100,200,255,0.8)',
          }}>20% OF EARTH'S OXYGEN</div>
          <div style={{
            position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 24, color: '#88ccff', letterSpacing: 3,
          }}>THE LUNGS OF OUR PLANET</div>
        </div>
      </Sequence>

      <Sequence from={315} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, #0d2d0d 0%, #1a4a1a 40%, #0d3d0d 100%)',
          }} />
          {renderTrees(25, '15%', '#1a3a1a', 0)}
          <div style={{
            position: 'absolute', top: '10%', left: '15%', width: 60, height: 40,
            background: '#000', borderRadius: '30% 30% 50% 50%',
          }} />
          <div style={{
            position: 'absolute', top: '12%', left: '17%', width: 20, height: 8,
            background: '#ffcc00', borderRadius: '50%',
            boxShadow: '0 0 20px #ffcc00',
          }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
              fontSize: 40,
            }}>🦜</div>
          ))}
          <div style={{
            position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 48, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 0 20px rgba(0,255,0,0.6)',
          }}>10% OF ALL SPECIES</div>
          <div style={{
            position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 22, color: '#88ff88',
          }}>Live in the Amazon Rainforest</div>
        </div>
      </Sequence>

      <Sequence from={390} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, #3d1a0a 0%, #5a2d0a 50%, #2d1a0a 100%)',
          }} />
          {renderFireParticles()}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '60%',
            background: 'linear-gradient(180deg, rgba(50,20,0,0.8) 0%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 130, filter: 'drop-shadow(0 0 30px rgba(255,100,0,0.8))',
          }}>🔥</div>
          <div style={{
            position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 48, fontWeight: 'bold', color: '#ff4444', textAlign: 'center',
            textShadow: '0 0 30px rgba(255,0,0,0.8)',
          }}>17% ALREADY GONE</div>
          <div style={{
            position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 22, color: '#ff8888',
          }}>In just 50 years</div>
        </div>
      </Sequence>

      <Sequence from={465} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, #1a0d0d 0%, #2d1a1a 50%, #0d0505 100%)',
          }} />
          <div style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            width: 150, height: 150,
            border: '8px solid #ff4444',
            borderRadius: '50%',
            animation: 'pulse 1s infinite',
          }} />
          <div style={{
            position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 100,
          }}>⏱️</div>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 36, fontWeight: 'bold', color: '#ff6666', textAlign: 'center',
          }}>EVERY SECOND</div>
          <div style={{
            position: 'absolute', top: '65%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 28, color: '#fff', textAlign: 'center',
          }}>A forest the size of a<br/>football field is cut down</div>
        </div>
      </Sequence>

      <Sequence from={540} duration={210}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, #0d4d0d 0%, #1a7a1a 30%, #0d5d0d 70%, #1a5a1a 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(ellipse at 50% 100%, rgba(100,255,100,0.2) 0%, transparent 60%)',
          }} />
          {[...Array(15)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              bottom: 0,
              left: `${i * 7}%`,
              width: 4,
              height: 30 + Math.random() * 20,
              background: '#228B22',
            }} />
          ))}
          <div style={{
            position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 110, filter: 'drop-shadow(0 0 20px rgba(0,255,0,0.6))',
          }}>🌱</div>
          <div style={{
            position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 40, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}>BUT IT'S NOT<br/>TOO LATE</div>
          <div style={{
            position: 'absolute', top: '55%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 28, color: '#88ff88', textAlign: 'center',
          }}>Follow for more<br/>Save this and share</div>
          <div style={{
            position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 28, color: '#fff',
          }}>#amazon #rainforest #environment</div>
        </div>
      </Sequence>

      <Sequence from={690} duration={60}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, #0d3d0d 0%, #1a5a1a 50%, #0d4d0d 100%)',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            fontSize: 56, fontWeight: 'bold', color: '#fff',
            textShadow: '0 0 30px rgba(255,255,255,0.6)',
          }}>@opencode</div>
          <div style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translateX(-50%)', fontSize: 36, color: '#88ff88' }}>💚</div>
          <div style={{ position: 'absolute', top: '72%', left: '50%', transform: 'translateX(-50%)', fontSize: 28, color: '#aaa' }}>Subscribe</div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export { LayersStyle };
