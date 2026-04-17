import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SoundEngine from '../utils/soundEngine';

const STUDENTS_KEY = 'biyoatlas_students';

export default function TeacherPanelScreen() {
  const { setCurrentScreen } = useGame();
  const [showReset, setShowReset] = useState(false);

  const students = useMemo(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '{}');
      return Object.values(data).sort((a, b) => b.totalScore - a.totalScore);
    } catch {
      return [];
    }
  }, []);

  const handleExport = () => {
    const data = JSON.stringify(students, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biyoatlas_veriler_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    SoundEngine.correct();
  };

  const handleReset = () => {
    localStorage.removeItem(STUDENTS_KEY);
    // Also remove individual player data
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith('biyoatlas_')) {
        localStorage.removeItem(key);
      }
    });
    setShowReset(false);
    SoundEngine.uiClick();
    window.location.reload();
  };

  const handlePinChange = (newPin) => {
    localStorage.setItem('biyoatlas_teacher_pin', newPin);
    SoundEngine.correct();
  };

  return (
    <motion.div
      className="relative w-full h-full bg-deep overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-border-subtle/30">
        <button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('worldmap');
          }}
          className="glass rounded-lg px-4 py-2 text-text-secondary text-sm font-body hover:text-text-primary transition-colors touch-target"
        >
          ← Geri
        </button>
        <h1 className="font-heading font-bold text-lg text-text-primary">Öğretmen Paneli</h1>
        <div className="w-16" />
      </div>

      <div className="px-6 py-4 max-w-3xl mx-auto">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card rounded-xl p-4 border border-border-subtle text-center">
            <span className="font-display text-2xl text-green-primary">{students.length}</span>
            <p className="text-xs text-text-secondary font-body mt-1">Öğrenci</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border-subtle text-center">
            <span className="font-display text-2xl text-gold">
              {students.reduce((sum, s) => sum + s.totalScore, 0)}
            </span>
            <p className="text-xs text-text-secondary font-body mt-1">Toplam Puan</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border-subtle text-center">
            <span className="font-display text-2xl text-text-primary">
              {students.reduce((sum, s) => sum + s.analogyCards, 0)}
            </span>
            <p className="text-xs text-text-secondary font-body mt-1">Toplam Kart</p>
          </div>
        </div>

        {/* Student list */}
        <h2 className="font-heading font-semibold text-sm text-text-secondary uppercase tracking-wider mb-3">
          Öğrenci Listesi
        </h2>

        {students.length === 0 ? (
          <div className="bg-card rounded-xl p-8 border border-border-subtle text-center">
            <p className="text-text-muted font-body">Henüz kayıtlı öğrenci yok</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mb-6">
            {students.map((student, i) => (
              <motion.div
                key={student.name}
                className="bg-card rounded-xl p-4 border border-border-subtle flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="font-display text-xl text-text-muted w-6 text-center">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-sm text-text-primary">
                    {student.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-text-secondary font-body">
                      ⭐ {student.totalScore}
                    </span>
                    <span className="text-xs text-text-secondary font-body">
                      🃏 {student.analogyCards}
                    </span>
                    <span className="text-xs text-text-secondary font-body">
                      🏅 {student.badges}
                    </span>
                    <span className="text-xs text-text-secondary font-body">
                      🗺️ {student.unlockedEcosystems}/8
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-text-muted font-body">
                  {student.lastSeen ? new Date(student.lastSeen).toLocaleDateString('tr-TR') : '--'}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={handleExport}
            className="w-full py-3 glass rounded-xl text-green-primary font-heading font-semibold text-sm hover:bg-surface/80 transition-all touch-target border border-green-primary/30"
          >
            📥 Tüm Verileri Dışa Aktar (JSON)
          </button>

          <button
            onClick={() => setShowReset(true)}
            className="w-full py-3 glass rounded-xl text-danger font-heading font-semibold text-sm hover:bg-danger/10 transition-all touch-target border border-danger/30"
          >
            🗑️ Sınıfı Sıfırla
          </button>
        </div>
      </div>

      {/* Reset confirmation */}
      {showReset && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="glass rounded-2xl p-6 w-80 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h3 className="font-heading font-bold text-danger text-lg mb-2">Sınıfı Sıfırla?</h3>
            <p className="text-text-secondary text-sm font-body mb-4">
              Tüm öğrenci verileri kalıcı olarak silinecek. Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 py-2 rounded-xl bg-surface text-text-secondary font-body text-sm touch-target"
              >
                İptal
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 rounded-xl bg-danger text-white font-heading font-semibold text-sm touch-target"
              >
                Sıfırla
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
