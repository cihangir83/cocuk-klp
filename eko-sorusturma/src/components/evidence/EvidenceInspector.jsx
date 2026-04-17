import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useGameHooks';
import { evidenceTypes } from '../../data/evidenceTypes';
import soundSynth from '../../utils/soundSynthesizer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EvidenceInspector({ evidence, onClose, onAddToBoard, isOnBoard }) {
  const [showContent, setShowContent] = useState(false);
  const evType = evidenceTypes[evidence.type] || evidenceTypes.report;

  const { displayText, isComplete } = useTypewriter(
    showContent ? evidence.content : '', 25, 300, showContent
  );

  useEffect(() => {
    setShowContent(true);
  }, []);

  const renderStamp = () => {
    if (!evidence.stampText) return null;
    return (
      <motion.div
        className="absolute top-4 right-4 stamp-animation"
        initial={{ opacity: 0, scale: 2, rotate: -8 }}
        animate={{ opacity: 0.7, scale: 1, rotate: -5 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        <div className="stamp-ink px-3 py-1" style={{
          border: `2px solid ${evidence.stampText.includes('YANILTICI') ? '#E74C3C' : evidence.stampText.includes('KRİTİK') ? '#F39C12' : '#27AE60'}`,
        }}>
          <span className="text-xs tracking-wider" style={{
            fontFamily: 'var(--font-stamp)',
            color: evidence.stampText.includes('YANILTICI') ? '#E74C3C' : evidence.stampText.includes('KRİTİK') ? '#F39C12' : '#27AE60'
          }}>
            {evidence.stampText}
          </span>
        </div>
      </motion.div>
    );
  };

  const renderChart = () => {
    if (!evidence.chartData) return null;
    return (
      <div className="mt-4 p-3" style={{ background: 'rgba(26,10,0,0.03)', borderRadius: '4px' }}>
        <div className="text-[10px] tracking-wider mb-2 opacity-50" style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00' }}>
          {evidence.chartLabel || 'VERİ'}
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={evidence.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,10,0,0.1)" />
            <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#1A0A00' }} />
            <YAxis tick={{ fontSize: 10, fill: '#1A0A00' }} />
            <Tooltip
              contentStyle={{
                background: '#F5EDD6',
                border: '1px solid rgba(26,10,0,0.2)',
                fontFamily: 'var(--font-evidence)',
                fontSize: '11px'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#C0392B"
              strokeWidth={2}
              dot={{ fill: '#C0392B', r: 4 }}
              activeDot={{ r: 6, fill: '#E74C3C' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderWitnessHeader = () => {
    if (evidence.type !== 'witness') return null;
    return (
      <div className="flex items-center gap-3 mb-3 pb-3" style={{ borderBottom: '1px solid rgba(26,10,0,0.1)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
          background: 'rgba(26,10,0,0.08)',
          border: '1px solid rgba(26,10,0,0.1)'
        }}>
          <span className="text-2xl">👤</span>
        </div>
        <div>
          <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-typewriter)', color: '#1A0A00' }}>
            {evidence.witnessName}
          </div>
          <div className="text-[10px] opacity-50" style={{ fontFamily: 'var(--font-evidence)', color: '#1A0A00' }}>
            {evidence.witnessRole}
          </div>
        </div>
      </div>
    );
  };

  const renderPhotoContent = () => {
    if (evidence.type !== 'photo') return null;
    return (
      <div className="mt-3">
        {/* Termal/uydu görsel CSS */}
        <div className="w-full h-48 relative mb-2" style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #1a2a4e 30%, #0d3b2e 60%, #1a4a30 100%)',
          borderRadius: '2px',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
        }}>
          {/* Grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,255,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          {/* Anomali noktaları */}
          {evidence.anomalyAreas?.map((area, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${30 + i * 25}%`,
                left: `${20 + i * 30}%`,
                width: '60px',
                height: '40px',
                border: '1px solid rgba(255,0,0,0.6)',
                borderRadius: '2px'
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="absolute -top-4 left-0 text-[8px] whitespace-nowrap" style={{ color: '#ff4444', fontFamily: 'var(--font-stamp)' }}>
                ANOMALİ
              </div>
            </motion.div>
          ))}
          {/* Koordinat */}
          {evidence.coordinates && (
            <div className="absolute bottom-1 right-2 text-[9px] opacity-40" style={{ color: '#00ff00', fontFamily: 'var(--font-evidence)' }}>
              {evidence.coordinates}
            </div>
          )}
          {/* Tarih */}
          {evidence.date && (
            <div className="absolute top-1 left-2 text-[9px] opacity-40" style={{ color: '#00ff00', fontFamily: 'var(--font-evidence)' }}>
              {evidence.date}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Metin içindeki gizli kelimeleri render et
  const renderContent = () => {
    let text = displayText;
    if (evidence.hiddenWords && isComplete) {
      evidence.hiddenWords.forEach(word => {
        text = text.replace(
          new RegExp(word, 'gi'),
          `<span class="redacted">${word}</span>`
        );
      });
      return <span dangerouslySetInnerHTML={{ __html: `"${text}"` }} />;
    }
    return `"${text}"`;
  };

  const renderHighlightedContent = () => {
    if (!evidence.highlightedLines || evidence.highlightedLines.length === 0) return renderContent();
    const sentences = evidence.content.split('. ');
    if (!isComplete) return `"${displayText}"`;
    return (
      <span>
        "{sentences.map((s, i) => (
          <span key={i}>
            {evidence.highlightedLines.includes(i) ? (
              <span className="highlight-marker">{s}</span>
            ) : s}
            {i < sentences.length - 1 ? '. ' : ''}
          </span>
        ))}"
      </span>
    );
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Kanıt kartı */}
      <motion.div
        className="relative z-10 paper-texture paper-aged w-full max-w-lg max-h-[85vh] overflow-y-auto p-6"
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30 }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: '2px' }}
      >
        {/* Ataş üst */}
        <div className="absolute -top-2 right-12 w-5 h-10 rounded-full" style={{
          border: '2px solid #888',
          borderBottom: 'none',
          background: 'linear-gradient(90deg, #aaa, #ccc, #aaa)'
        }} />

        {/* Kontrol butonları */}
        <div className="flex justify-between items-start mb-4">
          <button
            onClick={onClose}
            className="text-xs opacity-40 hover:opacity-80 cursor-pointer transition-opacity"
            style={{ fontFamily: 'var(--font-stamp)', color: '#1A0A00', letterSpacing: '0.1em' }}
          >
            ✕ KAPAT
          </button>
          {!isOnBoard && (
            <motion.button
              className="px-3 py-1.5 cursor-pointer"
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#F5EDD6',
                background: '#2980B9',
                border: 'none',
                borderRadius: '2px'
              }}
              onClick={onAddToBoard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📌 PANOYA EKLE
            </motion.button>
          )}
          {isOnBoard && (
            <span className="text-[10px] px-2 py-1 opacity-50" style={{
              fontFamily: 'var(--font-stamp)',
              color: '#27AE60',
              border: '1px solid rgba(39,174,96,0.3)',
              borderRadius: '2px'
            }}>
              PANODA ✓
            </span>
          )}
        </div>

        {/* Üst başlık */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{evType.icon}</span>
            <span className="text-[10px] tracking-widest opacity-40" style={{ fontFamily: 'var(--font-stamp)', color: evType.color }}>
              {evType.label.toUpperCase()}
            </span>
          </div>
          <h3 className="text-lg" style={{ fontFamily: 'var(--font-typewriter)', color: '#1A0A00' }}>
            {evidence.title}
          </h3>
          {evidence.date && (
            <div className="text-[10px] mt-1 opacity-40" style={{ fontFamily: 'var(--font-evidence)', color: '#1A0A00' }}>
              Tarih: {evidence.date}
            </div>
          )}
        </div>

        {/* Tanık header */}
        {renderWitnessHeader()}

        {/* İçerik */}
        <div className={`text-sm leading-relaxed ${!isComplete ? 'typewriter-cursor' : ''}`} style={{
          fontFamily: evidence.type === 'witness' ? 'var(--font-typewriter)' : 'var(--font-evidence)',
          color: '#1A0A00',
          lineHeight: '1.8'
        }}>
          {evidence.highlightedLines ? renderHighlightedContent() : renderContent()}
        </div>

        {/* Grafik */}
        {renderChart()}

        {/* Fotoğraf içeriği */}
        {renderPhotoContent()}

        {/* Damga */}
        {renderStamp()}
      </motion.div>
    </motion.div>
  );
}
