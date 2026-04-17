import { GameProvider, useGame } from './context/GameContext';
import { AudioController } from './components/AudioController';
import OpeningScene from './components/OpeningScene';
import RegionSelector from './components/RegionSelector';
import RoomOcean from './components/RoomOcean';
import RoomFire from './components/RoomFire';
import RoomIndustrial from './components/RoomIndustrial';
import EndingScene from './components/EndingScene';
import './index.css';

function GameRouter() {
  const { state } = useGame();

  return (
    <>
      <AudioController />
      {state.currentScene === 'opening' && <OpeningScene />}
      {state.currentScene === 'selector' && <RegionSelector />}
      {state.currentScene === 'room_ocean' && <RoomOcean />}
      {state.currentScene === 'room_fire' && <RoomFire />}
      {state.currentScene === 'room_industrial' && <RoomIndustrial />}
      {state.currentScene === 'ending' && <EndingScene />}
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;
