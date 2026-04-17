import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, P } from '../context/GameContext';
import { questions } from '../data/questions';
import ArenaBackground from '../components/ArenaBackground';
import Leaderboard from '../components/Leaderboard';
import TeamPanel from '../components/TeamPanel';
import Timer from '../components/Timer';

// Soru Tiplerine Göre Componentler
import Tur1Question from './Tur1Question';
import Tur2Scenario from './Tur2Scenario';
import Tur3Visual from './Tur3Visual';

export default function ArenaScreen() {
  const { state, dispatch } = useGame();
  
  // Calculate which question to show
  let currentQList = questions[`tur${state.currentTur}`] || [];
  let questionData = currentQList[state.currentQuestionIndex];
  
  // Temporary workaround if we transition past the last question of a round
  if (!questionData && state.currentTur < 3) {
    // Round end screen logic could go here
    questionData = null; 
  }

  const handleTimeExpire = () => {
    dispatch({ type: P.STOP_TIMER });
    // evaluate answers...
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-arena-bg pb-0">
      <ArenaBackground variant="default" />
      
      {/* Top Bar */}
      <div className="w-full h-20 flex items-center justify-between px-8 bg-black/60 border-b border-white/10 z-10">
        <div className="text-2xl font-arena tracking-widest text-white">
          <span className="text-neon-blue">BIO-TRIZ</span> ARENA
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-xl font-ui uppercase tracking-widest text-gray-400">
            TUR {state.currentTur} <span className="mx-2">•</span> SORU {state.currentQuestionIndex + 1}
          </div>
          {questionData && questionData.timeLimit && (
             <Timer key={`timer-${questionData.id}-${state.currentTur}`} initialTime={questionData.timeLimit} onExpire={handleTimeExpire} />
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 p-8 overflow-hidden z-10">
        
        {/* Left / Center: Question Panel */}
        <div className="flex-1 rounded-xl relative">
          <AnimatePresence mode="wait">
            {questionData && state.currentTur === 1 && (
              <Tur1Question key={questionData.id} data={questionData} />
            )}
            
            {questionData && state.currentTur === 2 && (
              <Tur2Scenario key={questionData.id} data={questionData} />
            )}
            {questionData && state.currentTur === 3 && (
              <Tur3Visual key={questionData.id} data={questionData} />
            )}
          </AnimatePresence>
        </div>

        {/* Right: Leaderboard */}
        <div className="w-[350px] flex-shrink-0">
          <Leaderboard />
        </div>
      </div>

      {/* Bottom: Teams Panel */}
      <TeamPanel />
    </div>
  );
}
