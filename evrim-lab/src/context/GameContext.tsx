import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Organism, TestResult, Trait, PlayerState } from '../types';
import { Trait as TraitType } from '../assets/traits';
import { Environment } from '../assets/environments';

const initialPlayer: PlayerState = {
  name: '',
  organisms: [],
  bestScore: 0,
  totalTests: 0,
  survivedTests: 0,
  discoveredSynergies: [],
  earnedBadges: [],
  currentLevel: 1
};

const initialState: GameState = {
  currentScene: 'splash',
  player: initialPlayer,
  currentOrganism: {
    id: '',
    name: '',
    scientificName: '',
    creatorName: '',
    traits: [],
    morphScore: 0,
    testResults: [],
    createdAt: Date.now(),
    color: '#00FFD1'
  },
  selectedEnvironment: null,
  isTesting: false,
  testProgress: 100,
  showTutorial: false,
  tutorialStep: 0
};

type GameAction =
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'ADD_TRAIT'; payload: Trait }
  | { type: 'REMOVE_TRAIT'; payload: string }
  | { type: 'SET_ORGANISM_NAME'; payload: string }
  | { type: 'START_TEST'; payload: Environment }
  | { type: 'UPDATE_TEST_PROGRESS'; payload: number }
  | { type: 'COMPLETE_TEST'; payload: TestResult }
  | { type: 'RESET_ORGANISM' }
  | { type: 'SET_SCENE'; payload: GameState['currentScene'] }
  | { type: 'TOGGLE_TUTORIAL' }
  | { type: 'NEXT_TUTORIAL_STEP' }
  | { type: 'SAVE_ORGANISM'; payload: Organism }
  | { type: 'UNLOCK_BADGE'; payload: string }
  | { type: 'DISCOVER_SYERGY'; payload: string }
  | { type: 'LOAD_SAVED_STATE'; payload: PlayerState };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        player: { ...state.player, name: action.payload },
        currentOrganism: { ...state.currentOrganism, creatorName: action.payload }
      };

    case 'ADD_TRAIT':
      if (state.currentOrganism.traits && state.currentOrganism.traits.length >= 9) {
        return state;
      }
      return {
        ...state,
        currentOrganism: {
          ...state.currentOrganism,
          traits: [...(state.currentOrganism.traits || []), action.payload]
        }
      };

    case 'REMOVE_TRAIT':
      return {
        ...state,
        currentOrganism: {
          ...state.currentOrganism,
          traits: (state.currentOrganism.traits || []).filter(t => t.id !== action.payload)
        }
      };

    case 'SET_ORGANISM_NAME':
      return {
        ...state,
        currentOrganism: {
          ...state.currentOrganism,
          name: action.payload,
          scientificName: generateScientificName(action.payload, state.currentOrganism.traits || [])
        }
      };

    case 'START_TEST':
      return {
        ...state,
        currentScene: 'test',
        selectedEnvironment: action.payload,
        isTesting: true,
        testProgress: 100
      };

    case 'UPDATE_TEST_PROGRESS':
      return {
        ...state,
        testProgress: action.payload
      };

    case 'COMPLETE_TEST':
      const newTotalTests = state.player.totalTests + 1;
      const newSurvivedTests = action.payload.survived
        ? state.player.survivedTests + 1
        : state.player.survivedTests;
      const newBestScore = Math.max(state.player.bestScore, action.payload.survivalScore);

      return {
        ...state,
        isTesting: false,
        currentScene: 'result',
        currentOrganism: {
          ...state.currentOrganism,
          testResults: [...(state.currentOrganism.testResults || []), action.payload]
        },
        player: {
          ...state.player,
          totalTests: newTotalTests,
          survivedTests: newSurvivedTests,
          bestScore: newBestScore
        }
      };

    case 'RESET_ORGANISM':
      return {
        ...state,
        currentOrganism: {
          id: `org_${Date.now()}`,
          name: '',
          scientificName: '',
          creatorName: state.player.name,
          traits: [],
          morphScore: 0,
          testResults: [],
          createdAt: Date.now(),
          color: '#00FFD1'
        },
        currentScene: 'main'
      };

    case 'SET_SCENE':
      return {
        ...state,
        currentScene: action.payload
      };

    case 'TOGGLE_TUTORIAL':
      return {
        ...state,
        showTutorial: !state.showTutorial
      };

    case 'NEXT_TUTORIAL_STEP':
      return {
        ...state,
        tutorialStep: state.tutorialStep + 1
      };

    case 'SAVE_ORGANISM':
      return {
        ...state,
        player: {
          ...state.player,
          organisms: [...state.player.organisms, action.payload]
        }
      };

    case 'UNLOCK_BADGE':
      if (state.player.earnedBadges.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        player: {
          ...state.player,
          earnedBadges: [...state.player.earnedBadges, action.payload]
        }
      };

    case 'DISCOVER_SYERGY':
      if (state.player.discoveredSynergies.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        player: {
          ...state.player,
          discoveredSynergies: [...state.player.discoveredSynergies, action.payload]
        }
      };

    case 'LOAD_SAVED_STATE':
      return {
        ...state,
        player: action.payload
      };

    default:
      return state;
  }
}

function generateScientificName(name: string, traits: Trait[]): string {
  if (traits.length === 0) return `${name.toLowerCase()}us`;

  const firstTrait = traits[0].name.split(' ')[0].toLowerCase();
  const suffix = name.length > 0 ? name[name.length - 1] + 'i' : 'us';

  return `${firstTrait}${suffix}`;
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  calculateScore: (traits: Trait[], environment: Environment) => number;
  getTraitColor: (traits: Trait[]) => string;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const calculateScore = (traits: Trait[], environment: Environment): number => {
    if (traits.length === 0) return 0;

    let score = traits.length * 50;

    // Avantaj hesaplama
    traits.forEach(trait => {
      const advantage = trait.advantages[environment.id as keyof typeof trait.advantages] || 0;
      score += advantage * 100;
    });

    // Sinerji bonusu
    let synergyCount = 0;
    traits.forEach(trait => {
      trait.synergies.forEach(synergyId => {
        if (traits.some(t => t.id === synergyId)) {
          synergyCount++;
          score += 150;
        }
      });
    });

    // Çelişki cezası
    traits.forEach(trait => {
      trait.conflicts.forEach(conflictId => {
        if (traits.some(t => t.id === conflictId)) {
          score -= 75;
        }
      });
    });

    // Denge bonusu
    const categories = new Set(traits.map(t => t.category));
    if (categories.size >= 3) score += 100;
    if (categories.size >= 4) score += 100;

    return Math.max(0, score);
  };

  const getTraitColor = (traits: Trait[]): string => {
    if (traits.length === 0) return '#00FFD1';

    const categoryColors: Record<string, number[]> = {
      movement: [0, 255, 209],
      protection: [255, 107, 53],
      feeding: [155, 89, 255],
      resilience: [255, 225, 53]
    };

    let r = 0, g = 0, b = 0;
    traits.forEach(trait => {
      const color = categoryColors[trait.category] || [0, 255, 209];
      r += color[0];
      g += color[1];
      b += color[2];
    });

    r = Math.round(r / traits.length);
    g = Math.round(g / traits.length);
    b = Math.round(b / traits.length);

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <GameContext.Provider value={{ state, dispatch, calculateScore, getTraitColor }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
