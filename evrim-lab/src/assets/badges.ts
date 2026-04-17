export interface Badge {
  id: string;
  name: string;
  icon: string;
  condition: string;
  color: string;
}

export const badges: Badge[] = [
  {
    id: 'first_life',
    name: 'İlk Yaşam',
    icon: '🧬',
    condition: 'İlk organizma oluştur',
    color: '#00FFD1'
  },
  {
    id: 'first_survival',
    name: 'Hayatta Kaldı',
    icon: '✅',
    condition: 'İlk hayatta kalma',
    color: '#39FF14'
  },
  {
    id: 'perfect_score',
    name: 'Mükemmel Adaptasyon',
    icon: '⭐',
    condition: '900+ uyum skoru',
    color: '#FFE135'
  },
  {
    id: 'synergy_master',
    name: 'Sinerji Ustası',
    icon: '🔮',
    condition: '3 sinerjik kombinasyon',
    color: '#9B59FF'
  },
  {
    id: 'all_envs',
    name: 'Her Ortamda Hayatta',
    icon: '🌍',
    condition: '4 farklı ortamda hayatta kal',
    color: '#00BFFF'
  },
  {
    id: 'speed_evolution',
    name: 'Hızlı Evrim',
    icon: '⚡',
    condition: '2 dakikada hayatta kalma',
    color: '#FF6B35'
  },
  {
    id: 'museum_curator',
    name: 'Müze Küratörü',
    icon: '🏛️',
    condition: '5 farklı organizma',
    color: '#FF2D78'
  },
  {
    id: 'biomimicry_expert',
    name: 'Biomimetik Uzmanı',
    icon: '🔬',
    condition: 'Tüm bio-örnekleri gör',
    color: '#7FA8C9'
  },
  {
    id: 'level_master',
    name: 'Seviye Ustası',
    icon: '👑',
    condition: 'Seviye 4\'e ulaş',
    color: '#FFE135'
  },
  {
    id: 'persistence',
    name: 'Azimli Araştırmacı',
    icon: '🔥',
    condition: '10 deneme yap',
    color: '#FF6B35'
  }
];

export const getBadgeById = (id: string): Badge | undefined => {
  return badges.find(badge => badge.id === id);
};
