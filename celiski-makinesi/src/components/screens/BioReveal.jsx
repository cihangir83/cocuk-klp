import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import MetalButton from '../ui/MetalButton';
import { useGameSound } from '../../hooks/useSound';

export default function BioReveal() {
  const { state, dispatch, getActiveMachine } = useGame();
  const sound = useGameSound();
  const machine = getActiveMachine();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    sound.playSuccess(); // Dramatic nature reveal sound later
    
    const t1 = setTimeout(() => setPhase(1), 1000); // Image + Title
    const t2 = setTimeout(() => setPhase(2), 3000); // Explanation
    const t3 = setTimeout(() => setPhase(3), 5000); // TRIZ connection
    const t4 = setTimeout(() => setPhase(4), 7000); // Button

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (!machine) return null;

  const handleFinish = () => {
    sound.playClick();
    dispatch({ type: 'FINISH_BIO_REVEAL' });
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-[#F0E6D3]">
      
      {/* Arka Plan: CSS Art / Parçacıklar ile Doğamsı hissiyat */}
      <div className="absolute inset-0 bg-[#0a120c] opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_80%)]"></div>

      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center border-[var(--color-copper)] border-p-8 rounded-lg">
          
          {/* Sol: CSS/Emoji Sanatı */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full justify-center md:w-1/2 flex flex-col items-center"
              >
                <div className="w-64 h-64 rounded-full border-4 border-[var(--color-brass)] bg-[var(--color-metal-dark)] relative overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(201,168,76,0.3)]">
                  {/* Pseudo image via css and emoji */}
                  <span className="text-[120px] filter drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    {machine.bioExample.emoji}
                  </span>
                  
                  {/* Tarama efekti */}
                  <div className="absolute top-0 w-full h-2 bg-[var(--color-lamp-blue)]/50 box-shadow-[0_0_10px_var(--color-lamp-blue)] animate-[piston-pump_3s_linear_infinite]"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sağ: Metin Anlatımı */}
          <div className="w-full md:w-1/2 flex flex-col items-start min-h-[400px]">
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-6 w-full border-b border-[var(--color-metal-light)] pb-4"
                >
                  <h2 className="text-3xl font-[var(--font-engraved)] text-[var(--color-brass-bright)] tracking-wider">
                    {machine.bioExample.creature.toUpperCase()}
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8 font-[var(--font-body)] text-lg leading-relaxed text-[#F0E6D3]/90"
                >
                  <p className="mb-4">{machine.bioExample.explanation}</p>
                  <p className="text-sm text-[#F0E6D3]/60 italic">{machine.bioExample.detail}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-l-4 border-[var(--color-lamp-green)] pl-4 py-2 bg-[var(--color-lamp-green)]/10 text-justify mb-8"
                >
                  <span className="block text-[var(--color-lamp-green)] font-[var(--font-mechanical)] text-xs mb-1 tracking-widest">TRIZ BAĞLANTISI</span>
                  <p className="font-[var(--font-technical)] text-base">{machine.bioExample.trizConnection}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-auto self-end"
                >
                  <MetalButton type="brass" onClick={handleFinish} pulse={true}>
                    MAKİNEYE KAYDET →
                  </MetalButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
