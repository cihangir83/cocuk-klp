import { AnimatePresence } from 'framer-motion';
import { useGame } from './context/GameContext';
import OpeningCinematic from './components/screens/OpeningCinematic';
import NameEntry from './components/screens/NameEntry';
import CaseSelection from './components/screens/CaseSelection';
import CaseIntro from './components/screens/CaseIntro';
import InvestigationDesk from './components/screens/InvestigationDesk';
import RootCauseReveal from './components/screens/RootCauseReveal';
import ReportWriting from './components/screens/ReportWriting';
import ResultsScreen from './components/screens/ResultsScreen';
import TeacherPanel from './components/screens/TeacherPanel';

export default function GameRouter() {
  const { state } = useGame();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'opening': return <OpeningCinematic key="opening" />;
      case 'nameEntry': return <NameEntry key="nameEntry" />;
      case 'caseSelection': return <CaseSelection key="caseSelection" />;
      case 'caseIntro': return <CaseIntro key="caseIntro" />;
      case 'investigation': return <InvestigationDesk key="investigation" />;
      case 'rootCauseReveal': return <RootCauseReveal key="rootCauseReveal" />;
      case 'reportWriting': return <ReportWriting key="reportWriting" />;
      case 'results': return <ResultsScreen key="results" />;
      case 'teacherPanel': return <TeacherPanel key="teacherPanel" />;
      default: return <OpeningCinematic key="opening" />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden relative" style={{ background: '#0D0D0D' }}>
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
    </div>
  );
}
