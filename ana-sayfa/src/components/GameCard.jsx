import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function GameCard({ game, index, isUnlocked, isCompleted, onLaunch, onComplete }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  const baseUrl = import.meta.env.BASE_URL || '/';

  return (
    <motion.div
      ref={cardRef}
      className="game-card-wrapper"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
        cursor: isUnlocked ? 'pointer' : 'default',
      }}
      onClick={() => isUnlocked && onLaunch(game)}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'relative',
          borderRadius: 6,
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          background: '#ffffff',
          border: isHovered && isUnlocked
            ? `2px solid ${game.color}`
            : isCompleted
              ? `2px solid ${game.color}88`
              : '2px solid #e2e8f0',
          boxShadow: isHovered && isUnlocked
            ? `0 16px 48px rgba(0,0,0,0.18), 0 0 0 1px ${game.color}44`
            : '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Image area with overlay text */}
        <div style={{
          position: 'relative',
          height: 200,
          overflow: 'hidden',
        }}>
          {game.image && (
            <motion.img
              src={`${baseUrl}${game.image}`}
              alt={game.title}
              animate={isHovered && isUnlocked ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0.4)',
              }}
            />
          )}

          {/* Dark gradient overlay for text readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)',
          }} />

          {/* Hover glow effect */}
          {isHovered && isUnlocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at center, ${game.color}25, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Step number badge */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 3,
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              background: isCompleted
                ? game.color
                : 'rgba(255,255,255,0.95)',
              color: isCompleted ? '#fff' : '#1e293b',
              border: `2px solid ${isCompleted ? game.color : 'rgba(255,255,255,0.3)'}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}>
              {isCompleted ? '✓' : game.order}
            </div>
          </div>

          {/* Completed badge */}
          {isCompleted && (
            <div style={{
              position: 'absolute',
              top: 12,
              right: 12,
              padding: '4px 12px',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-body)',
              background: game.color,
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              zIndex: 3,
            }}>
              TAMAMLANDI
            </div>
          )}

          {/* Title & subtitle overlaid on image */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '14px 16px',
            zIndex: 3,
          }}>
            <h3 className="font-display" style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              marginBottom: 2,
            }}>
              {game.title}
            </h3>
            <p className="font-body" style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
              letterSpacing: '0.03em',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}>
              {game.subtitle}
            </p>
          </div>
        </div>

        {/* Content section */}
        <div style={{
          padding: '14px 16px 16px',
          background: '#ffffff',
        }}>
          {/* Color accent bar */}
          <div style={{
            width: 36,
            height: 3,
            borderRadius: 2,
            background: game.color,
            marginBottom: 10,
          }} />

          <p className="font-body" style={{
            fontSize: 'clamp(0.72rem, 0.9vw, 0.8rem)',
            color: '#64748b',
            lineHeight: 1.6,
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
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 4,
                background: isUnlocked ? `${game.color}12` : '#f1f5f9',
                color: isUnlocked ? game.color : '#94a3b8',
                border: `1px solid ${isUnlocked ? `${game.color}30` : '#e2e8f0'}`,
                letterSpacing: '0.04em',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Action button on hover */}
          {isUnlocked && !isCompleted && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0,
                marginTop: isHovered ? 12 : 0,
              }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete(game.id);
                }}
                className="font-body"
                style={{
                  width: '100%',
                  padding: '8px 0',
                  borderRadius: 4,
                  border: `2px solid ${game.color}`,
                  background: game.color,
                  color: '#ffffff',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                }}
              >
                ✓ TAMAMLA
              </button>
            </motion.div>
          )}
        </div>

        {/* Locked overlay */}
        {!isUnlocked && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
            <div style={{ textAlign: 'center' }}>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 28, marginBottom: 6, opacity: 0.5 }}
              >
                🔒
              </motion.div>
              <p className="font-body" style={{
                fontSize: 12,
                color: '#94a3b8',
                fontWeight: 500,
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
