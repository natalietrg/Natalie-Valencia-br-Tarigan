import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { INITIAL_ROADS, CORRIDORS_DATA } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onSelectRoad?: (roadId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectRoad,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open in parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredRoads = INITIAL_ROADS.filter(
    (r) =>
      r.id.toLowerCase().includes(query.toLowerCase()) ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.kecamatan.toLowerCase().includes(query.toLowerCase()) ||
      r.commodities.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredCorridors = CORRIDORS_DATA.filter(
    (c) =>
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-xl bg-[#1b2029] border border-[#31353f] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#31353f] bg-[#171c25]">
          <span className="material-symbols-outlined text-[#86948a] text-[22px] mr-3">search</span>
          <input
            autoFocus
            type="text"
            className="flex-1 bg-transparent text-[#dfe2f0] placeholder-[#86948a] text-sm focus:outline-none"
            placeholder="Cari ruas (mis. KRO-018), koridor, kecamatan, atau komoditas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-[#31353f] text-[#bbcabf] text-xs hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="p-3 max-h-[420px] overflow-y-auto space-y-4">
          {/* Quick Module Navigation */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#86948a] px-2 mb-1.5 font-semibold">
              Pintas Modul SPJPP
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              <button
                onClick={() => { onNavigate('01-inventarisasi'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#171c25] hover:bg-[#262a34] text-left text-xs text-[#dfe2f0] transition-colors"
              >
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">folder_special</span>
                <span className="truncate">01 Inventarisasi</span>
              </button>
              <button
                onClick={() => { onNavigate('02-koridor'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#171c25] hover:bg-[#262a34] text-left text-xs text-[#dfe2f0] transition-colors"
              >
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">polyline</span>
                <span className="truncate">02 Koridor Agribisnis</span>
              </button>
              <button
                onClick={() => { onNavigate('03-risiko'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#171c25] hover:bg-[#262a34] text-left text-xs text-[#dfe2f0] transition-colors"
              >
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">warning</span>
                <span className="truncate">03 Penilaian Risiko</span>
              </button>
              <button
                onClick={() => { onNavigate('04-mcda'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#171c25] hover:bg-[#262a34] text-left text-xs text-[#dfe2f0] transition-colors"
              >
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">tune</span>
                <span className="truncate">04 Peringkat MCDA</span>
              </button>
              <button
                onClick={() => { onNavigate('05-penetapan'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#171c25] hover:bg-[#262a34] text-left text-xs text-[#dfe2f0] transition-colors"
              >
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">verified</span>
                <span className="truncate">05 SK Bupati</span>
              </button>
              <button
                onClick={() => { onNavigate('log-audit'); onClose(); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#171c25] hover:bg-[#262a34] text-left text-xs text-[#dfe2f0] transition-colors"
              >
                <span className="material-symbols-outlined text-[#adc6ff] text-[18px]">history</span>
                <span className="truncate">Log Audit Resmi</span>
              </button>
            </div>
          </div>

          {/* Road Results */}
          {filteredRoads.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#86948a] px-2 mb-1.5 font-semibold">
                Ruas Jalan Terdaftar ({filteredRoads.length})
              </div>
              <div className="space-y-1">
                {filteredRoads.map((road) => (
                  <div
                    key={road.id}
                    onClick={() => {
                      if (onSelectRoad) onSelectRoad(road.id);
                      onNavigate('04-mcda');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#171c25] hover:bg-[#262a34] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="px-1.5 py-0.5 rounded bg-[#31353f] text-[#4edea3] font-mono text-xs font-semibold">
                        {road.id}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-[#dfe2f0] truncate">{road.name}</span>
                        <span className="text-xs text-[#bbcabf] truncate">{road.kecamatan} • {road.commodities}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#93000a]/30 text-[#ffb4ab]">
                        Skor: {road.mcdaScore.toFixed(2)}
                      </span>
                      <span className="material-symbols-outlined text-[#86948a] text-[16px]">chevron_right</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Corridor Results */}
          {filteredCorridors.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#86948a] px-2 mb-1.5 font-semibold">
                Koridor Agribisnis ({filteredCorridors.length})
              </div>
              <div className="space-y-1">
                {filteredCorridors.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onNavigate('02-koridor');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#171c25] hover:bg-[#262a34] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }}></span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-[#dfe2f0] truncate">{c.name}</span>
                        <span className="text-xs text-[#bbcabf] truncate">{c.totalLengthKm} km • {c.dailyTonnage}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#31353f] text-[#dfe2f0]">
                      {c.priorityBadge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#31353f] bg-[#0a0e17] flex items-center justify-between text-xs text-[#86948a] font-mono">
          <span>Gunakan panah untuk navigasi atau klik pilihan</span>
          <span>SPJPP Karo 2025</span>
        </div>
      </div>
    </div>
  );
};
