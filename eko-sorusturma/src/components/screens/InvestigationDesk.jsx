import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { useGameTimer } from '../../hooks/useGameHooks';
import soundSynth from '../../utils/soundSynthesizer';
import { evidenceTypes } from '../../data/evidenceTypes';
import EvidenceInspector from '../evidence/EvidenceInspector';

export default function InvestigationDesk() {
  const { state, dispatch, getActiveCase } = useGame();
  const activeCase = getActiveCase();
  const [showTutorial, setShowTutorial] = useState(true);
  const [dragLineEnd, setDragLineEnd] = useState(null);
  const [connectionFeedback, setConnectionFeedback] = useState(null);
  const [shakeEvidence, setShakeEvidence] = useState(null);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);
  const boardRef = useRef(null);
  const evidenceRefs = useRef({});

  const timer = useGameTimer(
    state.timerEnabled && !!state.startTime,
    state.timerDuration
  );

  // Tutorial otomatik kapat
  useEffect(() => {
    if (showTutorial) {
      const t = setTimeout(() => setShowTutorial(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showTutorial]);

  if (!activeCase) return null;

  const collectedEvidences = activeCase.evidences.filter(e =>
    state.collectedEvidence.includes(e.id)
  );

  const boardEvidences = collectedEvidences.filter(e =>
    state.boardEvidence.includes(e.id)
  );

  const poolEvidences = collectedEvidences.filter(e =>
    !state.boardEvidence.includes(e.id)
  );

  const getPinColor = (color) => {
    switch (color) {
      case 'red': return '#E74C3C';
      case 'blue': return '#2980B9';
      case 'gold': return '#F39C12';
      default: return '#2980B9';
    }
  };

  const handleEvidenceClick = (evidenceId) => {
    soundSynth.paperRustle();
    dispatch({ type: 'VIEW_EVIDENCE', evidenceId });
    dispatch({ type: 'INSPECT_EVIDENCE', evidenceId });
  };

  const handleAddToBoard = (evidenceId) => {
    soundSynth.paperRustle();
    dispatch({ type: 'ADD_TO_BOARD', evidenceId });
    dispatch({ type: 'CLOSE_INSPECTION' });
  };

  const handleStartConnection = (evidenceId, e) => {
    e.stopPropagation();
    soundSynth.stringPull();
    dispatch({ type: 'START_CONNECTING', evidenceId });
  };

  const handleEndConnection = (targetId, e) => {
    e.stopPropagation();
    if (!state.connectingFrom || state.connectingFrom === targetId) {
      dispatch({ type: 'CANCEL_CONNECTING' });
      return;
    }

    const prevCollected = [...state.collectedEvidence];
    dispatch({ type: 'MAKE_CONNECTION', from: state.connectingFrom, to: targetId });

    // Feedback kontrolü
    const fromEvidence = activeCase.evidences.find(ev => ev.id === state.connectingFrom);
    const isCorrect = fromEvidence?.connectsTo?.includes(targetId);

    if (isCorrect) {
      soundSynth.stringSnap();
      setConnectionFeedback({ type: 'correct', message: 'BAĞLANTI KURULDU' });
      // Yeni açılan kanıtları kontrol et
      if (fromEvidence?.unlocks) {
        fromEvidence.unlocks.forEach(uid => {
          if (!prevCollected.includes(uid)) {
            setTimeout(() => {
              soundSynth.paperRustle();
              setNewlyUnlocked(uid);
              setTimeout(() => setNewlyUnlocked(null), 2000);
            }, 800);
          }
        });
      }
    } else {
      soundSynth.stringBreak();
      setShakeEvidence(targetId);
      setConnectionFeedback({ type: 'wrong', message: 'Bu bağlantı zayıf. Başka bir açıdan bak.' });
      setTimeout(() => setShakeEvidence(null), 500);
    }
    setTimeout(() => setConnectionFeedback(null), 2500);
  };

  const handleRootConnection = (e) => {
    e.stopPropagation();
    if (!state.connectingFrom) return;
    const fromEvidence = activeCase.evidences.find(ev => ev.id === state.connectingFrom);
    const isCorrect = fromEvidence?.connectsTo?.includes('ROOT');

    if (isCorrect) {
      soundSynth.stringSnap();
      dispatch({ type: 'MAKE_CONNECTION', from: state.connectingFrom, to: 'ROOT' });
      setConnectionFeedback({ type: 'correct', message: 'KÖK NEDEN TESPİT EDİLDİ!' });
    } else {
      soundSynth.stringBreak();
      dispatch({ type: 'MAKE_CONNECTION', from: state.connectingFrom, to: 'ROOT' });
      setConnectionFeedback({ type: 'wrong', message: 'Bu bağlantı zayıf.' });
    }
    setTimeout(() => setConnectionFeedback(null), 2500);
  };

  const cancelConnection = () => {
    dispatch({ type: 'CANCEL_CONNECTING' });
  };

  // Zincir halka doluluk kontrolü
  const isChainFilled = (position) => state.chainProgress.includes(position);

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => state.connectingFrom && cancelConnection()}
    >
      {/* Masa yüzeyi */}
      <div className="absolute inset-0 desk-texture" />

      {/* Spotlight */}
      <div className="absolute top-0 right-0 w-[80%] h-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 75% 25%, rgba(245,166,35,0.06) 0%, transparent 55%)'
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-40" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)'
      }} />

      {/* Zaman baskısı kırmızı pulse */}
      {timer.isCritical && state.timerEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-45"
          animate={{ opacity: [0, 0.05, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ background: '#C0392B' }}
        />
      )}

      {/* Dekoratif kahve lekesi */}
      <div className="coffee-stain" style={{ bottom: '15%', right: '5%', opacity: 0.15 }} />

      {/* Ana layout — 3 kolon */}
      <div className="relative z-10 h-full flex">
        {/* SOL — Kanıt Havuzu */}
        <div className="w-[240px] h-full flex flex-col border-r border-white/5 p-3 overflow-y-auto">
          <div className="text-xs tracking-wider mb-3 text-center opacity-50" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
            KANITLAR ({collectedEvidences.length})
          </div>

          <div className="space-y-2 flex-1">
            {poolEvidences.map((ev, i) => {
              const evType = evidenceTypes[ev.type] || evidenceTypes.report;
              return (
                <motion.div
                  key={ev.id}
                  className="relative cursor-pointer group"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: newlyUnlocked === ev.id ? [1, 1.05, 1] : 1
                  }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => handleEvidenceClick(ev.id)}
                  whileHover={{ x: 4 }}
                >
                  <div className="paper-texture p-3 relative" style={{
                    borderRadius: '2px',
                    boxShadow: '1px 2px 6px rgba(0,0,0,0.3)'
                  }}>
                    {/* Raptiye */}
                    <div className="absolute -top-1.5 right-3 w-3 h-3 rounded-full"
                      style={{ background: getPinColor(ev.pinColor), boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
                    />
                    {/* Tip ikonu */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">{evType.icon}</span>
                      <span className="text-[10px] tracking-wider opacity-40" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
                        {evType.label}
                      </span>
                    </div>
                    <div className="text-xs font-medium leading-tight" style={{ fontFamily: 'var(--font-typewriter)', color: '#1A0A00' }}>
                      {ev.title}
                    </div>
                    {/* Yeni kanıt parıltısı */}
                    {newlyUnlocked === ev.id && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none rounded-sm"
                        style={{ border: '2px solid #F39C12', borderRadius: '2px' }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 2 }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Panoya ekle notu */}
          {poolEvidences.length > 0 && (
            <div className="text-[10px] text-center mt-2 opacity-25" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
              Kanıtı tıkla → incele → panoya ekle
            </div>
          )}
        </div>

        {/* ORTA — Soruşturma Panosu */}
        <div className="flex-1 h-full relative p-4" ref={boardRef}>
          <div className="w-full h-full cork-texture rounded relative overflow-hidden" style={{
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 2px 10px rgba(0,0,0,0.3)'
          }}>
            {/* Pano başlık */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
              <div className="text-xs tracking-[0.3em] opacity-40" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
                SORUŞTURMA PANOSU
              </div>
            </div>

            {/* SVG bağlantı ipleri */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {state.connections.filter(c => c.correct).map((conn, i) => {
                const fromEl = evidenceRefs.current[conn.from];
                const toEl = conn.to === 'ROOT' ? null : evidenceRefs.current[conn.to];
                if (!fromEl) return null;
                const boardEl = boardRef.current?.querySelector('.cork-texture');
                if (!boardEl) return null;
                const boardRect = boardEl.getBoundingClientRect();
                const fromRect = fromEl.getBoundingClientRect();
                const x1 = fromRect.left + fromRect.width / 2 - boardRect.left;
                const y1 = fromRect.top + fromRect.height / 2 - boardRect.top;
                let x2, y2;
                if (toEl) {
                  const toRect = toEl.getBoundingClientRect();
                  x2 = toRect.left + toRect.width / 2 - boardRect.left;
                  y2 = toRect.top + toRect.height / 2 - boardRect.top;
                } else {
                  x2 = x1 + 50;
                  y2 = y1 + 50;
                }
                return (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#E74C3C"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 0.6 }}
                  />
                );
              })}
            </svg>

            {/* Panodaki kanıtlar */}
            <div className="absolute inset-0 p-6 pt-8">
              <div className="flex flex-wrap gap-4 justify-center items-start">
                {boardEvidences.map((ev, i) => {
                  const evType = evidenceTypes[ev.type] || evidenceTypes.report;
                  const isConnecting = state.connectingFrom === ev.id;
                  const hasConnection = state.connections.some(c =>
                    (c.from === ev.id || c.to === ev.id) && c.correct
                  );
                  return (
                    <motion.div
                      key={ev.id}
                      ref={(el) => { evidenceRefs.current[ev.id] = el; }}
                      className={`relative cursor-pointer group ${shakeEvidence === ev.id ? 'animate-shake' : ''}`}
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{
                        scale: 1,
                        rotate: (i % 3 - 1) * 3,
                        x: shakeEvidence === ev.id ? [0, -5, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      onClick={(e) => {
                        if (state.connectingFrom && state.connectingFrom !== ev.id) {
                          handleEndConnection(ev.id, e);
                        } else {
                          handleEvidenceClick(ev.id);
                        }
                      }}
                      style={{ maxWidth: '160px' }}
                    >
                      {/* Raptiye */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-20"
                        style={{
                          background: hasConnection ? '#F39C12' : getPinColor(ev.pinColor),
                          boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
                        }}
                      />
                      <div className="paper-texture p-3 pt-4 relative" style={{
                        borderRadius: '1px',
                        boxShadow: '2px 3px 8px rgba(0,0,0,0.3)',
                        transform: `rotate(${(i % 3 - 1) * 2}deg)`
                      }}>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs">{evType.icon}</span>
                          <span className="text-[9px] tracking-wider opacity-40" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
                            {evType.label}
                          </span>
                        </div>
                        <div className="text-[11px] leading-tight" style={{ fontFamily: 'var(--font-typewriter)', color: '#1A0A00' }}>
                          {ev.title}
                        </div>

                        {/* Bağlantı başlatma noktası */}
                        <motion.button
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                          style={{
                            background: isConnecting ? '#F39C12' : '#E74C3C',
                            border: '2px solid rgba(0,0,0,0.3)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                          onClick={(e) => handleStartConnection(ev.id, e)}
                          whileHover={{ scale: 1.3 }}
                          title="Bağlantı kur — sürükle"
                        />
                      </div>
                    </motion.div>
                  );
                })}

                {/* Boş pano mesajı */}
                {boardEvidences.length === 0 && (
                  <div className="flex items-center justify-center w-full h-48 opacity-20">
                    <div className="text-center" style={{ fontFamily: 'var(--font-typewriter)', color: '#1A0A00' }}>
                      <div className="text-3xl mb-2">📌</div>
                      <div className="text-sm">Kanıtları buraya ekle</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ — 5 Neden Zinciri */}
        <div className="w-[220px] h-full flex flex-col border-l border-white/5 p-3 overflow-y-auto">
          <div className="text-xs tracking-wider mb-3 text-center opacity-50" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
            5 NEDEN ZİNCİRİ
          </div>

          {/* Belirti */}
          <div className="mb-2 px-2 py-2 text-center" style={{
            background: 'rgba(245,166,35,0.1)',
            border: '1px solid rgba(245,166,35,0.2)',
            borderRadius: '2px'
          }}>
            <div className="text-[10px] tracking-wider opacity-50 mb-1" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
              BELİRTİ
            </div>
            <div className="text-[11px] leading-tight" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
              {activeCase.symptom}
            </div>
          </div>

          {/* Zincir halkaları */}
          <div className="flex-1 flex flex-col items-center gap-1">
            {activeCase.chainLinks.map((link, i) => {
              const filled = isChainFilled(link.position || (i + 1));
              const isRoot = link.rootCause;
              const isNext = !filled && (i === 0 || isChainFilled(activeCase.chainLinks[i - 1]?.position || i));

              return (
                <div key={i} className="flex flex-col items-center w-full">
                  {/* Ok */}
                  <div className="text-xs opacity-30 my-1" style={{ color: '#F5A623' }}>↓</div>

                  {/* Halka */}
                  <motion.div
                    className={`w-full px-3 py-2 text-center relative ${isNext && !filled ? 'chain-pulse' : ''}`}
                    style={{
                      background: filled
                        ? 'rgba(243,156,18,0.15)'
                        : isRoot
                          ? 'rgba(192,57,43,0.1)'
                          : 'rgba(255,255,255,0.03)',
                      border: filled
                        ? '2px solid #F39C12'
                        : isRoot
                          ? '2px solid rgba(192,57,43,0.4)'
                          : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px'
                    }}
                    animate={filled ? { scale: [1, 1.03, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    onClick={isRoot && state.connectingFrom ? handleRootConnection : undefined}
                  >
                    {isRoot && (
                      <div className="text-[9px] tracking-wider mb-0.5" style={{
                        fontFamily: 'var(--font-stamp)',
                        color: filled ? '#F39C12' : '#C0392B',
                        opacity: 0.7
                      }}>
                        KÖK NEDEN
                      </div>
                    )}
                    <div className="text-[11px] leading-tight" style={{
                      fontFamily: 'var(--font-typewriter)',
                      color: filled ? '#F5EDD6' : 'rgba(245,237,214,0.3)'
                    }}>
                      {filled ? link.answer : (
                        <span>
                          <span className="text-base">?</span>
                          <br />
                          <span className="text-[9px] opacity-50" style={{ fontFamily: 'var(--font-evidence)' }}>
                            {link.question}
                          </span>
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alt Araç Çubuğu */}
      <div className="absolute bottom-0 left-0 right-0 h-10 z-30 flex items-center justify-between px-4" style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)'
      }}>
        <div className="flex items-center gap-6">
          <span className="text-xs opacity-40" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
            📋 Kanıtlar: {state.collectedEvidence.length}
          </span>
          <span className="text-xs opacity-40" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
            🔗 Bağlantılar: {state.connections.filter(c => c.correct).length}
          </span>
          {state.timerEnabled && (
            <span className={`text-xs ${timer.isCritical ? 'text-red-500' : 'opacity-40'}`} style={{ fontFamily: 'var(--font-evidence)', color: timer.isCritical ? '#E74C3C' : '#F5EDD6' }}>
              ⏱️ {timer.formatTime(state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0)}
            </span>
          )}
        </div>
        <motion.button
          className="text-xs opacity-40 hover:opacity-80 cursor-pointer transition-opacity"
          style={{ fontFamily: 'var(--font-stamp)', color: '#F5EDD6', letterSpacing: '0.1em' }}
          onClick={() => {
            soundSynth.fileClose();
            dispatch({ type: 'GO_TO_CASE_SELECTION' });
          }}
          whileHover={{ scale: 1.05 }}
        >
          DOSYAYI KAPAT
        </motion.button>
      </div>

      {/* Bağlantı aktif göstergesi */}
      <AnimatePresence>
        {state.connectingFrom && (
          <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5"
            style={{
              background: 'rgba(231,76,60,0.15)',
              border: '1px solid rgba(231,76,60,0.4)',
              borderRadius: '2px'
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="text-xs" style={{ fontFamily: 'var(--font-typewriter)', color: '#E74C3C' }}>
              🔴 Bağlantı noktası seç — veya tıkla iptal et
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bağlantı feedback */}
      <AnimatePresence>
        {connectionFeedback && (
          <motion.div
            className="absolute top-14 left-1/2 -translate-x-1/2 z-50"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
          >
            <div className={`stamp-ink px-4 py-2 ${connectionFeedback.type === 'correct' ? '' : ''}`} style={{
              border: `2px solid ${connectionFeedback.type === 'correct' ? '#27AE60' : '#C0392B'}`,
              background: connectionFeedback.type === 'correct' ? 'rgba(39,174,96,0.1)' : 'rgba(192,57,43,0.1)'
            }}>
              <span className="text-xs tracking-wider" style={{
                fontFamily: 'var(--font-stamp)',
                color: connectionFeedback.type === 'correct' ? '#27AE60' : '#C0392B'
              }}>
                {connectionFeedback.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tutorial */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 px-6 py-3 max-w-sm text-center"
            style={{
              background: 'rgba(0,0,0,0.85)',
              border: '1px solid rgba(245,166,35,0.3)',
              borderRadius: '4px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="text-xs" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
              Dosyaları aç, kanıtları panoya ekle, aralarında bağlantıları kur. Kök nedeni bul.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanıt İnceleme */}
      <AnimatePresence>
        {state.inspectingEvidenceId && (
          <EvidenceInspector
            evidence={activeCase.evidences.find(e => e.id === state.inspectingEvidenceId)}
            onClose={() => dispatch({ type: 'CLOSE_INSPECTION' })}
            onAddToBoard={() => handleAddToBoard(state.inspectingEvidenceId)}
            isOnBoard={state.boardEvidence.includes(state.inspectingEvidenceId)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
