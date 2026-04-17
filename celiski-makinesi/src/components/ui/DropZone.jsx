import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function DropZone({ isPulsing = false, activeMachineId }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'machine-drop-zone',
    data: {
      machineId: activeMachineId
    }
  });

  const getSlotClass = () => {
    if (isOver) return 'tool-slot-near border-[var(--color-lamp-blue)] bg-[var(--color-lamp-blue)]/20';
    if (isPulsing) return 'tool-slot-waiting border-[var(--color-brass)] bg-transparent';
    return 'border-[var(--color-metal-light)] bg-transparent';
  };

  return (
    <div 
      ref={setNodeRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-30 flex items-center justify-center flex-col"
    >
      <div className={`
        w-24 h-24 rounded-full border-4 border-dashed
        transition-all duration-300 flex items-center justify-center
        ${getSlotClass()}
      `}>
        <div className="w-16 h-16 rounded-full border-2 border-[var(--color-metal-dark)] opacity-50 flex items-center justify-center bg-black/30 shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)]">
          <span className="text-[var(--color-text-muted)] text-[10px] font-[var(--font-mechanical)] tracking-widest rotate-[-15deg] opacity-70">
            ALET<br/>YUVASI
          </span>
        </div>
      </div>
      
      {/* Kilit İşareti / Çapraz Kilit Geometrisi */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none">
        <svg viewBox="0 0 100 100" width="100%" height="100%" className={isOver ? 'scale-110 transition-transform' : 'transition-transform'}>
          <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-metal-dark)" strokeWidth="2" strokeDasharray="10 5" />
          <path d="M 20 20 L 80 80 M 20 80 L 80 20" stroke="var(--color-metal-dark)" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}
