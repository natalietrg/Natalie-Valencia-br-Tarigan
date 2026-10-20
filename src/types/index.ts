export type NavigationTab = 
  | '01-inventarisasi'
  | '02-koridor'
  | '03-risiko'
  | '04-mcda'
  | '05-penetapan'
  | 'log-audit'
  | 'roadmap'
  | 'beranda-publik';

export type UserRole = 'DPUTR' | 'Bappeda' | 'Mitra';

export interface RoadSegment {
  id: string;
  name: string;
  kecamatan: string;
  subgradeCondition: string;
  lengthKm: number;
  commodities: string;
  commodityBadgeColor: string;
  tonnageYear: string;
  collectionPoint: string;
  targetMarket: string;
  hasAlternativeRoute: boolean;
  pciScore: number;
  conditionDescription: string;
  damageRatePercent: number;
  effectiveWidthM: number;
  mcdaScore: number;
  priorityClass: 'Prioritas I' | 'Prioritas II' | 'Prioritas III' | 'Prioritas IV';
  priorityLevelNum: 1 | 2 | 3 | 4;
  rank: number;
  shift: number;
  criteriaScores: {
    C: number; // Kondisi Teknis
    P: number; // Produksi Komoditas
    A: number; // Akses Pasar
    B: number; // Penerima Manfaat
    R: number; // Risiko Keterputusan
    M: number; // Efisiensi Biaya
  };
  surveyDate: string;
  rkpdStatus: string;
  justification: string;
  estimatedBudget: string;
  dailyTrafficSmp: number;
}

export interface CorridorData {
  id: string;
  code: string;
  name: string;
  routeTitle: string;
  totalLengthKm: number;
  dailyTonnage: string;
  damageRate: string;
  mcdaPoints: string;
  priorityBadge: string;
  badgeClass: string;
  description: string;
  criticalFactor: string;
  roadIds: string[];
  color: string;
}

export interface AuditLogItem {
  id: string;
  date: string;
  time: string;
  userName: string;
  userRole: string;
  userInitials: string;
  avatarBg: string;
  actionType: 'Pengecualian Peringkat' | 'Kunci Matriks Bobot' | 'Ubah Skor Kondisi' | 'Integrasi Eksternal' | 'Draf Regulasi SK' | 'Perbarui Layer Risiko';
  actionBadgeColor: string;
  roadId: string;
  roadTitle: string;
  prevValue: string;
  newValue: string;
  justification: string;
  discretionNote: string;
  docCode: string;
  hash: string;
}

export type McdaScenario = 'dasar' | 'ekonomi' | 'risiko';
