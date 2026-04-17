import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { badges as allBadges } from '../data/badges';
import SoundEngine from '../utils/soundEngine';

function AnimatedCounter({ value, duration = 1.5, delay = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplay(value);
          clearInterval(interval);
        } else {
          setDisplay(Math.floor(current));
        }
      }, duration * 1000 / steps);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, duration, delay]);

  return <span>{display}</span>;
}

export default function SessionSummaryScreen() {
  const { player, setCurrentScreen, endSession } = useGame();
  const [showBadges, setShowBadges] = useState(false);

  const session = player.currentSession;

  useEffect(() => {
    endSession();
    // Show badges after stats
    const timer = setTimeout(() => setShowBadges(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const earnedBadges = session.badgesEarned
    .map(id => allBadges.find(b => b.id === id))
    .filter(Boolean);

  const stats = [
    { label: 'Keşfedilen Canlı', value: session.creaturesDiscovered, icon: '🔍', color: '#00C896' },
    { label: 'Kurulan Analoji', value: session.analogiesMade, icon: '🧩', color: '#F5A623' },
    { label: 'Toplam Puan', value: session.score, icon: '⭐', color: '#FFD700' },
    { label: 'Kazanılan Rozet', value: earnedBadges.length, icon: '🏅', color: '#9B59B6' },
  ];

  return (
    <motion.div
      className="relative w-full h-full bg-deep overflow-y-auto flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Light beam from top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(245,166,35,0.08) 0%, transparent 50%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Title */}
      <motion.h1
        className="font-display text-4xl md:text-5xl text-gold tracking-wider mb-2 relative z-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        OTURUM TAMAMLANDI
      </motion.h1>

      <motion.p
        className="text-text-secondary text-sm font-body mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Keşif yolculuğundaki ilerleme
      </motion.p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-xl p-4 border border-border-subtle flex flex-col items-center gap-2 shadow-card"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.2 }}
          >
            <span className="text-2xl">{stat.icon}</span>
            <span className="font-display text-3xl" style={{ color: stat.color }}>
              <AnimatedCounter value={stat.value} delay={0.8 + i * 0.2} />
            </span>
            <span className="text-xs text-text-secondary font-body text-center">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      {showBadges && earnedBadges.length > 0 && (
        <motion.div
          className="w-full max-w-md mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-center text-text-secondary text-xs uppercase tracking-wider font-heading mb-3">
            Kazanılan Rozetler
          </h3>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {earnedBadges.map((badge, i) => (
              <motion.div
                key={badge.id}
                className="flex flex-col items-center gap-1 px-4 py-3 glass rounded-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.3, type: 'spring' }}
              >
                <span className="text-3xl">{badge.icon}</span>
                <span className="text-xs font-heading font-semibold" style={{ color: badge.color }}>
                  {badge.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Buttons */}
      <motion.div
        className="flex gap-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('worldmap');
          }}
          className="px-8 py-3 bg-gradient-to-r from-green-primary to-green-deep rounded-xl text-deep font-heading font-bold tracking-wider hover:shadow-glow-green transition-all touch-target"
        >
          YENİ OTURUM
        </button>
      </motion.div>
    </motion.div>
  );
}
