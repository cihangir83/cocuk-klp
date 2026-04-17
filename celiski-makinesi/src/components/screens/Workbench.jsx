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

export default function Workbench() {
  const { state, dispatch, getActiveMachine } = useGame();
  const sound = useGameSound();
  const machine = getActiveMachine();

  const [activeId, setActiveId] = useState(null);
  const [machineState, setMachineState] = useState('locked'); // locked, nearly, solving, running
  const [showHint, setShowHint] = useState(false);
  const [wrongMessage, setWrongMessage] = useState('');

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

    // Dropzone'un üstüne mi bırakıldı?
    if (over && over.id === 'machine-drop-zone') {
      const isCorrect = active.id === machine.correctTool;

      if (isCorrect) {
        // Çözüm sekansı
        setMachineState('solving');
        setWrongMessage('');
        sound.playClick(); // metal klik
        setTimeout(() => sound.playGearStart(), 500);
        
        // 2 saniye sonra tamamen çalışır hale getirme
        setTimeout(() => {
          setMachineState('running');
          sound.playSuccess();
        }, 2000);

        // 4 saniye sonra sonraki ekrana geç
        setTimeout(() => {
          dispatch({ type: 'TRY_TOOL', toolId: active.id }); // this handles the state update
        }, 4000);

      } else {
        // Yanlış alet
        sound.playMetalHit();
        setMachineState('nearly'); // "Neredeyse" veya çarpma efekti
        setWrongMessage('Bu ilke bu çelişkiyi çözmüyor.');
        
        setTimeout(() => {
          setMachineState('locked');
          dispatch({ type: 'TRY_TOOL', toolId: active.id });
        }, 1000);
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
      <div className="w-full h-full flex bg-[#0A0805] text-[var(--color-text-display)]">
        
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
            <div className={`relative w-[400px] h-[300px] ${machineState === 'nearly' ? 'machine-shake' : ''}`}>
              
              {/* Dişliler */}
              <div className="absolute top-0 transform -translate-x-10">
                <Gear size={200} color="rust" animationState={getGearAnim()[0]} />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--color-metal-dark)] px-3 py-1 border border-[var(--color-rust)] text-[10px] text-[var(--color-rust)] font-[var(--font-mechanical)] text-center whitespace-nowrap">
                  {machine.contradiction.param1.name.toUpperCase()} <br/> ({machine.contradiction.param1.direction.toUpperCase()})
                </div>
              </div>
              
              <div className="absolute top-10 right-0 transform translate-x-10">
                <Gear size={160} color="copper" animationState={getGearAnim()[1]} />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[var(--color-metal-dark)] px-3 py-1 border border-[var(--color-copper)] text-[10px] text-[var(--color-copper-bright)] font-[var(--font-mechanical)] text-center whitespace-nowrap">
                  {machine.contradiction.param2.name.toUpperCase()} <br/> ({machine.contradiction.param2.direction.toUpperCase()})
                </div>
              </div>

              {/* Çelişki Görseli (Şimşek/Bağlantı) */}
              {(machineState === 'locked' || machineState === 'nearly') && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 flex items-center justify-center conflict-lightning pointer-events-none z-10">
                  <svg width="100" height="40" viewBox="0 0 100 40">
                    <path d="M 10 20 L 40 5 L 45 25 L 80 10 L 90 20" fill="none" stroke="#E84545" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Alet Yuvası (Drop Zone) */}
              <DropZone activeMachineId={machine.id} isPulsing={machineState === 'locked'} />

            </div>
          </div>

          {/* Manometre & Lambalar */}
          <div className="absolute top-6 right-6 bg-[var(--color-metal-dark)] p-4 rounded-lg border-2 border-[var(--color-metal-mid)] shadow-lg flex flex-col items-center gap-4">
            <Manometer value={getManometerValue()} isActive={machineState !== 'locked'} isDanger={machineState !== 'running'} />
            <div className="flex gap-2">
              <Lamp color={machineState === 'running' ? 'off' : getLampColor()} size={24} />
              <Lamp color={machineState === 'running' ? 'off' : (machineState === 'nearly' ? 'off' : 'yellow')} size={24} />
              <Lamp color={machineState === 'running' ? 'green' : 'off'} size={24} />
            </div>
          </div>

          {/* Yanlış Mesajı ve İpucu UI */}
          <AnimatePresence>
            {wrongMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#2D0A0A] border border-[var(--color-lamp-red)] text-[var(--color-lamp-red)] px-6 py-2 rounded font-[var(--font-mechanical)] shadow-[0_0_15px_rgba(232,69,69,0.5)] z-50"
              >
                {wrongMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showHint && machineState === 'locked' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-6 left-6 max-w-sm bg-black/60 border border-[var(--color-lamp-yellow)]/50 p-4 rounded-lg"
              >
                <div className="text-[var(--color-lamp-yellow)] text-xs font-[var(--font-mechanical)] mb-1">SİSTEM ÖNERİSİ:</div>
                <div className="text-sm font-[var(--font-body)] italic text-[var(--color-text-muted)]">
                  "Doğada bu çelişkiyi çözen bir canlı düşün: <strong className="text-[var(--color-text-display)]">Yoksa bir hayvanın özelliği mi gerekiyor?</strong>"
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Geri Dön */}
          <div className="absolute bottom-6 left-6 z-50">
             <MetalButton type="dark" onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'workshop' })}>İPTAL ET</MetalButton>
          </div>

        </div>

        {/* SAĞ PANEL: TRIZ ALETLERİ (%40) */}
        <div className="w-2/5 h-full bg-[#1A120B] p-6 flex flex-col relative shadow-[inset_10px_0_20px_rgba(0,0,0,0.6)]">
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
