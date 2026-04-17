import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../AudioController';

const CHEMICALS = [
  { id: 'C1', name: 'Kurşun Sülfat', danger: 45, visible: false },
  { id: 'C2', name: 'Sodyum Siyanür', danger: 80, visible: false },
  { id: 'C3', name: 'Metil Cıva', danger: 75, visible: false },
  { id: 'C4', name: 'Poliklorlu Bifenil', danger: 60, visible: false },
  { id: 'C5', name: 'Arsenik Trioksit', danger: 85, visible: false },
  { id: 'C6', name: 'Hekzavalent Krom', danger: 98, visible: false, isTarget: true },
  { id: 'C7', name: 'Kadmiyum Klorür', danger: 70, visible: false },
  { id: 'C8', name: 'Atrazin', danger: 55, visible: false },
];

export default function IndustrialPuzzle1({ onSolve }) {
  const [calibration, setCalibration] = useState({ freq: 0, amp: 0 });
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // Target calibration values
  const targetFreq = 75;
  const targetAmp = 40;

  const handleSliderChange = (axis, value) => {
    playSound('valveTurn');
    const newCal = { ...calibration, [axis]: parseInt(value) };
    setCalibration(newCal);

    // Check if calibrated
    if (Math.abs(newCal.freq - targetFreq) < 5 && Math.abs(newCal.amp - targetAmp) < 5) {
      if (!isCalibrated) {
        setIsCalibrated(true);
        playSound('puzzleSolve');
      }
    } else {
      setIsCalibrated(false);
    }
  };

  const handleSelect = (chem) => {
    if (!isCalibrated) return;

    if (chem.isTarget) {
      playSound('puzzleSolve');
      onSolve({ targetChemical: chem.id, val: 98 });
    } else {
      playSound('wrongAttempt');
      setErrorCount(p => p + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center p-4">
      {/* Calibration Panel */}
      <div className="flex-1 bg-[#0A0A08] border-4 border-[#1C1C1A] rounded-xl p-6 relative overflow-hidden h-full max-h-96 flex flex-col">
         {/* Screen effect array */}
         <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
         
         <h3 className="font-timer text-green-500 mb-4 animate-pulse uppercase tracking-widest text-center border-b border-green-900 pb-2">
            Spektrometre Kalibrasyonu
         </h3>

         <div className="flex-1 relative flex items-center justify-center bg-black rounded mb-6 border border-green-900/40 overflow-hidden">
            {/* Visual signal wave */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-60">
              <motion.path 
                d={`M0 50 Q 25 ${50 - calibration.amp} 50 50 T 100 50`}
                stroke="lime"
                strokeWidth="2"
                fill="none"
                animate={{ pathLength: [1, 0] }}
                transition={{ repeat: Infinity, duration: 100 / (calibration.freq || 1), ease: "linear" }}
              />
            </svg>

            {/* Static overlay if not calibrated */}
            <AnimatePresence>
              {!isCalibrated && (
                <motion.div 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/3b/Tv_static.gif')] opacity-20 mix-blend-screen mix-blend-mode"
                />
              )}
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-4 text-center">
              <span className={`font-puzzle text-xs ${isCalibrated ? 'text-green-400' : 'text-red-500'}`}>
                SİNYAL DURUMU: {isCalibrated ? 'STABİL' : 'PARAZİTLİ'}
              </span>
            </div>
         </div>

         {/* Sliders */}
         <div className="flex flex-col gap-4 font-puzzle text-xs text-green-600">
           <div>
             <label className="flex justify-between mb-1">
               <span>FREKANS (MHz)</span>
               <span>{calibration.freq}</span>
             </label>
             <input type="range" min="0" max="100" value={calibration.freq} onChange={(e) => handleSliderChange('freq', e.target.value)} className="w-full h-2 bg-gray-800 rounded appearance-none focus:outline-none accent-green-500" />
           </div>
           <div>
             <label className="flex justify-between mb-1">
               <span>GENLİK (mV)</span>
               <span>{calibration.amp}</span>
             </label>
             <input type="range" min="0" max="100" value={calibration.amp} onChange={(e) => handleSliderChange('amp', e.target.value)} className="w-full h-2 bg-gray-800 rounded appearance-none focus:outline-none accent-green-500" />
           </div>
         </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 bg-[#1C1C1A]/50 border border-green-900/50 p-6 rounded-lg font-puzzle">
         <h3 className="text-green-400 font-bold mb-4 uppercase">Aktif Sızan Kimyasallar Veritabanı</h3>
         <p className="text-gray-400 text-xs mb-4">Talimat: Verileri okunabilir hale getirmek için cihazı kalibre edin ve en tehlikeli sızıntıyı tespit edip sisteme bildirin.</p>
         
         <div className="space-y-2">
            {CHEMICALS.map(chem => (
              <motion.button
                key={chem.id}
                onClick={() => handleSelect(chem)}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(127,255,0,0.1)" }}
                className="w-full flex justify-between p-3 bg-black/40 border border-gray-800 text-left items-center group transition-colors"
                disabled={!isCalibrated}
              >
                <span className="text-gray-300">
                  {isCalibrated ? chem.name : <span className="bg-gray-800 text-transparent">XXXXXX XXXXXX</span>}
                </span>
                <span className={`text-sm ${isCalibrated ? (chem.danger > 90 ? 'text-red-500' : 'text-green-500') : 'text-gray-600'}`}>
                  {isCalibrated ? `Tehlike Derecesi: ${chem.danger}%` : 'Veri Yok'}
                </span>
              </motion.button>
            ))}
         </div>

         {errorCount > 0 && <p className="text-red-500 text-sm mt-4 text-center animate-pulse">HATALI TESPİT!</p>}
      </div>
    </div>
  );
}
