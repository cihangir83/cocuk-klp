import React, { useState } from 'react';
import { OpeningScene } from './components/OpeningScene';
import { ScenarioDesk } from './components/ScenarioDesk';
import { StudioScreen } from './components/StudioScreen';
import { PublishScreen } from './components/PublishScreen';
import { ComicProvider } from './context/ComicContext';

function AppContent() {
  // App states: 'opening', 'desk', 'studio', 'publishing'
  const [appState, setAppState] = useState('opening');

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <div className="halftone-overlay z-0"></div>
      
      <div className="absolute inset-0 z-10 pointer-events-auto flex flex-col">
          {appState === 'opening' && (
            <OpeningScene onEnter={() => setAppState('desk')} />
          )}

          {appState === 'desk' && (
            <ScenarioDesk onScenarioSelect={() => setAppState('studio')} />
          )}

          {appState === 'studio' && (
            <StudioScreen onPublish={() => setAppState('publishing')} />
          )}

          {appState === 'publishing' && (
            <PublishScreen onBack={() => setAppState('studio')} />
          )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ComicProvider>
      <AppContent />
    </ComicProvider>
  );
}

export default App;
