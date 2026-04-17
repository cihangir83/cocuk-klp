import { useGame, GameProvider } from './context/GameContext';
import { SplashScene } from './components/scenes/SplashScene';
import { MainLab } from './components/scenes/MainLab';
import { TestScene } from './components/scenes/TestScene';
import { ResultScene } from './components/scenes/ResultScene';
import { MuseumScene } from './components/scenes/MuseumScene';
import { ErrorBoundary } from './components/ErrorBoundary';

function GameRouter() {
  const { state } = useGame();

  switch (state.currentScene) {
    case 'splash':
      return <SplashScene />;
    case 'main':
      return <MainLab />;
    case 'test':
      return <TestScene />;
    case 'result':
      return <ResultScene />;
    case 'museum':
      return <MuseumScene />;
    default:
      return <SplashScene />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameRouter />
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
