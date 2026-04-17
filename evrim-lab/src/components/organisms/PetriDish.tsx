import { motion } from 'framer-motion';
import { Trait } from '../../assets/traits';

interface PetriDishProps {
  traits: Trait[];
  onRemoveTrait: (traitId: string) => void;
  organismColor: string;
}

export function PetriDish({ traits, onRemoveTrait, organismColor }: PetriDishProps) {
  const size = traits.length === 0 ? 200 : Math.min(300 + traits.length * 20, 450);

  return (
    <div className="relative">
      {/* Petri dish glass effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
        style={{
          width: size + 80,
          height: size + 80
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40"
          style={{
            background: `radial-gradient(circle, ${organismColor}30, transparent 70%)`
          }}
        />

        {/* Petri dish border */}
        <svg
          className="absolute inset-0"
          width={size + 80}
          height={size + 80}
          viewBox={`0 0 ${size + 80} ${size + 80}`}
        >
          <defs>
            <radialGradient id="petriGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0A1525" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#070D15" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#030408" stopOpacity="1" />
            </radialGradient>
            <filter id="petriGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glass circle */}
          <circle
            cx={(size + 80) / 2}
            cy={(size + 80) / 2}
            r={size / 2 + 20}
            fill="url(#petriGradient)"
            stroke="#00FFD1"
            strokeWidth="2"
            strokeOpacity="0.3"
            filter="url(#petriGlow)"
          />

          {/* Inner liquid effect */}
          <circle
            cx={(size + 80) / 2}
            cy={(size + 80) / 2}
            r={size / 2}
            fill="none"
            stroke="#00FFD1"
            strokeWidth="1"
            strokeOpacity="0.1"
            strokeDasharray="10 5"
          />
        </svg>

        {/* Center organism */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ width: size, height: size }}
        >
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-full h-full relative"
          >
            {/* Main organism body */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <radialGradient id="organismGradient" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={organismColor} stopOpacity="0.9" />
                  <stop offset="50%" stopColor={organismColor} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={organismColor} stopOpacity="0.3" />
                </radialGradient>
                <filter id="organismGlow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Blob shape */}
              <motion.path
                d={generateBlobPath(traits.length)}
                fill="url(#organismGradient)"
                filter="url(#organismGlow)"
                animate={{
                  d: [
                    generateBlobPath(traits.length, 0),
                    generateBlobPath(traits.length, 0.02),
                    generateBlobPath(traits.length, 0)
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Core */}
              <circle
                cx="100"
                cy="100"
                r="20"
                fill={organismColor}
                opacity="0.8"
              />

              {/* Trait icons around the organism */}
              {traits.map((trait, index) => {
                const angle = (index / traits.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 70 + traits.length * 3;
                const x = 100 + Math.cos(angle) * radius;
                const y = 100 + Math.sin(angle) * radius;

                return (
                  <motion.g
                    key={trait.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onRemoveTrait(trait.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r="18"
                      fill={trait.color}
                      opacity="0.3"
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="16"
                    >
                      {trait.icon}
                    </text>
                  </motion.g>
                );
              })}
            </svg>

            {/* Glow overlay */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${organismColor}40, transparent 60%)`,
                filter: 'blur(20px)'
              }}
            />
          </motion.div>

          {/* Floating particles */}
          {traits.length === 0 && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#00FFD1]"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    opacity: 0.3
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Empty state text */}
        {traits.length === 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-[#7FA8C9] text-sm mb-2">Organizma oluştur</p>
            <p className="text-[#2A4A6B] text-xs">
              Sol panelden özellik ekle
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function generateBlobPath(traitCount: number, variation: number = 0): string {
  const baseSize = 80;
  const size = baseSize + traitCount * 5;
  const points = 8;

  let path = '';
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const radiusVariation = Math.sin(angle * 3 + variation * 10) * (10 + traitCount * 2);
    const r = size + radiusVariation;
    const x = 100 + Math.cos(angle) * r;
    const y = 100 + Math.sin(angle) * r;

    if (i === 0) {
      path = `M ${x} ${y}`;
    } else {
      const cp1x = 100 + Math.cos(angle - 0.3) * (r + 10);
      const cp1y = 100 + Math.sin(angle - 0.3) * (r + 10);
      path += ` Q ${cp1x} ${cp1y} ${x} ${y}`;
    }
  }
  path += ' Z';

  return path;
}
