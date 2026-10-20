import React, { useState } from 'react';
import { NavigationTab, McdaScenario, RoadSegment } from '../../types';
import { INITIAL_ROADS } from '../../data/mockData';

interface Module04Props {
  onNavigate: (tab: NavigationTab) => void;
  selectedRoadId?: string;
  onSelectRoad?: (roadId: string) => void;
}

export const Module04MCDA: React.FC<Module04Props> = ({
  onNavigate,
  selectedRoadId = 'KRO-018',
  onSelectRoad,
}) => {
  const [activeScenario, setActiveScenario] = useState<McdaScenario>('dasar');
  const [activeRoadId, setActiveRoadId] = useState<string>(selectedRoadId);

  // Weight configurations for 3 scenarios
  const scenarioConfigs = {
    dasar: {
      C: { label: 'Kondisi Teknis', val: '20%', num: 20 },
      P: { label: 'Produksi Komoditas', val: '25%', num: 25 },
      A: { label: 'Akses Pasar & Sub-Terminal', val: '20%', num: 20 },
      B: { label: 'Penerima Manfaat', val: '15%', num: 15 },
      R: { label: 'Risiko Keterputusan', val: '10%', num: 10 },
      M: { label: 'Efisiensi Biaya (M)', val: '10%', num: 10 },
    },
    ekonomi: {
      C: { label: 'Kondisi Teknis', val: '15%', num: 15 },
      P: { label: 'Produksi Komoditas', val: '35%', num: 35 },
      A: { label: 'Akses Pasar & Sub-Terminal', val: '25%', num: 25 },
      B: { label: 'Penerima Manfaat', val: '10%', num: 10 },
      R: { label: 'Risiko Keterputusan', val: '10%', num: 10 },
      M: { label: 'Efisiensi Biaya (M)', val: '5%', num: 5 },
    },
    risiko: {
      C: { label: 'Kondisi Teknis', val: '20%', num: 20 },
      P: { label: 'Produksi Komoditas', val: '15%', num: 15 },
      A: { label: 'Akses Pasar & Sub-Terminal', val: '15%', num: 15 },
      B: { label: 'Penerima Manfaat', val: '15%', num: 15 },
      R: { label: 'Risiko Keterputusan', val: '30%', num: 30 },
      M: { label: 'Efisiensi Biaya (M)', val: '5%', num: 5 },
    },
  };

  const weights = scenarioConfigs[activeScenario];

  // Re-calculate scores for roads based on active scenario weights
  const scoredRoads = INITIAL_ROADS.map((road) => {
    const wC = weights.C.num / 100;
    const wP = weights.P.num / 100;
    const wA = weights.A.num / 100;
    const wB = weights.B.num / 100;
    const wR = weights.R.num / 100;
    const wM = weights.M.num / 100;

    const computedScore =
      road.criteriaScores.C * wC +
      road.criteriaScores.P * wP +
      road.criteriaScores.A * wA +
      road.criteriaScores.B * wB +
      road.criteriaScores.R * wR +
      road.criteriaScores.M * wM;

    return {
      ...road,
      dynamicScore: Number(computedScore.toFixed(2)),
    };
  }).sort((a, b) => b.dynamicScore - a.dynamicScore);

  const selectedRoad = scoredRoads.find((r) => r.id === activeRoadId) || scoredRoads[0];

  const handleRowClick = (roadId: string) => {
    setActiveRoadId(roadId);
    if (onSelectRoad) onSelectRoad(roadId);
  };

  // Convert radar 6 criteria to 320x280 viewBox polygon
  // Center is at (160, 140), max radius is 120
  // Angles: C (-90°), P (-30°), A (30°), B (90°), R (150°), M (210°)
  const calcRadarPoint = (val: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const r = Math.max(val * 115, 12);
    const x = 160 + r * Math.cos(rad);
    const y = 140 + r * Math.sin(rad);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const cScore = selectedRoad.criteriaScores.C;
  const pScore = selectedRoad.criteriaScores.P;
  const aScore = selectedRoad.criteriaScores.A;
  const bScore = selectedRoad.criteriaScores.B;
  const rScore = selectedRoad.criteriaScores.R;
  const mScore = selectedRoad.criteriaScores.M;

  const radarPolygonPoints = [
    calcRadarPoint(cScore, -90),
    calcRadarPoint(pScore, -30),
    calcRadarPoint(aScore, 30),
    calcRadarPoint(bScore, 90),
    calcRadarPoint(rScore, 150),
    calcRadarPoint(mScore, 210),
  ].join(' ');

  return (
    <div className="flex flex-col w-full p-6 lg:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Command & Simulation Navigation Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-[#1b2029] p-5 rounded-xl shadow-md border border-[#31353f]">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#10b981] text-[#002113] font-mono text-[10px] font-semibold uppercase tracking-wider">
              Modul 04 • Tahap Analisis
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#31353f] text-[#adc6ff] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] animate-pulse"></span>
              AHP-TOPSIS Hybrid
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl text-[#dfe2f0] tracking-tight font-bold">
            MODUL 04 • PEMERINGKATAN MCDA &amp; UJI SENSITIVITAS
          </h1>
          <p className="text-xs text-[#bbcabf] mt-0.5">
            Perhitungan Indeks Prioritas Berbasis Multi-Kriteria Objektif dengan Kunci Bobot Transparan
          </p>
        </div>

        {/* Right Controls: Weight Presets & Locked Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e29100]/20 text-[#ffb95f] border border-[#e29100]/30 shadow-sm"
            title="Protokol Integritas SPJPP: Mencegah manipulasi peringkat ad-hoc"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wide">Kunci Bobot Aktif</span>
              <span className="text-[10px] text-[#ffb95f]/80 leading-tight">Mencegah intervensi subjektif</span>
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="inline-flex p-1 rounded-lg bg-[#0a0e17] gap-1 border border-[#31353f]">
            <button
              onClick={() => setActiveScenario('dasar')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeScenario === 'dasar'
                  ? 'bg-[#10b981] text-[#002113] shadow-sm'
                  : 'text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#1b2029]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">balance</span>
              <span>Dasar (Seimbang)</span>
            </button>
            <button
              onClick={() => setActiveScenario('ekonomi')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeScenario === 'ekonomi'
                  ? 'bg-[#10b981] text-[#002113] shadow-sm'
                  : 'text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#1b2029]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>Berat Ekonomi</span>
            </button>
            <button
              onClick={() => setActiveScenario('risiko')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeScenario === 'risiko'
                  ? 'bg-[#10b981] text-[#002113] shadow-sm'
                  : 'text-[#bbcabf] hover:text-[#dfe2f0] hover:bg-[#1b2029]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span>Berat Risiko</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================== */}
        {/* 1. KOLOM KIRI (col-span-3): BOBOT KRITERIA */}
        {/* ========================================== */}
        <section className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#1b2029] p-4 rounded-xl shadow-md border border-[#31353f] flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 bg-[#171c25]/50 -mx-4 -mt-4 px-4 pt-4 border-b border-[#31353f]/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">tune</span>
                <span className="text-sm font-semibold text-[#dfe2f0]">6 Bobot Kriteria</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#4edea3]/10 text-[#4edea3] font-mono text-[10px] font-bold border border-[#4edea3]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                Σ = 100% Valid
              </span>
            </div>
            <div className="text-xs text-[#bbcabf]">
              Konfigurasi parameter bobot normalisasi terverifikasi Bappeda &amp; DPUTR Karo ({activeScenario.toUpperCase()}).
            </div>

            {/* Criteria Sliders List */}
            <div className="flex flex-col gap-3.5">
              {/* C - Kondisi Teknis */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfe2f0] flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#31353f] text-[#adc6ff]">C</span>
                    <span>Kondisi Teknis</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#4edea3]">{weights.C.val}</span>
                </div>
                <div className="relative w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#4edea3] transition-all duration-500 rounded-full"
                    style={{ width: `${weights.C.num}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#bbcabf] truncate">Tingkat kerusakan perkerasan &amp; drainase</span>
              </div>

              {/* P - Kepentingan Produksi */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfe2f0] flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#31353f] text-[#4edea3]">P</span>
                    <span>Produksi Komoditas</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#4edea3]">{weights.P.val}</span>
                </div>
                <div className="relative w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#10b981] transition-all duration-500 rounded-full"
                    style={{ width: `${weights.P.num}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#bbcabf] truncate">Tonase panen kentang, jeruk, wortel &amp; kol</span>
              </div>

              {/* A - Akses Pasar */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfe2f0] flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#31353f] text-[#0566d9]">A</span>
                    <span>Akses Pasar &amp; Sub-Terminal</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#4edea3]">{weights.A.val}</span>
                </div>
                <div className="relative w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#adc6ff] transition-all duration-500 rounded-full"
                    style={{ width: `${weights.A.num}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#bbcabf] truncate">Waktu tempuh ke Pasar Roga / Kabanjahe</span>
              </div>

              {/* B - Penerima Manfaat */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfe2f0] flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#31353f] text-[#ffb95f]">B</span>
                    <span>Penerima Manfaat</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#4edea3]">{weights.B.val}</span>
                </div>
                <div className="relative w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#ffb95f] transition-all duration-500 rounded-full"
                    style={{ width: `${weights.B.num}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#bbcabf] truncate">Jumlah KK tani &amp; kantong kemiskinan perdesaan</span>
              </div>

              {/* R - Risiko Keterputusan */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfe2f0] flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#31353f] text-[#ffb4ab]">R</span>
                    <span>Risiko Keterputusan</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#4edea3]">{weights.R.val}</span>
                </div>
                <div className="relative w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#ffb4ab] transition-all duration-500 rounded-full"
                    style={{ width: `${weights.R.num}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#bbcabf] truncate">Rawan longsor vulkanik Sinabung / ketiadaan rute alt</span>
              </div>

              {/* M - Efisiensi Biaya */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfe2f0] flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#31353f] text-[#dfe2f0]">M</span>
                    <span>Efisiensi Biaya (M)</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#4edea3]">{weights.M.val}</span>
                </div>
                <div className="relative w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#353944] transition-all duration-500 rounded-full"
                    style={{ width: `${weights.M.num}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#bbcabf] truncate">Rasio biaya penanganan per km per tonase</span>
              </div>
            </div>

            {/* Total */}
            <div className="mt-2 p-2.5 rounded-lg bg-[#0a0e17] flex items-center justify-between border border-[#31353f]">
              <span className="text-xs text-[#bbcabf]">Total Penjumlahan Bobot:</span>
              <span className="font-mono text-xs text-[#4edea3] font-bold">1.00 (100.0%)</span>
            </div>
          </div>

          {/* Mathematical Engine Box */}
          <div className="bg-[#1b2029] p-4 rounded-xl shadow-md border border-[#31353f] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#dfe2f0]">
              <span className="material-symbols-outlined text-[20px] text-[#ffb95f]">functions</span>
              <span className="text-sm font-semibold">Formula MCDA Engine</span>
            </div>
            <div className="p-3 bg-[#0a0e17] rounded-lg font-mono text-xs text-[#adc6ff] leading-relaxed text-center select-all border border-[#1b2029]">
              I_i = ∑_{'{j=1}'}^{'{6}'} ( w_j · z_{'{ij}'} )
            </div>
            <div className="flex flex-col gap-2 text-xs text-[#bbcabf]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3] shrink-0 mt-0.5">verified</span>
                <span><strong>Normalisasi Min-Max:</strong> Kriteria benefit (P, A, B) dinormalisasi linear positif. Kriteria cost (M, C-kerusakan) dinormalisasi terbalik.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3] shrink-0 mt-0.5">verified</span>
                <span><strong>Rentang Indeks Komposit:</strong> Nilai akhir skalar berada dalam selang baku [0.00, 1.00].</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 2. KOLOM TENGAH (col-span-5): TABEL PRIORITAS */}
        {/* ========================================== */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#1b2029] rounded-xl shadow-md border border-[#31353f] overflow-hidden flex flex-col">
            <div className="p-4 bg-[#171c25]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#31353f]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#4edea3] text-[22px]">format_list_numbered</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-[#dfe2f0]">Tabel Prioritas Ruas</h2>
                    <span className="px-2 py-0.5 rounded bg-[#e29100]/20 text-[#ffb95f] font-mono text-[10px] font-bold tracking-wider uppercase border border-[#e29100]/30">
                      DATA SIMULASI
                    </span>
                  </div>
                  <span className="text-xs text-[#bbcabf]">Urutan dinamis berdasarkan skenario bobot aktif</span>
                </div>
              </div>
              <span className="font-mono text-xs text-[#bbcabf] px-2 py-1 rounded bg-[#31353f]">
                N = 5 Teratas
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0a0e17] text-[#bbcabf] font-mono text-[10px] tracking-wider uppercase border-b border-[#31353f]">
                    <th className="py-3 px-3 w-12 text-center">Rank</th>
                    <th className="py-3 px-3">Ruas &amp; Koridor</th>
                    <th className="py-3 px-2 text-center" title="Kriteria: C, P, A, B, R, M">Heat Matrix</th>
                    <th className="py-3 px-3 text-right">Skor (I)</th>
                    <th className="py-3 px-3 text-center">Kelas</th>
                    <th className="py-3 px-2 text-center">Shift</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#31353f]/40 text-xs">
                  {scoredRoads.slice(0, 5).map((road, index) => {
                    const isSelected = road.id === activeRoadId;
                    return (
                      <tr
                        key={road.id}
                        onClick={() => handleRowClick(road.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#262a34] border-l-2 border-[#4edea3]'
                            : 'hover:bg-[#171c25]'
                        }`}
                      >
                        <td className="py-3.5 px-3 text-center font-mono font-bold text-[#4edea3]">
                          #{String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-[#dfe2f0]">{road.id}</span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" title="Ruas Aktif Terpilih"></span>
                              )}
                            </div>
                            <span className="text-xs text-[#bbcabf] truncate">{road.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <span className="w-3 h-4 rounded-sm bg-[#4edea3]" title={`C: ${road.criteriaScores.C}`}></span>
                            <span className="w-3 h-4 rounded-sm bg-[#10b981]" title={`P: ${road.criteriaScores.P}`}></span>
                            <span className="w-3 h-4 rounded-sm bg-[#adc6ff]" title={`A: ${road.criteriaScores.A}`}></span>
                            <span className="w-3 h-4 rounded-sm bg-[#ffb95f]" title={`B: ${road.criteriaScores.B}`}></span>
                            <span className="w-3 h-4 rounded-sm bg-[#ffb4ab]" title={`R: ${road.criteriaScores.R}`}></span>
                            <span className="w-3 h-4 rounded-sm bg-[#353944]" title={`M: ${road.criteriaScores.M}`}></span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono font-bold text-sm text-[#4edea3]">
                          {road.dynamicScore.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                            road.priorityClass === 'Prioritas I'
                              ? 'bg-[#93000a] text-[#ffdad6]'
                              : 'bg-[#e29100]/20 text-[#ffb95f]'
                          }`}>
                            {road.priorityClass}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-center">
                          {road.shift > 0 ? (
                            <span className="inline-flex items-center text-[#4edea3] font-mono text-xs font-bold">
                              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                              +{road.shift}
                            </span>
                          ) : road.shift < 0 ? (
                            <span className="inline-flex items-center text-[#ffb4ab] font-mono text-xs font-bold">
                              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                              {road.shift}
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-[#bbcabf] font-mono text-xs font-bold">
                              <span className="material-symbols-outlined text-[16px]">remove</span>
                              0
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Classification Ribbon */}
            <div className="p-3 bg-[#0a0e17] border-t border-[#31353f] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[10px] text-[#bbcabf] uppercase tracking-wider">KLASIFIKASI:</span>
              <div className="flex items-center gap-3 font-mono text-[10px]">
                <span className="flex items-center gap-1 text-[#dfe2f0]">
                  <span className="w-2.5 h-2.5 rounded bg-[#93000a]"></span> Prioritas I (≥0.75)
                </span>
                <span className="flex items-center gap-1 text-[#dfe2f0]">
                  <span className="w-2.5 h-2.5 rounded bg-[#e29100]"></span> Prioritas II (0.60-0.74)
                </span>
                <span className="flex items-center gap-1 text-[#dfe2f0]">
                  <span className="w-2.5 h-2.5 rounded bg-[#ffb95f]"></span> Prioritas III (0.45-0.59)
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry card */}
          <div className="bg-[#171c25] p-4 rounded-xl border border-[#31353f] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#adc6ff]">
                METADATA RUAS TERPILIH
              </span>
              <span className="font-mono text-xs text-[#bbcabf]">ID: {selectedRoad.id}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-1 text-center font-mono text-xs">
              <div className="p-2 rounded bg-[#0a0e17] flex flex-col border border-[#1b2029]">
                <span className="text-[#bbcabf] text-[10px]">Panjang Ruas</span>
                <span className="text-[#dfe2f0] font-bold text-xs mt-0.5">{selectedRoad.lengthKm} km</span>
              </div>
              <div className="p-2 rounded bg-[#0a0e17] flex flex-col border border-[#1b2029]">
                <span className="text-[#bbcabf] text-[10px]">Estimasi Anggaran</span>
                <span className="text-[#4edea3] font-bold text-xs mt-0.5">{selectedRoad.estimatedBudget}</span>
              </div>
              <div className="p-2 rounded bg-[#0a0e17] flex flex-col border border-[#1b2029]">
                <span className="text-[#bbcabf] text-[10px]">Lalu Lintas Harian</span>
                <span className="text-[#dfe2f0] font-bold text-xs mt-0.5">{selectedRoad.dailyTrafficSmp} SMP</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 3. KOLOM KANAN (col-span-4): RADAR & SENSITIVITY */}
        {/* ========================================== */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          {/* Radar Chart Card */}
          <div className="bg-[#1b2029] p-4 rounded-xl shadow-md border border-[#31353f] flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#adc6ff] text-[20px]">radar</span>
                <span className="text-sm font-bold text-[#dfe2f0]">Profil Kriteria Ruas</span>
              </div>
              <span className="px-2 py-0.5 rounded font-mono text-xs bg-[#4edea3]/10 text-[#4edea3] font-bold border border-[#4edea3]/20">
                {selectedRoad.id} ({selectedRoad.kecamatan})
              </span>
            </div>
            <p className="text-xs text-[#bbcabf]">
              Visualisasi skor ter-normalisasi 6 dimensi kriteria penentu
            </p>

            {/* SVG Polygon Radar Chart */}
            <div className="w-full flex items-center justify-center py-2 relative">
              <svg className="w-full max-w-[280px] h-auto overflow-visible select-none" viewBox="0 0 320 280">
                {/* Radial Grid Polygons */}
                <polygon points="160,116 181,128 181,152 160,164 139,152 139,128" fill="none" stroke="#31353f" strokeWidth="1"></polygon>
                <polygon points="160,92 202,116 202,164 160,188 118,164 118,116" fill="none" stroke="#31353f" strokeWidth="1"></polygon>
                <polygon points="160,68 222,104 222,176 160,212 98,176 98,104" fill="none" stroke="#31353f" strokeWidth="1" strokeDasharray="2,2"></polygon>
                <polygon points="160,44 243,92 243,188 160,236 77,188 77,92" fill="none" stroke="#31353f" strokeWidth="1"></polygon>
                <polygon points="160,20 264,80 264,200 160,260 56,200 56,80" fill="none" stroke="#3c4a42" strokeWidth="1.5"></polygon>

                {/* Axis Spoke Lines */}
                <line x1="160" y1="140" x2="160" y2="20" stroke="#3c4a42" strokeWidth="1"></line>
                <line x1="160" y1="140" x2="264" y2="80" stroke="#3c4a42" strokeWidth="1"></line>
                <line x1="160" y1="140" x2="264" y2="200" stroke="#3c4a42" strokeWidth="1"></line>
                <line x1="160" y1="140" x2="160" y2="260" stroke="#3c4a42" strokeWidth="1"></line>
                <line x1="160" y1="140" x2="56" y2="200" stroke="#3c4a42" strokeWidth="1"></line>
                <line x1="160" y1="140" x2="56" y2="80" stroke="#3c4a42" strokeWidth="1"></line>

                {/* Active Road Data Polygon */}
                <polygon
                  points={radarPolygonPoints}
                  fill="#4edea3"
                  fillOpacity="0.28"
                  stroke="#4edea3"
                  strokeWidth="2.5"
                  className="transition-all duration-500 filter drop-shadow-[0_0_8px_rgba(78,222,163,0.5)]"
                ></polygon>

                {/* Axis Labels */}
                <text x="160" y="10" textAnchor="middle" fill="#4edea3" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">
                  C: Kondisi ({cScore.toFixed(2)})
                </text>
                <text x="274" y="78" textAnchor="start" fill="#4edea3" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">
                  P: Prod ({pScore.toFixed(2)})
                </text>
                <text x="274" y="208" textAnchor="start" fill="#adc6ff" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">
                  A: Akses ({aScore.toFixed(2)})
                </text>
                <text x="160" y="278" textAnchor="middle" fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">
                  B: Manfaat ({bScore.toFixed(2)})
                </text>
                <text x="46" y="208" textAnchor="end" fill="#ffb4ab" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">
                  R: Risiko ({rScore.toFixed(2)})
                </text>
                <text x="46" y="78" textAnchor="end" fill="#bbcabf" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">
                  M: Efisiensi ({mScore.toFixed(2)})
                </text>
              </svg>
            </div>
          </div>

          {/* Sensitivity Analysis Testing Card */}
          <div className="bg-[#1b2029] p-4 rounded-xl shadow-md border border-[#31353f] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 bg-[#171c25]/50 -mx-4 -mt-4 px-4 pt-4 border-b border-[#31353f]/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">science</span>
                <span className="text-sm font-semibold text-[#dfe2f0]">Uji Sensitivitas (Sensitivity)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#31353f] text-[#adc6ff] font-mono text-[10px] font-semibold">
                Monte Carlo (N=1,000)
              </span>
            </div>

            {/* Metric 1: Spearman */}
            <div className="p-3 rounded-lg bg-[#0a0e17] border border-[#31353f] flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#bbcabf]">Korelasi Spearman (r_s):</span>
                <span className="font-mono text-sm font-bold text-[#4edea3]">r_s = 0.91</span>
              </div>
              <div className="w-full bg-[#1b2029] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#4edea3] h-1.5 rounded-full" style={{ width: '91%' }}></div>
              </div>
              <span className="font-mono text-[10px] text-[#4edea3] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Stabilitas Sangat Tinggi antar Skenario Bobot
              </span>
            </div>

            {/* Metric 2: Rank Class Stability */}
            <div className="p-3 rounded-lg bg-[#0a0e17] border border-[#31353f] flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#bbcabf]">Perpindahan Kelas Prioritas:</span>
                <span className="font-mono text-sm font-bold text-[#ffb95f]">7.1%</span>
              </div>
              <div className="w-full bg-[#1b2029] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#ffb95f] h-1.5 rounded-full" style={{ width: '7.1%' }}></div>
              </div>
              <span className="text-[11px] text-[#bbcabf]">
                Hanya 7,1% ruas berpindah kelas antara skenario Dasar dan Berat Ekonomi.
              </span>
            </div>

            {/* Automated Executive Conclusion Box */}
            <div className="p-3 rounded-lg bg-[#262a34] border border-[#31353f] flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px] shrink-0 mt-0.5">policy</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#dfe2f0]">Kesimpulan Audit Statistik:</span>
                <p className="text-xs text-[#bbcabf] mt-0.5 leading-relaxed">
                  Daftar prioritas kokoh secara statistik terhadap fluktuasi preferensi kebijakan. Tidak ditemukan anomali inversi ranking ekstrem.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0a0e17] border border-[#1b2029] flex items-center justify-between text-[#bbcabf] font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#86948a]">verified_user</span>
              <span>Semua skor berbasis simulasi model MCDA SPJPP-Karo 2025.</span>
            </div>
            <span className="text-[#86948a]">v2.4-PROD</span>
          </div>
        </section>
      </div>
    </div>
  );
};
