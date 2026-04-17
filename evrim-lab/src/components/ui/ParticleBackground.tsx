import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

interface ParticleBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
}

export function ParticleBackground({ intensity = 'medium', color }: ParticleBackgroundProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesConfig: any = {
    particles: {
      number: {
        value: intensity === 'low' ? 30 : intensity === 'medium' ? 60 : 100,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: color ? [color] : ['#00FFD1', '#9B59FF', '#39FF14', '#FF6B35']
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.3,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.3,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: color || '#00FFD1',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out'
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5
          }
        }
      }
    },
    retina_detect: true,
    background: {
      color: 'transparent'
    }
  };

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={particlesConfig}
        className="w-full h-full"
      />
    </div>
  );
}
