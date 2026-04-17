import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { scenarios } from '../data/scenarios';
import { ComicContext } from '../context/ComicContext';

export const ScenarioDesk = ({ onScenarioSelect }) => {
  const { dispatch } = useContext(ComicContext);

  const handleSelect = (scenario) => {
    dispatch({ type: 'SELECT_SCENARIO', payload: scenario });
    onScenarioSelect(); // Trigger transition to Main Studio Screen
  };

  // Positions and rotations for the scattered folders
  const deskLayout = [
    { x: -50, y: -20, rotate: -5 },
    { x: 30, y: -40, rotate: 8 },
    { x: -20, y: 30, rotate: -2 },
    { x: 60, y: 20, rotate: 12 },
  ];

  return (
    <motion.div 
      className="w-full h-full bg-[var(--color-desk)] flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
    >
      {/* Wood texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`
      }}></div>

      <div className="absolute top-10 text-center z-10 w-full">
        <h1 className="text-5xl text-[var(--color-paper)] drop-shadow-md" style={{fontFamily: "var(--font-title)"}}>
          SENARYO DOSYALARI
        </h1>
        <p className="text-xl mt-2 text-yellow-200" style={{fontFamily: "var(--font-caption)"}}>Bir hikaye seç ve çizmeye başla...</p>
      </div>

      <div className="relative w-[800px] h-[500px] flex items-center justify-center mt-20">
        {scenarios.map((scenario, index) => {
          const layout = deskLayout[index] || { x: 0, y: 0, rotate: 0 };
          return (
            <motion.div
              key={scenario.id}
              className="absolute w-[320px] h-[400px] p-6 shadow-2xl cursor-pointer rounded-r-md border-l-8 border-black flex flex-col justify-between"
              style={{ 
                backgroundColor: scenario.colorTheme,
                top: `calc(50% - 200px + ${layout.y}px)`,
                left: `calc(50% - 160px + ${layout.x}px)`,
                rotate: layout.rotate,
                zIndex: index
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, type: "spring" }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 0, 
                zIndex: 10,
                y: -20,
                boxShadow: "0 25px 30px rgba(0,0,0,0.5)"
              }}
              onClick={() => handleSelect(scenario)}
            >
              {/* Folder tab */}
              <div className="absolute -top-6 left-0 w-32 h-6 rounded-t-lg border-l-2 border-t-2 border-r-2 border-black/20" style={{ backgroundColor: scenario.colorTheme }}></div>
              
              <div className="bg-[#FFF8E7] w-full h-[80%] mt-2 p-4 shadow-inner relative overflow-hidden text-black border-2 border-black/10 flex flex-col">
                 <h2 className="text-4xl leading-none mb-2" style={{fontFamily: "var(--font-title)"}}>{scenario.title}</h2>
                 <p className="font-bold text-sm mb-4">{scenario.subtitle}</p>
                 
                 <div className="mt-auto space-y-2">
                   <div className="flex justify-between text-xs font-semibold uppercase opacity-70">
                     <span>Zorluk:</span>
                     <span>{scenario.difficulty}</span>
                   </div>
                   <div className="flex justify-between text-xs font-semibold uppercase opacity-70">
                     <span>Süre:</span>
                     <span>{scenario.estimatedTime}</span>
                   </div>
                 </div>
                 
                 {/* Decorative Top Secret stamp */}
                 <div className="absolute bottom-2 right-2 border-4 border-red-500 text-red-500 font-bold px-2 py-1 rotate-[-15deg] opacity-40 text-xl" style={{fontFamily: "var(--font-caption)"}}>
                   GİZLİ
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
