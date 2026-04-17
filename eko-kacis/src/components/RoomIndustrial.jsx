import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useCountdown } from '../hooks/useCountdown';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import IndustrialPuzzle1 from './puzzles/IndustrialPuzzle1';
import IndustrialPuzzle2 from './puzzles/IndustrialPuzzle2';
import IndustrialPuzzle3 from './puzzles/IndustrialPuzzle3';

export default function RoomIndustrial() {
  const { state, dispatch } = useGame();
  const { formattedTime, timerColor, isCritical } = useCountdown(state.totalTimeRemaining, true);
  const [init, setInit] = useState(false);
  const [sceneState, setSceneState] = useState('cutscene');
  
  const [puzzleData, setPuzzleData] = useState({
    p1Result: null, 
    p2Result: null,
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    if (sceneState === 'cutscene') {
      const timer = setTimeout(() => {
        setSceneState('p1');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [sceneState]);

  const handleP1Solve = (data) => {
    setPuzzleData(prev => ({ ...prev, p1Result: data }));
    setSceneState('p2');
  };

  const handleP2Solve = (data) => {
    setPuzzleData(prev => ({ ...prev, p2Result: data }));
    setSceneState('p3');
  };

  const handleP3Solve = () => {
    setSceneState('escape');
    setTimeout(() => {
      // Room 3 is the final room!
      dispatch({ type: 'ALL_ROOMS_COMPLETED', payload: { score: 850 } });
      dispatch({ type: 'ROOM_COMPLETED', payload: { roomId: 'room_industrial', timeSpent: 0 } });
    }, 5000);
  };

  return (
    <div className="relative w-full h-screen bg-[#0A0A08] overflow-hidden text-white font-ui selection:border-green-500">
      {/* Particles effect for toxic drops and dust */}
      {init && (
        <Particles
          id="tsparticles-industrial"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#7FFF00" },
              move: {
                direction: "bottom",
                enable: true,
                speed: 1,
                straight: false,
              },
              number: { density: { enable: true, area: 800 }, value: 30 },
              opacity: { value: { min: 0.1, max: 0.5 } },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
          }}
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
        />
      )}

      {/* Global Room Header */}
      {sceneState !== 'cutscene' && sceneState !== 'escape' && (
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black to-transparent pointer-events-none mb-12 border-b border-green-900/30">
          <div className="pointer-events-auto">
            <h2 className="text-xl font-timer tracking-widest text-[#7FFF00] drop-shadow-[0_0_8px_rgba(127,255,0,0.8)]">ENDÜSTRİYEL KİRLİLİK</h2>
            <p className="text-xs text-[#ADFF2F] font-puzzle animate-pulse">TOKSİSİTE: %94 | HAVA KALİTESİ: TEHLİKELİ</p>
          </div>
          <div className="flex flex-col items-end pointer-events-auto">
            <span className="text-xs font-timer tracking-widest text-red-500 mb-1 animate-pulse">SON ŞANS</span>
            <motion.div 
              className="text-4xl font-timer font-bold drop-shadow-md"
              style={{ color: timerColor }}
              animate={isCritical ? { opacity: [1, 0.5, 1], scale: [1, 1.05, 1], rotate: [-1, 1, -1] } : {}}
              transition={{ repeat: Infinity, duration: 0.3 }}
            >
              {formattedTime}
            </motion.div>
          </div>
        </header>
      )}

      {/* Rusty/Toxic Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px rgba(127, 255, 0, 0.05)' }} />

      <AnimatePresence mode="wait">
        {sceneState === 'cutscene' && (
          <motion.div
            key="cutscene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-center items-center bg-[#0A0A08] z-40 px-8 text-center"
          >
            <div className="w-full max-w-xl h-48 border-4 border-green-900/50 flex flex-col items-center justify-center mb-8 bg-[#001100]/80 backdrop-blur-md relative overflow-hidden">
               <motion.div 
                className="absolute inset-x-0 bottom-0 bg-[#7FFF00] blur-2xl opacity-40"
                animate={{ height: ['10%', '60%', '10%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
               />
               <span className="font-puzzle text-green-500 text-lg z-10 font-bold uppercase tracking-widest">Atık Analiz Sistemi Bağlanıyor...</span>
               <div className="absolute inset-0 scanlines opacity-60" />
            </div>
            <motion.h2 
              className="text-3xl font-narrative text-green-200 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              "Fabrikanın atık sistemini kapat. Son şansın bu."
            </motion.h2>
          </motion.div>
        )}

        {sceneState === 'p1' && (
          <motion.div key="p1" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 z-10 pt-28 px-6 pb-6">
            <IndustrialPuzzle1 onSolve={handleP1Solve} />
          </motion.div>
        )}

        {sceneState === 'p2' && (
          <motion.div key="p2" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="absolute inset-0 z-10 pt-28 px-6 pb-6">
            <IndustrialPuzzle2 puzzleData={puzzleData} onSolve={handleP2Solve} />
          </motion.div>
        )}

        {sceneState === 'p3' && (
          <motion.div key="p3" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 pt-28 px-6 pb-6">
            <IndustrialPuzzle3 puzzleData={puzzleData} onSolve={handleP3Solve} />
          </motion.div>
        )}

        {sceneState === 'escape' && (
          <motion.div
            key="escape"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#0A0A08] z-40 flex items-center justify-center p-8 text-center flex-col"
          >
            <motion.h2 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-6xl font-timer text-green-500 mb-8 drop-shadow-[0_0_20px_rgba(127,255,0,0.8)] uppercase tracking-widest"
            >
              MASTER SİSTEM KAPATILDI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="font-puzzle text-2xl text-gray-400 max-w-2xl"
            >
              "Tüm tesis güç kesti. Kirlilik sızıntısı durduruldu. Gezegen bir nefes aldı."
            </motion.p>
            <motion.div 
              initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 3, duration: 1 }}
              className="h-1 bg-green-500 rounded-full mt-12 max-w-4xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
