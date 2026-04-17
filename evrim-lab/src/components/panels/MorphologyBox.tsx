import { motion } from 'framer-motion';
import { Trait } from '../../assets/traits';
import { Environment } from '../../assets/environments';
import { traits } from '../../assets/traits';

interface MorphologyBoxProps {
  traits: Trait[];
  score: number;
  environment: Environment;
}

export function MorphologyBox({ traits, score, environment }: MorphologyBoxProps) {
  const slots = Array.from({ length: 9 }, (_, i) => traits[i] || null);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#00FFD1]/20">
        <h2 className="font-display text-xl font-bold text-glow-cyan flex items-center gap-2">
          <span>🧫</span>
          <span>MORFOLOJİ</span>
        </h2>
        <p className="text-xs text-[#7FA8C9] mt-1">
          Seçili özellikler
        </p>
      </div>

      {/* Slots Grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {slots.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`
                aspect-square rounded-lg border-2 flex items-center justify-center
                ${trait
                  ? 'border-[#00FFD1]/50 bg-[#00FFD1]/10'
                  : 'border-[#2A4A6B]/30 border-dashed'
                }
              `}
              style={{
                boxShadow: trait
                  ? `inset 0 0 20px ${trait.color}30`
                  : 'none'
              }}
            >
              {trait ? (
                <span className="text-2xl">{trait.icon}</span>
              ) : (
                <span className="text-[#2A4A6B] text-lg">+</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Score Display */}
        <div className="bg-[#0A1525] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#7FA8C9]">Uyum Skoru</span>
            <motion.span
              key={score}
              initial={{ scale: 1.5, color: '#39FF14' }}
              animate={{ scale: 1, color: score > 600 ? '#39FF14' : score > 300 ? '#FFE135' : '#FF6B35' }}
              className="font-scientific text-2xl font-bold"
            >
              {score}
            </motion.span>
          </div>

          {/* Score bar */}
          <div className="h-2 bg-[#030408] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(score / 10, 100)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{
                background: score > 600
                  ? 'linear-gradient(90deg, #39FF14, #00FFD1)'
                  : score > 300
                  ? 'linear-gradient(90deg, #FFE135, #FF6B35)'
                  : 'linear-gradient(90deg, #FF6B35, #FF2D78)'
              }}
            />
          </div>
        </div>

        {/* Environment info */}
        <div
          className="rounded-xl p-3 mb-4"
          style={{
            background: `linear-gradient(135deg, ${environment.color}20, ${environment.color}05)`,
            border: `1px solid ${environment.color}40`
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{environment.icon}</span>
            <span className="font-display font-semibold" style={{ color: environment.color }}>
              {environment.name}
            </span>
          </div>
          <p className="text-xs text-[#7FA8C9] mb-2">
            {environment.description}
          </p>

          {/* Winning traits */}
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-[#7FA8C9]">İyi eşleşme:</span>
            {environment.winningTraits.slice(0, 3).map(traitId => {
              const trait = traits.find(t => t.id === traitId);
              return trait ? (
                <span
                  key={traitId}
                  className="text-xs px-1.5 py-0.5 rounded bg-[#39FF14]/20 text-[#39FF14]"
                >
                  {trait.icon}
                </span>
              ) : (
                <span
                  key={traitId}
                  className="text-xs px-1.5 py-0.5 rounded bg-[#7FA8C9]/20 text-[#7FA8C9]"
                >
                  ?
                </span>
              );
            })}
          </div>
        </div>

        {/* Trait Analysis */}
        {traits.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-display font-semibold text-[#7FA8C9]">
              Avantaj Analizi
            </h3>
            {traits.map(trait => {
              const advantage = trait.advantages[environment.id as keyof typeof trait.advantages] || 0;
              return (
                <div key={trait.id} className="flex items-center gap-2">
                  <span>{trait.icon}</span>
                  <div className="flex-1">
                    <div className="h-1.5 bg-[#030408] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${advantage * 100}%`,
                          background: advantage > 0.6
                            ? '#39FF14'
                            : advantage > 0.3
                            ? '#FFE135'
                            : '#FF6B35'
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-scientific text-[#7FA8C9]">
                    {Math.round(advantage * 100)}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
