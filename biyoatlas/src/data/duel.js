// Rank sistemi — Hearthstone tarzı yıldız bazlı ilerleme

export const ranks = [
  {
    id: 'cirak',
    name: 'Çırak',
    icon: '🌱',
    color: '#7FA8C9',
    starsNeeded: 3,
    botDifficulty: 'easy',
    minRankPoints: 0
  },
  {
    id: 'kesifci',
    name: 'Keşifçi',
    icon: '🔍',
    color: '#00C896',
    starsNeeded: 4,
    botDifficulty: 'easy',
    minRankPoints: 3
  },
  {
    id: 'arastirmaci',
    name: 'Araştırmacı',
    icon: '🔬',
    color: '#5DADE2',
    starsNeeded: 4,
    botDifficulty: 'medium',
    minRankPoints: 7
  },
  {
    id: 'uzman',
    name: 'Uzman',
    icon: '🧬',
    color: '#9B59B6',
    starsNeeded: 5,
    botDifficulty: 'medium',
    minRankPoints: 11
  },
  {
    id: 'usta',
    name: 'Usta',
    icon: '⚗️',
    color: '#F5A623',
    starsNeeded: 5,
    botDifficulty: 'hard',
    minRankPoints: 16
  },
  {
    id: 'efsane',
    name: 'Efsane Kaşif',
    icon: '👑',
    color: '#FFD700',
    starsNeeded: Infinity, // En üst rank
    botDifficulty: 'legendary',
    minRankPoints: 21
  }
];

export const botProfiles = [
  { name: 'Atlas Botu', avatar: '🤖', personality: 'neutral' },
  { name: 'Dr. Darwin', avatar: '🧑‍🔬', personality: 'wise' },
  { name: 'Doğa Ana', avatar: '🌿', personality: 'gentle' },
  { name: 'Prof. Biyom', avatar: '🎓', personality: 'smart' },
  { name: 'Kaşif Kemal', avatar: '🧭', personality: 'adventurous' },
  { name: 'Bilge Baykuş', avatar: '🦉', personality: 'mysterious' },
];

// Bot tepkileri — kişiliğe göre
export const botEmotes = {
  thinking: [
    "Hmm, düşünüyorum...",
    "İlginç bir soru...",
    "Bir dakika...",
    "Bakalım...",
  ],
  correct: [
    "Bunu biliyordum!",
    "Kolaydı!",
    "Doğanın gücü!",
    "Analoji tamamlandı!",
  ],
  wrong: [
    "Yanılmışım...",
    "Bu zormuş!",
    "Hmm, öyle değilmiş.",
    "Bir daha düşünmeliyim.",
  ],
  playerCorrect: [
    "İyi hamle!",
    "Hızlıydın!",
    "Etkileyici!",
    "Beni geçtin!",
  ],
  playerWrong: [
    "Tekrar dene!",
    "Yaklaştın!",
    "Bu kolay değil.",
    "Düşünmeye devam!",
  ],
  victory: [
    "Bu sefer ben kazandım!",
    "Daha çalışmalısın!",
    "İyi mücadeleydi!",
  ],
  defeat: [
    "Tebrikler, sen kazandın!",
    "Harika oynuyorsun!",
    "Senden öğrenecek çok şey var!",
  ]
};

// Bot AI — zorluk seviyesine göre karar süresi ve doğruluk
export const botDifficulty = {
  easy: {
    thinkTime: [5000, 8000],   // ms — düşünme süresi aralığı
    correctRate: 0.4,           // %40 doğru bilir
    label: 'Çırak Botu',
    color: '#00C896'
  },
  medium: {
    thinkTime: [3000, 5000],
    correctRate: 0.6,
    label: 'Kaşif Botu',
    color: '#5DADE2'
  },
  hard: {
    thinkTime: [2000, 3500],
    correctRate: 0.8,
    label: 'Usta Botu',
    color: '#F5A623'
  },
  legendary: {
    thinkTime: [1500, 2500],
    correctRate: 0.92,
    label: 'Efsane Botu',
    color: '#FFD700'
  }
};

// Ganimet kutusu ödülleri
export const lootRewards = [
  { id: 'bonus_50', type: 'points', value: 50, label: '+50 Bonus Puan', icon: '⭐', rarity: 'common', chance: 0.35 },
  { id: 'bonus_100', type: 'points', value: 100, label: '+100 Bonus Puan', icon: '💫', rarity: 'common', chance: 0.25 },
  { id: 'bonus_200', type: 'points', value: 200, label: '+200 Bonus Puan', icon: '🌟', rarity: 'rare', chance: 0.15 },
  { id: 'shield', type: 'shield', value: 1, label: 'Seri Kalkanı', icon: '🛡️', rarity: 'rare', chance: 0.10 },
  { id: 'double_star', type: 'doubleStar', value: 1, label: 'Çift Yıldız', icon: '✨', rarity: 'rare', chance: 0.08 },
  { id: 'bonus_500', type: 'points', value: 500, label: '+500 Mega Puan', icon: '💎', rarity: 'epic', chance: 0.05 },
  { id: 'title_card', type: 'title', value: 'Düello Kralı', label: 'Unvan: Düello Kralı', icon: '👑', rarity: 'legendary', chance: 0.02 },
];

export function rollLoot() {
  const roll = Math.random();
  let cumulative = 0;
  for (const reward of lootRewards) {
    cumulative += reward.chance;
    if (roll <= cumulative) {
      return reward;
    }
  }
  return lootRewards[0]; // fallback
}

export function getRandomBot() {
  return botProfiles[Math.floor(Math.random() * botProfiles.length)];
}

export function getRandomEmote(category) {
  const emotes = botEmotes[category] || botEmotes.thinking;
  return emotes[Math.floor(Math.random() * emotes.length)];
}

export function getRankByPoints(points) {
  let currentRank = ranks[0];
  for (const rank of ranks) {
    if (points >= rank.minRankPoints) {
      currentRank = rank;
    }
  }
  return currentRank;
}

export function getStarsInCurrentRank(points) {
  const rank = getRankByPoints(points);
  const rankIndex = ranks.indexOf(rank);
  const starsInRank = points - rank.minRankPoints;
  return {
    rank,
    stars: starsInRank,
    starsNeeded: rank.starsNeeded,
    rankIndex,
    isMaxRank: rankIndex === ranks.length - 1
  };
}
