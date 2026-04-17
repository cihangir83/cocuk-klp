import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

export default function Leaderboard() {
  const { state } = useGame();
  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full h-full glass-panel rounded-xl flex flex-col p-4">
      <h3 className="text-xl font-arena font-bold text-center text-gray-300 tracking-[0.2em] mb-6">LİDERBOARD</h3>
      
      <div className="flex-1 flex flex-col gap-4 relative">
        <AnimatePresence>
          {sortedTeams.map((team, index) => {
            const isFirst = index === 0 && team.score > 0;
            return (
              <motion.div
                key={team.id}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full relative bg-black/40 rounded border border-gray-800 overflow-hidden"
              >
                {/* Score bar background fill */}
                <motion.div 
                  className="absolute top-0 left-0 h-full opacity-20"
                  style={{ backgroundColor: team.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(5, (team.score / 5000) * 100))}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                <div className="relative z-10 flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex justify-center text-xl font-score text-gray-500">
                      #{index + 1}
                    </div>
                    <div className="text-2xl">{team.icon}</div>
                    <div 
                      className={`font-team text-2xl uppercase tracking-wider ${isFirst ? 'text-glow pulse-slow' : ''}`}
                      style={{ color: team.color }}
                    >
                      {team.name}
                    </div>
                  </div>
                  
                  <div className="font-score text-3xl tabular-nums">
                    {team.score}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
