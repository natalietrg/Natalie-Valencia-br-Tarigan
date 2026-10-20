import React, { useState } from 'react';
import { NavigationTab } from '../../types';

interface Module05Props {
  onNavigate: (tab: NavigationTab) => void;
}

export const Module05Penetapan: React.FC<Module05Props> = ({ onNavigate }) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handlePublish = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleDownloadSK = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('Dokumen Lampiran SK Penetapan Prioritas No. 600/SK/2025 telah diunduh (PDF resmi).');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Action & Title Banner */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#4edea3] uppercase tracking-widest font-semibold">
              SPJPP Command Engine • Fase Finalisasi Kebijakan
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#dfe2f0] tracking-tight">
            MODUL 05 • PENETAPAN, SK BUPATI &amp; PEMANTAUAN HASIL
          </h1>
          <p className="text-sm text-[#bbcabf] leading-relaxed">
            Transparansi Penetapan Kebijakan, Integrasi RKPD, dan Pelacakan Dampak Nyata Sebelum-Sesudah Penanganan
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadSK}
            disabled={isDownloading}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#adc6ff] text-xs font-semibold border border-[#31353f] transition-all shadow-md"
            type="button"
          >
            <span className={`material-symbols-outlined text-[18px] text-[#adc6ff] ${isDownloading ? 'animate-spin' : ''}`}>
              {isDownloading ? 'progress_activity' : 'download'}
            </span>
            <span>{isDownloading ? 'Membuat Dokumen SK...' : 'Unduh Dokumen Alasan (PDF SK Bupati)'}</span>
          </button>
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10b981] text-[#002113] text-xs font-bold tracking-tight shadow-xl hover:brightness-110 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">public</span>
            <span>Publikasikan ke Beranda Publik</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#171c25] border border-[#4edea3] shadow-2xl flex items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-[#4edea3] text-[24px]">verified</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#dfe2f0]">Status Berhasil Disinkronkan</span>
            <span className="text-xs text-[#bbcabf]">
              Daftar prioritas dipublikasikan ke Portal Keterbukaan Publik Karo.
            </span>
          </div>
          <button
            onClick={() => onNavigate('beranda-publik')}
            className="ml-3 px-2.5 py-1 rounded bg-[#4edea3] text-[#003824] text-xs font-bold"
          >
            Lihat Publik
          </button>
        </div>
      )}

      {/* 1. STATUS STEPPER ALUR PENETAPAN BIROKRASI TERSTRUKTUR */}
      <div className="bg-[#1b2029] rounded-xl p-6 shadow-xl border border-[#31353f] relative overflow-hidden">
        <div className="absolute -top-12 right-1/4 w-96 h-28 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[24px]">account_tree</span>
            <h2 className="text-base font-bold text-[#dfe2f0]">Alur Legalisasi &amp; Penetapan Birokrasi Terstruktur</h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#adc6ff] px-2.5 py-1 rounded bg-[#0566d9]/20 border border-[#0566d9]/30">
            TA 2025 • TAHAP 4 AKTIF
          </span>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Step 1 */}
          <div className="flex flex-col p-4 rounded-lg bg-[#171c25] border border-[#1b2029] shadow-sm hover:border-[#31353f] transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="w-7 h-7 rounded-full bg-[#10b981] text-[#002113] flex items-center justify-center font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-semibold">Selesai</span>
            </div>
            <span className="text-xs font-semibold text-[#dfe2f0] mb-0.5">01 Draf Teknis DPUTR</span>
            <span className="text-[11px] text-[#bbcabf]">12 Jan 2025</span>
            <span className="mt-2 font-mono text-[10px] text-[#86948a]">Kompilasi 48 Ruas Agribisnis</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col p-4 rounded-lg bg-[#171c25] border border-[#1b2029] shadow-sm hover:border-[#31353f] transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="w-7 h-7 rounded-full bg-[#10b981] text-[#002113] flex items-center justify-center font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-semibold">Selesai</span>
            </div>
            <span className="text-xs font-semibold text-[#dfe2f0] mb-0.5">02 Verifikasi BPBD &amp; Distan</span>
            <span className="text-[11px] text-[#bbcabf]">24 Jan 2025</span>
            <span className="mt-2 font-mono text-[10px] text-[#86948a]">Validasi Ancaman Vulkanik</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col p-4 rounded-lg bg-[#171c25] border border-[#1b2029] shadow-sm hover:border-[#31353f] transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="w-7 h-7 rounded-full bg-[#10b981] text-[#002113] flex items-center justify-center font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-semibold">Selesai</span>
            </div>
            <span className="text-xs font-semibold text-[#dfe2f0] mb-0.5">03 Forum Musrenbang</span>
            <span className="text-[11px] text-[#bbcabf]">08 Feb 2025</span>
            <span className="mt-2 font-mono text-[10px] text-[#86948a]">Konsensus Antar Pemangku</span>
          </div>

          {/* Step 4: Active */}
          <div className="flex flex-col p-4 rounded-lg bg-[#4edea3]/10 border-2 border-[#4edea3] shadow-lg relative transform lg:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="w-7 h-7 rounded-full bg-[#4edea3] text-[#003824] flex items-center justify-center font-mono text-xs font-bold shadow-[0_0_12px_rgba(78,222,163,0.6)]">
                04
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#4edea3] text-[#003824] font-bold animate-pulse">
                Aktif
              </span>
            </div>
            <span className="text-xs font-bold text-[#4edea3] mb-0.5">04 SK Penetapan Bupati</span>
            <span className="font-mono text-[11px] text-[#dfe2f0] font-semibold">Draf No. 600/SK/2025</span>
            <span className="mt-2 font-mono text-[10px] text-[#bbcabf]">Paraf Akhir Bag. Hukum</span>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col p-4 rounded-lg bg-[#171c25]/60 border border-[#1b2029] shadow-sm opacity-75">
            <div className="flex items-center justify-between mb-2">
              <span className="w-7 h-7 rounded-full bg-[#262a34] text-[#bbcabf] flex items-center justify-center font-mono text-xs font-bold">
                05
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#31353f] text-[#bbcabf]">Tahap Lanjut</span>
            </div>
            <span className="text-xs font-semibold text-[#bbcabf] mb-0.5">05 RKPD &amp; Inpres Jalan</span>
            <span className="text-[11px] text-[#86948a]">Estimasi Maret 2025</span>
            <span className="mt-2 font-mono text-[10px] text-[#86948a]">SIPD Penatausahaan</span>
          </div>
        </div>
      </div>

      {/* 2. TABEL DAFTAR PRIORITAS RESMI & ALASAN KEPUTUSAN */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-[#dfe2f0]">Daftar Prioritas Definitif &amp; Alasan Keputusan</h2>
            <span className="px-2 py-0.5 rounded bg-[#e29100]/20 text-[#ffb95f] font-mono text-[10px] font-bold tracking-wider border border-[#e29100]/30">
              DATA SIMULASI RUAS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#bbcabf]">Total Terpilih:</span>
            <span className="font-mono text-xs font-bold text-[#4edea3] px-2 py-0.5 rounded bg-[#262a34] border border-[#31353f]">
              3 Koridor Strategis Utama
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl bg-[#1b2029] border border-[#31353f] shadow-xl no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#171c25] text-[#bbcabf] font-mono text-[10px] uppercase tracking-wider border-b border-[#31353f]">
                <th className="py-3 px-4 text-center w-12">No</th>
                <th className="py-3 px-4 w-56">ID &amp; Nama Ruas</th>
                <th className="py-3 px-4 w-40">Koridor</th>
                <th className="py-3 px-4">Alasan Utama Peringkat (Justifikasi Objektif)</th>
                <th className="py-3 px-4 w-48">Sumber Data Acuan</th>
                <th className="py-3 px-4 w-40 text-center">Status Usulan RKPD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#31353f]/40 text-xs">
              {/* Row 1: KRO-018 */}
              <tr className="hover:bg-[#262a34]/60 transition-colors">
                <td className="py-4 px-4 text-center font-mono text-xs text-[#86948a]">01</td>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-[#4edea3]">KRO-018</span>
                    <span className="font-semibold text-sm text-[#dfe2f0]">Sukamandi – Guru Benua</span>
                    <span className="text-xs text-[#bbcabf]">Kec. Munte • 4,82 km</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-[#0566d9]/20 text-[#adc6ff] font-mono text-[10px] font-semibold border border-[#0566d9]/30">
                    Koridor Barat Laut
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-[#dfe2f0] leading-relaxed text-xs">
                    Kritis akses sentra <strong className="text-white font-semibold">1.700 ton tomat</strong>; tidak ada jalan alternatif evakuasi jika erupsi atau longsor lahar Sinabung mengisolasi lingkar luar.
                  </p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-0.5 font-mono text-[10px]">
                    <span className="text-[#dfe2f0]">BPS Karo 2025</span>
                    <span className="text-[#86948a]">+ Survei Kondisi DPUTR</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/20 text-[#4edea3] font-mono text-[10px] font-bold border border-[#4edea3]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                    RKPD Prioritas I
                  </span>
                </td>
              </tr>

              {/* Row 2: KRO-042 */}
              <tr className="hover:bg-[#262a34]/60 transition-colors">
                <td className="py-4 px-4 text-center font-mono text-xs text-[#86948a]">02</td>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-[#4edea3]">KRO-042</span>
                    <span className="font-semibold text-sm text-[#dfe2f0]">Simpang Ujung Teran – Ndeskati</span>
                    <span className="text-xs text-[#bbcabf]">Kec. Naman Teran • 6,10 km</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-[#0566d9]/20 text-[#adc6ff] font-mono text-[10px] font-semibold border border-[#0566d9]/30">
                    Koridor Dataran Tinggi
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-[#dfe2f0] leading-relaxed text-xs">
                    Jalur utama <strong className="text-white font-semibold">1,88 juta kuintal wortel</strong> menuju Pasar Induk Roga; kondisi rusak sedang dengan kemiringan curam 14% rentan terputus saat curah hujan tinggi.
                  </p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-0.5 font-mono text-[10px]">
                    <span className="text-[#dfe2f0]">Distan Karo 2024</span>
                    <span className="text-[#86948a]">+ Geospasial Bappeda</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/20 text-[#4edea3] font-mono text-[10px] font-bold border border-[#4edea3]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                    RKPD Prioritas I
                  </span>
                </td>
              </tr>

              {/* Row 3: KRO-007 */}
              <tr className="hover:bg-[#262a34]/60 transition-colors">
                <td className="py-4 px-4 text-center font-mono text-xs text-[#86948a]">03</td>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-[#4edea3]">KRO-007</span>
                    <span className="font-semibold text-sm text-[#dfe2f0]">Tigapanah – Sukamaju</span>
                    <span className="text-xs text-[#bbcabf]">Kec. Tigapanah • 3,45 km</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-[#0566d9]/20 text-[#adc6ff] font-mono text-[10px] font-semibold border border-[#0566d9]/30">
                    Koridor Timur Trans-Karo
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-[#dfe2f0] leading-relaxed text-xs">
                    Konektivitas kantong kemiskinan perdesaan Tigapanah ke sentra kubis dan kol ekspor; mengatasi hambatan angkut tengkulak lokal yang menekan margin petani kecil.
                  </p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-0.5 font-mono text-[10px]">
                    <span className="text-[#dfe2f0]">Data Kemiskinan 6,66% BPS</span>
                    <span className="text-[#86948a]">+ P3KE Kemenko PMK</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e29100]/20 text-[#ffb95f] font-mono text-[10px] font-bold border border-[#e29100]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span>
                    Inpres Usulan Tambahan
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. KARTU PERBANDINGAN SEBELUM–SESUDAH PENANGANAN */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Metrics Column (7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#4edea3]/30">
                EVALUASI EMPIRIS
              </span>
              <span className="font-mono text-xs text-[#86948a]">KORIDOR PERCONTOHAN 2024–2025</span>
            </div>
            <h2 className="text-xl font-bold text-[#dfe2f0]">
              Pengukuran Dampak Pilot Koridor Berastagi
            </h2>
            <span className="text-xs text-[#adc6ff] font-medium">
              (DATA TERUKUR DI PILOT — Tanpa Baseline Buatan)
            </span>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1: Kondisi Jalan Mantap */}
            <div className="p-4 rounded-xl bg-[#1b2029] border border-[#31353f] shadow-lg flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase font-semibold">Kondisi Mantap (IRI)</span>
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">timeline</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between text-[#dfe2f0]">
                  <span className="font-mono text-[10px] text-[#86948a]">Sebelum: 54,2%</span>
                  <span className="text-2xl font-bold text-[#4edea3]">89,6%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#0a0e17] overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-[#86948a]/40" style={{ width: '54.2%' }}></div>
                  <div className="absolute top-0 left-0 h-full bg-[#4edea3]" style={{ width: '89.6%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] pt-1 border-t border-[#31353f]">
                <span className="text-[#bbcabf]">Kenaikan Mutu</span>
                <span className="text-[#4edea3] font-bold">+35,4%</span>
              </div>
            </div>

            {/* Metric 2: Waktu Tempuh */}
            <div className="p-4 rounded-xl bg-[#1b2029] border border-[#31353f] shadow-lg flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase font-semibold">Ke Pasar Roga</span>
                <span className="material-symbols-outlined text-[#adc6ff] text-[20px]">speed</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between text-[#dfe2f0]">
                  <span className="font-mono text-[10px] text-[#86948a]">Sebelum: 65 mnt</span>
                  <span className="text-2xl font-bold text-[#adc6ff]">28 mnt</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#0a0e17] overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-[#adc6ff]" style={{ width: '43%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] pt-1 border-t border-[#31353f]">
                <span className="text-[#bbcabf]">Efisiensi Rute</span>
                <span className="text-[#adc6ff] font-bold">Pangkas 57%</span>
              </div>
            </div>

            {/* Metric 3: Biaya Angkut */}
            <div className="p-4 rounded-xl bg-[#1b2029] border border-[#31353f] shadow-lg flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase font-semibold">Biaya Angkut / Ton</span>
                <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">savings</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between text-[#dfe2f0]">
                  <span className="font-mono text-[10px] text-[#86948a]">Rp185rb</span>
                  <span className="text-2xl font-bold text-[#ffb95f]">Rp115rb</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#0a0e17] overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-[#ffb95f]" style={{ width: '62.2%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] pt-1 border-t border-[#31353f]">
                <span className="text-[#bbcabf]">Penghematan</span>
                <span className="text-[#ffb95f] font-bold">Hemat 37,8%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#171c25] border border-[#1b2029] text-xs text-[#bbcabf]">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px] shrink-0">verified_user</span>
            <span>
              <strong className="text-[#dfe2f0]">Catatan Validasi Lapangan:</strong> Diuji langsung pada 12 truk pengangkut komoditas hortikultura (wortel, kol, kentang) pasca-rehabilitasi perkerasan aspal dingin &amp; drainase lereng.
            </span>
          </div>
        </div>

        {/* Spatial Visual Context (5 cols) */}
        <div className="xl:col-span-5 flex flex-col gap-3 bg-[#1b2029] border border-[#31353f] rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#adc6ff] text-[20px]">map</span>
              <span className="text-xs font-semibold text-[#dfe2f0]">Lokasi Pemantauan Koridor Berastagi</span>
            </div>
            <span className="font-mono text-[10px] text-[#4edea3]">GPS Active Tracker</span>
          </div>
          <div
            className="w-full h-44 rounded-lg bg-cover bg-center shadow-inner relative flex items-end p-3 border border-[#31353f]"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZVgsAsXV6AZXSfhc-kU906q3H9yPqH-QpBOv6SzLGoNlRpsIECGJWOqQijLDB9xDik6ylN1clbdawkYz4XZhPyVmTDulVrFmYAdqPb6844as2oJDzpizCh4fRDY2706dTSPuIganaqexKhblt2MSApR7Y7GMU_9t5CKa4U-Au_8nvvXx7E3dMXMsQ68UUWa8WQPiamhKlqp6RLDOIvwOMh0BCX-FwjIKUihV9EF-QVUHbT11B-uFCIQ')`,
            }}
          >
            <div className="p-2 rounded bg-[#0a0e17]/85 backdrop-blur-md flex items-center gap-2 border border-[#31353f]">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
              <span className="font-mono text-xs text-[#dfe2f0]">Ruas Uji: Berastagi – Simpang Ujung Teran (STA 0+000 s/d 4+200)</span>
            </div>
          </div>

          {/* Formal Doc Preview */}
          <div className="p-3 rounded-lg bg-white text-slate-900 shadow-md flex items-center justify-between border border-slate-300">
            <div className="flex items-center gap-3 min-w-0">
              <span className="material-symbols-outlined text-slate-700 text-[26px] shrink-0">description</span>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-xs font-bold text-slate-900 truncate">
                  DOKUMEN ANALISIS PRIORITAS (SK BUPATI)
                </span>
                <span className="text-xs text-slate-600 truncate">No. Lembaran Daerah: LD-KR/2025/082</span>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold shrink-0 border border-slate-300">
              Terverifikasi
            </span>
          </div>
        </div>
      </div>

      {/* 4. PENGECEK PENGECUALIAN & JEJAK PERUBAHAN */}
      <div className="flex flex-col gap-4 bg-[#1b2029] border border-[#31353f] rounded-xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#31353f]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ffb95f] text-[24px]">history_edu</span>
            <div>
              <h2 className="text-base font-semibold text-[#dfe2f0]">
                Pengecek Pengecualian &amp; Jejak Perubahan Keputusan (Audit Trail)
              </h2>
              <span className="text-xs text-[#bbcabf]">
                Log rekaman autentik perubahan parameter prioritas dan justifikasi teknis Bappeda
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('log-audit')}
            className="flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded bg-[#262a34] text-[#4edea3] hover:bg-[#31353f] transition-colors border border-[#31353f]"
          >
            <span>Buka Buku Induk Audit</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Vertical Audit Timeline */}
        <div className="flex flex-col gap-4 pt-1 relative">
          <div className="flex flex-col sm:flex-row items-start gap-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#0566d9] text-[#e6ecff] flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[#adc6ff]">08 Feb 2025 • 14:30 WIB</span>
                <span className="px-2 py-0.5 rounded bg-[#adc6ff]/10 text-[#adc6ff] font-mono text-[10px]">
                  Penyesuaian Manual Peringkat
                </span>
              </div>
              <p className="text-xs text-[#dfe2f0] leading-relaxed">
                Penyesuaian usulan pada <strong className="text-[#4edea3] font-semibold">Ruas KRO-031</strong> dari Prioritas II ke I oleh <strong className="text-white font-semibold">Tim Teknis Bappeda</strong> karena faktor kerawanan pangan musiman dan ancaman gagal panen komoditas cabai merah.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-[#86948a]">
                <span className="material-symbols-outlined text-[14px]">attachment</span>
                <span>Disertai Lampiran Berita Acara BA/BAPPEDA/09/II/2025 (Ditandatangani Kepala Bappeda)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#10b981] text-[#002113] flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-[#171c25] border border-[#1b2029] flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[#4edea3]">02 Feb 2025 • 10:15 WIB</span>
                <span className="px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-mono text-[10px]">
                  Kunci Matriks MCDA
                </span>
              </div>
              <p className="text-xs text-[#dfe2f0] leading-relaxed">
                Penguncian matriks bobot MCDA skenario dasar disetujui bersama oleh Bappeda, DPUTR, dan BPBD. Bobot produktivitas pangan disepakati sebesar 40%, konektivitas sentra 30%, dan mitigasi kebencanaan Sinabung 30%.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-[#86948a]">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>Konsensus Tripartit Nomor: 020/MCDA-AGRO/2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legal */}
      <div className="p-4 rounded-xl bg-[#0a0e17] border border-[#1b2029] flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3] border border-[#4edea3]/20">
            <span className="material-symbols-outlined text-[24px]">gavel</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#dfe2f0]">Legalitas Keputusan Terjamin</span>
            <span className="text-xs text-[#bbcabf]">
              Sesuai Permendagri No. 86/2017 tentang Tata Cara Perencanaan, Pengendalian dan Evaluasi Pembangunan Daerah.
            </span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-[#86948a]">Karo Command Center v2.4.0</span>
      </div>
    </div>
  );
};
