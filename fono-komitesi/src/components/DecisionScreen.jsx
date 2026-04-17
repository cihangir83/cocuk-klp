import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { projects } from '../data/gameData';
import { playSound, stopSound } from '../utils/soundManager';

export default function DecisionScreen() {
  const { dispatch } = useGame();
  const [selectedId, setSelectedId] = useState(null);
  const [stage, setStage] = useState('select'); // 'select', 'reveal', 'done'

  useEffect(() => {
    playSound('decisionBuild');
    return () => stopSound('decisionBuild');
  }, []);

  const handleSelect = (id) => {
    if (stage !== 'select') return;
    playSound('gavelBang');
    setSelectedId(id);
    setStage('reveal');
    
    // Auto transition to justification
    setTimeout(() => {
      dispatch({ type: 'SET_FINAL_DECISION', payload: id });
      dispatch({ type: 'SET_STAGE', payload: 'justification' });
      playSound('decisionFanfare');
    }, 4000);
  };

  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
      <AnimatePresence>
        {stage === 'select' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="w-full flex justify-center items-center gap-8 h-full"
          >
            {projects.map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(p.id)}
                className="w-64 h-96 glass-panel flex justify-center items-center cursor-pointer border border-[var(--color-glass-border)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-shadow group relative overflow-hidden"
              >
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-20" style={{ backgroundColor: p.color }} />
                <h3 className="text-3xl font-['Rajdhani'] uppercase tracking-widest text-shadow-md z-10 text-white group-hover:scale-110 transition-transform">
                  {p.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {stage === 'reveal' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center"
          >
             <motion.h2 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="text-2xl font-['Cinzel'] tracking-[0.3em] text-[var(--color-accent-gold)] mb-8"
             >
               FONU ALAN PROJE:
             </motion.h2>
             
             <motion.h1 
               initial={{ scale: 5, opacity: 0, filter: 'blur(20px)' }}
               animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
               transition={{ type: 'spring', damping: 10, mass: 2, stiffness: 100 }}
               className="text-8xl font-['Cinzel'] font-bold text-white tracking-wider"
               style={{ textShadow: `0 0 50px ${projects.find(p => p.id === selectedId)?.color}` }}
             >
               {projects.find(p => p.id === selectedId)?.name.toUpperCase()}
             </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
