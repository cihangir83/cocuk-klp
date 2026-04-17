import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CINEMATIC_LINES = [
  { text: 'Doğa milyarlarca yıl boyunca çözümler üretti...', delay: 0 },
  { text: 'Şimdi sıra sende.', delay: 2.5 },
  { text: '8 görev. 1 yolculuk.', delay: 4.5 },
];

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // 0 = total black, 1 = particles appear, 2 = title, 3 = subtitle lines, 4 = button

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 4500),
      setTimeout(() => setPhase(4), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#030510',
      }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Expanding ring */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 5, 20], opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 80, height: 80,
              borderRadius: '50%',
              border: '2px solid rgba(167, 139, 250, 0.3)',
              boxShadow: '0 0 60px rgba(167, 139, 250, 0.2)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Central orb */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 120, height: 120,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #A78BFA, #4C1D95, #1E1B4B)',
              boxShadow: '0 0 80px rgba(167, 139, 250, 0.4), 0 0 160px rgba(76, 29, 149, 0.2)',
              animation: 'float 6s ease-in-out infinite',
            }}
          />
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}
          >
            <motion.h1
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '0.15em',
                color: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #E8E4FF 0%, #A78BFA 40%, #FFD700 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                textShadow: 'none',
                marginBottom: 8,
              }}
            >
              KEŞİF YOLCULUĞU
            </motion.h1>
            <motion.p
              className="font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
                letterSpacing: '0.3em',
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
              }}
            >
              Bio-TRIZ Öğrenme Platformu
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narrative lines */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              bottom: '25%',
              textAlign: 'center',
              maxWidth: 600,
              padding: '0 24px',
            }}
          >
            {CINEMATIC_LINES.map((line, i) => (
              <motion.p
                key={i}
                className="font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: line.delay, duration: 1 }}
                style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
                  color: i === CINEMATIC_LINES.length - 1
                    ? 'var(--color-gold)'
                    : 'var(--color-text-secondary)',
                  marginBottom: 12,
                  fontWeight: i === CINEMATIC_LINES.length - 1 ? 600 : 400,
                }}
              >
                {line.text}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enter Button */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 40px rgba(167, 139, 250, 0.6), 0 0 80px rgba(167, 139, 250, 0.3)',
            }}
            whileTap={{ scale: 0.97 }}
            onClick={onComplete}
            className="font-display"
            style={{
              position: 'absolute',
              bottom: '10%',
              padding: '16px 48px',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#E8E4FF',
              background: 'linear-gradient(135deg, rgba(76, 29, 149, 0.4), rgba(167, 139, 250, 0.2))',
              border: '1px solid rgba(167, 139, 250, 0.4)',
              borderRadius: 12,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 30px rgba(167, 139, 250, 0.3)',
              outline: 'none',
            }}
          >
            YOLCULUĞA BAŞLA
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip */}
      {phase < 4 && phase >= 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.7 }}
          onClick={onComplete}
          className="font-body"
          style={{
            position: 'absolute',
            bottom: 24,
            right: 32,
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          Geç →
        </motion.button>
      )}
    </motion.div>
  );
}
