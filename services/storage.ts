import { BMIData, ChildProfile, NursingLog, ReadingHistoryEntry, User } from '../types';

const STORAGE_KEYS = {
  logs: 'temanasi_logs',
  bmi: 'temanasi_bmi',
  user: 'temanasi_user',
  children: 'temanasi_children',
  readingHistory: 'temanasi_reading_history',
} as const;

const LEGACY_KEYS = {
  logs: 'mamanutri_logs',
  bmi: 'mamanutri_bmi',
  user: 'mamanutri_user',
  children: 'mamanutri_children',
} as const;

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const readWithLegacyMigration = <T>(key: string, legacyKey: string, fallback: T): T => {
  try {
    const current = localStorage.getItem(key);
    if (current !== null) return readJson(key, fallback);

    const legacy = localStorage.getItem(legacyKey);
    if (legacy === null) return fallback;

    const migrated = readJson(legacyKey, fallback);
    localStorage.setItem(key, JSON.stringify(migrated));
    return migrated;
  } catch {
    return fallback;
  }
};

const isReadingHistoryEntry = (value: unknown): value is ReadingHistoryEntry => {
  if (!value || typeof value !== 'object') return false;
  const entry = value as Partial<ReadingHistoryEntry>;
  return (
    typeof entry.categoryId === 'string' &&
    typeof entry.subTopicId === 'string' &&
    typeof entry.readAt === 'string' &&
    !Number.isNaN(new Date(entry.readAt).getTime())
  );
};

export const storage = {
  getLogs: (): NursingLog[] => {
    return readWithLegacyMigration(STORAGE_KEYS.logs, LEGACY_KEYS.logs, []);
  },
  saveLog: (log: NursingLog) => {
    const logs = storage.getLogs();
    logs.unshift(log);
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(logs));
  },
  deleteLog: (id: string) => {
    const logs = storage.getLogs();
    const filtered = logs.filter((l) => l.id !== id);
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(filtered));
  },
  getChildren: (): ChildProfile[] => {
    return readWithLegacyMigration(STORAGE_KEYS.children, LEGACY_KEYS.children, []);
  },
  saveChild: (child: ChildProfile) => {
    const children = storage.getChildren();
    children.push(child);
    localStorage.setItem(STORAGE_KEYS.children, JSON.stringify(children));
  },
  updateChild: (updatedChild: ChildProfile) => {
    const children = storage.getChildren();
    const index = children.findIndex((c) => c.id === updatedChild.id);
    if (index !== -1) {
      children[index] = updatedChild;
      localStorage.setItem(STORAGE_KEYS.children, JSON.stringify(children));
    }
  },
  deleteChild: (id: string) => {
    const children = storage.getChildren();
    const filtered = children.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.children, JSON.stringify(filtered));
  },
  getBMIData: (): BMIData[] => {
    return readWithLegacyMigration(STORAGE_KEYS.bmi, LEGACY_KEYS.bmi, []);
  },
  saveBMI: (bmi: BMIData) => {
    const history = storage.getBMIData();
    history.unshift(bmi);
    localStorage.setItem(STORAGE_KEYS.bmi, JSON.stringify(history));
  },
  getUser: (): User | null => {
    return readWithLegacyMigration(STORAGE_KEYS.user, LEGACY_KEYS.user, null);
  },
  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  },
  getReadingHistory: (): ReadingHistoryEntry[] => {
    const history = readJson<unknown>(STORAGE_KEYS.readingHistory, []);
    return Array.isArray(history) ? history.filter(isReadingHistoryEntry).slice(0, 20) : [];
  },
  saveReadingHistory: (entry: ReadingHistoryEntry): ReadingHistoryEntry[] => {
    const history = storage
      .getReadingHistory()
      .filter(
        (item) => item.categoryId !== entry.categoryId || item.subTopicId !== entry.subTopicId,
      );
    const updated = [entry, ...history].slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.readingHistory, JSON.stringify(updated));
    return updated;
  },
};
