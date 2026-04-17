import { useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { useGame } from '../context/GameContext';

// We use basic synthetic/placeholder paths or ignore if not found
const soundBank = {
  alarmIntro: new Howl({ src: ['/sounds/alarm_intro.mp3'], volume: 0.5 }),
  dramaticTheme: new Howl({ src: ['/sounds/dramatic_theme.mp3'], loop: true, volume: 0.3 }),
  timerCritical: new Howl({ src: ['/sounds/timer_critical.mp3'], loop: true, volume: 0.8 }),
  doorOpen: new Howl({ src: ['/sounds/door_open.mp3'], volume: 1.0 }),
  wrongAttempt: new Howl({ src: ['/sounds/wrong_attempt.mp3'], volume: 0.4 }),
  puzzleSolve: new Howl({ src: ['/sounds/puzzle_solve.mp3'], volume: 0.6 }),
  tokenUse: new Howl({ src: ['/sounds/token_use.mp3'], volume: 0.6 }),
  
  // Atmospheres
  roomOcean: new Howl({ src: ['/sounds/ocean_polluted.mp3'], loop: true, volume: 0.4 }),
  roomFire: new Howl({ src: ['/sounds/fire_crackling.mp3'], loop: true, volume: 0.4 }),
  roomIndustrial: new Howl({ src: ['/sounds/factory_hum.mp3'], loop: true, volume: 0.4 }),
};

export const playSound = (name) => {
  try {
    if (soundBank[name]) {
      soundBank[name].play();
    } else {
      console.warn(`Sound ${name} not found`);
    }
  } catch (e) {
    console.error("Audio play failed:", e);
  }
};

export const stopSound = (name) => {
  if (soundBank[name]) {
    soundBank[name].stop();
  }
};

export function AudioController() {
  const { state } = useGame();
  
  useEffect(() => {
    Howler.mute(state.isMuted);
  }, [state.isMuted]);

  // Handle ambient sounds based on current scene
  useEffect(() => {
    // Stop all ambients first
    stopSound('roomOcean');
    stopSound('roomFire');
    stopSound('roomIndustrial');
    stopSound('alarmIntro');

    switch (state.currentScene) {
      case 'opening':
        playSound('alarmIntro');
        break;
      case 'room_ocean':
        playSound('roomOcean');
        break;
      case 'room_fire':
        playSound('roomFire');
        break;
      case 'room_industrial':
        playSound('roomIndustrial');
        break;
      case 'selector':
        // Perhaps dramaticTheme
        break;
      case 'ending':
        // victory
        break;
    }
  }, [state.currentScene]);

  return null; // This is a logic-only component
}
