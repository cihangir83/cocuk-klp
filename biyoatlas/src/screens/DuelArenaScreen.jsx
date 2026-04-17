import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ecosystems } from '../data/ecosystems';
import { problems, prepareProblemCards } from '../data/problems';
import { botDifficulty, getRandomEmote, getStarsInCurrentRank } from '../data/duel';
import { useGoldCoins } from '../components/GameEffects';
import SoundEngine from '../utils/soundEngine';

function RoundTimer({ duration, onExpire, paused }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (paused || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [paused, timeLeft]);

  const pct = (timeLeft / duration) * 100;
  const color = timeLeft > duration * 0.5 ? '#00C896' : timeLeft > duration * 0.25 ? '#F5A623' : '#E84545';

  return (
    <div className="flex items-center gap-2">
      <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="font-display text-sm" style={{ color }}>{timeLeft}s</span>
    </div>
  );
}

export default function DuelArenaScreen() {
  const { player, setCurrentScreen, winDuel, loseDuel, addGold } = useGame();
  const { triggerCoins } = useGoldCoins();

  const [round, setRound] = useState(0); // 0, 1, 2 (3 rounds)
  const [phase, setPhase] = useState('reveal'); // reveal → play → result → next
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [botEmote, setBotEmote] = useState('');
  const [playerChoice, setPlayerChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [showBotThinking, setShowBotThinking] = useState(false);
  const [roundResult, setRoundResult] = useState(null); // 'player' | 'bot' | 'draw'
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [roundTimerPaused, setRoundTimerPaused] = useState(false);

  const botRef = useRef(null);
  const botTimerRef = useRef(null);

  // Load bot from session
  const botData = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('biyoatlas_duel_bot') || '{}');
    } catch { return {}; }
  }, []);

  const diffConfig = botDifficulty[botData.difficulty || 'easy'];
  const ROUND_TIME = 15; // seconds per round
  const TOTAL_ROUNDS = 5;

  // Select creatures for each round (different every time)
  const roundCreatures = useMemo(() => {
    const allCreatures = ecosystems.flatMap(e =>
      e.creatures.map(c => ({ ...c, ecosystemId: e.id }))
    );
    const shuffled = [...allCreatures].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, TOTAL_ROUNDS);
  }, []);

  const currentCreature = roundCreatures[round];

  // Prepare problem cards for current round
  const problemCards = useMemo(() => {
    if (!currentCreature) return [];
    return prepareProblemCards(currentCreature.ecologicalProblemMatch, player.analogyCards.length);
  }, [currentCreature, round]);

  // Start reveal phase for each round
  useEffect(() => {
    if (phase === 'reveal' && currentCreature) {
      SoundEngine.cardFlip();
      const timer = setTimeout(() => {
        setPhase('play');
        setShowBotThinking(true);
        setBotEmote(getRandomEmote('thinking'));
        startBotThinking();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, round]);

  const startBotThinking = () => {
    const [minTime, maxTime] = diffConfig.thinkTime;
    const thinkTime = minTime + Math.random() * (maxTime - minTime);

    botTimerRef.current = setTimeout(() => {
      const isCorrect = Math.random() < diffConfig.correctRate;
      const correctId = currentCreature.ecologicalProblemMatch;

      if (isCorrect) {
        setBotChoice(correctId);
        setBotEmote(getRandomEmote('correct'));
      } else {
        const wrongIds = problemCards.filter(p => p.id !== correctId).map(p => p.id);
        const wrongId = wrongIds[Math.floor(Math.random() * wrongIds.length)];
        setBotChoice(wrongId || correctId);
        setBotEmote(getRandomEmote('wrong'));
      }
      setShowBotThinking(false);
    }, thinkTime);
  };

  // Check round result when both have chosen
  useEffect(() => {
    if (phase !== 'play') return;
    if (playerChoice === null && botChoice === null) return;

    // If one has answered, evaluate
    if (playerChoice !== null || botChoice !== null) {
      // Wait a tiny bit for the other
      const checkTimer = setTimeout(() => {
        evaluateRound();
      }, 500);
      return () => clearTimeout(checkTimer);
    }
  }, [playerChoice, botChoice]);

  const evaluateRound = () => {
    if (roundResult) return; // already evaluated
    setRoundTimerPaused(true);
    clearTimeout(botTimerRef.current);

    const correctId = currentCreature.ecologicalProblemMatch;
    const playerCorrect = playerChoice === correctId;
    const botCorrect = botChoice === correctId;

    let result;
    if (playerCorrect && !botCorrect) {
      result = 'player';
      setPlayerScore(prev => prev + 1);
      SoundEngine.correct();
      setBotEmote(getRandomEmote('playerCorrect'));
      // Altın kazan!
      addGold(5);
      triggerCoins(5, window.innerWidth / 2, window.innerHeight / 2);
    } else if (!playerCorrect && botCorrect) {
      result = 'bot';
      setBotScore(prev => prev + 1);
      SoundEngine.wrong();
      setBotEmote(getRandomEmote('playerWrong'));
    } else if (playerCorrect && botCorrect) {
      result = 'player';
      setPlayerScore(prev => prev + 1);
      SoundEngine.correct();
      setBotEmote('Aynı anda bildik!');
      addGold(3);
      triggerCoins(3, window.innerWidth / 2, window.innerHeight / 2);
    } else {
      result = 'draw';
      SoundEngine.wrong();
      setBotEmote('İkimiz de yanıldık!');
    }

    setRoundResult(result);
    setPhase('result');
    setShowBotThinking(false);
  };

  const handlePlayerChoice = (problemId) => {
    if (playerChoice !== null || phase !== 'play') return;
    SoundEngine.uiClick();
    setPlayerChoice(problemId);
    setSelectedProblemId(problemId);
  };

  const handleTimeExpire = () => {
    if (phase === 'play' && playerChoice === null) {
      // Player didn't answer in time
      setPlayerChoice('__timeout__');
      setBotEmote('Süre doldu!');
    }
  };

  const nextRound = () => {
    if (round + 1 >= TOTAL_ROUNDS) {
      // Game over — store result
      const playerWon = playerScore > botScore || (roundResult === 'player' && playerScore >= botScore);
      sessionStorage.setItem('biyoatlas_duel_result', JSON.stringify({
        playerScore: roundResult === 'player' ? playerScore + (round === TOTAL_ROUNDS - 1 ? 0 : 0) : playerScore,
        botScore: roundResult === 'bot' ? botScore : botScore,
        won: playerWon,
        bot: botData,
        rounds: TOTAL_ROUNDS
      }));
      setCurrentScreen('duelresult');
      return;
    }

    setRound(prev => prev + 1);
    setPhase('reveal');
    setPlayerChoice(null);
    setBotChoice(null);
    setRoundResult(null);
    setSelectedProblemId(null);
    setShowBotThinking(false);
    setRoundTimerPaused(false);
    setBotEmote('');
  };

  // Final score check when last round ends
  useEffect(() => {
    if (phase === 'result' && round + 1 >= TOTAL_ROUNDS) {
      // auto-advance after delay
      const timer = setTimeout(() => {
        const finalPlayerScore = roundResult === 'player' ? playerScore : playerScore;
        const finalBotScore = roundResult === 'bot' ? botScore : botScore;
        sessionStorage.setItem('biyoatlas_duel_result', JSON.stringify({
          playerScore: finalPlayerScore,
          botScore: finalBotScore,
          won: finalPlayerScore > finalBotScore,
          bot: botData,
          rounds: TOTAL_ROUNDS
        }));
        setCurrentScreen('duelresult');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, round]);

  if (!currentCreature) return null;

  const correctId = currentCreature.ecologicalProblemMatch;

  return (
    <motion.div
      className="relative w-full h-full bg-deep overflow-hidden flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(/images/duel_arena.png)' }}
      />

      {/* Scoreboard */}
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {/* Player */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-card border-2 border-green-primary flex items-center justify-center text-lg">
              {player.avatar}
            </div>
            <div>
              <p className="font-heading font-bold text-xs text-text-primary">{player.name}</p>
              <p className="font-display text-xl text-green-primary">{playerScore}</p>
            </div>
          </div>

          {/* Round indicator */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i < round ? 'bg-gold' : i === round ? 'bg-green-primary animate-pulse' : 'bg-surface'}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-text-muted font-body">
              Tur {round + 1}/{TOTAL_ROUNDS}
            </span>
          </div>

          {/* Bot */}
          <div className="flex items-center gap-2">
            <div>
              <p className="font-heading font-bold text-xs text-text-primary text-right">{botData.name}</p>
              <p className="font-display text-xl text-right" style={{ color: diffConfig?.color || '#F5A623' }}>{botScore}</p>
            </div>
            <div
              className="w-10 h-10 rounded-full bg-card border-2 flex items-center justify-center text-lg"
              style={{ borderColor: diffConfig?.color || '#F5A623' }}
            >
              {botData.avatar}
            </div>
          </div>
        </div>

        {/* Timer */}
        {phase === 'play' && (
          <div className="flex justify-center mt-2">
            <RoundTimer duration={ROUND_TIME} onExpire={handleTimeExpire} paused={roundTimerPaused || playerChoice !== null} />
          </div>
        )}
      </div>

      {/* Bot emote */}
      <AnimatePresence>
        {botEmote && (
          <motion.div
            className="absolute top-20 right-4 z-30 glass rounded-xl px-3 py-2 max-w-[200px]"
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <p className="text-xs text-text-secondary font-body italic">
              {botData.avatar} "{botEmote}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot thinking indicator */}
      {showBotThinking && (
        <motion.div
          className="absolute top-20 right-4 z-20 glass rounded-xl px-3 py-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-xs text-text-muted font-body">🤔 Düşünüyor...</p>
        </motion.div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 relative z-10">
        {/* Reveal phase */}
        <AnimatePresence mode="wait">
          {phase === 'reveal' && (
            <motion.div
              key={`reveal-${round}`}
              className="flex flex-col items-center gap-4"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-7xl">{currentCreature.silhouette}</span>
              <h3 className="font-heading font-bold text-xl text-text-primary text-center">
                {currentCreature.name}
              </h3>
              <div className="bg-card rounded-xl p-4 border border-border-subtle max-w-sm">
                <p className="text-xs text-text-secondary font-body leading-relaxed text-center">
                  {currentCreature.superpower.split('.')[0]}.
                </p>
              </div>
            </motion.div>
          )}

          {/* Play phase */}
          {(phase === 'play' || phase === 'result') && (
            <motion.div
              key={`play-${round}`}
              className="w-full max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Creature mini card */}
              <div className="flex items-center gap-3 mb-4 bg-card rounded-xl p-3 border border-border-subtle">
                <span className="text-3xl">{currentCreature.silhouette}</span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-text-primary">{currentCreature.name}</h4>
                  <p className="text-[10px] text-text-secondary font-body">
                    {currentCreature.superpower.split('.')[0]}.
                  </p>
                </div>
              </div>

              <h3 className="font-heading font-semibold text-xs text-text-secondary uppercase tracking-wider mb-3 text-center">
                Bu strateji hangi soruna çözüm olabilir?
              </h3>

              {/* Problem cards */}
              <div className="grid grid-cols-2 gap-3">
                {problemCards.map((problem) => {
                  const isCorrectAnswer = problem.id === correctId;
                  const isPlayerPick = selectedProblemId === problem.id;
                  const showResult = phase === 'result';

                  let borderClass = 'border-border-subtle bg-card';
                  if (showResult && isCorrectAnswer) {
                    borderClass = 'border-green-primary bg-green-primary/10';
                  } else if (showResult && isPlayerPick && !isCorrectAnswer) {
                    borderClass = 'border-danger bg-danger/10';
                  } else if (isPlayerPick && !showResult) {
                    borderClass = 'border-gold bg-gold/5';
                  }

                  return (
                    <motion.button
                      key={problem.id}
                      onClick={() => handlePlayerChoice(problem.id)}
                      disabled={playerChoice !== null}
                      className={`rounded-xl border-2 p-3 text-left transition-all touch-target ${borderClass} ${playerChoice !== null ? 'cursor-default' : 'cursor-pointer hover:border-text-muted active:scale-95'}`}
                      whileTap={playerChoice === null ? { scale: 0.95 } : {}}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{problem.icon}</span>
                        <h4 className="font-heading font-semibold text-xs" style={{ color: problem.color }}>
                          {problem.label}
                        </h4>
                      </div>
                      <p className="text-[10px] text-text-secondary font-body leading-relaxed">
                        {problem.currentScenario || problem.description}
                      </p>
                      {showResult && isCorrectAnswer && (
                        <motion.span
                          className="block mt-1 text-green-primary text-[10px] font-heading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          ✓ Doğru cevap
                        </motion.span>
                      )}
                      {showResult && isPlayerPick && !isCorrectAnswer && (
                        <motion.span
                          className="block mt-1 text-danger text-[10px] font-heading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          ✗ Yanlış
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Round result overlay */}
      <AnimatePresence>
        {phase === 'result' && roundResult && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`glass rounded-2xl px-8 py-5 text-center pointer-events-auto ${roundResult === 'player' ? 'border border-green-primary/30' : roundResult === 'bot' ? 'border border-danger/30' : 'border border-gold/30'}`}
              initial={{ scale: 0, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <p className={`font-display text-3xl mb-2 ${roundResult === 'player' ? 'text-green-primary' : roundResult === 'bot' ? 'text-danger' : 'text-gold'}`}>
                {roundResult === 'player' ? '🎯 Puan Senin!' :
                 roundResult === 'bot' ? '😤 Rakip Kazandı!' :
                 '🤝 Berabere!'}
              </p>
              {roundResult === 'player' && (
                <p className="text-gold text-sm font-display mb-1">+5 🪙</p>
              )}
              <p className="text-text-secondary text-sm font-body mb-4">
                {playerScore} — {botScore}
              </p>
              {round + 1 < TOTAL_ROUNDS ? (
                <button
                  onClick={nextRound}
                  className="px-6 py-2 bg-gradient-to-r from-green-primary to-green-deep rounded-xl text-deep font-heading font-bold text-sm touch-target"
                >
                  SONRAKİ TUR →
                </button>
              ) : (
                <p className="text-gold text-sm font-heading animate-pulse">Sonuçlar yükleniyor...</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
