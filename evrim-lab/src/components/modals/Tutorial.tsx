import { motion } from 'framer-motion';
import { useState } from 'react';
import { GlowButton } from '../ui/GlowButton';

interface TutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const tutorialSteps = [
  {
    icon: '🧬',
    title: 'Hoş Geldin, Evrim Mühendisi!',
    description: 'Doğadan ilham alarak yeni organizmalar tasarlayacaksın. Her organizma benzersizdir!',
    highlight: null
  },
  {
    icon: '🦈',
    title: 'Özellikleri Keşfet',
    description: 'Sol panelden özelliklere tıkla veya sürükle. Her özellik doğadaki bir canlıdan ilham alıyor.',
    highlight: 'trait_library'
  },
  {
    icon: '🧫',
    title: 'Organizmanı Tasarla',
    description: 'Petri kabında organizmanı göreceksin. Özellikler ekledikçe şekli değişecek!',
    highlight: 'petri_dish'
  },
  {
    icon: '📊',
    title: 'Uyum Skorunu İzle',
    description: 'Organizmanın ortama uyumu skora yansır. Yüksek skor = İyi kombinasyon!',
    highlight: 'score'
  },
  {
    icon: '🧪',
    title: 'Test Et ve Öğren',
    description: 'Organizmanı ekolojik krizlere karşı test et. Başarısız mı? Sorun değil, tekrar dene!',
    highlight: 'test_button'
  }
];

export function Tutorial({ onComplete, onSkip }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      {/* Highlight overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute border-2 border-[#00FFD1] rounded-xl animate-pulse"
          style={{
            top: '10%',
            left: '5%',
            width: '25%',
            height: '70%',
            boxShadow: '0 0 30px rgba(0, 255, 209, 0.5)'
          }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="w-full max-w-lg mx-4 p-6 rounded-2xl glass-panel"
        style={{
          border: '2px solid #00FFD1',
          boxShadow: '0 0 60px rgba(0, 255, 209, 0.4)'
        }}
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {tutorialSteps.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                scale: index === currentStep ? 1.3 : 1,
                backgroundColor: index === currentStep ? '#00FFD1' : '#2A4A6B'
              }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <motion.span
            key={currentStep}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4 block"
          >
            {step.icon}
          </motion.span>

          <motion.h2
            key={`title-${currentStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl font-bold text-white mb-3"
          >
            {step.title}
          </motion.h2>

          <motion.p
            key={`desc-${currentStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#7FA8C9]"
          >
            {step.description}
          </motion.p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <GlowButton
              variant="secondary"
              size="md"
              onClick={handlePrev}
              className="flex-1"
            >
              ← Geri
            </GlowButton>
          )}

          <GlowButton
            variant="secondary"
            size="md"
            onClick={onSkip}
            className="flex-1"
          >
            Atla
          </GlowButton>

          <GlowButton
            variant="primary"
            size="md"
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep < tutorialSteps.length - 1 ? 'İleri →' : 'Başla!'}
          </GlowButton>
        </div>

        {/* Step counter */}
        <p className="text-center text-xs text-[#2A4A6B] mt-4">
          Adım {currentStep + 1} / {tutorialSteps.length}
        </p>
      </motion.div>
    </motion.div>
  );
}
