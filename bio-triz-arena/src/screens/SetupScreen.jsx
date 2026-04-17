import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame, P } from '../context/GameContext';
import ArenaBackground from '../components/ArenaBackground';

const TEAM_PRESETS = [
  { id: 'team_alpha', name: 'Alpha', color: '#00D4FF', icon: '🔵', baseColorClass: 'neon-blue' },
  { id: 'team_beta', name: 'Beta', color: '#FF2D78', icon: '🔴', baseColorClass: 'neon-pink' },
  { id: 'team_gamma', name: 'Gamma', color: '#39FF14', icon: '🟢', baseColorClass: 'neon-green' },
  { id: 'team_delta', name: 'Delta', color: '#9B59FF', icon: '🟣', baseColorClass: 'neon-purple' },
];

export default function SetupScreen() {
  const { state, dispatch } = useGame();
  
  // Local state for the form
  const [teams, setTeams] = useState(
    TEAM_PRESETS.map(preset => ({
      ...preset,
      customName: preset.name,
      membersCount: 3,
      isReady: false
    }))
  );

  const updateTeam = (id, field, value) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const toggleReady = (id) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, isReady: !t.isReady } : t));
  };

  const allReady = teams.every(t => t.isReady);

  const startTournament = () => {
    if (!allReady) return;
    
    // Dispatch all teams to context
    teams.forEach(t => {
      dispatch({
        type: P.ADD_TEAM,
        payload: {
          id: t.id,
          name: t.customName,
          color: t.color,
          icon: t.icon,
          members: Array(t.membersCount).fill('Öğrenci'),
          score: 0,
          jokers: { shield: 1, extend: 1, eliminate: 1 },
          answers: [],
          badges: []
        }
      });
    });

    dispatch({ type: P.START_GAME });
    dispatch({ type: P.SET_TIMER, payload: 30 });
  };

  return (
    <div className="relative w-full h-full flex flex-col pt-12 items-center bg-arena-bg">
      <ArenaBackground variant="connecting" />
      
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 text-center mb-10"
      >
        <h2 className="text-5xl font-arena font-bold text-white tracking-widest text-glow">
          TAKIM KURULUMU
        </h2>
        <p className="text-gray-400 mt-2 font-ui uppercase tracking-wider">
          Öğretmen Paneli - Lütfen takımları oluşturun
        </p>
      </motion.div>

      <div className="z-10 flex gap-6 px-8 w-full max-w-7xl justify-center">
        {teams.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex-1 flex flex-col p-6 rounded-xl border-2 transition-all duration-300 ${
              t.isReady 
                ? 'bg-arena-card border-[color:var(--team-color)] shadow-[0_0_20px_var(--team-color)]' 
                : 'bg-arena-card/50 border-gray-700 opacity-60 grayscale-[50%]'
            }`}
            style={{ '--team-color': t.color }}
          >
            <div className="text-4xl text-center mb-4">{t.icon}</div>
            
            <div className="mb-4">
              <label className="block text-xs uppercase text-gray-500 mb-1">Takım İsmi</label>
              <input 
                type="text" 
                value={t.customName}
                onChange={(e) => updateTeam(t.id, 'customName', e.target.value)}
                disabled={t.isReady}
                className="w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-team text-xl text-center focus:border-[color:var(--team-color)] focus:outline-none disabled:opacity-50"
              />
            </div>

            <div className="mb-6 flex flex-col items-center">
              <label className="block text-xs uppercase text-gray-500 mb-2">Üye Sayısı</label>
              <div className="flex items-center gap-4">
                <button 
                  disabled={t.isReady || t.membersCount <= 1}
                  onClick={() => updateTeam(t.id, 'membersCount', t.membersCount - 1)}
                  className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-gray-700 disabled:opacity-30"
                >-</button>
                <span className="text-2xl font-score w-8 justify-center flex">{t.membersCount}</span>
                <button 
                  disabled={t.isReady || t.membersCount >= 6}
                  onClick={() => updateTeam(t.id, 'membersCount', t.membersCount + 1)}
                  className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-gray-700 disabled:opacity-30"
                >+</button>
              </div>
            </div>

            <button
              onClick={() => toggleReady(t.id)}
              className={`mt-auto py-3 w-full rounded font-bold uppercase transition-colors ${
                t.isReady 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-[color:var(--team-color)] text-black hover:brightness-110'
              }`}
            >
              {t.isReady ? 'DÜZENLE' : 'HAZIR'}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="z-10 mt-16"
        animate={{ opacity: allReady ? 1 : 0.4 }}
      >
        <button
          disabled={!allReady}
          onClick={startTournament}
          className="px-16 py-5 rounded-lg font-arena font-bold text-4xl uppercase tracking-widest transition-all duration-300 border-2"
          style={{
            borderColor: allReady ? '#39FF14' : '#555',
            color: allReady ? '#39FF14' : '#555',
            boxShadow: allReady ? '0 0 30px rgba(57,255,20,0.4), inset 0 0 20px rgba(57,255,20,0.2)' : 'none',
            backgroundColor: allReady ? 'rgba(57,255,20,0.1)' : 'transparent',
            cursor: allReady ? 'pointer' : 'not-allowed'
          }}
        >
          TURNUVAYI BAŞLAT
        </button>
      </motion.div>
    </div>
  );
}
