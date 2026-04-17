import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, useDraggable, useDroppable, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useGame } from '../context/GameContext';
import { problems, prepareProblemCards } from '../data/problems';
import { useGoldCoins } from '../components/GameEffects';
import SoundEngine from '../utils/soundEngine';

function DraggableCreatureCard({ creature, ecosystem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'creature-card',
    data: { creature, ecosystem },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <motion.div
        className={`bg-card rounded-xl border-2 border-green-primary/30 p-4 cursor-grab active:cursor-grabbing touch-target ${isDragging ? 'shadow-glow-green' : 'shadow-card'}`}
        whileHover={{ y: -4 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{creature.silhouette}</span>
          <div>
            <h3 className="font-heading font-bold text-sm text-text-primary">{creature.name}</h3>
            <p className="text-[10px] text-text-secondary italic">{creature.latinName}</p>
          </div>
        </div>
        <div className="bg-surface rounded-lg p-3">
          <p className="text-xs text-text-primary font-body leading-relaxed">
            {creature.superpower.split('.')[0]}.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 text-text-muted text-[10px]">
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↕
          </motion.span>
          Sürükle ve bırak
        </div>
      </motion.div>
    </div>
  );
}

function DroppableProblemCard({ problem, isOver, isCorrect, isWrong, disabled, isHinted }) {
  const { setNodeRef } = useDroppable({
    id: problem.id,
    data: { problem },
    disabled,
  });

  return (
    <div ref={setNodeRef}>
      <motion.div
        className={`
          rounded-xl border-2 p-4 transition-all duration-300 touch-target
          ${isHinted ? 'border-gold/60 bg-gold/5 shadow-glow-gold' :
            isOver ? 'drop-zone-active border-green-primary bg-green-primary/5 scale-[1.03]' :
            isCorrect ? 'border-green-primary bg-green-primary/10' :
            isWrong ? 'border-danger bg-danger/10 animate-shake' :
            disabled ? 'border-border-subtle/30 bg-surface/30 opacity-40' :
            'border-border-subtle bg-card hover:border-text-muted'}
          ${disabled ? 'cursor-not-allowed' : 'cursor-default'}
        `}
        style={{ minHeight: '90px' }}
        animate={isWrong ? { x: [0, -4, 4, -4, 4, 0] } : isHinted ? { scale: [1, 1.03, 1] } : {}}
        transition={isHinted ? { duration: 1, repeat: 2 } : { duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{problem.icon}</span>
          <h4 className="font-heading font-semibold text-sm" style={{ color: problem.color }}>
            {problem.label}
          </h4>
        </div>
        {/* Show scenario text instead of generic description */}
        <p className="text-xs text-text-secondary font-body leading-relaxed">
          {problem.currentScenario || problem.description}
        </p>
        {isCorrect && (
          <motion.div
            className="mt-2 text-green-primary text-xs font-heading"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✓ Eşleşme başarılı!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function StreakDisplay({ streak }) {
  if (streak === 0) return null;

  return (
    <motion.div
      className={`flex items-center gap-1 px-3 py-1 rounded-full ${streak >= 3 ? 'bg-gold/20' : 'bg-green-primary/20'}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      key={streak}
    >
      <span className={`font-display text-lg ${streak >= 3 ? 'text-gold streak-fire' : 'text-green-primary'}`}>
        {streak >= 3 ? '🔥' : '⚡'} {streak}
      </span>
      <span className="text-xs text-text-secondary">SERİ</span>
    </motion.div>
  );
}

function AnalogyPowerBar({ power }) {
  const color = power > 60 ? 'bg-green-primary' : power > 30 ? 'bg-gold' : 'bg-danger';
  const textColor = power > 60 ? 'text-green-primary' : power > 30 ? 'text-gold' : 'text-danger';

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-body ${textColor}`}>
        {power <= 30 ? '⚠️ Kritik!' : 'Analoji Gücü'}
      </span>
      <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={false}
          animate={{ width: `${power}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className={`text-xs font-display ${textColor}`}>{power}</span>
    </div>
  );
}

function DifficultyBadge({ analogiesCount }) {
  if (analogiesCount >= 8) return <span className="text-[9px] px-2 py-0.5 rounded-full bg-danger/20 text-danger font-heading">ZOR</span>;
  if (analogiesCount >= 4) return <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold/20 text-gold font-heading">ORTA</span>;
  return <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-primary/20 text-green-primary font-heading">KOLAY</span>;
}

export default function AnalogyBuilderScreen() {
  const {
    player, selectedCreature, selectedEcosystem,
    setCurrentScreen, addAnalogyCard, wrongAnalogy,
    addScore, addGold, useHint, updateQuestProgress
  } = useGame();
  const { triggerCoins } = useGoldCoins();

  const creature = selectedCreature;
  const [activeId, setActiveId] = useState(null);
  const [overTarget, setOverTarget] = useState(null);
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintTarget, setHintTarget] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [wrongProblemId, setWrongProblemId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  // Use the new scenario-based problem card system with difficulty scaling
  const selectedProblems = useMemo(() => {
    if (!creature) return [];
    return prepareProblemCards(creature.ecologicalProblemMatch, player.analogyCards.length);
  }, [creature, player.analogyCards.length]);

  if (!creature) return null;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    setWrongProblemId(null);
    SoundEngine.dragStart();
  };

  const handleDragOver = (event) => {
    setOverTarget(event.over?.id || null);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    setOverTarget(null);
    const overId = event.over?.id;
    if (!overId) return;

    SoundEngine.drop();

    if (overId === creature.ecologicalProblemMatch) {
      // Correct!
      setResult('correct');
      SoundEngine.correct();

      const basePoints = creature.rarity === 'ultra-rare' ? 150 : creature.rarity === 'rare' ? 100 : 50;
      const streakBonus = player.streak * 10;
      const totalPoints = basePoints + streakBonus;
      addScore(totalPoints);

      // Altın kazan!
      const goldAmount = creature.rarity === 'ultra-rare' ? 10 : creature.rarity === 'rare' ? 5 : 3;
      addGold(goldAmount);
      triggerCoins(goldAmount, window.innerWidth / 2, window.innerHeight / 3);

      const card = {
        id: `${creature.id}_${Date.now()}`,
        creatureId: creature.id,
        creatureName: creature.name,
        creatureSilhouette: creature.silhouette,
        problemId: creature.ecologicalProblemMatch,
        problemLabel: problems.find(p => p.id === creature.ecologicalProblemMatch)?.label,
        analogyText: creature.analogyText,
        rarity: creature.rarity,
        ecosystemId: selectedEcosystem?.id,
        playerName: player.name,
        date: new Date().toISOString(),
        points: totalPoints,
      };

      addAnalogyCard(card);
      updateQuestProgress('analogy', creature.ecologicalProblemMatch);

      if (player.streak + 1 >= 3) {
        updateQuestProgress('streak', null);
        SoundEngine.streakUp();
      }

      setCompleted(true);

      setTimeout(() => {
        setCurrentScreen('analogycard');
      }, 2000);

    } else {
      // Wrong
      setResult('wrong');
      setWrongProblemId(overId);
      SoundEngine.wrong();
      wrongAnalogy();
      setWrongAttempts(prev => prev + 1);

      if (player.streak > 0) {
        SoundEngine.streakBreak();
      }

      setTimeout(() => {
        setResult(null);
        setWrongProblemId(null);
      }, 1500);
    }
  };

  const handleHint = () => {
    useHint();
    SoundEngine.uiClick();
    setHintTarget(creature.ecologicalProblemMatch);
    setShowHint(true);
    setTimeout(() => {
      setShowHint(false);
      setHintTarget(null);
    }, 2500);
  };

  return (
    <motion.div
      className="relative w-full h-full bg-deep overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('creature');
          }}
          className="glass rounded-lg px-3 py-2 text-text-secondary text-sm font-body hover:text-text-primary transition-colors touch-target"
        >
          ← Geri
        </button>

        <div className="flex items-center gap-3">
          <DifficultyBadge analogiesCount={player.analogyCards.length} />
          <StreakDisplay streak={player.streak} />
          <AnalogyPowerBar power={player.analogyPower} />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row gap-4 px-4 py-4 h-[calc(100%-60px)]">
          {/* Left — Creature Strategy Card (45%) */}
          <div className="w-full md:w-[45%]">
            <DraggableCreatureCard creature={creature} ecosystem={selectedEcosystem} />
          </div>

          {/* Right — Problem Cards Grid (55%) */}
          <div className="w-full md:w-[55%]">
            <h3 className="font-heading font-semibold text-xs text-text-secondary uppercase tracking-wider mb-3">
              Bu strateji hangi soruna çözüm olabilir?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedProblems.map((problem) => (
                <DroppableProblemCard
                  key={problem.id}
                  problem={problem}
                  isOver={overTarget === problem.id}
                  isCorrect={completed && problem.id === creature.ecologicalProblemMatch}
                  isWrong={wrongProblemId === problem.id}
                  disabled={completed}
                  isHinted={showHint && hintTarget === problem.id}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <motion.div
              className="bg-card rounded-xl border-2 border-green-primary p-4 shadow-glow-green w-64 opacity-90"
              animate={{ rotate: 5, scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{creature.silhouette}</span>
                <h3 className="font-heading font-bold text-sm text-text-primary">{creature.name}</h3>
              </div>
            </motion.div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Hint button */}
      <AnimatePresence>
        {wrongAttempts >= 2 && !completed && (
          <motion.button
            onClick={handleHint}
            className="absolute bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-xl hover:bg-gold/30 transition-all touch-target"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="İpucu (-10 puan)"
          >
            💡
          </motion.button>
        )}
      </AnimatePresence>

      {/* Wrong message */}
      <AnimatePresence>
        {result === 'wrong' && (
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 glass rounded-xl px-6 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="text-text-secondary text-sm font-body">
              Bu bağlantı zayıf. Başka bir yol dene.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Correct overlay */}
      <AnimatePresence>
        {result === 'correct' && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Green wave */}
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-green-primary/30"
              animate={{ scale: [1, 30], opacity: [0.5, 0] }}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className="relative z-10 glass rounded-2xl px-8 py-4 text-center"
              initial={{ scale: 0.5, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-heading font-bold text-green-primary text-lg">
                Analoji Kartı Oluşturuldu
              </p>
              <p className="text-text-secondary text-sm font-body mt-1">
                +{creature.rarity === 'ultra-rare' ? 150 : creature.rarity === 'rare' ? 100 : 50} puan
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
