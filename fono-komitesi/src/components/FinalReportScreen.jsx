import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { projects, badges } from '../data/gameData';
import { Award, Share2, RotateCcw } from 'lucide-react';

export default function FinalReportScreen() {
  const { state, dispatch } = useGame();
  
  const selectedProject = projects.find(p => p.id === state.finalDecision);

  useEffect(() => {
    // Save to local storage for the Teacher Panel
    const previousRuns = JSON.parse(localStorage.getItem('fono-komitesi-runs') || '[]');
    const currentRun = {
      id: Date.now(),
      playerName: state.playerName,
      date: new Date().toISOString(),
      decision: state.finalDecision,
      decisionName: selectedProject?.name,
      criteriaWeights: state.criteriaWeights,
      justification: state.justification,
      consistencyRatio: state.analysisResult?.consistencyRatio,
      scenariosCount: state.scenarios.length
    };
    localStorage.setItem('fono-komitesi-runs', JSON.stringify([...previousRuns, currentRun]));
  }, []);

  const handleReplay = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  // Calculate earned badges
  const earnedBadges = [];
  earnedBadges.push(badges.find(b => b.id === 'first_decision'));
  if (state.analysisResult?.consistencyRatio < 0.1) earnedBadges.push(badges.find(b => b.id === 'consistent'));
  if (state.scenarios.length >= 5) earnedBadges.push(badges.find(b => b.id === 'all_scenarios'));
  if (Object.keys(state.notes).length === 4) earnedBadges.push(badges.find(b => b.id === 'full_notes'));
  if (state.justification.length > 200) earnedBadges.push(badges.find(b => b.id === 'long_justify'));

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl h-[85vh] glass-panel p-10 flex flex-col z-10 font-['Share_Tech_Mono']"
    >
      <header className="text-center mb-10">
        <h1 className="text-4xl font-['Rajdhani'] font-bold text-[var(--color-accent-gold)] tracking-widest mb-2">KOMİTE ANALİZİ TAMAMLANDI</h1>
        <p className="text-gray-400">Kararınız sisteme kaydedildi. Toplumsal ve ekolojik etkileri yakında hissedeceğiz.</p>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-12">
        {/* Left Side: Summary */}
        <div className="space-y-6">
          <div className="p-6 bg-black/40 border border-t-[var(--color-accent-blue)] border-x-transparent border-b-transparent">
            <h2 className="text-xl font-['Rajdhani'] text-[var(--color-accent-cyan)] mb-4">GÖREV ÖZETİ</h2>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Başkan:</span>
                <span className="text-white">{state.playerName.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Seçilen Kriterler:</span>
                <span className="text-white">4 Adet</span>
              </div>
              <div className="flex justify-between">
                <span>AHP Tutarsızlık Oranı:</span>
                <span className={state.analysisResult?.consistencyRatio <= 0.1 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}>
                  {state.analysisResult?.consistencyRatio.toFixed(3)}
                </span>
              </div>
              <div className="flex gap-2flex justify-between">
                <span>Simülasyon Senaryoları:</span>
                <span className="text-white">{state.scenarios.length} Farklı Senaryo Denendi</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[var(--color-accent-gold)]/10 border border-[var(--color-accent-gold)] rounded">
            <h2 className="text-xl font-['Rajdhani'] text-[var(--color-accent-gold)] mb-2">KARARINIZ SAVUNULABİLİR Mİ?</h2>
            <div className="text-white text-lg flex items-center gap-2">
              EVET <span className="text-[var(--color-success)]">✓</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Gerekçeniz arşivlendi ve tutarsızlık oranınız kabul edilebilir sınırlar içerisindeyse sistem tarafından bilimsel olarak onaylanmıştır.
            </p>
          </div>
        </div>

        {/* Right Side: Badges & Actions */}
        <div className="flex flex-col">
          <h2 className="text-xl font-['Rajdhani'] text-[var(--color-accent-blue)] mb-4">KAZANILAN ROZETLER</h2>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {earnedBadges.map(b => (
              <motion.div 
                key={b.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="bg-[var(--color-bg-card)] border border-[var(--color-glass-border)] p-4 flex flex-col items-center justify-center text-center rounded relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
                <Award className="text-[var(--color-accent-gold)] mb-2" size={32} />
                <h3 className="font-bold text-white text-sm">{b.name}</h3>
                <p className="text-[10px] text-gray-500 mt-1">{b.condition}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button 
              onClick={handleReplay}
              className="flex-1 py-4 bg-transparent border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)] hover:text-black transition-colors font-bold tracking-widest rounded flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> YENİDEN OYNA
            </button>
            <button className="py-4 px-6 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
