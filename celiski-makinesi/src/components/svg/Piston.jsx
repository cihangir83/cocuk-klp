import React from 'react';

export default function Piston({
  width = 40,
  height = 120,
  isActive = false,
  isFast = false,
  className = ""
}) {
  const animClass = isActive ? (isFast ? 'piston-fast' : 'piston-active') : '';

  return (
    <svg width={width} height={height} viewBox="0 0 40 120" className={className}>
      <defs>
        <linearGradient id="pistonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1C1410" />
          <stop offset="50%" stopColor="#4A3728" />
          <stop offset="100%" stopColor="#1C1410" />
        </linearGradient>
        <linearGradient id="rodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A3728" />
          <stop offset="50%" stopColor="#8B7A2B" />
          <stop offset="100%" stopColor="#4A3728" />
        </linearGradient>
      </defs>

      {/* Dış Silindir */}
      <rect x="0" y="40" width="40" height="80" fill="url(#pistonGrad)" stroke="#1C1410" strokeWidth="2" rx="4" />
      <rect x="-2" y="36" width="44" height="10" fill="#2D2218" stroke="#1C1410" rx="2" />
      
      {/* Cam Pencere (içini görmek için) */}
      <rect x="12" y="55" width="16" height="50" fill="#0A0805" rx="8" />
      <rect x="14" y="57" width="12" height="46" fill="rgba(52,152,219,0.1)" rx="6" />

      {/* Hareketli Kol (Rod) */}
      <g className={animClass}>
        <rect x="14" y="0" width="12" height="80" fill="url(#rodGrad)" stroke="#1C1410" />
        {/* Piston başı (pencereden görünen) */}
        <rect x="12" y="70" width="16" height="12" fill="#C9A84C" rx="2" />
        <rect x="12" y="74" width="16" height="2" fill="#1C1410" />
        <rect x="12" y="78" width="16" height="2" fill="#1C1410" />
        {/* Üst Bağlantı */}
        <circle cx="20" cy="10" r="8" fill="#C9A84C" stroke="#1C1410" strokeWidth="2" />
        <circle cx="20" cy="10" r="3" fill="#1C1410" />
      </g>
    </svg>
  );
}
