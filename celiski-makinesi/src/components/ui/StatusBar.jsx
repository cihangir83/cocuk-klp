import React from 'react';
import { useGame } from '../../context/GameContext';
import machines from '../../data/machines';
import tools from '../../data/tools';

export default function StatusBar() {
  const { state } = useGame();

  const solvedCount = state.solvedMachines.length;
  const totalMachines = machines.length;
  const toolCount = state.availableTools.length;
  const totalTools = tools.length;

  return (
    <div className="w-full bg-[var(--color-bg-deep)] border-b-2 border-[var(--color-metal-light)] shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-40 relative">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-[var(--color-text-engraved)] font-[var(--font-engraved)] text-sm md:text-base">
        
        {/* Sol: Oyuncu Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[var(--color-brass)] flex items-center justify-center bg-[var(--color-metal-dark)]">
            {state.inventorLevel === 1 ? '🔧' : state.inventorLevel >= 5 ? '👑' : '⚙️'}
          </div>
          <div>
            <span className="text-[var(--color-text-display)] mr-2 font-bold">{state.playerName || "İsimsiz"}</span>
            <span className="text-xs text-[var(--color-text-muted)] tracking-widest uppercase">{state.inventorTitle} (Sv.{state.inventorLevel})</span>
          </div>
        </div>

        {/* Orta: Makineler */}
        <div className="text-center bg-[var(--color-metal-dark)] px-4 py-1 rounded border border-[var(--color-metal-mid)]">
          <span className="text-[var(--color-text-muted)] text-xs mr-2">ÇÖZÜLEN MAKİNE:</span>
          <span className="font-[var(--font-mechanical)] text-[var(--color-lamp-blue)]">{solvedCount}</span>
          <span className="font-[var(--font-mechanical)] text-[var(--color-text-muted)]"> / {totalMachines}</span>
        </div>

        {/* Sağ: Araçlar & Saat */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-[var(--color-text-muted)] text-xs mr-2">AÇIK İLKE:</span>
            <span className="font-[var(--font-mechanical)] text-[var(--color-lamp-yellow)]">{toolCount}</span>
            <span className="font-[var(--font-mechanical)] text-[var(--color-text-muted)]">/ {totalTools}</span>
          </div>
          {/* Decorative Clock */}
          <div className="hidden md:flex items-center gap-2 border-l border-[var(--color-metal-mid)] pl-6">
            <div className="w-6 h-6 rounded-full border border-[var(--color-brass)] flex items-center justify-center relative">
              <div className="w-0.5 h-2 bg-[var(--color-brass-bright)] absolute bottom-3 origin-bottom rotate-45"></div>
              <div className="w-0.5 h-2.5 bg-[var(--color-text-muted)] absolute bottom-3 origin-bottom rotate-180"></div>
              <div className="w-1 h-1 bg-[var(--color-lamp-red)] rounded-full absolute"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
