import { motion } from 'framer-motion';
import { useState } from 'react';
import { GlowButton } from '../ui/GlowButton';

interface NameModalProps {
  onConfirm: (name: string) => void;
  onCancel: () => void;
  suggestedName: string;
}

export function NameModal({ onConfirm, onCancel, suggestedName }: NameModalProps) {
  const [name, setName] = useState(suggestedName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="w-full max-w-md p-6 rounded-2xl glass-panel"
        style={{
          border: '2px solid #00FFD1',
          boxShadow: '0 0 40px rgba(0, 255, 209, 0.3)'
        }}
      >
        <div className="text-center mb-6">
          <span className="text-5xl mb-4 block">🧬</span>
          <h2 className="font-display text-2xl font-bold text-glow-cyan mb-2">
            Organizmayı İsimlendir
          </h2>
          <p className="text-sm text-[#7FA8C9]">
            Organizmana bir isim ver ve ekolojik teste sok
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#7FA8C9] mb-2">
              Organizma Adı
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örnek: Tardigardus"
              className="
                w-full px-4 py-3 rounded-xl
                bg-[#0A1525] border-2 border-[#00FFD1]/30
                text-white font-display placeholder-[#2A4A6B]
                focus:outline-none focus:border-[#00FFD1]
                transition-colors
              "
              autoFocus
            />
          </div>

          <div className="bg-[#0A1525] rounded-xl p-3">
            <p className="text-xs text-[#7FA8C9] mb-2">
              Bilimsel İsim Formatı:
            </p>
            <p className="font-scientific text-[#9B59FF]">
              {name.toLowerCase().replace(/\s+/g, '')}us
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <GlowButton
              variant="secondary"
              size="md"
              onClick={onCancel}
              className="flex-1"
            >
              İptal
            </GlowButton>
            <GlowButton
              variant="primary"
              size="md"
              onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
              className="flex-1"
            >
              <span className="flex items-center gap-2">
                <span>🧪</span>
                <span>Teste Başla</span>
              </span>
            </GlowButton>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
