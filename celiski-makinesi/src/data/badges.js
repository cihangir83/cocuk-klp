const badges = [
  {
    id: "first_fix",
    name: "İlk Tamir",
    description: "İlk makineyi başarıyla tamir et.",
    icon: "🔧",
    condition: (state) => state.solvedMachines.length >= 1
  },
  {
    id: "clean_fix",
    name: "Temiz Tamir",
    description: "Hiç yanlış alet kullanmadan bir makineyi tamir et.",
    icon: "✨",
    condition: (state) => state.currentStreak >= 1
  },
  {
    id: "speed_mechanic",
    name: "Hızlı Mekanik",
    description: "Bir makineyi 60 saniyeden kısa sürede tamir et.",
    icon: "⚡",
    condition: (state) => {
      const records = Object.values(state.machineRecords || {});
      return records.some(r => r < 60);
    }
  },
  {
    id: "triple_streak",
    name: "Üçlü Seri",
    description: "Üst üste 3 makineyi yanlışsız tamir et.",
    icon: "🔥",
    condition: (state) => state.streakRecord >= 3
  },
  {
    id: "tool_master",
    name: "Alet Ustası",
    description: "10 farklı TRIZ aletini keşfet.",
    icon: "🛠️",
    condition: (state) => state.availableTools.length >= 10
  },
  {
    id: "bio_collector",
    name: "Doğa Koleksiyoncusu",
    description: "12 biyolojik örneğin tamamını keşfet.",
    icon: "🌿",
    condition: (state) => state.discoveredBioExamples.length >= 12
  },
  {
    id: "workshop_done",
    name: "Baş Mucit",
    description: "Atölyedeki tüm makineleri tamir et.",
    icon: "👑",
    condition: (state) => state.solvedMachines.length >= 12
  }
];

export default badges;
