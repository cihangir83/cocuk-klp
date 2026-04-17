import React, { useState, useEffect } from 'react';
import { Gavel, Lock, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeacherPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      const data = JSON.parse(localStorage.getItem('fono-komitesi-runs') || '[]');
      setRuns(data);
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
    } else {
      alert("Hatalı PIN");
      setPin('');
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(runs, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "fono-komitesi-export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-black/50 border border-gray-700 rounded-full text-gray-500 hover:text-white hover:bg-black transition-colors z-50 shadow-lg group"
      >
        <Gavel size={20} />
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity font-['Share_Tech_Mono'] whitespace-nowrap">
          Öğretmen Paneli
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-96 bg-[var(--color-bg-room)] border-l border-[var(--color-glass-border)] shadow-2xl z-50 flex flex-col font-['Inter']"
          >
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/60">
              <h2 className="text-[var(--color-accent-gold)] font-bold font-['Rajdhani'] tracking-widest flex items-center gap-2">
                <Gavel size={18} /> ÖĞRETMEN PANELİ
              </h2>
              <button onClick={() => { setIsOpen(false); setIsAuthenticated(false); setPin(''); }} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <Lock size={48} className="text-gray-600 mb-6" />
                <h3 className="mb-4 text-gray-300 font-['Share_Tech_Mono']">Yetkili Girişi Gerekli</h3>
                <form onSubmit={handleLogin} className="w-full">
                  <input 
                    type="password" 
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="PIN"
                    className="w-full bg-black/50 border border-gray-700 text-center py-2 mb-4 focus:outline-none focus:border-[var(--color-accent-gold)]"
                    autoFocus
                  />
                  <button className="w-full bg-[var(--color-bg-glass)] border border-gray-600 hover:border-[var(--color-accent-gold)] text-amber-500 py-2 rounded">
                    Giriş
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center text-sm">
                  <span>Toplam Kayıt: <strong className="text-[var(--color-accent-cyan)]">{runs.length}</strong></span>
                  <button onClick={handleExport} className="text-[var(--color-accent-blue)] hover:underline text-xs">
                    JSON Dışa Aktar
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {runs.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm mt-10">Henüz oyun verisi yok.</p>
                  ) : runs.map((run, idx) => (
                    <div key={idx} className="bg-black/40 border border-gray-800 rounded p-3 text-xs text-gray-300 relative group">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-[var(--color-accent-blue)] text-sm">{run.playerName}</strong>
                        <span className="text-gray-600">{new Date(run.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className="mb-1">Karar: <span style={{ color: "var(--color-accent-gold)" }}>{run.decisionName}</span></div>
                      <div className="mb-2">CR: {run.consistencyRatio?.toFixed(3)}</div>
                      <div className="text-gray-400 italic line-clamp-2 mt-2 border-t border-gray-800 pt-2">
                        "{run.justification}"
                      </div>
                      
                      <button 
                        className="absolute top-2 right-2 p-1 bg-black/80 rounded opacity-0 group-hover:opacity-100 border border-gray-700"
                        title="Gerekçeyi Tam Oku"
                        onClick={() => alert(`GEREKÇE:\n\n${run.justification}`)}
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
