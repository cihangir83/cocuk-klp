import { motion } from 'framer-motion';
import { Trait } from '../../assets/traits';

interface TraitCardProps {
  trait: Trait;
  onSelect?: (trait: Trait) => void;
  isSelected?: boolean;
  isDraggable?: boolean;
  isDisabled?: boolean;
}

export function TraitCard({
  trait,
  onSelect,
  isSelected = false,
  isDraggable = true,
  isDisabled = false
}: TraitCardProps) {
  const categoryColors = {
    movement: {
      bg: 'from-[#00FFD1]/10 to-[#00FFD1]/5',
      border: '#00FFD1',
      icon: '🦈',
      label: 'Hareket'
    },
    protection: {
      bg: 'from-[#FF6B35]/10 to-[#FF6B35]/5',
      border: '#FF6B35',
      icon: '🛡️',
      label: 'Koruma'
    },
    feeding: {
      bg: 'from-[#9B59FF]/10 to-[#9B59FF]/5',
      border: '#9B59FF',
      icon: '🍽️',
      label: 'Beslenme'
    },
    resilience: {
      bg: 'from-[#FFE135]/10 to-[#FFE135]/5',
      border: '#FFE135',
      icon: '💪',
      label: 'Dayanıklılık'
    }
  };

  const style = categoryColors[trait.category];

  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.05, y: -5 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      onClick={() => !isDisabled && onSelect?.(trait)}
      drag={isDraggable && !isDisabled}
      dragSnapToOrigin
      className={`
        relative p-4 rounded-xl cursor-pointer
        bg-gradient-to-br ${style.bg}
        border-2 transition-all duration-300
        ${isSelected ? 'ring-2 ring-white/50' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
      `}
      style={{
        borderColor: isSelected ? style.border : `${style.border}50`,
        boxShadow: isSelected
          ? `0 0 20px ${style.border}80, inset 0 0 20px ${style.border}20`
          : `0 0 10px ${style.border}30`
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${style.border}40, transparent 70%)`,
          filter: 'blur(10px)'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{trait.icon}</span>
          <div>
            <h3 className="font-display font-semibold text-white text-sm">
              {trait.name}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${style.border}30`, color: style.border }}
            >
              {style.label}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#7FA8C9] leading-relaxed">
          {trait.description}
        </p>

        {/* Advantage indicators */}
        <div className="mt-3 flex flex-wrap gap-1">
          {Object.entries(trait.advantages)
            .filter(([_, value]) => value > 0.5)
            .map(([key, value]) => (
              <div
                key={key}
                className="px-2 py-0.5 rounded text-xs font-scientific"
                style={{
                  backgroundColor: `rgba(57, 255, 20, ${value * 0.3})`,
                  color: value > 0.7 ? '#39FF14' : '#7FA8C9'
                }}
              >
                {value > 0.7 ? '✓' : '○'} {key.replace('_', ' ')}
              </div>
            ))}
        </div>
      </div>

      {/* Synergy indicator */}
      {trait.synergies.length > 0 && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 rounded-full bg-[#9B59FF]/30 flex items-center justify-center">
            <span className="text-xs text-[#9B59FF]">🔮</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
