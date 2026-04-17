import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import cases from '../../data/cases';
import soundSynth from '../../utils/soundSynthesizer';

export default function CaseSelection() {
  const { state, dispatch } = useGame();
  const [hoveredCase, setHoveredCase] = useState(null);
  const [showTeacherPrompt, setShowTeacherPrompt] = useState(false);
  const [teacherPin, setTeacherPin] = useState('');

  const caseOrder = ['vaka_247', 'vaka_312', 'vaka_089', 'vaka_401'];

  const handleCaseClick = (caseData) => {
    const status = state.caseStatuses[caseData.id];
    if (status === 'locked') return;
    soundSynth.paperRustle();
    dispatch({ type: 'START_CASE', caseId: caseData.id });
  };

  const getStatusLabel = (caseId) => {
    const status = state.caseStatuses[caseId];
    if (status === 'solved') return { text: 'ÇÖZÜLDÜ', color: '#27AE60' };
    if (status === 'active') return { text: 'AKTİF', color: '#F5A623' };
    return { text: 'KİLİTLİ', color: '#666' };
  };

  const bestTime = state.leaderboard.length > 0
    ? state.leaderboard[0]
    : null;

  const handleTeacherAccess = () => {
    if (teacherPin === '1234') {
      dispatch({ type: 'SET_SCREEN', screen: 'teacherPanel' });
    }
    setTeacherPin('');
    setShowTeacherPrompt(false);
  };

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Masa doku */}
      <div className="absolute inset-0 desk-texture" />
      
      {/* Spotlight */}
      <div className="absolute top-0 right-0 w-[70%] h-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(245,166,35,0.05) 0%, transparent 60%)'
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
      }} />

      {/* İçerik */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        {/* Başlık */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl tracking-[0.3em] mb-2" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
            SORUŞTURMA DOSYALARI
          </h1>
          {state.playerName && (
            <p className="text-sm opacity-40" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
              Savcı {state.playerName}
            </p>
          )}
          {bestTime && (
            <p className="text-xs opacity-30 mt-1" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
              En hızlı çözüm: {bestTime.playerName} — {Math.floor(bestTime.timeSeconds / 60)} dakika
            </p>
          )}
        </motion.div>

        {/* Vaka klasörleri */}
        <div className="grid grid-cols-2 gap-6 max-w-3xl w-full">
          {caseOrder.map((caseId, index) => {
            const caseData = cases.find(c => c.id === caseId);
            if (!caseData) return null;
            const status = state.caseStatuses[caseId];
            const statusLabel = getStatusLabel(caseId);
            const isLocked = status === 'locked';
            const isSolved = status === 'solved';

            return (
              <motion.div
                key={caseId}
                className={`relative cursor-${isLocked ? 'not-allowed' : 'pointer'}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onMouseEnter={() => setHoveredCase(caseId)}
                onMouseLeave={() => setHoveredCase(null)}
                onClick={() => handleCaseClick(caseData)}
              >
                <motion.div
                  className={`file-folder p-5 min-h-[140px] relative ${
                    isLocked ? 'opacity-40' : ''
                  } ${status === 'active' && !isSolved ? 'pulse-glow' : ''}`}
                  whileHover={!isLocked ? { y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.5)' } : {}}
                  whileTap={!isLocked ? { scale: 0.98 } : {}}
                  style={isSolved ? {
                    background: 'linear-gradient(135deg, #1a3a2a 0%, #0d2818 100%)',
                  } : {}}
                >
                  {/* Vaka numarası */}
                  <div className="text-xs tracking-widest opacity-50 mb-1" style={{ fontFamily: 'var(--font-stamp)', color: isLocked || isSolved ? '#999' : '#1A0A00' }}>
                    VAKA #{caseData.caseNumber}
                  </div>
                  
                  {/* Vaka başlığı */}
                  <div className="text-sm font-bold mb-3 leading-tight" style={{ 
                    fontFamily: 'var(--font-typewriter)', 
                    color: isSolved ? '#27AE60' : isLocked ? '#999' : '#1A0A00' 
                  }}>
                    {caseData.title.toUpperCase()}
                  </div>

                  {/* Durum etiketi */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-sm tracking-wider" style={{
                      fontFamily: 'var(--font-stamp)',
                      color: statusLabel.color,
                      border: `1px solid ${statusLabel.color}`,
                      opacity: 0.8
                    }}>
                      {statusLabel.text}
                    </span>
                  </div>

                  {/* Kilit ikonu */}
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-[4px]" style={{
                      background: 'rgba(0,0,0,0.3)'
                    }}>
                      <span className="text-3xl opacity-60">🔒</span>
                    </div>
                  )}

                  {/* Çözüldü damgası */}
                  {isSolved && (
                    <div className="absolute bottom-2 right-2 stamp-ink px-2 py-0.5" style={{
                      border: '2px solid #27AE60',
                      transform: 'rotate(-5deg)'
                    }}>
                      <span className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-stamp)', color: '#27AE60' }}>
                        ÇÖZÜLDÜ
                      </span>
                    </div>
                  )}

                  {/* Belirti */}
                  {!isLocked && (
                    <div className="text-xs opacity-40 mt-2 leading-relaxed" style={{ fontFamily: 'var(--font-evidence)', color: isSolved ? '#aaa' : '#1A0A00' }}>
                      {caseData.symptom}
                    </div>
                  )}
                </motion.div>

                {/* Hover tooltip — kilitli */}
                {isLocked && hoveredCase === caseId && (
                  <motion.div
                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs whitespace-nowrap z-20"
                    style={{
                      background: 'rgba(0,0,0,0.9)',
                      border: '1px solid rgba(245,166,35,0.3)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-evidence)',
                      color: '#F5EDD6'
                    }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Bu vakayı açmak için önceki vakayı çöz
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Öğretmen paneli butonu — gizli */}
      <motion.button
        className="absolute bottom-4 right-4 z-20 opacity-20 hover:opacity-50 cursor-pointer transition-opacity text-lg"
        onClick={() => setShowTeacherPrompt(true)}
        title="Öğretmen Paneli"
      >
        📁
      </motion.button>

      {/* PIN giriş modalı */}
      <AnimatePresence>
        {showTeacherPrompt && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTeacherPrompt(false)}
          >
            <motion.div
              className="paper-texture paper-aged p-6 w-80"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-center text-sm tracking-wider mb-4" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
                ÖĞRETMEN ERİŞİMİ
              </h3>
              <input
                type="password"
                value={teacherPin}
                onChange={(e) => setTeacherPin(e.target.value)}
                placeholder="PIN giriniz"
                className="w-full text-center py-2 bg-transparent outline-none text-xl tracking-[0.5em]"
                style={{
                  fontFamily: 'var(--font-typewriter)',
                  color: '#1A0A00',
                  borderBottom: '2px solid rgba(26,10,0,0.2)'
                }}
                maxLength={4}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleTeacherAccess()}
              />
              <button
                className="w-full mt-4 py-2 text-sm cursor-pointer"
                style={{
                  fontFamily: 'var(--font-stamp)',
                  color: '#F5EDD6',
                  background: '#C0392B',
                  border: 'none',
                  borderRadius: '2px',
                  letterSpacing: '0.1em'
                }}
                onClick={handleTeacherAccess}
              >
                GİRİŞ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kahve lekesi dekor */}
      <div className="coffee-stain" style={{ bottom: '20%', left: '10%', opacity: 0.3 }} />
    </motion.div>
  );
}
