import {
  Activity,
  ArrowLeft,
  Baby,
  BookOpen,
  Brain,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit2,
  History,
  Home,
  MessageCircle,
  PlusCircle,
  Ruler,
  Scale,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import BMISection from './components/BMISection';
import ArticleContent from './components/ArticleContent';
import RecentReads from './components/RecentReads';
import TrackerSection from './components/TrackerSection';
import { EDUCATION_DATA, EducationCategory, getIcon, SubTopic } from './constants';
import { storage } from './services/storage';
import { AppTab, ChildProfile, GrowthEntry, ReadingHistoryEntry } from './types';

type GrowthTab = 'Weight' | 'Height' | 'Head';
type WeightIndicator = 'BB_Umur' | 'BB_TB' | 'IMT_Umur';

interface GrowthReferencePoint {
  age?: number;
  height?: number;
  min: number;
  med: number;
  max: number;
}

interface GrowthReferenceCollection {
  weight: GrowthReferencePoint[];
  height: GrowthReferencePoint[];
  head: GrowthReferencePoint[];
  bmi: GrowthReferencePoint[];
  weightForHeight: GrowthReferencePoint[];
}

interface GrowthUserPoint {
  age: number;
  height: number;
  weight: number;
  bmi: number;
  user: number;
}

const getPointCoordinate = (point: GrowthReferencePoint | GrowthUserPoint, key: 'age' | 'height') =>
  point[key] ?? 0;

// Rentang ringkas untuk visualisasi edukasi; bukan alat diagnosis atau tabel klinis lengkap.
const GROWTH_REFERENCE_RANGES: Record<ChildProfile['gender'], GrowthReferenceCollection> = {
  Boy: {
    weight: [
      { age: 0, min: 2.5, med: 3.3, max: 4.3 },
      { age: 6, min: 6.4, med: 7.9, max: 9.7 },
      { age: 12, min: 7.7, med: 9.6, max: 12.0 },
      { age: 24, min: 9.7, med: 12.2, max: 15.3 },
      { age: 36, min: 11.3, med: 14.3, max: 18.3 },
      { age: 48, min: 12.7, med: 16.3, max: 21.2 },
      { age: 60, min: 14.1, med: 18.3, max: 24.2 },
    ],
    height: [
      { age: 0, min: 46.1, med: 49.9, max: 53.7 },
      { age: 6, min: 63.3, med: 67.6, max: 71.9 },
      { age: 12, min: 71.0, med: 75.7, max: 80.5 },
      { age: 24, min: 81.0, med: 87.1, max: 93.2 },
      { age: 36, min: 88.7, med: 96.1, max: 103.5 },
      { age: 48, min: 94.9, med: 103.3, max: 111.7 },
      { age: 60, min: 100.7, med: 110.0, max: 119.2 },
    ],
    head: [
      { age: 0, min: 32.1, med: 34.5, max: 36.9 },
      { age: 12, min: 43.5, med: 46.1, max: 48.7 },
      { age: 24, min: 46.1, med: 48.3, max: 50.5 },
      { age: 60, min: 48.3, med: 50.8, max: 53.3 },
    ],
    bmi: [
      { age: 0, min: 11.2, med: 13.4, max: 15.8 },
      { age: 6, min: 14.5, med: 16.8, max: 19.2 },
      { age: 12, min: 15.0, med: 17.2, max: 19.6 },
      { age: 24, min: 14.2, med: 16.3, max: 18.5 },
      { age: 36, min: 13.6, med: 15.6, max: 17.8 },
      { age: 48, min: 13.1, med: 15.1, max: 17.4 },
      { age: 60, min: 12.8, med: 14.9, max: 17.2 },
    ],
    weightForHeight: [
      { height: 45, min: 1.8, med: 2.4, max: 3.1 },
      { height: 50, min: 2.6, med: 3.3, max: 4.1 },
      { height: 60, min: 4.9, med: 5.9, max: 7.3 },
      { height: 70, min: 7.2, med: 8.6, max: 10.4 },
      { height: 80, min: 9.2, med: 11.0, max: 13.1 },
      { height: 90, min: 11.3, med: 13.3, max: 15.9 },
      { height: 100, min: 13.4, med: 15.9, max: 19.3 },
      { height: 110, min: 16.0, med: 19.2, max: 23.6 },
      { height: 120, min: 19.2, med: 23.3, max: 28.7 },
    ],
  },
  Girl: {
    weight: [
      { age: 0, min: 2.4, med: 3.2, max: 4.2 },
      { age: 6, min: 5.8, med: 7.3, max: 9.2 },
      { age: 12, min: 7.0, med: 8.9, max: 11.5 },
      { age: 24, min: 9.0, med: 11.5, max: 14.8 },
      { age: 36, min: 10.8, med: 13.9, max: 18.1 },
      { age: 48, min: 12.3, med: 16.1, max: 21.0 },
      { age: 60, min: 13.7, med: 18.2, max: 24.3 },
    ],
    height: [
      { age: 0, min: 45.4, med: 49.1, max: 52.9 },
      { age: 6, min: 61.2, med: 65.7, max: 70.3 },
      { age: 12, min: 68.9, med: 74.0, max: 79.2 },
      { age: 24, min: 80.0, med: 85.7, max: 91.5 },
      { age: 36, min: 87.4, med: 95.1, max: 102.7 },
      { age: 48, min: 94.1, med: 102.7, max: 111.3 },
      { age: 60, min: 99.9, med: 109.4, max: 118.9 },
    ],
    head: [
      { age: 0, min: 31.7, med: 33.9, max: 36.1 },
      { age: 12, min: 42.2, med: 44.8, max: 47.4 },
      { age: 24, min: 44.8, med: 47.2, max: 49.6 },
      { age: 60, min: 47.5, med: 50.0, max: 52.5 },
    ],
    bmi: [
      { age: 0, min: 11.0, med: 13.2, max: 15.6 },
      { age: 6, min: 14.1, med: 16.3, max: 18.9 },
      { age: 12, min: 14.4, med: 16.7, max: 19.3 },
      { age: 24, min: 13.8, med: 15.9, max: 18.3 },
      { age: 36, min: 13.2, med: 15.2, max: 17.6 },
      { age: 48, min: 12.7, med: 14.7, max: 17.2 },
      { age: 60, min: 12.4, med: 14.5, max: 17.1 },
    ],
    weightForHeight: [
      { height: 45, min: 1.8, med: 2.3, max: 3.0 },
      { height: 50, min: 2.5, med: 3.2, max: 4.0 },
      { height: 60, min: 4.7, med: 5.7, max: 7.1 },
      { height: 70, min: 6.9, med: 8.4, max: 10.1 },
      { height: 80, min: 8.9, med: 10.7, max: 12.8 },
      { height: 90, min: 11.0, med: 13.0, max: 15.5 },
      { height: 100, min: 13.1, med: 15.5, max: 18.9 },
      { height: 110, min: 15.6, med: 18.8, max: 23.1 },
      { height: 120, min: 18.8, med: 22.8, max: 28.1 },
    ],
  },
};

const getGrowthLimits = (
  tab: GrowthTab,
  indicator: WeightIndicator,
  stdPoint: GrowthReferencePoint,
) => {
  if (!stdPoint) return { min: 0, max: 0 };
  const minVal = stdPoint.min; // -2 SD
  const medVal = stdPoint.med; // Median (0 SD)
  const maxDataset = stdPoint.max; // represents +2 SD

  const sdUpper = (maxDataset - medVal) / 2;

  let maxVal = maxDataset; // Default to +2 SD
  if (tab === 'Height') {
    maxVal = medVal + 3 * sdUpper; // +3 SD
  } else if (tab === 'Weight') {
    maxVal = medVal + sdUpper; // +1 SD
  } else if (tab === 'Head') {
    maxVal = maxDataset; // +2 SD
  }

  return { min: minVal, max: maxVal };
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  // Child Profile states
  const [children, setChildren] = useState<ChildProfile[]>(storage.getChildren());
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isEditingChild, setIsEditingChild] = useState(false);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);

  // Growth record addition state
  const [isAddingGrowth, setIsAddingGrowth] = useState(false);
  const [editingGrowthEntryId, setEditingGrowthEntryId] = useState<string | null>(null);
  const [isHistoryView, setIsHistoryView] = useState(false);
  const [growthTab, setGrowthTab] = useState<GrowthTab>('Weight');
  const [ageRange, setAgeRange] = useState<'0-2' | '2-5'>('0-2');
  const [weightIndicator, setWeightIndicator] = useState<WeightIndicator>('BB_TB');

  // Form states for child profile
  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');
  const [childGender, setChildGender] = useState<'Boy' | 'Girl'>('Boy');
  const [childIsPreterm, setChildIsPreterm] = useState(false);
  const [childBirthWeight, setChildBirthWeight] = useState('');
  const [childBirthHeight, setChildBirthHeight] = useState('');
  const [childBirthHead, setChildBirthHead] = useState('');

  // Form states for growth entry
  const [growthDate, setGrowthDate] = useState(new Date().toISOString().split('T')[0]);
  const [growthWeight, setGrowthWeight] = useState('');
  const [growthHeight, setGrowthHeight] = useState('');
  const [growthHead, setGrowthHead] = useState('');

  // Education navigation states
  const [selectedCategory, setSelectedCategory] = useState<EducationCategory | null>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<SubTopic | null>(null);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryEntry[]>(
    storage.getReadingHistory,
  );

  const summary = (() => {
    const logs = storage.getLogs();
    const today = new Date().toDateString();
    const todaysLogs = logs.filter((l) => new Date(l.timestamp).toDateString() === today);
    return {
      count: todaysLogs.length,
      totalTime: todaysLogs.reduce((acc, curr) => acc + curr.duration, 0),
    };
  })();

  const handleOpenTopic = async (category: EducationCategory, topic: SubTopic) => {
    const updatedHistory = await storage.saveReadingHistory({
      categoryId: category.id,
      subTopicId: topic.id,
      readAt: new Date().toISOString(),
    });
    setReadingHistory(updatedHistory);
    setSelectedCategory(category);
    setSelectedSubTopic(topic);
    setActiveTab(AppTab.EDUCATION);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const handleAddChild = async () => {
    if (!childName || !childBirthDate) return;

    const newChild: ChildProfile = {
      id: crypto.randomUUID(),
      name: childName,
      birthDate: childBirthDate,
      gender: childGender,
      isPreterm: childIsPreterm,
      birthWeight: parseFloat(childBirthWeight) || 0,
      birthHeight: parseFloat(childBirthHeight) || 0,
      birthHeadCircumference: parseFloat(childBirthHead) || 0,
      growthHistory: [], // Starts empty
    };

    if (isEditingChild && editingChildId) {
      const existing = children.find((c) => c.id === editingChildId);
      if (existing) {
        const updated = { ...newChild, id: editingChildId, growthHistory: existing.growthHistory };
        await storage.updateChild(updated);
        setChildren(children.map((c) => (c.id === editingChildId ? updated : c)));
      }
    } else {
      await storage.saveChild(newChild);
      setChildren([...children, newChild]);
    }

    setIsAddingChild(false);
    setIsEditingChild(false);
    setEditingChildId(null);
    resetChildForm();
  };

  const handleEditChild = (child: ChildProfile) => {
    setChildName(child.name);
    setChildBirthDate(child.birthDate);
    setChildGender(child.gender);
    setChildIsPreterm(child.isPreterm);
    setChildBirthWeight(child.birthWeight.toString());
    setChildBirthHeight(child.birthHeight.toString());
    setChildBirthHead(child.birthHeadCircumference.toString());
    setEditingChildId(child.id);
    setIsEditingChild(true);
    setIsAddingChild(true);
  };

  const handleDeleteChild = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmDelete = window.confirm('Hapus profil anak beserta seluruh riwayatnya?');
    if (confirmDelete) {
      await storage.deleteChild(id);
      setChildren(children.filter((c) => c.id !== id));
      if (selectedChild?.id === id) {
        setSelectedChild(null);
      }
    }
  };

  const handleAddGrowthRecord = async () => {
    if (!selectedChild || !growthDate) return;

    const entry: GrowthEntry = {
      id: editingGrowthEntryId || crypto.randomUUID(),
      date: growthDate,
      weight: parseFloat(growthWeight) || 0,
      height: parseFloat(growthHeight) || 0,
      headCircumference: parseFloat(growthHead) || 0,
    };

    const history = selectedChild.growthHistory || [];
    let updatedHistory;

    if (editingGrowthEntryId) {
      updatedHistory = history.map((h) => (h.id === editingGrowthEntryId ? entry : h));
    } else {
      updatedHistory = [...history, entry];
    }

    updatedHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const updatedChild = {
      ...selectedChild,
      growthHistory: updatedHistory,
    };

    await storage.updateChild(updatedChild);
    setChildren(children.map((c) => (c.id === updatedChild.id ? updatedChild : c)));
    setSelectedChild(updatedChild);
    setIsAddingGrowth(false);
    setEditingGrowthEntryId(null);
    setGrowthWeight('');
    setGrowthHeight('');
    setGrowthHead('');
    setGrowthDate(new Date().toISOString().split('T')[0]);
  };

  const handleEditGrowthEntry = (entry: GrowthEntry) => {
    setEditingGrowthEntryId(entry.id);
    setGrowthDate(entry.date);
    setGrowthWeight(entry.weight.toString());
    setGrowthHeight(entry.height.toString());
    setGrowthHead(entry.headCircumference.toString());
    setIsAddingGrowth(true);
    setIsHistoryView(false);
  };

  const handleDeleteGrowthEntry = async (id: string) => {
    if (!selectedChild) return;
    const confirmDelete = window.confirm('Hapus data perkembangan ini?');
    if (confirmDelete) {
      const updatedHistory = selectedChild.growthHistory.filter((h) => h.id !== id);
      const updatedChild = { ...selectedChild, growthHistory: updatedHistory };
      await storage.updateChild(updatedChild);
      setChildren(children.map((c) => (c.id === updatedChild.id ? updatedChild : c)));
      setSelectedChild(updatedChild);
    }
  };

  const resetChildForm = () => {
    setChildName('');
    setChildBirthDate('');
    setChildGender('Boy');
    setChildIsPreterm(false);
    setChildBirthWeight('');
    setChildBirthHeight('');
    setChildBirthHead('');
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-pink-500">
            Teman ASI
          </p>
          <h1 className="text-2xl font-black text-gray-800">Halo, Mama! 🌸</h1>
          <p className="text-gray-500 text-sm">Semangat mengASIhi hari ini.</p>
        </div>
        <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center border border-pink-100 shadow-sm">
          <img
            src="/images/brand/logo-teman-asi.png"
            alt="Logo Teman ASI"
            className="w-11 h-11 object-contain"
          />
        </div>
      </div>

      {/* Child Profiles Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Profil Anak</h3>
          <button
            onClick={() => setIsAddingChild(true)}
            className="flex items-center gap-1 text-pink-500 text-sm font-bold active:scale-95 transition-transform"
          >
            <PlusCircle size={16} /> Tambah Profil
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          {children.length === 0 ? (
            <div className="w-full text-center p-8 bg-white rounded-3xl border-2 border-dashed border-pink-100">
              <p className="text-gray-400 text-sm italic">Belum ada profil anak</p>
            </div>
          ) : (
            children.map((child) => {
              const age = calculateAge(child.birthDate);
              return (
                <div
                  key={child.id}
                  onClick={() => setSelectedChild(child)}
                  className="flex-shrink-0 w-48 glass-card p-5 rounded-[32px] border-white text-left active:scale-95 transition-all group relative"
                >
                  <div className="absolute top-4 right-4 flex flex-col gap-2 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditChild(child);
                      }}
                      className="p-1.5 bg-white/80 backdrop-blur-sm shadow-sm rounded-lg text-gray-500 hover:text-blue-500 active:scale-95 transition-transform"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteChild(child.id, e)}
                      className="p-1.5 bg-white/80 backdrop-blur-sm shadow-sm rounded-lg text-gray-500 hover:text-red-500 active:scale-95 transition-transform"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${child.gender === 'Boy' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}`}
                  >
                    <Baby size={28} />
                  </div>
                  <h4 className="font-bold text-gray-800 truncate pr-8">{child.name}</h4>
                  <p className="text-[10px] text-gray-500">
                    {age.years > 0 && `${age.years} thn `}
                    {age.months > 0 && `${age.months} bln `}
                    {`${age.days} hr`}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-pink-400 to-rose-400 p-5 rounded-3xl text-white shadow-lg shadow-pink-100">
          <div className="flex justify-between items-start mb-4">
            <Activity size={24} />
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">HARI INI</span>
          </div>
          <p className="text-3xl font-bold">{summary.count}</p>
          <p className="text-xs opacity-80">Sesi Menyusui</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-400 to-blue-400 p-5 rounded-3xl text-white shadow-lg shadow-blue-100">
          <div className="flex justify-between items-start mb-4">
            <Clock size={24} />
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">DURASI</span>
          </div>
          <p className="text-3xl font-bold">{summary.totalTime}</p>
          <p className="text-xs opacity-80">Total Menit</p>
        </div>
      </div>

      <RecentReads
        history={readingHistory}
        onOpen={handleOpenTopic}
        onBrowse={() => setActiveTab(AppTab.EDUCATION)}
      />
    </div>
  );

  const renderEducation = () => {
    if (selectedSubTopic && selectedCategory) {
      return (
        <div className="space-y-6 animate-fade-in pb-24">
          <button
            onClick={() => setSelectedSubTopic(null)}
            className="flex items-center gap-2 text-pink-500 font-bold"
          >
            <ArrowLeft size={20} /> Kembali
          </button>
          <ArticleContent category={selectedCategory} topic={selectedSubTopic} />
        </div>
      );
    }

    if (selectedCategory) {
      return (
        <div className="space-y-6 animate-fade-in pb-24">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-pink-500 font-bold"
          >
            <ArrowLeft size={20} /> Kembali
          </button>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="overflow-hidden rounded-3xl bg-pink-100">
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.imageAlt}
                  className="h-20 w-24 object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-800">{selectedCategory.title}</h2>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {selectedCategory.description}
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {selectedCategory.subTopics.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleOpenTopic(selectedCategory, sub)}
                  className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-100 text-left hover:shadow-md transition-shadow"
                >
                  <span className="font-bold text-gray-700">{sub.title}</span>
                  <ChevronRight size={20} className="text-pink-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in pb-24">
        <h2 className="text-2xl font-black text-gray-800">Materi Menyusui</h2>
        <div className="grid gap-4">
          {EDUCATION_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className="w-full overflow-hidden rounded-[32px] border border-gray-100 bg-white text-left transition-shadow hover:shadow-md group"
            >
              <img src={cat.image} alt={cat.imageAlt} className="h-36 w-full object-cover" />
              <div className="flex items-center gap-4 p-5">
                <div className="rounded-2xl bg-pink-50 p-3 text-pink-500 transition-colors group-hover:bg-pink-500 group-hover:text-white">
                  {getIcon(cat.icon)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-black text-gray-800">{cat.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-gray-400">{cat.description}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-pink-400">
                    {cat.subTopics.length} Submateri
                  </p>
                </div>
                <ChevronRight size={20} className="shrink-0 text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderConsultation = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-gray-800">Bantuan Offline</h2>

      <div className="glass-card p-8 rounded-[40px] text-center border-white">
        <div className="w-24 h-24 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
          <MessageCircle size={48} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Panduan Selalu Tersedia</h3>
        <p className="text-gray-500 text-sm leading-6">
          Seluruh materi, catatan menyusui, kalkulator, dan data pertumbuhan dapat digunakan tanpa
          koneksi internet. Buka menu Materi untuk mencari panduan yang dibutuhkan.
        </p>
      </div>

      <div className="rounded-3xl border border-amber-100 bg-amber-50 p-6 text-sm leading-6 text-amber-900">
        Materi aplikasi tidak menggantikan pemeriksaan tenaga kesehatan. Jika ibu atau bayi tampak
        sangat lemas, sulit bernapas, mengalami perdarahan, demam tinggi, atau kondisi darurat lain,
        segera cari pertolongan ke fasilitas kesehatan terdekat.
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24 px-5 pt-6 relative overflow-x-hidden">
      {/* Child Management Overlays */}
      {isAddingChild && (
        <div className="fixed inset-0 z-[100] bg-white animate-slide-up overflow-y-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setIsAddingChild(false)}
              className="p-2 bg-pink-50 text-pink-500 rounded-2xl"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-black text-gray-800">Tambah Profil Anak</h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 ml-1">NAMA LENGKAP</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full bg-pink-50/50 border border-pink-100/50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 ml-1">TANGGAL LAHIR</label>
              <input
                type="date"
                value={childBirthDate}
                onChange={(e) => setChildBirthDate(e.target.value)}
                className="w-full bg-pink-50/50 border border-pink-100/50 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 ml-1">JENIS KELAMIN</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setChildGender('Boy')}
                  className={`py-3 rounded-2xl font-bold transition-all ${childGender === 'Boy' ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-blue-50 text-blue-500 border border-blue-100'}`}
                >
                  Laki-laki
                </button>
                <button
                  onClick={() => setChildGender('Girl')}
                  className={`py-3 rounded-2xl font-bold transition-all ${childGender === 'Girl' ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-pink-50 text-pink-500 border border-pink-100'}`}
                >
                  Perempuan
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <h4 className="font-bold text-gray-800 text-sm">Lahir Prematur?</h4>
                <p className="text-[10px] text-gray-500">Aktifkan jika si kecil lahir prematur</p>
              </div>
              <button
                onClick={() => setChildIsPreterm(!childIsPreterm)}
                className={`w-12 h-7 rounded-full relative transition-colors ${childIsPreterm ? 'bg-pink-500' : 'bg-gray-300'}`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${childIsPreterm ? 'left-6' : 'left-1'}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400">BERAT (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  value={childBirthWeight}
                  onChange={(e) => setChildBirthWeight(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-xl px-3 py-3 outline-none text-center font-bold text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400">TINGGI (CM)</label>
                <input
                  type="number"
                  step="0.1"
                  value={childBirthHeight}
                  onChange={(e) => setChildBirthHeight(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-xl px-3 py-3 outline-none text-center font-bold text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400">LK (CM)</label>
                <input
                  type="number"
                  step="0.1"
                  value={childBirthHead}
                  onChange={(e) => setChildBirthHead(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-xl px-3 py-3 outline-none text-center font-bold text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleAddChild}
              className="w-full bg-pink-500 text-white font-black py-4 rounded-3xl shadow-xl shadow-pink-200 active:scale-95 transition-transform mt-4"
            >
              Simpan Profil
            </button>
          </div>
        </div>
      )}

      {activeTab === AppTab.DASHBOARD && selectedChild && (
        <div className="fixed inset-0 z-[100] bg-[#FAFAFA] animate-slide-right overflow-y-auto px-6 py-8 pb-32">
          {!isHistoryView && !isAddingGrowth ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedChild(null)}
                    className="p-2 bg-white text-gray-400 rounded-2xl shadow-sm"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div>
                    <h2 className="text-xl font-black text-gray-800">{selectedChild.name}</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Growth Tracker
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsHistoryView(true)}
                  className="p-3 bg-white text-pink-500 rounded-2xl shadow-sm active:scale-95 transition-transform"
                >
                  <History size={20} />
                </button>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-gray-100 p-1.5 rounded-3xl mb-4">
                {(
                  [
                    { id: 'Weight', icon: Scale, label: 'Berat' },
                    { id: 'Height', icon: Ruler, label: 'Tinggi' },
                    { id: 'Head', icon: Brain, label: 'LK' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setGrowthTab(t.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all ${growthTab === t.id ? 'bg-white text-pink-500 shadow-md' : 'text-gray-400'}`}
                  >
                    <t.icon size={18} />
                    <span className="text-sm">{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Age Range Filter for Weight and Height */}
              {(growthTab === 'Weight' || growthTab === 'Height') && (
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setAgeRange('0-2')}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter border transition-all ${ageRange === '0-2' ? 'bg-pink-50 text-pink-600 border-pink-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                  >
                    0-2 Tahun
                  </button>
                  <button
                    onClick={() => setAgeRange('2-5')}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter border transition-all ${ageRange === '2-5' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                  >
                    2-5 Tahun
                  </button>
                </div>
              )}

              {/* Sub-Indicators Specific for Weight tab in 0-2 and 2-5 years as requested */}
              {growthTab === 'Weight' && (
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                  {ageRange === '0-2' ? (
                    <>
                      <button
                        onClick={() => setWeightIndicator('BB_TB')}
                        className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-normal border transition-all ${weightIndicator === 'BB_TB' ? 'bg-pink-600 text-white border-pink-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                      >
                        BB / Tinggi Badan (PB)
                      </button>
                      <button
                        onClick={() => setWeightIndicator('IMT_Umur')}
                        className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-normal border transition-all ${weightIndicator === 'IMT_Umur' ? 'bg-pink-600 text-white border-pink-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                      >
                        IMT / Umur
                      </button>
                      <button
                        onClick={() => setWeightIndicator('BB_Umur')}
                        className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-normal border transition-all ${weightIndicator === 'BB_Umur' ? 'bg-pink-600 text-white border-pink-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                      >
                        BB / Umur
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setWeightIndicator('BB_Umur')}
                        className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-normal border transition-all ${weightIndicator === 'BB_Umur' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                      >
                        BB / Umur
                      </button>
                      <button
                        onClick={() => setWeightIndicator('BB_TB')}
                        className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-normal border transition-all ${weightIndicator === 'BB_TB' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                      >
                        BB / Tinggi Badan
                      </button>
                      <button
                        onClick={() => setWeightIndicator('IMT_Umur')}
                        className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-normal border transition-all ${weightIndicator === 'IMT_Umur' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                      >
                        IMT / Umur
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Chart Content */}
              <div className="glass-card p-6 rounded-[40px] border-white shadow-xl shadow-pink-50 mb-6 flex flex-col items-center">
                <div className="w-full h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={(() => {
                        const gender = selectedChild.gender;
                        const isWeightForHeight =
                          growthTab === 'Weight' && weightIndicator === 'BB_TB';
                        const isBmiForAge =
                          growthTab === 'Weight' && weightIndicator === 'IMT_Umur';

                        const birthWeight = parseFloat(selectedChild.birthWeight) || 3.0;
                        const birthHeight = parseFloat(selectedChild.birthHeight) || 50;
                        const birthBmi = birthWeight / Math.pow(birthHeight / 100, 2);

                        const birthEntry: GrowthUserPoint = {
                          age: 0,
                          height: birthHeight,
                          weight: birthWeight,
                          bmi: birthBmi,
                          user: isBmiForAge
                            ? birthBmi
                            : growthTab === 'Weight'
                              ? birthWeight
                              : growthTab === 'Height'
                                ? birthHeight
                                : parseFloat(selectedChild.birthHeadCircumference) || 34,
                        };

                        const history = selectedChild.growthHistory || [];
                        const userHistory: GrowthUserPoint[] = history.map((entry) => {
                          const birth = new Date(selectedChild.birthDate);
                          const entryDate = new Date(entry.date);
                          const monthAge =
                            (entryDate.getFullYear() - birth.getFullYear()) * 12 +
                            (entryDate.getMonth() - birth.getMonth());
                          const wt = entry.weight;
                          const ht = entry.height;
                          const calculatedBmi = wt / Math.pow(ht / 100, 2);
                          return {
                            age: monthAge,
                            height: ht,
                            weight: wt,
                            bmi: calculatedBmi,
                            user: isBmiForAge
                              ? calculatedBmi
                              : growthTab === 'Weight'
                                ? wt
                                : growthTab === 'Height'
                                  ? ht
                                  : entry.headCircumference,
                          };
                        });

                        const combinedUser: GrowthUserPoint[] = [birthEntry, ...userHistory];

                        let standardsFull: GrowthReferencePoint[];
                        if (growthTab === 'Weight') {
                          if (weightIndicator === 'BB_TB') {
                            standardsFull = GROWTH_REFERENCE_RANGES[gender].weightForHeight;
                          } else if (weightIndicator === 'IMT_Umur') {
                            standardsFull = GROWTH_REFERENCE_RANGES[gender].bmi;
                          } else {
                            standardsFull = GROWTH_REFERENCE_RANGES[gender].weight;
                          }
                        } else if (growthTab === 'Height') {
                          standardsFull = GROWTH_REFERENCE_RANGES[gender].height;
                        } else {
                          standardsFull = GROWTH_REFERENCE_RANGES[gender].head;
                        }

                        const xKey = isWeightForHeight ? 'height' : 'age';

                        // Filter standards based on ageRange
                        let standards = standardsFull;
                        if (growthTab !== 'Head') {
                          if (isWeightForHeight) {
                            if (ageRange === '0-2') {
                              standards = standardsFull.filter((s) => (s.height ?? 0) <= 95);
                            } else {
                              standards = standardsFull.filter((s) => (s.height ?? 0) >= 80);
                            }
                          } else {
                            if (ageRange === '0-2') {
                              standards = standardsFull.filter((s) => (s.age ?? 0) <= 24);
                            } else {
                              standards = standardsFull.filter((s) => (s.age ?? 0) >= 24);
                            }
                          }
                        }

                        const filteredUser = combinedUser.filter((u) => {
                          if (isWeightForHeight) {
                            if (ageRange === '0-2') return u.height <= 95;
                            return u.height >= 80 && u.height <= 125;
                          } else {
                            if (growthTab === 'Head') return true;
                            if (ageRange === '0-2') return u.age <= 24;
                            return u.age >= 24 && u.age <= 60;
                          }
                        });

                        // Create a unified list of unique coordinates
                        const xValuesSet = new Set<number>();
                        standards.forEach((s) => {
                          const v = getPointCoordinate(s, xKey);
                          if (typeof v === 'number') xValuesSet.add(v);
                        });
                        filteredUser.forEach((u) => {
                          const v = getPointCoordinate(u, xKey);
                          if (typeof v === 'number') xValuesSet.add(v);
                        });

                        const sortedXValues = Array.from(xValuesSet).sort((a, b) => a - b);

                        const getInterpolated = (xVal: number) => {
                          if (standards.length === 0) return { min: 0, med: 0, max: 0 };
                          const sortedStds = [...standards].sort(
                            (a, b) => getPointCoordinate(a, xKey) - getPointCoordinate(b, xKey),
                          );

                          const first = sortedStds[0];
                          const firstX = getPointCoordinate(first, xKey);
                          if (xVal <= firstX) {
                            return { min: first.min, med: first.med, max: first.max };
                          }

                          const last = sortedStds[sortedStds.length - 1];
                          const lastX = getPointCoordinate(last, xKey);
                          if (xVal >= lastX) {
                            return { min: last.min, med: last.med, max: last.max };
                          }

                          for (let i = 0; i < sortedStds.length - 1; i++) {
                            const p1 = sortedStds[i];
                            const p2 = sortedStds[i + 1];
                            const x1 = getPointCoordinate(p1, xKey);
                            const x2 = getPointCoordinate(p2, xKey);
                            if (xVal >= x1 && xVal <= x2) {
                              if (x1 === x2) return { min: p1.min, med: p1.med, max: p1.max };
                              const ratio = (xVal - x1) / (x2 - x1);
                              return {
                                min: p1.min + ratio * (p2.min - p1.min),
                                med: p1.med + ratio * (p2.med - p1.med),
                                max: p1.max + ratio * (p2.max - p1.max),
                              };
                            }
                          }
                          return { min: last.min, med: last.med, max: last.max };
                        };

                        const findUserValue = (xVal: number) => {
                          const matches = filteredUser.filter(
                            (u) => getPointCoordinate(u, xKey) === xVal,
                          );
                          if (matches.length > 0) {
                            return matches[matches.length - 1].user;
                          }
                          return undefined;
                        };

                        return sortedXValues.map((xVal: number) => {
                          const interpolated = getInterpolated(xVal);
                          const limits = getGrowthLimits(growthTab, weightIndicator, interpolated);
                          return {
                            [xKey]: xVal,
                            standard: interpolated.med,
                            min: limits.min,
                            max: limits.max,
                            user: findUserValue(xVal),
                          };
                        });
                      })()}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                      <XAxis
                        dataKey={
                          growthTab === 'Weight' && weightIndicator === 'BB_TB' ? 'height' : 'age'
                        }
                        type="number"
                        domain={
                          growthTab === 'Weight' && weightIndicator === 'BB_TB'
                            ? [45, 'auto']
                            : [0, 'auto']
                        }
                        label={{
                          value:
                            growthTab === 'Weight' && weightIndicator === 'BB_TB'
                              ? 'Tinggi (cm)'
                              : 'Umur (Bulan)',
                          position: 'insideBottom',
                          offset: -5,
                          fontSize: 10,
                          fontWeight: 'bold',
                          fill: '#94A3B8',
                        }}
                        fontSize={10}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        fontSize={10}
                        axisLine={false}
                        tickLine={false}
                        label={{
                          value:
                            growthTab === 'Weight' && weightIndicator === 'IMT_Umur'
                              ? 'IMT (kg/m²)'
                              : growthTab === 'Weight'
                                ? 'Berat (kg)'
                                : growthTab === 'Height'
                                  ? 'Tinggi (cm)'
                                  : 'LK (cm)',
                          angle: -90,
                          position: 'insideLeft',
                          style: {
                            textAnchor: 'middle',
                            fontSize: 10,
                            fontWeight: 'bold',
                            fill: '#94A3B8',
                          },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '20px',
                          border: 'none',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                          fontSize: '11px',
                        }}
                        itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                      />
                      <Legend
                        iconType="circle"
                        wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold' }}
                      />

                      {/* standard targets overlayed beautifully */}
                      <Line
                        type="monotone"
                        dataKey="standard"
                        stroke="#64748B"
                        strokeWidth={2.5}
                        name="Median Referensi"
                        dot={false}
                        connectNulls={true}
                        zIndex={5}
                      />
                      <Line
                        type="monotone"
                        dataKey="max"
                        stroke="#10B981"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        name={`Batas Atas Normal (+${growthTab === 'Height' ? '3' : growthTab === 'Weight' ? '1' : '2'} SD)`}
                        dot={false}
                        connectNulls={true}
                        zIndex={4}
                      />
                      <Line
                        type="monotone"
                        dataKey="min"
                        stroke="#EF4444"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        name="Batas Bawah Normal (-2 SD)"
                        dot={false}
                        connectNulls={true}
                        zIndex={4}
                      />

                      {/* user child line highlighting */}
                      <Line
                        type="monotone"
                        dataKey="user"
                        stroke={selectedChild.gender === 'Girl' ? '#EC4899' : '#0284C7'}
                        strokeWidth={5}
                        name="Si Kecil"
                        dot={{
                          r: 6,
                          fill: selectedChild.gender === 'Girl' ? '#EC4899' : '#0284C7',
                          strokeWidth: 2,
                          stroke: '#FFF',
                        }}
                        activeDot={{ r: 8 }}
                        connectNulls={true}
                        zIndex={10}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Notification */}
              <div
                className={`p-6 rounded-[32px] border-2 flex items-start gap-4 mb-6 ${(() => {
                  const history = selectedChild.growthHistory || [];
                  const head =
                    history.length > 0
                      ? history[history.length - 1]
                      : {
                          weight: selectedChild.birthWeight,
                          height: selectedChild.birthHeight,
                          headCircumference: selectedChild.birthHeadCircumference,
                          date: selectedChild.birthDate,
                        };
                  const birth = new Date(selectedChild.birthDate);
                  const lastDate = new Date(head.date);
                  const lastAge =
                    (lastDate.getFullYear() - birth.getFullYear()) * 12 +
                    (lastDate.getMonth() - birth.getMonth());

                  let standardsFull: GrowthReferencePoint[];
                  if (growthTab === 'Weight') {
                    if (weightIndicator === 'BB_TB') {
                      standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].weightForHeight;
                    } else if (weightIndicator === 'IMT_Umur') {
                      standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].bmi;
                    } else {
                      standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].weight;
                    }
                  } else if (growthTab === 'Height') {
                    standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].height;
                  } else {
                    standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].head;
                  }

                  // Find closest standard point
                  let std: GrowthReferencePoint;
                  let val: number;

                  if (growthTab === 'Weight' && weightIndicator === 'BB_TB') {
                    const currentHeight = head.height || selectedChild.birthHeight;
                    std = standardsFull.reduce((prev, curr) =>
                      Math.abs((curr.height ?? 0) - currentHeight) <
                      Math.abs((prev.height ?? 0) - currentHeight)
                        ? curr
                        : prev,
                    );
                    val = head.weight || selectedChild.birthWeight;
                  } else {
                    std = standardsFull.reduce((prev, curr) =>
                      Math.abs((curr.age ?? 0) - lastAge) < Math.abs((prev.age ?? 0) - lastAge)
                        ? curr
                        : prev,
                    );
                    if (growthTab === 'Weight') {
                      if (weightIndicator === 'IMT_Umur') {
                        const ht = head.height || selectedChild.birthHeight;
                        const wt = head.weight || selectedChild.birthWeight;
                        val = wt / Math.pow(ht / 100, 2);
                      } else {
                        val = head.weight || selectedChild.birthWeight;
                      }
                    } else if (growthTab === 'Height') {
                      val = head.height || selectedChild.birthHeight;
                    } else {
                      val = head.headCircumference || selectedChild.birthHeadCircumference;
                    }
                  }

                  const limits = getGrowthLimits(growthTab, weightIndicator, std);
                  if (val < limits.min) return 'bg-orange-50 border-orange-100 text-orange-600';
                  if (val > limits.max) return 'bg-blue-50 border-blue-100 text-blue-600';
                  return 'bg-green-50 border-green-100 text-green-600';
                })()}`}
              >
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Status Perkembangan</h4>
                  <p className="text-xs leading-relaxed opacity-80">
                    {(() => {
                      const history = selectedChild.growthHistory || [];
                      const head =
                        history.length > 0
                          ? history[history.length - 1]
                          : {
                              weight: selectedChild.birthWeight,
                              height: selectedChild.birthHeight,
                              headCircumference: selectedChild.birthHeadCircumference,
                              date: selectedChild.birthDate,
                            };
                      const birth = new Date(selectedChild.birthDate);
                      const lastDate = new Date(head.date);
                      const lastAge =
                        (lastDate.getFullYear() - birth.getFullYear()) * 12 +
                        (lastDate.getMonth() - birth.getMonth());

                      let standardsFull: GrowthReferencePoint[];
                      if (growthTab === 'Weight') {
                        if (weightIndicator === 'BB_TB') {
                          standardsFull =
                            GROWTH_REFERENCE_RANGES[selectedChild.gender].weightForHeight;
                        } else if (weightIndicator === 'IMT_Umur') {
                          standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].bmi;
                        } else {
                          standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].weight;
                        }
                      } else if (growthTab === 'Height') {
                        standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].height;
                      } else {
                        standardsFull = GROWTH_REFERENCE_RANGES[selectedChild.gender].head;
                      }

                      let std: GrowthReferencePoint;
                      let val: number;
                      let label: string;

                      if (growthTab === 'Weight' && weightIndicator === 'BB_TB') {
                        const currentHeight = head.height || selectedChild.birthHeight;
                        std = standardsFull.reduce((prev, curr) =>
                          Math.abs((curr.height ?? 0) - currentHeight) <
                          Math.abs((prev.height ?? 0) - currentHeight)
                            ? curr
                            : prev,
                        );
                        val = head.weight || selectedChild.birthWeight;
                        label = 'berat badan menurut tinggi badan (BB/TB)';
                      } else {
                        std = standardsFull.reduce((prev, curr) =>
                          Math.abs((curr.age ?? 0) - lastAge) < Math.abs((prev.age ?? 0) - lastAge)
                            ? curr
                            : prev,
                        );
                        if (growthTab === 'Weight') {
                          if (weightIndicator === 'IMT_Umur') {
                            const ht = head.height || selectedChild.birthHeight;
                            const wt = head.weight || selectedChild.birthWeight;
                            val = wt / Math.pow(ht / 100, 2);
                            label = 'indeks massa tubuh menurut umur (IMT/U)';
                          } else {
                            val = head.weight || selectedChild.birthWeight;
                            label = 'berat badan menurut umur (BB/U)';
                          }
                        } else if (growthTab === 'Height') {
                          val = head.height || selectedChild.birthHeight;
                          label = 'tinggi badan menurut umur (TB/U)';
                        } else {
                          val = head.headCircumference || selectedChild.birthHeadCircumference;
                          label = 'lingkar kepala menurut umur (LK/U)';
                        }
                      }

                      const valFormatted = typeof val === 'number' ? val.toFixed(1) : val;
                      const ageText =
                        growthTab === 'Weight' && weightIndicator === 'BB_TB'
                          ? `tinggi ${std.height} cm`
                          : `usia ${std.age} bulan`;

                      const limits = getGrowthLimits(growthTab, weightIndicator, std);
                      if (val < limits.min)
                        return `${label} si Kecil (${valFormatted}) berada di bawah rentang referensi ringkas untuk ${ageText}. Konsultasikan hasil pengukuran ke bidan atau dokter untuk penilaian yang tepat.`;
                      if (val > limits.max)
                        return `${label} si Kecil (${valFormatted}) berada di atas rentang referensi ringkas untuk ${ageText}. Konsultasikan hasil pengukuran ke bidan atau dokter untuk penilaian yang tepat.`;
                      return `${label} si Kecil (${valFormatted}) berada di dalam rentang referensi ringkas untuk ${ageText}. Tetap pantau pertumbuhan secara rutin bersama tenaga kesehatan.`;
                    })()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAddingGrowth(true)}
                className="w-full bg-pink-500 text-white font-black py-5 rounded-[32px] shadow-xl shadow-pink-100 active:scale-95 transition-transform flex items-center justify-center gap-3"
              >
                <PlusCircle size={24} />
                Catat Perkembangan Baru
              </button>
            </>
          ) : isHistoryView ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setIsHistoryView(false)}
                  className="p-2 bg-white text-gray-400 rounded-2xl shadow-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-black text-gray-800">Riwayat Pengisian</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-pink-50 p-5 rounded-3xl border border-pink-100 text-pink-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black tracking-widest uppercase">
                      CATATAN LAHIR
                    </span>
                    <span className="text-[10px] font-bold">{selectedChild.birthDate}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-[10px] opacity-70">BERAT</p>
                      <p className="font-black">{selectedChild.birthWeight} kg</p>
                    </div>
                    <div>
                      <p className="text-[10px] opacity-70">TINGGI</p>
                      <p className="font-black">{selectedChild.birthHeight} cm</p>
                    </div>
                    <div>
                      <p className="text-[10px] opacity-70">LK</p>
                      <p className="font-black">{selectedChild.birthHeadCircumference} cm</p>
                    </div>
                  </div>
                </div>

                {(() => {
                  const history = selectedChild.growthHistory || [];
                  return history
                    .slice()
                    .reverse()
                    .map((record) => (
                      <div
                        key={record.id}
                        className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                            UPDATE RUTIN
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditGrowthEntry(record)}
                              className="p-1.5 bg-blue-50 text-blue-500 rounded-lg active:scale-95 transition-transform"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteGrowthEntry(record.id)}
                              className="p-1.5 bg-red-50 text-red-500 rounded-lg active:scale-95 transition-transform"
                            >
                              <Trash2 size={12} />
                            </button>
                            <span className="text-[10px] font-bold text-gray-500 ml-1">
                              {record.date}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-[10px] text-gray-400">BERAT</p>
                            <p className="font-black text-gray-700">{record.weight} kg</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400">TINGGI</p>
                            <p className="font-black text-gray-700">{record.height} cm</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400">LK</p>
                            <p className="font-black text-gray-700">
                              {record.headCircumference} cm
                            </p>
                          </div>
                        </div>
                      </div>
                    ));
                })()}

                {(selectedChild.growthHistory || []).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 italic text-sm">Belum ada pembaruan data rutin.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-slide-up">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => {
                    setIsAddingGrowth(false);
                    setEditingGrowthEntryId(null);
                    setGrowthDate(new Date().toISOString().split('T')[0]);
                    setGrowthWeight('');
                    setGrowthHeight('');
                    setGrowthHead('');
                  }}
                  className="p-2 bg-white text-gray-400 rounded-2xl shadow-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-black text-gray-800">
                  {editingGrowthEntryId ? 'Ubah Data' : 'Tambah Data Baru'}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 ml-1">TANGGAL PENGECEKAN</label>
                  <input
                    type="date"
                    value={growthDate}
                    onChange={(e) => setGrowthDate(e.target.value)}
                    className="w-full bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 outline-none font-bold text-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">BERAT BADAN (KG)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={growthWeight}
                      onChange={(e) => setGrowthWeight(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 font-black text-xl text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      TINGGI BADAN (CM)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={growthHeight}
                      onChange={(e) => setGrowthHeight(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 font-black text-xl text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      LINGKAR KEPALA (CM)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={growthHead}
                      onChange={(e) => setGrowthHead(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 font-black text-xl text-gray-700"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddGrowthRecord}
                  className="w-full bg-pink-500 text-white font-black py-5 rounded-[32px] shadow-xl shadow-pink-200 active:scale-95 transition-transform mt-8"
                >
                  Simpan Data Perkembangan
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === AppTab.DASHBOARD && renderDashboard()}
      {activeTab === AppTab.EDUCATION && renderEducation()}
      {activeTab === AppTab.TRACKER && <TrackerSection />}
      {activeTab === AppTab.HEALTH && <BMISection />}
      {activeTab === AppTab.CONSULTATION && renderConsultation()}

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-card border-white/50 shadow-2xl rounded-[32px] px-2 py-3 flex items-center justify-around z-50">
        {[
          { tab: AppTab.DASHBOARD, icon: Home, label: 'Beranda' },
          { tab: AppTab.EDUCATION, icon: BookOpen, label: 'Materi' },
          { tab: AppTab.TRACKER, icon: Activity, label: 'Tracker' },
          { tab: AppTab.HEALTH, icon: Calculator, label: 'IMT' },
          { tab: AppTab.CONSULTATION, icon: MessageCircle, label: 'Bantuan' },
        ].map(({ tab, icon: Icon, label }) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab !== AppTab.EDUCATION) {
                setSelectedCategory(null);
                setSelectedSubTopic(null);
              }
            }}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${activeTab === tab ? 'text-pink-500' : 'text-gray-400'}`}
          >
            <Icon size={22} strokeWidth={activeTab === tab ? 3 : 2} />
            <span className="text-[10px] font-bold">{label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-right { animation: slideRight 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;
