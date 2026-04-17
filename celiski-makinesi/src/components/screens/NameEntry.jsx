import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import MetalButton from '../ui/MetalButton';
import MetalPlate from '../ui/MetalPlate';
import Gear from '../svg/Gear';
import { useGameSound } from '../../hooks/useSound';

export default function NameEntry() {
  const { dispatch } = useGame();
  const sound = useGameSound();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('Çırak');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    sound.playGearStart();
    dispatch({ 
      type: 'SET_PLAYER_INFO', 
      name: name.trim(),
      title: title
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center workshop-bg p-4 relative overflow-hidden">
      
      {/* Decorative background gears */}
      <div className="absolute top-10 left-10 opacity-20"><Gear size={150} color="dark" animationState="spinning-cw-slow" /></div>
      <div className="absolute bottom-10 right-10 opacity-20"><Gear size={200} color="dark" animationState="spinning-ccw-fast" /></div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="w-full max-w-md z-10"
      >
        <MetalPlate title="YENİ MUCİT KAYDI">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label htmlFor="playerName" className="font-[var(--font-mechanical)] text-[var(--color-text-muted)] tracking-widest text-xs">
                MUCİT ADI:
              </label>
              <input 
                id="playerName"
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                required
                autoComplete="off"
                className="bg-[var(--color-bg-deep)] border-2 border-[var(--color-metal-light)] p-3 text-[var(--color-brass)] font-[var(--font-technical)] text-lg rounded-none focus:outline-none focus:border-[var(--color-brass)] focus:shadow-[0_0_10px_rgba(201,168,76,0.2)] transition-all"
                placeholder="İsminizi kimliğe kazıyın..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-[var(--font-mechanical)] text-[var(--color-text-muted)] tracking-widest text-xs">
                UNVAN:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Çırak', 'Kalfa', 'Usta'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTitle(t);
                      sound.playClick();
                    }}
                    className={`
                      py-2 px-1 text-sm border-2 font-[var(--font-engraved)] font-bold transition-colors
                      ${title === t 
                        ? 'bg-[var(--color-metal-light)] border-[var(--color-brass)] text-[var(--color-brass)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]' 
                        : 'bg-[var(--color-metal-dark)] border-[var(--color-metal-mid)] text-[var(--color-text-muted)] hover:border-[var(--color-metal-light)]'}
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <MetalButton 
                type="brass" 
                onClick={handleSubmit} 
                className="w-full"
                disabled={!name.trim()}
              >
                KAYDI TAMAMLA VE BAŞLA
              </MetalButton>
            </div>

          </form>
        </MetalPlate>
      </motion.div>
    </div>
  );
}
