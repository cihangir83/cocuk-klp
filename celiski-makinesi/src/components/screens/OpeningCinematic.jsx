import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import MetalButton from '../ui/MetalButton';
import SteamParticles from '../ui/SteamParticles';
import Gear from '../svg/Gear';
import Lamp from '../svg/Lamp';

export default function OpeningCinematic() {
  const { state, dispatch } = useGame();
  const [phase, setPhase] = useState(0); // 0: black, 1: machine appears, 2: text, 3: button

  useEffect(() => {
    // Eğer ilk oturum değilse, atla butonunu baştan göster (veya direkt atla)
    if (!state.isFirstSession) {
      setPhase(3);
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 1500);
    const t2 = setTimeout(() => setPhase(2), 3500);
    const t3 = setTimeout(() => setPhase(3), 6000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [state.isFirstSession]);

  const handleEnter = () => {
    if (state.isFirstSession) {
      dispatch({ type: 'SET_SCREEN', screen: 'nameEntry' });
    } else {
      dispatch({ type: 'SET_SCREEN', screen: 'workshop' });
    }
  };

  const handleSkip = () => {
    handleEnter();
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-black overflow-hidden">
      
      {/* Arka plan uğultu sesi useSound tarafında çalacak */}
      
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex flex-col items-center justify-center workshop-bg"
          >
            {/* Ortadaki silüet makine */}
            <div className="relative w-64 h-64 flex items-center justify-center opacity-40">
              <div className="absolute top-4 left-4"><Gear size={80} color="dark" animationState="locked" /></div>
              <div className="absolute bottom-4 right-4"><Gear size={100} color="dark" animationState="locked" /></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Lamp color={phase >= 2 ? "red" : "off"} size={60} />
              </div>
              <div className="absolute bottom-0 w-full text-center mt-32 text-xs font-[var(--font-engraved)] text-[var(--color-rust)] tracking-[0.2em] border-t border-[var(--color-rust)] pt-2">
                MODEL: BIO-TRIZ MK.1
              </div>
            </div>
            
            <SteamParticles active={phase >= 1} intensity="normal" className="opacity-30" />
            
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 flex flex-col items-center max-w-2xl text-center px-6">
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <h1 className="font-[var(--font-engraved)] text-4xl md:text-5xl text-[var(--color-brass)] mb-6 drop-shadow-[0_0_10px_rgba(201,168,76,0.3)]">
                ÇELİŞKİ MAKİNESİ
              </h1>
              
              <div className="font-[var(--font-technical)] text-lg md:text-xl text-[var(--color-text-display)] relative inline-block text-left whitespace-pre-line leading-relaxed">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.05 }}
                >
                  {"Çelişkiler çözülmeden hiçbir sistem çalışamaz.\nDoğru ilkeyi bul. Makineyi tamir et."}
                </motion.span>
                <span className="typewriter-cursor inline-block ml-1"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <MetalButton onClick={handleEnter} type="copper" pulse={true} className="text-xl px-10 py-4">
                ATÖLYEYE GİR
              </MetalButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button for dev or impatient players */}
      {phase < 3 && state.isFirstSession && (
        <button 
          onClick={handleSkip}
          className="absolute bottom-6 right-6 text-[var(--color-text-muted)] text-sm font-[var(--font-mechanical)] hover:text-[var(--color-text-display)] transition-colors"
        >
          [ GEÇ ]
        </button>
      )}
    </div>
  );
}
