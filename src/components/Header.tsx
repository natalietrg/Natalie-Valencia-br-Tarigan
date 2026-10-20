import React from 'react';
import { NavigationTab } from '../types';

interface HeaderProps {
  onOpenSearch: () => void;
  onNavigate: (tab: NavigationTab) => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onNavigate,
  notificationCount = 1,
}) => {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-[#0f131d]/90 backdrop-blur-xl border-b border-[#1b2029] shadow-[0_1px_8px_rgba(0,0,0,0.25)] z-40 flex items-center justify-between px-6">
      {/* Search Bar & Live Sync Status */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div 
          onClick={onOpenSearch}
          className="relative w-full flex items-center cursor-pointer group"
        >
          <span className="material-symbols-outlined absolute left-3 text-[#bbcabf] group-hover:text-[#4edea3] text-[20px] transition-colors">
            search
          </span>
          <input
            readOnly
            className="w-full h-10 pl-10 pr-16 bg-[#0a0e17] hover:bg-[#171c25] rounded-lg text-[#dfe2f0] placeholder-[#86948a] text-xs cursor-pointer focus:outline-none border border-[#1b2029] group-hover:border-[#31353f] transition-all"
            placeholder="Cari ruas, koridor, kecamatan, desa..."
            type="text"
          />
          <div className="absolute right-2.5 flex items-center px-1.5 py-0.5 rounded bg-[#1b2029] text-[#bbcabf] font-mono text-[10px] font-semibold border border-[#31353f]">
            Ctrl K
          </div>
        </div>

        {/* Sync Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0e17] border border-[#1b2029] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
          <span className="font-mono text-xs text-[#dfe2f0]">
            Data Terhubung (Tahun acuan 2025)
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={() => onNavigate('beranda-publik')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1b2029] text-[#dfe2f0] hover:bg-[#262a34] hover:text-[#4edea3] text-xs font-medium border border-[#31353f] transition-all shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">public</span>
          <span>Beranda Publik</span>
        </button>

        <button
          onClick={() => onNavigate('log-audit')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1b2029] text-[#dfe2f0] hover:bg-[#262a34] hover:text-[#4edea3] text-xs font-medium border border-[#31353f] transition-all shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">history</span>
          <span>Log Audit</span>
        </button>

        {/* Notifications */}
        <div className="relative flex items-center">
          <button
            onClick={() => alert('Notifikasi: 1 penyesuaian pengecualian peringkat disahkan pada Ruas KRO-031.')}
            className="p-2 rounded-lg text-[#bbcabf] hover:bg-[#1b2029] hover:text-[#dfe2f0] transition-all"
            type="button"
            title="Pusat Notifikasi"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping"></span>
            )}
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            )}
          </button>
        </div>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-[#4edea3] flex items-center justify-center shrink-0 cursor-pointer shadow-sm hover:brightness-110 transition-all">
          <span className="material-symbols-outlined text-[#003824] text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
};
