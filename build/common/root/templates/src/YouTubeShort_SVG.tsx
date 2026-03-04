import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Sequence, Audio, staticFile, Svg, Path } from 'remotion';

const SVGStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shake = interpolate(Math.sin(frame * 0.3), [-1, 1], [-3, 3]);
  const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.9, 1.1]);
  const rotate = interpolate(frame, [0, 300], [0, 360]);

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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="darkForest" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a0500" />
                <stop offset="50%" stopColor="#1a0a00" />
                <stop offset="100%" stopColor="#0a0300" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="1080" height="1920" fill="url(#darkForest)" />
            {[...Array(8)].map((_, i) => (
              <Path
                key={i}
                d={`M${i * 150 - 50} 1920 L${i * 150 + 50} ${1200 + Math.random() * 300} L${i * 150 + 150} 1920 Z`}
                fill="#0d1a0d"
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <Path
                key={`m${i}`}
                d={`M${i * 150 + 30} 1920 L${i * 150 + 80} ${1400 + Math.random() * 200} L${i * 150 + 130} 1920 Z`}
                fill="#1a2a1a"
              />
            ))}
          </Svg>
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: 100 }}>⚠️</div>
          <div style={{
            position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 52, fontWeight: 900, color: '#ff3333', textAlign: 'center',
            textShadow: '0 0 50px rgba(255,0,0,0.9), 0 0 100px rgba(255,0,0,0.5)',
            transform: `translateX(-50%) translateY(${shake}px) scale(${pulse})`,
          }}>
            90% COULD BE<br/>GONE IN 25 YEARS
          </div>
          <div style={{
            position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 24, color: '#ff6666', fontWeight: 'bold',
          }}>
            And it's happening faster than scientists predicted
          </div>
        </div>
      </Sequence>

      <Sequence from={120} duration={120}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="splitLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d2d0d" />
                <stop offset="100%" stopColor="#1a5a1a" />
              </linearGradient>
              <linearGradient id="splitRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3d1a0a" />
                <stop offset="100%" stopColor="#5a2d0a" />
              </linearGradient>
            </defs>
            <rect width="540" height="1920" fill="url(#splitLeft)" />
            <rect x="540" width="540" height="1920" fill="url(#splitRight)" />
            <line x1="540" y1="0" x2="540" y2="1920" stroke="#fff" strokeWidth="8" />
            {[...Array(5)].map((_, i) => (
              <circle key={i} cx={270} cy={400 + i * 250} r="80" fill="#228B22" opacity={0.6} />
            ))}
            {[...Array(5)].map((_, i) => (
              <rect key={i} x={670 + (i % 3) * 100} y={300 + Math.floor(i / 3) * 400} width="120" height="80" fill="#4a2a0a" />
            ))}
          </Svg>
          <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', fontSize: 110 }}>😱</div>
          <div style={{
            position: 'absolute', top: '42%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 38, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
          }}>
            BUT HERE'S WHAT'S<br/>EVEN SCARIER...
          </div>
        </div>
      </Sequence>

      <Sequence from={240} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: 'absolute' }}>
            <defs>
              <radialGradient id="oxygenBg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#1a4a5a" />
                <stop offset="100%" stopColor="#0a1a2a" />
              </radialGradient>
            </defs>
            <rect width="1080" height="1920" fill="url(#oxygenBg)" />
            {[...Array(30)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 1080}
                cy={1920 - (frame * 3 + i * 50) % 1920}
                r={5 + Math.random() * 15}
                fill="rgba(200,230,255,0.4)"
              />
            ))}
          </Svg>
          <Svg width="200" height="200" viewBox="0 0 100 100" style={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)' }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#4fc3f7" strokeWidth="8" />
            <text x="50" y="60" textAnchor="middle" fontSize="35" fontWeight="bold" fill="#4fc3f7">O₂</text>
          </Svg>
          <div style={{
            position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 44, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 0 20px rgba(79,195,247,0.8)',
          }}>20% OF EARTH'S OXYGEN</div>
          <div style={{
            position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 22, color: '#4fc3f7', letterSpacing: 2,
          }}>THE LUNGS OF OUR PLANET</div>
        </div>
      </Sequence>

      <Sequence from={315} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: 'absolute' }}>
            <rect width="1080" height="1920" fill="#0d2d0d" />
            <Path d="M0 1200 Q270 1100 540 1200 T1080 1200 V1920 H0 Z" fill="#1a4a1a" />
            <Path d="M0 1400 Q270 1300 540 1400 T1080 1400 V1920 H0 Z" fill="#228B22" />
            <ellipse cx="200" cy="350" rx="30" ry="40" fill="#000" />
            <ellipse cx="230" cy="340" rx="8" ry="6" fill="#ffcc00" />
            <ellipse cx="850" cy="500" rx="40" ry="25" fill="#000" />
            <ellipse cx="870" cy="490" rx="10" ry="7" fill="#ff6600" />
          </Svg>
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 130,
          }}>🦜</div>
          <div style={{
            position: 'absolute', top: '36%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 44, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 0 20px rgba(0,255,0,0.6)',
          }}>10% OF ALL SPECIES</div>
          <div style={{
            position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 20, color: '#88ff88',
          }}>Live in the Amazon Rainforest</div>
        </div>
      </Sequence>

      <Sequence from={390} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="fireBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a1a0a" />
                <stop offset="50%" stopColor="#5a2a0a" />
                <stop offset="100%" stopColor="#3a1a0a" />
              </linearGradient>
            </defs>
            <rect width="1080" height="1920" fill="url(#fireBg)" />
            {[...Array(20)].map((_, i) => (
              <path
                key={i}
                d={`M${i * 60} ${1200 + Math.random() * 200} Q${i * 60 + 20} ${800 + Math.random() * 300} ${i * 60 + 40} ${1200}`}
                fill="none"
                stroke={i % 2 === 0 ? '#ff4500' : '#ff6600'}
                strokeWidth={10 + Math.random() * 20}
                opacity={0.5 + Math.random() * 0.5}
              />
            ))}
          </Svg>
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 140, filter: 'drop-shadow(0 0 30px rgba(255,100,0,0.8))',
          }}>🔥</div>
          <div style={{
            position: 'absolute', top: '36%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 44, fontWeight: 'bold', color: '#ff4444', textAlign: 'center',
            textShadow: '0 0 30px rgba(255,0,0,0.8)',
          }}>17% ALREADY GONE</div>
          <div style={{
            position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 20, color: '#ff8888',
          }}>In just 50 years</div>
        </div>
      </Sequence>

      <Sequence from={465} duration={75}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: 'absolute' }}>
            <rect width="1080" height="1920" fill="#1a0d0d" />
            <circle cx="540" cy="700" r="200" fill="none" stroke="#ff4444" strokeWidth="15" />
            <circle cx="540" cy="700" r="170" fill="none" stroke="#ff6666" strokeWidth="8" />
            <line x1="540" y1="500" x2="540" y2="540" stroke="#ff4444" strokeWidth="12" />
            <line x1="540" y1="860" x2="540" y2="900" stroke="#ff4444" strokeWidth="12" />
            <line x1="340" y1="700" x2="380" y2="700" stroke="#ff4444" strokeWidth="12" />
            <line x1="700" y1="700" x2="740" y2="700" stroke="#ff4444" strokeWidth="12" />
            <Path d="M540 700 L540 550" stroke="#fff" strokeWidth="6" />
            <Path
              d="M540 700 L540 400"
              stroke="#fff"
              strokeWidth="6"
              strokeDasharray="10 5"
              style={{ transform: `rotate(${frame * 6}deg, 540, 700)` }}
            />
          </Svg>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            fontSize: 90,
          }}>⏱️</div>
          <div style={{
            position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 32, fontWeight: 'bold', color: '#ff6666', textAlign: 'center',
          }}>EVERY SECOND</div>
          <div style={{
            position: 'absolute', top: '70%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 26, color: '#fff', textAlign: 'center',
          }}>A forest the size of a<br/>football field is cut down</div>
        </div>
      </Sequence>

      <Sequence from={540} duration={210}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="hopeBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d4d0d" />
                <stop offset="50%" stopColor="#1a7a1a" />
                <stop offset="100%" stopColor="#0d5d0d" />
              </linearGradient>
              <radialGradient id="glowGreen" cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="rgba(100,255,100,0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="1080" height="1920" fill="url(#hopeBg)" />
            <rect width="1080" height="1920" fill="url(#glowGreen)" />
            {[...Array(10)].map((_, i) => (
              <path
                key={i}
                d={`M${i * 120 + 60} 1920 Q${i * 120 + 60} ${1600 - (frame * 2) % 200} ${i * 120 + 60} 1500`}
                stroke="#2d5d2d"
                strokeWidth="4"
                fill="none"
              />
            ))}
            <ellipse cx="540" cy="1700" rx="80" ry="30" fill="#3d2817" />
            <path d="M540 1700 Q520 1550 540 1400 Q560 1550 540 1700" fill="#228B22" />
            <path d="M540 1600 Q500 1500 520 1450 Q540 1550 540 1600" fill="#32cd32" />
            <path d="M540 1600 Q580 1500 560 1450 Q540 1550 540 1600" fill="#32cd32" />
          </Svg>
          <div style={{
            position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 120, filter: 'drop-shadow(0 0 25px rgba(0,255,0,0.7))',
          }}>🌱</div>
          <div style={{
            position: 'absolute', top: '26%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 38, fontWeight: 'bold', color: '#fff', textAlign: 'center',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}>BUT IT'S NOT<br/>TOO LATE</div>
          <div style={{
            position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 26, color: '#88ff88', textAlign: 'center',
          }}>Follow for more<br/>Save this and share</div>
          <div style={{
            position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 26, color: '#fff',
          }}>#amazon #rainforest #environment</div>
        </div>
      </Sequence>

      <Sequence from={690} duration={60}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: 'absolute' }}>
            <rect width="1080" height="1920" fill="linear-gradient(180deg, #0d3d0d 0%, #1a5a1a 100%)" />
            <defs>
              <radialGradient id="ctaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(100,255,100,0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="540" cy="800" r="300" fill="url(#ctaGlow)" />
          </Svg>
          <div style={{
            position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)',
            fontSize: 52, fontWeight: 'bold', color: '#fff',
            textShadow: '0 0 30px rgba(255,255,255,0.6)',
          }}>@opencode</div>
          <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)', fontSize: 40, color: '#88ff88' }}>💚</div>
          <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translateX(-50%)', fontSize: 28, color: '#aaa' }}>Subscribe</div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export { SVGStyle };
