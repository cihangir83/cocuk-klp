import React, { useEffect, useState } from 'react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { GameProvider, useGame } from './context/GameContext';
import OpeningScene from './screens/OpeningScene';
import SetupScreen from './screens/SetupScreen';
import ArenaScreen from './screens/ArenaScreen';
import FinalScreen from './screens/FinalScreen';
import CeremonyScreen from './screens/CeremonyScreen';
import TeacherPanel from './components/TeacherPanel';

function ScreenManager() {
  const { state } = useGame();

  switch (state.phase) {
    case 'opening':
      return <OpeningScene />;
    case 'setup':
      return <SetupScreen />;
    case 'tur1':
    case 'tur2':
    case 'tur3':
      return <ArenaScreen />;
    case 'final':
      return <FinalScreen />;
    case 'ceremony':
      return <CeremonyScreen />;
    default:
      return <OpeningScene />;
  }
}

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <GameProvider>
      <div className="w-screen h-screen overflow-hidden bg-arena-bg font-ui text-white">
        {init && <ScreenManager />}
        <TeacherPanel />
      </div>
    </GameProvider>
  );
}

export default App;
