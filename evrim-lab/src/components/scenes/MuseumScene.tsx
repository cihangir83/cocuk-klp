import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { GlowButton } from '../ui/GlowButton';
import { ParticleBackground } from '../ui/ParticleBackground';

export function MuseumScene() {
  const { state, dispatch } = useGame();
  
  const organisms = state.player.organisms || [];

  return (
    <div className="min-h-screen bg-[#030408] p-8 pb-24 overflow-y-auto relative">
      <ParticleBackground intensity="low" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-end border-b border-[#00FFD1]/20 pb-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-[#00FFD1] mb-2 flex items-center gap-3">
              <span>🏛️</span> EVRİM MÜZESİ
            </h1>
            <p className="text-[#7FA8C9] font-scientific">Keşfedilen ve hayatta kalan türlerin arşivi</p>
          </div>
          <GlowButton onClick={() => dispatch({ type: 'SET_SCENE', payload: 'main' })} size="sm">
            ← Laboratuvara Dön
          </GlowButton>
        </header>

        {organisms.length === 0 ? (
          <div className="text-center py-20 bg-[#0A1525] rounded-2xl border border-white/5">
            <span className="text-6xl block mb-4 opacity-50">🧬</span>
            <h3 className="text-[#7FA8C9] text-xl font-display">Henüz müzede sergilenecek bir canlı yok.</h3>
            <p className="text-[#2A4A6B] mt-2">Deneylere başla ve hayatta kalmayı başar!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organisms.map((org) => (
              <motion.div 
                key={org.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-panel p-6 border border-white/10 relative overflow-hidden"
              >
                <div 
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20"
                  style={{ backgroundColor: org.color }}
                />
                <h3 className="text-2xl font-display font-bold text-white mb-1">{org.name}</h3>
                <p className="text-sm font-scientific text-glow-cyan italic mb-4" style={{ color: org.color }}>
                  {org.scientificName}
                </p>
                
                <div className="space-y-2 mb-4">
                  <span className="text-xs text-[#7FA8C9] uppercase tracking-wider">Kullanılan Genler:</span>
                  <div className="flex flex-wrap gap-2">
                    {org.traits?.map(t => (
                      <span key={t.id} className="text-lg bg-black/30 rounded p-1 shadow-inner" title={t.name}>
                        {t.icon}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-[#7FA8C9]">En İyi Skor</span>
                  <span className="font-bold text-[#FFE135]">{Math.max(...org.testResults.map(r => r.survivalScore), 0)} Puan</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
