import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/* ===== SVG pattern generators for each game theme ===== */
function NaturePattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}>
      <circle cx="40" cy="60" r="25" fill="none" stroke="#22C55E" strokeWidth="0.5" />
      <circle cx="150" cy="40" r="18" fill="none" stroke="#86EFAC" strokeWidth="0.5" />
      <path d="M80,180 Q100,130 120,180" fill="none" stroke="#22C55E" strokeWidth="0.8" />
      <path d="M60,160 Q80,100 100,160" fill="none" stroke="#86EFAC" strokeWidth="0.5" />
      <circle cx="160" cy="150" r="30" fill="none" stroke="#22C55E" strokeWidth="0.3" />
    </svg>
  );
}

function CellPattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
      <circle cx="60" cy="80" r="20" fill="none" stroke="#00FFD1" strokeWidth="0.8" />
      <circle cx="60" cy="80" r="8" fill="none" stroke="#9B59FF" strokeWidth="0.5" />
      <circle cx="140" cy="50" r="15" fill="none" stroke="#00FFD1" strokeWidth="0.5" />
      <circle cx="100" cy="150" r="25" fill="none" stroke="#9B59FF" strokeWidth="0.6" />
      <ellipse cx="160" cy="140" rx="18" ry="12" fill="none" stroke="#00FFD1" strokeWidth="0.4" />
    </svg>
  );
}

function GearPattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
      <circle cx="60" cy="70" r="30" fill="none" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4,4" />
      <circle cx="140" cy="130" r="25" fill="none" stroke="#8B6914" strokeWidth="0.6" strokeDasharray="3,3" />
      <circle cx="60" cy="70" r="12" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
      <line x1="30" y1="70" x2="90" y2="70" stroke="#C9A84C" strokeWidth="0.3" />
      <line x1="60" y1="40" x2="60" y2="100" stroke="#C9A84C" strokeWidth="0.3" />
    </svg>
  );
}

function NoirPattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
      <rect x="40" y="40" width="60" height="80" fill="none" stroke="#F5A623" strokeWidth="0.5" transform="rotate(-3, 70, 80)" />
      <circle cx="150" cy="60" r="20" fill="none" stroke="#F5A623" strokeWidth="0.8" />
      <line x1="130" y1="120" x2="170" y2="160" stroke="#C0392B" strokeWidth="0.5" />
      <line x1="135" y1="125" x2="145" y2="115" stroke="#C0392B" strokeWidth="0.5" />
    </svg>
  );
}

function AlarmPattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
      <polygon points="100,30 120,70 80,70" fill="none" stroke="#EF4444" strokeWidth="0.8" />
      <line x1="100" y1="45" x2="100" y2="58" stroke="#EF4444" strokeWidth="1" />
      <circle cx="100" cy="63" r="2" fill="#EF4444" />
      <circle cx="50" cy="150" r="5" fill="none" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="2,8" />
      <circle cx="150" cy="140" r="5" fill="none" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="2,8" />
    </svg>
  );
}

function ComicPattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={30 + (i % 4) * 50} cy={30 + Math.floor(i / 4) * 50} r="3" fill="#FBBF24" opacity={0.3 + Math.random() * 0.3} />
      ))}
      <rect x="60" y="100" width="80" height="60" fill="none" stroke="#FBBF24" strokeWidth="0.5" rx="2" />
      <line x1="60" y1="130" x2="140" y2="130" stroke="#FBBF24" strokeWidth="0.3" />
    </svg>
  );
}

function HoloPattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
      <rect x="30" y="50" width="140" height="20" rx="2" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
      <rect x="30" y="50" width="90" height="20" rx="2" fill="#38BDF8" opacity="0.1" />
      <rect x="30" y="80" width="140" height="20" rx="2" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
      <rect x="30" y="80" width="60" height="20" rx="2" fill="#38BDF8" opacity="0.08" />
      <circle cx="150" cy="150" r="30" fill="none" stroke="#FFD700" strokeWidth="0.3" strokeDasharray="2,2" />
    </svg>
  );
}

function ArenaPattern() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
      <polygon points="100,20 130,80 170,90 140,130 150,190 100,160 50,190 60,130 30,90 70,80" fill="none" stroke="#A855F7" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#EC4899" strokeWidth="0.3" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="#A855F7" strokeWidth="0.5" />
    </svg>
  );
}

const PATTERN_MAP = {
  nature: NaturePattern,
  cells: CellPattern,
  gears: GearPattern,
  noir: NoirPattern,
  alarm: AlarmPattern,
  comic: ComicPattern,
  holo: HoloPattern,
  arena: ArenaPattern,
};

export default function GameCard({ game, index, isUnlocked, isCompleted, onLaunch, onComplete }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const PatternSVG = PATTERN_MAP[game.bgPattern] || NaturePattern;

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isUnlocked) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const status = isCompleted ? 'completed' : isUnlocked ? 'unlocked' : 'locked';

  return (
    <motion.div
      ref={cardRef}
      className="game-card-wrapper"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        cursor: isUnlocked ? 'pointer' : 'default',
      }}
      onClick={() => isUnlocked && onLaunch(game)}
    >
      <motion.div
        className="glass"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          padding: 0,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered && isUnlocked
            ? `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px ${game.color}22, inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
          border: isCompleted
            ? `1px solid ${game.color}44`
            : '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Top section - visual area */}
        <div style={{
          position: 'relative',
          height: 180,
          background: game.gradient,
          overflow: 'hidden',
        }}>
          {/* Pattern overlay */}
          <PatternSVG />

          {/* Glow orb */}
          <motion.div
            animate={isHovered && isUnlocked ? { scale: 1.3, opacity: 0.6 } : { scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 80, height: 80,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${game.color}66, transparent)`,
              filter: 'blur(20px)',
            }}
          />

          {/* Emoji icon */}
          <motion.div
            animate={isHovered && isUnlocked ? { scale: 1.15, y: -5 } : { scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 56,
              filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0.3)',
              zIndex: 2,
            }}
          >
            {game.emoji}
          </motion.div>

          {/* Step number badge */}
          <div style={{
            position: 'absolute',
            top: 14,
            left: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            zIndex: 3,
          }}>
            <div style={{
              width: 30, height: 30,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              background: isCompleted
                ? `linear-gradient(135deg, ${game.color}, ${game.colorSecondary})`
                : isUnlocked
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.03)',
              color: isCompleted ? '#030510' : isUnlocked ? '#fff' : 'var(--color-text-muted)',
              border: `1px solid ${isCompleted ? game.color : isUnlocked ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
            }}>
              {isCompleted ? '✓' : game.order}
            </div>
          </div>

          {/* Status indicator */}
          {isCompleted && (
            <div style={{
              position: 'absolute',
              top: 14,
              right: 14,
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-body)',
              background: `${game.color}22`,
              color: game.color,
              border: `1px solid ${game.color}33`,
              zIndex: 3,
            }}>
              TAMAMLANDI
            </div>
          )}

          {/* Gradient fade to bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(transparent, rgba(15, 20, 40, 0.95))',
          }} />
        </div>

        {/* Content section */}
        <div style={{
          padding: '16px 20px 20px',
          background: 'rgba(15, 20, 40, 0.95)',
        }}>
          <h3 className="font-display" style={{
            fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: isUnlocked ? game.color : 'var(--color-text-muted)',
            marginBottom: 4,
            transition: 'color 0.3s ease',
          }}>
            {game.title}
          </h3>

          <p className="font-body" style={{
            fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
            color: isUnlocked ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
            lineHeight: 1.5,
            marginBottom: 12,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {game.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {game.tags.map((tag) => (
              <span key={tag} className="font-body" style={{
                fontSize: 10,
                fontWeight: 500,
                padding: '3px 8px',
                borderRadius: 6,
                background: isUnlocked ? `${game.color}11` : 'rgba(255,255,255,0.02)',
                color: isUnlocked ? `${game.color}AA` : 'var(--color-text-muted)',
                border: `1px solid ${isUnlocked ? `${game.color}22` : 'rgba(255,255,255,0.04)'}`,
                letterSpacing: '0.03em',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Action - complete toggle (for demo/testing) */}
          {isUnlocked && !isCompleted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onComplete(game.id);
              }}
              className="font-body"
              style={{
                marginTop: 12,
                width: '100%',
                padding: '8px 0',
                borderRadius: 8,
                border: `1px solid ${game.color}33`,
                background: `${game.color}11`,
                color: game.color,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              ✓ TAMAMLA
            </motion.button>
          )}
        </div>

        {/* Locked overlay */}
        {!isUnlocked && (
          <div className="locked-overlay">
            <div style={{ textAlign: 'center' }}>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}
              >
                🔒
              </motion.div>
              <p className="font-body" style={{
                fontSize: 12,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.05em',
              }}>
                Önceki görevi tamamla
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
