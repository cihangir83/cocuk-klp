import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SoundEngine from '../utils/soundEngine';

export default function CreatureProfileScreen() {
  const { selectedCreature, selectedEcosystem, setCurrentScreen } = useGame();
  const [revealedLines, setRevealedLines] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);

  const creature = selectedCreature;
  if (!creature) return null;

  const rarityConfig = {
    'common': { label: 'COMMON', color: '#7FA8C9', bg: 'bg-surface', shadow: '' },
    'rare': { label: 'RARE', color: '#4A90D9', bg: 'bg-blue-900/20', shadow: 'shadow-card-rare' },
    'ultra-rare': { label: 'ULTRA RARE', color: '#FFD700', bg: 'bg-amber-900/10', shadow: 'shadow-card-ultra' },
  };
  const rarity = rarityConfig[creature.rarity] || rarityConfig.common;

  // Reveal superpower text line by line
  useEffect(() => {
    const words = creature.superpower.split('. ');
    const timer = setInterval(() => {
      setRevealedLines(prev => {
        if (prev >= words.length) {
          clearInterval(timer);
          setTimeout(() => setShowQuestion(true), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [creature]);

  const superpowerSentences = creature.superpower.split('. ').filter(Boolean);

  return (
    <motion.div
      className="relative w-full h-full bg-deep overflow-y-auto overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top visual area — 40% */}
      <div className="relative w-full h-[40vh] min-h-[250px] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${selectedEcosystem?.backgroundColor || '#0A2E1A'}88 0%, #070D1A 70%)`,
          }}
        />

        {/* Halo for rare */}
        {creature.rarity !== 'common' && (
          <motion.div
            className="absolute w-48 h-48 rounded-full"
            style={{
              background: `radial-gradient(circle, ${rarity.color}22 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Creature visual */}
        <motion.div
          className="relative z-10 text-8xl md:text-9xl select-none"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
        >
          {creature.silhouette}
        </motion.div>

        {/* Rarity badge */}
        <motion.div
          className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-display tracking-widest"
          style={{ backgroundColor: `${rarity.color}22`, color: rarity.color, border: `1px solid ${rarity.color}44` }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {rarity.label}
        </motion.div>

        {/* Back button */}
        <motion.button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('ecosystem');
          }}
          className="absolute top-4 left-4 z-10 glass rounded-lg px-3 py-2 text-text-secondary text-sm font-body hover:text-text-primary transition-colors touch-target"
          whileTap={{ scale: 0.95 }}
        >
          ← Geri
        </motion.button>
      </div>

      {/* Info area — 60% */}
      <div className="relative z-10 px-6 py-6 flex flex-col gap-6 max-w-2xl mx-auto">
        {/* Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-text-primary">
            {creature.name}
          </h1>
          <p className="text-text-secondary text-sm italic font-body mt-1">
            {creature.latinName}
          </p>
          {selectedEcosystem && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs">🌍</span>
              <span className="text-xs text-text-muted font-body">{selectedEcosystem.name}</span>
            </div>
          )}
        </motion.div>

        {/* Superpower */}
        <motion.div
          className="bg-card rounded-xl p-5 border border-border-subtle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-xl text-green-primary tracking-wider mb-3">
            SÜPER GÜÇ
          </h2>
          <div className="flex flex-col gap-2">
            {superpowerSentences.map((sentence, i) => (
              <motion.p
                key={i}
                className="text-text-primary text-sm font-body leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                animate={i < revealedLines ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4 }}
              >
                {sentence}{i < superpowerSentences.length - 1 ? '.' : ''}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Curiosity question */}
        <AnimatePresenceWrapper show={showQuestion}>
          <motion.div
            className="bg-card rounded-xl p-5 border border-gold/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="font-display text-xl text-gold tracking-wider mb-3"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              DÜŞÜN
            </motion.h2>
            <p className="text-text-primary text-sm font-body leading-relaxed italic">
              {creature.curiosityQuestion}
            </p>
          </motion.div>
        </AnimatePresenceWrapper>

        {/* Analogy button */}
        <motion.button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('analogy');
          }}
          className="w-full py-4 bg-gradient-to-r from-green-primary to-green-deep text-deep font-heading font-bold rounded-xl text-lg tracking-wider hover:shadow-glow-green transition-all touch-target group"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="inline-block group-hover:translate-x-1 transition-transform">
            ANALOJİYİ KEŞFEDEBİLİRSİN →
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

function AnimatePresenceWrapper({ show, children }) {
  if (!show) return null;
  return children;
}
