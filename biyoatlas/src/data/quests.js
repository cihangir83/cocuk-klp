export const questPool = [
  {
    id: "discover_ocean",
    text: "Okyanus canlısı keşfet",
    type: "ecosystem",
    target: "deep_ocean",
    goal: 1,
    reward: 50
  },
  {
    id: "discover_amazon",
    text: "Amazon'da bir canlı keşfet",
    type: "ecosystem",
    target: "amazon",
    goal: 1,
    reward: 50
  },
  {
    id: "discover_arctic",
    text: "Arktik'te bir canlı keşfet",
    type: "ecosystem",
    target: "arctic",
    goal: 1,
    reward: 50
  },
  {
    id: "analogy_plastic",
    text: "Plastik kirliliğiyle analoji kur",
    type: "problem",
    target: "plastik_kirliligi",
    goal: 1,
    reward: 75
  },
  {
    id: "analogy_water",
    text: "Su kıtlığıyla analoji kur",
    type: "problem",
    target: "su_kitligi",
    goal: 1,
    reward: 75
  },
  {
    id: "analogy_energy",
    text: "Enerji verimliliğiyle analoji kur",
    type: "problem",
    target: "enerji_verimliligi",
    goal: 1,
    reward: 75
  },
  {
    id: "three_continents",
    text: "3 farklı ekosistemden canlı keşfet",
    type: "multi_ecosystem",
    target: null,
    goal: 3,
    reward: 100
  },
  {
    id: "two_analogies",
    text: "2 analoji kartı oluştur",
    type: "analogy_count",
    target: null,
    goal: 2,
    reward: 100
  },
  {
    id: "find_rare",
    text: "Nadir bir canlı keşfet",
    type: "rarity",
    target: "rare",
    goal: 1,
    reward: 100
  },
  {
    id: "streak_3_quest",
    text: "3'lü streak yap",
    type: "streak",
    target: null,
    goal: 3,
    reward: 100
  },
  {
    id: "discover_sahara",
    text: "Sahra Çölü'nde bir canlı keşfet",
    type: "ecosystem",
    target: "sahara",
    goal: 1,
    reward: 50
  },
  {
    id: "discover_australia",
    text: "Avustralya'da bir canlı keşfet",
    type: "ecosystem",
    target: "australia",
    goal: 1,
    reward: 50
  },
  {
    id: "analogy_erosion",
    text: "Toprak erozyonuyla analoji kur",
    type: "problem",
    target: "toprak_erozyonu",
    goal: 1,
    reward: 75
  },
  {
    id: "analogy_climate",
    text: "İklim değişikliğiyle analoji kur",
    type: "problem",
    target: "iklim_degisikligi",
    goal: 1,
    reward: 75
  },
  {
    id: "five_cards",
    text: "5 analoji kartı topla",
    type: "analogy_count",
    target: null,
    goal: 5,
    reward: 150
  }
];

export function generateDailyQuests(existingCards = [], seed = null) {
  const today = seed || new Date().toISOString().split('T')[0];
  // Simple seeded random based on date string
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    const char = today.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  const shuffled = [...questPool].sort((a, b) => {
    const aHash = ((hash * 31 + a.id.charCodeAt(0)) & 0x7fffffff) % 1000;
    const bHash = ((hash * 31 + b.id.charCodeAt(0)) & 0x7fffffff) % 1000;
    return aHash - bHash;
  });

  return shuffled.slice(0, 3).map(q => ({
    ...q,
    progress: 0,
    completed: false
  }));
}
