import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SoundEngine from '../utils/soundEngine';

export default function AnalogyCardScreen() {
  const { player, setCurrentScreen } = useGame();

  const card = player.analogyCards.length > 0
    ? player.analogyCards[player.analogyCards.length - 1]
    : null;

  const rarityConfig = {
    'common': { border: 'border-text-muted', shimmer: '', color: '#7FA8C9', label: 'YAYGIN' },
    'rare': { border: 'border-blue-400', shimmer: 'holo-card active', color: '#4A90D9', label: 'NADİR' },
    'ultra-rare': { border: 'border-gold-shimmer', shimmer: 'ultra-rare-shimmer', color: '#FFD700', label: 'EFSANEVİ' },
  };
  const rarity = card ? (rarityConfig[card.rarity] || rarityConfig.common) : rarityConfig.common;

  useEffect(() => {
    if (!card) return;
    if (card.rarity === 'ultra-rare') {
      SoundEngine.ultraDrop();
    } else if (card.rarity === 'rare') {
      SoundEngine.rareDrop();
    } else {
      SoundEngine.badgeEarn();
    }
  }, [card]);

  if (!card) {
    return (
      <div className="w-full h-full bg-deep flex items-center justify-center">
        <button
          onClick={() => setCurrentScreen('worldmap')}
          className="px-6 py-3 bg-gradient-to-r from-green-primary to-green-deep rounded-xl text-deep font-heading font-bold"
        >
          HARITAYA DÖN
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full h-full bg-deep flex flex-col items-center justify-center overflow-y-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Light beam from top — pointer-events-none to not block clicks */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-full pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${rarity.color}15 0%, transparent 60%)`,
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Card */}
      <motion.div
        className={`relative w-80 max-w-[90vw] rounded-2xl overflow-hidden ${rarity.border} border-2 ${rarity.shimmer} shadow-card`}
        style={{ background: 'linear-gradient(180deg, #162438 0%, #0F1E2E 100%)' }}
        initial={{ scale: 0.3, y: 100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Rotating border shimmer — pointer-events-none */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${rarity.color}33, transparent, ${rarity.color}33, transparent)`,
            opacity: 0.5,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-10 p-5">
          {/* Top — creature visual area */}
          <div
            className="w-full h-40 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at center, ${rarity.color}15 0%, #0F1E2E 70%)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/50" />
            <span className="text-6xl relative z-10">{card.creatureSilhouette}</span>
          </div>

          {/* Rarity label */}
          <div className="text-center mb-2">
            <span
              className="text-[10px] font-display tracking-[0.3em] uppercase"
              style={{ color: rarity.color }}
            >
              {rarity.label}
            </span>
          </div>

          {/* Card title */}
          <h2 className="font-heading font-bold text-center text-base text-text-primary mb-1">
            {card.creatureName} × {card.problemLabel}
          </h2>

          {/* Analogy text */}
          <p className="text-xs text-text-secondary font-body text-center leading-relaxed mt-3 px-2">
            {card.analogyText}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle/30">
            <span className="text-[9px] text-text-muted font-body">
              {card.playerName}
            </span>
            <span className="text-[9px] text-text-muted font-body">
              {new Date(card.date).toLocaleDateString('tr-TR')}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Added text */}
      <motion.p
        className="text-text-secondary text-sm font-body mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        ATLASA EKLENDİ
      </motion.p>

      {/* Buttons — z-50 to ensure clickability */}
      <motion.div
        className="flex gap-4 mt-6 relative z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('atlas');
          }}
          className="px-6 py-3 glass rounded-xl text-text-secondary text-sm font-heading hover:text-text-primary transition-colors touch-target cursor-pointer"
        >
          ATLAŞIMI GÖR
        </button>
        <button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('worldmap');
          }}
          className="px-6 py-3 bg-gradient-to-r from-green-primary to-green-deep rounded-xl text-deep font-heading font-bold text-sm hover:shadow-glow-green transition-all touch-target cursor-pointer"
        >
          KEŞFE DEVAM ET
        </button>
      </motion.div>
    </motion.div>
  );
}
