import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { playSound } from './AudioController';

export default function OpeningScene() {
  const { dispatch } = useGame();

  useEffect(() => {
    playSound('alarmIntro');
  }, []);

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Red flashing background */}
      <motion.div
        className="absolute inset-0 bg-red-900/30"
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="z-10 text-center flex flex-col items-center max-w-3xl px-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          <AlertTriangle className="w-32 h-32 text-red-600 mb-6 mx-auto" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold font-timer text-red-500 tracking-widest mb-4 uppercase drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">
          ⚠ ACİL DURUM ⚠
        </h1>
        <h2 className="text-2xl md:text-4xl text-white font-ui font-semibold mb-8">
          EKOLOJİK KRİZ TESPİT EDİLDİ<br />
          <span className="text-red-400">3 BÖLGE — KRİTİK SEVİYE</span>
        </h2>

        <motion.div 
          className="bg-black/50 p-6 border border-gray-800 rounded-lg backdrop-blur-sm mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="font-narrative text-xl text-gray-300 leading-relaxed text-left">
            Göreviniz: Her bölgedeki krizi çöz.<br />
            Bulmacaları zincirleme çöz.<br />
            Kapıyı aç. Kaç.<br /><br />
            <span className="text-white font-bold">Zamanın dolmadan.</span>
          </p>
        </motion.div>

        <motion.button
          onClick={startGame}
          className="px-12 py-6 bg-transparent border-4 border-red-600 text-red-500 font-timer text-3xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          [ GÖREVE BAŞLA ]
        </motion.button>
      </motion.div>
    </div>
  );
}
