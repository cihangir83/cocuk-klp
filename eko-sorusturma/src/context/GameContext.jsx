import { createContext, useContext, useReducer, useEffect } from 'react';
import cases from '../data/cases';

const GameContext = createContext(null);

const STORAGE_KEY = 'eko_sorusturma_save';

const initialState = {
  // Uygulama state
  currentScreen: 'opening', // opening | nameEntry | caseSelection | caseIntro | investigation | rootCauseReveal | reportWriting | results | teacherPanel
  previousScreen: null,
  isFirstSession: true,

  // Oyuncu bilgileri
  playerName: '',
  
  // Vaka state
  activeCaseId: null,
  solvedCases: [],
  caseStatuses: {
    vaka_247: 'active',
    vaka_312: 'locked',
    vaka_089: 'locked',
    vaka_401: 'locked'
  },
  
  // Soruşturma state
  collectedEvidence: [],    // masaya eklenen kanıt ID'leri
  viewedEvidence: [],       // incelenmiş kanıtlar
  boardEvidence: [],        // panoya eklenmiş kanıtlar
  connections: [],          // kurulan bağlantılar [{from, to, correct}]
  chainProgress: [],        // doldurulan zincir pozisyonları
  wrongConnections: 0,
  hintsUsed: 0,
  startTime: null,
  herringDetected: false,
  allEvidenceViewed: false,
  inspectingEvidenceId: null,
  
  // Bağlantı kurma state
  connectingFrom: null,     // ip çekme başlangıç kanıt ID

  // Rozet
  earnedBadges: [],

  // Final rapor
  finalReport: '',

  // Zaman baskısı (öğretmen panelinden)
  timerEnabled: false,
  timerDuration: 20, // dakika

  // Ses
  soundEnabled: true,
  ambientPlaying: false,

  // Leaderboard
  leaderboard: [],

  // Sonuç istatistikleri
  lastResults: null
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialState, ...parsed, currentScreen: parsed.currentScreen === 'opening' ? 'opening' : 'caseSelection', isFirstSession: false };
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
      solvedCases: state.solvedCases,
      caseStatuses: state.caseStatuses,
      earnedBadges: state.earnedBadges,
      timerEnabled: state.timerEnabled,
      timerDuration: state.timerDuration,
      leaderboard: state.leaderboard,
      isFirstSession: false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Kayıt yapılamadı:', e);
  }
}

function getActiveCase(state) {
  if (!state.activeCaseId) return null;
  return cases.find(c => c.id === state.activeCaseId) || null;
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, previousScreen: state.currentScreen, currentScreen: action.screen };
    
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.name };
    
    case 'START_CASE': {
      const caseData = cases.find(c => c.id === action.caseId);
      if (!caseData) return state;
      // Başlangıçta açık kanıtları topla
      const initialEvidence = caseData.evidences
        .filter(e => !e.locked)
        .map(e => e.id);
      return {
        ...state,
        activeCaseId: action.caseId,
        collectedEvidence: initialEvidence,
        viewedEvidence: [],
        boardEvidence: [],
        connections: [],
        chainProgress: [],
        wrongConnections: 0,
        hintsUsed: 0,
        startTime: Date.now(),
        herringDetected: false,
        allEvidenceViewed: false,
        inspectingEvidenceId: null,
        connectingFrom: null,
        finalReport: '',
        lastResults: null,
        currentScreen: 'caseIntro'
      };
    }

    case 'ENTER_INVESTIGATION':
      return { ...state, currentScreen: 'investigation' };
    
    case 'VIEW_EVIDENCE': {
      const newViewed = state.viewedEvidence.includes(action.evidenceId)
        ? state.viewedEvidence
        : [...state.viewedEvidence, action.evidenceId];
      const activeCase = getActiveCase(state);
      const allViewed = activeCase
        ? activeCase.evidences.every(e => newViewed.includes(e.id))
        : false;
      return { ...state, viewedEvidence: newViewed, allEvidenceViewed: allViewed };
    }
    
    case 'INSPECT_EVIDENCE':
      return { ...state, inspectingEvidenceId: action.evidenceId };
    
    case 'CLOSE_INSPECTION':
      return { ...state, inspectingEvidenceId: null };
    
    case 'ADD_TO_BOARD': {
      if (state.boardEvidence.includes(action.evidenceId)) return state;
      return { ...state, boardEvidence: [...state.boardEvidence, action.evidenceId] };
    }

    case 'START_CONNECTING':
      return { ...state, connectingFrom: action.evidenceId };
    
    case 'CANCEL_CONNECTING':
      return { ...state, connectingFrom: null };
    
    case 'MAKE_CONNECTION': {
      const { from, to } = action;
      const activeCase = getActiveCase(state);
      if (!activeCase) return state;
      
      // Aynı bağlantı zaten var mı?
      if (state.connections.some(c => c.from === from && c.to === to)) {
        return { ...state, connectingFrom: null };
      }
      
      const fromEvidence = activeCase.evidences.find(e => e.id === from);
      const isCorrect = fromEvidence && fromEvidence.connectsTo && fromEvidence.connectsTo.includes(to);
      
      const newConnection = { from, to, correct: isCorrect };
      let newState = {
        ...state,
        connections: [...state.connections, newConnection],
        connectingFrom: null,
        wrongConnections: isCorrect ? state.wrongConnections : state.wrongConnections + 1
      };
      
      if (isCorrect) {
        // Zincir pozisyonunu doldur
        if (fromEvidence.chainPosition && !state.chainProgress.includes(fromEvidence.chainPosition)) {
          newState.chainProgress = [...state.chainProgress, fromEvidence.chainPosition];
        }
        
        // Yeni kanıt aç
        if (fromEvidence.unlocks) {
          fromEvidence.unlocks.forEach(unlockId => {
            if (!newState.collectedEvidence.includes(unlockId)) {
              newState.collectedEvidence = [...newState.collectedEvidence, unlockId];
            }
          });
        }

        // Eğer hedefe bağlantı ROOT ise ve son chainPosition
        if (to === 'ROOT') {
          const lastChainPos = activeCase.chainLinks.length;
          if (!newState.chainProgress.includes(lastChainPos)) {
            newState.chainProgress = [...newState.chainProgress, lastChainPos];
          }
        }
        
        // Tüm zincir tamamlandı mı?
        if (newState.chainProgress.length >= activeCase.chainLinks.length) {
          newState.currentScreen = 'rootCauseReveal';
        }
      }
      
      return newState;
    }
    
    case 'DETECT_HERRING':
      return { ...state, herringDetected: true };
    
    case 'SET_FINAL_REPORT':
      return { ...state, finalReport: action.report };
    
    case 'COMPLETE_CASE': {
      const now = Date.now();
      const elapsed = state.startTime ? Math.floor((now - state.startTime) / 1000) : 0;
      const activeCase = getActiveCase(state);
      const accuracy = activeCase 
        ? Math.round((state.chainProgress.length / activeCase.chainLinks.length) * 100) 
        : 0;
      
      const results = {
        caseId: state.activeCaseId,
        playerName: state.playerName,
        evidenceCount: state.collectedEvidence.length,
        wrongConnections: state.wrongConnections,
        timeSeconds: elapsed,
        accuracy,
        report: state.finalReport,
        solvedAt: now
      };
      
      const nextCaseOrder = ['vaka_247', 'vaka_312', 'vaka_089', 'vaka_401'];
      const currentIdx = nextCaseOrder.indexOf(state.activeCaseId);
      const newCaseStatuses = { ...state.caseStatuses };
      newCaseStatuses[state.activeCaseId] = 'solved';
      if (currentIdx < nextCaseOrder.length - 1) {
        newCaseStatuses[nextCaseOrder[currentIdx + 1]] = 'active';
      }
      
      const newSolved = state.solvedCases.includes(state.activeCaseId)
        ? state.solvedCases
        : [...state.solvedCases, state.activeCaseId];
      
      const newLeaderboard = [...state.leaderboard, results]
        .sort((a, b) => a.timeSeconds - b.timeSeconds)
        .slice(0, 10);
      
      return {
        ...state,
        solvedCases: newSolved,
        caseStatuses: newCaseStatuses,
        lastResults: results,
        leaderboard: newLeaderboard,
        currentScreen: 'results'
      };
    }
    
    case 'EARN_BADGE': {
      if (state.earnedBadges.includes(action.badgeId)) return state;
      return { ...state, earnedBadges: [...state.earnedBadges, action.badgeId] };
    }
    
    case 'GO_TO_CASE_SELECTION':
      return { ...state, currentScreen: 'caseSelection', activeCaseId: null };
    
    case 'TOGGLE_TIMER':
      return { ...state, timerEnabled: !state.timerEnabled };
    
    case 'SET_TIMER_DURATION':
      return { ...state, timerDuration: action.duration };
    
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    
    case 'UNLOCK_CASE':
      return { ...state, caseStatuses: { ...state.caseStatuses, [action.caseId]: 'active' } };
    
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
  }, [state.playerName, state.solvedCases, state.caseStatuses, state.earnedBadges, state.leaderboard, state.timerEnabled, state.timerDuration]);

  return (
    <GameContext.Provider value={{ state, dispatch, getActiveCase: () => getActiveCase(state) }}>
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
