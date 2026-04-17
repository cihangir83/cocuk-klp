import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { projects, allCriteria } from '../data/gameData';
import { calculateAHP } from '../utils/ahpCalculator';
import { playSound } from '../utils/soundManager';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RefreshCcw, AlertTriangle, Zap, CheckSquare } from 'lucide-react';

export default function AnalysisScreen() {
  const { state, dispatch } = useGame();
  const selectedFull = allCriteria.filter(c => state.selectedCriteria.includes(c.id));
  
  const [weights, setWeights] = useState(state.criteriaWeights);
  const [matrix, setMatrix] = useState(state.ahpMatrix);
  const [results, setResults] = useState(null);
  
  // Re-calculate AHP whenever weights or matrix changes
  useEffect(() => {
    // Debounce to avoid too much sound
    const res = calculateAHP(matrix, weights, projects);
    setResults(res);
  }, [weights, matrix]);

  const handleSliderChange = (critId, val) => {
    const newVal = parseInt(val, 10);
    const oldVal = weights[critId];
    const diff = newVal - oldVal;
    
    // Adjust other sliders proportional to diff
    const others = selectedFull.filter(c => c.id !== critId);
    let remainingToDistribute = -diff;
    
    const newWeights = { ...weights, [critId]: newVal };
    
    others.forEach((o, idx) => {
      if (idx === others.length - 1) {
        newWeights[o.id] = Math.max(0, weights[o.id] + remainingToDistribute);
      } else {
        const share = Math.round(remainingToDistribute / (others.length - idx));
        newWeights[o.id] = Math.max(0, weights[o.id] + share);
        remainingToDistribute -= share;
      }
    });

    setWeights(newWeights);
    // playSound('sliderMove'); // maybe tie to mouseup to avoid spam
  };

  const saveSimulationScenario = () => {
    playSound('scenarioSwitch');
    dispatch({ 
      type: 'SAVE_SCENARIO', 
      payload: { weights, matrix, results } 
    });
  };

  const handleDecisionPhase = () => {
    playSound('decisionBuild');
    dispatch({ type: 'UPDATE_WEIGHTS', payload: weights });
    dispatch({ type: 'UPDATE_AHP_MATRIX', payload: matrix });
    dispatch({ type: 'SET_ANALYSIS_RESULT', payload: results });
    dispatch({ type: 'SET_STAGE', payload: 'decision' });
  };

  if (!results) return null;

  // Format data for Radar Chart
  const radarData = selectedFull.map(c => {
    const obj = { subject: c.name };
    projects.forEach(p => {
       obj[p.id] = p.scores[c.id];
    });
    return obj;
  });

  const barData = results.rankings.map(r => ({
    name: r.name,
    score: r.absoluteScore.toFixed(2),
    fill: projects.find(p => p.id === r.id).color
  }));

  return (
    <div className="w-full h-full p-8 flex flex-col z-10 font-['Share_Tech_Mono']">
      
      <header className="flex justify-between items-end border-b border-[var(--color-glass-border)] pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-['Rajdhani'] font-bold text-white tracking-wider">AHP ANALİZ SİMÜLASYONU</h1>
          <p className="text-[var(--color-accent-blue)]">Kriter Ağırlıklandırma ve Karar Matrisi</p>
        </div>
        <button 
          onClick={saveSimulationScenario}
          className="flex items-center gap-2 text-sm text-[var(--color-accent-gold)] border border-[var(--color-accent-gold)] px-4 py-2 hover:bg-[var(--color-accent-gold)] hover:text-black transition-colors"
        >
          <RefreshCcw size={16} /> KRİTER AĞIRLIKLARINI DEĞİŞTİR (SENARYO KAYDET)
        </button>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 h-full overflow-hidden">
        
        {/* Left Panel: Sliders & Weights */}
        <div className="col-span-4 glass-panel border border-[var(--color-glass-border)] p-6 flex flex-col">
          <h2 className="text-lg font-['Rajdhani'] text-[var(--color-accent-cyan)] mb-6 tracking-widest border-b border-gray-700 pb-2">1. KRİTER AĞIRLIKLARI</h2>
          
          <div className="space-y-8 flex-1">
            {selectedFull.map(c => (
              <div key={c.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-200">{c.name}</span>
                  <span className="text-[var(--color-accent-blue)]">% {weights[c.id]}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={weights[c.id]} 
                  onChange={(e) => handleSliderChange(c.id, e.target.value)}
                  onMouseUp={() => playSound('chartUpdate')}
                  className="w-full h-2 bg-gray-800 rounded appearance-none cursor-pointer outline-none slider-thumb"
                />
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-700 flex justify-between text-gray-400">
               <span>TOPLAM:</span>
               <span className={Object.values(weights).reduce((a, b) => a + b, 0) === 100 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}>
                  % {Object.values(weights).reduce((a, b) => a + b, 0)} ✓
               </span>
            </div>
            
            <div className="bg-black/30 p-4 border-l-2 border-[var(--color-accent-purple)] text-xs text-gray-400 mt-4 leading-relaxed">
              <strong>Simülasyon Modu:</strong> <br/>
              Ağırlıkları değiştirerek farklı önceliklerde fonun hangi projeye gideceğini görebilirsiniz. Ekolojiyi önemserseniz sonuç ne olur?
            </div>
          </div>
        </div>

        {/* Center Panel: Radar Chart & Consistency */}
        <div className="col-span-4 glass-panel border border-[var(--color-glass-border)] p-6 flex flex-col relative">
           <h2 className="text-lg font-['Rajdhani'] text-[var(--color-accent-cyan)] mb-2 tracking-widest border-b border-gray-700 pb-2">2. ÇOK BOYUTLU ANALİZ</h2>
           
           <div className="flex-1 w-full relative pt-4 text-xs font-['Inter']">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                 <PolarGrid stroke="#374151" />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                 <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#6b7280' }} />
                 {projects.map((p, i) => (
                   <Radar key={p.id} name={p.name} dataKey={p.id} stroke={p.color} fill={p.color} fillOpacity={0.1} />
                 ))}
                 <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 15, 30, 0.9)', borderColor: '#374151', color: 'white', fontFamily: 'Share Tech Mono' }} />
               </RadarChart>
             </ResponsiveContainer>
           </div>
           
           <div className={`mt-4 p-3 border rounded text-sm flex items-center gap-3 ${results.consistencyRatio > 0.1 ? "border-[var(--color-danger)] bg-red-900/20 text-[var(--color-danger)]" : "border-[var(--color-success)] bg-green-900/20 text-[var(--color-success)]"}`}>
             {results.consistencyRatio > 0.1 ? <AlertTriangle size={18} /> : <CheckSquare size={18} />}
             <div>
                <div>Tutarsızlık Oranı (CR): {results.consistencyRatio.toFixed(3)}</div>
                <div className="text-xs opacity-70">
                  {results.consistencyRatio > 0.1 ? "⚠ Kararları gözden geçirin" : "✓ Analiz mantıksal tutarlılığa sahip."}
                </div>
             </div>
           </div>
        </div>

        {/* Right Panel: Final Result Bar Chart */}
        <div className="col-span-4 glass-panel border border-[var(--color-glass-border)] p-6 flex flex-col">
          <h2 className="text-lg font-['Rajdhani'] text-[var(--color-accent-gold)] mb-4 tracking-widest border-b border-gray-700 pb-2 flex items-center gap-2">
             <Zap size={18} /> 3. NİHAİ SKOR SIRALAMASI
          </h2>
          
          <div className="flex-1 mt-4">
             <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 10]} hide />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#d1d5db', fontSize: 12, fontFamily: 'Rajdhani' }} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(10,15,30,0.9)', borderColor: '#FFB300', fontFamily: 'Share Tech Mono' }} />
                  <Bar dataKey="score" fill="#8884d8" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: 'white', fontSize: 12 }}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
          
          {/* Winner indication */}
          <div className="bg-black/40 p-4 border border-[var(--color-accent-gold)] mt-auto flex justify-between items-center">
             <div>
               <div className="text-xs text-gray-400">GÜNCEL LİDER</div>
               <div className="text-2xl text-[var(--color-accent-gold)] font-['Rajdhani'] font-bold">{barData[0]?.name}</div>
             </div>
             <div className="text-3xl text-white">{barData[0]?.score}</div>
          </div>

          <button
            onClick={handleDecisionPhase}
            className="w-full mt-6 py-4 bg-[var(--color-accent-gold)] text-black font-bold tracking-widest text-lg hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(255,179,0,0.3)] flex justify-center items-center gap-2 font-['Rajdhani']"
          >
            [ KARAR AŞAMASINA GEÇ ]
          </button>
        </div>

      </div>
      
      {/* Global style override for range slider */}
      <style dangerouslySetInnerHTML={{__html:`
        .slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-accent-blue);
          cursor: pointer;
          box-shadow: 0 0 10px var(--color-accent-blue);
        }
      `}} />
    </div>
  );
}
