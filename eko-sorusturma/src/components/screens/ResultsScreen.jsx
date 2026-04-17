import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { badges } from '../../data/badges';
import soundSynth from '../../utils/soundSynthesizer';

export default function ResultsScreen() {
  const { state, dispatch } = useGame();
  const results = state.lastResults;
  const [earnedNow, setEarnedNow] = useState([]);

  useEffect(() => {
    if (!results) return;

    // Rozet kontrol
    const newBadges = badges.filter(b => {
      if (state.earnedBadges.includes(b.id)) return false;
      return b.condition(state);
    });

    if (newBadges.length > 0) {
      setTimeout(() => {
        newBadges.forEach(b => {
          dispatch({ type: 'EARN_BADGE', badgeId: b.id });
        });
        setEarnedNow(newBadges);
        soundSynth.badgeEarn();
      }, 2000);
    }
  }, []);

  if (!results) return null;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} dk ${s} sn`;
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ background: '#0D0D0D' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)'
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[60%] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.04) 0%, transparent 70%)'
      }} />

      {/* Başlık */}
      <motion.div
        className="relative z-10 text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl tracking-[0.3em]" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
          VAKA ÇÖZÜLDÜ
        </h1>
        <div className="w-32 h-px mx-auto mt-3" style={{ background: 'rgba(245,166,35,0.3)' }} />
      </motion.div>

      {/* İstatistikler */}
      <motion.div
        className="relative z-10 grid grid-cols-2 gap-4 mb-8 max-w-md w-full px-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          { label: 'Kullanılan Kanıt', value: results.evidenceCount, icon: '📋' },
          { label: 'Yanlış Bağlantı', value: results.wrongConnections, icon: '❌' },
          { label: 'Çözme Süresi', value: formatTime(results.timeSeconds), icon: '⏱️' },
          { label: 'Doğruluk', value: `%${results.accuracy}`, icon: '🎯' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="text-center p-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '4px'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-stamp)', color: '#F5EDD6' }}>
              {stat.value}
            </div>
            <div className="text-[10px] tracking-wider opacity-40 mt-1" style={{ fontFamily: 'var(--font-stamp)', color: '#F5EDD6' }}>
              {stat.label.toUpperCase()}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Kazanılan rozetler */}
      {earnedNow.length > 0 && (
        <motion.div
          className="relative z-10 mb-8 text-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <div className="text-xs tracking-wider mb-3 opacity-50" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
            KAZANILAN ROZETLER
          </div>
          <div className="flex gap-4 justify-center">
            {earnedNow.map((badge) => (
              <motion.div
                key={badge.id}
                className="w-20 h-20 flex flex-col items-center justify-center"
                style={{
                  background: 'rgba(243,156,18,0.1)',
                  border: '2px solid rgba(243,156,18,0.4)',
                  borderRadius: '50%'
                }}
                animate={{ boxShadow: ['0 0 10px rgba(243,156,18,0.2)', '0 0 30px rgba(243,156,18,0.4)', '0 0 10px rgba(243,156,18,0.2)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-[8px] mt-0.5 tracking-wider" style={{ fontFamily: 'var(--font-stamp)', color: '#F39C12' }}>
                  {badge.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Butonlar */}
      <motion.div
        className="relative z-10 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          className="px-6 py-2.5 cursor-pointer"
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: '#F5EDD6',
            background: 'rgba(245,166,35,0.15)',
            border: '1px solid rgba(245,166,35,0.4)',
            borderRadius: '2px'
          }}
          onClick={() => dispatch({ type: 'GO_TO_CASE_SELECTION' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          YENİ VAKA
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
