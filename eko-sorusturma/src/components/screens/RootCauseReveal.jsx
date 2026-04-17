import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { useTypewriter } from '../../hooks/useGameHooks';
import soundSynth from '../../utils/soundSynthesizer';

export default function RootCauseReveal() {
  const { state, dispatch, getActiveCase } = useGame();
  const activeCase = getActiveCase();
  const [phase, setPhase] = useState(0);

  const { displayText: titleText, isComplete: titleDone } = useTypewriter(
    phase >= 1 ? 'KÖK NEDEN TESPİT EDİLDİ' : '', 60, 0, phase >= 1
  );

  const { displayText: causeText, isComplete: causeDone } = useTypewriter(
    phase >= 2 ? activeCase?.rootCauseShort : '', 35, 0, phase >= 2
  );

  const chainSummary = activeCase?.chainLinks
    .map(link => link.answer)
    .join(' → ');

  const { displayText: summaryText, isComplete: summaryDone } = useTypewriter(
    phase >= 3 ? chainSummary : '', 20, 0, phase >= 3
  );

  useEffect(() => {
    soundSynth.crescendo();
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => {
      setPhase(2);
      soundSynth.stampInk();
    }, 5000);
    const t3 = setTimeout(() => setPhase(3), 8000);
    const t4 = setTimeout(() => setPhase(4), 12000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (!activeCase) return null;

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ background: '#0D0D0D' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Spotlight — sadece merkeze */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.04) 0%, transparent 50%)'
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.9) 100%)'
      }} />

      {/* Başlık */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="relative z-10 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={`text-2xl tracking-[0.3em] ${!titleDone ? 'typewriter-cursor' : ''}`} style={{
              fontFamily: 'var(--font-stamp)',
              color: '#F5A623'
            }}>
              {titleText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kök neden damgası */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="relative z-10 mb-8"
            initial={{ opacity: 0, scale: 2, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-8 py-5 text-center" style={{
              border: '3px solid #C0392B',
              background: 'rgba(192,57,43,0.08)'
            }}>
              <div className="text-sm tracking-widest mb-2" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B', opacity: 0.7 }}>
                SUÇLU:
              </div>
              <div className={`text-lg max-w-md ${!causeDone ? 'typewriter-cursor' : ''}`} style={{
                fontFamily: 'var(--font-typewriter)',
                color: '#F5EDD6',
                lineHeight: '1.6'
              }}>
                {causeText}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zincir özeti */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="relative z-10 mb-8 max-w-lg px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs tracking-wider mb-2 opacity-50" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
              SAVCININ AÇIKLAMASI
            </div>
            <div className={`text-xs leading-relaxed opacity-60 ${!summaryDone ? 'typewriter-cursor' : ''}`} style={{
              fontFamily: 'var(--font-evidence)',
              color: '#F5EDD6',
              lineHeight: '1.8'
            }}>
              "{summaryText}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aksiyon butonları */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            className="relative z-10 flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="px-6 py-2.5 cursor-pointer"
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: '12px',
                letterSpacing: '0.15em',
                color: '#F5EDD6',
                background: 'rgba(192,57,43,0.2)',
                border: '1px solid rgba(192,57,43,0.5)',
                borderRadius: '2px'
              }}
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'reportWriting' })}
              whileHover={{ scale: 1.05, background: 'rgba(192,57,43,0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              📝 RAPOR YAZ
            </motion.button>

            <motion.button
              className="px-6 py-2.5 cursor-pointer"
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: '12px',
                letterSpacing: '0.15em',
                color: '#F5EDD6',
                background: 'rgba(245,166,35,0.1)',
                border: '1px solid rgba(245,166,35,0.3)',
                borderRadius: '2px'
              }}
              onClick={() => {
                soundSynth.fileClose();
                dispatch({ type: 'COMPLETE_CASE' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              📁 DOSYAYI KAPAT
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
