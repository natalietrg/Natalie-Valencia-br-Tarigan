import React, { useState } from 'react';
import { NavigationTab } from '../../types';

interface Module03Props {
  onNavigate: (tab: NavigationTab) => void;
  onSelectRoad?: (roadId: string) => void;
}

export const Module03Risiko: React.FC<Module03Props> = ({
  onNavigate,
  onSelectRoad,
}) => {
  const [highlightEmptyData, setHighlightEmptyData] = useState<boolean>(false);
  const [strictModeLocked, setStrictModeLocked] = useState<boolean>(true);
  const [activePin, setActivePin] = useState<string | null>(null);
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);

  // Decomposed factor values for simulation
  const [hazardVal, setHazardVal] = useState<number>(85);
  const [exposureVal, setExposureVal] = useState<number>(72);
  const [vulnerabilityVal, setVulnerabilityVal] = useState<number>(64);
  const [consequenceVal, setConsequenceVal] = useState<number>(90);

  // Computed composite risk index
  const computedIndex = ((hazardVal * 0.3 + exposureVal * 0.25 + vulnerabilityVal * 0.2 + consequenceVal * 0.25) / 100).toFixed(2);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* Top Context Header Bar */}
      <div className="px-6 py-4 bg-[#171c25]/80 backdrop-blur border-b border-[#1b2029] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#e29100] text-[#523200] font-mono text-[10px] font-bold tracking-wider">
              MODUL 03
            </span>
            <span className="font-mono text-[10px] text-[#ffb95f] tracking-widest uppercase font-semibold">
              PILAR 2: PERINGKAT &amp; RISIKO
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#86948a]"></span>
            <span className="font-mono text-[10px] text-[#4edea3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
              AUDIT DATA BPBD × DPUTR
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-[#dfe2f0] tracking-tight mt-1">
            MODUL 03 • PENILAIAN KONDISI TEKNIS &amp; RISIKO KETERPUTUSAN
          </h1>
          <p className="text-xs text-[#bbcabf] truncate max-w-3xl mt-0.5">
            Pemisahan Unsur Bahaya, Paparan, Kerentanan, dan Konsekuensi untuk Mencegah “Double Counting” Risiko Jalan Produksi
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => setShowFormulaModal(true)}
            className="group flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1b2029] text-[#dfe2f0] hover:bg-[#262a34] transition-all text-xs border border-[#31353f] shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffb95f] group-hover:rotate-12 transition-transform">menu_book</span>
            <span className="font-medium">Panduan Penilaian Risiko BPBD</span>
          </button>
          <button
            onClick={() => setHighlightEmptyData((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all border shadow-sm ${
              highlightEmptyData
                ? 'bg-[#e29100] text-[#523200] border-[#ffb95f] font-semibold'
                : 'bg-[#1b2029] text-[#dfe2f0] hover:bg-[#262a34] border-[#31353f]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#adc6ff]">label_off</span>
            <span className="font-medium">Tandai Data Kosong</span>
            <span className="px-1.5 py-0.2 rounded bg-[#31353f] text-[#adc6ff] font-mono text-[10px]">3</span>
          </button>
          <button
            onClick={() => alert('Mengekspor lembar verifikasi lapangan gabungan DPUTR & BPBD (PDF)...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#10b981] text-[#002113] hover:brightness-110 font-semibold transition-all text-xs shadow-md"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
            <span>Ekspor Lembar Verifikasi</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Peta Heat Overlay (~52% -> col-span-7) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="relative w-full rounded-xl overflow-hidden bg-[#0a0e17] shadow-xl border border-[#1b2029] flex flex-col">
            {/* Sub-Header */}
            <div className="px-4 py-3 bg-[#1b2029]/90 backdrop-blur border-b border-[#1b2029] flex flex-wrap items-center justify-between gap-3 z-20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">layers</span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#dfe2f0]">Overlay Spasial Kerentanan Karo</span>
                  <span className="font-mono text-[10px] text-[#bbcabf]">EPSG:3857 • Topologi Lereng Sinabung – Lau Biang</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#0a0e17] p-1 rounded-lg border border-[#31353f]">
                <button
                  className="px-2.5 py-1 rounded bg-[#e29100] text-[#523200] font-mono text-[10px] font-semibold flex items-center gap-1 shadow-sm"
                  type="button"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#523200]"></span>
                  Heatmap Longsor BPBD
                </button>
                <button
                  className="px-2.5 py-1 rounded text-[#bbcabf] hover:text-[#dfe2f0] font-mono text-[10px] font-medium flex items-center gap-1 hover:bg-[#1b2029] transition-all"
                  type="button"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff]"></span>
                  Riwayat 2022-2025
                </button>
                <button
                  className="px-2.5 py-1 rounded text-[#bbcabf] hover:text-[#dfe2f0] font-mono text-[10px] font-medium flex items-center gap-1 hover:bg-[#1b2029] transition-all"
                  type="button"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                  Jalan Alternatif
                </button>
              </div>
            </div>

            {/* Geospatial Canvas Visual Display */}
            <div className="relative w-full h-[580px] bg-[#0a0e17] overflow-hidden flex items-center justify-center">
              {/* Satellite Background */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity filter contrast-125"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKAe8lzCmdXna1cb2xHBxvyT7ruYgrKAwv2DfO8Xr9joIMbA-8Oph93FggZK3bmuI-bBEQgxRnPLDkwIDJrj55obh7fHohX1QmlvSELYoJUy2Jzj-5bEYydesGsttPoCltvvLJTvVxYtDNyrVj_70NEk28tOvDzMkVR0fi5D3EGeKXBVeXdVWphEdatLuxC6CdTYhM276Kbk8tJJFwtT67VQWzK5oKlBaIFSj13bXNLQ-UrBtmvLbNAQ')`,
                }}
              ></div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 600" fill="none">
                <defs>
                  <radialGradient id="heatSinabung" cx="38%" cy="44%" r="35%">
                    <stop offset="0%" stopColor="#ffb4ab" stopOpacity="0.8"></stop>
                    <stop offset="35%" stopColor="#e29100" stopOpacity="0.45"></stop>
                    <stop offset="70%" stopColor="#ffb95f" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#ffb95f" stopOpacity="0"></stop>
                  </radialGradient>
                  <radialGradient id="heatBerastagi" cx="68%" cy="28%" r="28%">
                    <stop offset="0%" stopColor="#93000a" stopOpacity="0.75"></stop>
                    <stop offset="40%" stopColor="#e29100" stopOpacity="0.4"></stop>
                    <stop offset="85%" stopColor="#4edea3" stopOpacity="0.1"></stop>
                    <stop offset="100%" stopColor="#4edea3" stopOpacity="0"></stop>
                  </radialGradient>
                  <radialGradient id="heatLauBiang" cx="50%" cy="65%" r="30%">
                    <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.65"></stop>
                    <stop offset="50%" stopColor="#0566d9" stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor="#0566d9" stopOpacity="0"></stop>
                  </radialGradient>
                  <pattern id="gridSub" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gridSub)"></rect>

                {/* River Flow */}
                <path d="M 120 590 C 240 540, 360 480, 440 450 C 520 420, 600 480, 720 540 C 800 580, 850 610, 890 620" fill="none" stroke="#adc6ff" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.5"></path>
                <text x="730" y="560" fill="#adc6ff" fontFamily="JetBrains Mono" fontSize="11" opacity="0.8">Lau Biang Drainage</text>

                {/* Contours */}
                <path d="M 180 320 Q 280 200 420 220 T 680 180 T 820 120" fill="none" stroke="#86948a" strokeWidth="1" strokeDasharray="2 4" opacity="0.3"></path>
                <path d="M 220 380 Q 320 280 460 290 T 720 240 T 860 190" fill="none" stroke="#86948a" strokeWidth="1" strokeDasharray="2 4" opacity="0.3"></path>
                <path d="M 160 450 Q 280 370 420 380 T 670 340 T 810 290" fill="none" stroke="#86948a" strokeWidth="1" strokeDasharray="2 4" opacity="0.3"></path>

                {/* Landslide Heat Blooms */}
                <ellipse cx="340" cy="270" rx="220" ry="170" fill="url(#heatSinabung)"></ellipse>
                <ellipse cx="610" cy="180" rx="190" ry="140" fill="url(#heatBerastagi)"></ellipse>
                <ellipse cx="480" cy="410" rx="180" ry="110" fill="url(#heatLauBiang)"></ellipse>

                {/* Monitored Road Corridor (KRO-018) */}
                <path d="M 260 380 L 320 330 L 370 295 L 430 260 L 490 245" fill="none" stroke="#ffb95f" strokeWidth="4" strokeLinecap="round"></path>
                <path d="M 260 380 L 320 330 L 370 295 L 430 260 L 490 245" fill="none" stroke="#dfe2f0" strokeWidth="1.5" strokeDasharray="3 3"></path>

                {/* Arteries */}
                <path d="M 490 245 L 560 210 L 630 190 L 710 160" fill="none" stroke="#4edea3" strokeWidth="2.5" opacity="0.7"></path>
                <path d="M 370 295 L 390 380 L 450 430" fill="none" stroke="#4edea3" strokeWidth="2" strokeDasharray="4 2" opacity="0.6"></path>
              </svg>

              {/* Pin 1: Longsor Berastagi */}
              <div 
                className="absolute top-[28%] right-[28%] z-30 group cursor-pointer"
                onClick={() => setActivePin(activePin === 'longsor' ? null : 'longsor')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-[#ba1a1a]/40 animate-ping"></span>
                  <span className="w-5 h-5 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-lg font-bold text-[11px]">
                    !
                  </span>
                </div>
                <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-64 p-2.5 rounded-lg bg-[#262a34]/95 backdrop-blur shadow-2xl border border-[#31353f] transition-all duration-200 ${
                  activePin === 'longsor' ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none'
                }`}>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-mono text-[10px] font-semibold">
                      LONGSOR BERASTAGI
                    </span>
                    <span className="font-mono text-[10px] text-[#bbcabf]">Nov 2024</span>
                  </div>
                  <p className="text-xs text-[#dfe2f0] font-semibold leading-tight">
                    Jalan Terputus Total 18 Jam
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[#bbcabf] font-mono text-[10px]">
                    <span className="material-symbols-outlined text-[13px] text-[#ffb95f]">local_shipping</span>
                    <span>Distribusi 420 ton sayur tertahan</span>
                  </div>
                </div>
              </div>

              {/* Pin 2: Amblesan Dolat Rayat */}
              <div 
                className="absolute bottom-[38%] right-[38%] z-30 group cursor-pointer"
                onClick={() => setActivePin(activePin === 'amblesan' ? null : 'amblesan')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-[#ffb95f] text-[#472a00] flex items-center justify-center shadow-md font-mono text-[10px] font-bold">
                    A
                  </span>
                </div>
                <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-52 p-2 rounded-lg bg-[#262a34]/95 backdrop-blur shadow-xl border border-[#31353f] transition-all ${
                  activePin === 'amblesan' ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none'
                }`}>
                  <div className="font-mono text-[10px] font-bold text-[#ffb95f]">AMBLESAN DOLAT RAYAT</div>
                  <div className="text-xs text-[#dfe2f0]">Jan 2024 • Penurunan Badan Jalan 60cm</div>
                </div>
              </div>

              {/* Pin 3: Banjir Lau Biang */}
              <div 
                className="absolute bottom-[22%] left-[46%] z-30 group cursor-pointer"
                onClick={() => setActivePin(activePin === 'banjir' ? null : 'banjir')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-[#0566d9] text-[#e6ecff] flex items-center justify-center shadow-md font-mono text-[10px] font-bold">
                    B
                  </span>
                </div>
                <div className={`absolute -top-16 left-1/2 -translate-x-1/2 w-48 p-2 rounded-lg bg-[#262a34]/95 backdrop-blur shadow-xl border border-[#31353f] transition-all ${
                  activePin === 'banjir' ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none'
                }`}>
                  <div className="font-mono text-[10px] font-bold text-[#adc6ff]">BANJIR LAU BIANG</div>
                  <div className="text-xs text-[#dfe2f0]">Okt 2023 • Genangan 1.2m (36 Jam)</div>
                </div>
              </div>

              {/* Pinned Segment: KRO-018 */}
              <div className="absolute top-[48%] left-[36%] z-30">
                <div className="px-2.5 py-1 rounded-full bg-[#0a0e17]/90 backdrop-blur shadow-md flex items-center gap-1.5 border border-[#31353f]">
                  <span className="w-2 h-2 rounded-full bg-[#ffb95f] animate-pulse"></span>
                  <span className="font-mono text-[11px] font-bold text-[#dfe2f0]">RUAS KRO-018</span>
                  <span className="px-1 rounded bg-[#1b2029] text-[#ffb95f] font-mono text-[10px]">0.88</span>
                </div>
              </div>

              {/* Compass & Scale Bar */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 p-2 rounded-lg bg-[#0a0e17]/80 backdrop-blur border border-[#31353f]">
                <div className="flex items-center gap-1 font-mono text-[10px] text-[#bbcabf]">
                  <span className="material-symbols-outlined text-[16px] text-[#4edea3]">explore</span>
                  <span>UTARA 0°</span>
                </div>
                <div className="w-16 h-1 bg-[#31353f] rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-[#86948a]"></div>
                </div>
                <span className="font-mono text-[9px] text-[#86948a]">2.5 KM</span>
              </div>

              {/* Legend Card */}
              <div className="absolute top-4 right-4 z-20 p-2.5 rounded-lg bg-[#0a0e17]/90 backdrop-blur flex flex-col gap-1 shadow-lg max-w-[190px] border border-[#31353f]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#dfe2f0] font-semibold">Tingkat Kerentanan</span>
                <div className="w-full h-2 rounded-full bg-gradient-to-r from-[#4edea3] via-[#ffb95f] to-[#ffb4ab]"></div>
                <div className="flex items-center justify-between font-mono text-[10px] text-[#bbcabf]">
                  <span>Rendah</span>
                  <span>Sedang</span>
                  <span className="text-[#ffb4ab] font-semibold">Kritis</span>
                </div>
              </div>

              {/* Bottom Summary Widget Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-lg bg-[#1b2029]/95 backdrop-blur shadow-2xl border border-[#31353f] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#93000a] text-[#ffdad6] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">warning</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase text-[#ffb4ab] font-bold tracking-wider">
                        INDEKS RISIKO TERTINGGI
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-[#31353f] text-[#bbcabf] font-mono text-[9px]">
                        Zona Sinabung Barat
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[#dfe2f0] truncate">
                      Ruas KRO-018 (Simpang Empat – Naman Teran)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <div className="font-mono text-[10px] text-[#bbcabf] uppercase">Skor Risiko Gabungan</div>
                    <div className="font-mono text-lg font-bold text-[#ffb4ab] tracking-tight">
                      0.88 <span className="text-xs font-normal text-[#bbcabf]">/ 1.00 (Kritis)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (onSelectRoad) onSelectRoad('KRO-018');
                      onNavigate('04-mcda');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#dfe2f0] text-xs font-medium transition-all flex items-center gap-1 border border-[#31353f]"
                    type="button"
                  >
                    <span>Fokus Ruas</span>
                    <span className="material-symbols-outlined text-[16px]">filter_center_focus</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Spatial Telemetry Footer */}
            <div className="px-4 py-2 bg-[#171c25] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#bbcabf] border-t border-[#1b2029]">
              <div className="flex items-center gap-3">
                <span>Citra Satelit Sentinel-2: <strong className="text-[#dfe2f0]">15 Jan 2025</strong></span>
                <span>•</span>
                <span>Data DEM Alos Palsar 12.5m: <strong className="text-[#dfe2f0]">Terverifikasi</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-[#4edea3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                <span>Sinkronisasi Sinkhole &amp; Sesar Aktif: AKTIF</span>
              </div>
            </div>
          </div>

          {/* Micro-Insight Card */}
          <div className="p-4 rounded-xl bg-[#1b2029] border border-[#31353f] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#e29100] text-[#523200] shrink-0">
                <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#dfe2f0]">Prinsip Non-Double Counting DPUTR-BPBD</span>
                <p className="text-xs text-[#bbcabf] mt-0.5">
                  Parameter kemiringan lereng tidak digabungkan kembali dalam matriks MCDA ekonomi. Modul ini mengunci skor risiko terisolasi secara saintifik.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFormulaModal(true)}
              className="shrink-0 px-3 py-1.5 rounded bg-[#31353f] hover:bg-[#262a34] text-[#dfe2f0] font-mono text-xs font-medium transition-all flex items-center gap-1 border border-[#1b2029]"
            >
              <span>Lihat Matriks Formula</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Breakdown Risiko (~48% -> col-span-5) */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          {/* Card 1: Penguraian Risiko Keterputusan */}
          <div className="p-5 rounded-xl bg-[#1b2029] border border-[#31353f] shadow-xl flex flex-col gap-4">
            <div className="flex items-start justify-between pb-2 border-b border-[#31353f]/60">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#e29100] text-[#523200] font-mono text-[10px] font-bold uppercase">
                    FORMULA RISIKO
                  </span>
                  <span className="font-mono text-[10px] text-[#bbcabf]">R = (H × E × V) / C</span>
                </div>
                <h2 className="text-base font-bold text-[#dfe2f0] mt-1">
                  PENGURAIAN RISIKO KETERPUTUSAN
                </h2>
                <span className="text-xs text-[#bbcabf]">
                  Validasi Mandiri: Unsur Bahaya, Paparan, Kerentanan &amp; Konsekuensi
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase">Index Gabungan</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0a0e17] border border-[#31353f]">
                  <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-pulse"></span>
                  <span className="font-mono text-sm font-bold text-[#ffb4ab]">{computedIndex}</span>
                  <span className="text-xs text-[#bbcabf] font-medium">(Tinggi)</span>
                </div>
              </div>
            </div>

            {/* 4 Factor Bars with interactive sliders */}
            <div className="flex flex-col gap-3">
              {/* Factor 1: Bahaya (Hazard) */}
              <div className="p-3 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#e29100] text-[#523200] flex items-center justify-center font-mono text-[10px] font-bold">
                      H
                    </span>
                    <span className="text-xs font-semibold text-[#dfe2f0]">Bahaya (Hazard)</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-[#ffb95f] font-bold">{hazardVal}%</span>
                    <span className="text-[#bbcabf] text-[10px]">(Bobot: 0.30)</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={hazardVal}
                  onChange={(e) => setHazardVal(Number(e.target.value))}
                  className="w-full accent-[#ffb95f] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[#bbcabf] font-mono text-[10px]">
                  <span className="truncate">Frekuensi curah hujan ekstrem &amp; kemiringan lereng &gt;35°</span>
                  <span className="shrink-0 text-[#4edea3]">Tervalidasi BMKG</span>
                </div>
              </div>

              {/* Factor 2: Paparan (Exposure) */}
              <div className="p-3 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#0566d9] text-[#e6ecff] flex items-center justify-center font-mono text-[10px] font-bold">
                      E
                    </span>
                    <span className="text-xs font-semibold text-[#dfe2f0]">Paparan (Exposure)</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-[#adc6ff] font-bold">{exposureVal}%</span>
                    <span className="text-[#bbcabf] text-[10px]">(Bobot: 0.25)</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={exposureVal}
                  onChange={(e) => setExposureVal(Number(e.target.value))}
                  className="w-full accent-[#adc6ff] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[#bbcabf] font-mono text-[10px]">
                  <span className="truncate">Volume angkutan komoditas melintas ruas per minggu</span>
                  <span className="shrink-0 text-[#dfe2f0] font-semibold">1.800 Ton / Pekan</span>
                </div>
              </div>

              {/* Factor 3: Kerentanan (Vulnerability) */}
              <div className="p-3 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#31353f] text-[#dfe2f0] flex items-center justify-center font-mono text-[10px] font-bold">
                      V
                    </span>
                    <span className="text-xs font-semibold text-[#dfe2f0]">Kerentanan (Vulnerability)</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-[#dfe2f0] font-bold">{vulnerabilityVal}%</span>
                    <span className="text-[#bbcabf] text-[10px]">(Bobot: 0.20)</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={vulnerabilityVal}
                  onChange={(e) => setVulnerabilityVal(Number(e.target.value))}
                  className="w-full accent-[#bbcabf] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[#bbcabf] font-mono text-[10px]">
                  <span className="truncate">Kondisi lereng tanpa bronjong penahan, drainase minim</span>
                  <span className="shrink-0 text-[#ffb4ab]">Struktur Rawan</span>
                </div>
              </div>

              {/* Factor 4: Konsekuensi Keterputusan (Consequence) */}
              <div className="p-3 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#93000a] text-[#ffdad6] flex items-center justify-center font-mono text-[10px] font-bold">
                      C
                    </span>
                    <span className="text-xs font-semibold text-[#dfe2f0]">Konsekuensi (Consequence)</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-[#ffb4ab] font-bold">{consequenceVal}%</span>
                    <span className="text-[#bbcabf] text-[10px]">(Bobot: 0.25)</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={consequenceVal}
                  onChange={(e) => setConsequenceVal(Number(e.target.value))}
                  className="w-full accent-[#ffb4ab] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[#bbcabf] font-mono text-[10px]">
                  <span className="truncate">Ketiadaan jalan alternatif terdekat • Akses tunggal</span>
                  <span className="shrink-0 text-[#ffb4ab] font-bold">4 Desa Terisolir</span>
                </div>
              </div>
            </div>

            {/* Mini Polar / Radar Vector Graphic */}
            <div className="p-3 rounded-lg bg-[#0a0e17] border border-[#31353f] flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase">Profil Risiko Polar Multi-Sumbu</span>
                <span className="text-xs font-bold text-[#dfe2f0]">Dominasi Bahaya Ekstrem &amp; Ketiadaan Jalur Evakuasi</span>
                <div className="flex items-center gap-3 mt-1 font-mono text-[10px]">
                  <span className="flex items-center gap-1 text-[#ffb95f]">
                    <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span> Skor H: {(hazardVal / 100).toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1 text-[#ffb4ab]">
                    <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span> Skor C: {(consequenceVal / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Inline SVG Radar Display */}
              <svg className="w-24 h-24 shrink-0" viewBox="0 0 100 100">
                <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="#31353f" strokeWidth="1"></polygon>
                <polygon points="50,28 72,50 50,72 28,50" fill="none" stroke="#31353f" strokeWidth="1"></polygon>
                <line x1="50" y1="10" x2="50" y2="90" stroke="#31353f" strokeWidth="0.7"></line>
                <line x1="10" y1="50" x2="90" y2="50" stroke="#31353f" strokeWidth="0.7"></line>
                {/* Simulated dynamic diamond */}
                <polygon
                  points={`50,${50 - (hazardVal / 100) * 38} ${50 + (exposureVal / 100) * 38},50 50,${50 + (vulnerabilityVal / 100) * 38} ${50 - (consequenceVal / 100) * 38},50`}
                  fill="#e29100"
                  fillOpacity="0.35"
                  stroke="#ffb95f"
                  strokeWidth="1.8"
                ></polygon>
                <circle cx="50" cy="50" r="2" fill="#dfe2f0"></circle>
              </svg>
            </div>
          </div>

          {/* Card 2: Kondisi Teknis Ruas Terpilih (DPUTR) */}
          <div className="p-5 rounded-xl bg-[#1b2029] border border-[#31353f] shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#31353f]/60">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#10b981] text-[#002113] font-mono text-[10px] font-bold uppercase">
                  DPUTR TEKNIS
                </span>
                <span className="text-sm font-bold text-[#dfe2f0]">Kondisi Teknis Ruas Terpilih</span>
              </div>
              <span className="font-mono text-[10px] text-[#bbcabf] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                Inspeksi: 18 Jan 2025
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col">
                <span className="font-mono text-[10px] text-[#bbcabf]">KODE RUAS</span>
                <span className="font-mono text-sm font-bold text-[#4edea3] mt-0.5">KRO-018</span>
                <span className="text-[11px] text-[#bbcabf] truncate">Simpang Empat – Naman</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col">
                <span className="font-mono text-[10px] text-[#bbcabf]">TIPE PERKERASAN</span>
                <span className="text-xs font-bold text-[#dfe2f0] mt-0.5">Penetrasi Macadam</span>
                <span className="font-mono text-[10px] text-[#bbcabf]">Aspal Lapen Kasar</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col">
                <span className="font-mono text-[10px] text-[#bbcabf]">TINGKAT KERUSAKAN</span>
                <span className="font-mono text-sm font-bold text-[#ffb4ab] mt-0.5">42.0%</span>
                <span className="font-mono text-[10px] text-[#ffb4ab]">Rusak Sedang-Berat</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col">
                <span className="font-mono text-[10px] text-[#bbcabf]">LEBAR EFEKTIF</span>
                <span className="font-mono text-sm font-bold text-[#dfe2f0] mt-0.5">3.50 Meter</span>
                <span className="font-mono text-[10px] text-[#ffb95f]">Colt Diesel Limit</span>
              </div>
            </div>

            {/* Visual Damage Breakdown Bar */}
            <div className="p-3 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col gap-2">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#dfe2f0] font-semibold">Distribusi Kerusakan Fisik Lapangan</span>
                <span className="text-[#bbcabf]">Survei Visual Camcorder DPUTR</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#31353f] overflow-hidden flex">
                <div className="h-full bg-[#ffb4ab]" style={{ width: '22%' }} title="Lubang Dalam: 22%"></div>
                <div className="h-full bg-[#ffb95f]" style={{ width: '14%' }} title="Retak Buaya: 14%"></div>
                <div className="h-full bg-[#e29100]" style={{ width: '6%' }} title="Bahu Amblas: 6%"></div>
                <div className="h-full bg-[#353944]" style={{ width: '58%' }} title="Kondisi Mantap: 58%"></div>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-[10px] pt-1">
                <div className="flex items-center gap-1.5 text-[#bbcabf]">
                  <span className="w-2 h-2 rounded bg-[#ffb4ab]"></span>
                  <span>Lubang Dalam (22%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#bbcabf]">
                  <span className="w-2 h-2 rounded bg-[#ffb95f]"></span>
                  <span>Retak Buaya (14%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#bbcabf]">
                  <span className="w-2 h-2 rounded bg-[#e29100]"></span>
                  <span>Bahu Amblas (6%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Integritas & Kelengkapan Data */}
          <div className="p-5 rounded-xl bg-[#1b2029] border border-[#31353f] shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#adc6ff] text-[20px]">verified</span>
                <h3 className="text-sm font-bold text-[#dfe2f0]">Integritas &amp; Kelengkapan Data</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#31353f] text-[#adc6ff] font-mono text-[10px] font-semibold">
                14 / 17 Terverifikasi
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#bbcabf]">Kelengkapan Parameter Lapangan</span>
                <span className="text-[#4edea3] font-bold">82.35% Lengkap</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#31353f] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#0566d9] via-[#10b981] to-[#4edea3]" style={{ width: '82.35%' }}></div>
              </div>
            </div>

            {/* Strict Warning Callout */}
            <div className={`p-3 rounded-lg border transition-all ${
              highlightEmptyData
                ? 'bg-[#e29100]/20 border-[#ffb95f]'
                : 'bg-[#0a0e17] border-[#31353f]'
            } flex flex-col gap-2`}>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px] shrink-0 mt-0.5">report_problem</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#dfe2f0]">
                    3 Parameter Kritis Belum Terisi (Data Kosong)
                  </span>
                  <p className="font-mono text-[10px] text-[#bbcabf] mt-0.5">
                    Protokol integritas SPJPP menolak substitusi estimasi otomatis. Parameter berikut ditandai eksplisit:
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-1 rounded bg-[#171c25] text-[#ffb95f] font-mono text-[10px] border border-[#31353f] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span>
                  [CBR Subgrade Tanah Dasar]
                </span>
                <span className="px-2 py-1 rounded bg-[#171c25] text-[#ffb95f] font-mono text-[10px] border border-[#31353f] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span>
                  [LHR Truk Musim Panen]
                </span>
                <span className="px-2 py-1 rounded bg-[#171c25] text-[#ffb95f] font-mono text-[10px] border border-[#31353f] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span>
                  [Kapasitas Debit Gorong-gorong]
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[#bbcabf] font-mono text-[10px]">
                <span className="material-symbols-outlined text-[15px] text-[#4edea3]">gavel</span>
                <span>Standar Permen PU 19/2011</span>
              </div>
              <button
                onClick={() => setStrictModeLocked(!strictModeLocked)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm border ${
                  strictModeLocked
                    ? 'bg-[#10b981] text-[#002113] border-[#4edea3]'
                    : 'bg-[#262a34] text-[#dfe2f0] border-[#31353f]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {strictModeLocked ? 'lock' : 'lock_open'}
                </span>
                <span>{strictModeLocked ? 'Strict Mode Aktif' : 'Aktifkan Strict Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Notification Bar */}
      <div className="mx-6 mb-6 p-3 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#4edea3]">satellite_alt</span>
          <span className="text-xs text-[#dfe2f0]">
            Tim Survei BPBD Sektor Naman Teran: <strong>Posko Siaga 1 Berastagi</strong> (Pembaruan data per 6 jam)
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-[10px] text-[#bbcabf]">Status Algoritma MCDA:</span>
          <button
            onClick={() => onNavigate('04-mcda')}
            className="px-2.5 py-1 rounded bg-[#10b981] text-[#002113] font-mono text-[10px] font-semibold hover:brightness-110 transition-all flex items-center gap-1"
          >
            <span>Siap Hitung Bobot Modul 04</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Formula Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#171c25] rounded-xl max-w-lg w-full border border-[#31353f] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#31353f] pb-3">
              <h3 className="font-bold text-[#dfe2f0] text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb95f]">functions</span>
                Formula Baku Risiko Keterputusan BPBD Karo
              </h3>
              <button onClick={() => setShowFormulaModal(false)} className="text-[#bbcabf] hover:text-white">✕</button>
            </div>
            <div className="p-3 bg-[#0a0e17] rounded-lg font-mono text-xs text-[#adc6ff] text-center border border-[#1b2029]">
              R = (Hazard × Exposure × Vulnerability) / Consequence
            </div>
            <div className="space-y-2 text-xs text-[#bbcabf]">
              <p>
                <strong>1. Non-Double Counting:</strong> Kemiringan lereng yang telah diukur di Hazard (H) tidak boleh dihitung ulang dalam indikator teknis jalan DPUTR (C) untuk menjaga independensi matematis.
              </p>
              <p>
                <strong>2. Consequence Inversion:</strong> Ketiadaan jalan alternatif dibobotkan sebagai faktor konsekuensi keterputusan tertinggi (C = 90%), memastikan desa-desa terpencil tidak terisolasi saat bencana.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#4edea3] text-[#003824] text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
