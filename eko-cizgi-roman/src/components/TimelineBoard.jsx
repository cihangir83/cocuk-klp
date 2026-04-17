import React, { useContext } from 'react';
import { ComicContext } from '../context/ComicContext';

export const TimelineBoard = ({ onPublish }) => {
  const { state, dispatch } = useContext(ComicContext);

  const handleSelectPanel = (index) => {
    dispatch({ type: 'SELECT_PANEL', payload: index });
  };

  return (
    <div className="w-[80%] h-[25vh] bg-[var(--color-desk)] border-t-8 border-black flex items-center px-8 relative shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-10 overflow-hidden">
      
      {/* Score indicators */}
      <div className="absolute top-2 left-8 text-xs text-yellow-500 font-bold flex gap-4">
        <span>Bio-TRIZ: {state.scores.bioTrizConnection}/5</span>
        <span>Anlatı: {state.scores.narrativeFlow}/5</span>
        <span>Görsel: {state.scores.visualRichness}/5</span>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-2 mt-4 items-center">
        {state.panels.map((p, idx) => (
          <div 
            key={p.id} 
            onClick={() => handleSelectPanel(idx)}
            className={`w-28 h-36 bg-[#FFF8E7] border-2 border-dashed flex flex-col items-center justify-center rounded shrink-0 cursor-pointer transition-transform hover:-translate-y-2
              ${state.selectedPanelIndex === idx ? 'border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'border-gray-500'}
            `}
          >
            {p.background ? (
              <div className="w-full h-20 bg-blue-300 opacity-50 mb-2"></div>
            ) : (
              <span className="text-4xl text-gray-400 mb-2">+</span>
            )}
            <span className="font-bold text-gray-800">Panel {idx + 1}</span>
            <div className="flex gap-1 mt-1">
              {p.bioTrizSymbols.map((sym, i) => <span key={i} className="text-xs">🌱</span>)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="ml-8 flex flex-col gap-2 shrink-0">
         <button onClick={onPublish} className="bg-[var(--color-accent-yellow)] text-black px-6 py-3 rounded font-title text-2xl border-4 border-black hover:bg-yellow-300 shadow-[4px_4px_0_#0D0D0D] transition-transform hover:-translate-y-1" style={{fontFamily: "var(--font-title)"}}>
           YAYINLA ▶
         </button>
      </div>
    </div>
  );
};
