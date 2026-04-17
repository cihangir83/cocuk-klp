import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, P } from '../context/GameContext';
import Particles from '@tsparticles/react';

export default function Tur3Visual({ data }) {
  const { state, dispatch } = useGame();
  
  // States simulation for the demo
  const [winnerTeam, setWinnerTeam] = useState(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Start timing internally for speed
    const t = setTimeout(() => setShowImage(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const simulateWinner = (team) => {
    setWinnerTeam(team);
    dispatch({ 
      type: P.UPDATE_SCORE, 
      payload: { teamId: team.id, points: 1000 } 
    });
  };

  return (
    <div className="w-full h-full relative z-20 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-black">
      
      {/* Target Image rendering */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {/* Visual representation */}
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 opacity-80">
               {data.image.startsWith('http') ? (
                 <img src={data.image} alt={data.imageAlt} className="w-full h-full object-cover" />
               ) : (
                 <>
                   <span className="text-8xl mb-8 opacity-30">📸</span>
                   <span className="text-4xl opacity-30">{data.image}</span>
                 </>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Main Question Text */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="z-10 mt-auto mb-16 max-w-4xl text-center"
      >
        <div className="px-12 py-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-arena font-bold p-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple leading-tight tracking-[0.1em]">
            BU CANLININ HANGİ TRIZ İLKESİNE İLHAM VERDİĞİNİ BUL
          </h2>
          <div className="mt-8 flex justify-center">
             <div className="w-24 h-2 bg-neon-pink rounded shadow-glow-pink animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Winner Overlay */}
      <AnimatePresence>
        {winnerTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: `${winnerTeam.color}30` }}
          >
            <Particles 
              id="winner-particles" 
              options={getExplosionConfig(winnerTeam.color)} 
            />
            
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-black/90 p-16 rounded-3xl border-[6px] text-center"
              style={{ borderColor: winnerTeam.color, boxShadow: `0 0 100px ${winnerTeam.color}` }}
            >
              <div className="text-8xl mb-6">{winnerTeam.icon}</div>
              <h1 className="text-6xl font-arena font-black mb-4 uppercase text-glow" style={{ color: winnerTeam.color }}>
                {winnerTeam.name} İLK BULDU!
              </h1>
              <div className="text-4xl font-score text-white tracking-widest">
                +{data.points.first} PUAN
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* Teacher Simulation Buttons */}
      {!winnerTeam && state.teams.length > 0 && (
         <div className="absolute top-4 left-4 z-50 flex gap-2">
           {state.teams.map(t => (
             <button key={t.id} onClick={() => simulateWinner(t)} className="bg-gray-800 text-xs p-2 rounded">
               {t.name} Buldu
             </button>
           ))}
         </div>
      )}
    </div>
  );
}

function getExplosionConfig(color) {
  return {
    fullScreen: { enable: false },
    particles: {
      color: { value: [color, "#ffffff"] },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "destroy" },
        speed: { min: 20, max: 40 },
      },
      number: { value: 0 },
      opacity: { value: 1 },
      shape: { type: "star" },
      size: { value: { min: 5, max: 15 } }
    },
    emitters: {
      direction: "none",
      life: { count: 1, duration: 0.1, delay: 0 },
      rate: { delay: 0.1, quantity: 200 },
      size: { width: 0, height: 0 },
      position: { x: 50, y: 50 }
    }
  };
}
