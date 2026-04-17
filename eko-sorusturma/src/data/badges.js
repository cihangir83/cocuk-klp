// Rozet sistemi
export const badges = [
  {
    id: "first_case",
    name: "İlk Vaka",
    icon: "🏅",
    description: "İlk vakayı başarıyla çözdün",
    condition: (state) => state.solvedCases.length >= 1
  },
  {
    id: "no_wrong",
    name: "Keskin Savcı",
    icon: "🎯",
    description: "Tek bir yanlış bağlantı yapmadan vakayı çözdün",
    condition: (state) => state.wrongConnections === 0
  },
  {
    id: "speed_solver",
    name: "Hızlı Adalet",
    icon: "⚡",
    description: "Vakayı 10 dakikadan kısa sürede çözdün",
    condition: (state) => {
      if (!state.startTime) return false;
      const elapsed = (Date.now() - state.startTime) / 1000 / 60;
      return elapsed < 10;
    }
  },
  {
    id: "herring_found",
    name: "Tuzağa Düşmedi",
    icon: "🕵️",
    description: "Yanıltıcı kanıtı bağlantı kurmadan tespit ettin",
    condition: (state) => state.herringDetected === true
  },
  {
    id: "all_evidence",
    name: "Titiz Savcı",
    icon: "🔍",
    description: "Tüm kanıtları detaylıca inceldin",
    condition: (state) => state.allEvidenceViewed === true
  },
  {
    id: "all_cases",
    name: "Baş Savcı",
    icon: "👨‍⚖️",
    description: "Tüm dört vakayı başarıyla çözdün",
    condition: (state) => state.solvedCases.length >= 4
  }
];
