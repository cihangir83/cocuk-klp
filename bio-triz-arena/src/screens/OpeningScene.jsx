import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { P } from '../context/GameContext';
import ArenaBackground from '../components/ArenaBackground';

export default function OpeningScene() {
  const { dispatch } = useGame();
  const [countdown, setCountdown] = useState(null);
  const [phase, setPhase] = useState(0); // 0: black, 1: logo, 2: ready

  useEffect(() => {
    // Sequence
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setCountdown(3), 4000);
    const t3 = setTimeout(() => setCountdown(2), 5000);
    const t4 = setTimeout(() => setCountdown(1), 6000);
    const t5 = setTimeout(() => {
      setCountdown(null);
      setPhase(2);
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const enterArena = () => {
    dispatch({ type: P.SET_PHASE, payload: 'setup' });
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {phase > 0 && <ArenaBackground variant={phase === 2 ? 'intense' : 'default'} />}

      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="silence"
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-50"
          />
        )}

        {phase >= 1 && (
          <motion.div
            key="logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, type: 'spring' }}
            className="relative z-10 flex flex-col items-center"
          >
            <h1 className="text-8xl md:text-[9rem] font-arena font-black text-transparent bg-clip-text bg-gradient-to-br from-neon-blue via-white to-neon-purple text-glow tracking-tighter leading-none mb-4">
              BIO-TRIZ
              <br />
              <span className="text-6xl md:text-[7rem] text-neon-pink">ARENA</span>
            </h1>
            
            {countdown !== null && (
              <motion.div
                key={countdown}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-5xl font-score text-neon-yellow drop-shadow-[0_0_15px_rgba(255,225,53,0.8)] mt-8"
              >
                TURNUVA BAŞLIYOR... {countdown}
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-12 flex flex-col items-center"
              >
                <div className="text-2xl font-ui text-gray-300 tracking-widest uppercase mb-12 animate-pulse">
                  PROGRAM BOYUNCA ÖĞRENDİKLERİN BUGÜN SINAVDA
                </div>
                <button
                  onClick={enterArena}
                  className="px-12 py-4 text-3xl font-arena font-bold rounded-lg border-2 border-neon-blue bg-neon-blue/10 hover:bg-neon-blue/30 text-neon-blue shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:shadow-[0_0_50px_rgba(0,212,255,0.8)] transition-all duration-300 cursor-pointer"
                >
                  [ ARENAYA GİR ]
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
