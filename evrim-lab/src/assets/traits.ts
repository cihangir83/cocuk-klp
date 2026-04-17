export interface Trait {
  id: string;
  name: string;
  category: 'movement' | 'protection' | 'feeding' | 'resilience';
  description: string;
  icon: string;
  color: string;
  advantages: {
    plastik_corbasi: number;
    asit_yagmuru: number;
    kuraklik: number;
    mikroplastik: number;
  };
  conflicts: string[];
  synergies: string[];
  bodyPart: string;
  bioExample: {
    name: string;
    application: string;
    image: string;
  };
}

export const traits: Trait[] = [
  // HAREKET ÖZELLİKLERİ
  {
    id: 'shark_fin',
    name: 'Köpekbalığı Yüzgeci',
    category: 'movement',
    description: 'Hidrodinamik form — su direncini minimize eder',
    icon: '🦈',
    color: '#00FFD1',
    advantages: { plastik_corbasi: 0.7, asit_yagmuru: 0.2, kuraklik: 0.1, mikroplastik: 0.4 },
    conflicts: ['turtle_shell'],
    synergies: ['squid_propulsion', 'whale_filter'],
    bodyPart: 'lateral',
    bioExample: {
      name: 'Köpekbalığı Derisi',
      application: 'Olimpik yüzücü mayoları',
      image: 'shark_skin'
    }
  },
  {
    id: 'squid_propulsion',
    name: 'Kalamar İticisi',
    category: 'movement',
    description: 'Jet hareketi — ani hızlanma',
    icon: '🦑',
    color: '#00FFD1',
    advantages: { plastik_corbasi: 0.5, asit_yagmuru: 0.3, kuraklik: 0.2, mikroplastik: 0.3 },
    conflicts: [],
    synergies: ['shark_fin', 'octopus_ink'],
    bodyPart: 'posterior',
    bioExample: {
      name: 'Kalamar Jet İticisi',
      application: 'Roket itiş sistemleri',
      image: 'squid_jet'
    }
  },
  {
    id: 'snake_movement',
    name: 'Yılan Hareketi',
    category: 'movement',
    description: 'S-eğrisi — dar alanlarda navigasyon',
    icon: '🐍',
    color: '#00FFD1',
    advantages: { plastik_corbasi: 0.4, asit_yagmuru: 0.4, kuraklik: 0.5, mikroplastik: 0.6 },
    conflicts: [],
    synergies: ['porcupine_quills'],
    bodyPart: 'ventral',
    bioExample: {
      name: 'Yılan İskeleti',
      application: 'Arama kurtarma robotları',
      image: 'snake_skeleton'
    }
  },
  {
    id: 'bird_wing',
    name: 'Kuş Kanadı',
    category: 'movement',
    description: 'Uçuş — hava ortamında üstün hareket',
    icon: '🦅',
    color: '#00FFD1',
    advantages: { plastik_corbasi: 0.3, asit_yagmuru: 0.5, kuraklik: 0.6, mikroplastik: 0.2 },
    conflicts: ['turtle_shell'],
    synergies: ['polar_bear_fur'],
    bodyPart: 'dorsal',
    bioExample: {
      name: 'Kuş Kemik Yapısı',
      application: 'Hafif drone tasarımı',
      image: 'bird_bones'
    }
  },

  // KORUMA ÖZELLİKLERİ
  {
    id: 'turtle_shell',
    name: 'Kaplumbağa Kabuğu',
    category: 'protection',
    description: 'Mekanik koruma — yüksek darbe direnci',
    icon: '🐢',
    color: '#FF6B35',
    advantages: { plastik_corbasi: 0.6, asit_yagmuru: 0.8, kuraklik: 0.3, mikroplastik: 0.5 },
    conflicts: ['bird_wing', 'squid_propulsion'],
    synergies: ['tardigrade_drying'],
    bodyPart: 'exterior',
    bioExample: {
      name: 'Kaplumbağa Kabuğu',
      application: 'Zırh teknolojisi',
      image: 'turtle_shell'
    }
  },
  {
    id: 'octopus_ink',
    name: 'Ahtapot Mürekkebi',
    category: 'protection',
    description: 'Kaçış mekanizması — görünmezlik',
    icon: '🐙',
    color: '#FF6B35',
    advantages: { plastik_corbasi: 0.3, asit_yagmuru: 0.4, kuraklik: 0.2, mikroplastik: 0.3 },
    conflicts: [],
    synergies: ['squid_propulsion'],
    bodyPart: 'posterior',
    bioExample: {
      name: 'Ahtapot Mürekkep',
      application: 'Kamufleaj teknolojisi',
      image: 'octopus_ink'
    }
  },
  {
    id: 'porcupine_quills',
    name: 'Kirpi Dikenleri',
    category: 'protection',
    description: 'Caydırıcı — aktif savunma',
    icon: '🦔',
    color: '#FF6B35',
    advantages: { plastik_corbasi: 0.5, asit_yagmuru: 0.6, kuraklik: 0.4, mikroplastik: 0.4 },
    conflicts: [],
    synergies: ['snake_movement'],
    bodyPart: 'exterior',
    bioExample: {
      name: 'Kirpi Dikenleri',
      application: 'Delici yapışkan bantlar',
      image: 'porcupine_quills'
    }
  },
  {
    id: 'electric_eel',
    name: 'Yılan Balığı Elektriği',
    category: 'protection',
    description: 'Elektrik şoku — saldırı ve savunma',
    icon: '⚡',
    color: '#FF6B35',
    advantages: { plastik_corbasi: 0.4, asit_yagmuru: 0.3, kuraklik: 0.2, mikroplastik: 0.5 },
    conflicts: [],
    synergies: [],
    bodyPart: 'entire',
    bioExample: {
      name: 'Yılan Balığı Elektrik Organı',
      application: 'Enerji depolama bataryaları',
      image: 'electric_eel'
    }
  },

  // BESLENME ÖZELLİKLERİ
  {
    id: 'whale_filter',
    name: 'Balina Filtresi',
    category: 'feeding',
    description: 'Toplu filtrasyon — verimli besin alımı',
    icon: '🐋',
    color: '#9B59FF',
    advantages: { plastik_corbasi: 0.8, asit_yagmuru: 0.2, kuraklik: 0.1, mikroplastik: 0.9 },
    conflicts: [],
    synergies: ['shark_fin'],
    bodyPart: 'anterior',
    bioExample: {
      name: 'Balina Çene Yapısı',
      application: 'Hava filtre sistemleri',
      image: 'whale_filter'
    }
  },
  {
    id: 'mushroom_network',
    name: 'Mantar Ağı',
    category: 'feeding',
    description: 'Kimyasal emmece — toprak besinleri',
    icon: '🍄',
    color: '#9B59FF',
    advantages: { plastik_corbasi: 0.2, asit_yagmuru: 0.3, kuraklik: 0.4, mikroplastik: 0.3 },
    conflicts: [],
    synergies: [],
    bodyPart: 'root',
    bioExample: {
      name: 'Mikoiza Ağı',
      application: 'Toprak ıslah sistemleri',
      image: 'mushroom_network'
    }
  },
  {
    id: 'lotus_surface',
    name: 'Lotus Yüzeyi',
    category: 'feeding',
    description: 'Kendi kendini temizleme — yüzey tipi',
    icon: '🪷',
    color: '#9B59FF',
    advantages: { plastik_corbasi: 0.4, asit_yagmuru: 0.6, kuraklik: 0.3, mikroplastik: 0.5 },
    conflicts: [],
    synergies: ['whale_filter', 'camel_hump'],
    bodyPart: 'exterior',
    bioExample: {
      name: 'Lotus Yaprağı',
      application: 'Kendi kendini temizleyen yüzeyler',
      image: 'lotus_surface'
    }
  },
  {
    id: 'venus_trap',
    name: 'Venüs Sinekkapanı',
    category: 'feeding',
    description: 'Av yakalama — aktif besin alımı',
    icon: '🪴',
    color: '#9B59FF',
    advantages: { plastik_corbasi: 0.3, asit_yagmuru: 0.4, kuraklik: 0.5, mikroplastik: 0.4 },
    conflicts: [],
    synergies: [],
    bodyPart: 'anterior',
    bioExample: {
      name: 'Sinekkapanı Tuzak Mekanizması',
      application: 'Akıllı tuzak sistemleri',
      image: 'venus_trap'
    }
  },

  // DAYANIKLILIK ÖZELLİKLERİ
  {
    id: 'polar_bear_fur',
    name: 'Kutup Ayısı Yalıtımı',
    category: 'resilience',
    description: 'Isı koruma — ekstrem soğuğa dayanım',
    icon: '🐻‍❄️',
    color: '#FFE135',
    advantages: { plastik_corbasi: 0.2, asit_yagmuru: 0.3, kuraklik: 0.1, mikroplastik: 0.2 },
    conflicts: [],
    synergies: ['bird_wing'],
    bodyPart: 'exterior',
    bioExample: {
      name: 'Kutup Ayısı Kürkü',
      application: 'Termal yalıtım giysileri',
      image: 'polar_bear_fur'
    }
  },
  {
    id: 'tardigrade_drying',
    name: 'Tardigrad Kuruması',
    category: 'resilience',
    description: 'Ekstrem dayanım — vakum ve radyasyona direnç',
    icon: '🐻',
    color: '#FFE135',
    advantages: { plastik_corbasi: 0.3, asit_yagmuru: 0.7, kuraklik: 0.9, mikroplastik: 0.4 },
    conflicts: [],
    synergies: ['turtle_shell'],
    bodyPart: 'cellular',
    bioExample: {
      name: 'Tardigrad Biyolojisi',
      application: 'Uzay araştırma teknolojisi',
      image: 'tardigrade'
    }
  },
  {
    id: 'antifreeze_protein',
    name: 'Buz Balığı Antifrizi',
    category: 'resilience',
    description: 'Donmama — düşük sıcaklığa adaptasyon',
    icon: '🐟',
    color: '#FFE135',
    advantages: { plastik_corbasi: 0.2, asit_yagmuru: 0.4, kuraklik: 0.2, mikroplastik: 0.3 },
    conflicts: [],
    synergies: ['polar_bear_fur'],
    bodyPart: 'cellular',
    bioExample: {
      name: 'Arktik Balık Antifriz Proteini',
      application: 'Krioprotektanlar',
      image: 'antifreeze'
    }
  },
  {
    id: 'camel_hump',
    name: 'Deve Hörgici',
    category: 'resilience',
    description: 'Su depolama — kuraklığa dayanım',
    icon: '🐪',
    color: '#FFE135',
    advantages: { plastik_corbasi: 0.1, asit_yagmuru: 0.2, kuraklik: 0.9, mikroplastik: 0.2 },
    conflicts: [],
    synergies: ['lotus_surface'],
    bodyPart: 'dorsal',
    bioExample: {
      name: 'Deve Su Depolama',
      application: 'Su tasarrufu sistemleri',
      image: 'camel_hump'
    }
  }
];

export const getTraitById = (id: string): Trait | undefined => {
  return traits.find(trait => trait.id === id);
};

export const getTraitsByCategory = (category: Trait['category']): Trait[] => {
  return traits.filter(trait => trait.category === category);
};
