import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ParticleBackground } from '../ui/ParticleBackground';

export function TestScene() {
  const { state, dispatch, calculateScore, getTraitColor } = useGame();
  const [timeLeft, setTimeLeft] = useState(5);
  const [health, setHealth] = useState(100);
  
  const env = state.selectedEnvironment;
  const organism = state.currentOrganism;
  
  const score = env ? calculateScore(organism.traits || [], env) : 0;
  // A simple survival threshold (e.g., 500)
  const survived = score >= 500;
  const hpDecrease = survived ? 5 : 20;

  useEffect(() => {
    if (!env) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          dispatch({ 
            type: 'COMPLETE_TEST', 
            payload: {
              environmentId: env.id,
              survived: survived,
              survivalScore: score,
              survivalTime: 30, // simulated
              factors: []
            } 
          });
          return 0;
        }
        return prev - 1;
      });
      
      setHealth((prev) => Math.max(0, prev - hpDecrease));
    }, 1000);

    return () => clearInterval(timer);
  }, [env, dispatch, survived, score, hpDecrease]);

  if (!env) return null;

  const orgColor = getTraitColor(organism.traits || []);

  return (
    <div 
      className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000"
      style={{ background: env.backgroundGradient }}
    >
      <ParticleBackground intensity="high" color={env.color} />
      
      {/* Environment Info */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <span className="text-6xl mb-2 block">{env.icon}</span>
        <h2 className="font-display text-2xl font-bold text-white tracking-wider mb-2">
          {env.name.toUpperCase()} TESTİ
        </h2>
        <div className="w-64 h-4 bg-black/50 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            className="h-full bg-[#00FFD1]"
            initial={{ width: '100%' }}
            animate={{ width: `${health}%` }}
            transition={{ duration: 1 }}
            style={{ 
              backgroundColor: health > 50 ? '#00FFD1' : health > 20 ? '#FFE135' : '#FF2D78' 
            }}
          />
        </div>
      </motion.div>

      {/* Organism Display */}
      <motion.div 
        className="relative z-0"
        animate={{
          scale: health > 0 ? [1, 1.05, 1] : [1, 0.8, 0],
          opacity: health > 0 ? 1 : 0
        }}
        transition={{ duration: health > 0 ? 2 : 1, repeat: health > 0 ? Infinity : 0 }}
      >
        <div 
           className="w-48 h-48 rounded-full blur-2xl absolute inset-0 m-auto" 
           style={{ backgroundColor: orgColor, opacity: 0.5 }} 
        />
        <div 
          className="w-32 h-32 rounded-full relative z-10 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4"
          style={{ 
            backgroundColor: orgColor, 
            borderColor: health > 0 ? 'rgba(255,255,255,0.2)' : '#FF2D78',
            boxShadow: `0 0 40px ${orgColor}`
          }}
        >
          <span className="text-3xl font-bold text-black/50">
            {health > 0 ? '💪' : '💀'}
          </span>
        </div>
      </motion.div>

      {/* Threats effect text */}
      <div className="absolute bottom-16 text-center z-10">
         <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg font-scientific tracking-widest text-[#FF6B35]"
         >
           T E H L İ K E : {env.primaryThreat.replace('_', ' ').toUpperCase()}
         </motion.p>
      </div>

    </div>
  );
}
