import { motion, AnimatePresence } from 'framer-motion';
import { Trait } from '../../assets/traits';
import { TraitCard } from '../ui/TraitCard';

interface TraitLibraryProps {
  traits: Trait[];
  selectedTrait: string | null;
  onSelect: (traitId: string) => void;
  onAdd: (traitId: string) => void;
  selectedTraits: Trait[];
}

export function TraitLibrary({
  traits,
  selectedTrait,
  onSelect,
  onAdd,
  selectedTraits
}: TraitLibraryProps) {
  const categories = [
    { id: 'movement', name: 'Hareket', icon: '🦈', color: '#00FFD1' },
    { id: 'protection', name: 'Koruma', icon: '🛡️', color: '#FF6B35' },
    { id: 'feeding', name: 'Beslenme', icon: '🍽️', color: '#9B59FF' },
    { id: 'resilience', name: 'Dayanıklılık', icon: '💪', color: '#FFE135' }
  ];

  const traitsByCategory = categories.map(cat => ({
    ...cat,
    traits: traits.filter(t => t.category === cat.id)
  }));

  const selectedIds = selectedTraits.map(t => t.id);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#00FFD1]/20">
        <h2 className="font-display text-xl font-bold text-glow-cyan flex items-center gap-2">
          <span>🧬</span>
          <span>EVRAİM ARŞİVİ</span>
        </h2>
        <p className="text-xs text-[#7FA8C9] mt-1">
          Özellikleri sürükle veya tıkla
        </p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {traitsByCategory.map(category => (
          <div key={category.id}>
            <h3
              className="font-display text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ color: category.color }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className="text-xs text-[#7FA8C9]">
                ({category.traits.length})
              </span>
            </h3>

            <div className="space-y-2">
              {category.traits.map(trait => (
                <TraitCard
                  key={trait.id}
                  trait={trait}
                  isSelected={selectedTrait === trait.id}
                  isDisabled={selectedIds.includes(trait.id)}
                  onSelect={() => {
                    if (selectedTrait === trait.id) {
                      if (!selectedIds.includes(trait.id)) {
                        onAdd(trait.id);
                      }
                    } else {
                      onSelect(trait.id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected trait detail */}
      <AnimatePresence>
        {selectedTrait && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="p-4 border-t border-[#00FFD1]/20 bg-[#0A1525]"
          >
            {(() => {
              const trait = traits.find(t => t.id === selectedTrait);
              if (!trait) return null;

              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{trait.icon}</span>
                      <div>
                        <h4 className="font-display font-semibold text-white">
                          {trait.name}
                        </h4>
                        <p className="text-xs text-[#7FA8C9]">
                          {trait.bioExample.name}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAdd(trait.id)}
                      disabled={selectedIds.includes(trait.id)}
                      className={`
                        px-4 py-2 rounded-lg font-semibold text-sm
                        ${selectedIds.includes(trait.id)
                          ? 'bg-[#39FF14]/20 text-[#39FF14] cursor-not-allowed'
                          : 'bg-[#00FFD1] text-[#030408]'
                        }
                      `}
                    >
                      {selectedIds.includes(trait.id) ? 'Eklendi ✓' : 'Ekle +'}
                    </motion.button>
                  </div>

                  <p className="text-xs text-[#7FA8C9]">
                    <span className="text-[#FFE135]">Biomimetik:</span>{' '}
                    {trait.bioExample.application}
                  </p>

                  {trait.synergies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-[#9B59FF]">🔮 Sinerji:</span>
                      {trait.synergies.map(synId => {
                        const synTrait = traits.find(t => t.id === synId);
                        return synTrait ? (
                          <span
                            key={synId}
                            className="text-xs px-2 py-0.5 rounded bg-[#9B59FF]/20 text-[#9B59FF]"
                          >
                            {synTrait.icon} {synTrait.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}

                  {trait.conflicts.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-[#FF6B35]">⚠️ Çelişki:</span>
                      {trait.conflicts.map(confId => {
                        const confTrait = traits.find(t => t.id === confId);
                        return confTrait ? (
                          <span
                            key={confId}
                            className="text-xs px-2 py-0.5 rounded bg-[#FF6B35]/20 text-[#FF6B35]"
                          >
                            {confTrait.icon} {confTrait.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
