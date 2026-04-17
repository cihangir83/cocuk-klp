import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../AudioController';

const LEFT_NODES = [
  { id: 'A', label: 'ANA GÜÇ' },
  { id: 'B', label: 'YEDEK BATARYA' },
  { id: 'C', label: 'POMPA RÖLESİ' },
  { id: 'D', label: 'GÜNEYDOĞU HATTI' } // Puzzle 1 gives SE direction
];

const RIGHT_NODES = [
  { id: '1', label: 'KUZEY POMPASI' },
  { id: '2', label: 'DOĞU POMPASI' },
  { id: '3', label: 'GÜNEY POMPASI' },
  { id: '4', label: 'BİRLEŞTİRİCİ' }
];

// Target mapping for correct activation: 
// The wind is heading SE (fromNW), so we need to pump water to SE (Güney Pompası and Doğu Pompası).
// For simplicity in this logic puzzle: 
// A -> 4 (Ana güç to Birleştirici)
// B -> 3 (Yedek to Güney)
// C -> 1 (Röle to Kuzey just as a sink)
// D -> 2 (Güneydoğu hattı to Doğu Pompası)
const TARGET_CONNECTIONS = {
  'A': '4',
  'B': '3',
  'C': '1',
  'D': '2'
};

export default function FirePuzzle2({ puzzleData, onSolve }) {
  const [connections, setConnections] = useState({}); // { 'A': '4', ... }
  const [activeNode, setActiveNode] = useState(null); // Node ID currently selected from Left
  const [spark, setSpark] = useState(null); // null or node ID that sparked
  
  const windDir = puzzleData?.p1Result?.windDirection || 'SE';

  const handleLeftClick = (id) => {
    playSound('buttonPress');
    setActiveNode(id);
    // If it was already connected, remove the connection
    if (connections[id]) {
      const newConn = { ...connections };
      delete newConn[id];
      setConnections(newConn);
    }
  };

  const handleRightClick = (id) => {
    if (!activeNode) return;
    
    // Check if right node is already connected
    if (Object.values(connections).includes(id)) {
      playSound('wrongAttempt');
      return; // Can't connect multiple to one right node
    }

    playSound('cableConnect');
    const newConn = { ...connections, [activeNode]: id };
    
    // Check if this specific connection is wrong immediately? Or wait till all 4?
    // Let's say immediate feedback.
    if (TARGET_CONNECTIONS[activeNode] !== id) {
      // Wrong connection! Spark!
      playSound('wrongAttempt'); // spark sound
      setSpark(id);
      setTimeout(() => setSpark(null), 800);
      setActiveNode(null);
    } else {
      // Correct single connection!
      setConnections(newConn);
      setActiveNode(null);

      // Check if all are connected
      if (Object.keys(newConn).length === 4) {
        setTimeout(() => {
          playSound('puzzleSolve');
          onSolve({ waterSourceCoords: [38.4, -120.5] }); // generic coordinates for next puzzle
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <h3 className="font-timer text-2xl text-orange-500 mb-8 z-10 pt-4">SU POMPASI DEVRESİ SİSTEM 2</h3>
      
      <div className="w-full max-w-4xl flex-1 relative flex items-center justify-between px-12 z-10 border-4 border-gray-800 bg-gray-900/60 rounded-xl p-8 backdrop-blur-md">
        
        {/* LEFT NODES */}
        <div className="flex flex-col gap-12">
          {LEFT_NODES.map(node => {
            const isConnected = !!connections[node.id];
            const isActive = activeNode === node.id;
            return (
              <div key={node.id} className="flex items-center gap-4">
                <div className="text-gray-400 font-puzzle text-sm text-right w-32 uppercase tracking-wide">
                  {node.label}
                </div>
                <button
                  onClick={() => handleLeftClick(node.id)}
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors relative
                    ${isActive ? 'border-orange-500 bg-orange-900/50 shadow-[0_0_15px_#FF4500]' : 
                      isConnected ? 'border-blue-500 bg-blue-900/50' : 'border-gray-500 bg-gray-800 hover:bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-blue-400 shadow-[0_0_10px_#60a5fa]' : 'bg-gray-600'}`} />
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 rounded-full border border-orange-500"
                      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* CONNECTION VISUALS (Simplified SVG lines would be complex without fixed refs, so we use a conceptual visual) */}
        <div className="flex-1 h-full flex flex-col items-center justify-center opacity-30 text-gray-400 font-puzzle pointer-events-none">
          {'>>>> ELEKTRİK AKIŞ ALANI >>>>'}
          {Object.keys(connections).map(c => (
            <div key={c} className="mt-2 text-blue-400 animate-pulse">
              {c} BAĞLI: {connections[c]}
            </div>
          ))}
        </div>

        {/* RIGHT NODES */}
        <div className="flex flex-col gap-12">
          {RIGHT_NODES.map(node => {
            const isConnected = Object.values(connections).includes(node.id);
            const isSparking = spark === node.id;
            return (
              <div key={node.id} className="flex items-center gap-4">
                <button
                  onClick={() => handleRightClick(node.id)}
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors relative
                    ${isSparking ? 'border-red-500 bg-red-900 shadow-[0_0_30px_#ff0000]' :
                      isConnected ? 'border-blue-500 bg-blue-900/50' : 'border-gray-500 bg-gray-800 hover:bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-blue-400 shadow-[0_0_10px_#60a5fa]' : isSparking ? 'bg-red-400' : 'bg-gray-600'}`} />
                  {isSparking && (
                    <motion.div 
                      className="absolute inset-x-[-20px] h-1 bg-yellow-400"
                      initial={{ scaleX: 0, opacity: 1 }}
                      animate={{ scaleX: 2, opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </button>
                <div className="text-gray-400 font-puzzle text-sm text-left w-32 uppercase tracking-wide">
                  {node.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 font-puzzle text-gray-400 bg-black/50 p-4 border border-red-900/50 rounded">
        NOT DEFTERİ: "Rüzgar {windDir} yönünde. Suyu o istikametteki pompalara basmalıyız."
      </div>
    </div>
  );
}
