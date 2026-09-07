import { BookOpen, ChevronRight } from 'lucide-react';
import React from 'react';
import { EDUCATION_DATA, EducationCategory, SubTopic } from '../constants';
import { ReadingHistoryEntry } from '../types';

interface ResolvedReadingEntry extends ReadingHistoryEntry {
  category: EducationCategory;
  topic: SubTopic;
}

interface RecentReadsProps {
  history: ReadingHistoryEntry[];
  onOpen: (category: EducationCategory, topic: SubTopic) => void;
  onBrowse: () => void;
}

const resolveHistory = (history: ReadingHistoryEntry[]): ResolvedReadingEntry[] =>
  history.flatMap((entry) => {
    const category = EDUCATION_DATA.find((item) => item.id === entry.categoryId);
    const topic = category?.subTopics.find((item) => item.id === entry.subTopicId);
    return category && topic ? [{ ...entry, category, topic }] : [];
  });

const formatReadTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Baru saja';

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const RecentReads: React.FC<RecentReadsProps> = ({ history, onOpen, onBrowse }) => {
  const entries = resolveHistory(history).slice(0, 20);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-800">Terakhir Dibaca</h3>
          <p className="text-xs text-gray-400">Maksimal 20 materi terbaru</p>
        </div>
        <button onClick={onBrowse} className="text-xs font-bold text-pink-500">
          Lihat Materi
        </button>
      </div>

      {entries.length === 0 ? (
        <button
          onClick={onBrowse}
          className="flex w-full items-center gap-4 rounded-3xl border-2 border-dashed border-pink-100 bg-white/70 p-5 text-left"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-400">
            <BookOpen size={24} />
          </span>
          <span className="flex-1">
            <span className="block font-bold text-gray-700">Belum ada materi yang dibaca</span>
            <span className="mt-1 block text-xs leading-5 text-gray-400">
              Mulai membaca dan materi akan tersimpan otomatis di sini.
            </span>
          </span>
          <ChevronRight className="text-pink-300" size={20} />
        </button>
      ) : (
        <div className="space-y-3">
          {entries.map(({ category, topic, readAt }) => (
            <button
              key={`${category.id}-${topic.id}`}
              onClick={() => onOpen(category, topic)}
              className="flex w-full items-center gap-4 rounded-3xl border border-gray-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
            >
              <img
                src={category.image}
                alt=""
                className="h-20 w-16 shrink-0 rounded-2xl object-cover"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[10px] font-black uppercase tracking-wider text-pink-400">
                  {category.title}
                </span>
                <span className="mt-1 block font-bold leading-tight text-gray-800">
                  {topic.title}
                </span>
                <span className="mt-1 block text-[11px] text-gray-400">
                  {formatReadTime(readAt)}
                </span>
              </span>
              <ChevronRight className="shrink-0 text-gray-300" size={20} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentReads;
