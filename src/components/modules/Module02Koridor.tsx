import React, { useState } from 'react';
import { NavigationTab } from '../../types';

interface Module02Props {
  onNavigate: (tab: NavigationTab) => void;
  onSelectRoad?: (roadId: string) => void;
}

interface CorridorRoad {
  id: string;
  name: string;
  sub: string;
  kecamatan: string;
  lengthKm: number;
  commodities: string;
  commodityColor: string;
  tk: string;
  market: string;
  hasAlt: boolean;
}

export const Module02Koridor: React.FC<Module02Props> = ({
  onNavigate,
  onSelectRoad,
}) => {
  const [selectedCommodity, setSelectedCommodity] = useState<string>('Semua');
  const [selectedCorridor, setSelectedCorridor] = useState<string>('k01');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activeLayers, setActiveLayers] = useState({
    kecamatan: true,
    tk: true,
    sentra: true,
    alt: false,
  });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showGeotagModal, setShowGeotagModal] = useState<boolean>(false);
  const [showSaveToast, setShowSaveToast] = useState<boolean>(false);
  const [selectedDetailRoad, setSelectedDetailRoad] = useState<CorridorRoad | null>(null);

  const roadsK01: CorridorRoad[] = [
    {
      id: 'KRO-012',
      name: 'Jl. Raya Ujung Teran – Cinta Rakyat',
      sub: 'Perkerasan Aspal Tipis',
      kecamatan: 'Merdeka',
      lengthKm: 6.4,
      commodities: 'Wortel & Kubis',
      commodityColor: '#ffb95f',
      tk: 'TK-01',
      market: 'Pasar Roga',
      hasAlt: true,
    },
    {
      id: 'KRO-018',
      name: 'Ruas Lingkar Gurusinga – Berastagi',
      sub: 'Kondisi Rusak Ringan',
      kecamatan: 'Berastagi',
      lengthKm: 4.2,
      commodities: 'Wortel Super',
      commodityColor: '#ffb95f',
      tk: 'TK-01',
      market: 'Lau Cih Medan',
      hasAlt: false,
    },
    {
      id: 'KRO-024',
      name: 'Akses Kebun Lau Gumba – Peceren',
      sub: 'Tanah Padat & Sirtu',
      kecamatan: 'Berastagi',
      lengthKm: 3.1,
      commodities: 'Tomat & Cabai',
      commodityColor: '#ffb4ab',
      tk: 'TK-01',
      market: 'Pasar Roga',
      hasAlt: true,
    },
    {
      id: 'KRO-031',
      name: 'Akses Sentra Pertanian Beganding',
      sub: 'Beton Rigid 3,5m',
      kecamatan: 'Simpang Empat',
      lengthKm: 5.8,
      commodities: 'Kentang Granola',
      commodityColor: '#adc6ff',
      tk: 'TK-02',
      market: 'Belawan (Ekspor)',
      hasAlt: true,
    },
    {
      id: 'KRO-042',
      name: 'Ruas Simpang Empat – Lingkar Ndokum',
      sub: 'Tanpa Drainase Samping',
      kecamatan: 'Simpang Empat',
      lengthKm: 7.2,
      commodities: 'Kubis & Wortel',
      commodityColor: '#4edea3',
      tk: 'TK-02',
      market: 'Pasar Roga',
      hasAlt: false,
    },
    {
      id: 'KRO-049',
      name: 'Konektor Desa Jaranguda – Kaki Sibayak',
      sub: 'Lereng Curam / Rawan Erosi',
      kecamatan: 'Merdeka',
      lengthKm: 4.6,
      commodities: 'Tomat & Buncis',
      commodityColor: '#ffb4ab',
      tk: 'TK-01',
      market: 'Pasar Roga',
      hasAlt: true,
    },
    {
      id: 'KRO-055',
      name: 'Akses Kebun Sayur Raya Usang',
      sub: 'Jalan Penetrasi Makadam',
      kecamatan: 'Berastagi',
      lengthKm: 3.5,
      commodities: 'Kentang Bibit',
      commodityColor: '#adc6ff',
      tk: 'TK-01',
      market: 'Lau Cih Medan',
      hasAlt: false,
    },
  ];

  const filteredRoads = roadsK01.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.kecamatan.toLowerCase().includes(searchFilter.toLowerCase());

    if (selectedCommodity === 'Semua') return matchesSearch;
    return matchesSearch && r.commodities.toLowerCase().includes(selectedCommodity.toLowerCase());
  });

  const toggleLayer = (layer: 'kecamatan' | 'tk' | 'sentra' | 'alt') => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev [layer] }));
  };

  const handleSaveCorridor = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* Command Header & Breadcrumb Strip */}
      <div className="px-6 py-4 bg-[#0a0e17]/80 border-b border-[#1b2029] flex flex-col gap-4 relative overflow-hidden">
        {/* Glows */}
        <div className="absolute -top-12 right-24 w-96 h-36 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-8 left-1/3 w-64 h-24 bg-[#0566d9]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#31353f] text-[#4edea3] font-mono text-[10px] font-semibold tracking-wider uppercase">
                PILAR DATA • SPASIAL AGRIBISNIS
              </span>
              <span className="text-[#86948a] font-mono text-[10px]">•</span>
              <span className="font-mono text-[10px] text-[#bbcabf] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span> Sinkronisasi GIS Aktif
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#dfe2f0] tracking-tight">
              MODUL 02 • PEMETAAN KORIDOR PERTANIAN
            </h1>
            <p className="text-xs text-[#bbcabf]">
              Pengelompokan Ruas Jalan ke dalam Koridor Logistik Agribisnis Komoditas Unggulan Karo
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              onClick={() => alert('Parameter Koridor: Buffer sentra 2.5 km, batas muatan truk 8 Ton, elevasi maksimum 1.450 mdpl.')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1b2029] text-[#dfe2f0] hover:bg-[#262a34] transition-all text-xs border border-[#31353f] shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Parameter Koridor</span>
            </button>
            <button
              onClick={() => alert('Membuka formulir konektivitas ruas jalan baru ke basis data SIG DPUTR.')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#10b981] text-[#002113] text-xs font-semibold shadow-md hover:brightness-110 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_link</span>
              <span>Hubungkan Ruas Baru</span>
            </button>
          </div>
        </div>

        {/* Informational Callout Box */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#171c25]/90 border border-[#1b2029] z-10 shadow-inner">
          <div className="w-8 h-8 rounded-lg bg-[#1b2029] flex items-center justify-center text-[#4edea3] shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">info</span>
          </div>
          <div className="flex-1 text-[#bbcabf] text-xs leading-relaxed">
            <span className="font-semibold text-[#dfe2f0]">Basis Integrasi Data:</span> Data produksi BPS tersedia per kabupaten dan kecamatan; hubungan dengan ruas dibangun lewat data spasial lokasi sentra komoditas dan titik kumpul logistik gabungan kelompok tani (Gapoktan).
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1b2029] text-[#ffb95f] font-mono text-[10px] shrink-0 border border-[#31353f]">
            <span className="material-symbols-outlined text-[14px]">query_stats</span> BPS KARO 2024/2025
          </div>
        </div>

        {/* Commodity Filter Selector Strip */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 z-10 no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono text-[10px] text-[#86948a] uppercase font-semibold mr-1">
              Filter Komoditas:
            </span>
            <button
              onClick={() => setSelectedCommodity('Semua')}
              className={`px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all ${
                selectedCommodity === 'Semua'
                  ? 'bg-[#4edea3] text-[#003824] shadow-sm'
                  : 'text-[#dfe2f0] bg-[#1b2029] hover:bg-[#262a34]'
              }`}
            >
              Semua Komoditas
            </button>
            <button
              onClick={() => setSelectedCommodity('Wortel')}
              className={`px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all ${
                selectedCommodity === 'Wortel'
                  ? 'bg-[#ffb95f] text-[#472a00] shadow-sm'
                  : 'text-[#dfe2f0] bg-[#1b2029] hover:bg-[#262a34]'
              }`}
            >
              <span className="w-2 h-2 rounded-full inline-block bg-[#ffb95f] mr-1.5"></span>
              Wortel (8.518 ha)
            </button>
            <button
              onClick={() => setSelectedCommodity('Tomat')}
              className={`px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all ${
                selectedCommodity === 'Tomat'
                  ? 'bg-[#ffb4ab] text-[#690005] shadow-sm'
                  : 'text-[#dfe2f0] bg-[#1b2029] hover:bg-[#262a34]'
              }`}
            >
              <span className="w-2 h-2 rounded-full inline-block bg-[#ffb4ab] mr-1.5"></span>
              Tomat (3.551,5 ha)
            </button>
            <button
              onClick={() => setSelectedCommodity('Kubis')}
              className={`px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all ${
                selectedCommodity === 'Kubis'
                  ? 'bg-[#4edea3] text-[#003824] shadow-sm'
                  : 'text-[#dfe2f0] bg-[#1b2029] hover:bg-[#262a34]'
              }`}
            >
              <span className="w-2 h-2 rounded-full inline-block bg-[#4edea3] mr-1.5"></span>
              Kubis (4.895 ha)
            </button>
            <button
              onClick={() => setSelectedCommodity('Kentang')}
              className={`px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all ${
                selectedCommodity === 'Kentang'
                  ? 'bg-[#adc6ff] text-[#002e6a] shadow-sm'
                  : 'text-[#dfe2f0] bg-[#1b2029] hover:bg-[#262a34]'
              }`}
            >
              <span className="w-2 h-2 rounded-full inline-block bg-[#adc6ff] mr-1.5"></span>
              Kentang (4.356,5 ha)
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[#bbcabf] font-mono text-xs shrink-0">
            <span className="px-2 py-0.5 rounded bg-[#1b2029] text-[#86948a] border border-[#31353f]">
              Luas Total: 21.321 ha
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1b2029] text-[#4edea3] border border-[#31353f]">
              Est. Volume: 482.000 Ton/Th
            </span>
          </div>
        </div>
      </div>

      {/* Dual Workspace: Left GIS Map (6 cols) + Right Table (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* SISI KIRI (6 COLS): MAP CORRIDOR BUILDER */}
        <div className="lg:col-span-6 flex flex-col gap-4 min-w-0">
          <div className="bg-[#0a0e17] rounded-xl shadow-lg border border-[#1b2029] overflow-hidden flex flex-col h-[780px] relative">
            {/* Top Map Header Overlay */}
            <div className="p-3 bg-[#171c25]/95 backdrop-blur-md border-b border-[#1b2029] flex items-center justify-between z-20 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">polyline</span>
                <div>
                  <div className="text-sm font-semibold text-[#dfe2f0]">
                    Peta Spasial Jaringan Koridor Agribisnis
                  </div>
                  <div className="font-mono text-[10px] text-[#bbcabf]">
                    KABUPATEN KARO • SKALA MAKRO LOGISTIK
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#31353f] text-[#4edea3] font-mono text-xs font-semibold">
                  4 Koridor Aktif
                </span>
                <button
                  onClick={() => alert('Mode layar penuh GIS diaktifkan')}
                  className="p-1.5 rounded-lg bg-[#1b2029] text-[#dfe2f0] hover:bg-[#262a34] transition-all"
                  title="Mode Layar Penuh"
                >
                  <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Layer Control Switch Pill Box */}
            <div className="absolute top-16 left-3 z-20 flex flex-wrap gap-1.5 p-1.5 rounded-lg bg-[#0a0e17]/90 backdrop-blur-md border border-[#31353f] shadow-md max-w-[92%]">
              <button
                onClick={() => toggleLayer('kecamatan')}
                className={`px-2 py-1 rounded font-mono text-[10px] flex items-center gap-1 transition-all ${
                  activeLayers.kecamatan ? 'bg-[#31353f] text-[#4edea3] font-semibold' : 'bg-[#1b2029] text-[#bbcabf]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {activeLayers.kecamatan ? 'check' : 'add'}
                </span>
                Batas Kecamatan
              </button>
              <button
                onClick={() => toggleLayer('tk')}
                className={`px-2 py-1 rounded font-mono text-[10px] flex items-center gap-1 transition-all ${
                  activeLayers.tk ? 'bg-[#31353f] text-[#4edea3] font-semibold' : 'bg-[#1b2029] text-[#bbcabf]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {activeLayers.tk ? 'check' : 'add'}
                </span>
                Titik Kumpul (TK)
              </button>
              <button
                onClick={() => toggleLayer('sentra')}
                className={`px-2 py-1 rounded font-mono text-[10px] flex items-center gap-1 transition-all ${
                  activeLayers.sentra ? 'bg-[#31353f] text-[#4edea3] font-semibold' : 'bg-[#1b2029] text-[#bbcabf]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {activeLayers.sentra ? 'check' : 'add'}
                </span>
                Sentra Holtikultura
              </button>
              <button
                onClick={() => toggleLayer('alt')}
                className={`px-2 py-1 rounded font-mono text-[10px] flex items-center gap-1 transition-all ${
                  activeLayers.alt ? 'bg-[#31353f] text-[#4edea3] font-semibold' : 'bg-[#1b2029] text-[#bbcabf]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {activeLayers.alt ? 'check' : 'add'}
                </span>
                Jalur Alternatif
              </button>
            </div>

            {/* Interactive Vector GIS Map Canvas */}
            <div className="relative w-full flex-1 bg-[#090d15] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="karo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#86948a" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#karo-grid)"></rect>
              </svg>

              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
                viewBox="0 0 800 680" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Elevation Contours */}
                <path d="M 120,240 C 200,180 320,190 390,260 C 460,330 410,480 320,520 C 230,560 140,500 110,410 Z" fill="none" stroke="#31353f" strokeDasharray="2 4" strokeWidth="1"></path>
                <path d="M 170,280 C 230,230 330,240 370,300 C 410,360 380,450 310,470 C 240,490 180,440 160,380 Z" fill="none" stroke="#31353f" strokeDasharray="2 4" strokeWidth="1"></path>
                <path d="M 460,80 C 540,60 620,110 650,170 C 680,230 640,320 560,340 C 480,360 430,290 420,200 Z" fill="none" stroke="#31353f" strokeDasharray="2 4" strokeWidth="1"></path>

                {/* Sentra Polygons */}
                {activeLayers.sentra && (
                  <>
                    <path d="M 430,220 L 520,210 L 560,280 L 480,320 Z" fill="#ffb95f" fillOpacity="0.12" stroke="#ffb95f" strokeWidth="1.2" strokeDasharray="3 3"></path>
                    <text x="490" y="270" fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="10" opacity="0.8">SENTRA WORTEL &amp; KUBIS</text>
                    <path d="M 240,310 L 340,300 L 370,390 L 260,420 Z" fill="#adc6ff" fillOpacity="0.12" stroke="#adc6ff" strokeWidth="1.2" strokeDasharray="3 3"></path>
                    <text x="255" y="365" fill="#adc6ff" fontFamily="JetBrains Mono" fontSize="10" opacity="0.8">SENTRA TOMAT &amp; KENTANG</text>
                  </>
                )}

                {/* K-01: Emerald Line */}
                <g className={`transition-all ${selectedCorridor === 'k01' ? 'opacity-100' : 'opacity-60'}`}>
                  <path d="M 520,240 Q 480,300 450,380 T 430,470" stroke="#10b981" strokeWidth="8" strokeLinecap="round" opacity="0.3"></path>
                  <path d="M 520,240 Q 480,300 450,380 T 430,470" stroke="#4edea3" strokeWidth="3.5" strokeLinecap="round"></path>
                </g>

                {/* K-02: Sapphire Line */}
                <g className={`transition-all ${selectedCorridor === 'k02' ? 'opacity-100' : 'opacity-60'}`}>
                  <path d="M 280,320 L 350,370 L 430,470" stroke="#0566d9" strokeWidth="8" strokeLinecap="round" opacity="0.3"></path>
                  <path d="M 280,320 L 350,370 L 430,470" stroke="#adc6ff" strokeWidth="3" strokeLinecap="round"></path>
                </g>

                {/* K-03: Amber Line */}
                <g className={`transition-all ${selectedCorridor === 'k03' ? 'opacity-100' : 'opacity-60'}`}>
                  <path d="M 430,470 L 540,490 L 630,550 L 710,610" stroke="#e29100" strokeWidth="8" strokeLinecap="round" opacity="0.3"></path>
                  <path d="M 430,470 L 540,490 L 630,550 L 710,610" stroke="#ffb95f" strokeWidth="3" strokeLinecap="round"></path>
                </g>

                {/* K-04: Purple Line */}
                <g className={`transition-all ${selectedCorridor === 'k04' ? 'opacity-100' : 'opacity-60'}`}>
                  <path d="M 520,240 L 600,290 L 580,390 L 540,490" stroke="#a855f7" strokeWidth="7" strokeLinecap="round" opacity="0.3"></path>
                  <path d="M 520,240 L 600,290 L 580,390 L 540,490" stroke="#d8b4fe" strokeWidth="2.5" strokeLinecap="round"></path>
                </g>

                {/* Outbound Lines */}
                <path d="M 520,240 L 590,110 L 670,40" stroke="#4edea3" strokeWidth="2" strokeDasharray="5 5" opacity="0.8"></path>
                <text x="615" y="65" fill="#4edea3" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600">KE PASAR INDUK LAU CIH MEDAN →</text>

                <path d="M 710,610 L 780,640" stroke="#ffb95f" strokeWidth="2" strokeDasharray="5 5" opacity="0.8"></path>
                <text x="640" y="650" fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600">JALUR LINTAS SUMATERA →</text>

                {/* Nodes */}
                {activeLayers.tk && (
                  <>
                    <g transform="translate(520, 240)">
                      <circle r="12" fill="#1b2029" stroke="#4edea3" strokeWidth="2"></circle>
                      <circle r="4" fill="#4edea3"></circle>
                      <text x="18" y="4" fill="#dfe2f0" fontFamily="Inter" fontSize="11" fontWeight="600">TK-01 Berastagi</text>
                      <text x="18" y="16" fill="#bbcabf" fontFamily="JetBrains Mono" fontSize="9">Kapasitas: 45 Ton/hari</text>
                    </g>

                    <g transform="translate(280, 320)">
                      <circle r="12" fill="#1b2029" stroke="#adc6ff" strokeWidth="2"></circle>
                      <circle r="4" fill="#adc6ff"></circle>
                      <text x="-120" y="4" fill="#dfe2f0" fontFamily="Inter" fontSize="11" fontWeight="600">TK-02 Simpang Empat</text>
                      <text x="-120" y="16" fill="#bbcabf" fontFamily="JetBrains Mono" fontSize="9">Sentra Sayur Sinabung</text>
                    </g>

                    <g transform="translate(540, 490)">
                      <circle r="12" fill="#1b2029" stroke="#ffb95f" strokeWidth="2"></circle>
                      <circle r="4" fill="#ffb95f"></circle>
                      <text x="18" y="4" fill="#dfe2f0" fontFamily="Inter" fontSize="11" fontWeight="600">TK-03 Tigapanah</text>
                      <text x="18" y="16" fill="#bbcabf" fontFamily="JetBrains Mono" fontSize="9">Pintu Koridor Merek</text>
                    </g>
                  </>
                )}

                {/* Central Kabanjahe */}
                <g transform="translate(430, 470)">
                  <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#0f131d" stroke="#dfe2f0" strokeWidth="2"></rect>
                  <circle r="3" fill="#4edea3"></circle>
                  <text x="-95" y="-12" fill="#dfe2f0" fontFamily="Inter" fontSize="11" fontWeight="700">KABANJAHE (PUSAT)</text>
                  <text x="-95" y="0" fill="#86948a" fontFamily="JetBrains Mono" fontSize="9">Titik Temu K-01, K-02, K-03</text>
                </g>

                {/* Volcano Landmarks */}
                <g opacity="0.6" transform="translate(260, 210)">
                  <path d="M 0,-6 L 8,8 L -8,8 Z" fill="none" stroke="#86948a" strokeWidth="1.5"></path>
                  <text x="12" y="5" fill="#bbcabf" fontFamily="JetBrains Mono" fontSize="10">GN. SINABUNG (2.460 m)</text>
                </g>
                <g opacity="0.6" transform="translate(490, 150)">
                  <path d="M 0,-6 L 8,8 L -8,8 Z" fill="none" stroke="#86948a" strokeWidth="1.5"></path>
                  <text x="12" y="5" fill="#bbcabf" fontFamily="JetBrains Mono" fontSize="10">GN. SIBAYAK (2.212 m)</text>
                </g>
              </svg>

              {/* Floating Map Zoom Controls */}
              <div className="absolute right-4 bottom-24 flex flex-col gap-1 z-20">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
                  className="w-8 h-8 rounded-lg bg-[#262a34]/90 text-[#dfe2f0] hover:bg-[#31353f] flex items-center justify-center shadow-md border border-[#31353f]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                  className="w-8 h-8 rounded-lg bg-[#262a34]/90 text-[#dfe2f0] hover:bg-[#31353f] flex items-center justify-center shadow-md border border-[#31353f]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="w-8 h-8 rounded-lg bg-[#262a34]/90 text-[#dfe2f0] hover:bg-[#31353f] flex items-center justify-center shadow-md mt-1 border border-[#31353f]"
                  title="Orientasi Utara"
                  type="button"
                >
                  <span className="font-mono text-xs font-bold text-[#4edea3]">N</span>
                </button>
              </div>

              {/* Bottom Corridor Legend Bar */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#0a0e17]/90 backdrop-blur-md border border-[#31353f] shadow-lg flex flex-wrap items-center justify-between gap-2 z-20">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setSelectedCorridor('k01')}>
                    <span className="w-3 h-1.5 rounded-full bg-[#4edea3] inline-block"></span>
                    <span className="font-mono text-xs text-[#dfe2f0]">K-01 Berastagi</span>
                  </div>
                  <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setSelectedCorridor('k02')}>
                    <span className="w-3 h-1.5 rounded-full bg-[#adc6ff] inline-block"></span>
                    <span className="font-mono text-xs text-[#dfe2f0]">K-02 Simpang Empat</span>
                  </div>
                  <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setSelectedCorridor('k03')}>
                    <span className="w-3 h-1.5 rounded-full bg-[#ffb95f] inline-block"></span>
                    <span className="font-mono text-xs text-[#dfe2f0]">K-03 Tigapanah-Merek</span>
                  </div>
                  <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setSelectedCorridor('k04')}>
                    <span className="w-3 h-1.5 rounded-full bg-[#d8b4fe] inline-block"></span>
                    <span className="font-mono text-xs text-[#dfe2f0]">K-04 Barusjahe</span>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#bbcabf] font-medium">
                  38 Ruas Terkoneksi • 4 Node Logistik
                </div>
              </div>
            </div>

            {/* Field Photo Snapshot */}
            <div className="p-2.5 bg-[#171c25] flex items-center justify-between gap-3 border-t border-[#1b2029]">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  className="w-12 h-10 object-cover rounded-md shrink-0 shadow-sm border border-[#31353f]"
                  alt="Monitoring visual Lau Gumba"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBstIOKe7806eNrxVGP4iZHwC1UilImtWkbDeIx0pDBC-w5jq3fKgACo-aGsURWwHR-0nu-l5umWDo3WRFolvyVb8ex_5ScTnryJVg3ky3vO-lsJd3ab0SycrF2nARL_iMFFLv2lLXW9VSkID4M1usWzUOf4K7TpNUN5gkZo9E14rZ-HvgmOOAcwbcw_Sc9c99D9Im-qsatvWZ3uxM7AsYNZtw0fcWZbps4bZwxM1fpD10MBSNzuYSAIQ"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#dfe2f0] truncate">
                    Verifikasi Visual Ruas: Lau Gumba - Merdeka
                  </span>
                  <span className="font-mono text-[10px] text-[#bbcabf] truncate">
                    Elevasi: 1.340 mdpl • Akses Truk Engkel 8 Ton
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowGeotagModal(true)}
                className="px-2.5 py-1 rounded bg-[#1b2029] text-[#4edea3] hover:bg-[#262a34] font-mono text-xs shrink-0 transition-all flex items-center gap-1 border border-[#31353f]"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">photo_camera</span> Foto Geotag
              </button>
            </div>
          </div>
        </div>

        {/* SISI KANAN (6 COLS): TABEL DAFTAR RUAS PER KORIDOR */}
        <div className="lg:col-span-6 flex flex-col gap-4 min-w-0">
          <div className="bg-[#0a0e17] rounded-xl shadow-lg border border-[#1b2029] flex flex-col h-[780px]">
            {/* Table Control Strip */}
            <div className="p-4 bg-[#171c25]/90 rounded-t-xl flex flex-col gap-3 border-b border-[#1b2029]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#dfe2f0]">Matriks Ruas Koridor</span>
                  <span className="px-2 py-0.5 rounded bg-[#e29100]/20 text-[#ffb95f] font-mono text-[10px] font-bold tracking-wider uppercase border border-[#e29100]/30">
                    DATA SIMULASI RUAS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('Mengekspor matriks koridor dalam format CSV/Excel terstruktur...')}
                    className="p-1.5 rounded-lg bg-[#1b2029] text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#262a34] transition-all border border-[#31353f]"
                    title="Ekspor Data Excel/CSV"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>
                  <button
                    onClick={() => setSearchFilter('')}
                    className="p-1.5 rounded-lg bg-[#1b2029] text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#262a34] transition-all border border-[#31353f]"
                    title="Segarkan Data"
                  >
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                  </button>
                </div>
              </div>

              {/* Selector and Inline Search */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1">
                <div className="sm:col-span-7 relative">
                  <label className="font-mono text-[10px] text-[#bbcabf] block mb-1">Pilih Koridor Aktif:</label>
                  <select
                    value={selectedCorridor}
                    onChange={(e) => setSelectedCorridor(e.target.value)}
                    className="w-full h-9 pl-3 pr-8 bg-[#0a0e17] rounded-lg text-[#dfe2f0] text-xs focus:outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#31353f] cursor-pointer"
                  >
                    <option value="k01">Koridor K-01: Berastagi – Simpang Empat – Merdeka (34,8 km)</option>
                    <option value="k02">Koridor K-02: Naman Teran – Simpang Empat – Kabanjahe (28,4 km)</option>
                    <option value="k03">Koridor K-03: Tigapanah – Merek – Perbatasan Dairi (42,1 km)</option>
                    <option value="k04">Koridor K-04: Barusjahe – Dolat Rayat – Medan Link (24,7 km)</option>
                  </select>
                </div>
                <div className="sm:col-span-5 relative">
                  <label className="font-mono text-[10px] text-[#bbcabf] block mb-1">Cari Ruas / Desa:</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#bbcabf] text-[16px]">search</span>
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="ID atau nama ruas..."
                      className="w-full h-9 pl-8 pr-3 bg-[#0a0e17] rounded-lg text-[#dfe2f0] placeholder-[#86948a] text-xs focus:outline-none focus:ring-1 focus:ring-[#4edea3] border border-[#31353f]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead className="sticky top-0 bg-[#262a34]/95 backdrop-blur-md z-10 text-[#bbcabf] font-mono text-[10px] uppercase tracking-wider border-b border-[#31353f]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Ruas ID</th>
                    <th className="py-2.5 px-3 font-semibold">Nama Ruas Jalan</th>
                    <th className="py-2.5 px-3 font-semibold">Kecamatan</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Panjang</th>
                    <th className="py-2.5 px-3 font-semibold">Sentra Komoditas</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Titik Kumpul</th>
                    <th className="py-2.5 px-3 font-semibold">Pasar Tujuan</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Alt. Rute</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b2029] text-xs">
                  {filteredRoads.map((road) => (
                    <tr
                      key={road.id}
                      onClick={() => setSelectedDetailRoad(road)}
                      className="hover:bg-[#171c25] transition-colors group cursor-pointer"
                    >
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#1b2029] text-[#4edea3] font-semibold border border-[#31353f]">
                          {road.id}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap font-medium text-[#dfe2f0] group-hover:text-[#4edea3] transition-colors">
                        {road.name}
                        <div className="font-mono text-[10px] text-[#86948a]">{road.sub}</div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-[#bbcabf]">{road.kecamatan}</td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-right font-mono text-xs text-[#dfe2f0]">
                        {road.lengthKm} km
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: road.commodityColor }}></span>
                          <span className="text-[#dfe2f0]">{road.commodities}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-center">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#262a34] text-[#dfe2f0]">
                          {road.tk}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-[#bbcabf]">{road.market}</td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-center">
                        {road.hasAlt ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#4edea3] font-mono text-[10px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span> Ya
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#93000a]/20 text-[#ffb4ab] font-mono text-[10px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span> Tidak Ada
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDetailRoad(road);
                            if (onSelectRoad) onSelectRoad(road.id);
                          }}
                          className="p-1 rounded hover:bg-[#262a34] text-[#bbcabf] hover:text-[#4edea3] transition-colors"
                          title="Buka Detail"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Summary Card */}
            <div className="p-3 bg-[#171c25] border-t border-[#1b2029] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[#bbcabf] uppercase">Total Ruas</span>
                  <span className="text-xs font-bold text-[#dfe2f0]">7 Ruas Aktif</span>
                </div>
                <div className="w-px h-7 bg-[#31353f]"></div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[#bbcabf] uppercase">Panjang Kumulatif</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#4edea3]">34,8 km</span>
                    <span className="px-1 py-0.2 rounded bg-[#0a0e17] text-[#ffb95f] font-mono text-[9px]">SIMULASI</span>
                  </div>
                </div>
                <div className="hidden xl:flex flex-col">
                  <span className="font-mono text-[10px] text-[#bbcabf] uppercase">Tanpa Alternatif</span>
                  <span className="text-xs font-bold text-[#ffb4ab]">3 Ruas Kritis</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setSearchFilter('')}
                  className="px-3 py-1.5 rounded-lg bg-[#1b2029] text-[#dfe2f0] hover:bg-[#262a34] text-xs transition-all border border-[#31353f]"
                  type="button"
                >
                  Atur Ulang
                </button>
                <button
                  onClick={handleSaveCorridor}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#4edea3] text-[#003824] font-semibold shadow-md hover:brightness-110 text-xs transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Simpan Penetapan Koridor</span>
                </button>
              </div>
            </div>

            {/* Pagination Strip */}
            <div className="px-4 py-2 bg-[#0a0e17] rounded-b-xl flex items-center justify-between text-[#bbcabf] font-mono text-[10px] border-t border-[#1b2029]">
              <span>Menampilkan 1-7 dari 7 ruas pada Koridor K-01</span>
              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded bg-[#31353f] text-[#4edea3] font-semibold">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Executive Analytical Dossier Strip */}
      <div className="px-6 pb-6">
        <div className="p-4 rounded-xl bg-[#171c25]/70 border border-[#1b2029] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1b2029] flex items-center justify-center text-[#adc6ff] shrink-0 border border-[#31353f]">
              <span className="material-symbols-outlined text-[28px]">hub</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#dfe2f0]">
                  Konektivitas Hulu-Hilir: Koridor Logistik Siap Diuji
                </span>
                <span className="px-2 py-0.5 rounded bg-[#31353f] text-[#4edea3] font-mono text-[10px] font-semibold">
                  Siap ke Modul 03
                </span>
              </div>
              <p className="text-xs text-[#bbcabf] max-w-2xl mt-0.5">
                Pengelompokan ruas ke dalam koridor ini akan menjadi unit agregasi pada Modul 03 (Penilaian Kondisi &amp; Kerentanan Bencana Sinabung) serta pembobotan kriteria MCDA pada Modul 04.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={() => onNavigate('01-inventarisasi')}
              className="px-3.5 py-2 rounded-lg bg-[#1b2029] text-[#dfe2f0] hover:bg-[#262a34] text-xs flex items-center gap-1.5 border border-[#31353f]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Kembali ke Modul 01</span>
            </button>
            <button
              onClick={() => onNavigate('03-risiko')}
              className="px-4 py-2 rounded-lg bg-[#10b981] text-[#002113] text-xs font-semibold shadow-md hover:brightness-110 flex items-center gap-1.5"
              type="button"
            >
              <span>Lanjut ke Modul 03</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Geotag Photo Modal */}
      {showGeotagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#171c25] rounded-xl max-w-lg w-full border border-[#31353f] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#31353f] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3]">photo_camera</span>
                <h3 className="font-bold text-[#dfe2f0] text-sm">Dokumentasi Geotag Ruas Lau Gumba – Merdeka</h3>
              </div>
              <button onClick={() => setShowGeotagModal(false)} className="text-[#bbcabf] hover:text-white">✕</button>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBstIOKe7806eNrxVGP4iZHwC1UilImtWkbDeIx0pDBC-w5jq3fKgACo-aGsURWwHR-0nu-l5umWDo3WRFolvyVb8ex_5ScTnryJVg3ky3vO-lsJd3ab0SycrF2nARL_iMFFLv2lLXW9VSkID4M1usWzUOf4K7TpNUN5gkZo9E14rZ-HvgmOOAcwbcw_Sc9c99D9Im-qsatvWZ3uxM7AsYNZtw0fcWZbps4bZwxM1fpD10MBSNzuYSAIQ"
              alt="Geotag Road"
              className="w-full h-56 object-cover rounded-lg border border-[#31353f]"
            />
            <div className="grid grid-cols-2 gap-2 font-mono text-xs text-[#bbcabf] bg-[#0a0e17] p-3 rounded-lg border border-[#1b2029]">
              <div>Latitude: <span className="text-[#dfe2f0]">3.1942° N</span></div>
              <div>Longitude: <span className="text-[#dfe2f0]">98.5147° E</span></div>
              <div>Elevasi: <span className="text-[#dfe2f0]">1.340 mdpl</span></div>
              <div>Waktu Rekam: <span className="text-[#4edea3]">18 Jan 2025 09:14 WIB</span></div>
            </div>
            <p className="text-xs text-[#bbcabf]">
              Foto terverifikasi oleh Tim Survei DPUTR &amp; Bappeda. Jalur aman dilewati truk colt diesel 8 Ton muatan wortel.
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowGeotagModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#4edea3] text-[#003824] text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Road Detail Modal if clicked */}
      {selectedDetailRoad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#171c25] rounded-xl max-w-md w-full border border-[#31353f] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#31353f] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#31353f] text-[#4edea3] font-bold">
                  {selectedDetailRoad.id}
                </span>
                <h3 className="font-bold text-[#dfe2f0] text-sm truncate">{selectedDetailRoad.name}</h3>
              </div>
              <button onClick={() => setSelectedDetailRoad(null)} className="text-[#bbcabf] hover:text-white">✕</button>
            </div>
            <div className="space-y-2 text-xs text-[#bbcabf]">
              <div><strong className="text-[#dfe2f0]">Kecamatan:</strong> {selectedDetailRoad.kecamatan}</div>
              <div><strong className="text-[#dfe2f0]">Panjang:</strong> {selectedDetailRoad.lengthKm} km</div>
              <div><strong className="text-[#dfe2f0]">Kondisi:</strong> {selectedDetailRoad.sub}</div>
              <div><strong className="text-[#dfe2f0]">Komoditas Utama:</strong> {selectedDetailRoad.commodities}</div>
              <div><strong className="text-[#dfe2f0]">Titik Kumpul:</strong> {selectedDetailRoad.tk} ({selectedDetailRoad.market})</div>
              <div><strong className="text-[#dfe2f0]">Jalur Alternatif:</strong> {selectedDetailRoad.hasAlt ? 'Tersedia' : 'Kritis (Tidak Ada Jalur Lain)'}</div>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#31353f]">
              <button
                onClick={() => {
                  setSelectedDetailRoad(null);
                  onNavigate('04-mcda');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#262a34] text-[#adc6ff] text-xs font-semibold hover:bg-[#31353f]"
              >
                Buka di Modul 04 (MCDA)
              </button>
              <button
                onClick={() => setSelectedDetailRoad(null)}
                className="px-4 py-1.5 rounded-lg bg-[#4edea3] text-[#003824] text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Toast notification */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#10b981] text-[#002113] shadow-2xl flex items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-[24px]">check_circle</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Penetapan Koridor Disimpan</span>
            <span className="text-xs">38 Ruas berhasil diagregasikan ke dalam 4 koridor logistik Karo.</span>
          </div>
        </div>
      )}
    </div>
  );
};
