import React from 'react';

export default function Lamp({
  color = 'red', // red, green, yellow, blue, off
  size = 40,
  className = ""
}) {
  let lampClass = '';
  switch (color) {
    case 'red': lampClass = 'lamp-red'; break;
    case 'green': lampClass = 'lamp-green'; break;
    case 'yellow': lampClass = 'lamp-yellow'; break;
    case 'blue': lampClass = 'lamp-blue'; break;
    default: lampClass = '';
  }

  const baseColors = {
    red: '#E84545',
    green: '#27AE60',
    yellow: '#F5A623',
    blue: '#3498DB',
    off: '#4A3728'
  };

  const currentColor = baseColors[color] || baseColors.off;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      {/* Metal Soket */}
      <circle cx="20" cy="20" r="18" fill="#1C1410" stroke="#C9A84C" strokeWidth="2" />
      <circle cx="20" cy="20" r="14" fill="#2D2218" />
      
      {/* Cam Ampul */}
      <circle 
        cx="20" cy="20" r="12" 
        fill={color === 'off' ? '#1C1410' : currentColor} 
        className={lampClass}
      />
      
      {/* Yansıma */}
      <ellipse cx="16" cy="14" rx="4" ry="2" fill="rgba(255,255,255,0.4)" transform="rotate(-30 16 14)" />
    </svg>
  );
}
