import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GlowButton } from '../ui/GlowButton';
import { ParticleBackground } from '../ui/ParticleBackground';
import { useGame } from '../../context/GameContext';

export function SplashScene() {
  const { dispatch } = useGame();
  const [showContent, setShowContent] = useState(false);
  const [showText, setShowText] = useState(false);
  const [cellCount, setCellCount] = useState(0);

  useEffect(() => {
    // Cell division animation
    const cellInterval = setInterval(() => {
      setCellCount(prev => {
        if (prev < 50) return prev + 2;
        clearInterval(cellInterval);
        return prev;
      });
    }, 100);

    setTimeout(() => setShowContent(true), 2000);
    setTimeout(() => setShowText(true), 4000);

    return () => clearInterval(cellInterval);
  }, []);

  const handleEnter = () => {
    dispatch({ type: 'SET_SCENE', payload: 'main' });
  };

  return (
    <div className="fixed inset-0 bg-[#030408] flex items-center justify-center overflow-hidden">
      <ParticleBackground intensity="medium" />

      {/* Floating cells animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: Math.min(cellCount, 50) }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 400,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3
            }}
            transition={{
              duration: 3,
              delay: i * 0.05,
              ease: 'easeOut'
            }}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 30 + 10,
              height: Math.random() * 30 + 10,
              background: `radial-gradient(circle at 30% 30%, rgba(0, 255, 209, 0.8), rgba(0, 255, 209, 0.2))`,
              boxShadow: '0 0 20px rgba(0, 255, 209, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Central cell */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #00FFD1, #9B59FF)',
            boxShadow: '0 0 60px rgba(0, 255, 209, 0.6), 0 0 120px rgba(155, 89, 255, 0.4)'
          }}
        />
      </motion.div>

      {/* Logo and text */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-20 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="font-display text-6xl md:text-8xl font-bold mb-4 text-glow-cyan"
              style={{
                color: '#00FFD1',
                textShadow: '0 0 40px rgba(0, 255, 209, 0.8), 0 0 80px rgba(0, 255, 209, 0.4)'
              }}
            >
              EVRİM LAB
            </motion.h1>

            {showText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-scientific text-[#7FA8C9] text-sm md:text-base mb-8">
                  <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-[#00FFD1] animate-pulse">
                    Doğa 3.8 milyar yıldır deniyor. Sen bugün dene.
                  </span>
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <GlowButton size="lg" onClick={handleEnter}>
                    <span className="flex items-center gap-2">
                      <span>🧬</span>
                      <span>LABORATUVARA GİR</span>
                      <span>→</span>
                    </span>
                  </GlowButton>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 0.5 : 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 text-center z-20"
      >
        <p className="font-scientific text-xs text-[#2A4A6B]">
          Anti Gravity | Mahir Cihangir SARAÇ | Muğla Sıtkı Koçman Üniversitesi
        </p>
      </motion.div>
    </div>
  );
}
