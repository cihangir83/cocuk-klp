import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ecosystems } from '../data/ecosystems';
import { badges } from '../data/badges';
import { generateDailyQuests } from '../data/quests';

const GameContext = createContext(null);

const STORAGE_KEY = 'biyoatlas_state';
const STUDENTS_KEY = 'biyoatlas_students';

const defaultPlayerState = {
  name: '',
  avatar: '',
  totalScore: 0,
  gold: 0,
  analogyPower: 100,
  streak: 0,
  maxStreak: 0,
  analogyCards: [],
  unlockedEcosystems: ['amazon'],
  discoveredCreatures: [],
  badges: [],
  dailyQuests: [],
  sessionHistory: [],
  lastSeen: null,
  // Düello state
  duel: {
    rankPoints: 0,
    totalWins: 0,
    totalLosses: 0,
    winStreak: 0,
    maxWinStreak: 0,
    shields: 0,
    loot: [],
    firstWinToday: null, // ISO date string
    duelsToday: 0,
    lastDuelDate: null,
  },
  currentSession: {
    creaturesDiscovered: 0,
    analogiesMade: 0,
    score: 0,
    badgesEarned: [],
    startTime: null
  }
};

export function GameProvider({ children }) {
  const [player, setPlayer] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultPlayerState, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load save state:', e);
    }
    return { ...defaultPlayerState };
  });

  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedEcosystem, setSelectedEcosystem] = useState(null);
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);

  // Save to localStorage whenever player state changes
  useEffect(() => {
    if (player.name) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
      // Also save to students list
      saveToStudentsList(player);
    }
  }, [player]);

  const saveToStudentsList = useCallback((playerData) => {
    try {
      const students = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '{}');
      students[playerData.name] = {
        name: playerData.name,
        avatar: playerData.avatar,
        totalScore: playerData.totalScore,
        analogyCards: playerData.analogyCards.length,
        badges: playerData.badges.length,
        unlockedEcosystems: playerData.unlockedEcosystems.length,
        lastSeen: new Date().toISOString(),
        sessionHistory: playerData.sessionHistory
      };
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    } catch (e) {
      console.warn('Failed to save student data:', e);
    }
  }, []);

  const startNewSession = useCallback((name, avatar) => {
    const quests = generateDailyQuests();
    setPlayer(prev => ({
      ...prev,
      name,
      avatar,
      dailyQuests: quests,
      lastSeen: new Date().toISOString(),
      currentSession: {
        creaturesDiscovered: 0,
        analogiesMade: 0,
        score: 0,
        badgesEarned: [],
        startTime: new Date().toISOString()
      }
    }));
  }, []);

  const addScore = useCallback((points) => {
    setPlayer(prev => ({
      ...prev,
      totalScore: prev.totalScore + points,
      currentSession: {
        ...prev.currentSession,
        score: prev.currentSession.score + points
      }
    }));
  }, []);

  const addGold = useCallback((amount) => {
    setPlayer(prev => ({
      ...prev,
      gold: (prev.gold || 0) + amount
    }));
  }, []);

  const discoverCreature = useCallback((creatureId) => {
    setPlayer(prev => {
      if (prev.discoveredCreatures.includes(creatureId)) return prev;
      const newDiscovered = [...prev.discoveredCreatures, creatureId];
      const newBadges = [...prev.badges];
      const newSessionBadges = [...prev.currentSession.badgesEarned];

      // Check first discovery badge
      if (newDiscovered.length === 1 && !newBadges.includes('first_discovery')) {
        newBadges.push('first_discovery');
        newSessionBadges.push('first_discovery');
      }

      // Check rarity badges
      const creature = ecosystems
        .flatMap(e => e.creatures)
        .find(c => c.id === creatureId);

      if (creature?.rarity === 'rare' && !newBadges.includes('rare_found')) {
        newBadges.push('rare_found');
        newSessionBadges.push('rare_found');
      }
      if (creature?.rarity === 'ultra-rare' && !newBadges.includes('ultra_found')) {
        newBadges.push('ultra_found');
        newSessionBadges.push('ultra_found');
      }

      return {
        ...prev,
        discoveredCreatures: newDiscovered,
        badges: newBadges,
        currentSession: {
          ...prev.currentSession,
          creaturesDiscovered: prev.currentSession.creaturesDiscovered + 1,
          badgesEarned: newSessionBadges
        }
      };
    });
  }, []);

  const addAnalogyCard = useCallback((card) => {
    setPlayer(prev => {
      const newCards = [...prev.analogyCards, card];
      const newStreak = prev.streak + 1;
      const newMaxStreak = Math.max(prev.maxStreak, newStreak);
      const newBadges = [...prev.badges];
      const newSessionBadges = [...prev.currentSession.badgesEarned];

      // Streak badges
      if (newStreak >= 3 && !newBadges.includes('streak_3')) {
        newBadges.push('streak_3');
        newSessionBadges.push('streak_3');
      }
      if (newStreak >= 5 && !newBadges.includes('streak_5')) {
        newBadges.push('streak_5');
        newSessionBadges.push('streak_5');
      }

      // Collection badges
      if (newCards.length >= 12 && !newBadges.includes('atlas_half')) {
        newBadges.push('atlas_half');
        newSessionBadges.push('atlas_half');
      }
      if (newCards.length >= 24 && !newBadges.includes('atlas_full')) {
        newBadges.push('atlas_full');
        newSessionBadges.push('atlas_full');
      }

      // Unlock next ecosystem
      const newUnlocked = [...prev.unlockedEcosystems];
      const ecosystemOrder = ecosystems.map(e => e.id);
      const cardsPerEcosystem = {};
      newCards.forEach(c => {
        cardsPerEcosystem[c.ecosystemId] = (cardsPerEcosystem[c.ecosystemId] || 0) + 1;
      });

      // Unlock next ecosystem after completing 2 analogies in current
      ecosystemOrder.forEach((ecoId, index) => {
        if (cardsPerEcosystem[ecoId] >= 2 && index + 1 < ecosystemOrder.length) {
          const nextEco = ecosystemOrder[index + 1];
          if (!newUnlocked.includes(nextEco)) {
            newUnlocked.push(nextEco);
          }
        }
      });

      return {
        ...prev,
        analogyCards: newCards,
        streak: newStreak,
        maxStreak: newMaxStreak,
        badges: newBadges,
        unlockedEcosystems: newUnlocked,
        currentSession: {
          ...prev.currentSession,
          analogiesMade: prev.currentSession.analogiesMade + 1,
          badgesEarned: newSessionBadges
        }
      };
    });
  }, []);

  const wrongAnalogy = useCallback(() => {
    setPlayer(prev => ({
      ...prev,
      streak: 0,
      analogyPower: Math.max(0, prev.analogyPower - 15)
    }));
  }, []);

  const useHint = useCallback(() => {
    setPlayer(prev => ({
      ...prev,
      totalScore: Math.max(0, prev.totalScore - 10),
      currentSession: {
        ...prev.currentSession,
        score: Math.max(0, prev.currentSession.score - 10)
      }
    }));
  }, []);

  const updateQuestProgress = useCallback((questType, target) => {
    setPlayer(prev => {
      const newQuests = prev.dailyQuests.map(q => {
        if (q.completed) return q;
        let matches = false;

        switch (q.type) {
          case 'ecosystem':
            matches = questType === 'discover' && q.target === target;
            break;
          case 'problem':
            matches = questType === 'analogy' && q.target === target;
            break;
          case 'multi_ecosystem':
            matches = questType === 'discover';
            break;
          case 'analogy_count':
            matches = questType === 'analogy';
            break;
          case 'rarity':
            matches = questType === 'rarity' && target === q.target;
            break;
          case 'streak':
            matches = questType === 'streak';
            break;
          default:
            break;
        }

        if (matches) {
          const newProgress = q.progress + 1;
          return {
            ...q,
            progress: newProgress,
            completed: newProgress >= q.goal
          };
        }
        return q;
      });

      // Check quest master badge
      const newBadges = [...prev.badges];
      const newSessionBadges = [...prev.currentSession.badgesEarned];
      if (newQuests.every(q => q.completed) && !newBadges.includes('quest_master')) {
        newBadges.push('quest_master');
        newSessionBadges.push('quest_master');
      }

      return {
        ...prev,
        dailyQuests: newQuests,
        badges: newBadges,
        currentSession: {
          ...prev.currentSession,
          badgesEarned: newSessionBadges
        }
      };
    });
  }, []);

  const endSession = useCallback(() => {
    setPlayer(prev => ({
      ...prev,
      sessionHistory: [
        ...prev.sessionHistory,
        {
          ...prev.currentSession,
          endTime: new Date().toISOString()
        }
      ]
    }));
  }, []);

  const resetPlayer = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPlayer({ ...defaultPlayerState });
    setCurrentScreen('splash');
  }, []);

  // === DUEL FUNCTIONS ===
  const winDuel = useCallback((bonusPoints = 0) => {
    setPlayer(prev => {
      const today = new Date().toISOString().split('T')[0];
      const isFirstWin = prev.duel.firstWinToday !== today;
      const baseStars = 1;
      const streakBonus = (prev.duel.winStreak + 1) >= 3 ? 1 : 0; // Hearthstone: 3+ win streak = ekstra yıldız
      const firstWinBonus = isFirstWin ? 1 : 0;
      const totalStars = baseStars + streakBonus + firstWinBonus;
      const newWinStreak = prev.duel.winStreak + 1;

      return {
        ...prev,
        totalScore: prev.totalScore + bonusPoints + (isFirstWin ? 100 : 0),
        duel: {
          ...prev.duel,
          rankPoints: prev.duel.rankPoints + totalStars,
          totalWins: prev.duel.totalWins + 1,
          winStreak: newWinStreak,
          maxWinStreak: Math.max(prev.duel.maxWinStreak, newWinStreak),
          firstWinToday: isFirstWin ? today : prev.duel.firstWinToday,
          duelsToday: prev.duel.lastDuelDate === today ? prev.duel.duelsToday + 1 : 1,
          lastDuelDate: today,
        }
      };
    });
  }, []);

  const loseDuel = useCallback(() => {
    setPlayer(prev => {
      const today = new Date().toISOString().split('T')[0];
      const hasShield = prev.duel.shields > 0;
      const newRankPoints = hasShield
        ? prev.duel.rankPoints
        : Math.max(0, prev.duel.rankPoints - 1);

      return {
        ...prev,
        duel: {
          ...prev.duel,
          rankPoints: newRankPoints,
          totalLosses: prev.duel.totalLosses + 1,
          winStreak: 0,
          shields: hasShield ? prev.duel.shields - 1 : prev.duel.shields,
          duelsToday: prev.duel.lastDuelDate === today ? prev.duel.duelsToday + 1 : 1,
          lastDuelDate: today,
        }
      };
    });
  }, []);

  const addLootReward = useCallback((reward) => {
    setPlayer(prev => {
      const newDuel = { ...prev.duel };
      let scoreBonus = 0;

      switch (reward.type) {
        case 'points':
          scoreBonus = reward.value;
          break;
        case 'shield':
          newDuel.shields = (newDuel.shields || 0) + reward.value;
          break;
        case 'doubleStar':
          newDuel.rankPoints = newDuel.rankPoints + 1; // Ekstra yıldız
          break;
        default:
          break;
      }

      newDuel.loot = [...(newDuel.loot || []), { ...reward, date: new Date().toISOString() }];

      return {
        ...prev,
        totalScore: prev.totalScore + scoreBonus,
        duel: newDuel
      };
    });
  }, []);

  const value = {
    player,
    setPlayer,
    currentScreen,
    setCurrentScreen,
    selectedEcosystem,
    setSelectedEcosystem,
    selectedCreature,
    setSelectedCreature,
    soundEnabled,
    setSoundEnabled,
    musicEnabled,
    setMusicEnabled,
    startNewSession,
    addScore,
    addGold,
    discoverCreature,
    addAnalogyCard,
    wrongAnalogy,
    useHint,
    updateQuestProgress,
    endSession,
    resetPlayer,
    winDuel,
    loseDuel,
    addLootReward
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export default GameContext;
