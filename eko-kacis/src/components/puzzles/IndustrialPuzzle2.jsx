import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../AudioController';

export default function IndustrialPuzzle2({ puzzleData, onSolve }) {
  const [codeInput, setCodeInput] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [activeClue, setActiveClue] = useState(null);

  const targetChemInfo = puzzleData?.p1Result?.targetChemical || 'CH-7';
  const targetChemVal = puzzleData?.p1Result?.val || '98'; // Defaulting fallback

  const TARGET_CODE = `1408${targetChemVal}`;

  const handleKeyPress = (num) => {
    playSound('buttonPress');
    if (codeInput.length < 6) {
      setCodeInput(prev => prev + num);
    }
  };

  const handleClear = () => {
    playSound('buttonPress');
    setCodeInput('');
  };

  const handleEnter = () => {
    if (codeInput === TARGET_CODE) {
      playSound('doorUnlock');
      setTimeout(() => {
        playSound('puzzleSolve');
        onSolve({ masterOverrideKey: 'ALFA-77' });
      }, 500);
    } else {
      playSound('wrongAttempt');
      setErrorCount(prev => prev + 1);
      setCodeInput('');
    }
  };

  const CLUES = [
    { id: 'calendar', title: 'eski_takvim', content: 'Çarpı atılmış özel günler: 1. Ayın 14. Günü' },
    { id: 'photo', title: 'yirtik_fotograf', content: 'Arkasına not düşülmüş: "Ağustos ayında her şey değişti. O kodun ilk perdesini 08 ile yazmıştık."' },
    { id: 'report', title: 'analiz_raporu', content: `"Bölüm 3 kilit şifresi: Takvim_Tarihi + Ay_Kodu + En_Tehlikeli_Kimyasal_Derecesi"` }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <h3 className="absolute top-0 font-timer text-2xl text-green-500 drop-shadow-[0_0_10px_#7FFF00]">GİZLİ KASA ERİŞİMİ</h3>
      
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl h-full items-center justify-center p-8 z-10">
        
        {/* Environment Clues */}
        <div className="flex-1 flex flex-col gap-4">
          <p className="font-puzzle text-gray-400 mb-2 border-b border-gray-700 pb-2">Odayı İncele - Şüpheli Dosyalar</p>
          {CLUES.map(clue => (
            <motion.button
              key={clue.id}
              onClick={() => { playSound('cableConnect'); setActiveClue(clue); }}
              whileHover={{ x: 10 }}
              className={`p-4 text-left font-puzzle border border-gray-700 rounded transition-colors ${activeClue?.id === clue.id ? 'bg-green-900/30 border-green-500' : 'bg-[#1C1C1A] hover:bg-zinc-800'}`}
            >
              <span className="text-gray-300">📄 {clue.title}.txt</span>
            </motion.button>
          ))}
          
          <div className="mt-8 p-4 bg-black/50 border border-gray-800 rounded">
            <span className="text-xs text-gray-500 block mb-2">NOT DEFTERİ (Önceki bulmacadan gelen):</span>
            <span className="text-green-500 font-puzzle">Sistemdeki En Tehlikeli Kimyasal Tehlike Puanı: %{targetChemVal}</span>
          </div>
        </div>

        {/* Clue Inspector */}
        <AnimatePresence mode="wait">
          {activeClue && (
             <motion.div 
               key={activeClue.id}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full md:w-64 min-h-48 bg-yellow-900/20 border-2 border-yellow-700 p-6 font-narrative text-yellow-200 flex flex-col items-center justify-center text-center rotate-1 shadow-[0_0_20px_rgba(255,255,0,0.05)]"
             >
                <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#1C1C1A] shadow-inner" /> {/* pin */}
                <p className="text-xl leading-relaxed">
                  {activeClue.content}
                </p>
             </motion.div>
          )}
        </AnimatePresence>

        {/* The Safe Keypad */}
        <div className="bg-[#111] p-6 border-4 border-zinc-800 rounded-xl shadow-2xl flex flex-col items-center justify-center z-20">
          <div className="mb-6 w-full h-16 bg-black border-2 border-zinc-700 rounded flex items-center justify-center">
            <span className="font-timer text-3xl text-green-500 tracking-[0.5em] ml-2">
              {codeInput.padEnd(6, '-')}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.button
                key={num}
                onClick={() => handleKeyPress(num.toString())}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-zinc-800 border-b-4 border-zinc-950 rounded text-gray-300 font-timer text-2xl"
              >
                {num}
              </motion.button>
            ))}
            <motion.button
              onClick={handleClear}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-red-900/50 border-b-4 border-red-950 rounded text-red-500 font-timer text-xl"
            >
              CLR
            </motion.button>
            <motion.button
              onClick={() => handleKeyPress('0')}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-zinc-800 border-b-4 border-zinc-950 rounded text-gray-300 font-timer text-2xl"
            >
              0
            </motion.button>
            <motion.button
              onClick={handleEnter}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-green-900/50 border-b-4 border-green-950 rounded text-green-500 font-timer text-xl"
            >
              ENT
            </motion.button>
          </div>

          {errorCount > 0 && <p className="text-red-500 text-xs font-puzzle mt-4 animate-pulse">ERİŞİM REDDEDİLDİ</p>}
        </div>
      </div>
    </div>
  );
}
