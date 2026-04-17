import React, { createContext, useReducer, useContext } from 'react';

// Stages: welcome -> briefing -> presentation -> analysis -> decision -> justification -> report
const initialState = {
  playerName: '',
  currentStage: 'welcome',
  selectedCriteria: [],
  criteriaWeights: {},
  ahpMatrix: [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
  ],
  watchedPresentations: [],
  activeProjectIndex: 0,
  notes: {},
  scenarios: [],
  finalDecision: null,
  justification: "",
  analysisResult: null
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    case 'SET_STAGE':
      return { ...state, currentStage: action.payload };
    case 'TOGGLE_CRITERIA':
      const newSelected = state.selectedCriteria.includes(action.payload)
        ? state.selectedCriteria.filter(c => c !== action.payload)
        : [...state.selectedCriteria, action.payload];
      
      // Auto-distribute weights equally when 4 are selected
      if (newSelected.length === 4) {
        const weights = {};
        newSelected.forEach(c => weights[c] = 25);
        return { ...state, selectedCriteria: newSelected, criteriaWeights: weights };
      }
      return { ...state, selectedCriteria: newSelected };
    case 'UPDATE_WEIGHTS':
      return { ...state, criteriaWeights: action.payload };
    case 'UPDATE_AHP_MATRIX':
      return { ...state, ahpMatrix: action.payload };
    case 'MARK_PRESENTATION_WATCHED':
      return { 
        ...state, 
        watchedPresentations: [...new Set([...state.watchedPresentations, action.payload])] 
      };
    case 'SET_ACTIVE_PROJECT':
      return { ...state, activeProjectIndex: action.payload };
    case 'ADD_NOTE':
      return { 
        ...state, 
        notes: { ...state.notes, [action.payload.projectId]: action.payload.note } 
      };
    case 'SAVE_SCENARIO':
      return {
        ...state,
        scenarios: [...state.scenarios, action.payload]
      };
    case 'SET_FINAL_DECISION':
      return { ...state, finalDecision: action.payload };
    case 'SET_JUSTIFICATION':
      return { ...state, justification: action.payload };
    case 'SET_ANALYSIS_RESULT':
      return { ...state, analysisResult: action.payload };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
