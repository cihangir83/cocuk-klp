import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SoundEngine from '../utils/soundEngine';

const ecosystemBackgrounds = {
  amazon: { gradient: 'from-emerald-900/30 via-green-900/20 to-deep', emoji: '🌿' },
  sahara: { gradient: 'from-amber-900/30 via-orange-900/20 to-deep', emoji: '🏜️' },
  arctic: { gradient: 'from-cyan-900/30 via-blue-900/20 to-deep', emoji: '🧊' },
  deep_ocean: { gradient: 'from-blue-950/50 via-indigo-900/20 to-deep', emoji: '🌊' },
  blacksea_forests: { gradient: 'from-green-900/30 via-emerald-900/20 to-deep', emoji: '🌲' },
  indian_monsoon: { gradient: 'from-purple-900/30 via-violet-900/20 to-deep', emoji: '🌧️' },
  african_savanna: { gradient: 'from-orange-900/30 via-amber-900/20 to-deep', emoji: '🦁' },
  australia: { gradient: 'from-red-900/30 via-orange-900/20 to-deep', emoji: '🦘' },
};

function CreatureCard({ creature, index, isDiscovered, onFlip }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    if (isDiscovered && !flipped) {
      setFlipped(true);
      SoundEngine.cardFlip();
      setTimeout(() => onFlip(creature), 800);
      return;
    }
    if (!isDiscovered) {
      setFlipped(true);
      SoundEngine.cardFlip();
      setTimeout(() => onFlip(creature), 800);
    }
  };

  const rarityStyle = {
    'common': { border: 'border-border-subtle', glow: '', label: 'YAYGIN', color: 'text-text-secondary' },
    'rare': { border: 'border-blue-500/50', glow: 'shadow-card-rare', label: 'NADİR', color: 'text-blue-400' },
    'ultra-rare': { border: 'border-gold-shimmer/50', glow: 'shadow-card-ultra', label: 'EFSANEVİ', color: 'text-gold-shimmer' },
  };

  const style = rarityStyle[creature.rarity] || rarityStyle.common;

  return (
    <motion.div
      className="card-flip-container w-full aspect-[3/4] cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={handleClick}
    >
      <div className={`card-flip-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
        {/* Front — Mystery */}
        <div className={`card-flip-front w-full h-full rounded-xl bg-card ${style.border} border-2 flex flex-col items-center justify-center gap-4 ${style.glow}`}>
          <motion.div
            className="text-5xl opacity-30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {creature.silhouette}
          </motion.div>
          <div className="text-3xl text-text-muted">?</div>
          <div className="text-xs text-text-muted font-body">Keşfetmek için tıkla</div>
        </div>

        {/* Back — Revealed */}
        <div className={`card-flip-back w-full h-full rounded-xl bg-card ${style.border} border-2 flex flex-col items-center justify-center gap-3 p-4 ${creature.rarity === 'ultra-rare' ? 'ultra-rare-shimmer' : creature.rarity === 'rare' ? 'holo-card active' : ''} ${style.glow}`}>
          <div className={`text-[10px] font-display uppercase tracking-widest ${style.color}`}>
            {style.label}
          </div>
          <div className="text-4xl">{creature.silhouette}</div>
          <h3 className="font-heading font-bold text-sm text-text-primary text-center">
            {creature.name}
          </h3>
          <p className="text-[10px] text-text-secondary italic font-body">
            {creature.latinName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function EcosystemScreen() {
  const {
    player, selectedEcosystem, setCurrentScreen,
    setSelectedCreature, discoverCreature, updateQuestProgress, addScore
  } = useGame();
  const [entering, setEntering] = useState(true);

  const eco = selectedEcosystem;
  if (!eco) return null;

  const bg = ecosystemBackgrounds[eco.id] || ecosystemBackgrounds.amazon;

  const handleCreatureFlip = (creature) => {
    const wasDiscovered = player.discoveredCreatures.includes(creature.id);

    if (!wasDiscovered) {
      discoverCreature(creature.id);
      addScore(creature.rarity === 'ultra-rare' ? 100 : creature.rarity === 'rare' ? 50 : 25);
      updateQuestProgress('discover', eco.id);

      if (creature.rarity === 'rare') {
        SoundEngine.rareDrop();
        updateQuestProgress('rarity', 'rare');
      } else if (creature.rarity === 'ultra-rare') {
        SoundEngine.ultraDrop();
        updateQuestProgress('rarity', 'ultra-rare');
      } else {
        SoundEngine.discovery();
      }
    }

    setTimeout(() => {
      setSelectedCreature(creature);
      setCurrentScreen('creature');
    }, 500);
  };

  return (
    <motion.div
      className={`relative w-full h-full bg-deep overflow-hidden`}
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${bg.gradient}`} />

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-6 px-6 flex items-center justify-between">
        <motion.button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('worldmap');
          }}
          className="glass rounded-lg px-4 py-2 text-text-secondary text-sm font-body hover:text-text-primary transition-colors touch-target"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Harita
        </motion.button>

        <motion.div
          className="flex flex-col items-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="font-heading font-bold text-lg md:text-xl" style={{ color: eco.color }}>
            {eco.name}
          </h1>
          <p className="text-text-secondary text-xs font-body">{eco.description}</p>
        </motion.div>
      </div>

      {/* Large ecosystem emoji */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[200px] opacity-[0.05] select-none pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        {bg.emoji}
      </motion.div>

      {/* Creature cards */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 mt-4">
        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-lg">
          {eco.creatures.map((creature, i) => (
            <CreatureCard
              key={creature.id}
              creature={creature}
              index={i}
              isDiscovered={player.discoveredCreatures.includes(creature.id)}
              onFlip={handleCreatureFlip}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
