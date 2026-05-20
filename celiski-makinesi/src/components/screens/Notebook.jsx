import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import MetalButton from '../ui/MetalButton';
import toolsData from '../../data/tools';
import machinesData from '../../data/machines';
import ToolIcon from '../svg/ToolIcon';
import { useGameSound } from '../../hooks/useSound';

export default function Notebook() {
  const { state, dispatch } = useGame();
  const sound = useGameSound();

  const handleClose = () => {
    sound.playClick();
    dispatch({ type: 'SET_SCREEN', screen: 'workshop' });
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/90 px-4 py-8 z-50 fixed inset-0 backdrop-blur-sm">
      
      {/* Defter Gövdesi */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="w-full max-w-6xl h-full max-h-[90vh] bg-[#FDF8E7] rounded-r-2xl rounded-l-md shadow-[30px_30px_60px_rgba(0,0,0,0.9)] flex overflow-hidden border-r-8 border-y-4 border-[#8B4513]"
      >
        {/* Defter cilt kordonu / deri sırt */}
        <div className="w-16 shrink-0 bg-gradient-to-r from-[#3D1A0A] to-[#5C2B14] shadow-[5px_0_15px_rgba(0,0,0,0.8)] z-20 flex flex-col items-center py-10 gap-10">
          <div className="w-full h-2 bg-black/40"></div>
          <div className="w-full h-2 bg-black/40"></div>
          <div className="w-full h-2 bg-black/40"></div>
          <div className="w-full h-2 bg-black/40"></div>
        </div>

        {/* Sağ Taraf - Sayfalar ve İçerik */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Üst Başlık Şeridi */}
          <div className="flex justify-between items-center bg-gradient-to-r from-[#2A1810] to-[#4A2D1C] p-4 pl-8 border-b-4 border-[#C9A84C] shadow-md z-10">
            <div className="flex items-center gap-4">
              <h1 className="font-[var(--font-engraved)] text-3xl text-[#C9A84C] tracking-widest drop-shadow-md">TRIZ İLKE KEŞİF DEFTERİ</h1>
              <span className="text-[#C9A84C]/60 text-sm italic font-[var(--font-body)]">Doğanın Mühendislik Sırları</span>
            </div>
            <MetalButton type="brass" onClick={handleClose}>KAPAT</MetalButton>
          </div>

          {/* Sayfa Düzeni */}
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar" style={{ backgroundImage: 'linear-gradient(rgba(139, 69, 19, 0.05) 1px, transparent 1px)', backgroundSize: '100% 2rem' }}>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            
            {toolsData.map(tool => {
              const isUnlocked = state.availableTools.includes(tool.id);
              const relatedMachine = machinesData.find(m => m.correctTool === tool.id);
              const isBioDiscovered = relatedMachine && state.discoveredBioExamples.includes(relatedMachine.id);

              return (
                <div key={tool.id} className="relative">
                  {/* Kilitli Durum */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-[#FDF8E7]/90 z-10 flex flex-col items-center justify-center grayscale backdrop-blur-[1px] border-2 border-dashed border-[#8B4513]/30 rounded-lg">
                       <span className="text-4xl mb-2 opacity-50">🔒</span>
                       <span className="font-[var(--font-engraved)] text-[#5C2B14] text-xl opacity-80 tracking-widest">KİLİTLİ İLKE</span>
                       <span className="text-xs text-[#5C2B14]/60 mt-2 font-[var(--font-body)]">Daha fazla makine çözmelisin.</span>
                    </div>
                  )}
                  
                  {/* Açık Durum (İçerik) */}
                  <div className={`flex gap-5 p-4 rounded-xl transition-all ${isUnlocked ? 'bg-white shadow-[0_5px_15px_rgba(139,69,19,0.1)] border border-[#8B4513]/20 hover:shadow-[0_8px_25px_rgba(139,69,19,0.2)] hover:-translate-y-1' : ''}`}>
                    
                    {/* İkon */}
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-gradient-to-br from-[#F5E6C8] to-[#E6CC98] border-2 border-[#8B6914] rounded-lg shadow-inner">
                      <ToolIcon shape={tool.shape} size={48} color="--color-rust" />
                    </div>
                    
                    {/* Metinler */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-[var(--font-engraved)] font-bold text-2xl text-[#3D1A0A] leading-none">{tool.name}</h3>
                        <span className="bg-[#5C2B14] text-[#FDF8E7] px-2 py-1 rounded text-xs font-bold shadow-sm">İLKE #{tool.trizNumber}</span>
                      </div>
                      
                      <p className="font-[var(--font-body)] text-[15px] leading-relaxed text-[#4A2D1C] mb-4">
                        {tool.description}
                      </p>
                      
                      {/* Biyoloji Bağlantısı */}
                      <div className="mt-auto bg-[#E8F5E9] border-l-4 border-[#2E7D32] p-3 rounded-r-lg">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E7D32] block mb-1">
                           🌿 Doğadaki Karşılığı
                        </span>
                        <p className="text-[14px] font-[var(--font-body)] text-[#1B5E20]">
                          {isBioDiscovered ? (
                            <span className="flex items-start gap-2">
                              <span className="text-2xl leading-none">{relatedMachine.bioExample.emoji}</span>
                              <span><strong>{relatedMachine.bioExample.creature}</strong> — {tool.bioHint}</span>
                            </span>
                          ) : (
                            <span className="opacity-60 italic flex items-center gap-2">
                              <span className="text-lg">❓</span> Henüz doğada gözlemlenmedi...
                            </span>
                          )}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div> {/* <-- Sağ taraf container'ının kapanışı */}

      </motion.div>
    </div>
  );
}
