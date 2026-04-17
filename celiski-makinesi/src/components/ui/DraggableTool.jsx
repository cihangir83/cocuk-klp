import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import ToolIcon from '../svg/ToolIcon';
import toolsData from '../../data/tools';

export default function DraggableTool({ toolId, disabled = false }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: toolId,
    disabled: disabled
  });

  const toolInfo = toolsData.find(t => t.id === toolId);
  if (!toolInfo) return null;

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 999 : 1,
    opacity: isDragging ? 0.8 : 1,
    cursor: disabled ? 'not-allowed' : (isDragging ? 'grabbing' : 'grab')
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative group ${disabled ? 'filter grayscale opacity-50' : ''}`}
      draggable={!disabled}
    >
      <div className={`
        w-20 h-20 bg-[var(--color-metal-dark)] rounded border border-[var(--color-metal-light)]
        flex items-center justify-center
        transition-all duration-200
        ${!disabled && !isDragging ? 'hover:border-[var(--color-brass)] hover:shadow-[0_0_10px_rgba(201,168,76,0.3)]' : ''}
        ${isDragging ? 'shadow-[0_10px_20px_rgba(0,0,0,0.8)] border-[var(--color-brass-bright)] rotate-[-5deg] scale-110' : ''}
      `}>
        <ToolIcon shape={toolInfo.shape} size={48} color="--color-brass" className={isDragging ? 'pulse-brass' : ''} />
      </div>
      
      {/* Tooltip */}
      {!isDragging && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[150px]
                      bg-[var(--color-bg-deep)] border border-[var(--color-metal-light)] p-2 rounded
                      opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-[var(--font-technical)] text-xs text-center z-50">
          <div className="text-[var(--color-lamp-yellow)] mb-1 text-[10px]">İlke #{toolInfo.trizNumber}</div>
          <div className="text-[var(--color-text-display)] leading-tight">{toolInfo.name}</div>
        </div>
      )}
    </div>
  );
}
