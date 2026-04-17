import { useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';

// In a real app we'd load real mp3 files here
// Since we don't have them, we leave them ready to be attached.
const SOUND_FILES = {
  arena_music_intro: null,
  arena_music_main: null,
  arena_music_intense: null,
  arena_music_final: null,
  arena_music_victory: null,
  arena_crowd: null,
  question_arrive: null,
  answer_select: null,
  answer_lock: null,
  correct_answer: null,
  wrong_answer: null,
  time_warning: null,
  buzzer: null,
  joker_shield: null,
  joker_extend: null,
  joker_eliminate: null,
  crowd_ohh: null,
  leaderboard_shift: null,
  score_up: null,
  new_leader: null,
  drumroll: null,
  confetti_burst: null,
  victory_fanfare: null,
  podium_rise: null,
  badge_individual: null,
};

export const useAudio = () => {
  const soundsRef = useRef({});

  useEffect(() => {
    // Initialization of mock/placeholder sounds or real sounds if available
    Object.keys(SOUND_FILES).forEach(key => {
      // Assuming assets would be in /sounds/ folder. For safety in demo we don't load non-existent files.
      // this could just play silent or be mock
    });

    return () => {
      Howler.unload();
    };
  }, []);

  const play = (soundName, options = {}) => {
    // If sound existed, we'd do soundsRef.current[soundName].play()
    // For now it logs for debugging
    console.log(`[Audio] Playing ${soundName}`, options);
  };

  const stop = (soundName) => {
    console.log(`[Audio] Stopping ${soundName}`);
  };

  return { play, stop };
};
