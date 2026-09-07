import React, { useState } from 'react';
import { storage } from '../services/storage';
import { BMIData } from '../types';
import { Calculator, History } from 'lucide-react';

const BMISection: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [history, setHistory] = useState<BMIData[]>(storage.getBMIData);
  const [result, setResult] = useState<BMIData | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // to meters
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category: string;
      if (bmi < 18.5) category = 'Kekurangan Berat Badan';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Kelebihan Berat Badan';
      else category = 'Obesitas';

      const newData: BMIData = {
        weight: w,
        height: parseFloat(height),
        bmi,
        category,
        date: new Date().toLocaleDateString('id-ID'),
      };

      setResult(newData);
      storage.saveBMI(newData);
      setHistory(storage.getBMIData());
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className="glass-card p-6 rounded-3xl shadow-sm border-pink-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
            <Calculator size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Kalkulator IMT</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Berat Badan (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 rounded-2xl border border-pink-100 focus:ring-2 focus:ring-pink-300 outline-none"
              placeholder="e.g. 55"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tinggi Badan (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 rounded-2xl border border-pink-100 focus:ring-2 focus:ring-pink-300 outline-none"
              placeholder="e.g. 160"
            />
          </div>
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-2xl transition-all active:scale-95"
        >
          Hitung Sekarang
        </button>

        {result && (
          <div className="mt-6 p-4 bg-pink-50 rounded-2xl border border-pink-100 text-center animate-bounce-subtle">
            <p className="text-sm text-pink-600 font-medium">Hasil IMT Anda:</p>
            <p className="text-4xl font-black text-pink-700 my-1">{result.bmi}</p>
            <p className="text-lg font-semibold text-pink-800">{result.category}</p>
            <p className="text-xs text-pink-500 mt-2 italic">
              *Catatan: Ibu menyusui memerlukan asupan kalori yang cukup. Jangan melakukan diet
              ketat tanpa pengawasan dokter.
            </p>
          </div>
        )}
      </div>

      <div className="glass-card p-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <History className="text-gray-400" size={20} />
          <h3 className="font-bold text-gray-700">Riwayat Pengukuran</h3>
        </div>

        {history.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4 italic">Belum ada riwayat</p>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((h, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-50"
              >
                <div>
                  <p className="font-bold text-gray-800">
                    {h.bmi}{' '}
                    <span className="text-xs font-normal text-gray-500">({h.category})</span>
                  </p>
                  <p className="text-xs text-gray-400">{h.date}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {h.weight}kg / {h.height}cm
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BMISection;
