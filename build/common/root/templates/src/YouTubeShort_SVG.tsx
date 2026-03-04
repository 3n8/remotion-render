import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Sequence, Audio, staticFile } from 'remotion';

const SVGStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shake = interpolate(Math.sin(frame * 0.3), [-1, 1], [-3, 3]);
  const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.9, 1.1]);

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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, #0a0500 0%, #1a0a00 50%, #0a0300 100%)' }}>
          <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="none" style={{ position: 'absolute', opacity: 0.3 }}>
            {[...Array(15)].map((_, i) => (
              <polygon key={i} points={`${i * 80 - 30},1920 ${i * 80 + 30},${1200 + Math.random() * 300} ${i * 80 + 90},1920`} fill="#0d1a0d" />
            ))}
          </svg>
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: 100 }}>⚠️</div>
          <div style={{
            position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 52, fontWeight: 900, color: '#ff3333', textAlign: 'center',
            textShadow: '0 0 50px rgba(255,0,0,0.9)',
            transform: `translateX(-50%) translateY(${shake}px) scale(${pulse})`,
          }}>
            90% COULD BE<br/>GONE IN 25 YEARS
          </div>
          <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)', fontSize: 24, color: '#ff6666', fontWeight: 'bold' }}>
            And it's happening faster than scientists predicted
          </div>
        </div>
      </Sequence>

      <Sequence from={120} duration={120}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(180deg, #0d2d0d 0%, #1a5a1a 100%)' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(180deg, #3d1a0a 0%, #5a2d0a 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: '50%', width: 4, height: '100%', background: '#fff' }} />
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', fontSize: 110 }}>😱</div>
          <div style={{
            position: 'absolute', top: '42%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 38, fontWeight: 'bold', color: '#fff', textAlign: 'center',
          }}>
            BUT HERE'S WHAT'S<br/>EVEN SCARIER...
          </div>
        </div>
      </Sequence>

      <Sequence from={240} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at center, #1a4a5a 0%, #0a1a2a 100%)' }}>
          <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="none" style={{ position: 'absolute' }}>
            {[...Array(25)].map((_, i) => (
              <circle key={i} cx={Math.random() * 1080} cy={1920 - (frame * 3 + i * 50) % 1920} r={5 + Math.random() * 15} fill="rgba(200,230,255,0.4)" />
            ))}
          </svg>
          <div style={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)', fontSize: 140, fontWeight: 'bold', color: '#4fc3f7', fontFamily: 'Arial' }}>O₂</div>
          <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)', fontSize: 44, fontWeight: 'bold', color: '#fff' }}>20% OF EARTH'S OXYGEN</div>
          <div style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)', fontSize: 22, color: '#4fc3f7' }}>THE LUNGS OF OUR PLANET</div>
        </div>
      </Sequence>

      <Sequence from={315} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, #0d2d0d 0%, #1a5a1a 50%, #0d3d0d 100%)' }}>
          <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="none" style={{ position: 'absolute' }}>
            <path d="M0 1200 Q270 1100 540 1200 T1080 1200 V1920 H0 Z" fill="#1a4a1a" />
            <path d="M0 1400 Q270 1300 540 1400 T1080 1400 V1920 H0 Z" fill="#228B22" />
            <ellipse cx="200" cy="350" rx="30" ry="40" fill="#000" />
            <ellipse cx="230" cy="340" rx="8" ry="6" fill="#ffcc00" />
          </svg>
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: 130 }}>🦜</div>
          <div style={{ position: 'absolute', top: '36%', left: '50%', transform: 'translateX(-50%)', fontSize: 44, fontWeight: 'bold', color: '#fff' }}>10% OF ALL SPECIES</div>
          <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: 20, color: '#88ff88' }}>Live in the Amazon Rainforest</div>
        </div>
      </Sequence>

      <Sequence from={390} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, #4a1a0a 0%, #5a2a0a 50%, #3a1a0a 100%)' }}>
          <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="none" style={{ position: 'absolute' }}>
            {[...Array(20)].map((_, i) => (
              <path key={i} d={`M${i * 60} ${1200 + Math.random() * 200} Q${i * 60 + 20} ${800 + Math.random() * 300} ${i * 60 + 40} ${1200}`} fill="none" stroke={i % 2 === 0 ? '#ff4500' : '#ff6600'} strokeWidth={10 + Math.random() * 20} opacity={0.5 + Math.random() * 0.5} />
            ))}
          </svg>
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: 140 }}>🔥</div>
          <div style={{ position: 'absolute', top: '36%', left: '50%', transform: 'translateX(-50%)', fontSize: 44, fontWeight: 'bold', color: '#ff4444' }}>17% ALREADY GONE</div>
          <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: 20, color: '#ff8888' }}>In just 50 years</div>
        </div>
      </Sequence>

      <Sequence from={465} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, #1a0d0d 0%, #2d1a1a 50%, #0d0505 100%)' }}>
          <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, border: '12px solid #ff4444', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 90 }}>⏱️</div>
          <div style={{ position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)', fontSize: 32, fontWeight: 'bold', color: '#ff6666' }}>EVERY SECOND</div>
          <div style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translateX(-50%)', fontSize: 26, color: '#fff', textAlign: 'center' }}>A forest the size of a<br/>football field is cut down</div>
        </div>
      </Sequence>

      <Sequence from={540} duration={210}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, #0d4d0d 0%, #1a7a1a 50%, #0d5d0d 100%)' }}>
          <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="none" style={{ position: 'absolute' }}>
            <ellipse cx="540" cy="1700" rx="80" ry="30" fill="#3d2817" />
            <path d="M540 1700 Q520 1550 540 1400 Q560 1550 540 1700" fill="#228B22" />
          </svg>
          <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', fontSize: 120 }}>🌱</div>
          <div style={{ position: 'absolute', top: '26%', left: '50%', transform: 'translateX(-50%)', fontSize: 38, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>BUT IT'S NOT<br/>TOO LATE</div>
          <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)', fontSize: 26, color: '#88ff88', textAlign: 'center' }}>Follow for more<br/>Save this and share</div>
          <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: 26, color: '#fff' }}>#amazon #rainforest #environment</div>
        </div>
      </Sequence>

      <Sequence from={690} duration={60}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, #0d3d0d 0%, #1a5a1a 100%)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,255,100,0.2) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)', fontSize: 52, fontWeight: 'bold', color: '#fff' }}>@opencode</div>
          <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)', fontSize: 40, color: '#88ff88' }}>💚</div>
          <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translateX(-50%)', fontSize: 28, color: '#aaa' }}>Subscribe</div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export { SVGStyle };
