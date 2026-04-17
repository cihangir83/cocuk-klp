import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ComicContext } from '../context/ComicContext';
import { InkAssistant } from './InkAssistant';
import { ToolboxPanel } from './ToolboxPanel';
import { TimelineBoard } from './TimelineBoard';
import { PanelCanvas } from './PanelCanvas';

const CanvasArea = () => {
  const { state, dispatch } = useContext(ComicContext);

  const handleSelectPanel = (index) => {
    dispatch({ type: 'SELECT_PANEL', payload: index });
  };

  const handleSelectElement = (elementId) => {
    dispatch({ type: 'TOGGLE_ELEMENT_SELECTION', payload: elementId });
  };

  const handleUpdateElement = (panelIndex, elementId, updates) => {
    dispatch({ 
      type: 'UPDATE_ELEMENT', 
      payload: { panelIndex, elementId, updates }
    });
  };

  // responsive canvas sizing (simplified for 2x3 grid)
  const canvasWidth = 800; // Total area approx
  const panelWidth = Math.floor((canvasWidth - 40) / 3);
  const panelHeight = Math.floor(panelWidth * 1.2);

  useEffect(() => {
    // Delete element on keyboard delete
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Simple safeguard: only delete if an element is selected and not editing text
        if (state.selectedElementId && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          dispatch({
            type: 'DELETE_ELEMENT',
            payload: { panelIndex: state.selectedPanelIndex, elementId: state.selectedElementId }
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedElementId, state.selectedPanelIndex, dispatch]);

  return (
    <div className="w-[80%] h-[75vh] p-4 bg-[var(--color-studio)] relative flex items-center justify-center overflow-auto z-0 custom-scrollbar">
       <div className="grid grid-cols-3 gap-4 w-[1000px] pb-8">
          {state.panels.map((panel, idx) => (
             <PanelCanvas 
               key={panel.id}
               panel={panel}
               scenario={state.selectedScenario}
               isSelected={state.selectedPanelIndex === idx}
               selectedElementId={state.selectedElementId}
               onClick={() => handleSelectPanel(idx)}
               onSelectElement={(elId) => {
                  if(state.selectedPanelIndex !== idx) handleSelectPanel(idx);
                  handleSelectElement(elId);
               }}
               updateElement={(elId, updates) => handleUpdateElement(idx, elId, updates)}
               stageWidth={300}
               stageHeight={350}
            />
          ))}
       </div>
    </div>
  );
};

export const StudioScreen = ({ onPublish }) => {
  const { state } = useContext(ComicContext);

  if (!state.selectedScenario) return null;

  return (
    <motion.div 
       className="w-full h-full flex flex-row flex-wrap bg-[var(--color-studio)]"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.5 }}
    >
      {/* Top Main Area (Canvas + Tools) */}
      <div className="w-full h-[75vh] flex flex-row">
         <CanvasArea />
         <ToolboxPanel />
      </div>

      {/* Bottom Timeline */}
      <div className="w-full h-[25vh] flex flex-row">
         <TimelineBoard onPublish={onPublish} />
         {/* We reserve the bottom right 20% space for styling or timeline extension, 
             the assistant floats above anyway. */}
         <div className="w-[20%] h-full bg-[var(--color-wood-dark)] border-t-8 border-l-4 border-black border-dashed flex items-center justify-center">
             <div className="text-gray-600 font-title opacity-30 rotate-[-10deg] text-3xl" style={{fontFamily: "var(--font-title)"}}>EKO ÇİZGİ</div>
         </div>
      </div>

      {/* Floating Ink Assistant */}
      <InkAssistant />
    </motion.div>
  );
};
