import React, { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function StarField() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    fullScreen: false,
    background: { color: 'transparent' },
    fpsLimit: 60,
    particles: {
      number: { value: 120, density: { enable: true, width: 1920, height: 1080 } },
      color: { value: ['#ffffff', '#E8E4FF', '#A78BFA', '#60A5FA'] },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: { enable: true, speed: 0.5, sync: false },
      },
      size: {
        value: { min: 0.5, max: 2.5 },
        animation: { enable: true, speed: 1, sync: false },
      },
      move: {
        enable: true,
        speed: 0.15,
        direction: 'none',
        random: true,
        straight: false,
        outModes: 'out',
      },
      twinkle: {
        particles: { enable: true, frequency: 0.008, color: '#FFD700', opacity: 1 },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
      },
      modes: {
        grab: { distance: 120, links: { opacity: 0.15, color: '#A78BFA' } },
      },
    },
  }), []);

  return (
    <div className="stars-container" style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      {/* Deep space gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(75, 0, 130, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(13, 27, 74, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, rgba(88, 28, 135, 0.1) 0%, transparent 40%),
          linear-gradient(180deg, #030510 0%, #080C1A 100%)
        `,
      }} />

      {/* Nebula layers */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 40%, rgba(99, 102, 241, 0.06) 0%, transparent 60%)',
        animation: 'nebulaShift 15s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 60%, rgba(139, 92, 246, 0.05) 0%, transparent 60%)',
        animation: 'nebulaShift 20s ease-in-out infinite reverse',
      }} />

      {/* tsParticles stars */}
      <Particles
        id="starfield"
        init={particlesInit}
        options={options}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Noise & vignette */}
      <div className="noise-overlay" />
      <div className="vignette" />
    </div>
  );
}
