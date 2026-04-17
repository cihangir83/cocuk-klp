import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { GlowButton } from '../ui/GlowButton';
import { ParticleBackground } from '../ui/ParticleBackground';

export function ResultScene() {
  const { state, dispatch } = useGame();
  
  const results = state.currentOrganism.testResults || [];
  const latestResult = results[results.length - 1];
  
  const env = state.selectedEnvironment;
  const isSuccess = latestResult?.survived;

  const handleRetry = () => {
    dispatch({ type: 'RESET_ORGANISM' });
  };

  const handleSaveAndMuseum = () => {
    dispatch({ type: 'SAVE_ORGANISM', payload: state.currentOrganism });
    dispatch({ type: 'RESET_ORGANISM' });
    dispatch({ type: 'SET_SCENE', payload: 'museum' });
  };

  return (
    <div className="fixed inset-0 bg-[#030408] flex items-center justify-center p-8 overflow-hidden">
      <ParticleBackground intensity="low" color={isSuccess ? '#00FFD1' : '#FF2D78'} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel p-8 max-w-2xl w-full text-center relative z-10 border border-white/10"
      >
        <div className="mb-6">
          <span className="text-6xl block mb-4">{isSuccess ? '🏆' : '💀'}</span>
          <h2 className="font-display text-4xl font-bold mb-2 tracking-wide" style={{ color: isSuccess ? '#00FFD1' : '#FF2D78' }}>
            {isSuccess ? 'EVRİM BAŞARILI!' : 'DOĞAL SEÇİLİM'}
          </h2>
          <p className="text-[#7FA8C9] text-lg font-scientific">
            {state.currentOrganism.scientificName} 
            {isSuccess ? ' ortama mükemmel uyum sağladı.' : ' koşullara dayanamadı.'}
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="bg-[#0A1525] rounded-xl p-6 mb-8 border border-white/5 text-left">
          <h3 className="text-[#00FFD1] font-display mb-4 text-xl border-b border-[#00FFD1]/20 pb-2">Uyum Skoru Raporu</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[#7FA8C9]">
              <span>Ortam:</span>
              <span className="text-white font-bold">{env?.name} {env?.icon}</span>
            </div>
            <div className="flex justify-between items-center text-[#7FA8C9]">
              <span>Kazanılan Skor:</span>
              <span className="text-3xl font-display text-[#FFE135]">{latestResult?.survivalScore} Puan</span>
            </div>
            {!isSuccess && (
               <div className="mt-4 p-4 bg-[#FF2D78]/10 rounded-lg text-sm text-[#FF2D78]">
                 İpucu: Sinerjik özellikler eklemeyi ve mevcut ortamın tehlikelerine (örn: {env?.primaryThreat}) karşı koruma sağlayan genleri seçmeyi dene.
               </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlowButton 
            onClick={handleRetry}
            color={!isSuccess ? 'cyan' : 'orange'}
          >
            ← Laboratuvara Dön
          </GlowButton>
          
          {isSuccess && (
            <GlowButton 
              onClick={handleSaveAndMuseum}
              color="cyan"
            >
              Müzeye Kaydet →
            </GlowButton>
          )}
        </div>
      </motion.div>
    </div>
  );
}
