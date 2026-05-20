import React from 'react';
import Gear from './Gear';
import Pipe from './Pipe';
import Piston from './Piston';

// Her makine için merkezde görünecek devasa ikon (Emoji veya Metin)
const MACHINE_ICONS = {
  'machine_001': '🌉', // Hafif Köprü
  'machine_002': '🏎️', // Yakıtsız Hız
  'machine_003': '💡', // Soğuk Işık
  'machine_004': '🩹', // İzsiz Yapışkan
  'machine_005': '📡', // Görmeyen Pusula
  'machine_006': '💧', // Çöl Suyu
  'machine_007': '🏛️', // Bükülmez Sütun
  'machine_008': '🏗️', // Dev Yük
  'machine_009': '🚁', // Sessiz Sürat
  'machine_010': '🧊', // Enerjisiz Soğutucu
  'machine_011': '🛡️', // Kaplamasız Kalkan
  'machine_012': '🏮'  // Güneşsiz Fener
};

export default function MachineVisuals({ machineId, machineState, param1, param2 }) {
  const isRunning = machineState === 'running';
  const isSolving = machineState === 'solving';
  const isNearly = machineState === 'nearly';
  
  const getGearAnim = () => {
    if (isRunning) return ['spinning-cw', 'spinning-ccw'];
    if (isSolving) return ['spinning-cw-slow', 'spinning-cw-slow'];
    if (isNearly) return ['locked', 'locked'];
    return ['idle', 'idle'];
  };

  const anims = getGearAnim();
  const icon = MACHINE_ICONS[machineId] || '⚙️';

  return (
    <div className={`absolute inset-0 w-full h-full flex items-center justify-center ${isNearly ? 'machine-shake' : ''}`}>
      
      {/* Arka plan boruları / dekorasyonları */}
      <div className="absolute top-1/4 left-0 w-1/4 h-2 bg-[var(--color-copper-bright)] opacity-20"></div>
      <div className="absolute top-1/4 right-0 w-1/4 h-2 bg-[var(--color-rust)] opacity-20"></div>
      
      {/* Sol Çark (Param 1) */}
      <div className="absolute top-0 left-4 transform transition-all duration-500">
        <Gear size={120} color="rust" animationState={anims[0]} />
      </div>
      
      {/* Sağ Çark (Param 2) */}
      <div className="absolute top-12 right-4 transform transition-all duration-500">
        <Gear size={100} color="copper" animationState={anims[1]} />
      </div>

      {/* MERKEZİ MAKİNE GÖRSELİ */}
      <div className={`relative z-10 w-48 h-48 bg-gradient-to-br from-[var(--color-metal-dark)] to-[#050403] rounded-full border-8 border-[var(--color-metal-mid)] shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-1000 ${isRunning ? 'scale-110 shadow-[0_0_60px_rgba(103,232,249,0.5)] border-[var(--color-lamp-blue)]' : ''}`}>
        
        {/* İkon */}
        <div className={`text-7xl drop-shadow-2xl transition-all duration-500 ${isRunning ? 'scale-125' : ''} ${isNearly ? 'grayscale opacity-50' : ''}`}>
          {icon}
        </div>

        {/* Çalışma Efekti (Parlama) */}
        {isRunning && (
          <div className="absolute inset-0 rounded-full bg-[var(--color-lamp-blue)] opacity-20 animate-ping pointer-events-none"></div>
        )}
      </div>

      {/* Parametre Etiketleri */}
      <div className="absolute top-4 left-4 bg-[var(--color-metal-dark)] px-3 py-1 border border-[var(--color-rust)] text-[10px] text-[var(--color-rust)] font-[var(--font-mechanical)] text-center whitespace-nowrap z-20 shadow-md">
        {param1.name.toUpperCase()} <br/> <span className={param1.direction === 'arttır' ? 'text-green-500' : 'text-red-500'}>({param1.direction.toUpperCase()})</span>
      </div>
      
      <div className="absolute top-4 right-4 bg-[var(--color-metal-dark)] px-3 py-1 border border-[var(--color-copper)] text-[10px] text-[var(--color-copper-bright)] font-[var(--font-mechanical)] text-center whitespace-nowrap z-20 shadow-md">
        {param2.name.toUpperCase()} <br/> <span className={param2.direction === 'arttır' ? 'text-green-500' : 'text-red-500'}>({param2.direction.toUpperCase()})</span>
      </div>

      {/* Çelişki Şimşeği */}
      {(machineState === 'locked' || machineState === 'nearly') && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 flex items-center justify-center conflict-lightning pointer-events-none z-30">
          <svg width="100" height="40" viewBox="0 0 100 40">
            <path d="M 10 20 L 40 5 L 45 25 L 80 10 L 90 20" fill="none" stroke="#E84545" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
