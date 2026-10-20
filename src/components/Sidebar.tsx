import React from 'react';
import { NavigationTab, UserRole } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  activeRole,
  onSelectRole,
  onLogout = () => {},
}) => {
  const navItems: {
    id: NavigationTab;
    number?: string;
    title: string;
    pillar: string;
    pillarColor: string;
    opd: string;
  }[] = [
    {
      id: '01-inventarisasi',
      number: '01',
      title: '01 Inventarisasi Ruas',
      pillar: 'Pilar Data',
      pillarColor: 'text-[#adc6ff]',
      opd: 'DPUTR',
    },
    {
      id: '02-koridor',
      number: '02',
      title: '02 Pemetaan Koridor',
      pillar: 'Pilar Data',
      pillarColor: 'text-[#adc6ff]',
      opd: 'DPUTR',
    },
    {
      id: '03-risiko',
      number: '03',
      title: '03 Penilaian Kondisi & Risiko',
      pillar: 'Pilar Peringkat',
      pillarColor: 'text-[#ffb95f]',
      opd: 'BPBD',
    },
    {
      id: '04-mcda',
      number: '04',
      title: '04 Pemeringkatan MCDA',
      pillar: 'Pilar Peringkat',
      pillarColor: 'text-[#ffb95f]',
      opd: 'DPUTR',
    },
    {
      id: '05-penetapan',
      number: '05',
      title: '05 Penetapan & Pemantauan',
      pillar: 'Pilar Penetapan',
      pillarColor: 'text-[#4edea3]',
      opd: 'Bappeda',
    },
  ];

  const systemItems: {
    id: NavigationTab;
    title: string;
    pillar: string;
    pillarColor: string;
    opd: string;
  }[] = [
    {
      id: 'log-audit',
      title: 'Log Audit & Jejak Perubahan',
      pillar: 'Transparansi',
      pillarColor: 'text-[#bbcabf]',
      opd: 'Inspektorat',
    },
    {
      id: 'roadmap',
      title: 'Panduan Roadmap & Aturan Main',
      pillar: 'Roadmap',
      pillarColor: 'text-[#adc6ff]',
      opd: 'Bappeda',
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0a0e17] z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-r border-[#1b2029] overflow-y-auto no-scrollbar">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div 
          onClick={() => onSelectTab('01-inventarisasi')}
          className="px-4 py-4 bg-[#171c25]/70 border-b border-[#1b2029] flex items-center gap-3 cursor-pointer hover:bg-[#171c25] transition-colors"
        >
          <img
            alt="SPJPP-Karo Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UfkF3luBeV6ZLvDZvqP7j3G6AEvI6tHcUJeDlaIFMYegiQdXiF-25kQEbtrrTAyQBHeCukWI3GGGv1w0ES2o2cS8KDhn9gahXu7Y7-IFf2AqlYFzVYT-sWU8nvoxHV158XVImJcWXNy0wYoXs4xVRYiEAEoophYVwDJJOkxXk6o9ybAbzXr2-TokGcrGwnTCovXuzOzmbiUrEgO1PG93XL_iPu0vW9y6wGKq1pSJ-27hNNSTa8MC0SZ3w"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-[#dfe2f0] tracking-tight">SPJPP</span>
              <span className="px-1.5 py-0.5 rounded bg-[#e29100] text-[#523200] font-mono text-[10px] font-bold uppercase tracking-wider">
                KARO
              </span>
            </div>
            <span className="text-xs text-[#bbcabf] truncate">
              Prioritas Jalan Produksi Pertanian
            </span>
          </div>
        </div>

        {/* Alur Prioritisasi Header */}
        <div className="px-4 pt-4 pb-1">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#4edea3] font-semibold">
            ALUR PRIORITISASI
          </div>
          <div className="text-xs text-[#bbcabf] mt-0.5">
            Lima Langkah Menuju Daftar Prioritas
          </div>
        </div>

        {/* Navigation 01-05 */}
        <nav className="flex flex-col gap-1 px-2 mt-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`group flex flex-col p-2.5 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-[#10b981] text-[#00422b] font-semibold shadow-sm'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2f0]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-semibold transition-colors ${
                    isActive ? 'text-[#002113]' : 'text-[#dfe2f0] group-hover:text-[#4edea3]'
                  }`}>
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className={`px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-[#003824]/20 text-[#002113]' : `bg-[#31353f] ${item.pillarColor}`
                  }`}>
                    {item.pillar}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-[#003824]/20 text-[#002113]' : 'bg-[#171c25] text-[#bbcabf]'
                  }`}>
                    {item.opd}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Section: Sistem & Tata Kelola */}
          <div className="px-2 pt-3 pb-1">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#86948a] font-semibold">
              SISTEM &amp; TATA KELOLA
            </div>
          </div>

          {systemItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`group flex flex-col p-2.5 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-[#10b981] text-[#00422b] font-semibold shadow-sm'
                    : 'text-[#bbcabf] hover:bg-[#262a34] hover:text-[#dfe2f0]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-semibold transition-colors ${
                    isActive ? 'text-[#002113]' : 'text-[#dfe2f0] group-hover:text-[#4edea3]'
                  }`}>
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className={`px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-[#003824]/20 text-[#002113]' : `bg-[#31353f] ${item.pillarColor}`
                  }`}>
                    {item.pillar}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-[#003824]/20 text-[#002113]' : 'bg-[#171c25] text-[#bbcabf]'
                  }`}>
                    {item.opd}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Switcher & User Profile */}
      <div className="p-4 bg-[#171c25]/80 border-t border-[#1b2029] flex flex-col gap-3 mt-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#bbcabf]">
            SIMULASI PERAN AKTIF
          </span>
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#0a0e17] rounded-lg text-center">
            <button
              onClick={() => onSelectRole('DPUTR')}
              className={`py-1 rounded font-mono text-xs font-semibold transition-all ${
                activeRole === 'DPUTR'
                  ? 'bg-[#10b981] text-[#00422b]'
                  : 'text-[#bbcabf] hover:bg-[#1b2029] hover:text-[#dfe2f0]'
              }`}
            >
              DPUTR
            </button>
            <button
              onClick={() => onSelectRole('Bappeda')}
              className={`py-1 rounded font-mono text-xs font-semibold transition-all ${
                activeRole === 'Bappeda'
                  ? 'bg-[#10b981] text-[#00422b]'
                  : 'text-[#bbcabf] hover:bg-[#1b2029] hover:text-[#dfe2f0]'
              }`}
            >
              Bappeda
            </button>
            <button
              onClick={() => onSelectRole('Mitra')}
              className={`py-1 rounded font-mono text-xs font-semibold transition-all ${
                activeRole === 'Mitra'
                  ? 'bg-[#10b981] text-[#00422b]'
                  : 'text-[#bbcabf] hover:bg-[#1b2029] hover:text-[#dfe2f0]'
              }`}
            >
              Mitra
            </button>
          </div>
        </div>

        {/* Demo User Card */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0e17] border border-[#1b2029]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0566d9] text-[#e6ecff] flex items-center justify-center font-mono text-xs font-bold shrink-0">
              {activeRole === 'DPUTR' ? 'PD' : activeRole === 'Bappeda' ? 'BP' : 'MT'}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#dfe2f0] truncate">
                  {activeRole === 'DPUTR' ? 'Pengguna Demo' : activeRole === 'Bappeda' ? 'Bappeda Karo' : 'Mitra Tani/Gapoktan'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] shrink-0"></span>
              </div>
              <span className="font-mono text-[10px] text-[#bbcabf] truncate">
                {activeRole === 'DPUTR' ? 'DPUTR Kab. Karo' : activeRole === 'Bappeda' ? 'Bappeda Litbang' : 'Asosiasi Petani'}
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-[#bbcabf] hover:text-[#ffb4ab] transition-colors shrink-0 p-1"
            title="Keluar Simulasi"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
