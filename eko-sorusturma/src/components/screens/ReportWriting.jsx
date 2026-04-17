import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import soundSynth from '../../utils/soundSynthesizer';

export default function ReportWriting() {
  const { state, dispatch, getActiveCase } = useGame();
  const activeCase = getActiveCase();
  const [report, setReport] = useState('');
  const [stampVisible, setStampVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const sentences = report.split(/[.!?]/).filter(s => s.trim().length > 0);
  const isValid = sentences.length >= 2;

  const handleKeyDown = () => {
    soundSynth.typewriterKey();
  };

  const handleSubmit = () => {
    if (!isValid) return;
    soundSynth.stampInk();
    dispatch({ type: 'SET_FINAL_REPORT', report });
    setStampVisible(true);
    setTimeout(() => {
      setClosing(true);
      soundSynth.fileClose();
      setTimeout(() => {
        dispatch({ type: 'COMPLETE_CASE' });
      }, 1500);
    }, 2000);
  };

  if (!activeCase) return null;

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative"
      style={{ background: '#0D0D0D' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)'
      }} />
      <div className="absolute top-0 right-0 w-[60%] h-[80%] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(245,166,35,0.04) 0%, transparent 70%)'
      }} />

      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: closing ? 200 : 0, opacity: closing ? 0 : 1, rotate: closing ? 2 : 0 }}
        transition={{ duration: closing ? 1.5 : 0.6 }}
      >
        <div className="paper-texture paper-aged p-8 relative" style={{ borderRadius: '2px', minHeight: '400px' }}>
          {/* Ataş */}
          <div className="absolute -top-3 left-8 w-6 h-12 rounded-full" style={{
            border: '2px solid #888',
            borderBottom: 'none',
            background: 'linear-gradient(90deg, #aaa, #ccc, #aaa)'
          }} />

          {/* Başlık */}
          <div className="text-center mb-6">
            <div className="text-xs tracking-[0.3em] opacity-50 mb-1" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B' }}>
              SAVCININ SONUÇ RAPORU
            </div>
            <h2 className="text-base tracking-wider" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
              VAKA #{activeCase.caseNumber} — {activeCase.title.toUpperCase()}
            </h2>
            <div className="w-40 h-px mx-auto mt-2" style={{ background: '#1A0A00', opacity: 0.15 }} />
          </div>

          {/* Kök neden özeti */}
          <div className="mb-4 px-3 py-2" style={{
            background: 'rgba(26,10,0,0.03)',
            border: '1px solid rgba(26,10,0,0.1)',
            borderRadius: '2px'
          }}>
            <div className="text-[10px] tracking-wider opacity-40 mb-1" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
              TESPİT EDİLEN KÖK NEDEN
            </div>
            <div className="text-xs" style={{ fontFamily: 'var(--font-typewriter)', color: '#1A0A00' }}>
              {activeCase.rootCauseShort}
            </div>
          </div>

          {/* Rapor yazım alanı */}
          <div className="mb-4">
            <label className="block text-[10px] tracking-wider opacity-40 mb-1" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
              SAVCININ DEĞERLENDİRMESİ (En az 2 cümle):
            </label>
            <textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-40 bg-transparent resize-none outline-none p-2"
              style={{
                fontFamily: 'var(--font-typewriter)',
                fontSize: '14px',
                color: '#1A0A00',
                lineHeight: '2',
                borderBottom: '1px solid rgba(26,10,0,0.1)',
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(26,10,0,0.05) 31px, rgba(26,10,0,0.05) 32px)',
                backgroundSize: '100% 32px',
                backgroundPositionY: '4px'
              }}
              placeholder="Değerlendirmenizi yazın..."
              disabled={stampVisible}
              autoFocus
            />
            <div className="text-[10px] text-right mt-1 opacity-30" style={{ fontFamily: 'var(--font-evidence)', color: '#1A0A00' }}>
              {sentences.length}/2 cümle {isValid ? '✓' : ''}
            </div>
          </div>

          {/* Tamamla butonu */}
          {!stampVisible && (
            <motion.button
              className="w-full py-2.5 cursor-pointer"
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: '13px',
                letterSpacing: '0.15em',
                color: isValid ? '#F5EDD6' : '#999',
                background: isValid ? '#C0392B' : 'rgba(26,10,0,0.1)',
                border: 'none',
                borderRadius: '2px',
                transition: 'all 0.3s ease'
              }}
              disabled={!isValid}
              onClick={handleSubmit}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
            >
              RAPORU TAMAMLA
            </motion.button>
          )}

          {/* TAMAMLANDI damgası */}
          {stampVisible && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stamp-animation"
              initial={{ opacity: 0, scale: 3, rotate: -10 }}
              animate={{ opacity: 0.7, scale: 1, rotate: -5 }}
              transition={{ duration: 0.4 }}
            >
              <div className="px-10 py-4" style={{
                border: '4px solid #27AE60',
              }}>
                <span className="text-3xl tracking-[0.3em]" style={{ fontFamily: 'var(--font-stamp)', color: '#27AE60' }}>
                  TAMAMLANDI
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
