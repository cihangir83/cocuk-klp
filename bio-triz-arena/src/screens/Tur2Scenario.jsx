import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, P } from '../context/GameContext';

export default function Tur2Scenario({ data }) {
  const { state, dispatch } = useGame();
  
  const [revealed, setRevealed] = useState(false);
  const [intenseMode, setIntenseMode] = useState(false);
  const [hasTimerStarted, setHasTimerStarted] = useState(false);

  useEffect(() => {
    // start timer as soon as scenario mounts
    dispatch({ type: P.START_TIMER });
  }, [dispatch]);

  useEffect(() => {
    if (state.isTimerRunning) setHasTimerStarted(true);
  }, [state.isTimerRunning]);

  useEffect(() => {
    // Check intense mode (last 15 seconds)
    if (state.timeRemaining <= 15 && state.timeRemaining > 0 && !intenseMode) {
      setIntenseMode(true);
      // Play intense mode sound
    }
    
    // Auto reveal
    if (hasTimerStarted && state.timeRemaining === 0 && !state.isTimerRunning && !revealed) {
      setRevealed(true);
    }
  }, [state.timeRemaining, intenseMode, revealed, state.isTimerRunning, hasTimerStarted]);

  const handleReveal = () => {
    dispatch({ type: P.STOP_TIMER });
    setRevealed(true);
  };

  return (
    <div className="w-full h-full flex gap-6 relative z-20">
      
      {/* Intense Mode Red Glow overlay affecting the scenario component */}
      {intenseMode && !revealed && (
         <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 0.2 }} 
           className="absolute inset-0 bg-neon-orange mix-blend-color-dodge rounded-xl pointer-events-none z-50" 
         />
      )}

      {/* Sol %60: Senaryo metni + görsel */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-[60%] flex flex-col bg-arena-card rounded-xl border border-gray-800 overflow-hidden relative"
      >
        <div className="h-[40%] w-full bg-gray-900 border-b border-gray-800 relative">
          {/* Using actual image via URL */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {data.scenarioImage.startsWith('http') ? (
               <img src={data.scenarioImage} alt="Scenario" className="w-full h-full object-cover opacity-50" />
            ) : (
               <>
                 <span className="text-4xl mb-4 opacity-30">🌍</span>
                 <span className="opacity-30">{data.scenarioImage}</span>
               </>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-arena-card to-transparent" />
        </div>

        <div className="flex-1 p-8">
          <h3 className="text-xl font-ui uppercase tracking-[0.2em] text-neon-blue mb-4">KRİZ SENARYOSU</h3>
          <p className="text-3xl font-question leading-relaxed text-gray-200">
            {data.scenario}
          </p>
        </div>
      </motion.div>

      {/* Sağ %40: 3 Seçenek */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="w-[40%] flex flex-col gap-4"
      >
        <AnimatePresence>
          {data.options.map((option, index) => {
            const isCorrect = option.correct;
            let bgColor = "bg-arena-panel";
            let borderColor = "border-gray-700";
            let textColor = "text-gray-300";

            if (revealed) {
              if (isCorrect) {
                bgColor = "bg-green-900";
                borderColor = "border-neon-green";
                textColor = "text-white";
              } else {
                bgColor = "bg-red-950/30";
                borderColor = "border-red-900/40";
                textColor = "text-red-900/50";
              }
            }

            return (
              <motion.div
                key={option.id}
                layout
                whileHover={!revealed ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" } : {}}
                className={`flex-1 rounded-xl border-2 p-6 flex flex-col justify-center cursor-pointer transition-colors duration-500 relative ${bgColor} ${borderColor} ${textColor}`}
              >
                <div className="absolute top-4 left-4 text-2xl font-arena font-bold opacity-30 select-none">
                  {option.id}
                </div>
                
                <div className="text-xl font-answer font-medium leading-relaxed mt-4">
                  {option.text}
                </div>

                {revealed && isCorrect && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute right-4 bottom-4 text-4xl text-neon-green"
                  >
                    M
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Teacher Action */}
      {!revealed && (
         <button onClick={handleReveal} className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded">
           [ÖĞRETMEN] Lider Kararını Kilitle & Aç
         </button>
      )}

    </div>
  );
}
