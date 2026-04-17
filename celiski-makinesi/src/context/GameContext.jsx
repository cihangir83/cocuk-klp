import { createContext, useContext, useReducer, useEffect } from 'react';
import machines from '../data/machines';
import tools from '../data/tools';
import badges from '../data/badges';

const GameContext = createContext(null);
const STORAGE_KEY = 'celiski_makinesi_save';

// Başlangıçta açık olan aletleri belirle
const initialUnlockedTools = tools
  .filter(t => t.initiallyAvailable)
  .map(t => t.id);

const initialState = {
  // Uygulama state
  currentScreen: 'opening', // opening, nameEntry, workshop, machineSelect, workbench, bioReveal, notebook, teacherPanel
  previousScreen: null,
  isFirstSession: true,

  // Oyuncu bilgileri
  playerName: '',
  inventorTitle: 'Çırak', // Çırak, Kalfa, Usta
  inventorLevel: 1,

  // İlerleme state
  solvedMachines: [],
  availableTools: initialUnlockedTools,
  discoveredBioExamples: [],

  // İstatistikler
  streakRecord: 0,
  currentStreak: 0,
  machineRecords: {}, // { machine_001: 45 } (saniye)
  totalWrongAttempts: 0,

  // Başarılar
  earnedBadges: [],

  // Aktif vaka/makine durumu
  activeMachineId: null,
  startTime: null,
  wrongAttemptsOnMachine: 0,

  // Öğretmen/Genel ayarlar
  soundEnabled: true,
  timerEnabled: false,
  timerDuration: 20 // dakika
};

function checkBadges(state) {
  const newBadges = [];
  for (const badge of badges) {
    if (!state.earnedBadges.includes(badge.id)) {
      if (badge.condition(state)) {
        newBadges.push(badge.id);
      }
    }
  }
  return newBadges;
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Geri yüklemede ana menüye dön or atölyeye dön
      const current = parsed.currentScreen;
      let targetScreen = 'workshop';
      if (current === 'opening' || current === 'nameEntry') targetScreen = current;
      
      return { ...initialState, ...parsed, currentScreen: targetScreen, isFirstSession: false, activeMachineId: null };
    }
  } catch (e) {
    console.warn('Kayıt yüklenemedi:', e);
  }
  return initialState;
}

function saveState(state) {
  try {
    const toSave = {
      playerName: state.playerName,
      inventorTitle: state.inventorTitle,
      inventorLevel: state.inventorLevel,
      solvedMachines: state.solvedMachines,
      availableTools: state.availableTools,
      discoveredBioExamples: state.discoveredBioExamples,
      streakRecord: state.streakRecord,
      currentStreak: state.currentStreak,
      machineRecords: state.machineRecords,
      totalWrongAttempts: state.totalWrongAttempts,
      earnedBadges: state.earnedBadges,
      soundEnabled: state.soundEnabled,
      isFirstSession: false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Kayıt yapılamadı:', e);
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, previousScreen: state.currentScreen, currentScreen: action.screen };
    
    case 'SET_PLAYER_INFO':
      return { ...state, playerName: action.name, inventorTitle: action.title, currentScreen: 'workshop' };

    case 'SELECT_MACHINE':
      return {
        ...state,
        activeMachineId: action.machineId,
        currentScreen: 'machineSelect'
      };

    case 'ENTER_WORKBENCH':
      return {
        ...state,
        currentScreen: 'workbench',
        startTime: Date.now(),
        wrongAttemptsOnMachine: 0
      };

    case 'TRY_TOOL': {
      const activeMachine = machines.find(m => m.id === state.activeMachineId);
      if (!activeMachine) return state;

      const isCorrect = activeMachine.correctTool === action.toolId;

      if (!isCorrect) {
        return {
          ...state,
          totalWrongAttempts: state.totalWrongAttempts + 1,
          wrongAttemptsOnMachine: state.wrongAttemptsOnMachine + 1,
          currentStreak: 0
        };
      }

      // DOĞRU CEVAP
      const now = Date.now();
      const durationSeconds = state.startTime ? Math.floor((now - state.startTime) / 1000) : 0;
      
      // Temiz tamir kontrolü (bunu mevcut stateten bakarak)
      const isCleanFix = state.wrongAttemptsOnMachine === 0;
      const newStreak = isCleanFix ? state.currentStreak + 1 : 0;
      const newStreakRecord = Math.max(state.streakRecord, newStreak);

      // Kayıtlar
      const newRecords = { ...state.machineRecords };
      if (!newRecords[state.activeMachineId] || durationSeconds < newRecords[state.activeMachineId]) {
        newRecords[state.activeMachineId] = durationSeconds;
      }

      // Çözülen makineler
      const newSolved = state.solvedMachines.includes(state.activeMachineId)
        ? state.solvedMachines
        : [...state.solvedMachines, state.activeMachineId];

      // Kilit açılanlar
      let newTools = [...state.availableTools];
      if (activeMachine.unlocks) {
        activeMachine.unlocks.forEach(unlockId => {
          if (unlockId.startsWith('tool_') && !newTools.includes(unlockId)) {
            newTools.push(unlockId);
          }
        });
      }

      // Bio örnek kaydı
      const newBio = [...state.discoveredBioExamples];
      if (!newBio.includes(state.activeMachineId)) {
        newBio.push(state.activeMachineId);
      }

      let newState = {
        ...state,
        solvedMachines: newSolved,
        availableTools: newTools,
        discoveredBioExamples: newBio,
        machineRecords: newRecords,
        currentStreak: newStreak,
        streakRecord: newStreakRecord,
        inventorLevel: Math.min(5, Math.floor(newSolved.length / 3) + 1),
        currentScreen: 'bioReveal'
      };

      // Rozet kontrolü
      const earnedNewBadges = checkBadges(newState);
      if (earnedNewBadges.length > 0) {
        newState.earnedBadges = [...newState.earnedBadges, ...earnedNewBadges];
      }

      return newState;
    }

    case 'FINISH_BIO_REVEAL':
      return {
        ...state,
        currentScreen: 'workshop',
        activeMachineId: null
      };

    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };

    case 'RESET_ALL':
      localStorage.removeItem(STORAGE_KEY);
      return initialState;

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, loadState);

  // Otomatik kayıt
  useEffect(() => {
    saveState(state);
  }, [
    state.playerName, state.inventorTitle, state.solvedMachines,
    state.availableTools, state.discoveredBioExamples, state.earnedBadges, 
    state.streakRecord, state.machineRecords, state.totalWrongAttempts,
    state.soundEnabled
  ]);

  const getActiveMachine = () => machines.find(m => m.id === state.activeMachineId) || null;

  return (
    <GameContext.Provider value={{ state, dispatch, getActiveMachine }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}

export default GameContext;
