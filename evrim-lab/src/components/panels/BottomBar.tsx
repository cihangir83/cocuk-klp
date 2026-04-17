import { motion } from 'framer-motion';
import { GlowButton } from '../ui/GlowButton';

interface BottomBarProps {
  score: number;
  traitCount: number;
  onTest: () => void;
  onReset: () => void;
  canTest: boolean;
  playerName: string;
  bestScore: number;
}

export function BottomBar({
  score,
  traitCount,
  onTest,
  onReset,
  canTest,
  playerName,
  bestScore
}: BottomBarProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-30 glass-panel border-t border-[#00FFD1]/20"
    >
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left - Player info */}
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-[#7FA8C9]">Araştırmacı</p>
            <p className="font-display font-semibold text-white">{playerName}</p>
          </div>

          <div className="h-8 w-px bg-[#00FFD1]/20" />

          <div>
            <p className="text-xs text-[#7FA8C9]">En Yüksek Skor</p>
            <p className="font-scientific font-bold text-[#39FF14]">{bestScore}</p>
          </div>
        </div>

        {/* Center - Organism stats */}
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-xs text-[#7FA8C9]">Özellik</p>
            <p className="font-display font-bold text-white">
              {traitCount}/9
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-[#7FA8C9]">Uyum Skoru</p>
            <p
              className="font-scientific font-bold text-2xl"
              style={{
                color: score > 600 ? '#39FF14' : score > 300 ? '#FFE135' : '#FF6B35',
                textShadow: `0 0 10px ${score > 600 ? '#39FF14' : score > 300 ? '#FFE135' : '#FF6B35'}`
              }}
            >
              {score}
            </p>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          <GlowButton
            variant="secondary"
            size="sm"
            onClick={onReset}
            disabled={traitCount === 0}
          >
            <span className="flex items-center gap-2">
              <span>🔄</span>
              <span>Sıfırla</span>
            </span>
          </GlowButton>

          <GlowButton
            variant="primary"
            size="lg"
            onClick={onTest}
            disabled={!canTest}
          >
            <span className="flex items-center gap-2">
              <span>🧬</span>
              <span>TEST ET</span>
              <span>→</span>
            </span>
          </GlowButton>
        </div>
      </div>

      {/* Progress indicator */}
      {traitCount > 0 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: traitCount / 9 }}
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#00FFD1] to-[#9B59FF]"
          style={{ transformOrigin: 'left' }}
        />
      )}
    </motion.div>
  );
}
