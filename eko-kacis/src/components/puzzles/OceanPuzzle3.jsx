import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../AudioController';

const BOTTLES = [
  { id: 'b1', name: 'Alkali Baz (pH+)', color: '#3b82f6', hint: 'pH 4.2 yi nötrler' }, // blue
  { id: 'b2', name: 'O2 Katalizör', color: '#22c55e', hint: 'Oksijeni artırır' }, // green
  { id: 'b3', name: 'Sülfürik Asit', color: '#eab308', hint: 'Yanlış kimyasal' }, // yellow
  { id: 'b4', name: 'Plastik Çözelti', color: '#a855f7', hint: '%89 Plastiği parçalar' }, // purple
  { id: 'b5', name: 'Endotermik Tuz', color: '#ef4444', hint: 'Sıcaklığı 24 e çeker' }, // red
];

// Target order: Blue (pH), Green (Oxygen), Purple (Plastic), Red (Temp)
// 4 correct ingredients need to be mixed
const TARGET_INGREDIENTS = ['b1', 'b2', 'b4', 'b5'];

export default function OceanPuzzle3({ puzzleData, onSolve }) {
  const [mixed, setMixed] = useState([]);
  const [error, setError] = useState(false);
  const tubeRef = useRef(null);

  const safeCode = puzzleData?.p2Result?.safeCode || '7294';

  const handleDragEnd = (e, info, bottle) => {
    // Check collision with tube
    if (!tubeRef.current) return;
    const tubeRect = tubeRef.current.getBoundingClientRect();
    const dropRect = { 
      x: info.point.x, 
      y: info.point.y 
    };

    if (
      dropRect.x >= tubeRect.left &&
      dropRect.x <= tubeRect.right &&
      dropRect.y >= tubeRect.top &&
      dropRect.y <= tubeRect.bottom
    ) {
      // Bottle dropped in tube
      if (mixed.includes(bottle.id)) return; // Already mixed this one
      
      if (!TARGET_INGREDIENTS.includes(bottle.id)) {
        // Wrong bottle! Start over
        playSound('wrongAttempt');
        setError(true);
        setTimeout(() => {
          setMixed([]);
          setError(false);
        }, 1500);
      } else {
        // Correct bottle
        playSound('waterDrop'); // Fallback or distinct drop sound
        const newMixed = [...mixed, bottle.id];
        setMixed(newMixed);

        if (newMixed.length === TARGET_INGREDIENTS.length) {
          // Solved!
          setTimeout(() => {
            playSound('puzzleSolve');
            onSolve();
          }, 1000);
        }
      }
    }
  };

  // Mix colors for the visual liquid
  const getMixColor = () => {
    if (mixed.length === 0) return 'transparent';
    if (mixed.length === 1) return BOTTLES.find(b => b.id === mixed[0]).color;
    // Just a placeholder visual: if solved return correct color, else blend
    if (mixed.length === TARGET_INGREDIENTS.length) return '#00ffcc'; // Clear ocean blue
    return '#475569'; // murky blending
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <h3 className="absolute top-0 font-timer text-2xl text-[#0077BE]">KİMYASAL NÖTRALİZASYON</h3>

      <div className="flex gap-16 items-end justify-center w-full max-w-4xl h-96">
        {/* Bottles Shelf */}
        <div className="flex gap-6 p-4 border-b-8 border-gray-800">
          {BOTTLES.map((bottle) => {
            const isUsed = mixed.includes(bottle.id);
            return (
              <motion.div
                key={bottle.id}
                drag={!isUsed && !error}
                dragSnapToOrigin
                onDragEnd={(e, info) => handleDragEnd(e, info, bottle)}
                className={`w-16 h-32 rounded-t-lg rounded-b border-2 border-white/50 relative cursor-grab active:cursor-grabbing ${isUsed ? 'opacity-30' : 'opacity-100'}`}
                style={{ backgroundColor: bottle.color + '80' }} // added transparency
                whileHover={{ y: -5 }}
                whileDrag={{ scale: 1.1, zIndex: 50, rotate: 10 }}
              >
                <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ backgroundColor: bottle.color }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-puzzle text-xs text-white bg-black/50 px-1 whitespace-nowrap">
                  {bottle.name}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Test Tube */}
        <div className="flex flex-col items-center gap-4">
          <div ref={tubeRef} className="w-24 h-64 border-4 border-t-0 border-white/50 rounded-b-3xl relative overflow-hidden bg-white/5">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-yellow-400 mix-blend-color-burn"
                />
              )}
            </AnimatePresence>
            
            {/* Liquid inside */}
            <motion.div
              className="absolute bottom-0 inset-x-0 rounded-b-2xl transition-colors duration-500"
              animate={{ 
                height: `${(mixed.length / 4) * 100}%`,
                backgroundColor: error ? '#eab308' : getMixColor()
              }}
            />
            {/* Liquid Bubbles (CSS) */}
            {mixed.length > 0 && !error && (
              <motion.div 
                className="absolute bottom-4 left-4 w-2 h-2 bg-white/50 rounded-full"
                animate={{ y: [0, -100, 0], x: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </div>
          <span className="font-puzzle text-gray-400">DENEY TÜPÜ</span>
        </div>
      </div>

      <div className="absolute bottom-8 font-puzzle text-gray-400 bg-black/50 p-6 border border-gray-800 rounded flex flex-col gap-2 max-w-xl">
        <p className="text-[#0077BE]">Kasa Şifresi: {safeCode}</p>
        <p>"Kasanın içinden çıkan raporda yazılanlar:</p>
        <p className="text-gray-300">
          - 1.1 Haritadaki oksijen eksikliğini yeşil katalizörle dengele.<br/>
          - Bulduğumuz koordinattaki Yüksek pH, Asit ile değil BAZ ile kırılmalıdır.<br/>
          - Suyun sıcaklığı 24 dereceye (kırmızı kimyasal) düşmeden plastikler sıvı içinde çözünmez.
        </p>
      </div>
    </div>
  );
}
