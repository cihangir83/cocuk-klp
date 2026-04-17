import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { useTypewriter } from '../../hooks/useGameHooks';
import soundSynth from '../../utils/soundSynthesizer';

export default function OpeningCinematic() {
  const { state, dispatch } = useGame();
  const [phase, setPhase] = useState(0);
  // 0: siyah ekran
  // 1: fotoğraf belirir
  // 2: damga düşer
  // 3: narrative yazılır
  // 4: buton görünür
  const ambientRef = useRef(null);

  const narrativeLines = [
    "Kaş kıyılarında deniz kaplumbağası popülasyonu 3 yılda yüzde seksen düştü.",
    "Resmi açıklama yok. Soruşturma başlatıldı.",
    "Savcı olarak atandınız."
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const { displayText, isComplete } = useTypewriter(
    phase >= 3 ? narrativeLines[currentLine] : '',
    40,
    0,
    phase >= 3
  );

  useEffect(() => {
    // Faz geçişleri
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 2000)); // 2sn siyah
    timers.push(setTimeout(() => {
      setPhase(2);
      soundSynth.stampInk();
    }, 5000)); // damga
    timers.push(setTimeout(() => setPhase(3), 7500)); // narrative

    // Ambient rüzgar başlat
    setTimeout(() => {
      ambientRef.current = soundSynth.startAmbientWind();
    }, 2000);

    return () => {
      timers.forEach(clearTimeout);
      if (ambientRef.current?.source) {
        try { ambientRef.current.source.stop(); } catch(e) {}
      }
    };
  }, []);

  // Narrative satır geçişi
  useEffect(() => {
    if (isComplete && currentLine < narrativeLines.length - 1 && phase >= 3) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, currentLine, phase]);

  const showButton = phase >= 3 && isComplete && currentLine === narrativeLines.length - 1;

  const handleOpenFile = () => {
    soundSynth.paperRustle();
    if (ambientRef.current?.source) {
      try { ambientRef.current.source.stop(); } catch(e) {}
    }
    if (state.playerName) {
      dispatch({ type: 'SET_SCREEN', screen: 'caseSelection' });
    } else {
      dispatch({ type: 'SET_SCREEN', screen: 'nameEntry' });
    }
  };

  const handleSkip = () => {
    if (ambientRef.current?.source) {
      try { ambientRef.current.source.stop(); } catch(e) {}
    }
    if (state.playerName) {
      dispatch({ type: 'SET_SCREEN', screen: 'caseSelection' });
    } else {
      dispatch({ type: 'SET_SCREEN', screen: 'nameEntry' });
    }
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        soundSynth.init();
      }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
      }} />

      {/* Fotoğraf */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: phase >= 2 ? 0.6 : 0.8, scale: 1 }}
            transition={{ duration: 3 }}
          >
            <div className="w-[500px] h-[300px] relative" style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              filter: 'grayscale(100%) contrast(1.2)',
              borderRadius: '2px',
              boxShadow: '0 0 40px rgba(0,0,0,0.8)'
            }}>
              {/* İç sahne — soyut kıyı çizimi */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Dalga çizgileri */}
                <svg width="500" height="300" viewBox="0 0 500 300" className="absolute inset-0">
                  <path d="M0,200 Q50,180 100,200 T200,200 T300,200 T400,200 T500,200 L500,300 L0,300 Z" fill="rgba(255,255,255,0.05)" />
                  <path d="M0,220 Q60,200 120,220 T240,220 T360,220 T480,220 L500,300 L0,300 Z" fill="rgba(255,255,255,0.03)" />
                  {/* Sahil hattı */}
                  <line x1="0" y1="190" x2="500" y2="185" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  {/* Ölü balık silüetleri */}
                  <ellipse cx="120" cy="195" rx="20" ry="6" fill="rgba(255,255,255,0.08)" transform="rotate(-10, 120, 195)" />
                  <ellipse cx="280" cy="192" rx="15" ry="5" fill="rgba(255,255,255,0.06)" transform="rotate(5, 280, 192)" />
                  <ellipse cx="380" cy="198" rx="18" ry="5" fill="rgba(255,255,255,0.07)" transform="rotate(-15, 380, 198)" />
                  {/* Tekne silüeti */}
                  <path d="M340,150 L360,165 L320,165 Z" fill="rgba(255,255,255,0.06)" />
                  <line x1="345" y1="130" x2="345" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </svg>
                {/* Grain efekti */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
                  opacity: 0.4
                }} />
              </div>
              {/* Polaroid kenar */}
              <div className="absolute -bottom-8 left-0 right-0 h-8" style={{ background: '#f5f0e8' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Damga */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="absolute z-20 stamp-animation"
            initial={{ opacity: 0, scale: 2, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ top: '25%', left: '50%', transform: 'translateX(-50%)' }}
          >
            <div className="stamp-ink px-6 py-3 text-center" style={{
              border: '3px solid #C0392B',
              borderRadius: '2px',
            }}>
              <div className="text-sm tracking-widest opacity-70" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B' }}>
                VAKA #247
              </div>
              <div className="text-2xl font-bold tracking-wider mt-1" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B' }}>
                EKO KATLİAMI
              </div>
              <div className="text-xs tracking-widest mt-1 opacity-60" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B' }}>
                GİZLİ — SINIRLI ERİŞİM
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narrative text */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="absolute z-20 w-full max-w-xl px-8 text-center"
            style={{ bottom: '25%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-4">
              {narrativeLines.map((line, i) => (
                <div key={i} className="min-h-[1.5em]">
                  {i < currentLine && (
                    <p className="text-base opacity-50" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
                      {`"${line}"`}
                    </p>
                  )}
                  {i === currentLine && (
                    <p className={`text-base ${isComplete ? '' : 'typewriter-cursor'}`} style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
                      {displayText ? `"${displayText}"` : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dosyayı Aç butonu */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            className="absolute z-30 px-8 py-3 cursor-pointer pulse-glow"
            style={{
              bottom: '10%',
              fontFamily: 'var(--font-typewriter)',
              color: '#F5EDD6',
              background: 'rgba(245,166,35,0.08)',
              border: '1px solid rgba(245,166,35,0.3)',
              borderRadius: '2px',
              letterSpacing: '0.2em',
              fontSize: '1.1rem'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 1 }}
            onClick={handleOpenFile}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(245,166,35,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            [ DOSYAYI AÇ ]
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip butonu — sadece ikinci oturum+ */}
      {!state.isFirstSession && phase < 3 && (
        <motion.button
          className="absolute bottom-4 right-4 z-40 text-xs opacity-30 hover:opacity-60 cursor-pointer transition-opacity"
          style={{ fontFamily: 'var(--font-ui)', color: '#F5EDD6' }}
          onClick={handleSkip}
        >
          Atla →
        </motion.button>
      )}
    </motion.div>
  );
}
