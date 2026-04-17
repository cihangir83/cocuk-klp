import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { projects, allCriteria } from '../data/gameData';
import { playSound } from '../utils/soundManager';
import { Play, Pause, Save, CheckCircle2, ChevronRight } from 'lucide-react';

export default function PresentationScreen() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [note, setNote] = useState(state.notes[projects[activeTab].id] || '');

  const project = projects[activeTab];

  // Selected criteria objects
  const selectedCriteriaFull = allCriteria.filter(c => state.selectedCriteria.includes(c.id));

  useEffect(() => {
    playSound('presentationStart');
    setIsPlaying(true);
    setTextIndex(0);
    setNote(state.notes[project.id] || '');
  }, [activeTab, project.id, state.notes]);

  useEffect(() => {
    let timer;
    if (isPlaying && textIndex < project.presentationText.length) {
      timer = setTimeout(() => {
        playSound('slideChange');
        setTextIndex(prev => prev + 1);
        if (textIndex === project.presentationText.length - 1) {
          playSound('presentationEnd');
          setIsPlaying(false);
          dispatch({ type: 'MARK_PRESENTATION_WATCHED', payload: project.id });
        }
      }, 3000); // 3 seconds per sentence for testing
    }
    return () => clearTimeout(timer);
  }, [isPlaying, textIndex, project.presentationText.length, project.id, dispatch]);

  const handleSaveNote = () => {
    playSound('typingFormal');
    dispatch({ type: 'ADD_NOTE', payload: { projectId: project.id, note } });
  };

  const handleNextProject = () => {
    playSound('click');
    if (activeTab < projects.length - 1) {
      setActiveTab(prev => prev + 1);
    }
  };

  const isAllWatched = state.watchedPresentations.length === projects.length;

  return (
    <div className="w-full h-full flex flex-col pt-8 px-8 pb-4">
      {/* Top Bar Navigation */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => { playSound('click'); setActiveTab(idx); }}
              className={`px-4 py-2 font-['Share_Tech_Mono'] rounded transition-all flex items-center gap-2 ${
                idx === activeTab 
                  ? 'bg-[var(--color-bg-card)] border border-[var(--color-accent-blue)] text-white shadow-[0_0_10px_var(--color-holo-glow)]' 
                  : 'bg-black/50 text-gray-500 border border-transparent hover:text-gray-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              {p.name.toUpperCase()}
              {state.watchedPresentations.includes(p.id) && <CheckCircle2 size={14} className="text-[var(--color-success)] ml-2" />}
            </button>
          ))}
        </div>
        
        <button
          disabled={!isAllWatched}
          onClick={() => { playSound('click'); dispatch({ type: 'SET_STAGE', payload: 'analysis' }); }}
          className={`flex items-center gap-2 px-6 py-2 font-bold font-['Rajdhani'] tracking-widest rounded transition-all ${
            isAllWatched 
              ? 'bg-[var(--color-accent-blue)] text-black hover:bg-[var(--color-accent-cyan)] shadow-[0_0_15px_var(--color-accent-blue)] cursor-pointer' 
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          KARAR VER <ChevronRight size={20} />
        </button>
      </header>

      {/* Main Presentation Area */}
      <div className="flex-1 grid grid-cols-12 gap-6 relative">
        {/* Holographic Background visual */}
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none mix-blend-screen">
            {/* Fake Hologram Graphic based on project color */}
            <div className="w-[60vw] h-[60vw] rounded-full filter blur-[100px]" style={{ backgroundColor: project.color }} />
        </div>

        {/* Presentation Screen - Upper 60% vibe, but we use Flex to lay it out */}
        <div className="col-span-8 glass-panel flex flex-col rounded-xl overflow-hidden relative z-10 border border-[var(--color-glass-border)]">
          
          <div className="flex-1 flex items-center justify-center p-8">
            {/* Dynamic Holographic Visualization */}
            <motion.div 
               key={project.id + "_visual"}
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 0.8, scale: 1 }}
               transition={{ duration: (project.presentationText.length * 3), ease: "easeOut" }}
               className="w-full h-full flex items-center justify-center relative"
            >
                <img 
                  src={`/${project.id === 'aquafilter' ? 'aqua' : project.id === 'solarskin' ? 'solar' : project.id === 'rootnet' ? 'root' : 'wind'}_tech.png`}
                  alt={project.name}
                  className="w-[80%] h-[80%] object-contain mix-blend-screen pointer-events-none"
                  style={{ 
                    filter: `drop-shadow(0 0 30px ${project.color})`,
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', 
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)' 
                  }}
                />
                
                {/* Simulated Holographic Scanning Element */}
                <motion.div 
                  className="absolute inset-y-0 w-full bg-gradient-to-b from-transparent via-[var(--color-holo-glow)] to-transparent opacity-30 h-10 blur-sm pointer-events-none" 
                  animate={{ y: ['-500%', '500%'] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>
          </div>

          <div className="h-40 bg-gradient-to-t from-black to-transparent p-6 flex flex-col justify-end">
            <h2 className="text-3xl font-['Rajdhani'] mb-2" style={{ color: project.color }}>{project.name}</h2>
            <div className="font-['Share_Tech_Mono'] text-lg h-16 text-gray-200">
              <AnimatePresence mode="wait">
                {textIndex > 0 && textIndex <= project.presentationText.length && (
                  <motion.p
                    key={textIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    "{project.presentationText[textIndex - 1]}"
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            {/* Progress Bar for presentation */}
            <div className="w-full h-1 bg-gray-800 mt-4 rounded overflow-hidden">
               <motion.div 
                 className="h-full" 
                 style={{ backgroundColor: project.color }}
                 animate={{ width: `${(textIndex / project.presentationText.length) * 100}%` }} 
               />
            </div>
          </div>
        </div>

        {/* Observation & Data Panel */}
        <div className="col-span-4 flex flex-col gap-6 z-10">
          
          {/* Real-time Scores */}
          <div className="glass-panel p-6 flex-1 border border-[var(--color-glass-border)]">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-[var(--color-accent-cyan)] font-['Rajdhani'] tracking-widest text-lg">PROJE VERİLERİ</h3>
               <span className="text-xs text-gray-500 font-['Share_Tech_Mono']">Anlık Analiz</span>
             </div>
             
             <div className="space-y-4">
                {selectedCriteriaFull.map(c => {
                  const score = project.scores[c.id];
                  return (
                    <div key={c.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{c.name}</span>
                        <span className="font-['Share_Tech_Mono'] text-[var(--color-accent-blue)]">{score.toFixed(1)} / 10</span>
                      </div>
                      <div className="h-2 w-full bg-gray-800 flex rounded overflow-hidden">
                        {/* Show progress bar revealing based on presentation progress to feel 'live' */}
                        <motion.div 
                          className="h-full bg-[var(--color-accent-blue)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${(score / 10) * 100}%` }}
                          transition={{ duration: 1, delay: textIndex * 0.1 }}
                        />
                      </div>
                    </div>
                  )
                })}
             </div>
          </div>

          {/* Notes Block */}
          <div className="glass-panel p-6 border border-[var(--color-glass-border)] flex-1 flex flex-col">
            <h3 className="text-[var(--color-accent-gold)] font-['Rajdhani'] tracking-widest text-lg mb-4">KOMİTE NOTLARI</h3>
            <textarea
              className="w-full flex-1 bg-black/40 border border-gray-700 rounded p-3 text-sm text-gray-200 resize-none focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors font-['Share_Tech_Mono']"
              placeholder="Sunum sırasında dikkatinizi çekenleri not alın..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button 
              onClick={handleSaveNote}
              className="mt-4 flex items-center justify-center gap-2 bg-[var(--color-bg-card)] border border-gray-600 hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)] transition-all py-2 rounded text-sm text-gray-400"
            >
              <Save size={16} /> GÖZLEMİ KAYDET
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
