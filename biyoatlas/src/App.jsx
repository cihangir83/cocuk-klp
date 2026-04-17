import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import { GoldCoinManager, startAmbientMusic, stopAmbient } from './components/GameEffects';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import WorldMapScreen from './screens/WorldMapScreen';
import EcosystemScreen from './screens/EcosystemScreen';
import CreatureProfileScreen from './screens/CreatureProfileScreen';
import AnalogyBuilderScreen from './screens/AnalogyBuilderScreen';
import AnalogyCardScreen from './screens/AnalogyCardScreen';
import AtlasCollectionScreen from './screens/AtlasCollectionScreen';
import SessionSummaryScreen from './screens/SessionSummaryScreen';
import TeacherPanelScreen from './screens/TeacherPanelScreen';
import DuelMatchScreen from './screens/DuelMatchScreen';
import DuelArenaScreen from './screens/DuelArenaScreen';
import DuelResultScreen from './screens/DuelResultScreen';

const screens = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  worldmap: WorldMapScreen,
  ecosystem: EcosystemScreen,
  creature: CreatureProfileScreen,
  analogy: AnalogyBuilderScreen,
  analogycard: AnalogyCardScreen,
  atlas: AtlasCollectionScreen,
  summary: SessionSummaryScreen,
  teacher: TeacherPanelScreen,
  duelmatch: DuelMatchScreen,
  duelarena: DuelArenaScreen,
  duelresult: DuelResultScreen,
};

// Ekran → ambient müzik eşleştirme
const screenAmbient = {
  worldmap: 'worldmap',
  ecosystem: null, // ecosystem seçimine göre ayarlanır
  creature: null,
  analogy: null,
  duelmatch: 'duel',
  duelarena: 'duel',
  duelresult: 'duel',
};

function GameScreens() {
  const { currentScreen, player, selectedEcosystem } = useGame();
  const Screen = screens[currentScreen] || SplashScreen;

  // Ambient müzik yönetimi
  useEffect(() => {
    if (currentScreen === 'splash' || currentScreen === 'onboarding') {
      stopAmbient();
      return;
    }

    const ambient = screenAmbient[currentScreen];
    if (ambient) {
      startAmbientMusic(ambient);
    } else if (selectedEcosystem && ['ecosystem', 'creature', 'analogy', 'analogycard'].includes(currentScreen)) {
      startAmbientMusic(selectedEcosystem.id);
    } else if (currentScreen === 'worldmap') {
      startAmbientMusic('worldmap');
    }
  }, [currentScreen, selectedEcosystem]);

  return (
    <GoldCoinManager goldCount={player.gold || 0}>
      <div className="w-full h-full relative overflow-hidden bg-deep">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>
    </GoldCoinManager>
  );
}

function App() {
  return (
    <GameProvider>
      <GameScreens />
    </GameProvider>
  );
}

export default App;
