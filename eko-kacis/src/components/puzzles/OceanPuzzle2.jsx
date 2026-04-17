import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../AudioController';

export default function OceanPuzzle2({ puzzleData, onSolve }) {
  const [valves, setValves] = useState([
    { id: 1, rotation: 0, status: 'closed' }, // closed | open | error
    { id: 2, rotation: 0, status: 'closed' },
    { id: 3, rotation: 0, status: 'closed' },
    { id: 4, rotation: 0, status: 'closed' },
    { id: 5, rotation: 0, status: 'closed' },
    { id: 6, rotation: 0, status: 'closed' },
  ]);
  
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [isBursting, setIsBursting] = useState(false);
  const targetSequence = puzzleData?.p1Result?.valveCode || [1, 2, 3, 4, 5, 6];

  const handleValveClick = (id) => {
    if (isBursting) return;
    
    // Find index of clicked valve
    const valveObj = valves.find(v => v.id === id);
    if (valveObj.status === 'open') return; // already open
    
    // Check if it's correct according to the target sequence
    if (id === targetSequence[sequenceIndex]) {
      // Correct!
      playSound('valveTurn');
      setValves(prev => prev.map(v => v.id === id ? { ...v, rotation: v.rotation + 90, status: 'open' } : v));
      setPressure((sequenceIndex + 1) * (100 / 6));
      setSequenceIndex(prev => prev + 1);

      if (sequenceIndex + 1 === targetSequence.length) {
        // Solved
        setTimeout(() => {
          playSound('puzzleSolve');
          onSolve({ safeCode: '7294' });
        }, 1000);
      }
    } else {
      // Wrong sequence! Pipe bursts
      playSound('wrongAttempt');
      setIsBursting(true);
      setValves(prev => prev.map(v => v.id === id ? { ...v, rotation: v.rotation + 45, status: 'error' } : v));
      setPressure(120); // Overflow pressure
      
      setTimeout(() => {
        // Reset everything
        setValves(prev => prev.map(v => ({ ...v, rotation: 0, status: 'closed' })));
        setSequenceIndex(0);
        setPressure(0);
        setIsBursting(false);
      }, 1500);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <h3 className="absolute top-0 font-timer text-2xl text-[#0077BE]">ANA BASINÇ SİSTEMİ</h3>
      
      {/* Pressure Gauge */}
      <div className="absolute left-8 top-1/4 w-12 h-64 border-4 border-gray-700 bg-black rounded-full overflow-hidden flex flex-col justify-end">
        <motion.div 
          className="w-full"
          animate={{ 
            height: `${Math.min(pressure, 100)}%`,
            backgroundColor: pressure > 100 ? '#ef4444' : '#0077BE' 
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 flex flex-col justify-between py-2 items-center text-xs font-puzzle text-gray-500 pointer-events-none">
          <span>MAX</span>
          <span>50</span>
          <span>MIN</span>
        </div>
      </div>

      {/* Burst Effect overlay */}
      <AnimatePresence>
        {isBursting && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.8 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-red-900/40 z-0 mix-blend-screen pointer-events-none"
           />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-16 z-10 p-12 bg-gray-900/50 rounded-xl border border-gray-700 backdrop-blur-md">
        {valves.map(valve => (
          <div key={valve.id} className="flex flex-col items-center gap-4">
            <span className="font-timer text-gray-400">VANA {valve.id}</span>
            <motion.div
              animate={{ rotate: valve.rotation }}
              transition={{ type: "spring", stiffness: 100 }}
              onClick={() => handleValveClick(valve.id)}
              className="w-24 h-24 rounded-full relative cursor-pointer"
            >
              {/* Valve visual */}
              <div className="absolute inset-0 rounded-full border-8 border-gray-600 bg-gray-800 shadow-inner" />
              <div className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 bg-gray-500 rounded" />
              <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-gray-500 rounded" />
              <div className="absolute inset-0 max-w-8 max-h-8 m-auto bg-gray-700 rounded-full border-2 border-gray-600" />
            </motion.div>
            
            {/* Status light */}
            <div className={`w-4 h-4 rounded-full shadow-inner ${
              valve.status === 'open' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 
              valve.status === 'error' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 
              'bg-gray-700'
            }`} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 font-puzzle text-gray-400 bg-black/50 p-4 border border-gray-800 rounded">
        NOT DEFTERİ: "C-3 koordinatı verilerinden kurtarılan manuel işlem sırası: {targetSequence.join(' - ')}"
      </div>
    </div>
  );
}
