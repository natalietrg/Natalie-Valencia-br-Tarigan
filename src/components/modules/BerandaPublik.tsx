import React, { useState } from 'react';
import { NavigationTab, RoadSegment } from '../../types';
import { INITIAL_ROADS, CORRIDORS_DATA } from '../../data/mockData';

interface BerandaPublikProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectRoad?: (roadId: string) => void;
}

export const BerandaPublik: React.FC<BerandaPublikProps> = ({ onNavigate, onSelectRoad }) => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>('K-01');
  const [selectedFilterKecamatan, setSelectedFilterKecamatan] = useState<string>('ALL');
  const [searchTableQuery, setSearchTableQuery] = useState<string>('');
  const [expandedRoadId, setExpandedRoadId] = useState<string | null>('KRO-018');
  const [budgetSimMultiplier, setBudgetSimMultiplier] = useState<number>(100);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Citizen complaint form state
  const [aspirasiForm, setAspirasiForm] = useState({
    nama: '',
    kontak: '',
    desa: '',
    ruas: '',
    kendala: 'Jalan Rusak Berat / Amblas',
    catatan: '',
  });
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const selectedCorridor = CORRIDORS_DATA.find((c) => c.code === selectedCorridorId || c.id === selectedCorridorId) || CORRIDORS_DATA[0];

  const filteredRoads = INITIAL_ROADS.filter((r) => {
    const matchSearch =
      r.id.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
      r.kecamatan.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
      r.commodities.toLowerCase().includes(searchTableQuery.toLowerCase());
    
    if (selectedFilterKecamatan === 'ALL') return matchSearch;
    return matchSearch && r.kecamatan === selectedFilterKecamatan;
  });

  const faqs = [
    {
      q: 'Apa itu Sistem Penilaian Jalan Produksi Pertanian (SPJPP) Kabupaten Karo?',
      a: 'SPJPP Karo adalah sistem pengambilan keputusan objektif berbasis data spasial dan multikriteria (AHP-TOPSIS). Sistem ini memastikan penanganan jalan pertanian di Kabupaten Karo didasarkan pada volume riil komoditas pangan, kondisi kerusakan fisik, dan konektivitas pasar, bebas dari campur tangan subjektif atau intervensi politis non-data.'
    },
    {
      q: 'Bagaimana jika jalan sentra tani di desa saya belum masuk ke dalam Daftar 10 Prioritas?',
      a: 'Jalan yang belum masuk Top 10 Prioritas tetap tercatat dalam basis data inventarisasi DPUTR (Kelas Prioritas II, III, atau IV). Warga atau kelompok tani dapat menyampaikan pembaruan data potensi panen dan dokumentasi foto kondisi jalan melalui formulir aspirasi publik di halaman ini untuk diverifikasi pada survei berkala.'
    },
    {
      q: 'Dari mana Pemerintah Kabupaten Karo memperoleh data komoditas pertanian?',
      a: 'Data produksi bersumber dari rekonsiliasi resmi Badan Pusat Statistik (BPS) Kabupaten Karo, Dinas Pertanian Kabupaten Karo, serta data titik kumpul kelompok tani desa. Angka produksi 3 komoditas unggulan (wortel, kubis, tomat) mencapai lebih dari 5,26 juta kuintal per tahun.'
    },
    {
      q: 'Apakah urutan daftar prioritas ini dapat diubah sewaktu-waktu oleh pejabat daerah?',
      a: 'Tidak bisa. Sesuai amanat SK Bupati Karo No. 600.1/142/DPUTR/2025, daftar prioritas mengikat dokumen RKPD dan Renja DPUTR. Perubahan hanya diperbolehkan apabila terjadi bencana alam luar biasa (force majeure) yang disahkan melalui Berita Acara Tripartit (DPUTR, BPBD, Bappeda) dan dicatat dalam Buku Ledger Audit Kriptografis yang terbuka untuk publik.'
    },
    {
      q: 'Bagaimana peran masyarakat dalam mengawasi pelaksanaan di lapangan?',
      a: 'Masyarakat dapat memantau dokumen legalitas (SK Bupati), nilai indeks transparansi, dan tahapan tender. Jika ditemukan kontraktor bekerja tidak sesuai spesifikasi, warga dapat mengunggah bukti geotag langsung ke Inspektorat Karo melalui kanal Whistleblowing System (WBS).'
    }
  ];

  const handleAspirasiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aspirasiForm.nama || !aspirasiForm.desa) {
      alert('Mohon lengkapi nama dan desa lokasi jalan.');
      return;
    }
    const randomTicket = `TIKET-KARO-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket(randomTicket);
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* INSTITUTIONAL HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="h-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">SPJPP Karo</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                Portal Transparansi Jalan Produksi Pertanian
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-600">
            <a href="#beranda" className="px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">
              Beranda
            </a>
            <a href="#peta-koridor" className="px-3.5 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors">
              Peta Koridor
            </a>
            <a href="#top-10" className="px-3.5 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors">
              Daftar 10 Prioritas
            </a>
            <a href="#cara-kerja" className="px-3.5 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors">
              Cara Kerja
            </a>
            <a href="#aspirasi" className="px-3.5 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors">
              Aspirasi Warga
            </a>
            <a href="#faq" className="px-3.5 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('01-inventarisasi')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              <span>Buka Command Center DPUTR</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* HERO SECTION */}
        <section id="beranda" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-8 pb-12">
          <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute left-1/3 -bottom-24 w-80 h-80 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl flex flex-col items-start gap-4">
              {/* Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  TRANSPARANSI KEPUTUSAN INFRASTRUKTUR DAERAH • KABUPATEN KARO
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Prioritas Jalan Produksi Pertanian Kabupaten Karo —{' '}
                <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-4">
                  terbuka, berbasis data,
                </span>{' '}
                dapat dipertanggungjawabkan.
              </h1>

              {/* Subheading */}
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Pemerintah Kabupaten Karo membuka metodologi multikriteria objektif dalam penentuan prioritas penanganan jalan sentra komoditas hortikultura (wortel, kubis, tomat, kentang) demi memotong biaya logistik petani dan menjamin keadilan pembangunan.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#peta-koridor"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">map</span>
                  <span>Jelajahi Peta Koridor Interaktif</span>
                </a>
                <a
                  href="#top-10"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
                  <span>Lihat Top 10 Prioritas 2025</span>
                </a>
              </div>
            </div>

            {/* 4 Prominent Civic KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-100">
              {/* Card 1 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 relative overflow-hidden flex flex-col justify-between">
                <div className="w-full h-1 bg-emerald-600 absolute top-0 left-0"></div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Kondisi Mantap 2024
                    </span>
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">timeline</span>
                  </div>
                  <div className="font-mono text-3xl font-bold text-slate-900">63,43%</div>
                </div>
                <p className="text-xs text-slate-600 mt-3 pt-2 border-t border-slate-200">
                  Target Renstra <span className="font-semibold text-slate-900">66,00%</span> • Selisih 2,57% diprioritaskan lewat koridor pangan.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 relative overflow-hidden flex flex-col justify-between">
                <div className="w-full h-1 bg-emerald-600 absolute top-0 left-0"></div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Produksi 3 Komoditas 2025
                    </span>
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">agriculture</span>
                  </div>
                  <div className="font-mono text-3xl font-bold text-slate-900">5,26 Jt Kuintal</div>
                </div>
                <p className="text-xs text-slate-600 mt-3 pt-2 border-t border-slate-200">
                  BPS resmi: Wortel 1,88 jt, Tomat 1,72 jt, Kubis 1,64 jt kuintal/tahun.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 relative overflow-hidden flex flex-col justify-between">
                <div className="w-full h-1 bg-slate-700 absolute top-0 left-0"></div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Luas Panen Terlayani
                    </span>
                    <span className="material-symbols-outlined text-slate-700 text-[20px]">terrain</span>
                  </div>
                  <div className="font-mono text-3xl font-bold text-slate-900">21.321 Ha</div>
                </div>
                <p className="text-xs text-slate-600 mt-3 pt-2 border-t border-slate-200">
                  Konsentrasi di Sentra Dataran Tinggi Sinabung–Sibayak & Kabanjahe.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 relative overflow-hidden flex flex-col justify-between">
                <div className="w-full h-1 bg-slate-700 absolute top-0 left-0"></div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Realisasi Inpres Jalan 2025
                    </span>
                    <span className="material-symbols-outlined text-slate-700 text-[20px]">account_balance_wallet</span>
                  </div>
                  <div className="font-mono text-3xl font-bold text-slate-900">Rp 10,67 Triliun</div>
                </div>
                <p className="text-xs text-slate-600 mt-3 pt-2 border-t border-slate-200">
                  Kebutuhan total Rp1.100 T; alokasi berbasis data objektif non-politis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MAP OF PRIORITY CORRIDORS SECTION */}
        <section id="peta-koridor" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                <span className="material-symbols-outlined text-[20px]">hub</span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Visualisasi Geospasial Multi-Agro
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Peta Publik Koridor Prioritas Pertanian Karo
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 font-mono text-xs text-slate-600 font-medium">
              Pembaruan: Maret 2025 (Lintas Instansi)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* SVG Vector Map Canvas */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between relative overflow-hidden min-h-[500px]">
              {/* Map controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 z-10 pb-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  {CORRIDORS_DATA.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCorridorId(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCorridorId === c.id
                          ? 'bg-emerald-700 text-white font-bold shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {c.id} • {c.name.split('–')[0]}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Koridor Pangan Aktif</span>
                </div>
              </div>

              {/* Interactive SVG Diagram */}
              <div className="relative w-full h-[380px] my-4 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                <svg className="w-full h-full" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="bgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f0fdf4" />
                      <stop offset="100%" stopColor="#f8fafc" />
                    </linearGradient>
                  </defs>
                  <rect width="800" height="480" fill="url(#bgGlow)" />

                  {/* Topography contours */}
                  <path d="M 50 120 Q 200 80, 450 140 T 750 90" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
                  <path d="M 80 240 Q 250 190, 500 260 T 780 210" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
                  <path d="M 40 360 Q 300 320, 550 390 T 760 340" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />

                  {/* Gunung Sinabung & Sibayak */}
                  <g transform="translate(180, 140)">
                    <polygon points="0,0 -40,70 40,70" fill="#cbd5e1" opacity="0.6" />
                    <text x="0" y="88" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">G. Sinabung (2.460 m)</text>
                    <circle cx="0" cy="15" r="4" fill="#ef4444" className="animate-ping" opacity="0.75" />
                    <circle cx="0" cy="15" r="3" fill="#dc2626" />
                  </g>

                  <g transform="translate(560, 100)">
                    <polygon points="0,0 -35,60 35,60" fill="#cbd5e1" opacity="0.6" />
                    <text x="0" y="78" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">G. Sibayak (2.212 m)</text>
                  </g>

                  {/* Koridor Paths */}
                  {/* K-01 Berastagi – Simpang Empat – Merdeka */}
                  <path
                    d="M 280 200 L 400 170 L 520 220"
                    fill="none"
                    stroke={selectedCorridorId === 'K-01' ? '#047857' : '#94a3b8'}
                    strokeWidth={selectedCorridorId === 'K-01' ? 8 : 4}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all hover:stroke-emerald-600"
                    onClick={() => setSelectedCorridorId('K-01')}
                  />

                  {/* K-02 Simpang Empat – Naman Teran – Payung */}
                  <path
                    d="M 280 200 L 220 270 L 160 320"
                    fill="none"
                    stroke={selectedCorridorId === 'K-02' ? '#047857' : '#94a3b8'}
                    strokeWidth={selectedCorridorId === 'K-02' ? 8 : 4}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all hover:stroke-emerald-600"
                    onClick={() => setSelectedCorridorId('K-02')}
                  />

                  {/* K-03 Tigapanah – Merek – Dolat Rayat */}
                  <path
                    d="M 520 220 L 590 280 L 680 340"
                    fill="none"
                    stroke={selectedCorridorId === 'K-03' ? '#047857' : '#94a3b8'}
                    strokeWidth={selectedCorridorId === 'K-03' ? 8 : 4}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all hover:stroke-emerald-600"
                    onClick={() => setSelectedCorridorId('K-03')}
                  />

                  {/* K-04 Barusjahe – Tigapanah – Berastagi */}
                  <path
                    d="M 520 220 L 470 300 L 410 360"
                    fill="none"
                    stroke={selectedCorridorId === 'K-04' ? '#047857' : '#94a3b8'}
                    strokeWidth={selectedCorridorId === 'K-04' ? 8 : 4}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all hover:stroke-emerald-600"
                    onClick={() => setSelectedCorridorId('K-04')}
                  />

                  {/* Major Hub Nodes */}
                  <g transform="translate(280, 200)" className="cursor-pointer" onClick={() => setSelectedCorridorId('K-01')}>
                    <circle cx="0" cy="0" r="10" fill="#047857" stroke="#ffffff" strokeWidth="3" />
                    <text x="0" y="-14" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="700">Simpang Empat</text>
                  </g>

                  <g transform="translate(400, 170)" className="cursor-pointer" onClick={() => setSelectedCorridorId('K-01')}>
                    <circle cx="0" cy="0" r="8" fill="#047857" stroke="#ffffff" strokeWidth="2.5" />
                    <text x="0" y="-12" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">Merdeka</text>
                  </g>

                  <g transform="translate(520, 220)" className="cursor-pointer" onClick={() => setSelectedCorridorId('K-01')}>
                    <circle cx="0" cy="0" r="12" fill="#065f46" stroke="#ffffff" strokeWidth="3.5" />
                    <text x="0" y="-16" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="800">Berastagi Hub</text>
                  </g>

                  <g transform="translate(160, 320)" className="cursor-pointer" onClick={() => setSelectedCorridorId('K-02')}>
                    <circle cx="0" cy="0" r="8" fill="#d97706" stroke="#ffffff" strokeWidth="2.5" />
                    <text x="0" y="18" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">Payung (Zona KRB)</text>
                  </g>

                  <g transform="translate(680, 340)" className="cursor-pointer" onClick={() => setSelectedCorridorId('K-03')}>
                    <circle cx="0" cy="0" r="9" fill="#047857" stroke="#ffffff" strokeWidth="2.5" />
                    <text x="0" y="20" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">Merek / Danau Toba</text>
                  </g>

                  <g transform="translate(410, 360)" className="cursor-pointer" onClick={() => setSelectedCorridorId('K-04')}>
                    <circle cx="0" cy="0" r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
                    <text x="0" y="18" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">Barusjahe</text>
                  </g>
                </svg>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-700">
                  Koordinat Pusat: 3.125° N, 98.487° E • Elevasi 1.200 - 1.450 mdpl
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono pt-3 border-t border-slate-100">
                <span>Sumber Data: Shapefile GIS DPUTR Karo 2025</span>
                <span>Proyeksi: WGS 84 / UTM Zone 47N</span>
              </div>
            </div>

            {/* Live Corridor Dossier Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-mono text-xs font-bold uppercase">
                    {selectedCorridor.code} • {selectedCorridor.priorityBadge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    {selectedCorridor.roadIds.length} Ruas Kunci
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                  {selectedCorridor.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {selectedCorridor.description}
                </p>

                {/* Corridor Metrics */}
                <div className="grid grid-cols-2 gap-3 my-5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block">Total Panjang</span>
                    <span className="font-mono text-lg font-bold text-slate-900">{selectedCorridor.totalLengthKm} km</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block">Volume Komoditas</span>
                    <span className="font-mono text-lg font-bold text-emerald-700">
                      {selectedCorridor.dailyTonnage}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block">Tingkat Kerusakan</span>
                    <span className="font-mono text-lg font-bold text-amber-600">
                      {selectedCorridor.damageRate}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block">Poin MCDA</span>
                    <span className="font-mono text-lg font-bold text-slate-900">
                      {selectedCorridor.mcdaPoints}
                    </span>
                  </div>
                </div>

                {/* Interactive Budget Simulation Slider */}
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-950 font-mono">Simulasi Alokasi Anggaran Koridor:</span>
                    <span className="font-mono font-bold text-emerald-700">{budgetSimMultiplier}% Pagu</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    step="10"
                    value={budgetSimMultiplier}
                    onChange={(e) => setBudgetSimMultiplier(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                    <span>Estimasi Kemantapan Pasca-Intervensi:</span>
                    <span className="font-bold text-emerald-800">
                      {Math.min(96, Math.round(58 * (budgetSimMultiplier / 100)))}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 mt-4">
                <button
                  onClick={() => onNavigate('02-koridor')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Buka Peta Teknis di Modul 02</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* TOP 10 PRIORITAS SECTION */}
        <section id="top-10" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  SK BUPATI KARO NO. 600.1/142/2025
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  Daftar 10 Ruas Jalan Prioritas Tertinggi Penanganan 2025
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  Hasil komputasi objektif multikriteria AHP-TOPSIS. Seluruh ruas mengikat alokasi pagu Inpres Jalan Daerah dan APBD Kabupaten Karo TA 2025.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={selectedFilterKecamatan}
                  onChange={(e) => setSelectedFilterKecamatan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-600"
                >
                  <option value="ALL">Semua Kecamatan (17)</option>
                  <option value="Simpang Empat">Simpang Empat</option>
                  <option value="Merdeka">Merdeka</option>
                  <option value="Berastagi">Berastagi</option>
                  <option value="Tigapanah">Tigapanah</option>
                  <option value="Naman Teran">Naman Teran</option>
                  <option value="Barusjahe">Barusjahe</option>
                </select>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">search</span>
                  <input
                    type="text"
                    value={searchTableQuery}
                    onChange={(e) => setSearchTableQuery(e.target.value)}
                    placeholder="Cari ruas atau komoditas..."
                    className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Priority Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4 text-center">Peringkat</th>
                    <th className="py-3 px-4">Kode &amp; Nama Ruas Jalan</th>
                    <th className="py-3 px-4">Kecamatan</th>
                    <th className="py-3 px-4">Panjang</th>
                    <th className="py-3 px-4">Komoditas Utama</th>
                    <th className="py-3 px-4 text-right">Skor Indeks (I)</th>
                    <th className="py-3 px-4 text-center">Status Kebijakan</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredRoads.map((road) => {
                    const isExpanded = expandedRoadId === road.id;
                    return (
                      <React.Fragment key={road.id}>
                        <tr
                          onClick={() => setExpandedRoadId(isExpanded ? null : road.id)}
                          className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                            isExpanded ? 'bg-emerald-50/40' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-mono text-xs font-bold ${
                                road.rank === 1
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : road.rank <= 3
                                  ? 'bg-emerald-100 text-emerald-800 font-bold'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {road.rank}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{road.name}</div>
                            <span className="font-mono text-[11px] text-emerald-700 font-semibold">{road.id}</span>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600 font-medium">{road.kecamatan}</td>

                          <td className="py-3.5 px-4 font-mono text-slate-700">{road.lengthKm} km</td>

                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1">
                              {road.commodities.split(',').map((c, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]"
                                >
                                  {c.trim()}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                            {road.mcdaScore.toFixed(4)}
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                road.rkpdStatus.includes('Disetujui') || road.rkpdStatus.includes('Masuk')
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {road.rkpdStatus}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedRoadId(isExpanded ? null : road.id);
                              }}
                              className="text-slate-400 hover:text-emerald-700 p-1"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {isExpanded ? 'expand_less' : 'expand_more'}
                              </span>
                            </button>
                          </td>
                        </tr>

                        {/* Expandable row with field photo and economic impact */}
                        {isExpanded && (
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <td colSpan={8} className="p-4 md:p-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 rounded-xl border border-slate-200">
                                <div className="space-y-2">
                                  <span className="font-mono text-xs uppercase font-bold text-slate-500 block">
                                    Dokumentasi Kondisi Lapangan
                                  </span>
                                  <div className="relative rounded-lg overflow-hidden border border-slate-200">
                                    <img
                                      src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&auto=format&fit=crop&q=80"
                                      alt={road.name}
                                      className="w-full h-36 object-cover"
                                    />
                                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                                      PCI: {road.pciScore} • {road.conditionDescription}
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <span className="font-mono text-xs uppercase font-bold text-slate-500 block">
                                    Parameter Teknis &amp; Pertanian
                                  </span>
                                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
                                    <div className="flex justify-between">
                                      <span>Produksi Tahunan:</span>
                                      <span className="font-mono font-bold text-slate-900">{road.tonnageYear}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Perkerasan:</span>
                                      <span className="font-mono font-bold text-slate-900">{road.subgradeCondition}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Prioritas:</span>
                                      <span className="font-mono font-bold text-emerald-700">{road.priorityClass}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Pasar Tujuan:</span>
                                      <span className="font-bold text-slate-900">{road.targetMarket}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2 flex flex-col justify-between">
                                  <div>
                                    <span className="font-mono text-xs uppercase font-bold text-slate-500 block mb-1">
                                      Dampak Penanganan Terhadap Petani
                                    </span>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                      {road.justification}
                                    </p>
                                  </div>

                                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <button
                                      onClick={() => {
                                        if (onSelectRoad) onSelectRoad(road.id);
                                        onNavigate('01-inventarisasi');
                                      }}
                                      className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                                    >
                                      <span>Lihat Geospasial Command Center</span>
                                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5-TAHAP CARA KERJA SECTION */}
        <section id="cara-kerja" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                METODOLOGI ILMIAH &amp; TERBUKA
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Bagaimana Keputusan Prioritas Jalan Dihasilkan?
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Lima tahap terpadu yang memadukan survei fisik lapangan, pemodelan spasial agribisnis, serta algoritma multikriteria tanpa campur tangan politis subjektif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: 'Inventarisasi Geospasial',
                  desc: 'Perekaman koordinat GPS, survei kondisi perkerasan jalan (PCI), serta pendokumentasian drone udara.',
                  icon: 'share_location',
                },
                {
                  step: '02',
                  title: 'Pemetaan Klaster Agro',
                  desc: 'Overlay peta produksi wortel, kubis, tomat BPS Karo dengan titik kumpul dan pasar induk tujuan.',
                  icon: 'hub',
                },
                {
                  step: '03',
                  title: 'Penilaian Risiko Bencana',
                  desc: 'Analisis kerawanan lereng longsor dan radius KRB Gunung Sinabung tanpa perhitungan ganda.',
                  icon: 'landslide',
                },
                {
                  step: '04',
                  title: 'Pemeringkatan MCDA',
                  desc: 'Perhitungan matematis bobot AHP dan perangkingan TOPSIS dengan uji sensitivitas bobot terbuka.',
                  icon: 'calculate',
                },
                {
                  step: '05',
                  title: 'Pengesahan SK & Audit',
                  desc: 'Penguncian ke SK Bupati Karo, integrasi RKPD, dan pelaporan jejak audit SHA-256 yang transparan.',
                  icon: 'verified',
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 flex flex-col justify-between hover:border-emerald-500 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xl font-bold text-emerald-700">{s.step}</span>
                      <span className="material-symbols-outlined text-emerald-700 text-[24px]">{s.icon}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CITIZEN ASPIRASI & PENGADUAN SECTION */}
        <section id="aspirasi" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="bg-emerald-900 text-white rounded-2xl shadow-xl p-6 md:p-10 relative overflow-hidden">
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-emerald-700/40 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-widest block mb-1">
                  PARTISIPASI PUBLIK &amp; PENGAWASAN LAPANGAN
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Formulir Aspirasi &amp; Pengaduan Jalan Pertanian
                </h2>
                <p className="text-sm text-emerald-100 mt-2 max-w-2xl mx-auto">
                  Laporkan kondisi jalan tani rusak atau perbarui estimasi panen desa Anda. Laporan akan diverifikasi langsung oleh tim pengawas DPUTR Kabupaten Karo.
                </p>
              </div>

              {submittedTicket ? (
                <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-xl text-center space-y-4 max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[36px]">check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold">Laporan Berhasil Diterima</h3>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm text-slate-800">
                    Nomor Tiket: <span className="font-bold text-emerald-700">{submittedTicket}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Terima kasih atas partisipasi Anda. Laporan ini telah diteruskan ke Seksi Pemeliharaan Jalan DPUTR Karo untuk dijadwalkan verifikasi fisik lapangan.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setAspirasiForm({ nama: '', kontak: '', desa: '', ruas: '', kendala: 'Jalan Rusak Berat / Amblas', catatan: '' });
                    }}
                    className="px-6 py-2.5 bg-emerald-700 text-white font-semibold text-xs rounded-xl hover:bg-emerald-800"
                  >
                    Kirim Laporan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAspirasiSubmit} className="bg-white text-slate-900 p-6 md:p-8 rounded-2xl shadow-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                        Nama Lengkap / Kelompok Tani *
                      </label>
                      <input
                        type="text"
                        required
                        value={aspirasiForm.nama}
                        onChange={(e) => setAspirasiForm({ ...aspirasiForm, nama: e.target.value })}
                        placeholder="Contoh: Kelompok Tani Arih Ersada"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                        Nomor WhatsApp / Kontak Aktif *
                      </label>
                      <input
                        type="text"
                        required
                        value={aspirasiForm.kontak}
                        onChange={(e) => setAspirasiForm({ ...aspirasiForm, kontak: e.target.value })}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                        Desa &amp; Kecamatan Lokasi *
                      </label>
                      <input
                        type="text"
                        required
                        value={aspirasiForm.desa}
                        onChange={(e) => setAspirasiForm({ ...aspirasiForm, desa: e.target.value })}
                        placeholder="Contoh: Desa Beganding, Kec. Simpang Empat"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                        Jenis Kendala Jalan
                      </label>
                      <select
                        value={aspirasiForm.kendala}
                        onChange={(e) => setAspirasiForm({ ...aspirasiForm, kendala: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      >
                        <option>Jalan Rusak Berat / Amblas</option>
                        <option>Jembatan / Gorong-gorong Putus</option>
                        <option>Longsor Tebing Menutupi Badan Jalan</option>
                        <option>Pembaruan Data Potensi Panen Hortikultura</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                      Keterangan Tambahan / Rincian Lokasi
                    </label>
                    <textarea
                      rows={3}
                      value={aspirasiForm.catatan}
                      onChange={(e) => setAspirasiForm({ ...aspirasiForm, catatan: e.target.value })}
                      placeholder="Jelaskan jenis komoditas yang terdampak (misal wortel 50 ton tertahan tidak bisa lewat truk), patokan lokasi terdekat..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-[11px] text-slate-500 font-mono">
                      * Data dilindungi UU Keterbukaan Informasi Publik (KIP)
                    </span>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Kirim Laporan Resmi</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL FAQ SECTION */}
        <section id="faq" className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 mb-12">
          <div className="text-center mb-8">
            <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              INFORMASI &amp; KLARIFIKASI
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-emerald-700"
                  >
                    <span className="text-sm md:text-base">{faq.q}</span>
                    <span className="material-symbols-outlined text-slate-400 shrink-0">
                      {isOpen ? 'remove' : 'add'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">SPJPP Kabupaten Karo</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Sistem Penilaian dan Perencanaan Prioritas Jalan Produksi Pertanian Berbasis Data Geo-Spasial dan Transparansi Anggaran. Diselenggarakan bersama oleh Dinas PUTR, Bappeda Litbang, Dinas Pertanian, dan Inspektorat Kabupaten Karo.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              Jalan Veteran No. 2, Kabanjahe, Kabupaten Karo, Sumatera Utara 22111
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-white font-bold uppercase tracking-wider block">Tautan Cepat</span>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#beranda" className="hover:text-white">Beranda Publik</a></li>
              <li><a href="#peta-koridor" className="hover:text-white">Peta Koridor Hortikultura</a></li>
              <li><a href="#top-10" className="hover:text-white">Daftar 10 Prioritas SK Bupati</a></li>
              <li><a href="#cara-kerja" className="hover:text-white">Metodologi MCDA AHP-TOPSIS</a></li>
              <li><button onClick={() => onNavigate('01-inventarisasi')} className="hover:text-emerald-400">Command Center DPUTR</button></li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-mono text-white font-bold uppercase tracking-wider block">Dasar Hukum &amp; Standar</span>
            <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <li>SK Bupati Karo No. 600.1/142/2025</li>
              <li>Inpres Jalan Daerah No. 3/2023</li>
              <li>Permendagri No. 70/2019 (SIPD)</li>
              <li>Sertifikasi BSSN SHA-256 Ledger</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>© 2025 Pemerintah Kabupaten Karo. Hak Cipta Dilindungi Undang-Undang.</div>
          <div className="font-mono text-[11px] mt-2 sm:mt-0">SPJPP Core Engine v2.4 • March 2025 Release</div>
        </div>
      </footer>
    </div>
  );
};
