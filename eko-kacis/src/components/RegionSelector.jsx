import { useGame } from '../context/GameContext';
import { useCountdown } from '../hooks/useCountdown';
import { Lock, Unlock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegionSelector() {
  const { state, dispatch } = useGame();
  const { formattedTime, timerColor, isCritical } = useCountdown(state.totalTimeRemaining, true);

  const rooms = [
    {
      id: 'room_ocean',
      title: 'KİRLİ OKYANUS',
      status: state.completedRooms.includes('room_ocean') ? 'completed' : 'active',
      color: 'blue',
      image: 'linear-gradient(to bottom, #0A2A4A, #040E1A)'
    },
    {
      id: 'room_fire',
      title: 'ORMAN YANGINI',
      status: state.completedRooms.includes('room_fire') ? 'completed' : (state.completedRooms.includes('room_ocean') ? 'active' : 'locked'),
      color: 'orange',
      image: 'linear-gradient(to bottom, #FF4500, #0D0500)'
    },
    {
      id: 'room_industrial',
      title: 'ENDÜSTRİYEL KİRLİLİK',
      status: state.completedRooms.includes('room_industrial') ? 'completed' : (state.completedRooms.includes('room_fire') ? 'active' : 'locked'),
      color: 'green',
      image: 'linear-gradient(to bottom, #7FFF00, #0A0A08)'
    }
  ];

  const handleEnterRoom = (roomId, status) => {
    if (status === 'active' || status === 'completed') {
      dispatch({ type: 'ENTER_ROOM', payload: roomId });
    }
  };

  return (
    <div className="w-full h-screen bg-[#050505] text-white flex flex-col p-8 font-ui relative overflow-hidden">
      {/* Background static / details */}
      <div className="absolute inset-0 scanlines opacity-50"></div>
      
      {/* Header & Global Timer */}
      <header className="flex justify-between items-center mb-12 z-10 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-timer tracking-widest text-gray-400">ACİL DURUM KONTROL PANELİ</h1>
          <p className="text-sm text-gray-600 font-puzzle">SİSTEM DURUMU: ÇEVRİMİÇİ | BAĞLANTI: STABİL</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-timer tracking-widest text-gray-500 mb-1">TOPLAM SÜRE</span>
          <motion.div 
            className="text-5xl font-timer tracking-wider font-bold shadow-black drop-shadow-md"
            style={{ color: timerColor }}
            animate={isCritical ? { opacity: [1, 0.5, 1], scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            {formattedTime}
          </motion.div>
        </div>
      </header>

      {/* Monitors grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        {rooms.map((room, index) => {
          const isLocked = room.status === 'locked';
          const isActive = room.status === 'active';
          
          return (
            <motion.div
              key={room.id}
              className={`relative border-2 rounded-xl flex flex-col overflow-hidden transition-all duration-300 ${
                isLocked ? 'border-gray-800 opacity-60 grayscale cursor-not-allowed' :
                isActive ? 'border-red-600 cursor-pointer shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:scale-[1.02]' :
                'border-green-600 cursor-pointer opacity-80'
              }`}
              style={{ background: room.image }}
              onClick={() => handleEnterRoom(room.id, room.status)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLocked ? 0.6 : 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* CRT Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              
              <div className="flex-1 p-6 flex flex-col justify-center items-center relative z-10">
                {isLocked && <Lock className="w-16 h-16 text-gray-500 mb-4" />}
                {!isLocked && isActive && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                  </motion.div>
                )}
                {!isLocked && !isActive && <Unlock className="w-16 h-16 text-green-500 mb-4" />}
                <h2 className="text-2xl font-bold font-timer tracking-wide mb-2 text-center drop-shadow-md">{room.title}</h2>
              </div>
              
              <div className={`p-4 font-puzzle text-center ${
                isLocked ? 'bg-gray-900 text-gray-500' :
                isActive ? 'bg-red-900/80 text-red-200' :
                'bg-green-900/80 text-green-200'
              }`}>
                DURUM: {
                  isLocked ? 'KİLİTLİ' :
                  isActive ? 'KRİTİK' : 'KURTARILDI'
                }
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Footer Info */}
      <footer className="mt-8 z-10 flex justify-between font-puzzle text-gray-500 text-sm">
        <div>TAKIM: ALFA</div>
        <div className="flex items-center gap-2">
          <span>İPUCU TOKENLERİ:</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rotate-45 ${i < state.hintTokens ? 'bg-yellow-500 drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]' : 'bg-gray-800'}`}></div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
