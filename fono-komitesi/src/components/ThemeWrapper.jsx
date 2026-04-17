import React, { useEffect } from 'react';
import { playSound, stopSound } from '../utils/soundManager';

export default function ThemeWrapper({ children }) {
  useEffect(() => {
    playSound('ambient');
    return () => {
      stopSound('ambient');
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-room)] text-white font-['Inter'] relative overflow-hidden flex items-center justify-center">
      {/* Background ambient city lights effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent-blue)] blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-accent-cyan)] blur-[150px]" />
      </div>

      {children}
    </div>
  );
}
