import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const InkAssistant = () => {
  const [message, setMessage] = useState("Merhaba! Ben Mürekkep. Seninle bu hikayeyi yaratacağız. İlk panele bir arka plan eklemekle başlayalım!");
  const [visible, setVisible] = useState(true);

  // Simple rotation of messages for now
  useEffect(() => {
    const timer = setInterval(() => {
      setMessage((prev) => 
        prev.includes("Merhaba") 
          ? "Bu panelde henüz bir Bio-TRIZ sembolü yok... Hangi ilkeyi kullandıklarını göster!"
          : "Harika bir arka plan seçtin! Ama karakterin ne hissediyor? Bir diyalog eklesen?"
      );
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-8 right-8 z-50 flex items-end pointer-events-none">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={message}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="mb-4 mr-4 bg-white text-black p-4 rounded-3xl rounded-br-none border-4 border-black font-dialog text-sm max-w-[200px] shadow-[4px_4px_0_rgba(0,0,0,1)] pointer-events-auto"
            style={{fontFamily: "var(--font-dialog)"}}
          >
            <p className="font-bold">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
         className="w-20 h-20 bg-black rounded-full flex items-center justify-center relative shadow-[0_10px_20px_rgba(0,0,0,0.5)] pointer-events-auto cursor-pointer"
         animate={{ y: [0, -10, 0] }}
         transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
         onClick={() => setVisible(!visible)}
      >
        {/* Ink drop shape - simplified with css */}
        <div className="w-[120%] h-[120%] bg-blue-900 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] absolute border-2 border-cyan-400 rotate-45 mix-blend-screen opacity-50 blur-sm"></div>
        <div className="text-4xl">🦑</div>
      </motion.div>
    </div>
  );
};
