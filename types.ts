export interface User {
  name: string;
  phone: string;
  password?: string;
}

export interface NursingLog {
  id: string;
  timestamp: string;
  duration: number;
  side: 'Left' | 'Right' | 'Both';
  note?: string;
}

export interface BMIData {
  weight: number;
  height: number;
  bmi: number;
  category: string;
  date: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  EDUCATION = 'education',
  TRACKER = 'tracker',
  HEALTH = 'health',
  CONSULTATION = 'consultation',
}

export interface GrowthEntry {
  id: string;
  date: string;
  weight: number;
  height: number;
  headCircumference: number;
}

export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: 'Boy' | 'Girl';
  isPreterm: boolean;
  birthWeight: number;
  birthHeight: number;
  birthHeadCircumference: number;
  growthHistory: GrowthEntry[];
}

export interface ReadingHistoryEntry {
  categoryId: string;
  subTopicId: string;
  readAt: string;
}
