import React from 'react';

export default function Gear({ 
  size = 100, 
  color = 'brass', // brass, copper, rust, dark
  animationState = 'idle', // locked, idle, spinning-cw, spinning-ccw, start-slow
  teethCount = 12,
  className = ""
}) {
  const getColors = () => {
    switch (color) {
      case 'copper': return { fill: '#2D2218', stroke: '#B87333', center: '#DA8A47' };
      case 'rust': return { fill: '#1A120B', stroke: '#8B4513', center: '#4A3728' };
      case 'dark': return { fill: '#0A0805', stroke: '#2D2218', center: '#1C1410' };
      default: return { fill: '#1C1410', stroke: '#C9A84C', center: '#F0C040' }; // brass
    }
  };

  const getAnimationClass = () => {
    switch (animationState) {
      case 'spinning-cw': return 'gear-spin-cw';
      case 'spinning-ccw': return 'gear-spin-ccw';
      case 'spinning-cw-slow': return 'gear-spin-cw-slow';
      case 'spinning-ccw-fast': return 'gear-spin-ccw-fast';
      case 'locked': return 'gear-locked machine-shake';
      case 'idle':
      default: return '';
    }
  };

  const colors = getColors();
  const animClass = getAnimationClass();

  // Dinamik diş oluşturma (parametric)
  const renderTeeth = () => {
    const teeth = [];
    const center = 50;
    const outerRadius = 45;
    const innerRadius = 38;
    const toothWidth = 8;
    
    for (let i = 0; i < teethCount; i++) {
      const angle = (i * 360) / teethCount;
      teeth.push(
        <rect 
          key={i}
          x={center - toothWidth/2} y={center - outerRadius} 
          width={toothWidth} height={outerRadius - innerRadius + 2}
          fill={colors.stroke}
          transform={`rotate(${angle} ${center} ${center})`}
          rx="1"
        />
      );
    }
    return teeth;
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`origin-center ${animClass} ${className}`}
      style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.6))' }}
    >
      <g>
        {renderTeeth()}
        {/* Dış Halka */}
        <circle cx="50" cy="50" r="40" fill={colors.fill} stroke={colors.stroke} strokeWidth="6" />
        
        {/* İç Yapı (Kollar) */}
        <circle cx="50" cy="50" r="15" fill="none" stroke={colors.stroke} strokeWidth="2" />
        <line x1="50" y1="10" x2="50" y2="40" stroke={colors.stroke} strokeWidth="4" />
        <line x1="50" y1="60" x2="50" y2="90" stroke={colors.stroke} strokeWidth="4" />
        <line x1="10" y1="50" x2="40" y2="50" stroke={colors.stroke} strokeWidth="4" />
        <line x1="60" y1="50" x2="90" y2="50" stroke={colors.stroke} strokeWidth="4" />
        
        <line x1="22" y1="22" x2="39" y2="39" stroke={colors.stroke} strokeWidth="2" />
        <line x1="78" y1="78" x2="61" y2="61" stroke={colors.stroke} strokeWidth="2" />
        <line x1="78" y1="22" x2="61" y2="39" stroke={colors.stroke} strokeWidth="2" />
        <line x1="22" y1="78" x2="39" y2="61" stroke={colors.stroke} strokeWidth="2" />

        {/* Göbek */}
        <circle cx="50" cy="50" r="8" fill={colors.stroke} />
        <circle cx="50" cy="50" r="4" fill={colors.center} />
        
        {/* Perçinler/Vidalar */}
        <circle cx="50" cy="18" r="1.5" fill={colors.center} />
        <circle cx="50" cy="82" r="1.5" fill={colors.center} />
        <circle cx="18" cy="50" r="1.5" fill={colors.center} />
        <circle cx="82" cy="50" r="1.5" fill={colors.center} />
      </g>
    </svg>
  );
}
