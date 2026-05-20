import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { createArenaGame } from '../../arena/ArenaGame';

export default function SnowballArena() {
  const containerRef = useRef(null);
  const gameRef = useRef(null);
  const { state, dispatch } = useGame();
  const [started, setStarted] = useState(false);

  // Her 4 çözülen makine = 1 can, minimum 1, max 12
  const lives = Math.max(1, Math.floor((state.solvedMachines?.length || 0) / 1));
  const solvedCount = state.solvedMachines?.length || 0;

  useEffect(() => {
    if (!started || !containerRef.current) return;
    gameRef.current = createArenaGame('arena-container', lives, () => {
      dispatch({ type: 'SET_SCREEN', screen: 'workshop' });
    });
    return () => { if (gameRef.current) { gameRef.current.destroy(true); gameRef.current = null; } };
  }, [started]);

  if (!started) {
    return (
      <div className="w-full h-full bg-[#0D1B2A] flex items-center justify-center overflow-hidden relative">
        {/* Animasyonlu arka plan noktaları */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({length: 40}).map((_, i) => (
            <motion.div key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
              style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%` }}
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 backdrop-blur-md rounded-2xl p-10 max-w-lg text-center border-2 border-yellow-500/50 shadow-[0_0_60px_rgba(255,215,0,0.2)] z-10"
        >
          {/* Pac-Man animasyonlu ikon */}
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4"
          >
            👾
          </motion.div>

          <h2 className="text-white mb-2" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '18px' }}>
            LABIRENT AVCISI
          </h2>
          <p className="text-yellow-200/80 text-sm mt-3 mb-6 leading-relaxed">
            Çelişki Makinesi'nde çözdüğün her makine sana <strong className="text-red-400">1 can</strong> kazandırdı!
            Labirentteki tüm noktaları topla, hayaletlerden kaç!
          </p>

          <div className="bg-[#1A237E]/60 rounded-xl p-5 mb-6 border border-[#3F51B5]/50">
            <p className="text-blue-300 text-xs mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>CANLARIN</p>
            <div className="text-3xl mb-1">
              {Array.from({length: Math.min(lives, 12)}).map((_, i) => <span key={i}>❤️</span>)}
            </div>
            <p className="text-blue-200/60 text-xs mt-2">
              ({solvedCount} makine çözüldü)
            </p>
          </div>

          {solvedCount > 0 ? (
            <button
              onClick={() => setStarted(true)}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl text-lg transition-all hover:scale-105 shadow-lg"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '14px' }}
            >
              🕹️ OYNA!
            </button>
          ) : (
            <div>
              <p className="text-red-400 mb-4 text-sm">Canın yok! Önce atölyede çelişki çöz.</p>
              <button
                onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'workshop' })}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}
              >
                🔧 ATÖLYEye GİT
              </button>
            </div>
          )}

          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>🎮 WASD veya Yön tuşları ile hareket</p>
            <p>📱 Mobilde kaydırma (swipe) ile yön değiştir</p>
          </div>

          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'workshop' })}
            className="mt-4 text-blue-400 hover:text-white text-xs underline transition-colors"
          >
            ← Atölyeye Dön
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black relative">
      <div id="arena-container" ref={containerRef} className="w-full h-full" />
    </div>
  );
}
