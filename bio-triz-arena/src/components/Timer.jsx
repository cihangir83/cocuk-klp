import React, { useEffect, useState, useRef } from 'react';
import { useGame, P } from '../context/GameContext';

export default function Timer({ initialTime, onExpire }) {
  const { state, dispatch } = useGame();
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const requestRef = useRef();
  const startTimeRef = useRef();
  const previousTimeRef = useRef();
  const addedTimeRef = useRef(state.addedTime || 0);

  useEffect(() => {
    addedTimeRef.current = state.addedTime || 0;
  }, [state.addedTime]);

  useEffect(() => {
    // Reset timer when initialTime changes (new question)
    setTimeLeft(initialTime);
    startTimeRef.current = performance.now();
  }, [initialTime]);

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const elapsed = (time - startTimeRef.current) / 1000;
      const totalAllocatedTime = initialTime + addedTimeRef.current;
      const newTimeLeft = Math.max(0, totalAllocatedTime - elapsed);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        if (onExpire) setTimeout(() => onExpire(), 0);
        return; // handle expiration
      }
    }
    previousTimeRef.current = time;
    if (state.isTimerRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (state.isTimerRunning) {
      // Adjust start time if resuming
      if (timeLeft < initialTime) {
         startTimeRef.current = performance.now() - ((initialTime - timeLeft) * 1000);
      } else {
         startTimeRef.current = performance.now();
      }
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [state.isTimerRunning, initialTime]);

  // Sync to context roughly every second so we have a persistent integer standard for bonus score calculations
  useEffect(() => {
    const intTime = Math.ceil(timeLeft);
    if (Math.abs(state.timeRemaining - intTime) > 0) {
      dispatch({ type: P.SET_TIMER, payload: intTime });
    }
  }, [Math.ceil(timeLeft)]);

  // Visuals
  const totalAllocatedTime = initialTime + (state.addedTime || 0);
  const percentage = (timeLeft / totalAllocatedTime) * 100;
  
  let colorClass = 'bg-neon-green shadow-glow-green';
  if (percentage < 30) colorClass = 'bg-neon-orange shadow-[0_0_20px_rgba(255,107,53,0.4)]';
  if (percentage < 15) colorClass = 'bg-neon-pink shadow-glow-pink animate-pulse';

  const intTimeLeft = Math.ceil(timeLeft);

  return (
    <div className="flex items-center gap-4 bg-arena-panel px-6 py-2 rounded border border-gray-700">
      <div className="font-score text-2xl text-gray-400 tracking-widest shrink-0">SÜRE</div>
      
      <div className="w-[300px] h-6 bg-black rounded overflow-hidden relative border border-gray-800">
        <div 
          className={`h-full transition-all duration-[30ms] linear ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className={`font-score text-4xl w-12 text-right ${percentage < 15 ? 'text-neon-pink' : 'text-white'}`}>
        {intTimeLeft}
      </div>
    </div>
  );
}
