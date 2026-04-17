import React from 'react';
import { motion } from 'framer-motion';

export default function Manometer({
  value = 0, // 0 to 100
  isActive = false,
  isDanger = true,
  size = 80,
  className = ""
}) {
  // 0 -> -120deg (sol alt)
  // 100 -> 120deg (sağ alt)
  // Değeri açıya dönüştür: -120 + (value * 2.4)
  const baseRotation = -120 + (value * 2.4);
  
  // Titreme efekti için
  const animProps = isActive && isDanger
    ? { rotate: [baseRotation - 5, baseRotation + 5, baseRotation] }
    : { rotate: baseRotation };

  const animTransition = isActive && isDanger
    ? { repeat: Infinity, duration: 0.1, ease: "linear" }
    : { duration: 1, ease: "easeOut" };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id="gaugeBg" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#EAD5A0" />
          <stop offset="100%" stopColor="#C4956A" />
        </radialGradient>
      </defs>

      {/* Dış Çerçeve */}
      <circle cx="50" cy="50" r="48" fill="#1C1410" stroke="#B87333" strokeWidth="4" />
      <circle cx="50" cy="50" r="42" fill="url(#gaugeBg)" />

      {/* Gösterge Çizgileri */}
      <g stroke="#2D1F0E" strokeWidth="2">
        <line x1="15" y1="50" x2="22" y2="50" />
        <line x1="85" y1="50" x2="78" y2="50" />
        <line x1="50" y1="15" x2="50" y2="22" />
        <line x1="25" y1="25" x2="30" y2="30" />
        <line x1="75" y1="25" x2="70" y2="30" />
      </g>

      {/* Kırmızı Tehlike Bölgesi */}
      <path d="M 70 30 A 30 30 0 0 1 85 50" fill="none" stroke="#E84545" strokeWidth="6" />

      {/* İbre */}
      <motion.g 
        animate={animProps} 
        transition={animTransition}
        style={{ transformOrigin: "50px 50px" }}
      >
        <polygon points="46,50 54,50 50,15" fill="#1C1410" />
        <circle cx="50" cy="50" r="6" fill="#C9A84C" stroke="#1C1410" strokeWidth="2" />
      </motion.g>

      {/* Cam Yansıması */}
      <path d="M 15 50 A 35 35 0 0 1 85 50 Q 50 60 15 50" fill="rgba(255,255,255,0.15)" />
      
      {/* Vidalar */}
      <circle cx="10" cy="10" r="2" fill="#DA8A47" />
      <circle cx="90" cy="90" r="2" fill="#DA8A47" />
      <circle cx="90" cy="10" r="2" fill="#DA8A47" />
      <circle cx="10" cy="90" r="2" fill="#DA8A47" />
    </svg>
  );
}
