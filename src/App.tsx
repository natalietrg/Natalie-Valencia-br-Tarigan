/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, UserRole } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SearchModal } from './components/SearchModal';
import { Module01Inventarisasi } from './components/modules/Module01Inventarisasi';
import { Module02Koridor } from './components/modules/Module02Koridor';
import { Module03Risiko } from './components/modules/Module03Risiko';
import { Module04MCDA } from './components/modules/Module04MCDA';
import { Module05Penetapan } from './components/modules/Module05Penetapan';
import { LogAudit } from './components/modules/LogAudit';
import { RoadmapAturanMain } from './components/modules/RoadmapAturanMain';
import { BerandaPublik } from './components/modules/BerandaPublik';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('01-inventarisasi');
  const [activeRole, setActiveRole] = useState<UserRole>('DPUTR');
  const [selectedRoadId, setSelectedRoadId] = useState<string>('KRO-018');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Keyboard shortcut Ctrl+K to open global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRole = (role: UserRole) => {
    setActiveRole(role);
    setToastMessage(`Peran aktif beralih ke: ${role} (${role === 'DPUTR' ? 'Dinas PUTR Kab. Karo' : role === 'Bappeda' ? 'Bappeda Litbang Karo' : 'Mitra Petani & Pengawas Independen'})`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectRoad = (roadId: string) => {
    setSelectedRoadId(roadId);
  };

  // If in Beranda Publik (Civic Light Portal), render full-width public layout
  if (currentTab === 'beranda-publik') {
    return (
      <div className="min-h-screen bg-[#f8f9ff]">
        <BerandaPublik
          onNavigate={handleSelectTab}
          onSelectRoad={handleSelectRoad}
        />
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={handleSelectTab}
          onSelectRoad={handleSelectRoad}
        />
      </div>
    );
  }

  // Otherwise render Command Center (Dark institutional layout)
  return (
    <div className="dark bg-[#0f131d] text-[#dfe2f0] min-h-screen antialiased flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Fixed Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        activeRole={activeRole}
        onSelectRole={handleSelectRole}
      />

      {/* Main Container offset by sidebar width (72 = 18rem) */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onNavigate={handleSelectTab}
          notificationCount={2}
        />

        {/* Dynamic Module Content Viewport */}
        <main className="w-full pt-16 bg-[#0f131d] flex-1 pb-12">
          {currentTab === '01-inventarisasi' && (
            <Module01Inventarisasi
              onNavigate={handleSelectTab}
              selectedRoadId={selectedRoadId}
              onSelectRoad={handleSelectRoad}
            />
          )}

          {currentTab === '02-koridor' && (
            <Module02Koridor
              onNavigate={handleSelectTab}
              onSelectRoad={handleSelectRoad}
            />
          )}

          {currentTab === '03-risiko' && (
            <Module03Risiko
              onNavigate={handleSelectTab}
              onSelectRoad={handleSelectRoad}
            />
          )}

          {currentTab === '04-mcda' && (
            <Module04MCDA
              onNavigate={handleSelectTab}
              selectedRoadId={selectedRoadId}
              onSelectRoad={handleSelectRoad}
            />
          )}

          {currentTab === '05-penetapan' && (
            <Module05Penetapan
              onNavigate={handleSelectTab}
            />
          )}

          {currentTab === 'log-audit' && (
            <LogAudit
              onNavigate={handleSelectTab}
              onSelectRoad={handleSelectRoad}
            />
          )}

          {currentTab === 'roadmap' && (
            <RoadmapAturanMain
              onNavigate={handleSelectTab}
            />
          )}
        </main>
      </div>

      {/* Global Search and Shortcuts Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSelectTab}
        onSelectRoad={handleSelectRoad}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-slate-100 shadow-2xl flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">info</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
