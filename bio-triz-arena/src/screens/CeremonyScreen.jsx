import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { defaultBadges } from '../data/questions';
import Particles from '@tsparticles/react';
import Lottie from 'lottie-react';
// These would be real lottie files in a real build
// import trophyAnim from '../assets/lottie/trophy.json';

export default function CeremonyScreen() {
  const { state } = useGame();
  const [phase, setPhase] = useState('buildUp'); // buildUp -> champion -> podium -> badges -> summary
  
  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
  const champion = sortedTeams[0];

  useEffect(() => {
    if (phase === 'buildUp') {
      const t = setTimeout(() => setPhase('champion'), 5000);
      return () => clearTimeout(t);
    }
    if (phase === 'champion') {
      const t = setTimeout(() => setPhase('podium'), 10000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
      
      <AnimatePresence mode="wait">
        
        {/* Build up Phase */}
        {phase === 'buildUp' && (
          <motion.div
            key="buildUp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
             {sortedTeams.map((t, idx) => (
                <motion.div 
                  key={t.id}
                  animate={idx === 0 ? { scale: 1.2, x: 0 } : { opacity: 0, x: -100, scale: 0.8 }}
                  transition={{ duration: 3, delay: idx === 0 ? 1 : 0.5 }}
                  className="text-4xl font-team flex items-center gap-4"
                  style={{ color: t.color }}
                >
                  <span>{t.icon}</span> {t.name}
                </motion.div>
             ))}
          </motion.div>
        )}

        {/* Champion Phase */}
        {phase === 'champion' && (
          <motion.div
            key="champion"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          >
            {/* Background pulsating winner color */}
            <motion.div 
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: champion.color, mixBlendMode: 'screen' }}
            />

            <Particles 
              id="champion-confetti"
              options={getChampionConfetti(champion.color)}
            />

            {/* In full build, replace div with Lottie component */}
            <motion.div 
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-9xl mb-8 filter drop-shadow-[0_0_20px_rgba(255,179,0,0.8)]"
            >
              🏆
            </motion.div>
            
            <div className="text-center">
              <h1 className="text-[8rem] font-arena font-black uppercase text-[#FFD700] text-glow leading-none">
                ŞAMPİYON
              </h1>
              <h2 className="text-[6rem] font-arena font-black uppercase tracking-widest mt-4" style={{ color: champion.color, textShadow: `0 0 40px ${champion.color}` }}>
                {champion.name}
              </h2>
            </div>
            
            <div className="mt-12 flex gap-4">
              {champion.members.map((m, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + (i * 0.2) }}
                  className="bg-black/50 text-white px-6 py-2 rounded-full border border-white/20 text-xl font-ui"
                >
                  {m}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Podium Phase */}
        {phase === 'podium' && (
          <motion.div
             key="podium"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="w-full max-w-5xl flex items-end justify-center h-[500px] gap-4"
          >
             {/* 2nd Place */}
             {sortedTeams[1] && <PodiumBar team={sortedTeams[1]} rank={2} height={250} color="#B0BEC5" />}
             {/* 1st Place */}
             <PodiumBar team={sortedTeams[0]} rank={1} height={400} color="#FFD700" />
             {/* 3rd Place */}
             {sortedTeams[2] && <PodiumBar team={sortedTeams[2]} rank={3} height={180} color="#CD7F32" />}
             {/* 4th Place is not on standard 3-podium, but could be added below */}
             
             {/* Admin step override */}
             <button onClick={() => setPhase('badges')} className="absolute bottom-10 bg-white/10 px-4 py-2 opacity-50 hover:opacity-100 rounded">Sonraki (Rozetler)</button>
          </motion.div>
        )}

        {/* Badges Phase */}
        {phase === 'badges' && (
          <motion.div
             key="badges"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="w-full flex flex-col items-center pt-10 px-8"
          >
             <h2 className="text-5xl font-arena text-neon-blue text-glow mb-12">BİREYSEL ROZETLER</h2>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
               {defaultBadges.map((badge, idx) => (
                 <motion.div 
                   key={badge.id}
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: idx * 0.15 }}
                   className="bg-arena-panel border border-neon-purple/30 rounded-xl p-6 flex flex-col items-center text-center shadow-[0_0_15px_rgba(155,89,255,0.1)] hover:shadow-[0_0_30px_rgba(155,89,255,0.4)] transition-all"
                 >
                   <div className="text-5xl mb-4 bg-neon-purple/20 w-24 h-24 flex items-center justify-center rounded-full">
                     🎖️
                   </div>
                   <h3 className="font-team text-2xl uppercase tracking-widest text-white mb-2">{badge.name}</h3>
                   <p className="text-gray-400 text-sm font-ui">{badge.condition}</p>
                   {/* In a real app we'd map this to a specific student */}
                   <div className="mt-4 px-4 py-1 bg-black/50 text-neon-yellow rounded-full text-sm">
                     {champion.members[idx % champion.members.length]} (Örnek)
                   </div>
                 </motion.div>
               ))}
             </div>
             
             <button onClick={() => setPhase('summary')} className="mt-12 bg-neon-blue text-black px-8 py-3 rounded font-bold uppercase transition hover:brightness-125">
               PROGRAM ÖZETİ
             </button>
          </motion.div>
        )}

        {/* Summary Phase */}
        {phase === 'summary' && (
          <motion.div
             key="summary"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full max-w-4xl bg-arena-card border border-gray-700 rounded-2xl p-12 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px]" />
             
             <h2 className="text-4xl font-arena text-white font-bold mb-4 tracking-[0.2em] border-b border-gray-700 pb-6">
               BIO-TRIZ PROGRAMI TAMAMLANDI
             </h2>
             <h3 className="text-2xl text-gray-400 mb-10">10 Gün • 20 Saat • 8 Oyun</h3>

             <div className="space-y-4 text-xl font-ui text-gray-200">
               <p className="flex items-center gap-4"><span className="text-neon-green">✓</span> 8 Ekosistemde Biyomimikri Keşfettin</p>
               <p className="flex items-center gap-4"><span className="text-neon-green">✓</span> 3 Ekolojik Krizi Soruşturup Çözdün</p>
               <p className="flex items-center gap-4"><span className="text-neon-green">✓</span> 12 TRIZ Çelişkisini Çözdün</p>
               <p className="flex items-center gap-4"><span className="text-neon-green">✓</span> Kendi Organizmanı Tasarladın</p>
               <p className="flex items-center gap-4"><span className="text-neon-green">✓</span> 3 Odalı Krizden Kaçtın</p>
               <p className="flex items-center gap-4"><span className="text-neon-green">✓</span> Milyon Dolarlık Karar Verdin</p>
               <p className="flex items-center gap-4"><span className="text-neon-green">✓</span> Kendi Çizgi Romanını Yarattın</p>
               <p className="flex items-center gap-4 text-neon-blue"><span className="text-neon-blue">✓</span> Arenada Yarıştın</p>
             </div>

             <div className="mt-12 flex items-center justify-between border-t border-gray-700 pt-8">
               <div>
                 <div className="text-sm uppercase text-gray-500 mb-1">KAZANILAN BIO-TRIZ İLKELERİ</div>
                 <div className="text-4xl font-score text-[#FFD700]">40</div>
               </div>
               <div>
                 <div className="text-sm uppercase text-gray-500 mb-1">TOPLAM ROZET</div>
                 <div className="text-4xl font-score text-neon-purple">8</div>
               </div>
               
               <button className="px-8 py-4 bg-white text-black font-bold uppercase rounded hover:bg-gray-200 transition">
                 SERTİFİKAYI İNDİR
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function PodiumBar({ team, rank, height, color }) {
  return (
    <div className="flex flex-col items-center w-48">
      <div className="text-4xl mb-4">{team.icon}</div>
      <div className="font-team text-2xl uppercase mb-2" style={{color: team.color}}>{team.name}</div>
      <div className="text-xl font-score text-gray-400 mb-2">{team.score}</div>
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height }}
        transition={{ duration: 1, type: "spring" }}
        className="w-full rounded-t-lg relative flex flex-col items-center justify-start pt-4"
        style={{ backgroundColor: color }}
      >
        <span className="text-6xl font-black text-black/30 font-arena">{rank}</span>
      </motion.div>
    </div>
  );
}

function getChampionConfetti(teamColor) {
  return {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      color: { value: [teamColor, "#FFD700", "#FFFFFF"] },
      move: {
        direction: "top",
        enable: true,
        outModes: { default: "out" },
        speed: { min: 10, max: 30 },
      },
      number: { density: { enable: true, area: 800 }, value: 150 },
      opacity: { value: 1 },
      shape: { type: ["circle", "square"] },
      size: { value: { min: 3, max: 8 } }
    },
    emitters: {
      direction: "top",
      life: { count: 0, duration: 0.1, delay: 0.1 },
      rate: { delay: 0.1, quantity: 15 },
      size: { width: 100, height: 0 },
      position: { x: 50, y: 100 }
    }
  };
}
