import React from 'react';
import { motion } from 'framer-motion';
import { useGameSound } from '../../hooks/useSound';

export default function MetalButton({ 
  children, 
  onClick, 
  type = "brass", // brass, copper, dark
  className = "",
  disabled = false,
  pulse = false
}) {
  const sound = useGameSound();

  const getStyle = () => {
    switch(type) {
      case 'copper': return 'copper-plate text-[var(--color-bg-deep)] hover:text-black';
      case 'dark': return 'metal-surface text-[var(--color-copper-bright)] border border-[var(--color-metal-light)]';
      default: return 'brass-plate text-[var(--color-bg-deep)] hover:text-black'; // brass
    }
  };

  const handleClick = (e) => {
    if (disabled) return;
    sound.playClick();
    if (onClick) onClick(e);
  };

  const pulseClass = pulse ? (type === 'copper' ? 'pulse-copper' : 'pulse-brass') : '';

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative px-6 py-3 font-[var(--font-engraved)] font-bold tracking-wider rounded-sm
        shadow-[0_4px_10px_rgba(0,0,0,0.6)] 
        transition-colors duration-300
        ${getStyle()}
        ${pulseClass}
        ${disabled ? 'opacity-50 cursor-not-allowed filter grayscale' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Perçinler */}
      <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-black/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></span>
      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-black/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></span>
      <span className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-black/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></span>
      <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-black/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></span>
      
      {children}
    </motion.button>
  );
}
