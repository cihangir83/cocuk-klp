import { useState, useEffect, useCallback, useRef } from 'react';

export function useTypewriter(text, speed = 50, startDelay = 0, enabled = true) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayText('');
      setIsComplete(false);
      setIsStarted(false);
      return;
    }

    setDisplayText('');
    setIsComplete(false);
    setIsStarted(false);

    const startTimeout = setTimeout(() => {
      setIsStarted(true);
      let index = 0;
      
      const type = () => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
          // İnsan benzeri hız — değişken
          const variance = speed * (0.5 + Math.random());
          const charDelay = text[index - 1] === '.' || text[index - 1] === ',' ? speed * 4 : variance;
          setTimeout(type, charDelay);
        } else {
          setIsComplete(true);
        }
      };
      
      type();
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay, enabled]);

  const skip = useCallback(() => {
    setDisplayText(text);
    setIsComplete(true);
  }, [text]);

  return { displayText, isComplete, isStarted, skip };
}

export function useGameTimer(enabled, durationMinutes) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    intervalRef.current = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [enabled]);

  const remaining = Math.max(0, durationMinutes * 60 - elapsed);
  const isExpired = remaining === 0 && enabled;
  const isCritical = remaining < 120 && enabled; // Son 2 dakika

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const reset = () => setElapsed(0);

  return { elapsed, remaining, isExpired, isCritical, formatTime, reset };
}
