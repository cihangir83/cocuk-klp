import React from 'react';

export default function Pipe({ 
  width = 100, 
  height = 20, 
  type = 'horizontal', // horizontal, vertical, corner-tr, corner-tl, corner-br, corner-bl, t-shape
  isActive = false,
  className = ""
}) {
  const renderFlow = () => {
    if (!isActive) return null;
    
    // Aktifken akan mavi/buhar enerjisi
    let dasharray, dashoffsetAnim;
    
    if (type === 'horizontal') {
      return (
        <line 
          x1="0" y1={height/2} x2={width} y2={height/2} 
          stroke="var(--color-lamp-blue)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="10 15"
          style={{ animation: 'energy-flow 1s linear infinite' }}
        />
      );
    } else if (type === 'vertical') {
      return (
        <line 
          x1={width/2} y1="0" x2={width/2} y2={height} 
          stroke="var(--color-lamp-blue)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="10 15"
          style={{ animation: 'energy-flow 1s linear infinite' }}
        />
      );
    } else if (type.startsWith('corner')) {
      let path = "";
      if (type === 'corner-tr') path = `M 0,${height/2} Q ${width/2},${height/2} ${width/2},${height}`;
      if (type === 'corner-tl') path = `M ${width},${height/2} Q ${width/2},${height/2} ${width/2},${height}`;
      return (
        <path 
          d={path}
          fill="none"
          stroke="var(--color-lamp-blue)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="10 15"
          style={{ animation: 'energy-flow 1s linear infinite' }}
        />
      );
    }
  };

  const renderPipeBody = () => {
    const fill = "url(#pipeGrad)";
    const stroke = "var(--color-metal-light)";

    if (type === 'horizontal') {
      return <rect x="0" y="0" width={width} height={height} fill={fill} stroke={stroke} strokeWidth="2" />;
    } else if (type === 'vertical') {
      return <rect x="0" y="0" width={width} height={height} fill="url(#pipeGradVert)" stroke={stroke} strokeWidth="2" />;
    } else if (type === 'corner-tl') {
      return (
        <>
          <path d={`M ${width},0 L 0,0 L 0,${height} L ${width},${height} Z`} fill="none" opacity="0"/>
          <path d={`M ${width},0 L ${width/2},0 Q 0,0 0,${height/2} L 0,${height} L ${width},${height} Q ${width/2},${height} ${width/2},${height/2} L ${width},${height/2} Z`} fill={fill} stroke={stroke} strokeWidth="2"/>
        </>
      )
    }
    // Basit olması için diğer cornerları şimdilik düz yapıyorum, gerçek kullanımda css ile rotate edilir
    return <rect x="0" y="0" width={width} height={height} fill={fill} stroke={stroke} strokeWidth="2" />;
  };

  return (
    <svg width={width} height={height} className={className}>
      <defs>
        <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-metal-dark)" />
          <stop offset="30%" stopColor="var(--color-copper)" />
          <stop offset="60%" stopColor="var(--color-copper-bright)" />
          <stop offset="100%" stopColor="var(--color-metal-dark)" />
        </linearGradient>
        <linearGradient id="pipeGradVert" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-metal-dark)" />
          <stop offset="30%" stopColor="var(--color-copper)" />
          <stop offset="60%" stopColor="var(--color-copper-bright)" />
          <stop offset="100%" stopColor="var(--color-metal-dark)" />
        </linearGradient>
      </defs>
      {renderPipeBody()}
      {/* Boru ek yerleri */}
      {type === 'horizontal' && (
        <>
          <rect x="0" y="-2" width="8" height={height+4} fill="var(--color-metal-light)" stroke="var(--color-metal-dark)" rx="2" />
          <rect x={width-8} y="-2" width="8" height={height+4} fill="var(--color-metal-light)" stroke="var(--color-metal-dark)" rx="2" />
        </>
      )}
      {type === 'vertical' && (
        <>
          <rect x="-2" y="0" width={width+4} height="8" fill="var(--color-metal-light)" stroke="var(--color-metal-dark)" rx="2" />
          <rect x="-2" y={height-8} width={width+4} height="8" fill="var(--color-metal-light)" stroke="var(--color-metal-dark)" rx="2" />
        </>
      )}
      
      {renderFlow()}
    </svg>
  );
}
