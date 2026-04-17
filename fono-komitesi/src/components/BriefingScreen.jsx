import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { allCriteria, projects } from '../data/gameData';
import { playSound } from '../utils/soundManager';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';

export default function BriefingScreen() {
  const { state, dispatch } = useGame();

  const handleToggleCriteria = (id) => {
    if (state.selectedCriteria.length >= 4 && !state.selectedCriteria.includes(id)) {
      playSound('warningCR');
      return;
    }
    playSound('click');
    dispatch({ type: 'TOGGLE_CRITERIA', payload: id });
  };

  const isReady = state.selectedCriteria.length === 4;

  const handleNext = () => {
    playSound('click');
    dispatch({ type: 'SET_STAGE', payload: 'presentation' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-7xl h-[90vh] glass-panel p-8 flex flex-col z-10"
    >
      {/* Header */}
      <header className="flex justify-between items-end border-b border-[var(--color-glass-border)] pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-['Rajdhani'] font-bold text-white tracking-wider">KOMİTE BRİFİNG BELGESİ</h1>
          <p className="text-[var(--color-accent-blue)] font-['Share_Tech_Mono']">BAŞKAN: {state.playerName.toUpperCase()}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-400 font-['Share_Tech_Mono']">
          <FileText size={18} />
          <span>DOSYA GİZLİLİK: ÇOK GİZLİ</span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 grid grid-cols-12 gap-8 h-full overflow-hidden">
        
        {/* Left Panel: Mission */}
        <div className="col-span-3 border-r border-[var(--color-glass-border)] pr-8 flex flex-col">
          <h2 className="text-xl font-['Rajdhani'] text-[var(--color-accent-cyan)] mb-4 uppercase">Görev Tanımı</h2>
          <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
            <p><strong>Göreviniz:</strong> 4 finalist biyomimetik projeyi değerlendirin. Kriterleri belirleyin, ağırlıklandırın.</p>
            <p>Analitik Hiyerarşi Süreci ile sıralayın. Fonlanacak projeyi seçin ve gerekçenizi yazın.</p>
            <div className="mt-8 p-4 bg-[var(--color-bg-card)] rounded border border-[var(--color-glass-border)]">
              <h3 className="text-[var(--color-accent-gold)] mb-2 font-['Share_Tech_Mono']">DİKKAT!</h3>
              <p className="text-xs">Değerlendirme kriterleri doğrudan sizin insiyatifinizdedir. Seçtiğiniz 4 kriter, projelerin geleceğini belirleyecek.</p>
            </div>
          </div>
        </div>

        {/* Center Panel: Criteria Selection */}
        <div className="col-span-5 border-r border-[var(--color-glass-border)] pr-8 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-['Rajdhani'] text-[var(--color-accent-cyan)] uppercase">Aday Kriterler</h2>
            <span className={`font-['Share_Tech_Mono'] ${isReady ? 'text-[var(--color-success)]' : 'text-gray-400'}`}>
              SEÇİLEN: {state.selectedCriteria.length} / 4
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-2 pb-4">
            {allCriteria.map((c) => {
              const isSelected = state.selectedCriteria.includes(c.id);
              return (
                <motion.div
                  key={c.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToggleCriteria(c.id)}
                  className={`p-4 rounded cursor-pointer transition-all border ${
                    isSelected 
                      ? 'bg-[var(--color-holo-glow)] border-[var(--color-accent-blue)]' 
                      : 'bg-[var(--color-bg-card)] border-transparent hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`font-medium ${isSelected ? 'text-[var(--color-accent-blue)]' : 'text-gray-200'}`}>
                      {c.name}
                    </h3>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <CheckCircle size={18} className="text-[var(--color-accent-blue)]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{c.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Project Preview */}
        <div className="col-span-4 flex flex-col min-h-0">
          <h2 className="text-xl font-['Rajdhani'] text-[var(--color-accent-cyan)] mb-4 uppercase shrink-0">Finalist Projeler</h2>
          <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2">
            {projects.map((p) => (
              <div key={p.id} className="p-3 border-l-2 border-[var(--color-glass-border)] hover:border-white transition-colors">
                <h3 className="font-['Exo_2'] text-lg" style={{ color: p.color }}>{p.name.toUpperCase()}</h3>
                <p className="text-xs text-gray-400 font-['Share_Tech_Mono'] mt-1">{p.tagline}</p>
              </div>
            ))}
          </div>

          <motion.div 
            className="pt-4 shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0.4 }}
          >
            <button
              disabled={!isReady}
              onClick={handleNext}
              className="w-full py-4 flex items-center justify-center gap-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-cyan)] text-black font-bold uppercase tracking-wider rounded transition-all disabled:pointer-events-none"
            >
              [ SUNUMLARI BAŞLAT ]
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
