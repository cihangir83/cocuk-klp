export const initialState = {
  selectedScenario: null, // Scenario object
  panels: [
    // Array of 6 panels
    // { id: 'panel_0', position: 0, background: null, elements: [], style: { colorTone: 'normal', borderStyle: 'handdrawn', overlay: null }, bioTrizSymbols: [], isComplete: false },
    // ...
  ],
  selectedPanelIndex: 0,
  selectedElementId: null,
  scores: {
    bioTrizConnection: 0,
    narrativeFlow: 0,
    visualRichness: 0
  },
  coverDetails: {
    title: "Benim Çizgi Romanım",
    subtitle: "Bir Bio-TRIZ Hikayesi",
    authorName: "Öğrenci"
  }
};

export function comicReducer(state, action) {
  switch (action.type) {
    case 'SELECT_SCENARIO': {
      // Initialize 6 empty panels
      const initialPanels = Array(6).fill(null).map((_, idx) => ({
        id: `panel_${idx}`,
        position: idx,
        background: null,
        elements: [],
        style: { colorTone: 'normal', borderStyle: 'handdrawn', overlay: null },
        bioTrizSymbols: [],
        isComplete: false
      }));

      return {
        ...state,
        selectedScenario: action.payload,
        panels: initialPanels,
        selectedPanelIndex: 0,
        selectedElementId: null
      };
    }
    
    case 'SELECT_PANEL':
      return {
        ...state,
        selectedPanelIndex: action.payload,
        selectedElementId: null
      };

    case 'TOGGLE_ELEMENT_SELECTION':
      return {
        ...state,
        selectedElementId: action.payload
      };

    case 'SET_BACKGROUND': {
      const { panelIndex, backgroundId } = action.payload;
      const newPanels = [...state.panels];
      newPanels[panelIndex] = { ...newPanels[panelIndex], background: backgroundId };
      return { ...state, panels: newPanels };
    }

    case 'ADD_ELEMENT': {
      const { panelIndex, element } = action.payload;
      const newPanels = [...state.panels];
      newPanels[panelIndex] = { 
        ...newPanels[panelIndex], 
        elements: [...newPanels[panelIndex].elements, element] 
      };
      
      // If it's a bioTriz symbol, add it to the panel's symbol list as well for tracking
      if (element.type === 'symbol' && element.symbolId) {
         if (!newPanels[panelIndex].bioTrizSymbols.includes(element.symbolId)) {
             newPanels[panelIndex].bioTrizSymbols = [...newPanels[panelIndex].bioTrizSymbols, element.symbolId];
         }
      }
      
      return { ...state, panels: newPanels, selectedElementId: element.id };
    }

    case 'UPDATE_ELEMENT': {
      const { panelIndex, elementId, updates } = action.payload;
      const newPanels = [...state.panels];
      const elements = newPanels[panelIndex].elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      );
      newPanels[panelIndex] = { ...newPanels[panelIndex], elements };
      return { ...state, panels: newPanels };
    }
    
    case 'DELETE_ELEMENT': {
      const { panelIndex, elementId } = action.payload;
      const newPanels = [...state.panels];
      const elements = newPanels[panelIndex].elements.filter(el => el.id !== elementId);
      newPanels[panelIndex] = { ...newPanels[panelIndex], elements };
      
      // Also check if we deleted a symbol and clean it up from tracking
      // We would ideally filter `bioTrizSymbols` array here if needed.
      return { ...state, panels: newPanels, selectedElementId: null };
    }

    case 'MARK_PANEL_COMPLETE': {
      const { panelIndex, isComplete } = action.payload;
      const newPanels = [...state.panels];
      newPanels[panelIndex] = { ...newPanels[panelIndex], isComplete };
      return { ...state, panels: newPanels };
    }

    case 'CALCULATE_SCORES': {
        const bioTrizScore = Math.min(5, state.panels.reduce((acc, p) => acc + p.bioTrizSymbols.length, 0));
        const narrativeScore = Math.min(5, state.panels.filter(p => p.elements.some(e => e.type === "balloon" && e.text && e.text.length > 5)).length);
        const visualScore = Math.min(5, state.panels.filter(p => p.elements.length >= 3 && p.background).length);
        
        return {
            ...state,
            scores: { bioTrizConnection: bioTrizScore, narrativeFlow: narrativeScore, visualRichness: visualScore }
        };
    }

    default:
      return state;
  }
}
