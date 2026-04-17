import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ecosystems } from '../data/ecosystems';
import { getStarsInCurrentRank } from '../data/duel';
import SoundEngine from '../utils/soundEngine';

const rarityConfig = {
  'common': { gradient: 'from-[#4A6B82] to-[#2C4A5E]', border: '#7FA8C9', glow: '', label: 'YAYGIN', labelColor: '#7FA8C9' },
  'rare': { gradient: 'from-[#2A5DB0] to-[#1A3A7A]', border: '#4A90D9', glow: 'shadow-card-rare', label: 'NADİR', labelColor: '#4A90D9' },
  'ultra-rare': { gradient: 'from-[#B8860B] to-[#8B6914]', border: '#FFD700', glow: 'shadow-card-ultra', label: 'EFSANEVİ', labelColor: '#FFD700' },
};

function HearthstoneCard({ creature, card, discovered, ecosystem, onClick }) {
  const [hovered, setHovered] = useState(false);
  const rarity = rarityConfig[creature.rarity] || rarityConfig.common;

  if (!card) {
    // Locked/undiscovered card
    return (
      <motion.div
        className="relative rounded-xl overflow-hidden cursor-default"
        style={{
          aspectRatio: '2.5/3.5',
          background: 'linear-gradient(180deg, #0A1420 0%, #0F1E2E 100%)',
          border: '2px solid rgba(30,58,95,0.3)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          {discovered ? (
            <>
              <motion.span
                className="text-3xl opacity-30"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {creature.silhouette}
              </motion.span>
              <p className="text-[9px] text-text-muted/50 font-body text-center px-2">
                Keşfedildi — Analoji bekleniyor
              </p>
            </>
          ) : (
            <>
              <span className="text-2xl opacity-10">❓</span>
              <p className="text-[8px] text-text-muted/30 font-body">{ecosystem.name}</p>
            </>
          )}
        </div>
        {/* Subtle cross pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 9px)',
        }} />
      </motion.div>
    );
  }

  // Collected card — Hearthstone style
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden cursor-pointer ${rarity.glow}`}
      style={{
        aspectRatio: '2.5/3.5',
        border: `2px solid ${rarity.border}`,
      }}
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      whileHover={{ scale: 1.08, y: -8, zIndex: 20 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => { setHovered(true); SoundEngine.uiHover(); }}
      onHoverEnd={() => setHovered(false)}
      onClick={() => { SoundEngine.cardFlip(); onClick(creature, card); }}
    >
      {/* Card background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${rarity.gradient}`} />

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${rarity.border}, transparent)` }} />

      {/* Creature portrait area */}
      <div className="relative h-[45%] flex items-center justify-center overflow-hidden">
        {/* Radial glow behind creature */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at center, ${rarity.border}20 0%, transparent 70%)`,
        }} />
        <motion.span
          className="text-5xl relative z-10 drop-shadow-lg"
          animate={hovered ? { scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] } : {}}
          transition={{ duration: 0.6 }}
        >
          {creature.silhouette}
        </motion.span>
      </div>

      {/* Divider line */}
      <div className="relative mx-3">
        <div className="h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${rarity.border}80, transparent)` }} />
        {/* Gem/diamond on center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
          style={{ background: rarity.border, boxShadow: `0 0 8px ${rarity.border}60` }}
        />
      </div>

      {/* Card info */}
      <div className="relative px-3 pt-3 pb-2 flex flex-col items-center gap-1">
        {/* Rarity label */}
        <span className="text-[7px] font-display tracking-[0.2em] uppercase" style={{ color: rarity.labelColor }}>
          {rarity.label}
        </span>

        {/* Name */}
        <h4 className="font-heading font-bold text-[11px] text-text-primary text-center leading-tight">
          {creature.name}
        </h4>

        {/* Problem match */}
        <p className="text-[8px] text-text-secondary/70 font-body text-center">
          × {card.problemLabel}
        </p>

        {/* Stats bar */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[8px] text-gold font-display">+{card.points || 50}</span>
        </div>
      </div>

      {/* Corner rarity indicator */}
      {creature.rarity !== 'common' && (
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: `${rarity.border}30`, border: `1px solid ${rarity.border}60` }}
        >
          <span className="text-[8px]">{creature.rarity === 'ultra-rare' ? '💎' : '✦'}</span>
        </div>
      )}

      {/* Holographic overlay for rare+ */}
      {creature.rarity !== 'common' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 30%, ${rarity.border}10 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
          }}
          animate={hovered ? { backgroundPosition: ['0% 0%', '100% 100%'] } : {}}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  );
}

function CardDetail({ creature, card, onClose }) {
  const rarity = rarityConfig[creature.rarity] || rarityConfig.common;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`relative w-72 max-w-[90vw] rounded-2xl overflow-hidden ${rarity.glow}`}
        style={{
          border: `2px solid ${rarity.border}`,
          background: `linear-gradient(180deg, #162438 0%, #0F1E2E 100%)`,
        }}
        initial={{ scale: 0.5, rotateY: -30 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Shimmer border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${rarity.border}30, transparent, ${rarity.border}30, transparent)`,
            opacity: 0.4,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-10 p-5">
          {/* Portrait */}
          <div className="w-full h-36 rounded-xl flex items-center justify-center mb-3 relative overflow-hidden"
            style={{ background: `radial-gradient(ellipse, ${rarity.border}15 0%, #0F1E2E 70%)` }}
          >
            <span className="text-6xl">{creature.silhouette}</span>
          </div>

          {/* Rarity */}
          <div className="text-center mb-1">
            <span className="text-[9px] font-display tracking-[0.3em] uppercase" style={{ color: rarity.labelColor }}>
              {rarity.label}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading font-bold text-center text-base text-text-primary">{creature.name}</h2>
          <p className="text-[10px] text-text-muted font-body text-center italic">{creature.latinName}</p>

          {/* Analogy text */}
          <p className="text-xs text-text-secondary font-body text-center leading-relaxed mt-3 px-2">
            {card.analogyText || creature.analogyText}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle/30">
            <span className="text-[9px] text-text-muted font-body">{card.playerName}</span>
            <span className="text-gold text-[10px] font-display">+{card.points || 50} puan</span>
            <span className="text-[9px] text-text-muted font-body">{new Date(card.date).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AtlasCollectionScreen() {
  const { player, setCurrentScreen } = useGame();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [detailCard, setDetailCard] = useState(null);

  const totalCards = ecosystems.reduce((sum, e) => sum + e.creatures.length, 0);
  const rankInfo = getStarsInCurrentRank(player.duel?.rankPoints || 0);

  const allCreatureSlots = ecosystems.flatMap(eco =>
    eco.creatures.map(creature => ({
      creature,
      ecosystem: eco,
      card: player.analogyCards.find(c => c.creatureId === creature.id),
      discovered: player.discoveredCreatures.includes(creature.id),
    }))
  );

  const filteredSlots = selectedFilter === 'all'
    ? allCreatureSlots
    : allCreatureSlots.filter(s => s.ecosystem.id === selectedFilter);

  const filters = [
    { id: 'all', name: 'Tümü', icon: '🌍' },
    ...ecosystems.map(e => ({ id: e.id, name: e.name.split(' ')[0], icon: e.icon || '🌿' })),
  ];

  return (
    <motion.div
      className="relative w-full h-full bg-deep overflow-hidden flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between relative z-20">
        <button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('worldmap');
          }}
          className="glass rounded-lg px-3 py-2 text-text-secondary text-sm font-body hover:text-text-primary transition-colors touch-target"
        >
          ← Harita
        </button>

        <div className="flex flex-col items-center">
          <h1 className="font-display text-2xl text-gold tracking-wider">KOLEKSİYON</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-secondary font-body">
              {player.analogyCards.length}/{totalCards}
            </span>
            <div className="w-24 h-1.5 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-primary to-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(player.analogyCards.length / totalCards) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">{rankInfo.rank.icon}</span>
          <span className="font-display text-xs" style={{ color: rankInfo.rank.color }}>
            {rankInfo.rank.name}
          </span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-4 pb-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max">
          {filters.map(f => {
            const isActive = selectedFilter === f.id;
            const count = f.id === 'all'
              ? player.analogyCards.length
              : player.analogyCards.filter(c => c.ecosystemId === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => {
                  SoundEngine.uiClick();
                  setSelectedFilter(f.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-heading transition-all touch-target whitespace-nowrap ${
                  isActive
                    ? 'bg-green-primary/20 text-green-primary border border-green-primary/40'
                    : 'bg-surface/50 text-text-muted hover:text-text-secondary border border-transparent'
                }`}
              >
                {f.name} {count > 0 && <span className="text-gold ml-1">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card grid — Hearthstone collection layout */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 py-3">
          {filteredSlots.map((slot, i) => (
            <HearthstoneCard
              key={slot.creature.id}
              creature={slot.creature}
              card={slot.card}
              discovered={slot.discovered}
              ecosystem={slot.ecosystem}
              onClick={(creature, card) => setDetailCard({ creature, card })}
            />
          ))}
        </div>

        {filteredSlots.length === 0 && (
          <div className="flex items-center justify-center h-40 text-text-muted text-sm font-body">
            Bu filtrede kart bulunamadı
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="px-4 py-2 flex items-center justify-center gap-4 border-t border-border-subtle/20">
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-text-muted font-body">Yaygın</span>
          <span className="text-xs text-text-secondary font-display">
            {player.analogyCards.filter(c => {
              const cr = ecosystems.flatMap(e => e.creatures).find(cc => cc.id === c.creatureId);
              return cr?.rarity === 'common';
            }).length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-body" style={{ color: '#4A90D9' }}>Nadir</span>
          <span className="text-xs font-display" style={{ color: '#4A90D9' }}>
            {player.analogyCards.filter(c => {
              const cr = ecosystems.flatMap(e => e.creatures).find(cc => cc.id === c.creatureId);
              return cr?.rarity === 'rare';
            }).length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-body" style={{ color: '#FFD700' }}>Efsanevi</span>
          <span className="text-xs font-display" style={{ color: '#FFD700' }}>
            {player.analogyCards.filter(c => {
              const cr = ecosystems.flatMap(e => e.creatures).find(cc => cc.id === c.creatureId);
              return cr?.rarity === 'ultra-rare';
            }).length}
          </span>
        </div>
      </div>

      {/* Card detail modal */}
      <AnimatePresence>
        {detailCard && (
          <CardDetail
            creature={detailCard.creature}
            card={detailCard.card}
            onClose={() => setDetailCard(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
