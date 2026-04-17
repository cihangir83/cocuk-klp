import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { getStarsInCurrentRank, getRankByPoints, ranks, rollLoot, getRandomEmote } from '../data/duel';
import SoundEngine from '../utils/soundEngine';

function StarDisplay({ count, max, color }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.span
          key={i}
          className="text-lg"
          initial={i < count ? { scale: 0, rotate: -180 } : {}}
          animate={i < count ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
          style={{ opacity: i < count ? 1 : 0.2 }}
        >
          ⭐
        </motion.span>
      ))}
    </div>
  );
}

export default function DuelResultScreen() {
  const { player, setCurrentScreen, winDuel, loseDuel, addLootReward } = useGame();
  const [showLoot, setShowLoot] = useState(false);
  const [lootReward, setLootReward] = useState(null);
  const [chestOpened, setChestOpened] = useState(false);
  const [showRankUp, setShowRankUp] = useState(false);

  // Load result
  const result = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('biyoatlas_duel_result') || '{}');
    } catch { return {}; }
  }, []);

  const won = result.won;
  const oldRankPoints = player.duel?.rankPoints || 0;

  // Process win/loss on mount
  useEffect(() => {
    if (won) {
      winDuel(result.playerScore * 25);
      SoundEngine.ultraDrop();
    } else {
      loseDuel();
      SoundEngine.wrong();
    }

    // Show loot after delay (only on win)
    if (won) {
      const timer = setTimeout(() => {
        setShowLoot(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Check for rank up
  useEffect(() => {
    if (!won) return;
    const oldRank = getRankByPoints(oldRankPoints);
    const newRank = getRankByPoints(oldRankPoints + 1); // simplified
    if (oldRank.id !== newRank.id) {
      setTimeout(() => setShowRankUp(true), 3500);
    }
  }, []);

  const rankInfo = getStarsInCurrentRank(player.duel?.rankPoints || 0);
  const isFirstWin = player.duel?.firstWinToday === new Date().toISOString().split('T')[0] &&
    player.duel?.duelsToday === 1;

  const handleOpenChest = () => {
    SoundEngine.rareDrop();
    setChestOpened(true);
    const reward = rollLoot();
    setLootReward(reward);
    addLootReward(reward);
  };

  return (
    <motion.div
      className="relative w-full h-full bg-deep overflow-y-auto flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background effects */}
      {won ? (
        <>
          {/* Victory light beams */}
          <motion.div
            className="absolute top-0 left-1/4 w-20 h-full pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(255,215,0,0.1) 0%, transparent 50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute top-0 right-1/3 w-16 h-full pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(0,200,150,0.08) 0%, transparent 40%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          {/* Victory particles */}
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FFD700', '#00C896', '#F5A623', '#9B59B6'][i % 4],
              }}
              initial={{ top: '100%', opacity: 0 }}
              animate={{
                top: `${Math.random() * 60}%`,
                opacity: [0, 1, 0],
                x: (Math.random() - 0.5) * 100,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-danger/5 to-deep pointer-events-none" />
      )}

      {/* Main result */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
      >
        {/* Victory / Defeat icon */}
        <motion.div
          className="text-7xl"
          initial={{ scale: 0, rotate: won ? -360 : 0 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 12 }}
        >
          {won ? '🏆' : '💪'}
        </motion.div>

        {/* Title */}
        <motion.h1
          className={`font-display text-4xl tracking-wider ${won ? 'text-gold' : 'text-text-secondary'}`}
          style={won ? { textShadow: '0 0 30px rgba(255,215,0,0.3)' } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {won ? 'ZAFEr!' : 'YENİLGİ'}
        </motion.h1>

        {/* Score */}
        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <p className="text-text-muted text-xs font-body">{player.name}</p>
            <p className="font-display text-3xl text-green-primary">{result.playerScore || 0}</p>
          </div>
          <span className="text-text-muted font-display text-xl">—</span>
          <div className="text-center">
            <p className="text-text-muted text-xs font-body">{result.bot?.name || 'Bot'}</p>
            <p className="font-display text-3xl text-danger">{result.botScore || 0}</p>
          </div>
        </motion.div>

        {/* Bot emote */}
        <motion.div
          className="glass rounded-xl px-4 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-text-secondary font-body italic">
            {result.bot?.avatar} "{won ? getRandomEmote('defeat') : getRandomEmote('victory')}"
          </p>
        </motion.div>

        {/* Rank progress */}
        <motion.div
          className="w-full bg-card rounded-xl p-4 border border-border-subtle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{rankInfo.rank.icon}</span>
              <span className="font-heading font-bold text-sm" style={{ color: rankInfo.rank.color }}>
                {rankInfo.rank.name}
              </span>
            </div>
            <span className="text-xs text-text-muted font-body">
              {won ? (
                <span className="text-green-primary">+{isFirstWin ? '2' : '1'} ⭐</span>
              ) : (
                player.duel?.shields > 0 ? (
                  <span className="text-gold">🛡️ Kalkan kullanıldı!</span>
                ) : (
                  <span className="text-danger">-1 ⭐</span>
                )
              )}
            </span>
          </div>
          <StarDisplay
            count={rankInfo.stars}
            max={Math.min(rankInfo.starsNeeded, 6)}
            color={rankInfo.rank.color}
          />
          {isFirstWin && won && (
            <motion.p
              className="text-gold text-xs font-heading mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              🌟 Günün ilk galibiyeti! +100 bonus puan
            </motion.p>
          )}
          {player.duel?.winStreak >= 3 && won && (
            <motion.p
              className="text-gold text-xs font-heading mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              🔥 {player.duel.winStreak} galibiyet serisi! Çift yıldız kazandın!
            </motion.p>
          )}
        </motion.div>

        {/* Loot Chest (only on win) */}
        <AnimatePresence>
          {showLoot && !chestOpened && (
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring' }}
            >
              <p className="text-gold font-heading text-sm animate-pulse">GANİMET KUTUSU!</p>
              <motion.button
                onClick={handleOpenChest}
                className="relative w-32 h-32 cursor-pointer touch-target"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img
                  src="/images/loot_chest.png"
                  alt="Ganimet Kutusu"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
              <p className="text-text-muted text-xs font-body">Açmak için tıkla!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loot reveal */}
        <AnimatePresence>
          {chestOpened && lootReward && (
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className={`
                  px-6 py-4 rounded-2xl border-2 flex items-center gap-4
                  ${lootReward.rarity === 'legendary' ? 'border-gold bg-gold/10 shadow-card-ultra' :
                    lootReward.rarity === 'epic' ? 'border-purple-400 bg-purple-400/10' :
                    lootReward.rarity === 'rare' ? 'border-blue-400 bg-blue-400/10 shadow-card-rare' :
                    'border-border-subtle bg-card'}
                `}
              >
                <motion.span
                  className="text-4xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {lootReward.icon}
                </motion.span>
                <div>
                  <p className={`font-heading font-bold text-sm ${
                    lootReward.rarity === 'legendary' ? 'text-gold' :
                    lootReward.rarity === 'epic' ? 'text-purple-400' :
                    lootReward.rarity === 'rare' ? 'text-blue-400' :
                    'text-text-primary'
                  }`}>
                    {lootReward.label}
                  </p>
                  <p className="text-[10px] text-text-muted font-body uppercase tracking-wider">
                    {lootReward.rarity === 'legendary' ? 'EFSANEVİ' :
                     lootReward.rarity === 'epic' ? 'EPİK' :
                     lootReward.rarity === 'rare' ? 'NADİR' : 'YAYGIN'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <motion.div
          className="flex gap-3 mt-4 relative z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: won ? 2 : 1.5 }}
        >
          <button
            onClick={() => {
              SoundEngine.uiClick();
              setCurrentScreen('duelmatch');
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-primary to-green-deep rounded-xl text-deep font-heading font-bold text-sm hover:shadow-glow-green transition-all touch-target"
          >
            {won ? 'TEKRAR DÜELLO!' : 'RÖVANŞ!'}
          </button>
          <button
            onClick={() => {
              SoundEngine.uiClick();
              setCurrentScreen('worldmap');
            }}
            className="px-6 py-3 glass rounded-xl text-text-secondary text-sm font-heading hover:text-text-primary transition-colors touch-target"
          >
            HARİTAYA DÖN
          </button>
        </motion.div>
      </motion.div>

      {/* Rank Up overlay */}
      <AnimatePresence>
        {showRankUp && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRankUp(false)}
          >
            <motion.div
              className="glass rounded-2xl p-8 text-center max-w-sm"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring' }}
              onClick={e => e.stopPropagation()}
            >
              <motion.span
                className="text-6xl block mb-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                {rankInfo.rank.icon}
              </motion.span>
              <h2 className="font-display text-3xl text-gold mb-2">RANK ATLADIN!</h2>
              <p className="font-heading font-bold text-lg" style={{ color: rankInfo.rank.color }}>
                {rankInfo.rank.name}
              </p>
              <button
                onClick={() => setShowRankUp(false)}
                className="mt-4 px-6 py-2 bg-gold/20 rounded-xl text-gold font-heading text-sm touch-target"
              >
                Harika! 🎉
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
