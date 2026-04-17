import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, P } from '../context/GameContext';
import Particles from '@tsparticles/react';

export default function Tur1Question({ data }) {
  const { state, dispatch } = useGame();
  
  // local states for animation / presentation
  const [showOptions, setShowOptions] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // only useful if simulating single team input, but in reality 4 teams have 4 inputs. We will visualy reveal correct/wrong.

  useEffect(() => {
    // Soru sekerek düşme animasyonundan sonra seçenekleri göster
    const t1 = setTimeout(() => setShowOptions(true), 1200);
    const t2 = setTimeout(() => {
      dispatch({ type: P.START_TIMER });
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [data.id, dispatch]);

  useEffect(() => {
    if (state.isTimerRunning) setHasTimerStarted(true);
  }, [state.isTimerRunning]);

  useEffect(() => {
    // If timer reached 0 and not yet revealed, automatically reveal
    if (hasTimerStarted && state.timeRemaining === 0 && !state.isTimerRunning && !revealed) {
      setRevealed(true);
    }
  }, [state.timeRemaining, state.isTimerRunning, revealed, hasTimerStarted]);

  // Handle teacher "Reveal Answer" click
  const handleReveal = () => {
     dispatch({ type: P.STOP_TIMER });
     setRevealed(true);
  };

  return (
    <div className="w-full h-full flex flex-col relative z-20">
      
      {data.backgroundImage && data.backgroundImage.startsWith('http') && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none rounded-xl -z-10 mix-blend-screen"
          style={{ 
            backgroundImage: `url(${data.backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)'
          }} 
        />
      )}

      {/* Soru Metni */}
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 10, 
          mass: 1.5 
        }}
        className="w-full bg-arena-panel/80 backdrop-blur-xl border-l-[6px] border-neon-blue rounded-r-xl p-8 shadow-glow-blue mb-8 mt-4"
      >
        <h2 className="text-4xl font-question leading-tight text-white">
          {data.question}
        </h2>
      </motion.div>

      {/* Cevap Seçenekleri */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6 mt-4">
        <AnimatePresence>
          {showOptions && data.options.map((option, index) => {
            const isCorrect = option.correct;
            let bgColor = "bg-arena-card";
            let borderColor = "border-gray-700";
            let textColor = "text-gray-200";
            let glow = "none";
            let animateState = {};
            let particleConfig = null;

            // Color assignments A,B,C,D
            const colorMap = [
              { border: '#00D4FF', shadow: 'rgba(0, 212, 255, 0.4)' },
              { border: '#FF2D78', shadow: 'rgba(255, 45, 120, 0.4)' },
              { border: '#39FF14', shadow: 'rgba(57, 255, 20, 0.4)' },
              { border: '#FFE135', shadow: 'rgba(255, 225, 53, 0.4)' }
            ];

            const isEliminated = state.eliminatedOptions && state.eliminatedOptions.includes(option.id);

            if (revealed) {
              if (isCorrect) {
                bgColor = "bg-green-900";
                borderColor = "border-neon-green";
                textColor = "text-white";
                glow = "0 0 30px rgba(57,255,20,0.6)";
                particleConfig = getConfettiConfig(index);
              } else {
                bgColor = "bg-red-950/40";
                borderColor = "border-red-900/50";
                textColor = "text-red-900/50";
                animateState = { x: [-10, 10, -10, 10, 0], opacity: 0.3 };
              }
            } else {
               borderColor = `border-[${colorMap[index].border}]`; // Need style for custom dynamic colors
            }

            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={revealed && !isCorrect ? animateState : { opacity: 1, scale: 1 }}
                transition={revealed && !isCorrect ? { duration: 0.4 } : { delay: index * 0.15 }}
                whileHover={!revealed && !isEliminated ? { scale: 1.05, zIndex: 10 } : {}}
                className={`relative rounded-xl border-2 p-6 flex flex-col justify-center transition-colors duration-500 overflow-hidden ${bgColor} ${textColor} ${isEliminated ? 'opacity-20 grayscale pointer-events-none' : 'cursor-pointer'}`}
                style={{ 
                  borderColor: revealed ? undefined : colorMap[index].border, 
                  boxShadow: revealed || isEliminated ? 'none' : `0 0 10px ${colorMap[index].shadow}`
                 }}
              >
                <div className="absolute top-4 left-4 text-3xl font-arena font-bold opacity-30 select-none">
                  {option.id}
                </div>
                
                <div className="text-3xl font-answer text-center z-10 font-medium">
                  {option.text}
                </div>

                {/* Doğru Yanıt Confetti */}
                {revealed && isCorrect && (
                  <div className="absolute inset-0 z-0 pointer-events-none">
                     <Particles options={particleConfig} />
                  </div>
                )}
                
                {/* Doğru Yanıt BÜYÜK TİK */}
                {revealed && isCorrect && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                    className="absolute bottom-4 right-4 text-6xl drop-shadow-[0_0_15px_rgba(57,255,20,1)]"
                  >
                    M
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Teacher Control: Reveal Answer (Only for demo/manual mode) */}
      {!revealed && showOptions && (
         <button onClick={handleReveal} className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded">
           [ÖĞRETMEN] Cevabı Aç
         </button>
      )}

    </div>
  );
}

function getConfettiConfig(index) {
  return {
    fullScreen: { enable: false },
    particles: {
      color: { value: ["#39FF14", "#ffffff"] },
      move: {
        direction: "top",
        enable: true,
        outModes: { default: "out" },
        speed: { min: 5, max: 15 },
      },
      number: { value: 50 },
      opacity: { value: 1 },
      shape: { type: "circle" },
      size: { value: { min: 2, max: 5 } }
    },
    emitters: {
      direction: "top",
      life: { count: 1, duration: 0.1, delay: 0.1 },
      rate: { delay: 0.1, quantity: 100 },
      size: { width: 0, height: 0 },
      position: { x: 50, y: 100 }
    }
  };
}
