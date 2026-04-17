import { useState, useEffect, useMemo, useRef } from 'react';

export function useCountdown(initialSeconds, isActive = false, onTimeUp = null) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const audioContext = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let lastTime = Date.now();

    const updateTimer = () => {
      const now = Date.now();
      const delta = Math.floor((now - lastTime) / 1000);

      if (delta >= 1) {
        setTimeLeft((prev) => {
          const next = prev - delta;
          if (next <= 0) {
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return next;
        });
        lastTime = now;
      }
      
      if (isActive && timeLeft > 0) {
        animationFrameId = requestAnimationFrame(updateTimer);
      }
    };

    if (isActive && timeLeft > 0) {
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isActive, timeLeft, onTimeUp]);

  // Sync timeLeft externally if needed
  const setTime = (newTime) => setTimeLeft(newTime);

  const isCritical = timeLeft < initialSeconds * 0.1;

  const timerColor = useMemo(() => {
    const ratio = timeLeft / initialSeconds;
    if (ratio > 0.5) return 'var(--timer-green)';
    if (ratio > 0.25) return 'var(--timer-yellow)';
    if (ratio > 0.1) return 'var(--timer-red)';
    return 'var(--timer-critical)';
  }, [timeLeft, initialSeconds]);

  const formattedTime = useMemo(() => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [timeLeft]);

  return { timeLeft, formattedTime, timerColor, isCritical, setTime };
}
