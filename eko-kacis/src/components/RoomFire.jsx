import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useCountdown } from '../hooks/useCountdown';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import FirePuzzle1 from './puzzles/FirePuzzle1';
import FirePuzzle2 from './puzzles/FirePuzzle2';
import FirePuzzle3 from './puzzles/FirePuzzle3';

export default function RoomFire() {
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
      dispatch({ type: 'ROOM_COMPLETED', payload: { roomId: 'room_fire', timeSpent: 0 } });
    }, 4000);
  };

  return (
    <div className="relative w-full h-screen bg-[#0D0500] overflow-hidden text-white font-ui selection:border-orange-500">
      {/* Particles effect for embers and smoke */}
      {init && (
        <Particles
          id="tsparticles-fire"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#FF4500" },
              move: {
                direction: "top",
                enable: true,
                speed: 3,
                straight: false,
                outModes: { default: "out" }
              },
              number: { density: { enable: true, area: 800 }, value: 60 },
              opacity: { value: { min: 0.1, max: 0.8 } },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 4 } },
            },
          }}
          className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none"
        />
      )}

      {/* Global Room Header */}
      {sceneState !== 'cutscene' && sceneState !== 'escape' && (
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-[#2C0000] to-transparent pointer-events-none mb-12">
          <div className="pointer-events-auto">
            <h2 className="text-xl font-timer tracking-widest text-[#FF4500] drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]">ORMAN YANGINI</h2>
            <p className="text-xs text-[#FF8C00] font-puzzle">SICAKLIK: 450°C | RÜZGAR: GÜNEYDOĞU</p>
          </div>
          <div className="flex flex-col items-end pointer-events-auto">
            <span className="text-xs font-timer tracking-widest text-red-500 mb-1">DURUM KRİTİK</span>
            <motion.div 
              className="text-4xl font-timer font-bold drop-shadow-md text-red-500"
              style={{ color: timerColor }}
              animate={isCritical ? { opacity: [1, 0.5, 1], scale: [1, 1.05, 1], rotate: [-1, 1, -1] } : {}}
              transition={{ repeat: Infinity, duration: 0.4 }}
            >
              {formattedTime}
            </motion.div>
          </div>
        </header>
      )}

      {/* Vignette effect reflecting heat */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 150px rgba(255, 69, 0, 0.3)' }} />

      <AnimatePresence mode="wait">
        {sceneState === 'cutscene' && (
          <motion.div
            key="cutscene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-center items-center bg-[#0D0500] z-40 px-8 text-center"
          >
            <div className="w-full max-w-xl h-48 border-2 border-red-900/50 flex flex-col items-center justify-center mb-8 bg-[#1A0000]/80 backdrop-blur-md relative overflow-hidden">
               <motion.div 
                className="absolute inset-x-0 bottom-0 bg-[#FF4500] blur-2xl opacity-60"
                animate={{ height: ['20%', '80%', '20%'] }}
                transition={{ duration: 3, repeat: Infinity }}
               />
               <span className="font-puzzle text-red-500 text-lg z-10 animate-pulse">UYDU GÖRÜNTÜSÜ: SİNYAL ZAYIF</span>
            </div>
            <motion.h2 
              className="text-3xl font-narrative text-orange-200 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              "Yangının yayılmasını durdur. Rüzgar yönünü hesapla."
            </motion.h2>
          </motion.div>
        )}

        {sceneState === 'p1' && (
          <motion.div key="p1" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="absolute inset-0 z-10 pt-28 px-6 pb-6">
            <FirePuzzle1 onSolve={handleP1Solve} />
          </motion.div>
        )}

        {sceneState === 'p2' && (
          <motion.div key="p2" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="absolute inset-0 z-10 pt-28 px-6 pb-6">
            <FirePuzzle2 puzzleData={puzzleData} onSolve={handleP2Solve} />
          </motion.div>
        )}

        {sceneState === 'p3' && (
          <motion.div key="p3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 pt-28 px-6 pb-6">
            <FirePuzzle3 puzzleData={puzzleData} onSolve={handleP3Solve} />
          </motion.div>
        )}

        {sceneState === 'escape' && (
          <motion.div
            key="escape"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#0D0500] z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <h2 className="text-5xl font-timer text-orange-500 mb-4 drop-shadow-[0_0_20px_rgba(255,69,0,0.8)]">BÖLGE 2 KURTARILDI</h2>
              <p className="text-xl font-puzzle text-red-500 mt-4 animate-pulse">SON BÖLGE İÇİN BASINÇ ARTIYOR</p>
              <div className="w-full h-1 bg-orange-500 rounded-full mt-8 mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
