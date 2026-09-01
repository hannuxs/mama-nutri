import React, { useState, useEffect, useMemo } from 'react';
import { storage } from '../services/storage';
import { NursingLog } from '../types';
import { Plus, Timer, Trash2, Calendar, Filter, X } from 'lucide-react';

const TrackerSection: React.FC = () => {
  const [logs, setLogs] = useState<NursingLog[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [duration, setDuration] = useState('15');
  const [side, setSide] = useState<'Left' | 'Right' | 'Both'>('Both');
  const [note, setNote] = useState('');

  // Filter states
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLogs(storage.getLogs());
  }, []);

  const handleAddLog = () => {
    const newLog: NursingLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      duration: parseInt(duration),
      side,
      note,
    };
    storage.saveLog(newLog);
    setLogs(storage.getLogs());
    setIsAdding(false);
    setNote('');
  };

  const handleDelete = (id: string) => {
    storage.deleteLog(id);
    setLogs(storage.getLogs());
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const logDate = new Date(log.timestamp).setHours(0, 0, 0, 0);
      const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

      if (start && logDate < start) return false;
      if (end && logDate > end) return false;
      return true;
    });
  }, [logs, startDate, endDate]);

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Catatan Menyusui</h2>
          <p className="text-xs text-gray-500">Total: {filteredLogs.length} catatan</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-full transition-all ${showFilters || startDate || endDate ? 'bg-pink-100 text-pink-600' : 'bg-white text-gray-400 border border-gray-100'}`}
          >
            <Filter size={20} />
          </button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-pink-500 text-white p-3 rounded-full shadow-lg shadow-pink-200 active:scale-90 transition-transform"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      {/* Date Filters UI */}
      {showFilters && (
        <div className="glass-card p-4 rounded-3xl border-pink-100 animate-fade-in space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-gray-600 uppercase">Filter Tanggal</span>
            {(startDate || endDate) && (
              <button
                onClick={resetFilters}
                className="text-[10px] text-pink-500 font-bold flex items-center gap-1"
              >
                <X size={12} /> Reset
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">Dari</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-gray-100 outline-none focus:border-pink-300"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">Sampai</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-gray-100 outline-none focus:border-pink-300"
              />
            </div>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="glass-card p-6 rounded-3xl shadow-md border-pink-100 animate-slide-up">
          <h3 className="font-bold text-gray-800 mb-4">Tambah Sesi Baru</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-pink-600 uppercase mb-2">
                Durasi (Menit)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full accent-pink-500"
                />
                <span className="font-bold text-pink-700 w-12">{duration}m</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-pink-600 uppercase mb-2">
                Sisi Payudara
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Left', 'Right', 'Both'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSide(s)}
                    className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                      side === s
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white text-gray-600 border-gray-100'
                    }`}
                  >
                    {s === 'Left' ? 'Kiri' : s === 'Right' ? 'Kanan' : 'Keduanya'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-pink-600 uppercase mb-2">
                Catatan Tambahan
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Misal: Bayi mengantuk, pelekatan bagus..."
                className="w-full p-3 rounded-xl border border-gray-100 outline-none text-sm h-20"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold"
              >
                Batal
              </button>
              <button
                onClick={handleAddLog}
                className="flex-1 py-3 rounded-xl bg-pink-500 text-white font-bold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-300">
              <Calendar size={40} />
            </div>
            <p className="text-gray-400">Tidak ada catatan pada rentang ini.</p>
            {(startDate || endDate) && (
              <button onClick={resetFilters} className="text-pink-500 text-sm font-bold mt-2">
                Hapus Filter
              </button>
            )}
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="glass-card p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow group border-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="bg-pink-100 text-pink-600 p-2.5 rounded-xl h-fit">
                    <Timer size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{log.duration} Menit</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} />{' '}
                      {new Date(log.timestamp).toLocaleString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <div className="mt-1 flex gap-2">
                      <span className="text-[10px] bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {log.side === 'Left'
                          ? 'Kiri'
                          : log.side === 'Right'
                            ? 'Kanan'
                            : 'Kedua Sisi'}
                      </span>
                    </div>
                    {log.note && <p className="mt-2 text-sm text-gray-600 italic">"{log.note}"</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrackerSection;
