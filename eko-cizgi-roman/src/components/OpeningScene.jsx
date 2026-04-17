import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const OpeningScene = ({ onEnter }) => {
  const [doorOpen, setDoorOpen] = useState(false);

  const handleEnter = () => {
    setDoorOpen(true);
    setTimeout(() => {
      onEnter();
    }, 1500); // Wait for the zoom-in animation
  };

  return (
    <AnimatePresence>
      {!doorOpen && (
        <motion.div 
          className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0, filter: 'brightness(2)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Background indicating a slightly dark hallway */}
          <div className="absolute inset-0 bg-[#0a0805] opacity-80" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Wooden Door Graphic using CSS */}
            <div className="w-[300px] h-[500px] bg-[var(--color-wood-dark)] border-[12px] border-[#3E2723] rounded-t-sm shadow-2xl relative flex flex-col items-center justify-start pt-16">
               <div className="absolute top-2 w-[260px] h-32 border-4 border-[#3E2723] opacity-30"></div>
               <div className="absolute bottom-4 w-[260px] h-64 border-4 border-[#3E2723] opacity-30"></div>
               
               {/* Glowing Lamp */}
               <div className="absolute -top-12 w-16 h-12 bg-yellow-200/20 rounded-full blur-[20px] shadow-[0_0_50px_rgba(255,225,53,0.5)]"></div>
               
               {/* Sign */}
               <motion.div 
                 initial={{ y: -20, rotate: -2 }}
                 animate={{ y: 0, rotate: 1 }}
                 transition={{ type: "spring", stiffness: 100, damping: 10 }}
                 className="bg-[#D32F2F] text-white font-title text-4xl py-2 px-6 border-4 border-[#FFCDD2] shadow-xl rotate-2"
                 style={{fontFamily: "var(--font-title)"}}
               >
                 STUDIO
               </motion.div>

               {/* Door Knob */}
               <div className="absolute right-4 top-1/2 w-8 h-8 rounded-full bg-yellow-600 border-2 border-yellow-800 shadow-md"></div>
            </div>

            {/* Narrator Box */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 bg-[#FFF8E7] text-[#0D0D0D] p-4 text-center max-w-md shadow-lg border-2 border-dashed border-[#1A1A1A] rotate-[-1deg]"
              style={{fontFamily: "var(--font-caption)"}}
            >
              <p className="text-xl">"Her büyük fikir önce bir sayfada başlar.<br/>Seninki bugün başlıyor."</p>
            </motion.div>

            {/* Enter Button */}
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="mt-8 bg-[var(--color-accent-yellow)] text-black px-8 py-3 rounded-md text-3xl shadow-[4px_4px_0_#0D0D0D] border-2 border-black hover:bg-yellow-300 transition-colors"
               style={{fontFamily: "var(--font-title)"}}
            >
              STÜDYOYU AÇ
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
