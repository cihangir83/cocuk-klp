import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, P } from '../context/GameContext';
import Timer from '../components/Timer';
import { questions } from '../data/questions';

export default function FinalScreen() {
  const { state, dispatch } = useGame();
  
  // Soru bankasından final verisini al: questions.final
  const data = questions.final;
  
  const [phase, setPhase] = useState('intro'); // intro -> question -> grading -> done

  useEffect(() => {
    if (phase === 'intro') {
      const t = setTimeout(() => {
        setPhase('question');
        dispatch({ type: P.SET_TIMER, payload: data.timeLimit });
        dispatch({ type: P.START_TIMER });
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [phase, dispatch, data.timeLimit]);

  const handleTimeExpire = () => {
    dispatch({ type: P.STOP_TIMER });
    setPhase('grading');
  };

  const handleScoreGrade = (teamId, multiplier) => {
    const points = (data.maxPoints / 2) * multiplier; // 0, 500, or 1000
    dispatch({ type: P.UPDATE_SCORE, payload: { teamId, points }});
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-arena-bg pb-0">
      
      {/* Intense Background specifically for final */}
      <div className="absolute inset-0 bg-radial-gradient from-arena-bg via-[#0A0A15] to-[#1a0a0a] pointer-events-none" />

      {/* Top Bar for Final */}
      <div className="w-full h-20 flex items-center justify-between px-8 bg-black/60 border-b border-white/10 z-10">
        <div className="text-2xl font-arena tracking-widest text-[#FFD700]">
          BÜYÜK FİNAL
        </div>
        
        <div className="flex items-center gap-8">
          {phase === 'question' && (
             <Timer initialTime={data.timeLimit} onExpire={handleTimeExpire} />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8 overflow-hidden z-10 items-center justify-center relative">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1.5 }}
              className="text-8xl font-arena font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] to-[#FF8C00] text-glow tracking-tighter"
            >
              FİNAL SORUSU
            </motion.div>
          )}

          {phase === 'question' && (
            <motion.div
              key="question"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-5xl flex gap-8 h-[600px]"
            >
               <div className="flex-1 bg-black/50 border border-gray-700 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 relative">
                 {data.image.startsWith('http') ? (
                    <img src={data.image} alt="Final Challenge" className="w-[80%] h-[70%] object-contain mb-4 rounded shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
                 ) : (
                    <>
                      <span className="text-6xl mb-4">🔬</span>
                      <span className="text-2xl text-gray-400">{data.image}</span>
                    </>
                 )}
                 <p className="mt-8 text-xl font-question text-center text-neon-blue">{data.ecocrisis}</p>
               </div>

               <div className="flex-1 bg-arena-panel p-8 rounded-xl border-l-[4px] border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)] flex flex-col justify-center">
                 <h2 className="text-4xl font-question leading-tight text-white">
                   {data.question}
                 </h2>
                 <p className="mt-8 text-gray-400 uppercase tracking-widest text-sm">
                   Sentez yeteneklerinizi kullanın. Her takımın yazılı cevabı değerlendirilecektir.
                 </p>
               </div>
            </motion.div>
          )}

          {phase === 'grading' && (
            <motion.div
              key="grading"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full h-full flex flex-col items-center pt-8"
            >
               <h2 className="text-4xl font-arena text-[#FFD700] mb-8 animate-pulse text-glow">DEĞERLENDİRME BEKLENİYOR</h2>
               
               <div className="grid grid-cols-2 gap-8 w-full max-w-6xl">
                 {state.teams.map(t => (
                   <div key={t.id} className="bg-arena-card p-6 rounded-xl border border-gray-800">
                     <div className="flex items-center gap-4 mb-4">
                       <span className="text-3xl">{t.icon}</span>
                       <span className="text-2xl font-team" style={{color: t.color}}>{t.name}</span>
                       <span className="ml-auto font-score text-2xl text-gray-400">{t.score} Puan</span>
                     </div>
                     <div className="bg-black/50 h-32 rounded p-4 mb-4 font-answer text-gray-300">
                        Takımın verdiği yazılı cevap burada görünecek...
                     </div>
                     <div className="flex gap-2">
                       <button onClick={() => handleScoreGrade(t.id, 0)} className="flex-1 py-2 bg-red-900/40 border border-red-900 hover:bg-red-900/60 rounded">0 Puan</button>
                       <button onClick={() => handleScoreGrade(t.id, 1)} className="flex-1 py-2 bg-yellow-900/40 border border-yellow-900 hover:bg-yellow-900/60 rounded">500 Puan</button>
                       <button onClick={() => handleScoreGrade(t.id, 2)} className="flex-1 py-2 bg-green-900/40 border border-green-900 hover:bg-green-900/60 rounded">1000 Puan</button>
                     </div>
                   </div>
                 ))}
               </div>
               
               <button 
                 onClick={() => dispatch({ type: P.SET_PHASE, payload: 'ceremony' })}
                 className="mt-12 px-12 py-4 bg-[#FFD700] text-black font-bold uppercase rounded hover:bg-[#FFE55C]"
               >
                 ŞAMPİYONLUK SEREMONİSİNE GEÇ
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
