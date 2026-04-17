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
    <div className="w-full h-full flex items-center justify-center bg-black/80 px-4 py-8 z-50 fixed inset-0">
      
      {/* Defter Gövdesi */}
      <motion.div 
        initial={{ y: "100%", rotate: -5 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-full max-w-5xl h-full max-h-[85vh] leather-texture rounded-r-3xl rounded-l-md shadow-[20px_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden"
      >
        {/* Defter cilt kordonu / ayracı */}
        <div className="absolute top-0 bottom-0 left-12 w-1 bg-[#1A120B] shadow-[2px_0_4px_rgba(0,0,0,0.5)] z-20"></div>

        <div className="flex justify-between items-center bg-[#2D2218] p-4 pl-16 border-b border-[#4A3728]">
          <h1 className="font-[var(--font-engraved)] text-2xl text-[var(--color-copper-bright)]">TRIZ İLKE KEŞİF DEFTERİ</h1>
          <MetalButton type="dark" onClick={handleClose}>KAPAT</MetalButton>
        </div>

        {/* Sayfa Düzeni */}
        <div className="flex-1 overflow-hidden relative paper-notebook p-8 pl-16 custom-scrollbar overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {toolsData.map(tool => {
              const isUnlocked = state.availableTools.includes(tool.id);
              // Eğer oyuncu bu tool'u bir makinede kullanmışsa (basit check: bu tool'u requires eden çözülmüş makine var mı?)
              const relatedMachine = machinesData.find(m => m.correctTool === tool.id);
              const isBioDiscovered = relatedMachine && state.discoveredBioExamples.includes(relatedMachine.id);

              return (
                <div key={tool.id} className="border-b border-[#8B6914]/30 pb-6 mb-2 relative">
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-[#F5E6C8]/80 z-10 flex items-center justify-center grayscale">
                       <span className="font-[var(--font-engraved)] text-[#8B6914] text-xl opacity-60">??? KİLİTLİ ???</span>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center border-2 border-[#8B6914] rounded-sm self-start mt-1">
                      <ToolIcon shape={tool.shape} size={40} color="--color-rust" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-[var(--font-engraved)] font-bold text-xl text-[#2D1F0E]">{tool.name}</h3>
                        <span className="font-[var(--font-mechanical)] text-[#8B6914] text-sm">İlke: #{tool.trizNumber}</span>
                      </div>
                      
                      <p className="font-[var(--font-technical)] text-sm mb-3 text-[#3D2B1F]">{tool.description}</p>
                      
                      <div className="border border-[#8B6914]/50 p-2 bg-[#8B6914]/10 rounded-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#8B6914] block mb-1">
                           Doğadaki Karşılığı:
                        </span>
                        <p className="text-sm font-[var(--font-body)] italic text-[#2D1F0E]">
                          {isBioDiscovered ? (
                            <>
                              <span className="text-lg mr-2">{relatedMachine.bioExample.emoji}</span>
                              {relatedMachine.bioExample.creature} — {tool.bioHint}
                            </>
                          ) : (
                            <span className="opacity-50">Henüz doğada gözlemlenmedi...</span>
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

      </motion.div>
    </div>
  );
}
