import React, { useState } from 'react';
import { NavigationTab, RoadSegment } from '../../types';
import { INITIAL_ROADS } from '../../data/mockData';

interface Module01Props {
  onNavigate: (tab: NavigationTab) => void;
  selectedRoadId?: string;
  onSelectRoad?: (roadId: string) => void;
}

export const Module01Inventarisasi: React.FC<Module01Props> = ({
  onNavigate,
  selectedRoadId = 'KRO-042',
  onSelectRoad,
}) => {
  const [activeLayer, setActiveLayer] = useState<'koridor' | 'longsor' | 'sentra' | 'pasar'>('koridor');
  const [selectedArea, setSelectedArea] = useState<string>('Simpang Empat');
  const [activeRoadId, setActiveRoadId] = useState<string>(selectedRoadId);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  const currentRoad = INITIAL_ROADS.find((r) => r.id === activeRoadId) || INITIAL_ROADS[1];

  const handleSelectRoad = (id: string) => {
    setActiveRoadId(id);
    if (onSelectRoad) onSelectRoad(id);
  };

  const handleSubmission = () => {
    setShowSubmissionSuccess(true);
    setTimeout(() => setShowSubmissionSuccess(false), 3500);
  };

  return (
    <div className="flex flex-col w-full p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      {/* 1. HERO: PRIORITIZATION JOURNEY TRACKER */}
      <section className="relative overflow-hidden rounded-xl bg-[#171c25] p-6 shadow-xl border border-[#1b2029]">
        {/* Ambient Glow Behind Pillars */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#4edea3]/10 blur-3xl"></div>
        <div className="pointer-events-none absolute left-1/3 -bottom-24 h-80 w-80 rounded-full bg-[#0566d9]/10 blur-3xl"></div>

        {/* Header & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4edea3]/10 text-[#4edea3] font-mono text-[11px] uppercase tracking-wider font-semibold border border-[#4edea3]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                Strategic Alignment
              </span>
              <span className="font-mono text-xs text-[#bbcabf] font-medium">
                SPJPP-KARO ROADMAP v2.4
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#dfe2f0] tracking-tight">
              PRIORITIZATION JOURNEY TRACKER
            </h1>
            <p className="text-sm text-[#bbcabf] mt-1">
              Satu Rangkaian Berkelanjutan{' '}
              <span className="text-[#dfe2f0] font-medium">(Data → Peringkat → Penetapan)</span>{' '}
              untuk Keputusan Infrastruktur Presisi
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#262a34] text-[#dfe2f0] hover:bg-[#31353f] text-xs font-medium border border-[#31353f] transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#adc6ff]">map</span>
              <span>Panduan Roadmap</span>
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#262a34] text-[#dfe2f0] hover:bg-[#31353f] text-xs font-medium border border-[#31353f] transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ffb95f]">tune</span>
              <span>Aturan Main &amp; Data Engine</span>
            </button>
          </div>
        </div>

        {/* 3 Large Connected Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* PILAR 1 • DATA & KORIDOR (AKTIF) */}
          <div className="relative flex flex-col justify-between p-4 rounded-xl bg-[#1b2029] shadow-md border border-[#31353f] transition-all duration-300 hover:border-[#4edea3]/40">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4edea3] to-[#10b981] rounded-t-xl"></div>
            <div>
              <div className="flex items-center justify-between mb-3 pt-1">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#4edea3] font-semibold tracking-wider uppercase">
                  <span className="material-symbols-outlined text-[16px]">folder_special</span>
                  PILAR 1 • DATA &amp; KORIDOR
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#10b981] text-[#002113] font-mono text-[10px] font-bold shadow-sm">
                  AKTIF SEKARANG
                </span>
              </div>
              <div className="mb-2">
                <div className="text-lg text-[#dfe2f0] font-bold tracking-tight">FONDASI</div>
                <p className="text-xs text-[#4edea3] font-medium">Inventarisasi Ruas &amp; Pemetaan Koridor</p>
              </div>
              <p className="text-xs text-[#bbcabf] mb-4 leading-relaxed">
                Menyatukan ID ruas, panjang, kondisi, dan kewenangan dalam satu tabel induk, lalu mengelompokkan ruas ke koridor pertanian.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-1 rounded bg-[#262a34] font-mono text-[10px] text-[#dfe2f0] font-medium">
                  Tabel Induk Ruas
                </span>
                <span className="px-2 py-1 rounded bg-[#262a34] font-mono text-[10px] text-[#dfe2f0] font-medium">
                  Peta Koridor
                </span>
                <span className="px-2 py-1 rounded bg-[#262a34] font-mono text-[10px] text-[#ffb95f] font-medium">
                  Data Kosong Ditandai
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-1 bg-[#171c25]/80 -mx-4 -mb-4 p-4 rounded-b-xl border-t border-[#1b2029]">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase">Jadwal Tahap</span>
                <span className="font-mono text-xs text-[#dfe2f0] font-semibold">Q4 2026 – Q1 2027</span>
              </div>
              <button
                onClick={() => onNavigate('02-koridor')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4edea3] text-[#003824] hover:brightness-110 text-xs font-semibold transition-all shadow-sm"
                type="button"
              >
                <span>Buka Pilar</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* PILAR 2 • PENILAIAN & PERINGKAT */}
          <div className="relative flex flex-col justify-between p-4 rounded-xl bg-[#171c25]/80 shadow-sm border border-[#1b2029] transition-all duration-300 hover:border-[#adc6ff]/40">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0566d9] to-[#adc6ff] rounded-t-xl opacity-75"></div>
            <div>
              <div className="flex items-center justify-between mb-3 pt-1">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#adc6ff] font-semibold tracking-wider uppercase">
                  <span className="material-symbols-outlined text-[16px]">analytics</span>
                  PILAR 2 • PENILAIAN &amp; PERINGKAT
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#31353f] text-[#bbcabf] font-mono text-[10px] font-medium">
                  TAHAP BERIKUTNYA
                </span>
              </div>
              <div className="mb-2">
                <div className="text-lg text-[#dfe2f0] font-bold tracking-tight">ANALISIS</div>
                <p className="text-xs text-[#adc6ff] font-medium">Kondisi, Risiko &amp; Indeks Multikriteria</p>
              </div>
              <p className="text-xs text-[#bbcabf] mb-4 leading-relaxed">
                Menilai kondisi teknis, memisahkan bahaya–paparan–kerentanan–konsekuensi, lalu menghitung indeks prioritas dan uji sensitivitas tiga skenario bobot.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-1 rounded bg-[#1b2029] font-mono text-[10px] text-[#bbcabf]">
                  6 Kriteria
                </span>
                <span className="px-2 py-1 rounded bg-[#1b2029] font-mono text-[10px] text-[#bbcabf]">
                  Uji Sensitivitas
                </span>
                <span className="px-2 py-1 rounded bg-[#1b2029] font-mono text-[10px] text-[#bbcabf]">
                  3 Skenario Bobot
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-1 bg-[#0a0e17]/60 -mx-4 -mb-4 p-4 rounded-b-xl border-t border-[#1b2029]">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase">Jadwal Tahap</span>
                <span className="font-mono text-xs text-[#dfe2f0] font-semibold">Q1 – Q3 2027</span>
              </div>
              <button
                onClick={() => onNavigate('03-risiko')}
                className="inline-flex items-center gap-1 font-mono text-xs text-[#adc6ff] hover:underline"
              >
                <span>Lihat Analisis</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* PILAR 3 • PENETAPAN & PEMANTAUAN */}
          <div className="relative flex flex-col justify-between p-4 rounded-xl bg-[#171c25]/80 shadow-sm border border-[#1b2029] transition-all duration-300 hover:border-[#ffb95f]/40">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ffb95f] to-[#e29100] rounded-t-xl opacity-75"></div>
            <div>
              <div className="flex items-center justify-between mb-3 pt-1">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ffb95f] font-semibold tracking-wider uppercase">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  PILAR 3 • PENETAPAN &amp; PEMANTAUAN
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#31353f] text-[#bbcabf] font-mono text-[10px] font-medium">
                  TAHAP BERIKUTNYA
                </span>
              </div>
              <div className="mb-2">
                <div className="text-lg text-[#dfe2f0] font-bold tracking-tight">KEPUTUSAN</div>
                <p className="text-xs text-[#ffb95f] font-medium">SK Daftar Prioritas &amp; Pilot Koridor</p>
              </div>
              <p className="text-xs text-[#bbcabf] mb-4 leading-relaxed">
                Publikasi peringkat beserta alasan dan jejak perubahan, pilot koridor, dan pengukuran kondisi sebelum–sesudah penanganan.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-1 rounded bg-[#1b2029] font-mono text-[10px] text-[#bbcabf]">
                  SK Bupati
                </span>
                <span className="px-2 py-1 rounded bg-[#1b2029] font-mono text-[10px] text-[#bbcabf]">
                  RKPD
                </span>
                <span className="px-2 py-1 rounded bg-[#1b2029] font-mono text-[10px] text-[#bbcabf]">
                  Sebelum–Sesudah
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-1 bg-[#0a0e17]/60 -mx-4 -mb-4 p-4 rounded-b-xl border-t border-[#1b2029]">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase">Jadwal Tahap</span>
                <span className="font-mono text-xs text-[#dfe2f0] font-semibold">Q3 2027 – 2029</span>
              </div>
              <button
                onClick={() => onNavigate('05-penetapan')}
                className="inline-flex items-center gap-1 font-mono text-xs text-[#ffb95f] hover:underline"
              >
                <span>Lihat Regulasi</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KPI STRIP (4 REAL METRICS CARDS) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl bg-[#171c25] shadow-sm border border-[#1b2029] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] text-[#bbcabf] uppercase tracking-wider">
                Produksi Panen 2025
              </span>
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#4edea3] font-mono text-[10px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +8,35%
              </span>
            </div>
            <div className="text-2xl font-bold text-[#dfe2f0] tracking-tight">
              5,26 <span className="text-sm font-medium text-[#bbcabf]">jt ku</span>
            </div>
            <p className="text-xs text-[#bbcabf] mt-1">Komoditas Hortikultura Utama (Wortel, Tomat, Kubis)</p>
          </div>
          <div className="mt-3 pt-2.5 bg-[#0a0e17]/70 -mx-4 -mb-4 px-4 pb-3 rounded-b-xl font-mono text-[10px] text-[#bbcabf] flex items-center justify-between border-t border-[#1b2029]">
            <span>Wortel: 1,88 jt ku</span>
            <span>•</span>
            <span>Tomat: 1,72 jt ku</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl bg-[#171c25] shadow-sm border border-[#1b2029] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] text-[#bbcabf] uppercase tracking-wider">
                Kondisi Jalan Baik 2024
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#0566d9]/20 text-[#adc6ff] font-mono text-[10px] font-semibold">
                Target 66,00%
              </span>
            </div>
            <div className="text-2xl font-bold text-[#dfe2f0] tracking-tight">63,43%</div>
            <div className="w-full bg-[#31353f] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#4edea3] h-full rounded-full transition-all duration-500" style={{ width: '63.43%' }}></div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 bg-[#0a0e17]/70 -mx-4 -mb-4 px-4 pb-3 rounded-b-xl font-mono text-[10px] text-[#bbcabf] flex items-center justify-between border-t border-[#1b2029]">
            <span>2022: 61,54%</span>
            <span>→</span>
            <span>2023: 63,04%</span>
            <span>→</span>
            <span className="text-[#4edea3] font-semibold">2024: 63,43%</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl bg-[#171c25] shadow-sm border border-[#1b2029] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] text-[#bbcabf] uppercase tracking-wider">
                Luas Panen Total
              </span>
              <span className="font-mono text-[10px] text-[#ffb95f]">4 Komoditas</span>
            </div>
            <div className="text-2xl font-bold text-[#dfe2f0] tracking-tight">
              21.321 <span className="text-sm font-medium text-[#bbcabf]">ha</span>
            </div>
            <p className="text-xs text-[#bbcabf] mt-1">Sentra dataran tinggi Sinabung–Sibayak</p>
          </div>
          <div className="mt-3 pt-2.5 bg-[#0a0e17]/70 -mx-4 -mb-4 px-4 pb-3 rounded-b-xl font-mono text-[10px] text-[#bbcabf] truncate border-t border-[#1b2029]">
            <span>Wrt: 8.518 ha | Kbs: 4.895 ha | Ktg: 4.356 ha</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl bg-[#171c25] shadow-sm border border-[#1b2029] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] text-[#bbcabf] uppercase tracking-wider">
                Kebutuhan Anggaran
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#e29100]/30 text-[#ffb95f] font-mono text-[10px] font-semibold">
                Tahap 1
              </span>
            </div>
            <div className="text-lg font-bold text-[#dfe2f0] tracking-tight">Inpres JD 2025: Rp10,67 T</div>
            <p className="text-xs text-[#bbcabf] mt-1">Gap daerah 2025–2029: ±Rp1.100 Triliun</p>
          </div>
          <div className="mt-3 pt-2.5 bg-[#0a0e17]/70 -mx-4 -mb-4 px-4 pb-3 rounded-b-xl flex items-center justify-between border-t border-[#1b2029]">
            <span className="font-mono text-[10px] text-[#4edea3] font-semibold">Kelengkapan Ruas Diuji</span>
            <span className="px-1.5 py-0.5 rounded bg-[#31353f] text-[#ffb95f] font-mono text-[10px] font-bold">
              DATA SIMULASI
            </span>
          </div>
        </div>
      </section>

      {/* 3. BAGIAN UTAMA: MODUL 01 • INVENTARISASI & PEMETAAN (DUA KOLOM 65% / 35%) */}
      <section className="space-y-4">
        {/* Section Title & Meta Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-[#4edea3] rounded-full"></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#4edea3] font-semibold">
                  MODUL 01 • SPATIAL RADAR
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#e29100]/20 text-[#ffb95f] font-mono text-[10px] font-bold">
                  DATA SIMULASI KABUPATEN KARO
                </span>
              </div>
              <h2 className="text-xl lg:text-2xl text-[#dfe2f0] font-bold tracking-tight">
                Peta Koridor Pertanian Kabupaten Karo
              </h2>
            </div>
          </div>

          {/* Legend Ribbon */}
          <div className="flex flex-wrap items-center gap-3 bg-[#171c25] px-3 py-1.5 rounded-lg border border-[#1b2029] shadow-sm">
            <span className="font-mono text-[10px] text-[#bbcabf] uppercase font-semibold">Prioritas:</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#EF4444', boxShadow: '0 0 6px #EF4444' }}></span>
              <span className="font-mono text-xs text-[#dfe2f0]">P-I (Kritis)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#F97316', boxShadow: '0 0 6px #F97316' }}></span>
              <span className="font-mono text-xs text-[#dfe2f0]">P-II (Tinggi)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FBBF24', boxShadow: '0 0 6px #FBBF24' }}></span>
              <span className="font-mono text-xs text-[#dfe2f0]">P-III (Sedang)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#14B8A6', boxShadow: '0 0 6px #14B8A6' }}></span>
              <span className="font-mono text-xs text-[#dfe2f0]">P-IV (Rutin)</span>
            </div>
          </div>
        </div>

        {/* Main Dual Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* KIRI (~65% -> 8 columns): Tactical Cartography Center */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative w-full h-[580px] bg-[#0a0e17] rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 border border-[#1b2029]">
              {/* Static Map Background */}
              <div
                className="absolute inset-0 w-full h-full opacity-40 mix-blend-luminosity bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaUQD16im5IydlQEa-MkFcRerPnUJOBk-DbFUCpzJNaO6NJ704oVuFE1-TUO7TSXpcY5T4-6NDNgbBYd4WK7rCVC41I2c-_sdGRYJya71vJ7vAzxjhEgovbmRgzSKbaA2qzs4C9hIdLJ6BF6MzIWC-DGzTVphjmufmQn3fdeJjrxjlHtnlzRpDOxGeGA35d2h0GI5kzKFTrqsZEuOUaxN1TwFJQDmI13YtXTKLj5n9Cj5i8g9j0HHxRw')`,
                }}
              ></div>

              {/* Tactical GIS Vector Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 900 600">
                <defs>
                  <pattern id="grid-tactical" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1"></path>
                    <circle cx="60" cy="60" r="1.5" fill="rgba(78, 222, 163, 0.2)"></circle>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-tactical)"></rect>

                {/* Sinabung Hazard Polygon */}
                <path d="M 280,180 Q 320,130 380,160 T 440,240 Q 390,300 310,270 Z" fill="rgba(239, 68, 68, 0.08)" stroke="#EF4444" strokeWidth="1" strokeDasharray="4,4"></path>
                <text x="315" y="195" fill="#EF4444" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" opacity="0.8">
                  KRB GUNUNG SINABUNG
                </text>

                {/* Secondary Corridor Network (Prioritas IV - Teal) */}
                <path d="M 120,480 C 240,460 310,430 450,470 S 680,510 820,490" fill="none" stroke="#14B8A6" strokeWidth="2.5" opacity="0.75"></path>
                <path d="M 700,200 C 650,280 620,380 640,510" fill="none" stroke="#14B8A6" strokeWidth="2" strokeDasharray="6,3" opacity="0.6"></path>

                {/* Corridor Network (Prioritas III - Yellow) */}
                <path d="M 200,160 C 260,240 340,310 460,320 S 710,270 780,230" fill="none" stroke="#FBBF24" strokeWidth="3" opacity="0.85"></path>

                {/* Corridor Network (Prioritas II - Orange) */}
                <path d="M 520,110 C 500,210 480,310 510,430 S 560,510 590,560" fill="none" stroke="#F97316" strokeWidth="3.5"></path>

                {/* Main Critical Corridor (Prioritas I - Crimson / Selected) */}
                <path d="M 330,190 C 370,250 420,290 490,340 S 580,390 620,440" fill="none" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" opacity="0.9"></path>
                <path d="M 330,190 C 370,250 420,290 490,340 S 580,390 620,440" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="8,6" opacity="0.9"></path>

                {/* Berastagi Node */}
                <g transform="translate(330, 190)">
                  <circle r="14" fill="rgba(239, 68, 68, 0.25)"></circle>
                  <circle r="7" fill="#EF4444"></circle>
                  <circle r="3" fill="#ffffff"></circle>
                  <text x="18" y="4" fill="#ffffff" fontFamily="Inter" fontSize="12" fontWeight="700">Hub Berastagi</text>
                  <text x="18" y="16" fill="#bbcabf" fontFamily="JetBrains Mono" fontSize="9">STA Agrobisnis</text>
                </g>

                {/* Simpang Empat Node */}
                <g transform="translate(490, 340)">
                  <circle r="12" fill="rgba(249, 115, 22, 0.25)"></circle>
                  <circle r="6" fill="#F97316"></circle>
                  <circle r="2.5" fill="#ffffff"></circle>
                  <text x="-120" y="4" fill="#ffffff" fontFamily="Inter" fontSize="12" fontWeight="700">Simpang Empat</text>
                  <text x="-120" y="16" fill="#bbcabf" fontFamily="JetBrains Mono" fontSize="9">Sentra Horti Utama</text>
                </g>

                {/* Tigapanah Node */}
                <g transform="translate(620, 440)">
                  <circle r="10" fill="rgba(78, 222, 163, 0.25)"></circle>
                  <circle r="5" fill="#4edea3"></circle>
                  <text x="14" y="4" fill="#dfe2f0" fontFamily="Inter" fontSize="11" fontWeight="600">Tigapanah (Kolektor)</text>
                </g>

                {/* Merek Node */}
                <g transform="translate(780, 230)">
                  <circle r="9" fill="rgba(173, 198, 255, 0.2)"></circle>
                  <circle r="4" fill="#adc6ff"></circle>
                  <text x="-65" y="-10" fill="#dfe2f0" fontFamily="Inter" fontSize="11" fontWeight="500">Merek (Border)</text>
                </g>

                {/* Animated Route Pulse Marker */}
                <circle cx="410" cy="285" r="4" fill="#ffffff">
                  <animate attributeName="r" values="3;9;3" dur="2s" repeatCount="indefinite"></animate>
                  <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"></animate>
                </circle>
              </svg>

              {/* Map Top Overlay: Controls & Telemetry HUD */}
              <div className="relative z-20 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 bg-[#171c25]/90 backdrop-blur-md p-1 rounded-lg border border-[#31353f] shadow-lg">
                  <button
                    onClick={() => setActiveLayer('koridor')}
                    className={`px-2.5 py-1 rounded font-mono text-xs font-semibold transition-all ${
                      activeLayer === 'koridor'
                        ? 'bg-[#10b981] text-[#002113]'
                        : 'text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#262a34]'
                    }`}
                  >
                    Koridor Aktif
                  </button>
                  <button
                    onClick={() => setActiveLayer('longsor')}
                    className={`px-2.5 py-1 rounded font-mono text-xs font-semibold transition-all ${
                      activeLayer === 'longsor'
                        ? 'bg-[#10b981] text-[#002113]'
                        : 'text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#262a34]'
                    }`}
                  >
                    Risiko Longsor
                  </button>
                  <button
                    onClick={() => setActiveLayer('sentra')}
                    className={`px-2.5 py-1 rounded font-mono text-xs font-semibold transition-all ${
                      activeLayer === 'sentra'
                        ? 'bg-[#10b981] text-[#002113]'
                        : 'text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#262a34]'
                    }`}
                  >
                    Sentra Produksi
                  </button>
                  <button
                    onClick={() => setActiveLayer('pasar')}
                    className={`px-2.5 py-1 rounded font-mono text-xs font-semibold transition-all ${
                      activeLayer === 'pasar'
                        ? 'bg-[#10b981] text-[#002113]'
                        : 'text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#262a34]'
                    }`}
                  >
                    Pasar Induk
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center px-2.5 py-1 rounded bg-[#171c25]/90 backdrop-blur-md text-[#bbcabf] font-mono text-xs border border-[#31353f]">
                    <span className="text-[#4edea3] mr-1.5 font-bold">●</span> 3.116° N, 98.508° E | Zoom 11.4x
                  </div>
                </div>
              </div>

              {/* Map Bottom Overlay: Selected Corridor Card */}
              <div className="relative z-20 w-full max-w-lg bg-[#0f131d]/95 backdrop-blur-xl p-4 rounded-xl shadow-2xl border border-[#31353f]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#93000a] text-[#ffdad6]">
                      PRIORITAS I (KRITIS)
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#31353f] text-[#ffb95f] font-mono text-[10px] font-semibold">
                      DATA SIMULASI
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#bbcabf]">Segmen 02 • Koridor Sinabung-Utara</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#dfe2f0]">Koridor Berastagi – Simpang Empat</h3>
                    <p className="text-xs text-[#bbcabf] mt-0.5">
                      Kec. Berastagi ↔ Kec. Simpang Empat • Jalur Utama Logistik Hortikultura
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleSelectRoad('KRO-018');
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-[#10b981] text-[#002113] hover:brightness-110 text-xs font-semibold transition-all shadow-sm"
                    type="button"
                  >
                    Tindak
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 bg-[#171c25]/70 -mx-4 -mb-4 px-4 pb-2.5 rounded-b-xl font-mono text-[10px] text-[#bbcabf] border-t border-[#1b2029]">
                  <div>Tonase: <span className="text-[#dfe2f0] font-semibold">4.820 T/bln</span></div>
                  <div>Akses: <span className="text-[#ffb95f] font-semibold">Truk 2-As Terhambat</span></div>
                  <div>Status: <span className="text-[#4edea3] font-semibold">Verifikasi Lapangan</span></div>
                </div>
              </div>
            </div>

            {/* Quick Focus Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <span className="font-mono text-xs text-[#bbcabf] uppercase shrink-0 font-medium">Fokus Wilayah:</span>
              {['Berastagi', 'Simpang Empat', 'Tigapanah', 'Merek', 'Barusjahe', 'Merdeka'].map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm shrink-0 ${
                    selectedArea === area
                      ? 'bg-[#4edea3]/20 text-[#4edea3] font-semibold border border-[#4edea3]/40'
                      : 'bg-[#171c25] text-[#dfe2f0] hover:bg-[#262a34] border border-[#1b2029]'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            {/* Spatial Contextual Photo Preview */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="relative rounded-xl overflow-hidden h-28 bg-[#171c25] shadow-sm border border-[#1b2029] group">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Kondisi jalan lapen rusak berat"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc5rMChu4LvOVGBsY7R3r3RL7xp97RLE583pM5zoHnzaftvipHYvZQKWWW9PW71IV2roGTcnRMfZveuy_-EzDudKzpreX3n97-5t-tUWe3AiGK-vkpyq3HX14kB2zpQMA5Npq90FkZWgBazz88bI7SuPgMml6hRQN8F-uzX5DNKboG2YFcyWhiXWmXEPj_7XyIpOAqhKQ42AbUJCu5mo5-SW7iEZKas9YHIcXa99_mrcBT5d5-L3sveg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f131d] via-[#0f131d]/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-xs text-[#dfe2f0] font-medium truncate">Kondisi Eksisting: Lapen Rusak Berat</span>
                  <span className="font-mono text-[10px] text-[#4edea3]">STA 02+400</span>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden h-28 bg-[#171c25] shadow-sm border border-[#1b2029] group">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Aktivitas bongkar muat tomat"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNdQx5uCd8licPBQbMaYWTcdetD85oP9nQeEfGMT0pyjL-YdFVCceFYC4RoCZBmAUi9h7MJ7GFTJT7ODwUQqpMgoc-Wapg2sQ7jTxQqqIMcE74NNlmel12qQs66qMhfyNJ2-SjZf4ZbyRDVW4t2ACff2JVhiTzAb1Rn1OEmkAEWLj1r5VPj4alQ5qfaau7X6xzIfwaMPulOVpppblV5RvmJCdaQ1Ev_t-B6eI8-R0Pn9xzJxHCovw--A"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f131d] via-[#0f131d]/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-xs text-[#dfe2f0] font-medium truncate">Aktivitas Bongkar Muat Tomat &amp; Wortel</span>
                  <span className="font-mono text-[10px] text-[#adc6ff]">Titik Kumpul</span>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN (~35% -> 4 columns): Executive Detail Sheet Accent (Light Contrast White Dossier Card) */}
          <div className="lg:col-span-4 rounded-xl bg-[#F8FAFC] text-[#0F172A] p-5 shadow-2xl flex flex-col justify-between space-y-4 border border-[#E2E8F0]">
            <div className="space-y-4">
              {/* Header of Sheet */}
              <div className="flex items-start justify-between pb-3 bg-slate-200/50 -mx-5 -mt-5 p-5 rounded-t-xl border-b border-slate-300">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-xs font-bold tracking-wider">
                      RUAS ID: {currentRoad.id}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">
                      DATA SIMULASI
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    Detail Ruas Terpilih
                  </h3>
                </div>
                <button
                  onClick={() => alert(`Mencetak lembar analisis teknis resmi untuk ${currentRoad.id}: ${currentRoad.name}`)}
                  className="text-slate-500 hover:text-slate-800 transition-colors p-1"
                  title="Cetak Lembar Analisis"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">print</span>
                </button>
              </div>

              {/* Road Quick Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => handleSelectRoad('KRO-042')}
                  className={`flex-1 py-1 px-2 rounded text-xs font-mono font-semibold transition-all ${
                    activeRoadId === 'KRO-042'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  KRO-042 (Naman Teran)
                </button>
                <button
                  onClick={() => handleSelectRoad('KRO-018')}
                  className={`flex-1 py-1 px-2 rounded text-xs font-mono font-semibold transition-all ${
                    activeRoadId === 'KRO-018'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  KRO-018 (Simpang Empat)
                </button>
              </div>

              {/* Road Metadata Block */}
              <div className="space-y-1.5">
                <div className="text-base font-bold text-slate-900 leading-snug">
                  {currentRoad.name}
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 text-xs pt-1">
                  <div>Kewenangan: <span className="font-semibold text-slate-900">Jalan Kabupaten</span></div>
                  <div>Panjang Ruas: <span className="font-semibold text-slate-900">{currentRoad.lengthKm} km</span></div>
                  <div>Survei Terakhir: <span className="font-semibold text-slate-900">{currentRoad.surveyDate}</span></div>
                  <div>Tipe Konstruksi: <span className="font-semibold text-slate-900">{currentRoad.subgradeCondition}</span></div>
                </div>
              </div>

              {/* Giant Priority Score Gauge */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    SKOR PRIORITAS MCDA
                  </span>
                  <span className="font-mono text-xs text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    Peringkat {currentRoad.rank} dari 84 ruas
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-slate-900 font-extrabold tracking-tight">
                    {currentRoad.mcdaScore.toFixed(2)}
                  </span>
                  <span className="text-lg text-slate-400 font-medium">/ 1.00</span>
                </div>
                {/* High Contrast Progress Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-rose-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${currentRoad.mcdaScore * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-slate-500 font-mono text-[10px] pt-0.5">
                  <span>Rendah (0.00)</span>
                  <span>Ambang Intervensi (0.75)</span>
                  <span className="text-rose-600 font-semibold">Kritis (1.00)</span>
                </div>
              </div>

              {/* Dual Micro-Metric Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-amber-600 mb-1">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                    <span className="font-mono text-[10px] font-semibold uppercase">Kondisi Teknis</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{currentRoad.conditionDescription.split(' ')[0]} {currentRoad.conditionDescription.split(' ')[1]}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">PCI: {currentRoad.pciScore}</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                    <span className="material-symbols-outlined text-[16px]">agriculture</span>
                    <span className="font-mono text-[10px] font-semibold uppercase">Produksi Dilayani</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{currentRoad.tonnageYear}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{currentRoad.commodities}</div>
                </div>
              </div>

              {/* Data Completeness Mini Block with Warning */}
              <div className="bg-amber-50 p-3.5 rounded-xl space-y-1.5 border border-amber-200/70">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-amber-900 font-bold uppercase tracking-wider">
                    Kelengkapan Data Atribut
                  </span>
                  <span className="font-mono text-xs text-amber-900 font-extrabold">78%</span>
                </div>
                <div className="w-full bg-amber-200/70 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex items-start gap-1.5 pt-1 text-amber-800 text-xs leading-snug">
                  <span className="material-symbols-outlined text-[16px] text-amber-700 shrink-0 mt-0.5">info</span>
                  <span>
                    <strong>Catatan:</strong> 3 variabel kosong (Lebar drainase, riwayat genangan, debit angkut harian) — survei lapangan DPUTR diprioritaskan.
                  </span>
                </div>
              </div>

              {/* Simulation Criteria Breakdown Mini Table */}
              <div className="space-y-1.5 pt-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  Skor 6 Kriteria (AHP Simulasi)
                </span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center py-1 bg-white px-2.5 rounded border border-slate-200">
                    <span className="text-slate-700">1. Konektivitas Sentra Produksi</span>
                    <span className="font-mono font-bold text-slate-900">
                      {currentRoad.criteriaScores.P.toFixed(2)} / 1.0
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 bg-white px-2.5 rounded border border-slate-200">
                    <span className="text-slate-700">2. Tingkat Kerusakan Fisik</span>
                    <span className="font-mono font-bold text-slate-900">
                      {currentRoad.criteriaScores.C.toFixed(2)} / 1.0
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 bg-white px-2.5 rounded border border-slate-200">
                    <span className="text-slate-700">3. Tingkat Bahaya Bencana (Longsor)</span>
                    <span className="font-mono font-bold text-slate-900">
                      {currentRoad.criteriaScores.R.toFixed(2)} / 1.0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Dossier Card */}
            <div className="space-y-2 pt-3 bg-slate-200/50 -mx-5 -mb-5 p-5 rounded-b-xl border-t border-slate-300">
              <button
                onClick={() => onNavigate('04-mcda')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold border border-slate-300 transition-all shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-indigo-600">radar</span>
                <span>Lihat Radar 6 Kriteria</span>
              </button>
              <button
                onClick={handleSubmission}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-900/30 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Ajukan ke Forum OPD &amp; RKPD</span>
              </button>

              {showSubmissionSuccess && (
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 text-xs text-center font-medium animate-in fade-in duration-200">
                  ✓ Berhasil diajukan ke pembahasan Forum OPD dan RKPD 2025.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
