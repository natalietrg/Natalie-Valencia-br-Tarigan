import React, { useState } from 'react';
import { NavigationTab } from '../../types';

interface RoadmapProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const RoadmapAturanMain: React.FC<RoadmapProps> = ({ onNavigate }) => {
  const [activePhase, setActivePhase] = useState<number>(2);
  const [simulationTriggered, setSimulationTriggered] = useState<boolean>(false);
  const [simulatedRuasName, setSimulatedRuasName] = useState<string>('Jalan Usaha Tani Desa X (Aspirasi Non-Data)');
  const [showDiktumModal, setShowDiktumModal] = useState<boolean>(false);

  const phases = [
    {
      id: 1,
      tag: 'FASE 1 • PERSIAPAN & REGULASI',
      period: 'Q4 2026 – Q2 2027',
      title: 'Landasan Regulasi & Standardisasi Data Geospasial',
      status: 'SELESAI (100%)',
      statusColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      description: 'Penyusunan Peraturan Bupati, integrasi peta GIS komoditas hortikultura BPS Karo, dan penguncian baseline bobot AHP bersama Tim Anggaran Pemerintah Daerah (TAPD).',
      milestones: [
        { label: 'Penerbitan Perbup Pedoman Pemeringkatan Jalan Pertanian', done: true },
        { label: 'Integrasi Data Produksi Hortikultura BPS Karo (5,26 Juta Kuintal)', done: true },
        { label: 'Penyelarasan Kamus Ruas Jalan Kab. Karo dengan Kode SK DPUTR', done: true },
        { label: 'Validasi Formula Bobot AHP Non-Double Counting bersama Akademisi', done: true },
      ]
    },
    {
      id: 2,
      tag: 'FASE 2 • PILOT IMPLEMENTASI',
      period: 'Q1 2027 – Q4 2027',
      title: 'Pilot Koridor Sentra Berastagi – Simpang Empat',
      status: 'SEDANG BERJALAN (75%)',
      statusColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      description: 'Uji coba lapangan pada Koridor 1 & 2 mencakup 10 ruas prioritas utama, audit lapangan gabungan DPUTR-BPBD, serta uji transparansi portal publik.',
      milestones: [
        { label: 'Survei Lapangan Terpadu PCI & Kerawanan Longsor Sinabung', done: true },
        { label: 'Kalkulasi Multi-Kriteria AHP-TOPSIS untuk 4 Koridor Sentra Hortikultura', done: true },
        { label: 'Penetapan Draf SK Bupati Daftar Prioritas Penanganan Tahun 2027', done: true },
        { label: 'Peluncuran Portal Transparansi Publik Berbasis Peta Interaktif', done: false },
      ]
    },
    {
      id: 3,
      tag: 'FASE 3 • EKSPANSI & INTEGRASI SIPD',
      period: 'Q1 2028 – Q4 2028',
      title: 'Replikasi Penuh 17 Kecamatan & Penguncian RKPD',
      status: 'DIRENCANAKAN',
      statusColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      description: 'Menghubungkan sistem SPJPP langsung ke Sistem Informasi Pembangunan Daerah (SIPD RI Kemendagri) agar usulan non-prioritas otomatis tertolak dari Musrenbang.',
      milestones: [
        { label: 'Ekspansi inventarisasi ruas ke wilayah Karo Selatan & Liang Melas', done: false },
        { label: 'API Gateway ke SIPD RI untuk pagu alokasi DAK & Inpres Jalan Daerah', done: false },
        { label: 'Pelatihan 17 Operator Kecamatan & verifikator Bappeda', done: false },
        { label: 'Pemberian penghargaan desa proaktif data jalan agribisnis', done: false },
      ]
    },
    {
      id: 4,
      tag: 'FASE 4 • MONITORING & ADAPTASI IKLIM',
      period: 'Q1 2029 – Q4 2029',
      title: 'Pemantauan Dampak Sosial-Ekonomi & AI Predictive',
      status: 'TAHAP MASA DEPAN',
      statusColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      description: 'Pengukuran sebelum-sesudah terhadap susut pasca panen dan inflasi pangan, didukung sensor cuaca otomatis dan pemeliharaan prediktif berbasis citra satelit.',
      milestones: [
        { label: 'Survei Dampak Ekonomi Rumah Tangga Petani Hortikultura Terlayani', done: false },
        { label: 'Model AI Prediksi Penurunan Kualitas Perkerasan Jalan', done: false },
        { label: 'Evaluasi 5 Tahunan Perda Rencana Tata Ruang Wilayah (RTRW)', done: false },
      ]
    }
  ];

  return (
    <div className="px-4 lg:px-8 py-6 space-y-8 max-w-7xl mx-auto w-full">
      {/* Breadcrumbs & Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-slate-400">
            <button onClick={() => onNavigate('01-inventarisasi')} className="text-emerald-400 hover:underline">
              SPJPP COMMAND CENTER
            </button>
            <span>&gt;</span>
            <span className="text-slate-300">STRATEGI &amp; GOVERNANCE</span>
            <span>&gt;</span>
            <span className="text-emerald-400 font-bold">ROADMAP v2.4</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight">
            Panduan Roadmap dan Aturan Main Tata Kelola
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Kerangka operasional multi-tahun, protokol algoritma anti-bias, dan sinkronisasi tujuan pembangunan berkelanjutan untuk modernisasi koridor jalan produksi pangan Kabupaten Karo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-xs text-slate-200 font-medium uppercase tracking-wider">
              TAHAP AKTIF: Q1-Q3 2027
            </span>
          </div>
          <button
            onClick={() => setShowDiktumModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">gavel</span>
            <span>Verifikasi Diktum SK</span>
          </button>
        </div>
      </section>

      {/* GANTT-STYLE ROADMAP TIMELINE */}
      <section className="rounded-xl bg-slate-900 border border-slate-800 shadow-xl p-6 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[22px]">calendar_month</span>
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
              Lini Masa Roadmap SPJPP Karo (2026 – 2029)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Pilih fase untuk melihat target deliverable dan status kepatuhan
          </span>
        </div>

        {/* Phase selector tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {phases.map((ph) => {
            const isSelected = activePhase === ph.id;
            return (
              <button
                key={ph.id}
                onClick={() => setActivePhase(ph.id)}
                className={`p-4 rounded-xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] text-slate-400">{ph.period}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${ph.statusColor}`}>
                    {ph.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{ph.title}</h4>
                <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: ph.id === 1 ? '100%' : ph.id === 2 ? '75%' : ph.id === 3 ? '15%' : '0%'
                    }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active phase details card */}
        {(() => {
          const current = phases.find((p) => p.id === activePhase) || phases[1];
          return (
            <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {current.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">• Periode: {current.period}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{current.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{current.description}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Instansi Penanggung Jawab: Bappeda, DPUTR, Dinas Pertanian</span>
                  <button
                    onClick={() => onNavigate('05-penetapan')}
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Tinjau Implementasi di Modul 05</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Milestones checklist */}
              <div className="w-full md:w-80 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
                <span className="font-mono text-xs uppercase font-bold text-amber-400 flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                  Milestone Capaian Kunci
                </span>
                <div className="space-y-2 text-xs">
                  {current.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className={`material-symbols-outlined text-[18px] shrink-0 ${m.done ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {m.done ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <span className={m.done ? 'text-slate-200' : 'text-slate-500'}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4 Pilar Aturan Main Tata Kelola */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-400 text-[22px]">balance</span>
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
            4 Pilar Aturan Main Tata Kelola (Institutional Integrity Framework)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pilar 1 */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  PILAR 1 • INTEGRITAS DATA
                </span>
                <span className="material-symbols-outlined text-rose-400 text-[20px]">block</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">
                Larangan Intervensi Politis &amp; Prinsip Non-Double Counting
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Penetapan jalan dilarang memasukkan ruas yang tidak memiliki data volume komoditas terverifikasi. Tidak diperkenankan menghitung ganda kriteria (misal memisahkan kubis dan kol ke bobot terpisah) untuk mencegah pembobotan subyektif yang menguntungkan konstituen tertentu.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-500 flex justify-between">
              <span>Sanksi: Diskualifikasi otomatis dari daftar usulan</span>
              <span className="text-emerald-400 font-bold">Terkunci Algoritma</span>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PILAR 2 • TRANSPARANSI
                </span>
                <span className="material-symbols-outlined text-emerald-400 text-[20px]">visibility</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">
                Formula Bobot AHP-TOPSIS Terbuka &amp; Teruji Sensitivitas
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Seluruh matriks perbandingan berpasangan (bobot AHP) dan matriks normalisasi TOPSIS dipublikasikan secara terbuka di portal publik. Setiap perubahan skenario bobot wajib melalui uji sensitivitas untuk membuktikan ketahanan urutan prioritas terhadap fluktuasi minor.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-500 flex justify-between">
              <span>CR Matriks: &lt; 0.10 (Konsistensi Terjamin)</span>
              <button onClick={() => onNavigate('04-mcda')} className="text-emerald-400 hover:underline">
                Uji Skenario &gt;
              </button>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  PILAR 3 • VERIFIKASI MULTI-PIHAK
                </span>
                <span className="material-symbols-outlined text-blue-400 text-[20px]">groups</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">
                Pemeriksaan Silang Multi-Instansi (Triple-Check Protocol)
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Data teknis jalan diverifikasi tim DPUTR, peta kerawanan longsor dan KRB Gunung Sinabung divalidasi BPBD, dan baseline produksi pertanian disahkan Dinas Pertanian dan BPS. Tidak ada instansi tunggal yang memiliki kendali mutlak atas seluruh parameter.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-500 flex justify-between">
              <span>Konsensus: Tanda tangan digital 3 instansi</span>
              <span className="text-blue-400">Terintegrasi</span>
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PILAR 4 • KEPASTIAN HUKUM
                </span>
                <span className="material-symbols-outlined text-amber-400 text-[20px]">account_balance</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">
                Keterikatan Anggaran &amp; Legitimasi SK Bupati
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Daftar Top 10 Prioritas yang disahkan melalui Surat Keputusan Bupati mengikat langsung Rencana Kerja Pemerintah Daerah (RKPD) dan Rencana Kerja (Renja) DPUTR, menutup celah pengalihan anggaran siluman di tengah tahun berjalan tanpa persetujuan DPRD dan revisi draf terbuka.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-500 flex justify-between">
              <span>Dasar Hukum: SK Bupati No. 600.1/142/2025</span>
              <button onClick={() => onNavigate('05-penetapan')} className="text-amber-400 hover:underline">
                Buka Draf SK &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Anti-Bias Conflict of Interest Simulator */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-400 text-[22px]">shield</span>
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
              Simulator Penolakan Intervensi Non-Objektif (Anti-Bias Sandbox)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Uji apa yang terjadi jika ada usulan intervensi sepihak tanpa data
          </span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Simulasi Usulan Ruas Titipan Tanpa Riwayat Data Pertanian:
            </label>
            <input
              type="text"
              value={simulatedRuasName}
              onChange={(e) => setSimulatedRuasName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>
          <button
            onClick={() => setSimulationTriggered(true)}
            className="w-full lg:w-auto px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            <span>Uji Penegakan Sistem Integritas</span>
          </button>
        </div>

        {simulationTriggered && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 animate-fadeIn space-y-3">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-rose-400 text-[28px] shrink-0">report_problem</span>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wider">
                  PERINGATAN SISTEM: INTERVENSI DITOLAK PROTOKOL PILAR 1
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ruas <span className="text-rose-300 font-semibold font-mono">"{simulatedRuasName}"</span> tidak memenuhi syarat kelayakan data:
                </p>
                <ul className="text-xs text-slate-400 list-disc list-inside space-y-0.5">
                  <li>Data Potensi Panen Hortikultura: <span className="text-rose-400 font-mono">0 Kuintal/Tahun (Tidak Terdaftar di BPS Karo)</span></li>
                  <li>Skor Kondisi Fisik PCI: <span className="text-rose-400 font-mono">Tidak Ada Berita Acara Survei DPUTR</span></li>
                  <li>Tingkat Kerawanan Longsor: <span className="text-rose-400 font-mono">Tanpa Verifikasi Geospasial BPBD</span></li>
                </ul>
                <div className="pt-2 text-[11px] font-mono text-amber-300">
                  Tindakan: Upaya pemaksaan perubahan skor akan otomatis mengunci insiden ke Ledger Log Audit Kriptografis (#AUD-2025-ALERT) dan memberitahukan Inspektorat Daerah.
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => onNavigate('log-audit')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono hover:bg-slate-700"
              >
                Lihat Log Audit Terkunci &gt;
              </button>
              <button
                onClick={() => setSimulationTriggered(false)}
                className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold"
              >
                Reset Simulasi
              </button>
            </div>
          </div>
        )}
      </section>

      {/* SDG Alignment Matrix */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">eco</span>
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono">
            Keterikatan dengan Tujuan Pembangunan Berkelanjutan (SDGs / TPB)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-sm font-mono">
                SDG 2
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Tanpa Kelaparan</h4>
                <span className="text-[10px] text-slate-400 font-mono">Target 2.3 &amp; 2.c</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Memastikan hasil panen wortel, tomat, dan kubis petani Karo tidak busuk di jalan, menjaga pasokan pangan nasional dan stabilisasi harga di pasar induk Medan &amp; Jakarta.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/30 flex items-center justify-center font-bold text-sm font-mono">
                SDG 9
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Inovasi Infrastruktur</h4>
                <span className="text-[10px] text-slate-400 font-mono">Target 9.1 &amp; 9.4</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pembangunan jalan perkerasan lentur dan rabat beton tahan gempa/longsor di kawasan vulkanik Sinabung dengan efisiensi alokasi anggaran berbasis digital.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center font-bold text-sm font-mono">
                SDG 10
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Kurangi Kesenjangan</h4>
                <span className="text-[10px] text-slate-400 font-mono">Target 10.2</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Memprioritaskan kantong kemiskinan perdesaan di Simpang Empat dan Tigapanah agar petani kecil memiliki akses pasar yang adil tanpa terhalang biaya angkut tinggi.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-sm font-mono">
                SDG 12
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Produksi Bertanggung Jawab</h4>
                <span className="text-[10px] text-slate-400 font-mono">Target 12.3</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Memangkas susut pasca panen komoditas hortikultura yang rentan benturan mekanis hingga 40% melalui perbaikan permukaan jalan yang mulus.
            </p>
          </div>
        </div>
      </section>

      {/* Diktum SK Verification Modal */}
      {showDiktumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[24px]">gavel</span>
                <span className="font-bold text-base text-slate-100">
                  Diktum Kunci SK Bupati Karo No. 600.1/142/DPUTR/2025
                </span>
              </div>
              <button onClick={() => setShowDiktumModal(false)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-[350px] overflow-y-auto font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">KESATU:</span>
                Menetapkan Daftar Prioritas Penanganan Jalan Produksi Pertanian Kabupaten Karo berdasarkan hasil pemeringkatan multikriteria objektif AHP-TOPSIS.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">KEDUA:</span>
                Hasil pemeringkatan sebagaimana dimaksud Diktum KESATU bersifat mengikat dan wajib menjadi acuan mutlak dalam penyusunan Rencana Kerja (Renja) DPUTR dan RKPD.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">KETIGA:</span>
                Setiap perubahan atas urutan daftar prioritas akibat kondisi tanggap darurat bencana hanya sah apabila disertai Berita Acara resmi serta dicatat pada Buku Ledger Audit Kriptografis SPJPP.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">KEEMPAT:</span>
                Keputusan ini mulai berlaku pada tanggal ditetapkan dengan ketentuan apabila terdapat kekeliruan akan diperbaiki sesuai mekanisme verifikasi data terbuka.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">Status: Ditandatangani secara digital oleh Bupati Karo</span>
              <button
                onClick={() => setShowDiktumModal(false)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
