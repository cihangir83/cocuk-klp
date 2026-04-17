import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import MetalButton from '../ui/MetalButton';
import MetalPlate from '../ui/MetalPlate';
import Gear from '../svg/Gear';
import Lamp from '../svg/Lamp';
import { useGameSound } from '../../hooks/useSound';

export default function MachineSelect() {
  const { state, dispatch, getActiveMachine } = useGame();
  const sound = useGameSound();
  
  const machine = getActiveMachine();

  if (!machine) {
    return (
      <div className="w-full h-full flex items-center justify-center workshop-bg">
        <MetalButton onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'workshop' })}>Geri Dön</MetalButton>
      </div>
    );
  }

  const handleStart = () => {
    sound.playGearStart();
    dispatch({ type: 'ENTER_WORKBENCH' });
  };

  const handleBack = () => {
    sound.playClick();
    dispatch({ type: 'SET_SCREEN', screen: 'workshop' });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center workshop-bg p-8 relative overflow-hidden">
      
      <div className="absolute inset-0 vignette pointer-events-none"></div>

      {/* Büyük Makine Görseli Arka Plan */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 pointer-events-none"
      >
        <Gear size={300} color="rust" animationState="locked" />
        <Gear size={200} color="rust" animationState="locked" />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl z-10"
      >
        <MetalPlate title={`MODEL: ${machine.id.toUpperCase()}`} className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-[var(--color-copper)] border-2">
          
          <div className="flex items-center gap-4 border-b border-[var(--color-metal-mid)] pb-6 mb-6">
            <Lamp color="red" size={60} />
            <div>
              <h2 className="text-2xl font-[var(--font-engraved)] text-[var(--color-copper-bright)]">{machine.name}</h2>
              <div className="text-[var(--color-lamp-red)] font-[var(--font-mechanical)] tracking-widest mt-1">DURUM: KİLİTLİ & ARIZALI</div>
            </div>
          </div>

          <div className="bg-[#0f0b08] p-6 rounded border border-[var(--color-metal-light)] mb-8 font-[var(--font-technical)] relative">
            <div className="absolute -top-3 left-6 bg-[#0f0b08] px-2 text-[var(--color-text-muted)] text-sm">HATA RAPORU</div>
            
            <p className="text-lg text-[var(--color-text-display)] mb-6 leading-relaxed">
              {machine.contradiction.description}
            </p>

            <div className="bg-black/50 p-4 rounded border border-[var(--color-lamp-red)]/30 flex items-center justify-between">
              <div className="text-center w-5/12">
                <span className="block text-[var(--color-lamp-red)] font-bold">{machine.contradiction.param1.direction.toUpperCase()}</span>
                <span className="text-[var(--color-brass)]">{machine.contradiction.param1.name}</span>
              </div>
              <div className="w-2/12 flex justify-center text-[var(--color-lamp-red)] animate-pulse">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="text-center w-5/12">
                <span className="block text-[var(--color-lamp-red)] font-bold">{machine.contradiction.param2.direction.toUpperCase()}</span>
                <span className="text-[var(--color-brass)]">{machine.contradiction.param2.name}</span>
              </div>
            </div>
            <div className="text-center text-[10px] text-[var(--color-lamp-red)]/70 mt-2">TESPİT EDİLEN ÇELİŞKİ BAĞLANTISI</div>
          </div>

          <div className="flex gap-4">
            <MetalButton type="brass" onClick={handleStart} className="flex-1 text-lg" pulse={true}>
              TEZGAHA AL
            </MetalButton>
            <MetalButton type="dark" onClick={handleBack} className="px-8">
              RAFA BIRAK
            </MetalButton>
          </div>

        </MetalPlate>
      </motion.div>
      
    </div>
  );
}
