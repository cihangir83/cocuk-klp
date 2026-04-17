import React from 'react';

// Farklı alet şekillerini tutan bir obje
const toolPaths = {
  screwdriver: <path d="M 20 80 L 40 60 L 45 40 L 55 40 L 60 60 L 80 20 L 75 15 L 55 55 L 45 55 L 25 75 Z" fill="currentColor"/>,
  bent_wrench: <path d="M 20 80 Q 40 50 80 20 L 90 30 Q 50 60 30 90 Z" fill="currentColor"/>,
  clamp: <path d="M 20 80 Q 50 20 80 20 L 80 40 Q 50 40 40 80 Z" fill="currentColor"/>,
  honeycomb_key: (
    <>
      <path d="M 30 70 L 70 30 L 80 40 L 40 80 Z" fill="currentColor"/>
      <circle cx="75" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="6"/>
      <circle cx="75" cy="25" r="5" fill="var(--color-bg-deep)" />
    </>
  ),
  ruler: <rect x="20" y="45" width="60" height="10" transform="rotate(-45 50 50)" fill="currentColor"/>,
  punch: <path d="M 20 50 L 50 20 L 80 50 L 50 80 Z" fill="currentColor"/>,
  caliper: <path d="M 20 80 L 80 20 M 70 10 L 90 30" fill="none" stroke="currentColor" strokeWidth="8"/>,
  curved_blade: <path d="M 20 80 Q 50 50 80 80 Q 50 80 20 80" fill="currentColor"/>,
  reverse_wrench: <path d="M 80 80 L 20 20 Q 10 30 20 40 Z" fill="currentColor"/>,
  prism: <polygon points="50,20 80,80 20,80" fill="none" stroke="currentColor" strokeWidth="8"/>,
  suction_tool: <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeDasharray="10 5" strokeWidth="8"/>,
  nesting_wrench: (
    <>
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4"/>
      <circle cx="50" cy="50" r="15" fill="currentColor"/>
    </>
  ),
  flexible_blade: <path d="M 20 50 Q 50 20 80 50 Q 50 80 20 50" fill="none" stroke="currentColor" strokeWidth="8"/>,
  tension_tool: <path d="M 20 20 L 80 80 M 20 80 L 80 20" stroke="currentColor" strokeWidth="8"/>,
  cycle_wrench: <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="8"/>,
  copy_stamp: <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="8"/>
};

export default function ToolIcon({
  shape = 'screwdriver',
  color = '--color-brass',
  size = 64,
  className = ""
}) {
  const SvgContent = toolPaths[shape] || toolPaths.screwdriver;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      style={{ color: `var(${color})`, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
    >
      {SvgContent}
      {/* Hafif parlama efekti için */}
      <g opacity="0.3" fill="var(--color-text-display)" style={{ mixBlendMode: 'overlay' }}>
        <circle cx="30" cy="30" r="10" filter="blur(5px)" />
      </g>
    </svg>
  );
}
