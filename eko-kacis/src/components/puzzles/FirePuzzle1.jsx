import { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../AudioController';

export default function FirePuzzle1({ onSolve }) {
  const [rotation, setRotation] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  // GÜNEYDOĞU (SE) = 135 degrees. We give a margin of error of +/- 15 degrees.
  const targetAngle = 135;

  const handleRotate = (amount) => {
    playSound('valveTurn'); // re-use mechanical sound for the dial
    setRotation(prev => (prev + amount + 360) % 360);
  };

  const verifyDirection = () => {
    // Check if current rotation is close to 135
    const diff = Math.abs(rotation - targetAngle);
    const isCorrect = diff <= 15 || diff >= 345;

    if (isCorrect) {
      playSound('puzzleSolve');
      onSolve({ windDirection: 'SE', angle: 135 });
    } else {
      playSound('wrongAttempt');
      setErrorCount(prev => prev + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center relative">
      <div className="absolute top-0 w-full text-center">
        <h3 className="font-timer text-3xl text-orange-500 drop-shadow-[0_0_10px_#FF4500]">RÜZGAR HESAPLAMA SİSTEMİ</h3>
        <p className="font-puzzle text-gray-400 mt-2">METEOROLOJİK İSTASYON VERİSİ</p>
      </div>

      {/* Control Panel */}
      <div className="bg-[#1A0A00] p-8 border-4 border-[#3d1800] rounded-full shadow-[0_0_50px_rgba(255,69,0,0.15)] relative flex items-center justify-center w-80 h-80">
        {/* Dial markers */}
        <div className="absolute inset-0 z-0">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <div 
              key={i} 
              className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className="h-4 w-full bg-orange-900 absolute top-2" />
            </div>
          ))}
        </div>
        
        {/* Cardinal labels */}
        <span className="absolute top-2 font-timer text-red-600 font-bold text-xl">K</span>
        <span className="absolute right-4 font-timer text-orange-600 font-bold text-xl">D</span>
        <span className="absolute bottom-2 font-timer text-orange-600 font-bold text-xl">G</span>
        <span className="absolute left-4 font-timer text-orange-600 font-bold text-xl">B</span>

        {/* The rotating needle */}
        <motion.div 
          className="w-1 h-3/4 bg-red-600 absolute origin-bottom z-10 top-1/8 rounded-t-full shadow-[0_0_10px_#ff0000]"
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{ transformOrigin: "bottom center" }}
        />
        
        {/* Center pin */}
        <div className="w-8 h-8 bg-zinc-800 rounded-full border-2 border-zinc-600 z-20 shadow-xl" />
      </div>

      {/* Instructions & Buttons */}
      <div className="flex flex-col gap-6 max-w-sm">
        <div className="bg-black/60 p-6 border border-orange-900/50 rounded text-gray-300 font-puzzle space-y-4">
          <p className="text-orange-400 font-bold uppercase border-b border-orange-900 pb-2">Analiz Raporu</p>
          <div className="flex justify-between">
            <span>İstasyon 1:</span>
            <span>KUZEY-BATI'DAN ESİYOR</span>
          </div>
          <div className="flex justify-between">
            <span>İstasyon 2:</span>
            <span>BASINÇ DÜŞÜŞÜ GÖZLENDİ</span>
          </div>
          <p className="text-sm text-gray-500 italic mt-4">
            Rüzgar tam tersi yöne doğru ilerleyecektir. Yangının vektörünü ayarlayın.
          </p>
          <p className="text-xs text-orange-800">
            Mevcut Açı: {rotation}°
          </p>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <button onClick={() => handleRotate(-45)} className="w-16 h-16 bg-zinc-800 hover:bg-zinc-700 text-orange-500 font-timer text-2xl rounded-lg border-2 border-zinc-600 shadow-md active:translate-y-1">
            -45
          </button>
          <button onClick={() => handleRotate(-15)} className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 text-orange-400 font-timer text-xl rounded-lg border-2 border-zinc-600 shadow-md active:translate-y-1">
            -15
          </button>
          <button onClick={() => handleRotate(15)} className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 text-orange-400 font-timer text-xl rounded-lg border-2 border-zinc-600 shadow-md active:translate-y-1">
            +15
          </button>
          <button onClick={() => handleRotate(45)} className="w-16 h-16 bg-zinc-800 hover:bg-zinc-700 text-orange-500 font-timer text-2xl rounded-lg border-2 border-zinc-600 shadow-md active:translate-y-1">
            +45
          </button>
        </div>

        <motion.button
          onClick={verifyDirection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 uppercase font-timer text-xl tracking-widest border-2 border-orange-600 text-orange-500 hover:bg-orange-600 hover:text-[#0D0500] transition-colors shadow-[0_0_15px_rgba(255,69,0,0.5)]"
        >
          YÖNÜ ONAYLA
        </motion.button>
        {errorCount > 0 && <p className="text-red-500 text-center font-puzzle animate-pulse">SİSTEM UYARISI: HATALI VEKTÖR GİRİŞİ!</p>}
      </div>
    </div>
  );
}
