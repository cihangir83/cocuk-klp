import React, { useEffect, useState } from 'react';

export default function SteamParticles({ 
  active = false, 
  intensity = 'normal', // normal, heavy, burst
  className = "" 
}) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const intervalRate = intensity === 'heavy' ? 200 : intensity === 'burst' ? 50 : 400;
    
    const interval = setInterval(() => {
      setParticles(prev => {
        // Keep only max 20 particles
        const current = prev.length > 20 ? prev.slice(1) : [...prev];
        return [...current, {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 15 + 10,
          duration: Math.random() * 2 + 1.5,
          isBurst: intensity === 'burst' && Math.random() > 0.5
        }];
      });
    }, intervalRate);

    return () => clearInterval(interval);
  }, [active, intensity]);

  if (!active && particles.length === 0) return null;

  return (
    <div className={`absolute inset-0 overflow-visible pointer-events-none ${className}`}>
      {particles.map(p => (
        <div
          key={p.id}
          className={p.isBurst ? 'steam-burst-particle absolute' : 'steam-particle absolute'}
          style={{
            left: `${p.left}%`,
            bottom: '0%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
}
