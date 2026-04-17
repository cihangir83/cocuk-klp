export const characters = [
  {
    id: "scientist_female",
    name: "Dr. Ayşe",
    category: "human",
    poses: [
      { id: "talking_right", label: "Konuşuyor (Sağ)", url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayse&mouth=smile" },
      { id: "thinking",      label: "Düşünüyor", url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayse&mouth=serious" },
      { id: "pointing",      label: "İşaret Ediyor", url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayse&mouth=twinkle" },
      { id: "happy",         label: "Mutlu", url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayse&mouth=smile&eyes=happy" },
      { id: "worried",       label: "Endişeli", url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayse&mouth=sad&eyes=cry" }
    ],
    defaultSize: { w: 150, h: 150 }
  },
  {
    id: "student_boy",
    name: "Öğrenci Can",
    category: "human",
    poses: [
      { id: "talking_right", label: "Heyecanlı", url: "https://api.dicebear.com/9.x/micah/svg?seed=Can&mouth=smile" },
      { id: "thinking",      label: "Meraklı", url: "https://api.dicebear.com/9.x/micah/svg?seed=Can&mouth=pucker" },
      { id: "sad",           label: "Üzgün", url: "https://api.dicebear.com/9.x/micah/svg?seed=Can&mouth=sad" }
    ],
    defaultSize: { w: 150, h: 150 }
  },
  {
    id: "antagonist_boss",
    name: "Fabrika Sahibi",
    category: "human",
    poses: [
      { id: "angry",     label: "Kızgın", url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Patron&mouth=grimace&eyes=squint" },
      { id: "laughing",  label: "Gülüyor", url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Patron&mouth=smile&eyes=happy" },
      { id: "surprised", label: "Şok Olmuş", url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Patron&mouth=scream&eyes=surprised" }
    ],
    defaultSize: { w: 160, h: 160 }
  },
  {
    id: "animal_turtle",
    name: "Kaplumbağa",
    category: "animal",
    poses: [
      { id: "swimming", label: "Yüzüyor", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐢</text></svg>" },
      { id: "sad",      label: "Hasta/Üzgün", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤕</text></svg>" }
    ],
    defaultSize: { w: 100, h: 100 }
  },
  {
    id: "animal_whale",
    name: "Balina",
    category: "animal",
    poses: [
      { id: "swimming", label: "Yüzüyor", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐋</text></svg>" },
      { id: "surfacing",label: "Su Yüzüne Çıkıyor", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐳</text></svg>" }
    ],
    defaultSize: { w: 150, h: 150 }
  }
];
