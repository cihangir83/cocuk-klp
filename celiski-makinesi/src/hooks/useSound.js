import { useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { useGame } from '../context/GameContext';

// We'll use synthesized Web Audio API sounds for the placeholder
// until actual real mp3 files are provided.
export function useGameSound() {
  const { state } = useGame();
  const audioCtxRef = useRef(null);

  useEffect(() => {
    Howler.mute(!state.soundEnabled);
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, [state.soundEnabled]);

  const playSynthesized = (type) => {
    if (!state.soundEnabled) return;
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'click':
        // Metallic click
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'gearStart':
        // Gear grinding starting
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.5);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;

      case 'steamBurst':
        // Steam hissing (white noise approximation using high freq oscillator changing rapidly)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.linearRampToValueAtTime(2000, now + 0.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
        break;

      case 'success':
        // Success chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.setValueAtTime(554.37, now + 0.1); // C#5
        osc.frequency.setValueAtTime(659.25, now + 0.2); // E5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        break;

      case 'error':
        // Error buzzer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(100, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
        
      case 'metalHit':
        // Incorrect tool connection
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
    }
  };

  return {
    playClick: () => playSynthesized('click'),
    playGearStart: () => playSynthesized('gearStart'),
    playSteamBurst: () => playSynthesized('steamBurst'),
    playSuccess: () => playSynthesized('success'),
    playError: () => playSynthesized('error'),
    playMetalHit: () => playSynthesized('metalHit')
  };
}
