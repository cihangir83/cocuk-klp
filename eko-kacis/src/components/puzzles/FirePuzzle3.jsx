import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../AudioController';

// 5x5 grid
// 0: empty, 1: fire, 2: animal, S: start, E: end
const GRID_STATE = [
  ['S', 0, 1, 0, 0],
  [1,   0, 0, 0, 1],
  [0,   2, 1, 0, 0],
  [0,   1, 2, 1, 0],
  [0,   0, 0, 0, 'E']
];

export default function FirePuzzle3({ onSolve }) {
  const [path, setPath] = useState([{ r: 0, c: 0 }]); // start at [0,0]
  const [errorCell, setErrorCell] = useState(null);

  const isCellInPath = (r, c) => path.some(p => p.r === r && p.c === c);
  
  const handleCellClick = (r, c) => {
    // Cannot click already visited
    if (isCellInPath(r, c)) return;

    // Must be adjacent (up, down, left, right) to the last cell in path
    const last = path[path.length - 1];
    const isAdjacent = (Math.abs(last.r - r) === 1 && last.c === c) || (Math.abs(last.c - c) === 1 && last.r === r);
    
    if (!isAdjacent) return;

    const cellType = GRID_STATE[r][c];

    if (cellType === 1) {
      playSound('wrongAttempt');
      setErrorCell({ r, c });
      setTimeout(() => {
        setPath([{ r: 0, c: 0 }]);
        setErrorCell(null);
      }, 1000);
      return;
    }

    playSound('valveTurn'); // any appropriate click sound
    const newPath = [...path, { r, c }];
    setPath(newPath);

    if (cellType === 'E') {
      // Reached End. Did they rescue both animals?
      // Count animals in path
      let animalsRescued = 0;
      newPath.forEach(p => {
        if (GRID_STATE[p.r][p.c] === 2) animalsRescued++;
      });
      
      const totalAnimals = 2; // based on grid

      if (animalsRescued === totalAnimals) {
        playSound('puzzleSolve');
        onSolve();
      } else {
        // Failed constraint
        playSound('wrongAttempt');
        setErrorCell({ r, c }); // visual marker
        setTimeout(() => {
          setPath([{ r: 0, c: 0 }]);
          setErrorCell(null);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <h3 className="absolute top-0 font-timer text-2xl text-orange-500 drop-shadow-[0_0_10px_#FF4500]">EVAKÜASYON ROTASI</h3>

      <div className="flex flex-col md:flex-row gap-12 items-center z-10 w-full max-w-4xl justify-center pointer-events-auto">
        {/* The Grid */}
        <div className="grid grid-cols-5 gap-2 bg-gray-900 p-4 rounded-xl border-4 border-[#3d1800] shadow-[0_0_30px_rgba(255,69,0,0.2)]">
          {GRID_STATE.map((row, r) => (
            row.map((cell, c) => {
              const inPath = isCellInPath(r, c);
              const isError = errorCell?.r === r && errorCell?.c === c;
              
              let bgColor = 'bg-black border-gray-800';
              let content = '';

              if (cell === 'S') { bgColor = 'bg-blue-900 border-blue-500'; content = 'BAŞLA'; }
              if (cell === 'E') { bgColor = 'bg-green-900 border-green-500'; content = 'ÇIKIŞ'; }
              if (cell === 1) { bgColor = 'bg-red-950 border-red-900'; content = '🔥'; }
              if (cell === 2) { 
                bgColor = inPath ? 'bg-green-800 border-green-400' : 'bg-green-950 border-green-800'; 
                content = '🐾'; 
              }

              if (inPath && cell !== 'S' && cell !== 'E' && cell !== 2) {
                bgColor = 'bg-orange-600 border-orange-400';
              }

              if (isError) {
                bgColor = 'bg-red-600 border-red-500 shadow-[0_0_20px_#ff0000]';
              }

              return (
                <motion.div
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center font-timer text-xs sm:text-base border-2 rounded ${bgColor} cursor-pointer select-none transition-colors duration-200`}
                >
                  {content}
                </motion.div>
              );
            })
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-[#1A0A00] p-6 border border-orange-900 rounded max-w-xs text-gray-300 font-puzzle">
           <h4 className="text-orange-500 font-bold mb-4 uppercase">Görev Talimatları:</h4>
           <ul className="list-disc pl-4 space-y-2 text-sm text-gray-400">
             <li><span className="text-blue-400">Mavi Başlangıç</span> noktasından SARI yolu takip et.</li>
             <li><span className="text-red-500 font-bold">Kırmızı Ateş</span> alanlarından KESİNLİKLE uzak dur. Değdiğin an güzergah çöker.</li>
             <li>Güvenli <span className="text-green-500 font-bold">Yeşil Çıkışa</span> ulaşmadan önce haritadaki tüm <span className="text-green-400">Vahşi Yaşam (🐾)</span> bölgelerini rotana dahil ederek onları tahliye et.</li>
           </ul>
           <button onClick={() => setPath([{ r: 0, c: 0 }])} className="mt-6 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 rounded uppercase font-timer text-sm">Rotayı Sıfırla</button>
        </div>
      </div>
    </div>
  );
}
