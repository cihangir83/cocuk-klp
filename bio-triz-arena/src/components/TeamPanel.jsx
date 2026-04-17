import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, P } from '../context/GameContext';
import { questions } from '../data/questions';

export default function TeamPanel() {
  const { state, dispatch } = useGame();

  const useJoker = (teamId, jokerType) => {
    let payload = { teamId, jokerType };
    let alertMsg = '';

    // 2. Jokerin spesifik özelliğini devreye sok
    if (jokerType === 'extend') {
      dispatch({ type: P.ADD_TIME, payload: 15 });
    } else if (jokerType === 'shield') {
      alertMsg = `${teamId} takımı KALKAN açtı! Bu soruda yanlış cevap verseler de Öğretmen panelinden "Eksi Puan" (-50) tıklansanız bile eksi puan işlemez.`;
    } else if (jokerType === 'eliminate') {
      if (state.eliminatedOptions && state.eliminatedOptions.length > 0) {
        alert("Bu turda şıklar ZATEN elenmiş! Başka bir eleme jokeri kullanılamaz (jokeriniz silinmedi).");
        return; // İşlemi iptal et
      }
      
      // Find current question to get wrong answers
      const currentQList = questions[`tur${state.currentTur}`] || [];
      const questionData = currentQList[state.currentQuestionIndex];
      
      if (questionData && questionData.options) {
        const wrongOptions = questionData.options.filter(o => !o.correct).map(o => o.id);
        const shuffled = wrongOptions.sort(() => 0.5 - Math.random());
        payload.eliminateIds = [shuffled[0], shuffled[1]];
        alertMsg = `${teamId} takımı ELEME kullandı! Sınıfa dönüp ${shuffled[0]} ve ${shuffled[1]} şıklarının elendiğini söyleyebilirsiniz. Ekrandan da soluklaşacaklardır.`;
      } else {
        alertMsg = "Bu turda elenecek şık bulunmuyor.";
      }
    }

    // 1. İşlemi (Azaltma, state kaydı) yap
    dispatch({ type: P.USE_JOKER, payload });
    
    if (alertMsg) alert(alertMsg);
  };

  return (
    <div className="w-full flex gap-4 px-8 mt-auto mb-6">
      <AnimatePresence>
        {state.teams.map((team, i) => (
          <motion.div
            key={team.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 bg-arena-card border-t-[4px] rounded-b-lg p-4 flex flex-col relative overflow-hidden"
            style={{ borderTopColor: team.color }}
          >
            {/* Ambient Background Glow */}
            <div 
              className="absolute top-0 inset-x-0 h-16 opacity-10 pointer-events-none"
              style={{ background: `linear-gradient(to bottom, ${team.color}, transparent)` }}
            />

            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{team.icon}</span>
                <span className="font-team text-2xl uppercase tracking-wider text-white">
                  {team.name}
                </span>
              </div>
              <div className="font-score text-3xl tabular-nums" style={{ color: team.color }}>
                {team.score}
              </div>
            </div>

            {/* Jokers Area */}
            <div className="flex gap-4 mt-4 z-10 justify-center">
              <JokerButton 
                icon="🛡️" 
                count={team.jokers.shield} 
                onClick={() => useJoker(team.id, 'shield')} 
                color={team.color}
                title="Kalkan"
              />
              <JokerButton 
                icon="⏩" 
                count={team.jokers.extend} 
                onClick={() => useJoker(team.id, 'extend')} 
                color={team.color}
                title="Süre"
              />
              <JokerButton 
                icon="🎯" 
                count={team.jokers.eliminate} 
                onClick={() => useJoker(team.id, 'eliminate')} 
                color={team.color}
                title="Eleme"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function JokerButton({ icon, count, onClick, color, title }) {
  const disabled = count <= 0;
  
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative w-12 h-12 rounded border flex flex-col items-center justify-center transition-all ${
        disabled 
          ? 'border-gray-700 bg-gray-800/50 opacity-40 grayscale pointer-events-none' 
          : 'border-gray-600 bg-black/40 hover:bg-black/60 cursor-pointer'
      }`}
      style={{
        boxShadow: !disabled ? `inset 0 0 10px ${color}20` : 'none'
      }}
      title={title}
    >
      <span className="text-xl">{icon}</span>
      {!disabled && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
