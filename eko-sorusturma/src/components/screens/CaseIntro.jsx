import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { useTypewriter } from '../../hooks/useGameHooks';
import soundSynth from '../../utils/soundSynthesizer';

export default function CaseIntro() {
  const { state, dispatch, getActiveCase } = useGame();
  const activeCase = getActiveCase();
  const [phase, setPhase] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  const lines = activeCase?.openingNarrative || [];
  const { displayText, isComplete } = useTypewriter(
    phase >= 1 ? lines[currentLine] : '', 40, 0, phase >= 1
  );

  useEffect(() => {
    soundSynth.stampInk();
    const t = setTimeout(() => setPhase(1), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isComplete && currentLine < lines.length - 1 && phase >= 1) {
      const t = setTimeout(() => setCurrentLine(p => p + 1), 1200);
      return () => clearTimeout(t);
    }
  }, [isComplete, currentLine, phase, lines.length]);

  const showButton = isComplete && currentLine === lines.length - 1;

  const handleEnter = () => {
    soundSynth.paperRustle();
    dispatch({ type: 'ENTER_INVESTIGATION' });
  };

  if (!activeCase) return null;

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ background: '#0D0D0D' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
      }} />

      {/* Damga */}
      <motion.div
        className="relative z-10 text-center mb-8"
        initial={{ opacity: 0, scale: 2, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="stamp-ink px-8 py-4" style={{ border: '3px solid #C0392B' }}>
          <div className="text-sm tracking-widest opacity-70" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B' }}>
            VAKA #{activeCase.caseNumber}
          </div>
          <div className="text-2xl tracking-wider mt-1" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B' }}>
            {activeCase.title.toUpperCase()}
          </div>
          <div className="text-xs tracking-widest mt-1 opacity-60" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B' }}>
            GİZLİ SORUŞTURMA
          </div>
        </div>
      </motion.div>

      {/* Belirti */}
      <motion.div
        className="relative z-10 mb-6 px-6 py-3"
        style={{
          background: 'rgba(245,166,35,0.08)',
          border: '1px solid rgba(245,166,35,0.2)',
          borderRadius: '2px',
          maxWidth: '500px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-xs tracking-wider mb-1 opacity-50" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
          BELİRTİ
        </div>
        <div className="text-sm" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
          {activeCase.symptom}
        </div>
      </motion.div>

      {/* Narrative */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="relative z-10 max-w-lg px-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-3 min-h-[120px]">
              {lines.map((line, i) => (
                <div key={i} className="min-h-[1.5em]">
                  {i < currentLine && (
                    <p className="text-sm opacity-40" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
                      "{line}"
                    </p>
                  )}
                  {i === currentLine && (
                    <p className={`text-sm ${isComplete ? '' : 'typewriter-cursor'}`} style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
                      {displayText ? `"${displayText}"` : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Masaya Geç butonu */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            className="relative z-20 mt-8 px-8 py-3 cursor-pointer pulse-glow"
            style={{
              fontFamily: 'var(--font-typewriter)',
              color: '#F5EDD6',
              background: 'rgba(245,166,35,0.08)',
              border: '1px solid rgba(245,166,35,0.3)',
              borderRadius: '2px',
              letterSpacing: '0.15em'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={handleEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            [ SORUŞTURMAYI BAŞLAT ]
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
