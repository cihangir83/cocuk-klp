import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/soundManager';
import { Briefcase } from 'lucide-react';

export default function WelcomeScreen() {
  const { dispatch } = useGame();
  const [playerName, setPlayerName] = useState('');

  const handleStart = () => {
    if (!playerName.trim()) return;
    playSound('click');
    dispatch({ type: 'SET_PLAYER_NAME', payload: playerName });
    dispatch({ type: 'SET_STAGE', payload: 'briefing' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 2 }}
      className="flex flex-col items-center justify-center w-full max-w-4xl p-8 z-10"
    >
      <motion.div 
        animate={{ rotateY: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="mb-8 p-4 rounded-full border border-[var(--color-holo-line)] shadow-[0_0_30px_var(--color-holo-glow)]"
      >
        <Briefcase size={64} className="text-[var(--color-accent-cyan)]" />
      </motion.div>

      <div className="text-center font-['Rajdhani'] mb-12">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-5xl font-bold tracking-widest text-white holo-text mb-2"
        >
          EKO İNOVASYON FONU
        </motion.h1>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-2xl text-[var(--color-accent-blue)] tracking-[0.2em]"
        >
          2026 DÖNEM KOMİTESİ
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-xl font-['Share_Tech_Mono'] mt-6 text-[#9ca3af]"
        >
          TOPLAM BÜTÇE: 10.000.000 ₺
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="font-['Share_Tech_Mono'] text-sm text-center text-gray-400">
          <p>4 proje finalist.</p>
          <p>1 fon.</p>
          <p className="text-[var(--color-accent-gold)] mt-2">Karar size ait.</p>
        </div>

        <input 
          type="text" 
          placeholder="Komite Başkanı Adı" 
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="bg-transparent border-b border-[var(--color-accent-blue)] text-white text-center p-2 focus:outline-none focus:border-[var(--color-accent-cyan)] transition-colors w-64 uppercase tracking-wider font-['Share_Tech_Mono']"
        />

        <button 
          onClick={handleStart}
          disabled={!playerName.trim()}
          className="mt-4 px-8 py-3 bg-transparent border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] rounded hover:bg-[var(--color-holo-glow)] hover:shadow-[0_0_15px_var(--color-holo-glow)] transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          [ KOLTUĞA OTUR ]
        </button>
      </motion.div>
    </motion.div>
  );
}
