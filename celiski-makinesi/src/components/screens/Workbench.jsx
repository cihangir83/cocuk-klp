import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay } from '@dnd-kit/core';
import { useGame } from '../../context/GameContext';
import { useGameSound } from '../../hooks/useSound';
import DropZone from '../ui/DropZone';
import DraggableTool from '../ui/DraggableTool';
import ToolIcon from '../svg/ToolIcon';
import toolsData from '../../data/tools';
import Gear from '../svg/Gear';
import Pipe from '../svg/Pipe';
import Piston from '../svg/Piston';
import Manometer from '../svg/Manometer';
import Lamp from '../svg/Lamp';
import MetalButton from '../ui/MetalButton';
import MachineVisuals from '../svg/MachineVisuals';

export default function Workbench() {
  const { state, dispatch, getActiveMachine } = useGame();
  const sound = useGameSound();
  const machine = getActiveMachine();

  const [activeId, setActiveId] = useState(null);
  const [machineState, setMachineState] = useState('locked'); // locked, nearly, solving, running
  const [showHint, setShowHint] = useState(false);
  const [wrongMessage, setWrongMessage] = useState('');

  const [tutorialStep, setTutorialStep] = useState(
    (state.tutorialCompleted?.workbench === false && state.solvedMachines.length === 0) ? 1 : 0
  );

  const nextTutorialStep = () => {
    if (tutorialStep === 3) {
      setTutorialStep(0);
      dispatch({ type: 'COMPLETE_TUTORIAL', tutorialType: 'workbench' });
    } else {
      setTutorialStep(prev => prev + 1);
    }
  };

  const renderTutorial = () => {
    if (tutorialStep === 0) return null;
    
    return (
      <>
        {/* Karanlık Arka Plan Overlay (z-100) */}
        <div className="absolute inset-0 z-[100] bg-black/80 pointer-events-auto" />
        
        {/* Bilgi Kutuları (z-120) */}
        <div className="absolute inset-0 z-[120] pointer-events-none">
          {tutorialStep === 1 && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-10 left-[30%] -translate-x-1/2 max-w-md bg-[var(--color-metal-dark)] border-2 border-[var(--color-lamp-blue)] p-8 rounded-xl shadow-[0_0_50px_rgba(0,150,255,0.4)] pointer-events-auto">
              <h3 className="text-3xl text-[var(--color-lamp-blue)] font-[var(--font-engraved)] mb-4 text-center">ÇELİŞKİ ANALİZİ 👇</h3>
              <p className="text-gray-300 font-[var(--font-mechanical)] text-lg mb-6 text-center leading-relaxed">Ortadaki ekranda makinenin problemi yazar. Hangi parçaların uyumsuz olduğunu dikkatlice okumalısın.</p>
              <button onClick={nextTutorialStep} className="px-6 py-3 bg-[var(--color-lamp-blue)] text-black font-bold rounded w-full hover:bg-blue-400 text-lg transition-transform hover:scale-105">SONRAKİ ▸</button>
            </motion.div>
          )}
          
          {tutorialStep === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute left-[15%] top-1/2 -translate-y-1/2 max-w-md bg-[var(--color-metal-dark)] border-2 border-[var(--color-lamp-yellow)] p-8 rounded-xl shadow-[0_0_50px_rgba(255,200,0,0.4)] pointer-events-auto">
              <h3 className="text-3xl text-[var(--color-lamp-yellow)] font-[var(--font-engraved)] mb-4 text-center">TRIZ ALET PANELİ 👉</h3>
              <p className="text-gray-300 font-[var(--font-mechanical)] text-lg mb-6 text-center leading-relaxed">Sağdaki panelde açık olan aletlerini görüyorsun. Probleme en uygun olan aleti bul ve üzerine basılı tut.</p>
              <button onClick={nextTutorialStep} className="px-6 py-3 bg-[var(--color-lamp-yellow)] text-black font-bold rounded w-full hover:bg-yellow-400 text-lg transition-transform hover:scale-105">SONRAKİ ▸</button>
            </motion.div>
          )}

          {tutorialStep === 3 && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-[20%] left-[30%] -translate-x-1/2 max-w-md bg-[var(--color-metal-dark)] border-2 border-[var(--color-lamp-green)] p-8 rounded-xl shadow-[0_0_50px_rgba(46,213,115,0.4)] pointer-events-auto">
              <h3 className="text-3xl text-[var(--color-lamp-green)] font-[var(--font-engraved)] mb-4 text-center">ALET YUVASI 👇</h3>
              <p className="text-gray-300 font-[var(--font-mechanical)] text-lg mb-6 text-center leading-relaxed">Doğru aleti sağdaki panelden tutup sürükleyerek ortadaki yuvaya bırakırsan makine çalışmaya başlar!</p>
              <button onClick={nextTutorialStep} className="px-6 py-3 bg-[var(--color-lamp-green)] text-black font-bold rounded w-full hover:bg-green-400 text-lg transition-transform hover:scale-105 shadow-[0_0_15px_rgba(46,213,115,0.8)]">ANLADIM, BAŞLA! 🚀</button>
            </motion.div>
          )}
        </div>
      </>
    );
  };

  // Sensörler, tıklama ile sürüklemeyi ayırt etmek için
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px sürüklendikten sonra drag başlar
      },
    })
  );

  useEffect(() => {
    // Yanlış deneme olunca ipucu göster
    if (state.wrongAttemptsOnMachine >= 2) {
      setShowHint(true);
    }
  }, [state.wrongAttemptsOnMachine]);

  if (!machine) return null;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    sound.playClick();
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);

    // Dropzone'un üstüne mi bırakıldı? VEYA genel alan
    if (over && over.id === 'machine-drop-zone') {
      const isCorrect = active.id === machine.correctTool;

      if (isCorrect) {
        // Çözüm sekansı
        setMachineState('solving');
        setWrongMessage('DOĞRU ALET! BAĞLANTI KURULUYOR...');
        sound.playClick(); 
        
        setTimeout(() => sound.playGearStart(), 300);
        
        setTimeout(() => {
          setMachineState('running');
          sound.playSuccess();
          setWrongMessage('');
        }, 1000);

        setTimeout(() => {
          dispatch({ type: 'TRY_TOOL', toolId: active.id });
        }, 2000);

      } else {
        // Yanlış alet
        sound.playMetalHit();
        setMachineState('nearly');
        setWrongMessage('Hata! Bu ilke bu çelişkiyi çözmüyor.');
        
        setTimeout(() => {
          setMachineState('locked');
          dispatch({ type: 'TRY_TOOL', toolId: active.id });
        }, 800);
      }
    }
  };

  const renderActiveToolOverlay = () => {
    if (!activeId) return null;
    const toolInfo = toolsData.find(t => t.id === activeId);
    if (!toolInfo) return null;

    return (
      <div className="w-20 h-20 bg-[var(--color-metal-dark)] rounded border border-[var(--color-brass-bright)] shadow-[0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center rotate-[-5deg] scale-110">
        <ToolIcon shape={toolInfo.shape} size={48} color="--color-brass" className="pulse-brass" />
      </div>
    );
  };

  const getGearAnim = () => {
    if (machineState === 'running') return ['spinning-cw', 'spinning-ccw'];
    if (machineState === 'solving') return ['spinning-cw-slow', 'spinning-cw-slow']; // slowly starting
    if (machineState === 'nearly') return ['locked', 'locked']; // sallantı (CSS sınıfındaki locked animasyonu ile sağlanıyor)
    return ['locked', 'locked'];
  };

  const getLampColor = () => {
    if (machineState === 'running') return 'green';
    if (machineState === 'solving') return 'yellow';
    if (machineState === 'nearly') return 'red'; // fast flash can be CSS based
    return 'red';
  };

  const getManometerValue = () => {
    if (machineState === 'running') return 50; // Yeşil bölge
    if (machineState === 'solving') return 75; // Yükseliyor
    if (machineState === 'nearly') return 100; // Tam kırmızı
    return 85; // Kilitli iken riskli
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex bg-[#0A0805] text-[var(--color-text-display)] relative">
        {renderTutorial()}
        
        {/* SOL PANEL: MAKİNE (%60) */}
        <div className="w-3/5 h-full relative border-r-4 border-[var(--color-metal-dark)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1410] to-[#0A0805]"></div>
          
          {/* Arka plan detayları (Borular vb.) */}
          <div className="absolute top-10 left-10"><Pipe type="corner-br" width={100} height={100} isActive={machineState === 'running'} /></div>
          <div className="absolute top-10 left-[110px]"><Pipe type="horizontal" width={200} height={20} isActive={machineState === 'running'} /></div>
          <div className="absolute bottom-10 right-10"><Pipe type="corner-tl" width={100} height={100} isActive={machineState === 'running'} /></div>
          <div className="absolute top-20 right-20"><Piston isActive={machineState === 'running'} isFast={machineState === 'nearly'} /></div>

          {/* Ana Makine Mekanizması */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative w-[500px] h-[350px]`}>
              
              <MachineVisuals 
                machineId={machine.id} 
                machineState={machineState} 
                param1={machine.contradiction.param1} 
                param2={machine.contradiction.param2} 
              />

              {/* Alet Yuvası (Drop Zone) */}
              <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all ${tutorialStep === 3 ? 'z-[110] scale-125' : 'z-50'}`}>
                <DropZone activeMachineId={machine.id} isPulsing={machineState === 'locked'} />
              </div>

            </div>
          </div>

          {/* Tutorial / Görev Yönergesi ve Aşamalı İpuçları (Progressive Scaffolding) */}
          {machineState === 'locked' && (() => {
            // Unvana göre ipucu gecikmesi (Zorluk ayarı)
            let bioHintThreshold = 1;
            let directHintThreshold = 2;

            if (state.inventorTitle === 'Kalfa') {
              bioHintThreshold = 2;
              directHintThreshold = 3;
            } else if (state.inventorTitle === 'Usta') {
              bioHintThreshold = 3;
              directHintThreshold = 4;
            }

            const w = state.wrongAttemptsOnMachine;
            const showBioHint = w >= bioHintThreshold && w < directHintThreshold;
            const showDirectHint = w >= directHintThreshold;
            const isJustWrong = w > 0 && !showBioHint && !showDirectHint;

            return (
              <div className={`absolute inset-0 z-40 bg-black/60 pointer-events-none flex items-center justify-center ${tutorialStep === 1 ? 'z-[110]' : ''}`}>
                <div className={`bg-[var(--color-metal-dark)] border-2 border-[var(--color-lamp-blue)] p-6 rounded-lg text-center backdrop-blur-md shadow-[0_0_30px_rgba(103,232,249,0.2)] transform -translate-y-10 w-4/5 max-w-md transition-all ${tutorialStep === 1 ? 'relative z-[110] ring-4 ring-[var(--color-lamp-blue)] scale-[1.05]' : 'animate-pulse'}`}>
                  <p className="text-[var(--color-lamp-blue)] font-[var(--font-engraved)] text-xl mb-4 tracking-wider">
                    HEDEF: {machine.name.toUpperCase()}
                  </p>
                  
                  {/* Sabit Problem Tanımı */}
                  <p className="text-[var(--color-text-display)] font-[var(--font-body)] text-sm mb-4 leading-relaxed">
                    {machine.contradiction.description}
                  </p>

                  {/* Yanlış Yapıp Henüz İpucu Almayan (Usta/Kalfa) Durumu */}
                  {isJustWrong && (
                    <div className="bg-red-900/20 border border-red-700 p-3 rounded mb-4 shadow-inner text-left animate-pulse">
                      <p className="text-red-400 text-sm font-bold text-center">
                        ⚠️ UYUMSUZ PARÇA!
                      </p>
                      <p className="text-red-300 text-xs text-center mt-1">
                        Seçtiğin ilke makineyi bozuyor. Farklı bir mühendislik açısı düşünmelisin.
                      </p>
                    </div>
                  )}

                  {/* Aşama 2: Biyoloji İpucu */}
                  {showBioHint && (
                    <div className="bg-[#1B5E20]/20 border border-[#2E7D32] p-4 rounded mb-4 shadow-inner text-left">
                      <p className="text-[#4CAF50] text-sm font-bold mb-2 flex items-center gap-2">
                        <span className="text-xl">{machine.bioExample.emoji}</span> DOĞADAN İPUCU: {machine.bioExample.creature.toUpperCase()}
                      </p>
                      <p className="text-[var(--color-text-display)] font-[var(--font-body)] text-sm leading-relaxed">
                        {machine.bioExample.detail}
                      </p>
                    </div>
                  )}

                  {/* Aşama 3: Doğrudan Yönlendirme */}
                  {showDirectHint && (
                    <div className="bg-yellow-900/40 border border-yellow-600 p-4 rounded mb-4 shadow-inner">
                      <p className="text-yellow-400 text-sm font-bold mb-2 flex items-center justify-center gap-2">
                        <span>🛠️</span> İLERİ İPUCU (BAĞLANTI KUR):
                      </p>
                      <p className="text-yellow-200 text-sm leading-relaxed">
                        {toolsData.find(t => t.id === machine.correctTool)?.bioHint || "Doğadaki çözümü düşün."}
                        <br/><br/>
                        Sağdaki dolapta ismi <strong>"{toolsData.find(t => t.id === machine.correctTool)?.name.substring(0, 4)}..."</strong> ile başlayan aleti bul!
                      </p>
                    </div>
                  )}

                  <div className="border-t border-[var(--color-metal-light)] pt-3 mt-4">
                    <p className="text-sm text-[var(--color-lamp-yellow)] font-[var(--font-mechanical)]">
                      👉 Bu çelişkiyi çözmek için sağdaki dolaptan uygun TRIZ aletini yuvaya sürükle.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Manometre & Lambalar */}
          <div className="absolute top-6 right-6 bg-[var(--color-metal-dark)] p-4 rounded-lg border-2 border-[var(--color-metal-mid)] shadow-lg flex flex-col items-center gap-4">
            <Manometer value={getManometerValue()} isActive={machineState !== 'locked'} isDanger={machineState !== 'running'} />
            <div className="flex gap-2">
              <Lamp color={machineState === 'running' ? 'off' : getLampColor()} size={24} />
              <Lamp color={machineState === 'running' ? 'off' : (machineState === 'nearly' ? 'off' : 'yellow')} size={24} />
              <Lamp color={machineState === 'running' ? 'green' : 'off'} size={24} />
            </div>
          </div>

          {/* Yanlış/Doğru Mesajı ve İpucu UI */}
          <AnimatePresence>
            {wrongMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`absolute bottom-24 left-1/2 -translate-x-1/2 px-8 py-3 rounded-lg font-[var(--font-mechanical)] text-xl z-50 shadow-2xl border-2 ${
                  machineState === 'solving' || machineState === 'running' 
                    ? 'bg-[#0A2D0A] border-[var(--color-lamp-green)] text-[var(--color-lamp-green)] shadow-[0_0_20px_rgba(46,213,115,0.6)]' 
                    : 'bg-[#2D0A0A] border-[var(--color-lamp-red)] text-[var(--color-lamp-red)] shadow-[0_0_20px_rgba(232,69,69,0.6)]'
                }`}
              >
                {wrongMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Geri Dön */}
          <div className="absolute bottom-6 left-6 z-50">
             <MetalButton type="dark" onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'workshop' })}>İPTAL ET</MetalButton>
          </div>

        </div>

        {/* SAĞ PANEL: TRIZ ALETLERİ (%40) */}
        <div className={`w-2/5 h-full bg-[#1A120B] p-6 flex flex-col relative shadow-[inset_10px_0_20px_rgba(0,0,0,0.6)] transition-all ${tutorialStep === 2 ? 'z-[110] ring-4 ring-[var(--color-lamp-yellow)]' : 'z-10'}`}>
          <div className="border-b-2 border-[var(--color-metal-light)] pb-2 mb-6">
            <h2 className="font-[var(--font-engraved)] text-2xl text-[var(--color-brass)] text-center">TRIZ ALET PANELI</h2>
            <p className="text-center text-[10px] text-[var(--color-text-muted)] font-[var(--font-mechanical)] mt-1">
              Doğru ilkeyi sürükleyip yuvaya bırakın
            </p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="grid grid-cols-2 gap-4">
              {toolsData.map(tool => {
                const isAvailable = state.availableTools.includes(tool.id);
                return (
                  <div key={tool.id} className="relative group">
                    <DraggableTool toolId={tool.id} disabled={!isAvailable} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sürükleme efekti overlay */}
        <DragOverlay>
          {renderActiveToolOverlay()}
        </DragOverlay>

      </div>
    </DndContext>
  );
}
