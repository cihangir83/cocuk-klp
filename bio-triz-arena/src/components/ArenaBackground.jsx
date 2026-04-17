import React from 'react';
import Particles from '@tsparticles/react';

export default function ArenaBackground({ variant = 'default' }) {

  const config = {
    background: {
      color: { value: '#050508' },
    },
    fpsLimit: 60,
    particles: {
      color: { value: ['#00D4FF', '#9B59FF', '#FF2D78', '#39FF14'] },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: variant === 'connecting',
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: variant === 'intense' ? 3 : 1,
        direction: 'none',
        random: false,
        straight: false,
        outModes: { default: 'bounce' },
      },
      number: {
        density: { enable: true, area: 800 },
        value: variant === 'intense' ? 80 : 40,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 bg-arena-bg pointer-events-none">
      <Particles
        id="tsparticles"
        options={config}
      />
      
      {/* Laser effects overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-arena-bg/80 to-arena-bg"></div>
    </div>
  );
}
