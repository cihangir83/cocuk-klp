import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============ FLYING GOLD COIN ANIMATION ============
// Uçan altın animasyonu — puan kazanıldığında ekranda belirir ve HUD'a uçar

let coinIdCounter = 0;

export function GoldCoinProvider({ children, goldCount }) {
  const [coins, setCoins] = useState([]);
  const targetRef = useRef(null);

  const addCoins = useCallback((amount, sourceX, sourceY) => {
    const numCoins = Math.min(amount, 8); // Max 8 coin animation
    const newCoins = Array.from({ length: numCoins }).map((_, i) => ({
      id: ++coinIdCounter,
      x: sourceX || window.innerWidth / 2,
      y: sourceY || window.innerHeight / 2,
      delay: i * 0.08,
    }));
    setCoins(prev => [...prev, ...newCoins]);

    // Clean up after animation
    setTimeout(() => {
      setCoins(prev => prev.filter(c => !newCoins.find(nc => nc.id === c.id)));
    }, 2000);
  }, []);

  return (
    <>
      {children}

      {/* Gold HUD — always visible when gold > 0 */}
      <div
        ref={targetRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(15,30,46,0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(245,166,35,0.3)',
        }}
      >
        <span className="text-lg">🪙</span>
        <motion.span
          className="font-display text-xl text-gold"
          key={goldCount}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {goldCount || 0}
        </motion.span>
      </div>

      {/* Flying coins */}
      <div className="fixed inset-0 z-[99] pointer-events-none">
        <AnimatePresence>
          {coins.map(coin => (
            <motion.div
              key={coin.id}
              className="absolute text-2xl"
              initial={{
                x: coin.x - 12,
                y: coin.y - 12,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: window.innerWidth / 2 - 12,
                y: 16,
                scale: [0, 1.3, 0.8],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.8,
                delay: coin.delay,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              🪙
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

// Hook for components to trigger coin animation
let globalAddCoins = null;

export function useGoldCoins() {
  return {
    triggerCoins: (amount, x, y) => {
      if (globalAddCoins) globalAddCoins(amount, x, y);
    }
  };
}

export function GoldCoinManager({ children, goldCount }) {
  const [coins, setCoins] = useState([]);

  globalAddCoins = useCallback((amount, sourceX, sourceY) => {
    const numCoins = Math.min(amount, 10);
    const newCoins = Array.from({ length: numCoins }).map((_, i) => ({
      id: ++coinIdCounter,
      x: (sourceX || window.innerWidth / 2) + (Math.random() - 0.5) * 40,
      y: (sourceY || window.innerHeight / 2) + (Math.random() - 0.5) * 40,
      delay: i * 0.06,
    }));
    setCoins(prev => [...prev, ...newCoins]);
    setTimeout(() => {
      setCoins(prev => prev.filter(c => !newCoins.find(nc => nc.id === c.id)));
    }, 2000);
  }, []);

  return (
    <>
      {children}

      {/* Gold counter HUD */}
      <motion.div
        className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1.5 px-4 py-2 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(15,30,46,0.9) 0%, rgba(30,58,95,0.8) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(245,166,35,0.4)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 15px rgba(245,166,35,0.1)',
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="text-xl"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          🪙
        </motion.span>
        <motion.span
          className="font-display text-xl text-gold min-w-[40px] text-center"
          key={goldCount}
          initial={{ scale: 1.8, color: '#FFD700' }}
          animate={{ scale: 1, color: '#F5A623' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {goldCount || 0}
        </motion.span>
      </motion.div>

      {/* Flying coins */}
      <div className="fixed inset-0 z-[99] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {coins.map(coin => (
            <motion.div
              key={coin.id}
              className="absolute"
              style={{ fontSize: '24px' }}
              initial={{
                x: coin.x - 12,
                y: coin.y - 12,
                scale: 0,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                x: [coin.x - 12, coin.x - 12 + (Math.random() - 0.5) * 60, window.innerWidth / 2 - 12],
                y: [coin.y - 12, coin.y - 50, 20],
                scale: [0, 1.4, 0.6],
                opacity: [0, 1, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 0.9,
                delay: coin.delay,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              🪙
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

// ============ AMBIENT MUSIC ENGINE ============
// Her ekosisteme özel programatik ambient müzik

let ambientCtx = null;
let ambientNodes = [];
let currentAmbient = null;

function getAmbientContext() {
  if (!ambientCtx) {
    ambientCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ambientCtx.state === 'suspended') {
    ambientCtx.resume();
  }
  return ambientCtx;
}

function stopAmbient() {
  ambientNodes.forEach(node => {
    try { node.stop(); } catch {}
    try { node.disconnect(); } catch {}
  });
  ambientNodes = [];
  currentAmbient = null;
}

function createDrone(ctx, frequency, volume = 0.03) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Slow modulation
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.2, ctx.currentTime);
  lfoGain.gain.setValueAtTime(2, ctx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  lfo.start();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start();

  ambientNodes.push(osc, lfo);
  return { osc, gain };
}

const ambientProfiles = {
  amazon: { notes: [110, 165, 220], color: 'warm', tempo: 'slow' },
  sahara: { notes: [130, 195, 260], color: 'dry', tempo: 'very-slow' },
  arctic: { notes: [220, 330, 440], color: 'cold', tempo: 'glacial' },
  deep_ocean: { notes: [82, 123, 165], color: 'deep', tempo: 'slow' },
  blacksea_forests: { notes: [147, 220, 294], color: 'lush', tempo: 'medium' },
  indian_monsoon: { notes: [165, 247, 330], color: 'tropical', tempo: 'medium' },
  african_savanna: { notes: [130, 196, 262], color: 'warm', tempo: 'rhythmic' },
  australia: { notes: [110, 147, 196], color: 'arid', tempo: 'slow' },
  worldmap: { notes: [130, 196, 262, 330], color: 'epic', tempo: 'medium' },
  duel: { notes: [110, 165, 220, 330], color: 'intense', tempo: 'fast' },
};

export function startAmbientMusic(sceneId) {
  if (currentAmbient === sceneId) return;
  stopAmbient();

  try {
    const ctx = getAmbientContext();
    const profile = ambientProfiles[sceneId] || ambientProfiles.worldmap;

    profile.notes.forEach((note, i) => {
      createDrone(ctx, note, 0.015 + i * 0.005);
    });

    currentAmbient = sceneId;
  } catch (e) {
    // Audio not available
  }
}

export { stopAmbient };
