export interface Environment {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  backgroundGradient: string;
  primaryThreat: string;
  secondaryThreat: string;
  difficulty: number;
  winningTraits: string[];
  survivalDuration: number;
  particleCount: number;
  threats: string[];
  criticalTraits: string[];
}

export const environments: Environment[] = [
  {
    id: 'plastik_corbasi',
    name: 'Plastik Çorbası',
    description: 'Plastik parçacıklarla dolu okyanus',
    icon: '🛢️',
    color: '#FF6B35',
    backgroundGradient: 'linear-gradient(180deg, #030408 0%, #1a0a05 50%, #0a1525 100%)',
    primaryThreat: 'physical_entanglement',
    secondaryThreat: 'chemical_absorption',
    difficulty: 2,
    winningTraits: ['whale_filter', 'shark_fin', 'turtle_shell'],
    survivalDuration: 30,
    particleCount: 50,
    threats: ['plastic', 'oil'],
    criticalTraits: ['whale_filter', 'turtle_shell']
  },
  {
    id: 'asit_yagmuru',
    name: 'Asit Yağmuru',
    description: 'Endüstriyel atık, asidik yağmur',
    icon: '🌧️',
    color: '#FFE135',
    backgroundGradient: 'linear-gradient(180deg, #1a1a05 0%, #2a2008 50%, #0a1525 100%)',
    primaryThreat: 'corrosion',
    secondaryThreat: 'respiratory_damage',
    difficulty: 3,
    winningTraits: ['turtle_shell', 'lotus_surface', 'tardigrade_drying'],
    survivalDuration: 25,
    particleCount: 80,
    threats: ['acid_droplet', 'chemical'],
    criticalTraits: ['turtle_shell', 'tardigrade_drying']
  },
  {
    id: 'kuraklik',
    name: 'Kuraklık',
    description: 'Sıcak çöl koşulları, susuzluk',
    icon: '🏜️',
    color: '#FF6B35',
    backgroundGradient: 'linear-gradient(180deg, #2a1505 0%, #1a0f05 50%, #0a0a08 100%)',
    primaryThreat: 'dehydration',
    secondaryThreat: 'heat_stroke',
    difficulty: 3,
    winningTraits: ['camel_hump', 'tardigrade_drying', 'polar_bear_fur'],
    survivalDuration: 30,
    particleCount: 20,
    threats: ['heat', 'sandstorm'],
    criticalTraits: ['camel_hump', 'tardigrade_drying']
  },
  {
    id: 'mikroplastik',
    name: 'Mikroplastik İstilası',
    description: 'Toprak altı mikroplastik kirliliği',
    icon: '⚫',
    color: '#7FA8C9',
    backgroundGradient: 'linear-gradient(180deg, #0a0f15 0%, #050810 50%, #030408 100%)',
    primaryThreat: 'digestive_blockage',
    secondaryThreat: 'nutrient_absorption',
    difficulty: 4,
    winningTraits: ['whale_filter', 'mushroom_network', 'snake_movement'],
    survivalDuration: 35,
    particleCount: 100,
    threats: ['microplastic', 'contamination'],
    criticalTraits: ['whale_filter', 'snake_movement']
  }
];

export const getEnvironmentById = (id: string): Environment | undefined => {
  return environments.find(env => env.id === id);
};

export const getRandomEnvironment = (): Environment => {
  return environments[Math.floor(Math.random() * environments.length)];
};
