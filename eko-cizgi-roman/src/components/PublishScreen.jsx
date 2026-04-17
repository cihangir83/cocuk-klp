import React, { useContext, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ComicContext } from '../context/ComicContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const PublishScreen = ({ onBack }) => {
  const { state } = useContext(ComicContext);
  const [publishingState, setPublishingState] = useState('printing'); // printing, done
  const comicContainerRef = useRef(null);

  useEffect(() => {
    // Simulate printing machine animation time
    const timer = setTimeout(() => {
      setPublishingState('done');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = async () => {
    if (!comicContainerRef.current) return;
    
    // Generate PDF
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Cover Page Generation (Simulated)
      pdf.setFillColor(state.selectedScenario.colorTheme);
      pdf.rect(0, 0, 210, 297, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(40);
      pdf.text(state.selectedScenario.title, 105, 100, { align: 'center' });
      pdf.setFontSize(20);
      pdf.text(state.selectedScenario.subtitle, 105, 120, { align: 'center' });
      pdf.setFontSize(14);
      pdf.text("Yazar: " + state.coverDetails.authorName, 105, 250, { align: 'center' });

      // Add a new page for Panels
      pdf.addPage();
      pdf.setFillColor('#FFF8E7');
      pdf.rect(0, 0, 210, 297, 'F');
      
      // We render the hidden dom container 
      const canvas = await html2canvas(comicContainerRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Fit to A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 20, pdfWidth, pdfHeight);

      // Save PDF
      pdf.save(`eko_cizgi_roman_${state.selectedScenario.id}.pdf`);
    } catch (error) {
      console.error("PDF Export failed:", error);
      alert("PDF oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A1A1A] relative overflow-hidden">
      {publishingState === 'printing' && (
        <motion.div 
           className="flex flex-col items-center"
           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
           {/* Simulate a printing press animation using CSS/Framer */}
           <motion.div 
             className="w-64 h-32 bg-gray-800 border-4 border-gray-600 rounded-t-xl relative overflow-hidden"
             animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}
           >
             <motion.div 
               className="w-48 h-full bg-white mx-auto absolute inset-x-0 -bottom-16"
               animate={{ y: [-100, 0] }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
             />
           </motion.div>
           <h1 className="text-4xl text-yellow-400 mt-8 font-title" style={{fontFamily: "var(--font-title)"}}>MATBAA ÇALIŞIYOR...</h1>
        </motion.div>
      )}

      {publishingState === 'done' && (
        <motion.div 
           className="flex flex-col items-center"
           initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        >
           <h1 className="text-5xl text-yellow-400 mb-8 font-title" style={{fontFamily: "var(--font-title)"}}>ÇİZGİ ROMANIN HAZIR!</h1>
           
           <div className="flex gap-4">
             <button onClick={handleDownloadPDF} className="bg-green-500 text-white font-bold py-3 px-8 rounded text-xl shadow-[4px_4px_0_#FFF] border-2 border-white hover:bg-green-400 transition-colors">
               PDF İNDİR
             </button>
             <button onClick={onBack} className="bg-gray-600 text-white font-bold py-3 px-8 rounded text-xl shadow-[4px_4px_0_#000] border-2 border-black hover:bg-gray-500 transition-colors">
               STÜDYOYA DÖN
             </button>
           </div>
        </motion.div>
      )}

      {/* Hidden container for html2canvas to capture the comic panels */}
      <div 
        ref={comicContainerRef} 
        style={{ position: 'absolute', top: '-10000px', left: '-10000px', width: '800px', backgroundColor: '#FFF8E7', padding: '40px' }}
      >
        <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: '40px', textAlign: 'center', marginBottom: '20px' }}>{state.selectedScenario.title}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {state.panels.map((p, idx) => (
             <div key={idx} style={{ width: '100%', height: '350px', backgroundColor: p.background ? '#3498DB' : '#fff', border: '4px solid #1A1A1A', borderRadius: '4px', position: 'relative' }}>
                <span style={{ position: 'absolute', bottom: '5px', right: '10px', fontSize: '12px', fontWeight: 'bold' }}>{idx + 1}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};
