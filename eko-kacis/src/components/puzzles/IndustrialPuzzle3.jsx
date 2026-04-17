import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../AudioController';

const SEQUENCE = ['switch', 'knob', 'button', 'breaker', 'keypad', 'lever', 'master'];

export default function IndustrialPuzzle3({ puzzleData, onSolve }) {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  
  // States for specific UI elements
  const [switchState, setSwitchState] = useState(false); // Soğutucu
  const [knobVal, setKnobVal] = useState(0); // Valf (0 to 100)
  const [breakerOn, setBreakerOn] = useState(true); // Güç Şalteri
  const [keypadInput, setKeypadInput] = useState(''); // Onay Kodu
  const [leverPulled, setLeverPulled] = useState(false); // Acil Durum Kolu

  const handleAction = (stepName) => {
    if (isLocked) return;

    // Check if this step is the next one in the sequence
    const nextWaitIndex = completedSteps.length;
    if (SEQUENCE[nextWaitIndex] === stepName) {
      // Correct step
      playSound('buttonPress');
      const newSteps = [...completedSteps, stepName];
      setCompletedSteps(newSteps);

      if (newSteps.length === SEQUENCE.length) {
        // Complete puzzle
        setTimeout(() => {
          playSound('puzzleSolve');
          onSolve();
        }, 1000);
      }
    } else {
      // Wrong step! Penalty
      playSound('wrongAttempt'); // siren
      setIsLocked(true);
      
      setTimeout(() => {
        // Reset everything
        setCompletedSteps([]);
        setSwitchState(false);
        setKnobVal(0);
        setBreakerOn(true);
        setKeypadInput('');
        setLeverPulled(false);
        setIsLocked(false);
      }, 5000); // 5 sec penalty
    }
  };

  const handleKeypad = (num) => {
    if (keypadInput.length < 3) {
      const newVal = keypadInput + num;
      setKeypadInput(newVal);
      if (newVal.length === 3) {
        if (newVal === '911') {
          handleAction('keypad');
        } else {
          // wrong code triggers fail
          handleAction('wrong_keypad');
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <h3 className="absolute top-0 font-timer text-2xl text-green-500 drop-shadow-[0_0_10px_#7FFF00]">MASTER SİSTEM KAPATMA PROTOKOLÜ</h3>

      <div className="flex flex-col md:flex-row gap-12 text-gray-300 w-full max-w-5xl justify-center z-10 px-8">
        
        {/* Document Panel */}
        <div className="bg-[#1C1C1A] border-l-4 border-yellow-600 p-6 flex flex-col gap-4 font-narrative max-w-xs h-full relative">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-600 rotate-45" />
          <h4 className="text-yellow-600 font-bold border-b border-gray-700 pb-2">SIFIRLAMA PROSEDÜRÜ</h4>
          <ol className="list-decimal pl-5 space-y-4 text-sm text-gray-400">
            <li>Soğutucuyu Aktif Et (Aşırı ısınmayı önle)</li>
            <li>Gaz Valfini Kapalı Konuma (0) Getir</li>
            <li>Acil Durum Kırmızı Butonuna Bas</li>
            <li>Ana Güç Şalterini İndir</li>
            <li>Sistem Onay Kodunu Gir (9-1-1)</li>
            <li>Tahliye Kolunu Çek</li>
            <li>Son olarak, Kasadan aldığınız Onay Anahtarını (ALFA-77) çevirerek Sistemi Kapatın.</li>
          </ol>
          <div className="mt-4 bg-black/50 p-2 font-puzzle text-xs text-red-500 border border-red-900 leading-tight">
            ⚠ UYARI: İşlem sırasındaki herhangi bir hata, güvenlik gereği sistemi 5 saniye kilitler ve işlemi iptal eder.
          </div>
        </div>

        {/* Master Control Board */}
        <div className="flex-1 bg-zinc-900 border-[12px] border-[#1C1C1A] rounded-xl p-8 grid grid-cols-2 md:grid-cols-3 gap-8 relative overflow-hidden shadow-2xl">
          
          <AnimatePresence>
            {isLocked && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-900/60 z-50 flex items-center justify-center mix-blend-color-burn"
              >
                <div className="font-timer text-red-500 text-6xl drop-shadow-[0_0_20px_#ff0000] rotate-12">SİSTEM KİLİTLİ</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1. Toggle Switch */}
          <div className="bg-zinc-800 p-4 border border-zinc-700 rounded flex flex-col items-center justify-center group shadow-inner">
            <span className="font-puzzle text-xs text-gray-400 mb-4 tracking-widest text-center">SOĞUTUCU GÜCÜ</span>
            <div className="relative w-16 h-8 rounded-full bg-black cursor-pointer" onClick={() => {
              setSwitchState(!switchState);
              if (!switchState) handleAction('switch'); else handleAction('wrong_unswitch');
            }}>
              <motion.div 
                className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center border-4 border-black"
                animate={{ x: switchState ? 32 : 0, backgroundColor: switchState ? '#22c55e' : '#9ca3af' }}
              />
            </div>
            <span className={`mt-2 font-timer text-[10px] ${switchState ? 'text-green-500' : 'text-gray-600'}`}>{switchState ? 'AKTİF' : 'PASİF'}</span>
          </div>

          {/* 2. Rotary Knob */}
          <div className="bg-zinc-800 p-4 border border-zinc-700 rounded flex flex-col items-center justify-center shadow-inner">
            <span className="font-puzzle text-xs text-gray-400 mb-4 tracking-widest">GAZ VALFİ</span>
            <div className="w-16 h-16 rounded-full bg-zinc-900 border-4 border-zinc-600 relative cursor-pointer flex items-center justify-center" onClick={() => {
              const newVal = (knobVal + 50) % 150;
              setKnobVal(newVal);
              if (newVal === 0) handleAction('knob');
            }}>
              <motion.div className="w-2 h-6 bg-red-500 absolute top-1 rounded-full" animate={{ rotate: knobVal * 3.6 }} style={{ transformOrigin: "bottom center" }} />
              <div className="w-8 h-8 rounded-full bg-zinc-700 shadow-inner" />
            </div>
            <span className="mt-2 font-puzzle text-xs text-orange-500">{knobVal}%</span>
          </div>

          {/* 3. Button */}
          <div className="bg-zinc-800 p-4 border border-zinc-700 rounded flex flex-col items-center justify-center shadow-inner">
            <span className="font-puzzle text-xs text-gray-400 mb-4 tracking-widest text-center">ACİL UYARI BUTONU</span>
            <motion.button 
              whileTap={{ scale: 0.9, backgroundColor: "#b91c1c" }}
              onClick={() => handleAction('button')}
              className="w-16 h-16 rounded bg-red-600 border-b-8 border-red-800 flex items-center justify-center text-white"
            >
              ⚠
            </motion.button>
          </div>

          {/* 4. Breaker Switch */}
          <div className="bg-zinc-800 p-4 border border-zinc-700 rounded flex flex-col items-center justify-center shadow-inner">
            <span className="font-puzzle text-xs text-gray-400 mb-4 tracking-widest text-center">ANA ŞALTER</span>
            <div className="w-10 h-24 bg-black border-2 border-zinc-700 rounded p-1 cursor-pointer" onClick={() => {
              setBreakerOn(!breakerOn);
              if (breakerOn) handleAction('breaker'); else handleAction('wrong_breaker');
            }}>
              <motion.div 
                className="w-full h-8 bg-gradient-to-b from-gray-500 to-gray-700 rounded border-2 border-gray-400 shadow-[0_2px_4px_black]"
                animate={{ y: breakerOn ? 0 : 50 }}
              />
            </div>
          </div>

          {/* 5. Keypad Mini */}
          <div className="bg-zinc-800 p-4 border border-zinc-700 rounded flex flex-col items-center justify-center shadow-inner">
            <span className="font-puzzle text-xs text-gray-400 mb-2 tracking-widest text-center">ONAY KODU</span>
            <div className="w-full bg-black h-6 mb-2 flex items-center justify-center border border-zinc-600 font-timer text-green-500 text-sm tracking-[0.2em]">{keypadInput.padEnd(3, '-')}</div>
            <div className="grid grid-cols-3 gap-1 w-full">
               {[1,2,3,4,5,6,7,8,9].map(n => (
                 <button key={n} onClick={() => handleKeypad(n)} className="bg-zinc-700 text-xs py-1 rounded hover:bg-zinc-600 active:bg-zinc-500">{n}</button>
               ))}
               <div className="col-start-2"><button onClick={() => handleKeypad(0)} className="w-full bg-zinc-700 text-xs py-1 rounded hover:bg-zinc-600 active:bg-zinc-500">0</button></div>
            </div>
          </div>

          {/* 6. Pull Lever */}
          <div className="bg-zinc-800 p-4 border border-zinc-700 rounded flex flex-col items-center justify-center shadow-inner">
            <span className="font-puzzle text-xs text-gray-400 mb-4 tracking-widest text-center">TAHLİYE KOLU</span>
            <div className="w-16 h-20 border-2 border-yellow-600 rounded bg-black/50 relative overflow-hidden group cursor-pointer" onClick={() => {
              setLeverPulled(true);
              handleAction('lever');
            }}>
               <motion.div 
                 className="absolute inset-x-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#000_10px,#000_20px)] border-y-2 border-yellow-700 shadow-md"
                 animate={{ y: leverPulled ? 64 : 0 }}
                 transition={{ type: "spring" }}
               />
            </div>
          </div>

          {/* 7. Master Key */}
          <div className="col-span-full mt-4 bg-zinc-800 p-6 border-2 border-green-900/50 rounded flex flex-col items-center justify-center shadow-inner relative">
            <span className="font-puzzle text-sm text-gray-300 mb-4 tracking-widest">MASTER KAPATMA BAĞLANTISI</span>
            <motion.button 
              onClick={() => handleAction('master')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[repeating-linear-gradient(-45deg,#15803d,#15803d_15px,#166534_15px,#166534_30px)] text-white font-timer text-xl uppercase tracking-widest rounded-lg border-2 border-white shadow-[0_0_20px_#15803d]"
            >
              Şifre: ALFA-77 (Çevir)
            </motion.button>

            {/* Sequence step indicators */}
            <div className="absolute bottom-2 right-4 flex gap-2">
               {SEQUENCE.map((s, i) => (
                 <div key={s} className={`w-3 h-3 rounded-full border border-gray-600 ${i < completedSteps.length ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-transparent'}`} />
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
