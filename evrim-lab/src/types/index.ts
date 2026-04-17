import { Trait } from '../assets/traits';
import { Environment } from '../assets/environments';

export interface TestResult {
  environmentId: string;
  survived: boolean;
  survivalScore: number;
  traitAnalysis: TraitAnalysis[];
  timestamp: number;
}

export interface TraitAnalysis {
  traitId: string;
  contribution: number;
  effect: 'advantage' | 'neutral' | 'disadvantage';
}

export interface Organism {
  id: string;
  name: string;
  scientificName: string;
  creatorName: string;
  traits: Trait[];
  morphScore: number;
  testResults: TestResult[];
  createdAt: number;
  color: string;
}

export interface PlayerState {
  name: string;
  organisms: Organism[];
  bestScore: number;
  totalTests: number;
  survivedTests: number;
  discoveredSynergies: string[];
  earnedBadges: string[];
  currentLevel: number;
}

export interface GameState {
  currentScene: 'splash' | 'main' | 'test' | 'result' | 'museum';
  player: PlayerState;
  currentOrganism: Partial<Organism>;
  selectedEnvironment: Environment | null;
  isTesting: boolean;
  testProgress: number;
  showTutorial: boolean;
  tutorialStep: number;
}

export type OrganismState =
  | 'idle'
  | 'dragging'
  | 'absorbing'
  | 'testing'
  | 'surviving'
  | 'growing'
  | 'dissolving';

export interface OrganismRenderConfig {
  baseShape: 'blob' | 'elongated' | 'flat' | 'radial';
  symmetry: 'bilateral' | 'radial' | 'asymmetric';
  size: number;
  color: string;
  secondaryColor: string;
  traits: Trait[];
  animationState: OrganismState;
  glowIntensity: number;
}
