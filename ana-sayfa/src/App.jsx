import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './components/StarField';
import CinematicIntro from './components/CinematicIntro';
import GameCard from './components/GameCard';
import { GAMES } from './data/games';
import './index.css';

const STORAGE_KEY = 'klp-progress';

function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completed: [], showIntro: true };
  } catch {
    return { completed: [], showIntro: true };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function Header({ completedCount, totalCount, onReset }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(3, 5, 16, 0.9), transparent)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: 24 }}
        >
          🧬
        </motion.div>
        <div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: 'var(--color-text-primary)',
          }}>
            KEŞİF YOLCULUĞU
          </h2>
          <p className="font-body" style={{
            fontSize: 11,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.05em',
          }}>
            Bio-TRIZ Öğrenme Platformu
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Progress indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex',
            gap: 4,
          }}>
            {Array.from({ length: totalCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                style={{
                  width: i < completedCount ? 24 : 16,
                  height: 4,
                  borderRadius: 2,
                  background: i < completedCount
                    ? GAMES[i].color
                    : 'rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.5s ease',
                }}
              />
            ))}
          </div>
          <span className="font-body" style={{
            fontSize: 12,
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
          }}>
            {completedCount}/{totalCount}
          </span>
        </div>

        {/* Reset button */}
        <motion.button
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="font-body"
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(255, 255, 255, 0.03)',
            color: 'var(--color-text-muted)',
            fontSize: 11,
            cursor: 'pointer',
            letterSpacing: '0.05em',
            opacity: 0.6,
          }}
        >
          Sıfırla
        </motion.button>
      </div>
    </motion.header>
  );
}

function WarpTransition({ game, onAnimationComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#030510',
      }}
    >
      {/* Warp lines */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i / 60) * 360;
        const length = 100 + Math.random() * 200;
        return (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.2, delay: i * 0.01, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              width: length,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${game.color}, transparent)`,
              transformOrigin: 'center center',
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}

      {/* Center flash */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 3, 80], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: 'easeIn', delay: 0.5 }}
        onAnimationComplete={onAnimationComplete}
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: game.color,
          boxShadow: `0 0 60px ${game.color}, 0 0 120px ${game.color}`,
        }}
      />

      {/* Game title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ position: 'absolute', zIndex: 10, textAlign: 'center' }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>{game.emoji}</div>
        <h2 className="font-display" style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 900,
          letterSpacing: '0.15em',
          color: game.color,
          textShadow: `0 0 30px ${game.color}80`,
        }}>
          {game.title}
        </h2>
        <p className="font-body" style={{
          fontSize: 14,
          color: 'var(--color-text-secondary)',
          marginTop: 8,
          letterSpacing: '0.1em',
        }}>
          Yükleniyor...
        </p>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [progress, setProgress] = useState(getProgress);
  const [showIntro, setShowIntro] = useState(progress.showIntro !== false);
  const [launchingGame, setLaunchingGame] = useState(null);

  const completedSet = new Set(progress.completed);
  const completedCount = progress.completed.length;

  const isGameUnlocked = useCallback((game) => {
    return true; // Her zaman açık olsun
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    const newProgress = { ...progress, showIntro: false };
    setProgress(newProgress);
    saveProgress(newProgress);
  }, [progress]);

  const handleCompleteGame = useCallback((gameId) => {
    if (completedSet.has(gameId)) return;
    const newCompleted = [...progress.completed, gameId];
    const newProgress = { ...progress, completed: newCompleted };
    setProgress(newProgress);
    saveProgress(newProgress);
  }, [progress, completedSet]);

  const handleLaunchGame = useCallback((game) => {
    setLaunchingGame(game);
  }, []);

  const handleWarpComplete = useCallback(() => {
    if (launchingGame) {
      // Navigate to game
      window.location.href = launchingGame.path;
    }
  }, [launchingGame]);

  const handleReset = useCallback(() => {
    const newProgress = { completed: [], showIntro: false };
    setProgress(newProgress);
    saveProgress(newProgress);
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <StarField />

      <AnimatePresence>
        {showIntro && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {launchingGame && (
          <WarpTransition game={launchingGame} onAnimationComplete={handleWarpComplete} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <Header
            completedCount={completedCount}
            totalCount={GAMES.length}
            onReset={handleReset}
          />

          <main style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1400,
            margin: '0 auto',
            padding: '100px 32px 80px',
          }}>
            {/* Hero section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ textAlign: 'center', marginBottom: 64 }}
            >
              <h1 className="font-display shimmer-text" style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                fontWeight: 900,
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}>
                KEŞİF YOLCULUĞU
              </h1>
              <p className="font-body" style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                color: 'var(--color-text-secondary)',
                maxWidth: 600,
                margin: '0 auto',
                lineHeight: 1.7,
              }}>
                Doğanın milyarlarca yıllık bilgeliğini keşfet. Her görev seni bir adım daha ileriye taşır.
              </p>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  width: 'min(400px, 80%)',
                  height: 3,
                  margin: '24px auto 0',
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.06)',
                  overflow: 'hidden',
                  transformOrigin: 'center',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / GAMES.length) * 100}%` }}
                  transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #A78BFA, #FFD700)',
                    boxShadow: '0 0 10px rgba(167, 139, 250, 0.5)',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Game cards grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24,
              maxWidth: 1200,
              margin: '0 auto',
            }}>
              {GAMES.map((game, index) => (
                <GameCard
                  key={game.id}
                  game={game}
                  index={index}
                  isUnlocked={isGameUnlocked(game)}
                  isCompleted={completedSet.has(game.id)}
                  onLaunch={handleLaunchGame}
                  onComplete={handleCompleteGame}
                />
              ))}
            </div>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                textAlign: 'center',
                marginTop: 64,
                padding: '24px 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              <p className="font-body" style={{
                fontSize: 12,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.05em',
              }}>
                Bio-TRIZ Öğrenme Platformu — Muğla Sıtkı Koçman Üniversitesi
              </p>
            </motion.div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
