import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { getRandomBot, getRankByPoints, getStarsInCurrentRank, botDifficulty } from '../data/duel';
import SoundEngine from '../utils/soundEngine';

export default function DuelMatchScreen() {
  const { player, setCurrentScreen, setPlayer } = useGame();
  const [phase, setPhase] = useState('searching'); // searching → found → countdown → start
  const [bot, setBot] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [searchDots, setSearchDots] = useState('');

  const playerRank = getStarsInCurrentRank(player.duel?.rankPoints || 0);
  const difficulty = playerRank.rank.botDifficulty;
  const diffConfig = botDifficulty[difficulty];

  useEffect(() => {
    const selectedBot = getRandomBot();
    setBot(selectedBot);

    // Search animation
    const dotTimer = setInterval(() => {
      setSearchDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // After 2-3 seconds, "find" opponent
    const findTimer = setTimeout(() => {
      setPhase('found');
      SoundEngine.rareDrop();
      clearInterval(dotTimer);
    }, 2000 + Math.random() * 1000);

    return () => {
      clearInterval(dotTimer);
      clearTimeout(findTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === 'found') {
      const timer = setTimeout(() => setPhase('countdown'), 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'countdown') {
      if (countdown <= 0) {
        setPhase('start');
        return;
      }
      SoundEngine.uiClick();
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase === 'start') {
      SoundEngine.discovery();
      // Store bot info in player temporarily for duel screen
      setTimeout(() => {
        setCurrentScreen('duelarena');
      }, 500);
    }
  }, [phase]);

  // Store bot for duel arena
  useEffect(() => {
    if (bot) {
      sessionStorage.setItem('biyoatlas_duel_bot', JSON.stringify({
        ...bot,
        difficulty,
        diffConfig,
        rank: playerRank.rank
      }));
    }
  }, [bot, difficulty]);

  return (
    <motion.div
      className="relative w-full h-full bg-deep overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/images/duel_arena.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/50 via-transparent to-deep" />

      {/* Searching phase */}
      <AnimatePresence mode="wait">
        {phase === 'searching' && (
          <motion.div
            key="search"
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {/* Player avatar */}
            <motion.div
              className="w-24 h-24 rounded-full bg-card border-2 border-green-primary flex items-center justify-center text-4xl shadow-glow-green"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {player.avatar}
            </motion.div>
            <div className="text-center">
              <h2 className="font-heading font-bold text-lg text-text-primary">{player.name}</h2>
              <div className="flex items-center gap-2 justify-center mt-1">
                <span>{playerRank.rank.icon}</span>
                <span className="font-display text-sm" style={{ color: playerRank.rank.color }}>
                  {playerRank.rank.name}
                </span>
              </div>
            </div>

            {/* Searching text */}
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-16 h-16 border-4 border-green-primary/30 border-t-green-primary rounded-full animate-spin" />
              <p className="text-text-secondary font-body text-sm">Rakip aranıyor{searchDots}</p>
            </motion.div>

            {/* Back button */}
            <button
              onClick={() => {
                SoundEngine.uiClick();
                setCurrentScreen('worldmap');
              }}
              className="mt-4 px-4 py-2 glass rounded-lg text-text-muted text-xs font-body touch-target"
            >
              İptal
            </button>
          </motion.div>
        )}

        {/* Found phase — VS screen */}
        {phase === 'found' && bot && (
          <motion.div
            key="found"
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-8 md:gap-16">
              {/* Player */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-card border-2 border-green-primary flex items-center justify-center text-3xl shadow-glow-green">
                  {player.avatar}
                </div>
                <span className="font-heading font-bold text-sm text-text-primary">{player.name}</span>
              </motion.div>

              {/* VS */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <span className="font-display text-5xl text-danger" style={{ textShadow: '0 0 30px rgba(232,69,69,0.5)' }}>
                  ⚔️
                </span>
                <span className="font-display text-2xl text-gold mt-1">VS</span>
              </motion.div>

              {/* Bot */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="w-20 h-20 rounded-full bg-card border-2 flex items-center justify-center text-3xl"
                  style={{ borderColor: diffConfig.color, boxShadow: `0 0 20px ${diffConfig.color}40` }}
                >
                  {bot.avatar}
                </div>
                <span className="font-heading font-bold text-sm text-text-primary">{bot.name}</span>
                <span className="text-[10px] font-display" style={{ color: diffConfig.color }}>
                  {diffConfig.label}
                </span>
              </motion.div>
            </div>

            <motion.p
              className="text-gold font-display text-lg tracking-wider mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              RAKİP BULUNDU!
            </motion.p>
          </motion.div>
        )}

        {/* Countdown phase */}
        {phase === 'countdown' && (
          <motion.div
            key="countdown"
            className="relative z-10 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={countdown}
                className="font-display text-8xl text-gold"
                style={{ textShadow: '0 0 40px rgba(255,215,0,0.5)' }}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {countdown > 0 ? countdown : '⚔️'}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Energy particles */}
      {(phase === 'found' || phase === 'countdown') && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 2 === 0 ? '#00C896' : '#FFD700',
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
