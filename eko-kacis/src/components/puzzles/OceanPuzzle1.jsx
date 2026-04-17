import { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../AudioController';

const DATA_POINTS = [
  { id: 'p1', coord: 'A-7', pH: 6.8, oxygen: 4.5, temp: 24, plastic: 45, isCritical: false, desc: 'A-7 Raporu: Kısmi kirlilik gözlemlendi. Yaşam kalitesi sınırda.' },
  { id: 'p2', coord: 'C-3', pH: 4.2, oxygen: 1.1, temp: 31, plastic: 89, isCritical: true, desc: 'C-3 Raporu: TÜM DEĞERLER KRİTİK SEVİYEYİ AŞTI! Derhal müdahale gerekli.', valveCode: [3, 1, 4, 2, 6, 5] },
  { id: 'p3', coord: 'E-4', pH: 5.5, oxygen: 3.2, temp: 26, plastic: 75, isCritical: false, desc: 'E-4 Raporu: Plastik yoğunluğu tehlikeli ama pH seviyesi tolere edilebilir.' },
  { id: 'p4', coord: 'F-1', pH: 7.1, oxygen: 1.9, temp: 28, plastic: 30, isCritical: false, desc: 'F-1 Raporu: Oksijen düşük ancak diğer değerler stabil.' },
];

export default function OceanPuzzle1({ onSolve }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [errorCount, setErrorCount] = useState(0);

  const handleSelect = (idx) => {
    playSound('buttonPress');
    setSelectedPoint(idx);
  };

  const handleVerify = () => {
    const point = DATA_POINTS[selectedPoint];
    if (point.isCritical) {
      playSound('puzzleSolve');
      onSolve({ coord: point.coord, valveCode: point.valveCode });
    } else {
      playSound('wrongAttempt');
      setErrorCount(prev => prev + 1);
    }
  };

  const currentData = selectedPoint !== null ? DATA_POINTS[selectedPoint] : null;

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-4">
      {/* MAP SECTION */}
      <div className="flex-1 border-2 border-[#0077BE]/50 bg-[#0A2A4A]/60 backdrop-blur-sm rounded-lg p-4 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
        <h3 className="font-timer text-[#0077BE] text-xl mb-4 border-b border-[#0077BE]/30 pb-2">
          OKYANUS KİRLİLİK HARİTASI
        </h3>
        
        {/* Render a simple grid map */}
        <div className="flex-1 relative border border-[#0077BE]/20 bg-[#040E1A] bg-[linear-gradient(rgba(0,119,190,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,119,190,0.1)_1px,transparent_1px)] bg-[size:40px_40px]">
          {/* Mock points on the map */}
          <PointBtn top="20%" left="30%" active={selectedPoint===0} onClick={() => handleSelect(0)} label="A-7" />
          <PointBtn top="60%" left="50%" active={selectedPoint===1} onClick={() => handleSelect(1)} label="C-3" />
          <PointBtn top="40%" left="75%" active={selectedPoint===2} onClick={() => handleSelect(2)} label="E-4" />
          <PointBtn top="80%" left="15%" active={selectedPoint===3} onClick={() => handleSelect(3)} label="F-1" />
        </div>
      </div>

      {/* DATA ANALYSIS SECTION */}
      <div className="md:w-1/3 flex flex-col gap-4">
        <div className="flex-1 border-2 border-[#0077BE]/50 bg-[#0A2A4A]/60 backdrop-blur-sm rounded-lg p-6 flex flex-col relative">
          <h3 className="font-timer text-[#0077BE] text-xl mb-6">ANALİZ VERİSİ</h3>
          
          {currentData ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
              <DataRow label="pH DEĞERİ" value={currentData.pH} criticalCondition={(v) => v < 6.0} />
              <DataRow label="OKSİJEN (mg/L)" value={currentData.oxygen} criticalCondition={(v) => v < 2.0} />
              <DataRow label="SICAKLIK (°C)" value={currentData.temp} criticalCondition={(v) => v > 28} />
              <DataRow label="PLASTİK YOĞUNLUĞU (%)" value={currentData.plastic} criticalCondition={(v) => v > 80} />
              
              <div className="mt-4 p-3 bg-black/40 border border-[#0077BE]/30 font-puzzle text-sm text-gray-300">
                {currentData.desc}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVerify}
                className="mt-6 py-3 w-full border-2 border-[#0077BE] text-[#0077BE] font-timer hover:bg-[#0077BE] hover:text-[#040E1A] transition-colors"
              >
                MÜDAHALE ODAĞI OLARAK İŞARETLE
              </motion.button>
              {errorCount > 0 && <p className="text-red-500 text-xs font-puzzle text-center">YANLIŞ ODAK NOKTASI TESPİT EDİLDİ.</p>}
            </motion.div>
          ) : (
             <div className="flex-1 flex items-center justify-center text-[#0077BE]/50 font-puzzle text-center">
               HARİTADAN BİR KOORDİNAT SEÇİNİZ
             </div>
          )}
        </div>
        
        {/* Notebook Panel */}
        <div className="h-32 border-2 border-gray-600 bg-gray-800/80 p-4 font-narrative text-gray-300 rounded-lg">
          <p className="text-sm text-gray-400 mb-2 border-b border-gray-600 pb-1">Not Defteri:</p>
          <p className="text-sm">"Sistemi tamir etmek için sadece tüm parametrelerin de kritik eşiği aştığı noktayı hedef almalıyım. Kritik eşikler: pH {'<'} 6, O2 {'<'} 2, Temp {'>'} 28, Plastik {'>'} 80."</p>
        </div>
      </div>
    </div>
  );
}

function PointBtn({ top, left, active, onClick, label }) {
  return (
    <motion.button
      className="absolute flex items-center justify-center"
      style={{ top, left, x: '-50%', y: '-50%' }}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
    >
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'bg-[#0077BE] border-white shadow-[0_0_10px_#0077BE]' : 'bg-transparent border-[#0077BE]'}`}>
        {active && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <span className={`absolute top-full mt-1 font-puzzle text-xs ${active ? 'text-white' : 'text-[#0077BE]'}`}>{label}</span>
    </motion.button>
  );
}

function DataRow({ label, value, criticalCondition }) {
  const isCritical = criticalCondition(value);
  return (
    <div className="flex justify-between items-center font-puzzle">
      <span className="text-gray-400">{label}:</span>
      <span className={`text-lg font-bold ${isCritical ? 'text-red-500' : 'text-[#0077BE]'}`}>
        {value} {isCritical && '⚠'}
      </span>
    </div>
  );
}
