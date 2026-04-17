import { createContext, useContext, useReducer } from 'react';

// initialState
const initialState = {
  currentScene: 'opening', // opening | selector | room_ocean | room_fire | room_industrial | ending
  playerName: '',
  groupRole: null,
  hintTokens: 3,
  hintsUsed: 0,
  wrongAttempts: 0,
  completedRooms: [],
  roomTimes: {},
  totalTimeRemaining: 20 * 60, // 20 minutes in seconds
  finalScore: 0,
  badges: [],
  isMuted: false,
};

const GameContext = createContext();

function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, currentScene: 'selector' };
    case 'ENTER_ROOM':
      return { ...state, currentScene: action.payload };
    case 'LEAVE_ROOM':
      return { ...state, currentScene: 'selector' };
    case 'USE_HINT':
      return { 
        ...state, 
        hintTokens: Math.max(0, state.hintTokens - 1),
        hintsUsed: state.hintsUsed + 1
      };
    case 'EARN_HINT':
      return { ...state, hintTokens: state.hintTokens + 1 };
    case 'WRONG_ATTEMPT':
      return { ...state, wrongAttempts: state.wrongAttempts + 1 };
    case 'ROOM_COMPLETED':
      return { 
        ...state, 
        completedRooms: [...state.completedRooms, action.payload.roomId],
        roomTimes: { ...state.roomTimes, [action.payload.roomId]: action.payload.timeSpent },
        currentScene: 'selector'
      };
    case 'TIME_UP':
      return { ...state, currentScene: 'ending' };
    case 'ALL_ROOMS_COMPLETED':
      return { ...state, currentScene: 'ending', finalScore: action.payload.score };
    case 'UPDATE_GLOBAL_TIME':
      return { ...state, totalTimeRemaining: action.payload };
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}

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
