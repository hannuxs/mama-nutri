import { Preferences } from '@capacitor/preferences';
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

interface StorageCache {
  logs: NursingLog[];
  bmi: BMIData[];
  user: User | null;
  children: ChildProfile[];
  readingHistory: ReadingHistoryEntry[];
}

const cache: StorageCache = {
  logs: [],
  bmi: [],
  user: null,
  children: [],
  readingHistory: [],
};

const parseJson = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const readValue = async <T>(key: string, fallback: T): Promise<T> => {
  const { value } = await Preferences.get({ key });
  if (value !== null) return parseJson(value, fallback);

  // Preserve data created by the previous browser-only version when running on the web.
  try {
    return parseJson(localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
};

const readWithLegacyMigration = async <T>(
  key: string,
  legacyKey: string,
  fallback: T,
): Promise<T> => {
  const currentPreference = await Preferences.get({ key });
  if (currentPreference.value !== null) {
    return parseJson(currentPreference.value, fallback);
  }

  try {
    const currentLocalValue = localStorage.getItem(key);
    if (currentLocalValue !== null) {
      const current = parseJson(currentLocalValue, fallback);
      await persist(key, current);
      return current;
    }
  } catch {
    // localStorage may be unavailable in restricted WebViews.
  }

  const legacyPreference = await Preferences.get({ key: legacyKey });
  if (legacyPreference.value !== null) {
    const legacy = parseJson(legacyPreference.value, fallback);
    await persist(key, legacy);
    return legacy;
  }

  try {
    const legacyLocalValue = localStorage.getItem(legacyKey);
    if (legacyLocalValue !== null) {
      const legacy = parseJson(legacyLocalValue, fallback);
      await persist(key, legacy);
      return legacy;
    }
  } catch {
    // No browser storage is available; use the empty native default.
  }

  return fallback;
};

const persist = async <T>(key: string, value: T) => {
  await Preferences.set({ key, value: JSON.stringify(value) });
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
  initialize: async () => {
    const [logs, bmi, user, children, readingHistory] = await Promise.all([
      readWithLegacyMigration<NursingLog[]>(STORAGE_KEYS.logs, LEGACY_KEYS.logs, []),
      readWithLegacyMigration<BMIData[]>(STORAGE_KEYS.bmi, LEGACY_KEYS.bmi, []),
      readWithLegacyMigration<User | null>(STORAGE_KEYS.user, LEGACY_KEYS.user, null),
      readWithLegacyMigration<ChildProfile[]>(STORAGE_KEYS.children, LEGACY_KEYS.children, []),
      readValue<unknown>(STORAGE_KEYS.readingHistory, []),
    ]);

    cache.logs = Array.isArray(logs) ? logs : [];
    cache.bmi = Array.isArray(bmi) ? bmi : [];
    cache.user = user;
    cache.children = Array.isArray(children) ? children : [];
    cache.readingHistory = Array.isArray(readingHistory)
      ? readingHistory.filter(isReadingHistoryEntry).slice(0, 20)
      : [];
  },

  getLogs: (): NursingLog[] => [...cache.logs],
  saveLog: async (log: NursingLog) => {
    cache.logs = [log, ...cache.logs];
    await persist(STORAGE_KEYS.logs, cache.logs);
  },
  deleteLog: async (id: string) => {
    cache.logs = cache.logs.filter((log) => log.id !== id);
    await persist(STORAGE_KEYS.logs, cache.logs);
  },

  getChildren: (): ChildProfile[] => [...cache.children],
  saveChild: async (child: ChildProfile) => {
    cache.children = [...cache.children, child];
    await persist(STORAGE_KEYS.children, cache.children);
  },
  updateChild: async (updatedChild: ChildProfile) => {
    cache.children = cache.children.map((child) =>
      child.id === updatedChild.id ? updatedChild : child,
    );
    await persist(STORAGE_KEYS.children, cache.children);
  },
  deleteChild: async (id: string) => {
    cache.children = cache.children.filter((child) => child.id !== id);
    await persist(STORAGE_KEYS.children, cache.children);
  },

  getBMIData: (): BMIData[] => [...cache.bmi],
  saveBMI: async (bmi: BMIData) => {
    cache.bmi = [bmi, ...cache.bmi];
    await persist(STORAGE_KEYS.bmi, cache.bmi);
  },

  getUser: (): User | null => cache.user,
  setUser: async (user: User | null) => {
    cache.user = user;
    if (user) {
      await persist(STORAGE_KEYS.user, user);
    } else {
      await Preferences.remove({ key: STORAGE_KEYS.user });
    }
  },

  getReadingHistory: (): ReadingHistoryEntry[] => [...cache.readingHistory],
  saveReadingHistory: async (entry: ReadingHistoryEntry): Promise<ReadingHistoryEntry[]> => {
    cache.readingHistory = [
      entry,
      ...cache.readingHistory.filter(
        (item) => item.categoryId !== entry.categoryId || item.subTopicId !== entry.subTopicId,
      ),
    ].slice(0, 20);
    await persist(STORAGE_KEYS.readingHistory, cache.readingHistory);
    return storage.getReadingHistory();
  },
};
