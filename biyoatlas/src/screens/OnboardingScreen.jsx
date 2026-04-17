import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SoundEngine from '../utils/soundEngine';

const steps = [
  {
    emoji: '🌍',
    title: 'Dünyayı keşfet',
    description: 'Sislerle kaplı ekosistemler seni bekliyor',
    animation: 'map',
  },
  {
    emoji: '🃏',
    title: 'Canlıların sırlarını çöz',
    description: 'Her kartın arkasında olağanüstü bir yetenek gizli',
    animation: 'card',
  },
  {
    emoji: '🧩',
    title: 'Analoji kur, atlas oluştur',
    description: 'Doğanın çözümlerini gerçek dünya sorunlarıyla eşleştir',
    animation: 'drag',
  },
];

export default function OnboardingScreen() {
  const { setCurrentScreen } = useGame();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    SoundEngine.uiClick();
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setCurrentScreen('worldmap');
    }
  };

  const handleSkip = () => {
    SoundEngine.uiClick();
    setCurrentScreen('worldmap');
  };

  return (
    <div className="relative w-full h-full bg-deep flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${
            step === 0 ? 'rgba(0,200,150,0.15)' :
            step === 1 ? 'rgba(245,166,35,0.15)' :
            'rgba(155,89,182,0.15)'
          } 0%, transparent 70%)`,
        }}
      />

      {/* Skip button */}
      <motion.button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-text-muted hover:text-text-secondary text-sm font-body transition-colors z-20 touch-target"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Geç →
      </motion.button>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="flex flex-col items-center gap-8 px-8 text-center z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated illustration */}
          <motion.div
            className="text-8xl md:text-9xl select-none"
            animate={
              steps[step].animation === 'map'
                ? { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }
                : steps[step].animation === 'card'
                ? { rotateY: [0, 180, 360] }
                : { y: [0, -20, 0], x: [0, 20, 0] }
            }
            transition={{
              duration: steps[step].animation === 'card' ? 2 : 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ perspective: '1000px' }}
          >
            {steps[step].emoji}
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-3">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-text-primary">
              {steps[step].title}
            </h2>
            <p className="text-text-secondary font-body text-sm md:text-base max-w-xs">
              {steps[step].description}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-3">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === step ? 'bg-green-primary w-6' : 'bg-border-subtle'
                }`}
                layout
              />
            ))}
          </div>

          {/* Next button */}
          <motion.button
            onClick={handleNext}
            className="px-12 py-3 bg-gradient-to-r from-green-primary to-green-deep text-deep font-heading font-bold rounded-xl tracking-wider hover:shadow-glow-green transition-all touch-target"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {step < steps.length - 1 ? 'DEVAM' : 'BAŞLA'}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
