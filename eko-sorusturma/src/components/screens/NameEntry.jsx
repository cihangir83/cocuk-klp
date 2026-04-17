import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import soundSynth from '../../utils/soundSynthesizer';

export default function NameEntry() {
  const { dispatch } = useGame();
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    soundSynth.paperRustle();
    dispatch({ type: 'SET_PLAYER_NAME', name: name.trim() });
    dispatch({ type: 'SET_SCREEN', screen: 'caseSelection' });
  };

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative"
      style={{ background: '#0D0D0D' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)'
      }} />

      {/* Spotlight */}
      <div className="absolute top-0 right-0 w-[60%] h-[80%] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(245,166,35,0.04) 0%, transparent 70%)'
      }} />

      <motion.div
        className="relative z-10 w-[420px]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Kağıt */}
        <div className="paper-texture paper-aged p-8 relative" style={{ borderRadius: '2px' }}>
          {/* Ataş */}
          <div className="absolute -top-3 left-8 w-6 h-12 rounded-full" style={{
            border: '2px solid #888',
            borderBottom: 'none',
            background: 'linear-gradient(90deg, #aaa, #ccc, #aaa)'
          }} />

          {/* Başlık */}
          <div className="text-center mb-6">
            <div className="text-xs tracking-[0.3em] opacity-50 mb-1" style={{ fontFamily: 'var(--font-stamp)', color: '#C0392B' }}>
              EKO SORUŞTURMA DAİRESİ
            </div>
            <h2 className="text-xl tracking-wider" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
              SAVCI KAYIT FORMU
            </h2>
            <div className="w-32 h-px mx-auto mt-2" style={{ background: '#1A0A00', opacity: 0.2 }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <label className="block text-xs mb-2 tracking-wider opacity-60" style={{ fontFamily: 'var(--font-evidence)', color: '#1A0A00' }}>
              ADI SOYADI:
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  soundSynth.typewriterKey();
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pb-2 pt-1 px-0 bg-transparent outline-none"
                style={{
                  fontFamily: 'var(--font-typewriter)',
                  fontSize: '1.2rem',
                  color: '#1A0A00',
                  borderBottom: `2px solid ${isFocused ? '#C0392B' : 'rgba(26,10,0,0.2)'}`,
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="İsminizi yazın..."
                maxLength={30}
                autoFocus
              />
              {isFocused && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ background: '#C0392B' }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full mt-8 py-3 cursor-pointer"
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: '1rem',
                letterSpacing: '0.2em',
                color: name.trim().length >= 2 ? '#F5EDD6' : '#666',
                background: name.trim().length >= 2 ? '#C0392B' : 'rgba(26,10,0,0.1)',
                border: name.trim().length >= 2 ? '2px solid #C0392B' : '2px solid rgba(26,10,0,0.1)',
                borderRadius: '2px',
                transition: 'all 0.3s ease'
              }}
              disabled={name.trim().length < 2}
              whileHover={name.trim().length >= 2 ? { scale: 1.02 } : {}}
              whileTap={name.trim().length >= 2 ? { scale: 0.98 } : {}}
            >
              SORUŞTURMAYA BAŞLA
            </motion.button>
          </form>

          {/* Alt not */}
          <div className="mt-4 text-center text-xs opacity-30" style={{ fontFamily: 'var(--font-evidence)', color: '#1A0A00' }}>
            Bu form gizli soruşturma kapsamındadır.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
