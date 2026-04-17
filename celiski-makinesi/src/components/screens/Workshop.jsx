import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import StatusBar from '../ui/StatusBar';
import machinesData from '../../data/machines';
import toolsData from '../../data/tools';
import Lamp from '../svg/Lamp';
import Gear from '../svg/Gear';
import { useGameSound } from '../../hooks/useSound';

export default function Workshop() {
  const { state, dispatch } = useGame();
  const sound = useGameSound();

  const handleMachineClick = (machineId, status) => {
    if (status === 'locked') {
      sound.playError();
      return;
    }
    sound.playClick();
    dispatch({ type: 'SELECT_MACHINE', machineId });
  };

  const getMachineStatus = (machineId, idx) => {
    if (state.solvedMachines.includes(machineId)) return 'solved';
    
    // İlk makine hep açıktır veya önceki makine çözülmüşse açıktır.
    // Daha esnek yapı için: Makinenin unlock zincirine bakılır, ama basitçe indexe göre bakıyoruz.
    if (idx === 0) return 'active';
    
    // Bir makine unlocked olmak için, bi önceki aşamadaki unlock listesinde olmalı veya belli sayıda makine çözülmüş olmalı.
    // Şimdilik zincir mantığı: Eğer previous machine is solved, current is active.
    const prevMachine = machinesData[idx - 1];
    if (state.solvedMachines.includes(prevMachine.id)) return 'active';
    
    // Eğer tool unlocks aracılığıyla geldiyse gibi logic eklenebilir, şimdilik basit lineer kilit:
    return 'locked';
  };

  const renderMachineShelf = () => {
    return (
      <div className="w-1/3 bg-[var(--color-bg-deep)] border-r-4 border-[var(--color-metal-dark)] relative h-full flex flex-col p-4 shadow-[10px_0_20px_rgba(0,0,0,0.5)] z-20">
        <h2 className="text-center font-[var(--font-engraved)] text-xl text-[var(--color-brass)] mb-4 pb-2 border-b-2 border-[var(--color-metal-light)]">MAKİNE RAFLARI</h2>
        
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-6 custom-scrollbar">
          {['teknik_celiski', 'fiziksel_celiski', 'sistem_celiskisi', 'ekolojik_celiski'].map((category, catIdx) => {
            const catMachines = machinesData.filter(m => m.category === category);
            if (catMachines.length === 0) return null;
            
            return (
              <div key={category} className="bg-[var(--color-metal-dark)] border border-[var(--color-metal-light)] p-3 rounded flex flex-col gap-3 relative">
                {/* Raf Görünümü */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-copper-bright)] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-[var(--color-metal-light)] shadow-[-2px_2px_5px_rgba(0,0,0,0.5)]"></div>
                
                <h3 className="text-[10px] font-[var(--font-mechanical)] text-[var(--color-text-muted)] tracking-wider">
                  {category.replace('_', ' ').toUpperCase()}
                </h3>
                
                <div className="grid grid-cols-3 gap-2 pb-2">
                  {catMachines.map((m) => {
                    const idx = machinesData.findIndex(md => md.id === m.id);
                    const status = getMachineStatus(m.id, idx);
                    
                    return (
                      <motion.div 
                        key={m.id}
                        whileHover={status !== 'locked' ? { scale: 1.05, y: -2 } : {}}
                        onClick={() => handleMachineClick(m.id, status)}
                        className={`
                          relative flex flex-col items-center justify-center p-2 h-20 rounded border-2 cursor-pointer transition-colors
                          ${status === 'solved' ? 'border-[var(--color-lamp-green)] bg-[var(--color-lamp-green)]/10' : ''}
                          ${status === 'active' ? 'border-[var(--color-lamp-yellow)] bg-[var(--color-lamp-yellow)]/10 pulse-attention' : ''}
                          ${status === 'locked' ? 'border-[var(--color-metal-mid)] bg-black/40 grayscale' : ''}
                        `}
                      >
                        {status === 'solved' && <Lamp color="green" size={16} className="absolute top-1 left-1" />}
                        {status === 'active' && <Lamp color="red" size={16} className="absolute top-1 left-1" />}
                        {status === 'locked' && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xl">🔒</div>}
                        
                        <Gear size={30} color={status === 'solved' ? 'brass' : 'rust'} animationState={status === 'solved' ? 'spinning-cw' : 'locked'} />
                        <span className="text-[8px] text-center font-[var(--font-mechanical)] mt-1 truncate w-full" title={m.name}>{m.id.split('_')[1]}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderToolCabinet = () => {
    return (
      <div className="w-1/3 bg-[var(--color-bg-deep)] border-l-4 border-[var(--color-metal-dark)] relative h-full flex flex-col p-4 shadow-[-10px_0_20px_rgba(0,0,0,0.5)] z-20">
        <h2 className="text-center font-[var(--font-engraved)] text-xl text-[var(--color-brass)] mb-4 pb-2 border-b-2 border-[var(--color-metal-light)]">TRIZ ALET DOLABI</h2>
        
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 gap-3 custom-scrollbar content-start">
          {toolsData.map(t => {
            const isUnlocked = state.availableTools.includes(t.id);
            
            return (
              <div 
                key={t.id}
                className={`
                  relative h-20 border-2 rounded flex flex-col items-center justify-center p-2
                  ${isUnlocked 
                    ? 'metal-surface border-[var(--color-brass)] shadow-[inset_0_0_10px_rgba(201,168,76,0.1)]' 
                    : 'bg-[#0f0b08] border-[var(--color-metal-dark)] opacity-50'}
                `}
              >
                {/* Çekmece kulpu */}
                <div className="absolute top-2 w-8 h-2 bg-[var(--color-metal-light)] rounded-full shadow-[0_2px_2px_rgba(0,0,0,0.5)]"></div>
                
                {isUnlocked ? (
                  <>
                    <span className="text-[var(--color-lamp-blue)] font-[var(--font-mechanical)] text-xs font-bold mt-2">#{t.trizNumber}</span>
                    <span className="text-[10px] text-center font-[var(--font-engraved)] text-[var(--color-text-engraved)] mt-1 truncate w-full">{t.name}</span>
                  </>
                ) : (
                  <div className="text-xl mt-3">🔒</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <StatusBar />
      
      <div className="flex-1 flex overflow-hidden workshop-bg relative">
        {/* Ortadaki Tezgah (Boş) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-[800px] h-[500px] bg-[var(--color-metal-dark)]/40 border-8 border-[var(--color-metal-mid)] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)_inset] flex flex-col items-center justify-center">
            <Gear size={200} color="dark" animationState="idle" className="opacity-10" />
            <h1 className="font-[var(--font-engraved)] text-4xl text-[var(--color-text-muted)] mt-8 uppercase tracking-widest opacity-30">Ana Tezgah</h1>
            <p className="font-[var(--font-mechanical)] text-[var(--color-text-muted)] mt-4 opacity-50">Bir makine seçerek buraya alın.</p>
          </div>
        </div>

        {renderMachineShelf()}
        
        <div className="w-1/3"></div> {/* Orta boşluk */}

        {renderToolCabinet()}

        {/* Floating Buttons */}
        <div className="absolute bottom-6 right-6 flex gap-4 z-50">
          <button 
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'teacherPanel' })}
            className="w-12 h-12 rounded-full metal-surface border-2 border-[var(--color-metal-light)] flex items-center justify-center text-xl hover:border-[var(--color-brass)] transition-colors"
            title="Öğretmen Paneli"
          >
            ⚙️
          </button>
          <button 
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'notebook' })}
            className="w-16 h-16 rounded-lg leather-texture border-2 border-[var(--color-copper)] flex items-center justify-center text-2xl hover:border-[var(--color-copper-bright)] transition-colors hover:-translate-y-1 shadow-lg"
            title="TRIZ Keşif Defteri"
          >
            📔
          </button>
        </div>

      </div>
    </div>
  );
}
