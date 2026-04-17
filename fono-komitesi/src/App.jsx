import React from 'react';
import { useGame } from './context/GameContext';
import ThemeWrapper from './components/ThemeWrapper';
import WelcomeScreen from './components/WelcomeScreen';
import BriefingScreen from './components/BriefingScreen';
import PresentationScreen from './components/PresentationScreen';
import AnalysisScreen from './components/AnalysisScreen';
import DecisionScreen from './components/DecisionScreen';
import JustificationScreen from './components/JustificationScreen';
import FinalReportScreen from './components/FinalReportScreen';
import TeacherPanel from './components/TeacherPanel';

function AppContent() {
  const { state } = useGame();

  const renderStage = () => {
    switch (state.currentStage) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'briefing':
        return <BriefingScreen />;
      case 'presentation':
        return <PresentationScreen />;
      case 'analysis':
        return <AnalysisScreen />;
      case 'decision':
        return <DecisionScreen />;
      case 'justification':
        return <JustificationScreen />;
      case 'report':
        return <FinalReportScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <ThemeWrapper>
      {renderStage()}
      <TeacherPanel />
    </ThemeWrapper>
  );
}

export default function App() {
  return <AppContent />;
}
