import { GameProvider } from './context/GameContext';
import GameRouter from './GameRouter';

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
