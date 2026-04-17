import React, { useState } from 'react';
import { useGame, P } from '../context/GameContext';
import { questions } from '../data/questions';

export default function TeacherPanel() {
  const { state, dispatch } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  // If in opening or ceremony, minimal controls
  if (state.phase === 'opening' || state.phase === 'ceremony') {
    return null;
  }

  const handleNextQuestion = () => {
    // Current round sequence check
    const currentQList = questions[`tur${state.currentTur}`] || [];
    
    if (state.currentQuestionIndex + 1 < currentQList.length) {
       dispatch({ type: P.NEXT_QUESTION });
       dispatch({ type: P.SET_TIMER, payload: currentQList[state.currentQuestionIndex + 1].timeLimit });
    } else {
       // Move to next round/phase
       let nextTur = state.currentTur + 1;
       if (state.currentTur === 1) {
         dispatch({ type: P.NEXT_ROUND, payload: 2 });
       } else if (state.currentTur === 2) {
         dispatch({ type: P.NEXT_ROUND, payload: 3 });
       } else if (state.currentTur === 3) {
         dispatch({ type: P.SET_PHASE, payload: 'final' });
         nextTur = 4;
       }
       
       // set timer for the first question of the new round
       if (nextTur <= 3) {
          const nextQList = questions[`tur${nextTur}`];
          if (nextQList && nextQList.length > 0) {
             dispatch({ type: P.SET_TIMER, payload: nextQList[0].timeLimit || 0 });
          }
       }
    }
  };

  const handleReset = () => {
    dispatch({ type: P.SET_PHASE, payload: 'setup' });
    // Should technically reset scores and everything else
  };

  const handleScoreUpdate = (teamId, points, teamName) => {
    if (points < 0 && state.activeShields && state.activeShields[teamId]) {
      alert(`${teamName} takımının KALKANI aktif! Bu turda eksi puan (-50) veremezsiniz.`);
      return;
    }
    dispatch({ type: P.UPDATE_SCORE, payload: { teamId, points } });
  };

  return (
    <div className={`fixed z-[999] bottom-0 right-0 bg-gray-900 border-l border-t border-gray-600 rounded-tl-xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-40px)]'}`}>
      <div className="flex h-full">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 bg-gray-800 hover:bg-gray-700 flex items-center justify-center rounded-tl-xl"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="text-xs uppercase tracking-[0.3em] font-ui text-gray-400 p-2">ÖĞRETMEN PANELİ</span>
        </button>
        
        <div className="p-6 w-80 flex flex-col gap-4">
          <h3 className="text-neon-blue font-bold tracking-widest text-lg border-b border-gray-700 pb-2">KONTROLLER</h3>
          
          <div className="flex flex-col gap-2">
            <button onClick={handleNextQuestion} className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 rounded text-left text-sm uppercase">
               Sonraki Soru / Aşama ⏩
            </button>
            <button onClick={() => dispatch({ type: P.STOP_TIMER })} className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 rounded text-left text-sm uppercase">
               Süreyi Durdur ⏸️
            </button>
            <button onClick={handleReset} className="bg-red-900/50 hover:bg-red-900/80 border border-red-900 px-4 py-2 rounded text-left text-sm uppercase mt-4">
               Turnuvayı Sıfırla 🔄
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
             <h4 className="text-xs text-gray-400 uppercase mb-3">🎖️ Puan Yönetimi (Doğru Bilenler)</h4>
             <div className="flex flex-col gap-2">
               {state.teams.map(team => (
                 <div key={team.id} className="flex items-center justify-between bg-black/50 p-2 rounded border border-gray-800">
                   <div className="flex items-center gap-2">
                     <span style={{ color: team.color }}>{team.icon}</span>
                     <span className="text-sm font-bold truncate w-16">{team.name}</span>
                   </div>
                   <div className="flex gap-1">
                     <button 
                       onClick={() => handleScoreUpdate(team.id, -50, team.name)}
                       className="bg-red-900/60 hover:bg-red-900 px-2 py-1 rounded text-xs font-bold"
                     >
                       -50
                     </button>
                     <button 
                       onClick={() => handleScoreUpdate(team.id, 100, team.name)}
                       className="bg-green-900/60 hover:bg-green-900 px-2 py-1 rounded text-xs font-bold"
                     >
                       +100
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
             <div className="text-xs text-gray-500 uppercase">Geçerli Durum</div>
             <div className="text-sm">Aşama: <span className="text-white">{state.phase}</span></div>
             <div className="text-sm">Tur: <span className="text-white">{state.currentTur}</span></div>
             <div className="text-sm">Soru: <span className="text-white">{state.currentQuestionIndex + 1}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
