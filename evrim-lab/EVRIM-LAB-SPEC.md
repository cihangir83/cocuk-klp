# EVRİM LAB — TAM TEKNİK SPESİFİKASYON
### Anti Gravity için hazırlanmıştır | v2.0

---

## 1. OYUNUN RUHU

"Evrim Lab" bir yaratıcı evrim simülasyonu ve organizma tasarım oyunudur.
Oyuncu bir evrim mühendisidir — doğadan aldığı özellikleri birleştirerek tamamen yeni bir organizma tasarlıyor ve onu ekolojik krizlere karşı test ediyor.

Bu oyun diğer üçünden tamamen farklı hissetmeli:
- BiyoAtlas → karanlık ve gizemli
- EkoSoruşturma → noir ve gerilim
- Çelişki Makinesi → steampunk ve mekanik

**Evrim Lab: Canlı, renkli, organik, biyolüminesan, psikedelik.**
Her şey nefes alıyor. Her şey hareket ediyor. Ekrana bakınca canlılar hissediliyor.

---

## 2. TEKNİK YIĞIN

```json
{
  "framework": "React 18 + Vite + TypeScript",
  "styling": "Tailwind CSS (custom config)",
  "animations": {
    "ui": "Framer Motion",
    "lottie": "lottie-react",
    "interactive": "Rive (rive-react)",
    "particles": "tsParticles (@tsparticles/react)"
  },
  "canvas": "React Konva",
  "audio": "Howler.js",
  "dragDrop": "@dnd-kit/core + @dnd-kit/sortable",
  "state": "useState + useReducer + useContext",
  "storage": "localStorage",
  "language": "Türkçe",
  "target": "Masaüstü öncelikli, tablet uyumlu"
}
```

---

## 3. PROJE YAPISI

```
evrim-lab/
├── public/
│   ├── animations/          # Lottie JSON dosyaları
│   │   ├── cell-division.json
│   │   ├── dna-helix.json
│   │   ├── bioluminescent-glow.json
│   │   ├── plastic-ocean.json
│   │   ├── acid-rain.json
│   │   ├── drought.json
│   │   └── microplastic.json
│   ├── audio/               # Howler.js ses dosyaları
│   │   ├── ambient/
│   │   ├── effects/
│   │   └── music/
│   ├── images/              # Unsplash görselleri
│   │   ├── bio-examples/
│   │   └── textures/
│   └── rive/                # Rive animasyon dosyaları (.riv)
│
├── src/
│   ├── assets/
│   │   ├── traits.json          # Tüm özellikler
│   │   ├── environments.json    # Test ortamları
│   │   ├── badges.json          # Rozet sistemi
│   │   └── translations.json    # Çoklu dil desteği
│   │
│   ├── components/
│   │   ├── ui/                  # Temel UI bileşenleri
│   │   │   ├── GlowButton.tsx
│   │   │   ├── BioCard.tsx
│   │   │   ├── BioSlider.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── LoadingScreen.tsx
│   │   │
│   │   ├── organisms/           # Organizma sistemi
│   │   │   ├── PetriDish.tsx         # Ana petri kabı canvas
│   │   │   ├── OrganismCanvas.tsx     # Organizma çizim alanı
│   │   │   ├── TraitSlot.tsx          # Özellik yuvası
│   │   │   └── OrganismRenderer.tsx    # Canvas/SVG render
│   │   │
│   │   ├── panels/              # Yan paneller
│   │   │   ├── TraitLibrary.tsx       # Özellik kütüphanesi
│   │   │   ├── MorphologyBox.tsx       # Morfolojik kutu
│   │   │   └── BottomBar.tsx          # Alt bilgi barı
│   │   │
│   │   ├── scenes/              # Oyun sahneleri
│   │   │   ├── SplashScene.tsx        # Açılış animasyonu
│   │   │   ├── MainLab.tsx            # Ana lab ekranı
│   │   │   ├── TestScene.tsx          # Test sahnesi
│   │   │   ├── ResultScene.tsx         # Sonuç ekranı
│   │   │   └── MuseumScene.tsx         # Organizma müzesi
│   │   │
│   │   ├── effects/             # Görsel efektler
│   │   │   ├── TraitDropEffect.tsx
│   │   │   ├── SurvivalBar.tsx
│   │   │   ├── ThreatElement.tsx
│   │   │   └── BioGlowEffect.tsx
│   │   │
│   │   └── modals/               # Modal bileşenleri
│   │       ├── NameOrganism.tsx
│   │       ├── Tutorial.tsx
│   │       ├── BadgeEarned.tsx
│   │       └── TeacherPanel.tsx
│   │
│   ├── hooks/
│   │   ├── useOrganism.ts        # Organizma state yönetimi
│   │   ├── useTraits.ts          # Özellik sistemi
│   │   ├── useEnvironment.ts     # Test ortamı
│   │   ├── useScore.ts           # Skor hesaplama
│   │   ├── useAudio.ts           # Ses sistemi
│   │   ├── useParticles.ts       # Parçacık sistemi
│   │   └── useLocalStorage.ts    # Kalıcı kayıt
│   │
│   ├── context/
│   │   ├── GameContext.tsx       # Ana oyun state
│   │   ├── AudioContext.tsx      # Ses context
│   │   └── ThemeContext.tsx      # Tema ayarları
│   │
│   ├── utils/
│   │   ├── scoring.ts            # Skor hesaplama algoritmaları
│   │   ├── synergies.ts          # Sinerji hesaplama
│   │   ├── morphology.ts         # Organizma morfoloji
│   │   ├── nameGenerator.ts      # Bilimsel isim oluşturucu
│   │   └── biomechanics.ts       # Biyomekanik hesaplamalar
│   │
│   ├── types/
│   │   ├── trait.ts
│   │   ├── organism.ts
│   │   ├── environment.ts
│   │   └── game.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Tailwind + custom CSS değişkenleri
│
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. BİYOLÜMİNESAN RENK PALETİ

```css
:root {
  /* Arka Planlar */
  --bg-void: #030408;
  --bg-lab: #070D15;
  --bg-petri: #0A1525;
  --bg-card: #0D1E30;
  --bg-glass: rgba(0, 255, 209, 0.05);

  /* Biyolüminesan Renkler */
  --bio-cyan: #00FFD1;
  --bio-purple: #9B59FF;
  --bio-green: #39FF14;
  --bio-orange: #FF6B35;
  --bio-pink: #FF2D78;
  --bio-yellow: #FFE135;
  --bio-blue: #00BFFF;

  /* Glow Efektleri */
  --glow-cyan: rgba(0, 255, 209, 0.4);
  --glow-purple: rgba(155, 89, 255, 0.4);
  --glow-green: rgba(57, 255, 20, 0.4);
  --glow-orange: rgba(255, 107, 53, 0.4);
  --glow-pink: rgba(255, 45, 120, 0.4);

  /* Metin Renkleri */
  --text-bio: #00FFD1;
  --text-secondary: #7FA8C9;
  --text-muted: #2A4A6B;
  --text-danger: #FF2D78;
  --text-success: #39FF14;

  /* Özellik Kategorisi Renkleri */
  --trait-movement: #00FFD1;
  --trait-protection: #FF6B35;
  --trait-feeding: #9B59FF;
  --trait-resilience: #FFE135;

  /* Konteyner */
  --container-border: rgba(0, 255, 209, 0.2);
  --container-bg: rgba(7, 13, 21, 0.9);
}
```

---

## 5. ORGANİZMA GÖRSEL SİSTEMİ

### 5.1 Canvas Render Pipeline

```typescript
interface OrganismRenderConfig {
  baseShape: 'blob' | 'elongated' | 'flat' | 'radial';
  symmetry: 'bilateral' | 'radial' | 'asymmetric';
  size: number; // 100-500px arası
  color: string; // Ana renk
  secondaryColor: string; // Vurgu rengi
  traits: AppliedTrait[];
  animationState: 'idle' | 'breathing' | 'moving' | 'damaged' | 'dying' | 'growing';
  glowIntensity: number; // 0-1
}
```

### 5.2 Morfoloji Kuralları

| Özellik Türü | Eklenen Element | Renk Etkisi |
|--------------|-----------------|-------------|
| Hareket | Yüzgeç/bacak uzantısı | +Cyan tonu |
| Koruma | Diken/kabuk/dış katman | +Orange tonu |
| Beslenme | Ağız/filtre/uyantı | +Purple tonu |
| Dayanıklılık | Doku/kaplama/renk | +Yellow tonu |

### 5.3 Animasyon Durumları

```typescript
enum OrganismState {
  IDLE = 'idle',           // Nefes alıyor, hafif pulse
  DRAGGING = 'dragging',    // Sürükleniyor, şekil değişiyor
  ABSORBING = 'absorbing',  // Özellik emiliyor
  TESTING = 'testing',      // Test sahnesinde
  SURVIVING = 'surviving', // Hayatta kalma mücadelesi
  GROWING = 'growing',      // Büyüme animasyonu
  DISSOLVING = 'dissolving' // Çözülme animasyonu
}
```

### 5.4 Nefes Alma Animasyonu

```typescript
const breatheAnimation = {
  scale: { min: 0.97, max: 1.03 },
  duration: 2000, // ms
  easing: 'easeInOutSine',
  loop: true
};
```

---

## 6. ÖZELLİK SİSTEMİ

### 6.1 Tam Özellik Listesi (16 Adet)

```typescript
const traits = [
  // HAREKET (4 özellik)
  {
    id: 'shark_fin',
    name: 'Köpekbalığı Yüzgeci',
    category: 'movement',
    description: 'Hidrodinamik form — su direncini minimize eder',
    icon: '🦈',
    color: '#00FFD1',
    advantages: { plastik: 0.7, asit: 0.2, kuraklik: 0.1, mikroplastik: 0.4 },
    conflicts: ['tortoise_shell'],
    synergies: ['jet_propulsion', 'whale_filter'],
    bodyPart: 'lateral',
    bioExample: {
      name: 'Köpekbalığı Derisi',
      application: 'Olimpik yüzücü mayoları',
      image: 'shark_skin.jpg'
    }
  },
  {
    id: 'squid_propulsion',
    name: 'Kalamar İticisi',
    category: 'movement',
    description: 'Jet hareketi — ani hızlanma',
    icon: '🦑',
    color: '#00FFD1',
    advantages: { plastik: 0.5, asit: 0.3, kuraklik: 0.2, mikroplastik: 0.3 },
    conflicts: [],
    synergies: ['shark_fin'],
    bodyPart: 'posterior',
    bioExample: {
      name: 'Kalamar Jet İticisi',
      application: 'Roket itiş sistemleri',
      image: 'squid_jet.jpg'
    }
  },
  {
    id: 'snake_movement',
    name: 'Yılan Hareketi',
    category: 'movement',
    description: 'S-eğrisi — dar alanlarda navigasyon',
    icon: '🐍',
    color: '#00FFD1',
    advantages: { plastik: 0.4, asit: 0.4, kuraklik: 0.5, mikroplastik: 0.6 },
    conflicts: [],
    synergies: ['spine_defense'],
    bodyPart: 'ventral',
    bioExample: {
      name: 'Yılan İskeleti',
      application: 'Arama kurtarma robotları',
      image: 'snake_skeleton.jpg'
    }
  },
  {
    id: 'bird_wing',
    name: 'Kuş Kanadı',
    category: 'movement',
    description: 'Uçuş — hava ortamında üstün hareket',
    icon: '🦅',
    color: '#00FFD1',
    advantages: { plastik: 0.3, asit: 0.5, kuraklik: 0.6, mikroplastik: 0.2 },
    conflicts: ['turtle_shell'],
    synergies: ['hollow_bones'],
    bodyPart: 'dorsal',
    bioExample: {
      name: 'Kuş Kemik Yapısı',
      application: 'Hafif drone tasarımı',
      image: 'bird_bones.jpg'
    }
  },

  // KORUMA (4 özellik)
  {
    id: 'turtle_shell',
    name: 'Kaplumbağa Kabuğu',
    category: 'protection',
    description: 'Mekanik koruma — yüksek darbe direnci',
    icon: '🐢',
    color: '#FF6B35',
    advantages: { plastik: 0.6, asit: 0.8, kuraklik: 0.3, mikroplastik: 0.5 },
    conflicts: ['bird_wing', 'jet_propulsion'],
    synergies: ['tardigrade_drying'],
    bodyPart: 'exterior',
    bioExample: {
      name: 'Kaplumbağa Kabuğu',
      application: 'Zırh teknolojisi',
      image: 'turtle_shell.jpg'
    }
  },
  {
    id: 'octopus_ink',
    name: 'Ahtapot Mürekkebi',
    category: 'protection',
    description: 'Kaçış mekanizması — görünmezlik',
    icon: '🐙',
    color: '#FF6B35',
    advantages: { plastik: 0.3, asit: 0.4, kuraklik: 0.2, mikroplastik: 0.3 },
    conflicts: [],
    synergies: ['squid_propulsion'],
    bodyPart: 'posterior',
    bioExample: {
      name: 'Ahtapot Mürekkep',
      application: 'Kamufleaj teknolojisi',
      image: 'octopus_ink.jpg'
    }
  },
  {
    id: 'porcupine_quills',
    name: 'Kirpi Dikenleri',
    category: 'protection',
    description: 'Caydırıcı — aktif savunma',
    icon: '🦔',
    color: '#FF6B35',
    advantages: { plastik: 0.5, asit: 0.6, kuraklik: 0.4, mikroplastik: 0.4 },
    conflicts: [],
    synergies: ['snake_movement'],
    bodyPart: 'exterior',
    bioExample: {
      name: 'Kirpi Dikenleri',
      application: 'Delici yapışkan bantlar',
      image: 'porcupine_quills.jpg'
    }
  },
  {
    id: 'electric_eel',
    name: 'Yılan Balığı Elektriği',
    category: 'protection',
    description: 'Elektrik şoku — saldırı ve savunma',
    icon: '⚡',
    color: '#FF6B35',
    advantages: { plastik: 0.4, asit: 0.3, kuraklik: 0.2, mikroplastik: 0.5 },
    conflicts: ['fish_scales'],
    synergies: ['electric_eel'],
    bodyPart: 'entire',
    bioExample: {
      name: 'Yılan Balığı Elektrik Organı',
      application: 'Enerji depolama bataryaları',
      image: 'electric_eel.jpg'
    }
  },

  // BESLENME (4 özellik)
  {
    id: 'whale_filter',
    name: 'Balina Filtresi',
    category: 'feeding',
    description: 'Toplu filtrasyon — verimli besin alımı',
    icon: '🐋',
    color: '#9B59FF',
    advantages: { plastik: 0.8, asit: 0.2, kuraklik: 0.1, mikroplastik: 0.9 },
    conflicts: [],
    synergies: ['shark_fin', 'hollow_bones'],
    bodyPart: 'anterior',
    bioExample: {
      name: 'Balina Çene Yapısı',
      application: 'Hava filtre sistemleri',
      image: 'whale_filter.jpg'
    }
  },
  {
    id: 'mushroom_network',
    name: 'Mantar Ağı',
    category: 'feeding',
    description: 'Kimyasal emmece — toprak besinleri',
    icon: '🍄',
    color: '#9B59FF',
    advantages: { plastik: 0.2, asit: 0.3, kuraklik: 0.4, mikroplastik: 0.3 },
    conflicts: [],
    synergies: ['spore_defense', 'fungal_cell'],
    bodyPart: 'root',
    bioExample: {
      name: 'Mikoiza Ağı',
      application: 'Toprak ıslah sistemleri',
      image: 'mushroom_network.jpg'
    }
  },
  {
    id: 'lotus_surface',
    name: 'Lotus Yüzeyi',
    category: 'feeding',
    description: 'Kendi kendini temizleme — yüzey tipi',
    icon: '🪷',
    color: '#9B59FF',
    advantages: { plastik: 0.4, asit: 0.6, kuraklik: 0.3, mikroplastik: 0.5 },
    conflicts: [],
    synergies: ['whale_filter'],
    bodyPart: 'exterior',
    bioExample: {
      name: 'Lotus Yaprağı',
      application: 'Kendi kendini temizleyen yüzeyler',
      image: 'lotus_surface.jpg'
    }
  },
  {
    id: 'venus_trap',
    name: 'Venüs Sinekkapanı',
    category: 'feeding',
    description: 'Av yakalama — aktif besin alımı',
    icon: '🪴',
    color: '#9B59FF',
    advantages: { plastik: 0.3, asit: 0.4, kuraklik: 0.5, mikroplastik: 0.4 },
    conflicts: ['filter_feeding'],
    synergies: ['spine_defense'],
    bodyPart: 'anterior',
    bioExample: {
      name: 'Sinekkapanı Tuzak Mekanizması',
      application: 'Akıllı tuzak sistemleri',
      image: 'venus_trap.jpg'
    }
  },

  // DAYANIKLILIK (4 özellik)
  {
    id: 'polar_bear_fur',
    name: 'Kutup Ayısı Yalıtımı',
    category: 'resilience',
    description: 'Isı koruma — ekstrem soğuğa dayanım',
    icon: '🐻‍❄️',
    color: '#FFE135',
    advantages: { plastik: 0.2, asit: 0.3, kuraklik: 0.1, mikroplastik: 0.2 },
    conflicts: [],
    synergies: ['hollow_bones'],
    bodyPart: 'exterior',
    bioExample: {
      name: 'Kutup Ayısı Kürkü',
      application: 'Termal yalıtım giysileri',
      image: 'polar_bear_fur.jpg'
    }
  },
  {
    id: 'tardigrade_drying',
    name: 'Tardigrad Kuruması',
    category: 'resilience',
    description: 'Ekstrem dayanım — vakum ve radyasyona direnç',
    icon: '🐻',
    color: '#FFE135',
    advantages: { plastik: 0.3, asit: 0.7, kuraklik: 0.9, mikroplastik: 0.4 },
    conflicts: [],
    synergies: ['turtle_shell', 'desert_lizard'],
    bodyPart: 'cellular',
    bioExample: {
      name: 'Tardigrad Biyolojisi',
      application: 'Uzay araştırma teknolojisi',
      image: 'tardigrade.jpg'
    }
  },
  {
    id: 'antifreeze_protein',
    name: 'Buz Balığı Antifrizi',
    category: 'resilience',
    description: 'Donmama — düşük sıcaklığa adaptasyon',
    icon: '🐟',
    color: '#FFE135',
    advantages: { plastik: 0.2, asit: 0.4, kuraklik: 0.2, mikroplastik: 0.3 },
    conflicts: [],
    synergies: ['polar_bear_fur'],
    bodyPart: 'cellular',
    bioExample: {
      name: 'Arktik Balık Antifriz Proteini',
      application: 'Krioprotektanlar',
      image: 'antifreeze.jpg'
    }
  },
  {
    id: 'camel_hump',
    name: 'Deve Hörgici',
    category: 'resilience',
    description: 'Su depolama — kuraklığa dayanım',
    icon: '🐪',
    color: '#FFE135',
    advantages: { plastik: 0.1, asit: 0.2, kuraklik: 0.9, mikroplastik: 0.2 },
    conflicts: [],
    synergies: ['lotus_surface'],
    bodyPart: 'dorsal',
    bioExample: {
      name: 'Deve Su Depolama',
      application: 'Su tasarrufu sistemleri',
      image: 'camel_hump.jpg'
    }
  }
];
```

---

## 7. TEST ORTAMLARI

### 7.1 Ortam Tanımları

```typescript
const environments = [
  {
    id: 'plastik_corbasi',
    name: 'Plastik Çorbası',
    description: 'Plastik parçacıklarla dolu okyanus',
    icon: '🛢️',
    color: '#FF6B35',
    backgroundType: 'ocean',
    primaryThreat: 'physical_entanglement',
    secondaryThreat: 'chemical_absorption',
    difficulty: 2,
    winningTraits: ['whale_filter', 'shark_fin', 'turtle_shell'],
    survivalDuration: 30, // saniye
    particleCount: 50,
    ambientSound: 'polluted_ocean.mp3'
  },
  {
    id: 'asit_yagmuru',
    name: 'Asit Yağmuru',
    description: 'Endüstriyel atık, asidik yağmur',
    icon: '🌧️',
    color: '#FFE135',
    backgroundType: 'industrial',
    primaryThreat: 'corrosion',
    secondaryThreat: 'respiratory_damage',
    difficulty: 3,
    winningTraits: ['turtle_shell', 'lotus_surface', 'tardigrade_drying'],
    survivalDuration: 25,
    particleCount: 80,
    ambientSound: 'acid_rain.mp3'
  },
  {
    id: 'kuraklik',
    name: 'Kuraklık',
    description: 'Sıcak çöl koşulları, susuzluk',
    icon: '🏜️',
    color: '#FF6B35',
    backgroundType: 'desert',
    primaryThreat: 'dehydration',
    secondaryThreat: 'heat_stroke',
    difficulty: 3,
    winningTraits: ['camel_hump', 'tardigrade_drying', 'desert_lizard'],
    survivalDuration: 30,
    particleCount: 20,
    ambientSound: 'desert_wind.mp3'
  },
  {
    id: 'mikroplastik',
    name: 'Mikroplastik İstilası',
    description: 'Toprak altı mikroplastik kirliliği',
    icon: '⚫',
    color: '#7FA8C9',
    backgroundType: 'underground',
    primaryThreat: 'digestive_blockage',
    secondaryThreat: 'nutrient_absorption',
    difficulty: 4,
    winningTraits: ['whale_filter', 'mushroom_network', 'snake_movement'],
    survivalDuration: 35,
    particleCount: 100,
    ambientSound: 'underground_ambient.mp3'
  }
];
```

---

## 8. SKOR SİSTEMİ

### 8.1 Uyum Skoru Hesaplama

```typescript
interface ScoreCalculation {
  baseScore: number;           // Her özellik +50 puan
  advantageBonus: number;      // Ortam avantajı × 100
  synergyBonus: number;        // Sinerji × 150
  conflictPenalty: number;     // Çelişki × -75
  balanceBonus: number;        // 4 kategori de dolu +200
  survivalBonus: number;       // Hayatta kalma süresi × 10
}

// Maksimum teorik skor: ~2000
const perfectScore = {
  traits: 9 * 50,              // 450 (maksimum özellik)
  advantages: 4 * 100,         // 400 (en iyi ortam avantajı)
  synergies: 3 * 150,          // 450 (3 sinerji)
  balance: 200,                 // 200
  survival: 30 * 10,            // 300
  total: 1800
};
```

### 8.2 Sinerji Sistemi

```typescript
const synergies = {
  'shark_fin + whale_filter': 1.3,   // Hidrodinamik + filtrasyon
  'turtle_shell + tardigrade_drying': 1.4, // İkili koruma
  'camel_hump + lotus_surface': 1.2, // Su tasarrufu + kendini temizleme
  'squid_propulsion + octopus_ink': 1.3, // Hız + kaçış
  'snake_movement + porcupine_quills': 1.25, // Manevra + savunma
};

const conflicts = {
  'shark_fin + turtle_shell': 0.7,  // Ağır kabuk hızı düşürür
  'bird_wing + turtle_shell': 0.6,   // Kabuk uçuşu engeller
  'whale_filter + venus_trap': 0.8,  // Farklı beslenme stratejisi
};
```

---

## 9. OYUN ilerleme SİSTEMİ

### 9.1 Seviye Yapısı

```typescript
const progressionLevels = [
  {
    level: 1,
    name: 'Tek Hücreli',
    unlockedTraits: 4,          // İlk 4 özellik
    environments: ['plastik_corbasi'],
    scoreToUnlock: 0,
    tutorial: true
  },
  {
    level: 2,
    name: 'Çok Hücreli',
    unlockedTraits: 8,
    environments: ['plastik_corbasi', 'asit_yagmuru'],
    scoreToUnlock: 300
  },
  {
    level: 3,
    name: 'Omurgalı',
    unlockedTraits: 12,
    environments: ['plastik_corbasi', 'asit_yagmuru', 'kuraklik'],
    scoreToUnlock: 700
  },
  {
    level: 4,
    name: 'Evrim Ustası',
    unlockedTraits: 16,
    environments: ['plastik_corbasi', 'asit_yagmuru', 'kuraklik', 'mikroplastik'],
    scoreToUnlock: 1200
  }
];
```

### 9.2 Rozet Sistemi

```typescript
const badges = [
  { id: 'first_life', name: 'İlk Yaşam', icon: '🧬', condition: 'İlk organizma oluştur' },
  { id: 'first_survival', name: 'Hayatta Kaldı', icon: '✅', condition: 'İlk hayatta kalma' },
  { id: 'perfect_score', name: 'Mükemmel Adaptasyon', icon: '⭐', condition: '900+ uyum skoru' },
  { id: 'synergy_master', name: 'Sinerji Ustası', icon: '🔮', condition: '3 sinerjik kombinasyon' },
  { all_envs', name: 'Her Ortamda Hayatta', icon: '🌍', condition: '4 farklı ortamda hayatta kal' },
  { id: 'speed_evolution', name: 'Hızlı Evrim', icon: '⚡', condition: '2 dakikada hayatta kalma' },
  { id: 'museum_curator', name: 'Müze Küratörü', icon: '🏛️', condition: '5 farklı organizma' },
  { id: 'biomimicry_expert', name: 'Biomimetik Uzmanı', icon: '🔬', condition: 'Tüm bio-örnekleri gör' },
  { id: 'level_master', name: 'Seviye Ustası', icon: '👑', condition: 'Seviye 4\'e ulaş' },
  { id: 'persistence', name: 'Azimli Araştırmacı', icon: '🔥', condition: '10 deneme yap' }
];
```

---

## 10. EĞİTİMSEL ÇIKTILAR

### 10.1 Öğrenme Hedefleri

```markdown
## Kazanımlar

1. **Biomimetik Kavramı**
   - Doğadan ilham alarak mühendislik çözümleri geliştirme
   - Gerçek organizmaların özelliklerini tanıma

2. **Sistem Düşüncesi**
   - Parçalar arası ilişkileri anlama (sinerji/çelişki)
   - Dengeli tasarım önemini kavrama

3. **Adaptasyon Mekanizmaları**
   - Farklı ortamlara uyum stratejileri
   - Evrimsel baskı ve seçilim kavramı

4. **Problem Çözme**
   - Karmaşık problemlere yaratıcı çözümler
   - Deney yapma ve sonuç çıkarma döngüsü
```

### 10.2 Değerlendirme Kriterleri

```typescript
const assessmentCriteria = {
  kreativite: {
    weight: 0.3,
    indicators: [
      'Otantik kombinasyonlar kullanma',
      'Beklenmedik özellik eşleşmeleri',
      'Yaratıcı isimlendirme'
    ]
  },
  anlama: {
    weight: 0.3,
    indicators: [
      'Sinerji kombinasyonlarını keşfetme',
      'Ortam-tehdit ilişkisini anlama',
      'Skor artış trendi'
    ]
  },
  ısrar: {
    weight: 0.2,
    indicators: [
      'Deneme sayısı',
      'Başarısızlıktan sonra tekrar deneme',
      'Farklı stratejiler deneme'
    ]
  },
  transfer: {
    weight: 0.2,
    indicators: [
      'Farklı ortamlarda başarı',
      'Öğrenilenleri yeni durumlara uygulama',
      'Biomimetik bağlantıları tanıma'
    ]
  }
};
```

---

## 11. KULLANICI DENEYİMİ DETAYLARI

### 11.1 Onboarding Akışı

```typescript
const onboardingSteps = [
  {
    step: 1,
    title: 'Hoş Geldin, Evrim Mühendisi!',
    content: 'Doğadan ilham alarak yeni organizmalar tasarlayacaksın.',
    action: null,
    highlight: null
  },
  {
    step: 2,
    title: 'Özellikleri Keşfet',
    content: 'Sol panelden özellikleri sürükle ve petri kabına bırak.',
    action: 'drag_trait',
    highlight: 'trait_library',
    validation: 'Has dragged a trait'
  },
  {
    step: 3,
    title: 'Uyum Skorunu İzle',
    content: 'Organizmanın uyum skorunu takip et. Yüksek = İyi kombinasyon!',
    action: null,
    highlight: 'score_display'
  },
  {
    step: 4,
    title: 'Test Et ve Öğren',
    content: 'Organizmanı ekolojik krizlere karşı test et. Başarısız mı? Tekrar dene!',
    action: 'test_organism',
    highlight: 'test_button',
    validation: 'Has tested once'
  },
  {
    step: 5,
    title: 'Müzeyi Aç',
    content: 'Başarılı organizmaların müzeye eklenir. Sağ alt köşeden ulaş!',
    action: null,
    highlight: 'museum_icon'
  }
];
```

### 11.2 Yardım Sistemi

```typescript
const helpContent = {
  'what_is_synergy': {
    title: 'Sinerji Nedir?',
    content: 'Bazı özellikler birlikte kullanıldığında daha etkili olur. Örneğin: Köpekbalığı yüzgeci + Balina filtresi = Süper okyanus temizleyicisi!',
    example: 'shark_fin + whale_filter'
  },
  'what_is_conflict': {
    title: 'Çelişki Nedir?',
    content: 'Bazı özellikler birbirleriyle uyumsuzdur. Ağır kabuk + Kanat = Uçamaz!',
    example: 'turtle_shell + bird_wing'
  },
  'why_score': {
    title: 'Uyum Skoru Nasıl Hesaplanır?',
    content: 'Özelliklerin ortama uyumu + Sinerjiler - Çelişkiler + Dengeli tasarım bonusu'
  },
  'bio_examples': {
    title: 'Biyomimetik Nedir?',
    content: 'Organizmanın tasarımı gerçek hayatta hangi mühendislik problemini çözüyor?'
  }
};
```

---

## 12. PERFORMANS OPTİMİZASYONLARI

```typescript
const performanceConfig = {
  // Lazy Loading
  lazyLoad: {
    lottieAnimations: true,
    images: true,
    audio: true
  },

  // Parçacık Sınırları
  particles: {
    background: 50,
    activeScene: 100,
    effect: 200
  },

  // Animasyon
  animations: {
    useReducedMotion: 'prefers-reduced-motion: reduce',
    fallbackDuration: 0,
    skipOnLowBattery: true
  },

  // Cache
  cache: {
    localStorageLimit: '5MB',
    staleTime: 1000 * 60 * 60 * 24, // 24 saat
  }
};
```

---

## 13. ERİŞİLEBİLİRLİK

```typescript
const accessibilityFeatures = {
  // Klavye Navigasyonu
  keyboardNav: {
    traitLibrary: 'Arrow keys + Enter',
    petriDish: 'Arrow keys + Space to drop',
    testButton: 'Tab + Enter',
    allModals: 'Escape to close'
  },

  // Ekran Okuyucu
  screenReader: {
    liveRegions: true,
    ariaLabels: true,
    roleDescriptions: true
  },

  // Görsel
  visual: {
    highContrast: 'high-contrast mode',
    colorBlind: 'deuteranopia, protanopia, tritanopia support',
    fontSize: 'adjustable'
  },

  // Motor
  motor: {
    touchTargets: 'min 44x44px',
    dragDropAlternative: 'click to select, click to place',
    dwellClick: 'optional'
  }
};
```

---

## 14. VERSİYON GEÇMİŞİ

```
v2.0 (2026-04-13)
- Eğitim çıktıları/hedefleri eklendi
- Gamification detayları genişletildi
- Progresyon sistemi eklendi
- Component mimarisi detaylandırıldı
- Performans optimizasyonları eklendi
- Erişilebilirlik standartları eklendi
- Yardım sistemi taslağı eklendi

v1.0 (Orijinal)
- Temel oyun yapısı
- Özellik listesi
- Test ortamları
- Ses ve animasyon sistemi
```

---

*Bu spec Mahir Cihangir SARAÇ tarafından hazırlanmıştır.*
*mahircihangirsarac@posta.mu.edu.tr*
