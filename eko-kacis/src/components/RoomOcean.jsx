import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useCountdown } from '../hooks/useCountdown';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import OceanPuzzle1 from './puzzles/OceanPuzzle1';
import OceanPuzzle2 from './puzzles/OceanPuzzle2';
import OceanPuzzle3 from './puzzles/OceanPuzzle3';

export default function RoomOcean() {
  const { state, dispatch } = useGame();
  const { formattedTime, timerColor, isCritical } = useCountdown(state.totalTimeRemaining, true);
  const [init, setInit] = useState(false);
  const [sceneState, setSceneState] = useState('cutscene'); // cutscene | p1 | p2 | p3 | escape
  
  // Data carried over between puzzles
  const [puzzleData, setPuzzleData] = useState({
    p1Result: null, // e.g. target coordinates and code
    p2Result: null, // e.g. safe code
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    // Cutscene logic
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
      dispatch({ type: 'ROOM_COMPLETED', payload: { roomId: 'room_ocean', timeSpent: 0 } });
    }, 4000); // 4 seconds escape animation
  };

  return (
    <div className="relative w-full h-screen bg-[#040E1A] overflow-hidden text-white font-ui selection:border-blue-500">
      {/* Background Particles */}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#64B4FF" },
              move: {
                direction: "top",
                enable: true,
                speed: 1,
                straight: false,
              },
              number: { density: { enable: true, area: 800 }, value: 40 },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 2, max: 6 } },
            },
          }}
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
        />
      )}

      {/* Global Room Header */}
      {sceneState !== 'cutscene' && sceneState !== 'escape' && (
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-[#0A2A4A] to-transparent pointer-events-none">
          <div>
            <h2 className="text-xl font-timer tracking-widest text-[#0077BE]">KİRLİ OKYANUS</h2>
            <p className="text-xs text-gray-400 font-puzzle">DERİNLİK: -180m | BASINÇ: YÜKSEK</p>
          </div>
          <div className="flex flex-col items-end pointer-events-auto">
            <span className="text-xs font-timer tracking-widest text-gray-400 mb-1">KRİTİK SÜRE</span>
            <motion.div 
              className="text-4xl font-timer font-bold drop-shadow-md"
              style={{ color: timerColor }}
              animate={isCritical ? { opacity: [1, 0.5, 1], scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              {formattedTime}
            </motion.div>
          </div>
        </header>
      )}

      {/* Scene Transitions */}
      <AnimatePresence mode="wait">
        {sceneState === 'cutscene' && (
          <motion.div
            key="cutscene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-center items-center bg-[#040E1A] z-40 px-8 text-center"
          >
            <div className="w-64 h-64 border-4 border-[#0077BE]/30 flex items-center justify-center mb-8 bg-[#0A2A4A]/50 backdrop-blur-md relative overflow-hidden">
               {/* Visual proxy for turtle/plastic */}
               <motion.div 
                className="absolute w-20 h-20 bg-[#64B4FF] rounded-full blur-xl opacity-50"
                animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
               />
               <span className="font-puzzle text-[#0077BE] text-sm">GÖRÜNTÜ ALINIYOR...</span>
            </div>
            <motion.h2 
              className="text-2xl font-narrative text-gray-300 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              "Bu kaplumbağayı kurtarmak için sistemi yeniden başlat."
            </motion.h2>
          </motion.div>
        )}

        {sceneState === 'p1' && (
          <motion.div key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 pt-24 px-6 pb-6">
            <OceanPuzzle1 onSolve={handleP1Solve} />
          </motion.div>
        )}

        {sceneState === 'p2' && (
          <motion.div key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 pt-24 px-6 pb-6">
            <OceanPuzzle2 puzzleData={puzzleData} onSolve={handleP2Solve} />
          </motion.div>
        )}

        {sceneState === 'p3' && (
          <motion.div key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 pt-24 px-6 pb-6">
            <OceanPuzzle3 puzzleData={puzzleData} onSolve={handleP3Solve} />
          </motion.div>
        )}

        {sceneState === 'escape' && (
          <motion.div
            key="escape"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#040E1A] z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <h2 className="text-5xl font-timer text-green-500 mb-4 drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]">BÖLGE 1 KURTARILDI</h2>
              <div className="w-full h-1 bg-green-500 rounded-full mt-8 mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
