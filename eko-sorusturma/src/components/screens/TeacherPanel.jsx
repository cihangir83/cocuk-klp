import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import cases from '../../data/cases';

export default function TeacherPanel() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState('records');

  const STORAGE_KEY = 'eko_sorusturma_save';

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      playerName: state.playerName,
      solvedCases: state.solvedCases,
      leaderboard: state.leaderboard,
      earnedBadges: state.earnedBadges,
      caseStatuses: state.caseStatuses
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eko_sorusturma_rapor_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'records', label: 'KAYITLAR' },
    { id: 'settings', label: 'AYARLAR' },
    { id: 'cases', label: 'VAKALAR' }
  ];

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(41,128,185,0.03) 0%, transparent 60%)'
      }} />

      <div className="relative z-10 h-full flex flex-col p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl tracking-[0.2em]" style={{ fontFamily: 'var(--font-stamp)', color: '#2980B9' }}>
              ÖĞRETMEN PANELİ
            </h1>
            <div className="text-xs opacity-30 mt-1" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
              Eko Soruşturma Yönetim Sistemi
            </div>
          </div>
          <motion.button
            className="text-xs opacity-40 hover:opacity-80 cursor-pointer"
            style={{ fontFamily: 'var(--font-stamp)', color: '#F5EDD6', letterSpacing: '0.1em' }}
            onClick={() => dispatch({ type: 'GO_TO_CASE_SELECTION' })}
            whileHover={{ scale: 1.05 }}
          >
            ← GERİ DÖN
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className="px-4 py-1.5 text-xs tracking-wider cursor-pointer transition-all"
              style={{
                fontFamily: 'var(--font-stamp)',
                color: activeTab === tab.id ? '#F5EDD6' : 'rgba(245,237,214,0.3)',
                background: activeTab === tab.id ? 'rgba(41,128,185,0.2)' : 'transparent',
                border: `1px solid ${activeTab === tab.id ? 'rgba(41,128,185,0.5)' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '2px'
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* İçerik */}
        <div className="flex-1 overflow-y-auto">
          {/* Kayıtlar */}
          {activeTab === 'records' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-sm tracking-wider" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
                  ÇÖZÜLEN VAKALAR ({state.leaderboard.length})
                </h2>
                <motion.button
                  className="px-3 py-1 text-[10px] cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    color: '#F5EDD6',
                    background: 'rgba(41,128,185,0.2)',
                    border: '1px solid rgba(41,128,185,0.4)',
                    borderRadius: '2px',
                    letterSpacing: '0.1em'
                  }}
                  onClick={handleExportData}
                  whileHover={{ scale: 1.05 }}
                >
                  📥 JSON İNDİR
                </motion.button>
              </div>

              {state.leaderboard.length === 0 ? (
                <div className="text-center py-12 opacity-30" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
                  Henüz çözülmüş vaka yok.
                </div>
              ) : (
                <div className="space-y-3">
                  {state.leaderboard.map((record, i) => {
                    const caseData = cases.find(c => c.id === record.caseId);
                    return (
                      <div key={i} className="p-4" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '4px'
                      }}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs tracking-wider" style={{ fontFamily: 'var(--font-stamp)', color: '#F5A623' }}>
                              {record.playerName}
                            </span>
                            <span className="text-xs opacity-30 ml-2" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
                              — {caseData?.title || record.caseId}
                            </span>
                          </div>
                          <span className="text-[10px] opacity-30" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
                            {new Date(record.solvedAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <div className="flex gap-4 text-[10px] opacity-40" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
                          <span>⏱️ {Math.floor(record.timeSeconds / 60)}dk</span>
                          <span>❌ {record.wrongConnections} yanlış</span>
                          <span>🎯 %{record.accuracy}</span>
                          <span>📋 {record.evidenceCount} kanıt</span>
                        </div>
                        {record.report && (
                          <div className="mt-2 text-[11px] opacity-50 italic" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
                            "{record.report.substring(0, 150)}{record.report.length > 150 ? '...' : ''}"
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Ayarlar */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-4" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '4px'
              }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm tracking-wider" style={{ fontFamily: 'var(--font-stamp)', color: '#F5EDD6' }}>
                      ZAMAN BASKISI
                    </h3>
                    <p className="text-[10px] opacity-30 mt-1" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>
                      Aktifleştirildiğinde vaka süresi kısıtlanır
                    </p>
                  </div>
                  <button
                    className="w-12 h-6 rounded-full relative cursor-pointer transition-all"
                    style={{
                      background: state.timerEnabled ? '#27AE60' : 'rgba(255,255,255,0.1)'
                    }}
                    onClick={() => dispatch({ type: 'TOGGLE_TIMER' })}
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full absolute top-0.5"
                      style={{ background: '#F5EDD6' }}
                      animate={{ left: state.timerEnabled ? '26px' : '2px' }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>

                {state.timerEnabled && (
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-[10px] opacity-40" style={{ fontFamily: 'var(--font-evidence)', color: '#F5EDD6' }}>Süre:</span>
                    {[10, 15, 20, 30].map(d => (
                      <button
                        key={d}
                        className="px-2 py-0.5 text-[10px] cursor-pointer"
                        style={{
                          fontFamily: 'var(--font-stamp)',
                          color: state.timerDuration === d ? '#F5EDD6' : 'rgba(245,237,214,0.3)',
                          background: state.timerDuration === d ? 'rgba(41,128,185,0.3)' : 'transparent',
                          border: `1px solid ${state.timerDuration === d ? 'rgba(41,128,185,0.5)' : 'rgba(255,255,255,0.05)'}`,
                          borderRadius: '2px'
                        }}
                        onClick={() => dispatch({ type: 'SET_TIMER_DURATION', duration: d })}
                      >
                        {d} dk
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <motion.button
                className="px-4 py-2 text-xs cursor-pointer"
                style={{
                  fontFamily: 'var(--font-stamp)',
                  color: '#E74C3C',
                  background: 'rgba(231,76,60,0.1)',
                  border: '1px solid rgba(231,76,60,0.3)',
                  borderRadius: '2px',
                  letterSpacing: '0.1em'
                }}
                onClick={() => {
                  if (window.confirm('Tüm veriler silinecek. Emin misiniz?')) {
                    dispatch({ type: 'RESET_ALL' });
                  }
                }}
                whileHover={{ scale: 1.02 }}
              >
                ⚠️ TÜM VERİLERİ SİL
              </motion.button>
            </div>
          )}

          {/* Vaka yönetimi */}
          {activeTab === 'cases' && (
            <div className="space-y-3">
              {cases.map(c => {
                const status = state.caseStatuses[c.id];
                return (
                  <div key={c.id} className="p-4 flex items-center justify-between" style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '4px'
                  }}>
                    <div>
                      <span className="text-xs tracking-wider" style={{ fontFamily: 'var(--font-stamp)', color: '#F5EDD6' }}>
                        #{c.caseNumber}
                      </span>
                      <span className="text-xs ml-2 opacity-60" style={{ fontFamily: 'var(--font-typewriter)', color: '#F5EDD6' }}>
                        {c.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] px-2 py-0.5" style={{
                        fontFamily: 'var(--font-stamp)',
                        color: status === 'solved' ? '#27AE60' : status === 'active' ? '#F5A623' : '#666',
                        border: `1px solid ${status === 'solved' ? '#27AE60' : status === 'active' ? '#F5A623' : '#333'}`,
                        borderRadius: '2px'
                      }}>
                        {status === 'solved' ? 'ÇÖZÜLDÜ' : status === 'active' ? 'AKTİF' : 'KİLİTLİ'}
                      </span>
                      {status === 'locked' && (
                        <button
                          className="text-[10px] px-2 py-0.5 cursor-pointer"
                          style={{
                            fontFamily: 'var(--font-stamp)',
                            color: '#2980B9',
                            background: 'rgba(41,128,185,0.1)',
                            border: '1px solid rgba(41,128,185,0.3)',
                            borderRadius: '2px'
                          }}
                          onClick={() => dispatch({ type: 'UNLOCK_CASE', caseId: c.id })}
                        >
                          KİLİDİ AÇ
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
