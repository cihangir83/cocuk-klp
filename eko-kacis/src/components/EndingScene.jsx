import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useCountdown } from '../hooks/useCountdown';
import { ShieldAlert, Cpu, Trophy, Clock, Search, XCircle } from 'lucide-react';

export default function EndingScene() {
  const { state } = useGame();
  
  // Need to compute time taken. 
  // Initial time was 20 * 60 (1200 seconds).
  const timeTaken = 1200 - state.totalTimeRemaining;
  const mm = Math.floor(timeTaken / 60).toString().padStart(2, '0');
  const ss = (timeTaken % 60).toString().padStart(2, '0');

  useEffect(() => {
    // Optionally play victory sound
    // playSound('victory');
  }, []);

  return (
    <div className="w-full h-screen bg-[#050505] flex flex-col items-center justify-center font-ui text-white p-8 relative overflow-hidden selection:border-blue-500">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-timer text-blue-500 drop-shadow-[0_0_20px_#3b82f6] tracking-[0.2em] mb-4">GÖREV TAMAMLANDI</h1>
        <p className="text-gray-400 font-puzzle text-xl tracking-widest text-shadow-sm">SİSTEM STANDBY MODUNA ALINDI</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 w-full max-w-4xl">
        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="bg-black/60 border border-gray-800 p-8 rounded-xl shadow-2xl backdrop-blur-md"
        >
          <h2 className="font-timer text-2xl text-gray-300 mb-6 border-b border-gray-800 pb-2">İSTATİSTİKLER</h2>
          
          <ul className="space-y-6 font-puzzle text-lg text-gray-300">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-3"><Clock className="text-blue-500" /> Toplam Süre:</span>
              <span className="text-white font-timer">{mm}:{ss}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-3"><Search className="text-yellow-500" /> Kullanılan İpucu:</span>
              <span className="text-white font-timer">{state.hintsUsed}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-3"><XCircle className="text-red-500" /> Yanlış Deneme:</span>
              <span className="text-white font-timer">{state.wrongAttempts}</span>
            </li>
            <li className="flex items-center justify-between mt-8 pt-4 border-t border-gray-800">
              <span className="flex items-center gap-3 text-2xl text-green-500"><Trophy /> Performans Skoru:</span>
              <span className="text-green-500 font-timer text-3xl drop-shadow-[0_0_10px_#22c55e]">{state.finalScore}</span>
            </li>
          </ul>
        </motion.div>

        {/* Badges / Logs */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-black/60 border border-gray-800 p-8 rounded-xl shadow-2xl backdrop-blur-md"
        >
          <h2 className="font-timer text-2xl text-gray-300 mb-6 border-b border-gray-800 pb-2">KAZANILAN ROZETLER</h2>
          <div className="flex flex-col gap-4">
             {/* Example badges dynamically evaluated */}
             <Badge icon={<ShieldAlert className="w-8 h-8"/>} title="Tam Kaçış" color="text-yellow-500" desc="Tüm 3 odadaki kriz çözüldü." />
             
             {state.wrongAttempts === 0 && (
               <Badge icon={<Cpu className="w-8 h-8"/>} title="Kusursuz Operatör" color="text-blue-500" desc="Sıfır hata ile tamamlandı." />
             )}
             {state.hintsUsed === 0 && (
               <Badge icon={<Search className="w-8 h-8"/>} title="Dedektif" color="text-purple-500" desc="Hiç ipucu kullanılmadı." />
             )}
             {timeTaken < 600 && ( // under 10 mins
               <Badge icon={<Clock className="w-8 h-8"/>} title="Hız Kaçışçısı" color="text-green-500" desc="Çok hızlı tepki süresi." />
             )}
          </div>
        </motion.div>
      </div>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={() => window.location.reload()}
        className="mt-12 font-timer text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-sm border-b border-transparent hover:border-white pb-1 z-10"
      >
        YENİ BİR SİMÜLASYON BAŞLAT
      </motion.button>
    </div>
  );
}

function Badge({ icon, title, desc, color }) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-3 rounded"
    >
      <div className={`p-2 bg-black rounded ${color} shadow-inner bg-zinc-950`}>
        {icon}
      </div>
      <div>
        <h4 className={`font-timer text-lg ${color}`}>{title}</h4>
        <p className="text-gray-500 text-xs font-puzzle">{desc}</p>
      </div>
    </motion.div>
  );
}
