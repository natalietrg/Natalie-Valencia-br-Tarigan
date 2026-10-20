import React, { useState } from 'react';
import { NavigationTab, AuditLogItem } from '../../types';
import { AUDIT_LOGS, INITIAL_ROADS } from '../../data/mockData';

interface LogAuditProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectRoad?: (roadId: string) => void;
}

export const LogAudit: React.FC<LogAuditProps> = ({ onNavigate, onSelectRoad }) => {
  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number>(0);
  const [expandedLogId, setExpandedLogId] = useState<string | null>('AUD-2025-001');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [activePhoto, setActivePhoto] = useState<{ url: string; title: string; coords: string; inspector: string; time: string } | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const blocks = [
    { height: 41829, hash: '9942a7...e10a', prevHash: '73c1d9...f098', txCount: 14, timestamp: '14 Feb 2025 16:45', status: 'VALIDATED' },
    { height: 41828, hash: '73c1d9...f098', prevHash: '5e8b22...aa41', txCount: 28, timestamp: '10 Feb 2025 09:30', status: 'VALIDATED' },
    { height: 41827, hash: '5e8b22...aa41', prevHash: '1a0f98...d34e', txCount: 19, timestamp: '28 Jan 2025 14:15', status: 'VALIDATED' },
    { height: 41826, hash: '1a0f98...d34e', prevHash: '0c7741...b819', txCount: 32, timestamp: '18 Jan 2025 11:00', status: 'VALIDATED' },
    { height: 41825, hash: '0c7741...b819', prevHash: 'GENESIS_ROOT', txCount: 50, timestamp: '05 Jan 2025 08:00', status: 'GENESIS' }
  ];

  const filteredLogs = AUDIT_LOGS.filter((log) => {
    const matchSearch =
      log.ruasId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ruasName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterAction === 'ALL') return matchSearch;
    return matchSearch && log.action.toUpperCase().includes(filterAction);
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handleRunIntegrityCheck = () => {
    setVerificationResult('CHECKING');
    setTimeout(() => {
      setVerificationResult('SUCCESS');
    }, 1200);
  };

  return (
    <div className="px-4 lg:px-8 py-6 flex flex-col gap-6 max-w-[1720px] mx-auto w-full">
      {/* Top Navigation / Breadcrumbs & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400">
          <button onClick={() => onNavigate('01-inventarisasi')} className="text-emerald-400 hover:underline">
            SPJPP COMMAND CENTER
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">INTEGRITAS TATA KELOLA</span>
          <span className="text-slate-600">/</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold tracking-widest border border-emerald-500/30">
            AUDIT TRAIL
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-xs text-slate-200 font-medium">SHA-256 LEDGER: SYNCED</span>
            <span className="font-mono text-xs text-slate-400">#9942a7...e1</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 text-slate-200 font-mono text-xs border border-slate-700">
            <span className="material-symbols-outlined text-[16px] text-amber-400">verified_user</span>
            <span>Sertifikasi BSSN • Level 3</span>
          </div>
          <button
            onClick={() => {
              setShowVerifyModal(true);
              handleRunIntegrityCheck();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">rule</span>
            <span>Uji Integritas Hash</span>
          </button>
        </div>
      </div>

      {/* Prominent Integrity Banner */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[32px] text-amber-400">gavel</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold tracking-wider uppercase">
                  IMMUTABLE LOG
                </span>
                <h1 className="text-xl lg:text-2xl font-bold text-slate-100 tracking-tight">
                  Integritas Sistem Terjamin: Setiap Perubahan dan Pengecualian Tercatat Beserta Jejaknya
                </h1>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Sesuai amanat Pasal 7 Diktum Ketiga SK Bupati Karo No. 600.1/142/DPUTR/2025, setiap intervensi subjektif, modifikasi bobot AHP, atau penyesuaian skor lapangan mengunci stempel waktu kriptografis SHA-256 yang mustahil diubah sepihak secara retroaktif.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => alert('Mengunduh Berita Acara Ledger Kriptografi (.PDF)... Dokumen terenkripsi dengan SHA-256.')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Ekspor Ledger PDF</span>
            </button>
            <button
              onClick={() => alert('Data log audit diekspor ke CSV untuk audit eksternal BPKP / Inspektorat Daerah.')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Unduh CSV Log</span>
            </button>
          </div>
        </div>

        {/* 4 Key Audit Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="uppercase tracking-wider font-mono">Total Entri Audit</span>
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">database</span>
            </div>
            <div className="font-mono text-2xl font-bold text-slate-100">1.482 Log</div>
            <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>100% Terverifikasi Kriptografis</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="uppercase tracking-wider font-mono">Penyesuaian Skor / Override</span>
              <span className="material-symbols-outlined text-amber-400 text-[18px]">rule</span>
            </div>
            <div className="font-mono text-2xl font-bold text-amber-400">7 Kasus</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">description</span>
              <span>Seluruhnya Berita Acara Sah</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="uppercase tracking-wider font-mono">Ketidaksesuaian Data</span>
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">security</span>
            </div>
            <div className="font-mono text-2xl font-bold text-emerald-400">0,00%</div>
            <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Zero Integrity Breach</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="uppercase tracking-wider font-mono">Rata-Rata Waktu Verifikasi</span>
              <span className="material-symbols-outlined text-blue-400 text-[18px]">schedule</span>
            </div>
            <div className="font-mono text-2xl font-bold text-slate-100">4,2 Jam</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span>Target SOP Inspektorat &lt; 24 Jam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Merkle Block Visualizer Strip */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-lg flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[20px]">account_tree</span>
            <span className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
              Visualisasi Rantai Blok Integritas (Merkle-Proof Chain)
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Klik blok untuk memeriksa hash & rincian payload data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {blocks.map((blk, idx) => {
            const isSelected = selectedBlockIndex === idx;
            return (
              <button
                key={blk.height}
                onClick={() => setSelectedBlockIndex(idx)}
                className={`flex flex-col p-3 rounded-lg text-left transition-all relative border ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-emerald-400">BLOK #{blk.height}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${blk.status === 'GENESIS' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {blk.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-mono truncate mb-1">
                  Hash: <span className="text-slate-400">{blk.hash}</span>
                </div>
                <div className="text-[11px] text-slate-500 mb-2 truncate font-mono">
                  Prev: {blk.prevHash}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>{blk.txCount} Transaksi</span>
                  <span>{blk.timestamp.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Audit Table & Filter Section */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        {/* Controls Bar */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono mr-1">Filter Aksi:</span>
            {[
              { id: 'ALL', label: 'Semua Log' },
              { id: 'BOBOT', label: 'Bobot AHP' },
              { id: 'STATUS', label: 'Status & Dokumen' },
              { id: 'SKOR', label: 'Penyesuaian Skor' },
              { id: 'BUKTI', label: 'Bukti Lapangan' },
              { id: 'BERITA', label: 'Berita Acara' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterAction(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterAction === f.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ruas, operator, nomor berita acara..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Waktu & Hash</th>
                <th className="py-3 px-4">Operator / Instansi</th>
                <th className="py-3 px-4">Ruas & Lokasi</th>
                <th className="py-3 px-4">Jenis Perubahan</th>
                <th className="py-3 px-4">Perubahan Nilai</th>
                <th className="py-3 px-4">Nomor Berita Acara</th>
                <th className="py-3 px-4 text-center">Bukti / Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {filteredLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                return (
                  <React.Fragment key={log.id}>
                    <tr
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                      className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        isExpanded ? 'bg-slate-800/60' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-slate-200 font-semibold">{log.timestamp}</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                          <span>{log.hash}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyHash(log.fullHash);
                            }}
                            className="text-slate-500 hover:text-emerald-400 transition-colors"
                            title="Salin Hash Lengkap"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {copiedHash === log.fullHash ? 'check' : 'content_copy'}
                            </span>
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{log.user}</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {log.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <span className="font-mono text-emerald-400">{log.ruasId}</span>
                          <span className="truncate max-w-[200px]">{log.ruasName}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">Kabupaten Karo</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          <span className="material-symbols-outlined text-[13px]">history_edu</span>
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-400 line-through">{log.previousValue}</span>
                          <span className="material-symbols-outlined text-[14px] text-slate-500">arrow_forward</span>
                          <span className="text-emerald-400 font-bold">{log.newValue}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">
                        <div className="font-semibold text-amber-300/90">{log.beritaAcaraNo}</div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePhoto({
                                url: log.photoUrl,
                                title: `Dokumentasi Ruas ${log.ruasId} - ${log.ruasName}`,
                                coords: "3°12'44.2\"N 98°29'15.4\"E (Elevasi 1.340 mdpl)",
                                inspector: log.user,
                                time: log.timestamp
                              });
                              setShowPhotoModal(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-emerald-400 border border-slate-700 transition-colors"
                            title="Lihat Foto Bukti Lapangan"
                          >
                            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectRoad) onSelectRoad(log.ruasId);
                              onNavigate('04-mcda');
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-emerald-400 border border-slate-700 transition-colors"
                            title="Buka Ruas di Modul MCDA"
                          >
                            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable detail row */}
                    {isExpanded && (
                      <tr className="bg-slate-950/80 border-b border-slate-800">
                        <td colSpan={7} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                            <div className="flex flex-col gap-2">
                              <span className="font-mono text-xs uppercase font-bold text-amber-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">subject</span>
                                Dasar Hukum & Catatan Alasan
                              </span>
                              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded border border-slate-800">
                                {log.notes}
                              </p>
                              <div className="text-[11px] font-mono text-slate-400">
                                Status Diktum: <span className="text-emerald-400 font-bold">TERKUNCI KE DRAF SK BUPATI</span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <span className="font-mono text-xs uppercase font-bold text-blue-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                                Sertifikat Kriptografis SHA-256
                              </span>
                              <div className="bg-slate-950/60 p-3 rounded border border-slate-800 font-mono text-[11px] text-slate-300 break-all space-y-1">
                                <div><span className="text-slate-500">Hash: </span>{log.fullHash}</div>
                                <div><span className="text-slate-500">Merkle Root: </span>6f8a92b9c71e21b...d54a</div>
                                <div><span className="text-slate-500">Timestamp: </span>{log.timestamp} UTC+7</div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <span className="font-mono text-xs uppercase font-bold text-emerald-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                                Bukti Geospasial Terikat
                              </span>
                              <div className="flex items-center gap-3 bg-slate-950/60 p-2 rounded border border-slate-800">
                                <img
                                  src={log.photoUrl}
                                  alt="Bukti inspeksi"
                                  className="w-16 h-16 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity border border-slate-700"
                                  onClick={() => {
                                    setActivePhoto({
                                      url: log.photoUrl,
                                      title: `Dokumentasi Ruas ${log.ruasId} - ${log.ruasName}`,
                                      coords: "3°12'44.2\"N 98°29'15.4\"E (Elevasi 1.340 mdpl)",
                                      inspector: log.user,
                                      time: log.timestamp
                                    });
                                    setShowPhotoModal(true);
                                  }}
                                />
                                <div className="flex flex-col text-[11px]">
                                  <span className="text-slate-200 font-semibold">{log.ruasName}</span>
                                  <span className="font-mono text-slate-400">3°12'44.2"N 98°29'15.4"E</span>
                                  <span className="text-emerald-400 font-mono text-[10px] mt-0.5">EXIF Verified • GPS Valid</span>
                                </div>
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

      {/* Whistleblowing & Audit Principles Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-400 text-[24px]">policy</span>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
                Protokol Anti-Intervensi Sepihak
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Setiap revisi nilai teknis (PCI, AADT, atau Potensi Panen) membutuhkan persetujuan minimal 2 Pejabat Pembuat Komitmen (PPK) serta penerbitan Berita Acara Perubahan resmi yang ditandatangani secara digital dengan sertifikat Balai Sertifikasi Elektronik (BSrE BSSN).
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Standar Audit: ISO 27001 & Permendagri No. 70/2019</span>
            <span className="text-emerald-400">Kepatuhan 100%</span>
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-[24px]">verified_user</span>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
                Kanal Pelaporan Penyimpangan (Whistleblowing)
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Warga, asosiasi petani, atau anggota dewan yang menemukan ketidaksesuaian antara kondisi fisik jalan di lapangan dengan data pada modul ini dapat mengajukan laporan sanggahan berlampir geotag langsung ke Inspektorat Kabupaten Karo.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">WBS Karo: wbs.karokab.go.id</span>
            <button
              onClick={() => onNavigate('beranda-publik')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Buka Formulir Aspirasi Publik</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Field Photo Preview Modal */}
      {showPhotoModal && activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-[20px]">photo_camera</span>
                <span className="font-bold text-sm text-slate-100">{activePhoto.title}</span>
              </div>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="relative bg-black flex items-center justify-center max-h-[420px]">
              <img
                src={activePhoto.url}
                alt="Bukti foto lapangan"
                className="max-h-[420px] w-full object-contain"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-mono text-xs text-emerald-300">
                GPS: {activePhoto.coords}
              </div>
            </div>
            <div className="p-4 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div>Pemeriksa: <span className="text-slate-200">{activePhoto.inspector}</span></div>
              <div>Waktu Rekam: <span className="text-slate-200">{activePhoto.time}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Integrity Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-[22px]">security</span>
                <span className="font-bold text-base text-slate-100">Uji Validasi Kriptografi Rantai Blok</span>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {verificationResult === 'CHECKING' ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                <div className="font-mono text-xs text-slate-300">Menghitung ulang pohon Merkle 1.482 entri log...</div>
                <div className="text-[11px] text-slate-500">Mencocokkan tanda tangan digital BSrE BSSN...</div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-400 text-[24px]">verified</span>
                  <div>
                    <h4 className="font-bold text-sm text-emerald-300 font-mono">KONSISTENSI DATA 100% VALID</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Seluruh 1.482 transaksi audit dari Genesis Block #41825 sampai Blok Terakhir #41829 lolos rekalkulasi hash SHA-256 tanpa anomali ataupun modifikasi sepihak.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-400 space-y-1">
                  <div>Tingkat Integritas: <span className="text-emerald-400 font-bold">100.00%</span></div>
                  <div>Root Hash: <span className="text-slate-200">#9942a781b0f1...e10a</span></div>
                  <div>Audit Timestamp: <span className="text-slate-200">Maret 2025 09:41 WIB</span></div>
                </div>

                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors mt-2"
                >
                  Tutup & Simpan Hasil Verifikasi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
