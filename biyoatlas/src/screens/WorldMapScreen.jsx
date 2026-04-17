import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useGame } from '../context/GameContext';
import { ecosystems } from '../data/ecosystems';
import SoundEngine from '../utils/soundEngine';

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const avatarEmojis = {
  wolf: '🐺', owl: '🦉', eagle: '🦅', dolphin: '🐬',
  panther: '🐆', fox: '🦊', octopus: '🐙', dragon: '🐉',
};

function PulseMarker({ ecosystem, isUnlocked, onClick, isNew }) {
  const [hovered, setHovered] = useState(false);

  // Convert percentage coordinates to geo coordinates (approximate)
  const lon = (ecosystem.coordinates.x / 100) * 360 - 180;
  const lat = 90 - (ecosystem.coordinates.y / 100) * 180;

  if (!isUnlocked) {
    return (
      <Marker coordinates={[lon, lat]}>
        <g className="cursor-not-allowed">
          <circle r={6} fill="#0A1420" stroke="#1E3A5F" strokeWidth={1} opacity={0.5} />
          <text textAnchor="middle" y={2} fontSize={6} fill="#3D6080">🔒</text>
        </g>
      </Marker>
    );
  }

  return (
    <Marker coordinates={[lon, lat]}>
      <g
        className="cursor-pointer"
        onClick={() => {
          SoundEngine.uiClick();
          onClick(ecosystem);
        }}
        onMouseEnter={() => {
          setHovered(true);
          SoundEngine.uiHover();
        }}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Pulse rings */}
        {[0, 1, 2].map(i => (
          <circle
            key={i}
            r={8}
            fill="none"
            stroke={ecosystem.color}
            strokeWidth={1}
            opacity={0}
          >
            <animate
              attributeName="r"
              from="6"
              to="22"
              dur="2s"
              begin={`${i * 0.6}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.6"
              to="0"
              dur="2s"
              begin={`${i * 0.6}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Center dot */}
        <circle
          r={hovered ? 8 : 6}
          fill={ecosystem.color}
          stroke={hovered ? '#FFD700' : ecosystem.color}
          strokeWidth={hovered ? 2 : 1}
          filter={hovered ? 'url(#glow)' : undefined}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Tooltip on hover */}
        {hovered && (
          <g>
            <rect
              x={-60}
              y={-32}
              width={120}
              height={22}
              rx={4}
              fill="rgba(15,30,46,0.9)"
              stroke={ecosystem.color}
              strokeWidth={0.5}
            />
            <text
              textAnchor="middle"
              y={-18}
              fontSize={8}
              fill="#E8F4F8"
              fontFamily="Poppins"
              fontWeight="600"
            >
              {ecosystem.name}
            </text>
          </g>
        )}

        {/* New indicator */}
        {isNew && (
          <circle r={3} cx={8} cy={-6} fill="#F5A623">
            <animate attributeName="opacity" from="1" to="0.3" dur="1s" repeatCount="indefinite" />
          </circle>
        )}
      </g>
    </Marker>
  );
}

function DailyQuestsPanel({ quests }) {
  return (
    <motion.div
      className="absolute top-4 left-4 z-20 glass rounded-xl p-3 w-56 md:w-64"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="font-heading font-semibold text-xs text-text-secondary uppercase tracking-wider mb-2">
        Günlük Görevler
      </h3>
      <div className="flex flex-col gap-2">
        {quests.map((quest, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {quest.completed ? (
                <span className="text-green-primary text-xs">✓</span>
              ) : (
                <span className="text-text-muted text-xs">○</span>
              )}
              <span className={`text-xs font-body ${quest.completed ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                {quest.text}
              </span>
            </div>
            <div className="h-1 bg-surface rounded-full overflow-hidden ml-5">
              <div
                className="h-full bg-green-primary rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (quest.progress / quest.goal) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PlayerHUD({ player }) {
  return (
    <motion.div
      className="absolute top-4 right-4 z-20 glass rounded-xl p-3 flex items-center gap-3"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-2xl">{avatarEmojis[player.avatar] || '🐺'}</div>
      <div className="flex flex-col">
        <span className="font-heading font-semibold text-sm text-text-primary">
          {player.name}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-gold">
            {player.totalScore}
          </span>
          <span className="text-xs text-text-secondary">
            🏅 {player.badges.length}
          </span>
          <span className="text-xs text-text-secondary">
            🗺️ {player.unlockedEcosystems.length}/{ecosystems.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function TeacherButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-surface/30 border border-border-subtle/30 flex items-center justify-center text-text-muted/30 hover:text-text-muted hover:bg-surface/60 transition-all text-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      title="Öğretmen Paneli"
    >
      ⚙
    </motion.button>
  );
}

export default function WorldMapScreen() {
  const {
    player, setCurrentScreen, setSelectedEcosystem,
  } = useGame();
  const [showGuide, setShowGuide] = useState(true);
  const [showTeacherPin, setShowTeacherPin] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [teacherPin] = useState(() => {
    return localStorage.getItem('biyoatlas_teacher_pin') || '1234';
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleEcosystemClick = (ecosystem) => {
    setSelectedEcosystem(ecosystem);
    setCurrentScreen('ecosystem');
    SoundEngine.discovery();
  };

  const handleTeacherAccess = () => {
    if (pin === teacherPin) {
      setShowTeacherPin(false);
      setPin('');
      setCurrentScreen('teacher');
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
  };

  // find first unlocked-but-not-yet-visited ecosystem for guide arrow
  const guideEcosystem = ecosystems.find(e =>
    player.unlockedEcosystems.includes(e.id) &&
    !player.discoveredCreatures.some(cId =>
      e.creatures.some(c => c.id === cId)
    )
  );

  return (
    <div className="relative w-full h-full bg-deep overflow-hidden">
      {/* SVG Glow Filter */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Map */}
      <ComposableMap
        projectionConfig={{ scale: 147, center: [20, 20] }}
        className="w-full h-full"
        style={{ background: '#070D1A' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#162438"
                stroke="#1E3A5F"
                strokeWidth={0.3}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: '#1A2E45' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* Ecosystem markers */}
        {ecosystems.map((eco) => (
          <PulseMarker
            key={eco.id}
            ecosystem={eco}
            isUnlocked={player.unlockedEcosystems.includes(eco.id)}
            onClick={handleEcosystemClick}
            isNew={
              player.unlockedEcosystems.includes(eco.id) &&
              !player.discoveredCreatures.some(cId =>
                eco.creatures.some(c => c.id === cId)
              )
            }
          />
        ))}
      </ComposableMap>

      {/* Fog overlay for locked areas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-deep/30 via-transparent to-deep/50" />
      </div>

      {/* HUD */}
      <PlayerHUD player={player} />
      <DailyQuestsPanel quests={player.dailyQuests} />

      {/* Bottom buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {/* Atlas button */}
        <motion.button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('atlas');
          }}
          className="glass rounded-xl px-5 py-3 flex items-center gap-2 hover:bg-surface/80 transition-all touch-target"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">📖</span>
          <span className="font-heading font-semibold text-sm text-text-primary">
            ATLAŞIM
          </span>
          <span className="font-display text-gold text-lg">
            {player.analogyCards.length}/{ecosystems.reduce((sum, e) => sum + e.creatures.length, 0)}
          </span>
        </motion.button>

        {/* DUEL button */}
        <motion.button
          onClick={() => {
            SoundEngine.uiClick();
            setCurrentScreen('duelmatch');
          }}
          className="relative rounded-xl px-5 py-3 flex items-center gap-2 font-heading font-bold text-sm text-deep transition-all touch-target overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #F5A623 0%, #E84545 50%, #F5A623 100%)',
            backgroundSize: '200% 200%',
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            y: { delay: 1 },
            opacity: { delay: 1 },
            backgroundPosition: { duration: 3, repeat: Infinity },
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">⚔️</span>
          <span>DÜELLO</span>
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.button>
      </div>

      {/* Guide arrow */}
      <AnimatePresence>
        {showGuide && guideEcosystem && (
          <motion.div
            className="absolute z-30 text-green-primary text-sm font-body"
            style={{
              left: `${guideEcosystem.coordinates.x}%`,
              top: `${guideEcosystem.coordinates.y - 8}%`,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              y: { duration: 1.5, repeat: Infinity },
              opacity: { duration: 0.5 },
            }}
          >
            ↓ Buraya tıkla
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teacher button */}
      <TeacherButton onClick={() => {
        SoundEngine.uiClick();
        setShowTeacherPin(true);
      }} />

      {/* Teacher PIN Modal */}
      <AnimatePresence>
        {showTeacherPin && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass rounded-2xl p-6 w-80 flex flex-col items-center gap-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="font-heading font-semibold text-text-primary">Öğretmen Girişi</h3>
              <input
                type="password"
                maxLength={6}
                placeholder="PIN gir..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTeacherAccess()}
                className={`w-full bg-surface border-2 ${pinError ? 'border-danger animate-shake' : 'border-border-subtle'} rounded-xl px-4 py-3 text-center text-xl font-display text-text-primary outline-none focus:border-green-primary transition-colors`}
                autoFocus
              />
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => { setShowTeacherPin(false); setPin(''); }}
                  className="flex-1 py-2 rounded-xl bg-surface text-text-secondary font-body text-sm hover:bg-border-subtle transition-colors touch-target"
                >
                  İptal
                </button>
                <button
                  onClick={handleTeacherAccess}
                  className="flex-1 py-2 rounded-xl bg-green-primary text-deep font-heading font-semibold text-sm hover:bg-green-deep transition-colors touch-target"
                >
                  Giriş
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
