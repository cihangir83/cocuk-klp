import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from './context/GameContext';
import OpeningCinematic from './components/screens/OpeningCinematic';
import NameEntry from './components/screens/NameEntry';
import Workshop from './components/screens/Workshop';
import MachineSelect from './components/screens/MachineSelect';
import Workbench from './components/screens/Workbench';
import BioReveal from './components/screens/BioReveal';
import Notebook from './components/screens/Notebook';
import TeacherPanel from './components/screens/TeacherPanel';

export default function GameRouter() {
  const { state } = useGame();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'opening': return <OpeningCinematic key="opening" />;
      case 'nameEntry': return <NameEntry key="nameEntry" />;
      case 'workshop': return <Workshop key="workshop" />;
      case 'machineSelect': return <MachineSelect key="machineSelect" />;
      case 'workbench': return <Workbench key="workbench" />;
      case 'bioReveal': return <BioReveal key="bioReveal" />;
      case 'notebook': return <Notebook key="notebook" />;
      case 'teacherPanel': return <TeacherPanel key="teacherPanel" />;
      default: return <OpeningCinematic key="default" />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden relative bg-[var(--color-bg-deep)] text-[var(--color-text-display)]">
      <div className="absolute inset-0 vignette pointer-events-none z-50"></div>
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentScreen}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
