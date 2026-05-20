import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import StatusBar from '../ui/StatusBar';
import machinesData from '../../data/machines';
import toolsData from '../../data/tools';
import Lamp from '../svg/Lamp';
import Gear from '../svg/Gear';
import { useGameSound } from '../../hooks/useSound';

export default function Workshop() {
  const [activeArea, setActiveArea] = useState(null);
  const [showEndGameOverlay, setShowEndGameOverlay] = useState(true);
  const { state, dispatch } = useGame();
  const sound = useGameSound();

  const [tutorialStep, setTutorialStep] = useState(
    state.tutorialCompleted?.workshop ? 0 : 1
  );

  const nextTutorialStep = () => {
    if (tutorialStep === 3) {
      setTutorialStep(0);
      dispatch({ type: 'COMPLETE_TUTORIAL', tutorialType: 'workshop' });
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
        <div className="absolute inset-0 z-[120] pointer-events-none flex flex-col items-center justify-center">
          {tutorialStep === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md bg-[var(--color-metal-dark)] border-2 border-[var(--color-lamp-blue)] p-8 rounded-xl shadow-[0_0_50px_rgba(0,150,255,0.4)] pointer-events-auto">
              <h3 className="text-3xl text-[var(--color-lamp-blue)] font-[var(--font-engraved)] mb-4 text-center">👈 MAKİNE RAFLARI</h3>
              <p className="text-gray-300 font-[var(--font-mechanical)] text-lg mb-6 text-center leading-relaxed">Sol tarafta tamir edilmeyi bekleyen 12 farklı icat var. Sarı ışığı yananlar, şu an üzerinde çalışabileceklerindir.</p>
              <button onClick={nextTutorialStep} className="px-6 py-3 bg-[var(--color-lamp-blue)] text-black font-bold rounded w-full hover:bg-blue-400 text-lg transition-transform hover:scale-105">SONRAKİ ▸</button>
            </motion.div>
          )}
          
          {tutorialStep === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md bg-[var(--color-metal-dark)] border-2 border-[var(--color-lamp-yellow)] p-8 rounded-xl shadow-[0_0_50px_rgba(255,200,0,0.4)] pointer-events-auto">
              <h3 className="text-3xl text-[var(--color-lamp-yellow)] font-[var(--font-engraved)] mb-4 text-center">TRIZ ALET DOLABI 👉</h3>
              <p className="text-gray-300 font-[var(--font-mechanical)] text-lg mb-6 text-center leading-relaxed">Makineleri başarıyla tamir ettikçe kazandığın yeni sorun çözme ilkeleri (aletler) sağdaki bu dolapta birikecek.</p>
              <button onClick={nextTutorialStep} className="px-6 py-3 bg-[var(--color-lamp-yellow)] text-black font-bold rounded w-full hover:bg-yellow-400 text-lg transition-transform hover:scale-105">SONRAKİ ▸</button>
            </motion.div>
          )}

          {tutorialStep === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md bg-[var(--color-metal-dark)] border-2 border-[var(--color-copper-bright)] p-8 rounded-xl shadow-[0_0_50px_rgba(184,115,51,0.4)] pointer-events-auto">
              <h3 className="text-3xl text-[var(--color-copper-bright)] font-[var(--font-engraved)] mb-4 text-center">👇 KEŞİF DEFTERİ</h3>
              <p className="text-gray-300 font-[var(--font-mechanical)] text-lg mb-6 text-center leading-relaxed">Sağ alt köşedeki bu defterden, doğadaki canlıların mükemmel mühendislik çözümlerini (Biyomimikri) inceleyebilirsin.</p>
              <button onClick={nextTutorialStep} className="px-6 py-3 bg-[var(--color-copper-bright)] text-black font-bold rounded w-full hover:bg-orange-300 text-lg transition-transform hover:scale-105 shadow-[0_0_15px_rgba(184,115,51,0.8)]">ANLADIM, BAŞLA! 🚀</button>
            </motion.div>
          )}
        </div>
      </>
    );
  };

  const renderEndGameOverlay = () => {
    if (state.solvedMachines.length !== 12 || !showEndGameOverlay) return null;

    return (
      <div className="absolute inset-0 z-[60] bg-black/90 flex items-center justify-center backdrop-blur-sm print:hidden">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, duration: 1 }}
          className="flex flex-col items-center max-w-2xl w-full"
        >
          {/* Ana Sertifika Butonu */}
          <div className="relative cursor-pointer group mb-12" onClick={() => window.print()}>
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 to-yellow-600 rounded-full blur-2xl opacity-50 animate-spin-slow group-hover:opacity-80 transition-opacity duration-500 scale-150"></div>
            <div className="relative w-48 h-48 bg-gradient-to-br from-yellow-600 to-yellow-900 border-8 border-yellow-400 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.6)] group-hover:scale-110 transition-transform duration-300">
              <span className="text-6xl mb-2 drop-shadow-lg">🏆</span>
              <span className="font-[var(--font-engraved)] text-yellow-100 font-bold text-center leading-tight text-sm px-2">
                SERTİFİKA<br/>İNDİR
              </span>
            </div>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-yellow-400 font-[var(--font-mechanical)] text-3xl tracking-widest bg-black/50 px-8 py-3 rounded-full border border-yellow-600/50 mb-8 text-center"
          >
            MÜFREDAT TAMAMLANDI!
          </motion.h2>

          {/* Aksiyon Butonları */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap justify-center gap-4 w-full px-4"
          >
            <button 
              onClick={() => {
                if(window.confirm('Tüm ilerlemen silinecek ve yeni bir unvanla başlayacaksın. Emin misin?')) {
                  dispatch({ type: 'RESET_ALL' });
                }
              }}
              className="px-6 py-3 bg-red-900/60 hover:bg-red-800 border border-red-500 text-red-100 rounded font-[var(--font-mechanical)] transition-colors flex items-center gap-2"
            >
              🔄 DAHA ZOR BİR UNVANLA YENİDEN BAŞLA
            </button>

            <button 
              onClick={() => setShowEndGameOverlay(false)}
              className="px-6 py-3 bg-[var(--color-metal-dark)] hover:bg-[var(--color-metal-mid)] border border-[var(--color-metal-light)] text-[var(--color-text-display)] rounded font-[var(--font-mechanical)] transition-colors flex items-center gap-2"
            >
              🛠️ ATÖLYEYE GERİ DÖN (İNCELE)
            </button>

            <button 
              onClick={() => window.location.href = '../index.html'}
              className="px-6 py-3 bg-blue-900/60 hover:bg-blue-800 border border-blue-500 text-blue-100 rounded font-[var(--font-mechanical)] transition-colors flex items-center gap-2 w-full max-w-md justify-center mt-2"
            >
              🚀 ANA SAYFAYA DÖN (DİĞER OYUNLARI KEŞFET)
            </button>
          </motion.div>

        </motion.div>
      </div>
    );
  };

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
      <div className={`w-1/3 bg-[var(--color-bg-deep)] border-r-4 border-[var(--color-metal-dark)] h-full flex flex-col p-4 shadow-[10px_0_20px_rgba(0,0,0,0.5)] transition-all ${tutorialStep === 1 ? 'relative z-[110] ring-4 ring-[var(--color-lamp-blue)] ring-offset-4 ring-offset-black scale-[1.02]' : 'relative z-20'}`}>
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
      <div className={`w-1/3 bg-[var(--color-bg-deep)] border-l-4 border-[var(--color-metal-dark)] h-full flex flex-col p-4 shadow-[-10px_0_20px_rgba(0,0,0,0.5)] transition-all ${tutorialStep === 2 ? 'relative z-[110] ring-4 ring-[var(--color-lamp-yellow)] ring-offset-4 ring-offset-black scale-[1.02]' : 'relative z-20'}`}>
        <h2 className="text-center font-[var(--font-engraved)] text-xl text-[var(--color-brass)] mb-4 pb-2 border-b-2 border-[var(--color-metal-light)]">TRIZ ALET DOLABI</h2>
        <p className="text-[10px] text-center text-[var(--color-text-muted)] font-[var(--font-mechanical)] mb-4">
          Çözdüğün makinelerden elde ettiğin TRIZ çözüm prensipleri burada birikir. <br/>Kilitli olanlar ilerledikçe açılacaktır.
        </p>
        
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

        {renderEndGameOverlay()}
        {renderTutorial()}

        {/* Floating Buttons */}
        <div className={`absolute bottom-6 right-6 flex gap-4 items-end transition-all ${tutorialStep === 3 ? 'z-[110] scale-110' : 'z-50'}`}>
          {/* Arena Butonu */}
          {state.solvedMachines.length > 0 && (
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'arena' })}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-blue-300 flex items-center justify-center text-2xl hover:from-blue-400 hover:to-blue-600 transition-all hover:scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)] print:hidden animate-bounce"
              title={`Kar Topu Arenası (${state.solvedMachines.length * 10} ❄️)`}
            >
              ❄️
            </button>
          )}

          <button 
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'teacherPanel' })}
            className="w-12 h-12 rounded-full metal-surface border-2 border-[var(--color-metal-light)] flex items-center justify-center text-xl hover:border-[var(--color-brass)] transition-colors print:hidden"
            title="Öğretmen Paneli"
          >
            ⚙️
          </button>

          <div className="relative group print:hidden">
            {/* Sürekli yanan pulse animasyonlu arka plan */}
            <div className="absolute inset-0 bg-[var(--color-copper)] rounded-lg blur-md opacity-40 animate-pulse group-hover:opacity-80 transition-opacity"></div>
            
            {/* Küçük bilgi etiketi */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 border border-[var(--color-copper)] text-[var(--color-copper-bright)] text-[10px] font-[var(--font-mechanical)] px-2 py-1 rounded opacity-80 whitespace-nowrap">
              KEŞİF DEFTERİ
            </div>

            <button 
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'notebook' })}
              className="relative w-16 h-16 rounded-lg leather-texture border-2 border-[var(--color-copper-bright)] flex items-center justify-center text-2xl hover:border-yellow-400 transition-colors hover:-translate-y-1 shadow-[0_0_15px_rgba(184,115,51,0.5)]"
              title="TRIZ Keşif Defteri"
            >
              📔
            </button>
          </div>
        </div>

        {/* PRINT ONLY CERTIFICATE VIEW */}
        <div className="hidden print:flex fixed inset-0 bg-white z-[9999] flex-col items-center justify-center m-0 p-0 text-black overflow-hidden">
          <style>{`
            @media print {
              @page { margin: 0; size: landscape; }
              body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; margin: 0; padding: 0; }
            }
          `}</style>
          
          {/* Arka Plan Dağılmış Hayvan Sembolleri */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 flex flex-wrap justify-around content-around">
            {machinesData.map((m, i) => (
              <span key={i} className="text-8xl m-8 transform" style={{ rotate: `${(i * 37) % 360}deg`, scale: 1 + (i % 3)*0.2 }}>
                {m.bioExample.emoji}
              </span>
            ))}
            {machinesData.map((m, i) => (
              <span key={`dup-${i}`} className="text-6xl m-12 transform" style={{ rotate: `${-(i * 41) % 360}deg` }}>
                {m.bioExample.emoji}
              </span>
            ))}
          </div>

          <div className="relative border-[16px] border-double border-yellow-600 p-12 w-[95%] h-[95%] text-center bg-yellow-50/90 rounded-2xl shadow-2xl flex flex-col justify-between">
            {/* Köşe Süsleri */}
            <div className="absolute top-4 left-4 text-4xl text-yellow-700/50">⚙️</div>
            <div className="absolute top-4 right-4 text-4xl text-yellow-700/50">🌿</div>
            <div className="absolute bottom-4 left-4 text-4xl text-yellow-700/50">🌿</div>
            <div className="absolute bottom-4 right-4 text-4xl text-yellow-700/50">⚙️</div>

            <div>
              <h1 className="text-5xl font-serif font-black text-yellow-800 mb-2 drop-shadow-sm uppercase tracking-widest">
                DOĞA MÜHENDİSLİĞİ SERTİFİKASI
              </h1>
              <h2 className="text-2xl text-yellow-600 mb-6 tracking-[0.3em] font-medium border-b-2 border-yellow-600/30 pb-4 inline-block px-12">
                BİYO-MÜHENDİSLİK VE TRIZ UZMANLIĞI
              </h2>
              
              <p className="text-xl mb-2 italic text-gray-700">Bu belge,</p>
              <p className="text-5xl font-bold mb-4 text-yellow-900 drop-shadow-md">{state.playerName || 'Öğrenci'}</p>
              <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
                isimli araştırmacının Çelişki Makinesi'ndeki zorlu mühendislik problemlerini, 
                doğadan aldığı ilham ve TRIZ ilkeleriyle başarıyla tamamladığını kanıtlar.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 text-left text-sm mb-4 flex-1">
              <div className="bg-white/60 p-6 rounded-xl border border-yellow-200 shadow-sm">
                <h3 className="font-bold text-lg border-b-2 border-yellow-500 pb-2 mb-4 text-yellow-900 flex items-center gap-2">
                  <span>🛠️</span> ÖĞRENİLEN TRIZ İLKELERİ
                </h3>
                <ul className="space-y-2 text-gray-800 pl-2">
                  {state.availableTools.map(toolId => {
                    const tool = toolsData.find(t => t.id === toolId);
                    return tool ? (
                      <li key={tool.id} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">▸</span> 
                        <span className="font-medium">{tool.name}</span> <span className="text-xs text-gray-500">(İlke #{tool.trizNumber})</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              <div className="bg-white/60 p-6 rounded-xl border border-yellow-200 shadow-sm">
                <h3 className="font-bold text-lg border-b-2 border-yellow-500 pb-2 mb-4 text-yellow-900 flex items-center gap-2">
                  <span>🌿</span> DOĞADAN İLHAM (BİYOMİMİKRİ)
                </h3>
                <ul className="space-y-2 text-gray-800 pl-2">
                  {state.discoveredBioExamples.map(machineId => {
                    const machine = machinesData.find(m => m.id === machineId);
                    return machine ? (
                      <li key={machine.id} className="flex items-center gap-2">
                        <span className="text-xl">{machine.bioExample.emoji}</span> 
                        <span className="font-medium">{machine.bioExample.creature}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-4 pt-6 border-t-4 border-double border-yellow-600/40">
              <div className="text-left bg-white/80 p-4 rounded-lg border border-yellow-300">
                <p className="font-bold text-yellow-900 text-sm tracking-wider mb-1">MUCİT UNVANI</p>
                <p className="uppercase text-2xl font-black text-yellow-800">{state.inventorTitle || 'Çırak'} DOĞA MÜHENDİSİ</p>
              </div>
              <div className="text-7xl drop-shadow-xl transform hover:scale-110 transition-transform">🎓🏆💡</div>
              <div className="text-right bg-white/80 p-4 rounded-lg border border-yellow-300">
                <p className="font-bold text-yellow-900 text-sm tracking-wider mb-1">DÜZENLENME TARİHİ</p>
                <p className="text-2xl font-black text-yellow-800">{new Date().toLocaleDateString('tr-TR')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
