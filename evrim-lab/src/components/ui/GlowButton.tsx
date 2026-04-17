import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GlowButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = ''
}: GlowButtonProps) {
  const colors = {
    primary: {
      bg: 'bg-[#00FFD1]/10',
      border: 'border-[#00FFD1]',
      text: 'text-[#00FFD1]',
      glow: 'hover:shadow-[0_0_30px_rgba(0,255,209,0.5)]'
    },
    secondary: {
      bg: 'bg-[#9B59FF]/10',
      border: 'border-[#9B59FF]',
      text: 'text-[#9B59FF]',
      glow: 'hover:shadow-[0_0_30px_rgba(155,89,255,0.5)]'
    },
    danger: {
      bg: 'bg-[#FF2D78]/10',
      border: 'border-[#FF2D78]',
      text: 'text-[#FF2D78]',
      glow: 'hover:shadow-[0_0_30px_rgba(255,45,120,0.5)]'
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const style = colors[variant];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        ${style.bg} ${style.border} ${style.text}
        border-2 rounded-xl font-display font-semibold
        ${sizes[size]} ${style.glow}
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        boxShadow: disabled ? 'none' : `0 0 15px ${style.border.replace('border-', 'rgba(').replace('-', ', ').replace('-', ', ')}`,
        textShadow: `0 0 10px ${style.text.replace('text-', '')}`
      }}
    >
      {children}
    </motion.button>
  );
}
