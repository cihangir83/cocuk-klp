import React, { useContext, useState } from 'react';
import { ComicContext } from '../context/ComicContext';
import { bioTrizSymbols } from '../data/symbols';
import { characters } from '../data/characters';

export const ToolboxPanel = () => {
  const { state, dispatch } = useContext(ComicContext);
  const [activeTab, setActiveTab] = useState('backgrounds');

  const selectedPanelIndex = state.selectedPanelIndex;

  const handleSetBackground = (bgId) => {
    dispatch({ type: 'SET_BACKGROUND', payload: { panelIndex: selectedPanelIndex, backgroundId: bgId } });
  };

  const handleAddBalloon = () => {
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        panelIndex: selectedPanelIndex,
        element: {
          id: `balloon_${Date.now()}`,
          type: 'balloon',
          text: 'Yeni Metin',
          x: 50,
          y: 50,
          width: 150,
          height: 80,
          balloonColor: '#ffffff',
          textColor: '#000000'
        }
      }
    });
  };

  const handleAddSymbol = (symbol) => {
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        panelIndex: selectedPanelIndex,
        element: {
          id: `symbol_${Date.now()}`,
          type: 'symbol',
          symbolId: symbol.id,
          url: symbol.url,
          x: 20,
          y: 20,
          width: 60,
          height: 60
        }
      }
    });
  };

  return (
    <div className="w-[20%] h-[75vh] bg-[var(--color-desk)] border-l-4 border-black flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.5)] z-20">
      {/* Tabs */}
      <div className="flex bg-[var(--color-wood-dark)] border-b-2 border-black">
         <button className={`flex-1 p-2 font-bold text-xs ${activeTab === 'backgrounds' ? 'bg-[var(--color-desk)] text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('backgrounds')}>Arkaplan</button>
         <button className={`flex-1 p-2 font-bold text-xs ${activeTab === 'characters' ? 'bg-[var(--color-desk)] text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('characters')}>Karakter</button>
         <button className={`flex-1 p-2 font-bold text-xs ${activeTab === 'symbols' ? 'bg-[var(--color-desk)] text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('symbols')}>Bio-TRIZ</button>
         <button className={`flex-1 p-2 font-bold text-xs ${activeTab === 'balloons' ? 'bg-[var(--color-desk)] text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('balloons')}>Balon</button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-y-auto">
         {activeTab === 'backgrounds' && (
           <div className="grid grid-cols-2 gap-2">
             {state.selectedScenario?.backgrounds.map(bg => (
               <div key={bg.id} onClick={() => handleSetBackground(bg.id)} className="bg-gray-700 h-20 rounded border-2 border-transparent hover:border-yellow-400 cursor-pointer flex flex-col items-center justify-end p-1 text-xs text-center leading-tight relative overflow-hidden group">
                 <img src={bg.url} alt={bg.label} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                 <span className="relative z-10 bg-black/60 px-1 rounded">{bg.label}</span>
               </div>
             ))}
           </div>
         )}
         
         {activeTab === 'characters' && (
           <div className="flex flex-col gap-4">
             {characters.map(char => (
               <div key={char.id} className="bg-[var(--color-desk)] p-2 rounded shadow-inner flex flex-col gap-2">
                 <div className="font-bold text-sm text-yellow-500">{char.name}</div>
                 <div className="grid grid-cols-3 gap-2">
                   {char.poses.map(pose => (
                     <div key={pose.id} 
                          onClick={() => {
                            dispatch({
                              type: 'ADD_ELEMENT',
                              payload: {
                                panelIndex: selectedPanelIndex,
                                element: {
                                  id: `char_${Date.now()}`,
                                  type: 'character',
                                  url: pose.url,
                                  x: 50,
                                  y: 50,
                                  width: char.defaultSize.w,
                                  height: char.defaultSize.h
                                }
                              }
                            });
                          }}
                          className="bg-zinc-800 rounded p-1 cursor-pointer hover:bg-zinc-700 flex flex-col items-center justify-center border-2 border-transparent hover:border-yellow-400 transition-colors" title={pose.label}>
                       <img src={pose.url} alt={pose.label} className="w-12 h-12 object-contain" />
                     </div>
                   ))}
                 </div>
               </div>
             ))}
           </div>
         )}

         {activeTab === 'symbols' && (
            <div className="grid grid-cols-2 gap-2">
              {bioTrizSymbols.map(sym => (
                 <div key={sym.id} onClick={() => handleAddSymbol(sym)} title={sym.description} className="bg-gradient-to-br from-green-700 to-green-900 border-2 border-green-500 rounded p-2 flex flex-col items-center hover:scale-105 cursor-pointer">
                    <span className="text-3xl">{sym.icon}</span>
                    <span className="text-[10px] text-center mt-1 font-bold">{sym.name}</span>
                 </div>
              ))}
            </div>
         )}

         {activeTab === 'balloons' && (
           <div className="flex flex-col gap-4">
             <button onClick={handleAddBalloon} className="bg-white text-black p-4 rounded-full border-4 border-black font-dialog font-bold shadow-[2px_2px_0_#000] hover:translate-y-[-2px] transition-transform">
               Konuşma Balonu
             </button>
           </div>
         )}
      </div>
    </div>
  );
};
