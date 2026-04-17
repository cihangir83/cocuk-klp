import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { projects } from '../data/gameData';
import { playSound } from '../utils/soundManager';

export default function JustificationScreen() {
  const { state, dispatch } = useGame();
  const [text, setText] = useState('');
  const [signature, setSignature] = useState('');
  
  const minWords = 20; // Changed to lower for testing, prompt asked for 3 sentences ~20-30 words
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  
  const canSign = wordCount >= minWords && signature.length >= 3;

  const handleSign = () => {
    playSound('sealStamp');
    dispatch({ type: 'SET_JUSTIFICATION', payload: text });
    
    setTimeout(() => {
      dispatch({ type: 'SET_STAGE', payload: 'report' });
    }, 1500);
  };

  const selectedProject = projects.find(p => p.id === state.finalDecision);
  
  const alternativeScenarios = state.scenarios;
  // Compute if any alternative scenario had a different winner
  let altWinner = null;
  if (alternativeScenarios.length > 0) {
    const lastAlt = alternativeScenarios[alternativeScenarios.length - 1];
    if (lastAlt.results.rankings[0].id !== state.finalDecision) {
      altWinner = projects.find(p => p.id === lastAlt.results.rankings[0].id);
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl h-[90vh] bg-[#F5F5F0] text-[#111827] flex flex-col z-10 shadow-[0_0_50px_rgba(255,255,255,0.1)] rounded"
      style={{ fontFamily: "'Times New Roman', serif" }}
    >
      <div className="p-12 pb-4 border-b-2 border-black flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-widest mb-1 font-['Cinzel']">EKO İNOVASYON FONU</h1>
          <h2 className="text-lg tracking-widest text-gray-700 font-['Cinzel']">2026 KOMİTE KARARI</h2>
        </div>
        <div className="text-right text-sm">
          <p><strong>TARİH:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
          <p><strong>BAŞKAN:</strong> {state.playerName.toUpperCase()}</p>
          <p><strong>BÜTÇE DÖKÜMÜ:</strong> 10.000.000 ₺ (TAM)</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-12 py-8 space-y-8 text-sm leading-relaxed">
        
        <div>
          <h3 className="font-bold underline uppercase mb-2">1. ONAYLANAN PROJE</h3>
          <p className="text-xl font-bold font-['Rajdhani']" style={{ color: selectedProject?.color || 'black' }}>
            {selectedProject?.name.toUpperCase()}
          </p>
          <p className="italic text-gray-600">{selectedProject?.tagline}</p>
        </div>

        <div>
          <h3 className="font-bold underline uppercase mb-2">2. AHP ANALİZİNDEKİ BULGULAR</h3>
          <ul className="list-disc pl-5">
            <li>Kullanılan Kriterler ve Ağırlıklar: {Object.entries(state.criteriaWeights).map(([k,v]) => `${k} (%${v})`).join(', ')}</li>
            <li>Tutarsızlık Oranı (CR): {state.analysisResult?.consistencyRatio.toFixed(3)} {state.analysisResult?.consistencyRatio <= 0.1 ? "(Kabul Edilebilir)" : "(Sınır Aşımı)"}</li>
            <li>Analitik Nihai Skor: <strong>{state.analysisResult?.rankings.find(r => r.id === state.finalDecision)?.absoluteScore.toFixed(2)}</strong></li>
          </ul>
        </div>

        {alternativeScenarios.length > 0 && (
          <div>
            <h3 className="font-bold underline uppercase mb-2">3. ALTERNATİF SENARYOLAR</h3>
            <p>
              Farklı ağırlıklandırmalarda komite farklı senaryolar test etmiştir.
              {altWinner ? ` Başka bir senaryoda kazanan ${altWinner.name} projesi olabilirdi, ancak nihai ağırlıklar esastır.` : ` Diğer test edilen senaryolarda da ${selectedProject?.name} önde çıkmıştır.`}
            </p>
          </div>
        )}

        <div>
          <h3 className="font-bold underline uppercase mb-2">4. NİHAİ KARAR GEREKÇESİ (ZORUNLU)</h3>
          <p className="text-xs text-gray-500 mb-2">Lütfen seçiminizi nedenleriyle belirtin. (En az {minWords} kelime. Mevcut: {wordCount})</p>
          <textarea 
             className="w-full h-32 border border-gray-400 p-4 font-['Courier_New'] text-sm focus:outline-none focus:border-black bg-transparent"
             placeholder="Örn: Bu projeyi fonlama kararı verdik çünkü..."
             value={text}
             onChange={(e) => { playSound('typingFormal'); setText(e.target.value); }}
          />
        </div>

      </div>

      <div className="p-12 pt-4 bg-gray-100 border-t-2 border-black flex justify-between items-end">
        <div className="w-64">
           <p className="text-xs text-gray-500 mb-1">MÜHÜR VE İMZA:</p>
           <input 
             type="text" 
             placeholder="İsminizi Yazarak İmzalayın" 
             value={signature}
             onChange={(e) => setSignature(e.target.value)}
             className="w-full border-b border-black bg-transparent py-1 text-2xl font-['Caveat',cursive] focus:outline-none text-center"
           />
        </div>
        
        <button
          disabled={!canSign}
          onClick={handleSign}
          className={`px-8 py-3 uppercase tracking-widest font-bold ${canSign ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          BELGEYİ İMZALA
        </button>
      </div>
    </motion.div>
  );
}
