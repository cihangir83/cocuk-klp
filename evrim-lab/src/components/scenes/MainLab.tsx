import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleBackground } from '../ui/ParticleBackground';
import { GlowButton } from '../ui/GlowButton';
import { TraitCard } from '../ui/TraitCard';
import { TraitLibrary } from '../panels/TraitLibrary';
import { PetriDish } from '../organisms/PetriDish';
import { MorphologyBox } from '../panels/MorphologyBox';
import { BottomBar } from '../panels/BottomBar';
import { NameModal } from '../modals/NameModal';
import { Tutorial } from '../modals/Tutorial';
import { traits } from '../../assets/traits';
import { getRandomEnvironment } from '../../assets/environments';

export function MainLab() {
  const { state, dispatch, calculateScore, getTraitColor } = useGame();
  const [showNameModal, setShowNameModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [currentEnvironment, setCurrentEnvironment] = useState(getRandomEnvironment());

  const organismTraits = state.currentOrganism.traits || [];
  const score = calculateScore(organismTraits, currentEnvironment);

  useEffect(() => {
    // Set initial player name if not set
    if (!state.player.name) {
      dispatch({ type: 'SET_PLAYER_NAME', payload: 'Araştırmacı' });
    }
  }, [state.player.name, dispatch]);

  const handleTraitSelect = (traitId: string) => {
    if (selectedTrait === traitId) {
      setSelectedTrait(null);
    } else {
      setSelectedTrait(traitId);
    }
  };

  const handleAddTrait = (traitId: string) => {
    const trait = traits.find(t => t.id === traitId);
    if (trait) {
      dispatch({ type: 'ADD_TRAIT', payload: trait });
      setSelectedTrait(null);
    }
  };

  const handleRemoveTrait = (traitId: string) => {
    dispatch({ type: 'REMOVE_TRAIT', payload: traitId });
  };

  const handleStartTest = () => {
    if (organismTraits.length > 0) {
      setShowNameModal(true);
    }
  };

  const handleConfirmTest = (name: string) => {
    dispatch({ type: 'SET_ORGANISM_NAME', payload: name });
    dispatch({ type: 'START_TEST', payload: currentEnvironment });
    setShowNameModal(false);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_ORGANISM' });
    setCurrentEnvironment(getRandomEnvironment());
  };

  const handleStartTutorial = () => {
    setShowTutorial(false);
    dispatch({ type: 'TOGGLE_TUTORIAL' });
  };

  return (
    <div className="min-h-screen bg-[#030408] relative overflow-hidden">
      <ParticleBackground intensity="low" />

      {/* Main content */}
      <div className="relative z-10 flex h-screen">
        {/* Left Panel - Trait Library */}
        <div className="w-80 h-full glass-panel border-r border-[#00FFD1]/20 overflow-hidden">
          <TraitLibrary
            traits={traits}
            selectedTrait={selectedTrait}
            onSelect={handleTraitSelect}
            onAdd={handleAddTrait}
            selectedTraits={organismTraits}
          />
        </div>

        {/* Center - Petri Dish */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative">
            {/* Ambient glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{
                background: `radial-gradient(circle, ${getTraitColor(organismTraits)}40, transparent 70%)`
              }}
            />

            <PetriDish
              traits={organismTraits}
              onRemoveTrait={handleRemoveTrait}
              organismColor={getTraitColor(organismTraits)}
            />
          </div>
        </div>

        {/* Right Panel - Morphology Box */}
        <div className="w-72 h-full glass-panel border-l border-[#00FFD1]/20 overflow-hidden">
          <MorphologyBox
            traits={organismTraits}
            score={score}
            environment={currentEnvironment}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar
        score={score}
        traitCount={organismTraits.length}
        onTest={handleStartTest}
        onReset={handleReset}
        canTest={organismTraits.length > 0}
        playerName={state.player.name}
        bestScore={state.player.bestScore}
      />

      {/* Modals */}
      <AnimatePresence>
        {showNameModal && (
          <NameModal
            onConfirm={handleConfirmTest}
            onCancel={() => setShowNameModal(false)}
            suggestedName={`Organizma ${Date.now().toString().slice(-4)}`}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTutorial && (
          <Tutorial
            onComplete={handleStartTutorial}
            onSkip={() => setShowTutorial(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
