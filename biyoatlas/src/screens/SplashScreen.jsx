import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SoundEngine from '../utils/soundEngine';

const avatars = [
  { id: 'wolf', emoji: '🐺', name: 'Kurt' },
  { id: 'owl', emoji: '🦉', name: 'Baykuş' },
  { id: 'eagle', emoji: '🦅', name: 'Kartal' },
  { id: 'dolphin', emoji: '🐬', name: 'Yunus' },
  { id: 'panther', emoji: '🐆', name: 'Panter' },
  { id: 'fox', emoji: '🦊', name: 'Tilki' },
  { id: 'octopus', emoji: '🐙', name: 'Ahtapot' },
  { id: 'dragon', emoji: '🐉', name: 'Ejderha' },
];

function Particle({ index }) {
  const size = Math.random() * 3 + 1;
  const left = Math.random() * 100;
  const delay = Math.random() * 10;
  const duration = Math.random() * 10 + 10;
  const opacity = Math.random() * 0.4 + 0.1;

  return (
    <motion.div
      className="absolute rounded-full bg-green-primary"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: '-5%',
        opacity: 0,
      }}
      animate={{
        y: [0, -window.innerHeight * 1.2],
        x: [0, Math.sin(index) * 80],
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export default function SplashScreen() {
  const { startNewSession, setCurrentScreen, player } = useGame();
  const [name, setName] = useState(player.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(player.avatar || '');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input after animation
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = useCallback(() => {
    if (!name.trim() || !selectedAvatar) return;
    SoundEngine.uiClick();
    setShowForm(false);
    setLoading(true);

    // Simulate loading with progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 15 + 5;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        startNewSession(name.trim(), selectedAvatar);
        setTimeout(() => {
          if (player.analogyCards?.length > 0) {
            setCurrentScreen('worldmap');
          } else {
            setCurrentScreen('onboarding');
          }
        }, 500);
      }
      setProgress(prog);
    }, 200);
  }, [name, selectedAvatar, startNewSession, setCurrentScreen, player]);

  return (
    <div className="relative w-full h-full bg-deep overflow-hidden flex items-center justify-center">
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-md">
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Leaf-world logo */}
          <motion.div
            className="text-7xl md:text-8xl select-none"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🌍
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl tracking-wider text-green-primary">
            BİYOATLAS
          </h1>
          <p className="text-text-secondary text-sm font-body tracking-widest uppercase">
            Doğanın Sırlarını Keşfet
          </p>
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              className="w-full flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Name input */}
              <div className="w-full">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Adını gir..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={20}
                  className="w-full bg-transparent border-b-2 border-border-subtle focus:border-green-primary text-text-primary text-center text-xl font-body py-3 outline-none transition-colors duration-300 placeholder-text-muted"
                  onKeyDown={(e) => e.key === 'Enter' && name.trim() && selectedAvatar && handleStart()}
                />
              </div>

              {/* Avatar selection */}
              <div className="w-full">
                <p className="text-text-secondary text-xs text-center mb-3 uppercase tracking-wider">
                  Avatarını Seç
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {avatars.map((av) => (
                    <motion.button
                      key={av.id}
                      onClick={() => {
                        setSelectedAvatar(av.id);
                        SoundEngine.uiClick();
                      }}
                      className={`
                        relative p-3 rounded-xl transition-all duration-300 touch-target
                        flex flex-col items-center gap-1
                        ${selectedAvatar === av.id
                          ? 'bg-green-primary/20 border-2 border-green-primary shadow-glow-green'
                          : 'bg-surface/50 border-2 border-transparent hover:border-border-subtle'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">{av.emoji}</span>
                      <span className="text-[10px] text-text-secondary">{av.name}</span>
                      {selectedAvatar === av.id && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-green-primary rounded-full flex items-center justify-center text-[8px] text-deep font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Start button */}
              <motion.button
                onClick={handleStart}
                disabled={!name.trim() || !selectedAvatar}
                className={`
                  w-full py-4 rounded-xl font-heading font-bold text-lg tracking-wider uppercase
                  transition-all duration-300 touch-target
                  ${name.trim() && selectedAvatar
                    ? 'bg-gradient-to-r from-green-primary to-green-deep text-deep hover:shadow-glow-green hover:scale-[1.02]'
                    : 'bg-surface text-text-muted cursor-not-allowed'
                  }
                `}
                whileHover={name.trim() && selectedAvatar ? { scale: 1.02 } : {}}
                whileTap={name.trim() && selectedAvatar ? { scale: 0.98 } : {}}
              >
                KEŞFE BAŞLA
              </motion.button>
            </motion.div>
          )}

          {/* Loading state */}
          {loading && (
            <motion.div
              className="w-full flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-text-secondary text-sm font-body animate-pulse">
                Atlas hazırlanıyor...
              </p>
              <div className="w-full h-[2px] bg-surface rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-primary to-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom credits */}
      <motion.p
        className="absolute bottom-4 text-text-muted text-[10px] font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        BiyoAtlas v1.0 — Biyomimikri Keşif Oyunu
      </motion.p>
    </div>
  );
}
