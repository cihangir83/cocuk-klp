import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import MetalButton from '../ui/MetalButton';
import MetalPlate from '../ui/MetalPlate';

export default function TeacherPanel() {
  const { state, dispatch } = useGame();
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setAuthenticated(true);
    } else {
      alert("Yanlış PIN");
      setPin('');
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", `celiski_makinesi_save_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleReset = () => {
    if (window.confirm("Tüm oyuncu verileri silinecek! Başlangıca dönülecek. Emin misiniz?")) {
      dispatch({ type: 'RESET_ALL' });
    }
  };

  const handleClose = () => {
    dispatch({ type: 'SET_SCREEN', screen: 'workshop' });
  };

  if (!authenticated) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center workshop-bg">
        <MetalPlate title="ÖĞRETMEN GİRİŞİ" className="w-full max-w-sm">
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
             <input 
                type="password" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN"
                className="bg-[var(--color-bg-deep)] border border-[var(--color-metal-light)] p-2 text-center tracking-widest text-xl text-[var(--color-text-display)] focus:outline-none"
             />
             <MetalButton type="brass" onClick={handleAuth}>GİRİŞ YAP</MetalButton>
             <MetalButton type="dark" onClick={handleClose}>İPTAL</MetalButton>
          </form>
        </MetalPlate>
      </div>
    );
  }

  // Şu statelerde sadece kendi browserındaki oyuncu var, ama structure hazır:
  const studentData = [{
    name: state.playerName || 'Bilinmiyor',
    solved: state.solvedMachines.length,
    wrong: state.totalWrongAttempts,
    streak: state.streakRecord,
    time: Object.values(state.machineRecords).reduce((a, b) => a + b, 0)
  }];

  return (
    <div className="w-full h-full p-8 workshop-bg overflow-y-auto overflow-x-hidden text-[var(--color-text-display)]">
      
      <div className="flex justify-between items-center mb-8 border-b-2 border-[var(--color-brass)] pb-4">
        <h1 className="text-3xl font-[var(--font-engraved)] text-[var(--color-brass-bright)]">ÖĞRETMEN PANELİ</h1>
        <MetalButton type="dark" onClick={handleClose}>KAPAT</MetalButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 border border-[var(--color-metal-light)] bg-black/40">
          <div className="text-sm font-[var(--font-mechanical)] text-[var(--color-text-muted)]">ÇÖZÜLEN MAKİNE</div>
          <div className="text-2xl text-[var(--color-lamp-blue)]">{state.solvedMachines.length}</div>
        </div>
        <div className="p-4 border border-[var(--color-metal-light)] bg-black/40">
          <div className="text-sm font-[var(--font-mechanical)] text-[var(--color-text-muted)]">TOPLAM YANLIŞ DENEME</div>
          <div className="text-2xl text-[var(--color-lamp-red)]">{state.totalWrongAttempts}</div>
        </div>
        <div className="p-4 border border-[var(--color-metal-light)] bg-black/40">
           <div className="text-sm font-[var(--font-mechanical)] text-[var(--color-text-muted)]">KEŞFEDİLEN İLKELER</div>
           <div className="text-2xl text-[var(--color-lamp-yellow)]">{state.availableTools.length}</div>
        </div>
      </div>

      <div className="bg-black/80 border border-[var(--color-metal-mid)] mb-8 overflow-x-auto">
        <table className="w-full font-[var(--font-technical)] text-sm text-left">
          <thead className="bg-[var(--color-metal-dark)] text-[var(--color-text-muted)]">
            <tr>
              <th className="p-3 border-b border-[var(--color-metal-mid)]">ÖĞRENCİ / MUCİT</th>
              <th className="p-3 border-b border-[var(--color-metal-mid)]">ÇÖZÜM SAYISI</th>
              <th className="p-3 border-b border-[var(--color-metal-mid)]">YANLIŞ DENEME</th>
              <th className="p-3 border-b border-[var(--color-metal-mid)]">EN İYİ SERİ</th>
              <th className="p-3 border-b border-[var(--color-metal-mid)]">TOPLAM SÜRE (Sn)</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((s, i) => (
              <tr key={i} className="border-b border-[var(--color-metal-dark)]/50 hover:bg-[#1A120B]">
                <td className="p-3 text-[var(--color-brass)]">{s.name}</td>
                <td className="p-3">{s.solved}</td>
                <td className="p-3 text-[var(--color-lamp-red)]">{s.wrong}</td>
                <td className="p-3 text-[var(--color-lamp-green)]">{s.streak}</td>
                <td className="p-3">{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <MetalButton type="brass" onClick={handleExport}>VERİLERİ DIŞA AKTAR (JSON)</MetalButton>
        <MetalButton type="copper" onClick={handleReset}>SİSTEMİ SIFIRLA</MetalButton>
        <MetalButton type="dark" onClick={() => {
          dispatch({ type: 'DEV_FINISH_GAME' });
          alert("GELİŞTİRİCİ HİLESİ: Oyun başarıyla bitirildi!");
        }}>DEV: OYUNU BİTİR</MetalButton>
      </div>

    </div>
  );
}
