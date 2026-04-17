import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { questions } from '../data/questions';

const initialState = {
  phase: "opening", // opening | setup | tur1 | tur2 | tur3 | final | ceremony
  currentTur: 1,
  currentQuestionIndex: 0,
  teams: [], // { id, name, color, members, score, jokers: {shield, extend, eliminate}, answers: [], badges: [] }
  timeRemaining: 0,
  questionActive: false,
  answers: {}, // question_id -> team answers
  isTimerRunning: false,
  addedTime: 0,
  activeShields: {}, // teamId -> boolean
  eliminatedOptions: [], // array of eliminated option ids
};

const GameContext = createContext();

export const P = {
  SET_PHASE: 'SET_PHASE',
  ADD_TEAM: 'ADD_TEAM',
  REMOVE_TEAM: 'REMOVE_TEAM',
  UPDATE_TEAM: 'UPDATE_TEAM',
  START_GAME: 'START_GAME',
  NEXT_ROUND: 'NEXT_ROUND',
  NEXT_QUESTION: 'NEXT_QUESTION',
  SET_TIMER: 'SET_TIMER',
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  TICK_TIMER: 'TICK_TIMER',
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
  USE_JOKER: 'USE_JOKER',
  UPDATE_SCORE: 'UPDATE_SCORE',
  ADD_TIME: 'ADD_TIME'
};

function gameReducer(state, action) {
  switch (action.type) {
    case P.SET_PHASE:
      return { ...state, phase: action.payload };
    case P.ADD_TEAM:
      return { ...state, teams: [...state.teams, action.payload] };
    case P.REMOVE_TEAM:
      return { ...state, teams: state.teams.filter(t => t.id !== action.payload) };
    case P.UPDATE_TEAM:
      return {
        ...state,
        teams: state.teams.map(t => t.id === action.payload.id ? { ...t, ...action.payload.updates } : t)
      };
    case P.START_GAME:
      return { ...state, phase: "tur1", currentTur: 1, currentQuestionIndex: 0, addedTime: 0, activeShields: {}, eliminatedOptions: [] };
    case P.NEXT_ROUND:
      return { ...state, phase: `tur${action.payload}`, currentTur: action.payload, currentQuestionIndex: 0, addedTime: 0, activeShields: {}, eliminatedOptions: [] };
    case P.NEXT_QUESTION:
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, questionActive: true, isTimerRunning: false, addedTime: 0, activeShields: {}, eliminatedOptions: [] };
    case P.SET_TIMER:
      return { ...state, timeRemaining: action.payload };
    case P.START_TIMER:
      return { ...state, isTimerRunning: true };
    case P.STOP_TIMER:
      return { ...state, isTimerRunning: false };
    case P.ADD_TIME:
      return { ...state, addedTime: state.addedTime + action.payload, timeRemaining: state.timeRemaining + action.payload };
    case P.TICK_TIMER:
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };
    case P.SUBMIT_ANSWER:
      return { 
        ...state, 
        answers: {
          ...state.answers,
          [action.payload.questionId]: {
            ...state.answers[action.payload.questionId],
            [action.payload.teamId]: action.payload.answer
          }
        }
      };
    case P.USE_JOKER: {
      const { teamId, jokerType, eliminateIds } = action.payload;
      
      let newEliminated = state.eliminatedOptions || [];
      let newShields = { ...(state.activeShields || {}) };
      
      if (jokerType === 'shield') {
        newShields[teamId] = true;
      } else if (jokerType === 'eliminate' && eliminateIds) {
        newEliminated = [...newEliminated, ...eliminateIds];
      }

      return {
        ...state,
        activeShields: newShields,
        eliminatedOptions: newEliminated,
        teams: state.teams.map(t => {
          if (t.id === teamId) {
            return {
              ...t,
              jokers: { ...t.jokers, [jokerType]: t.jokers[jokerType] - 1 }
            }
          }
          return t;
        })
      };
    }
    case P.UPDATE_SCORE:
      return {
        ...state,
        teams: state.teams.map(t => {
          if (t.id === action.payload.teamId) {
            return { ...t, score: t.score + action.payload.points }
          }
          return t;
        }).sort((a,b) => b.score - a.score)
      };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Sync state to localstorage for persistence
  useEffect(() => {
    const saved = localStorage.getItem('biotriz_arena_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only restore if valid, could implement full restore later
      } catch (e) {
        console.error("Could not load state");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('biotriz_arena_state', JSON.stringify(state));
  }, [state]);

  const value = { state, dispatch };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
