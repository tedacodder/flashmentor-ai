
import React, { useState } from 'react';
import { geminiService } from '../geminiService';
import { Flashcard, UserProfile } from '../types';
import { 
  Sparkles, 
  Loader2, 
  Plus, 
  RotateCw, 
  Check, 
  X, 
  Bookmark, 
  FileText, 
  Brain, 
  ChevronRight,
  ChevronLeft,
  Zap,
  Layers,
  Clock,
  Layout
} from 'lucide-react';

interface FlashcardsViewProps {
  user: UserProfile | null;
}

const FlashcardsView: React.FC<FlashcardsViewProps> = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'create' | 'study'>('create');

  const generateCards = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const newCards = await geminiService.generateFlashcards(inputText);
      setCards(newCards);
      setMode('study');
      setCurrentIdx(0);
      setIsFlipped(false);
    } catch (error) {
      alert("Error generating cards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextCard = () => {
    if (currentIdx < cards.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setIsFlipped(false);
    } else {
      alert("Session complete! Great job reviewing.");
      setMode('create');
    }
  };

  const prevCard = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  if (mode === 'study' && cards.length > 0) {
    const card = cards[currentIdx];
    const progress = ((currentIdx + 1) / cards.length) * 100;

    return (
      <div className="max-w-4xl mx-auto py-8 space-y-12 animate-in fade-in duration-700">
        <div className="flex items-center justify-between">
          <button onClick={() => setMode('create')} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-2xl text-sm font-black transition-all">
            <Layout size={18} className="inline mr-2" /> Return to Foundry
          </button>
          <div className="text-center">
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-1">{user?.department} Scholar</div>
             <h2 className="text-2xl font-black">Active Study Mode</h2>
          </div>
          <button className="p-3 bg-white dark:bg-slate-900 border rounded-2xl text-slate-400 hover:text-amber-500 transition-all"><Bookmark size={20} /></button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
             <p className="text-sm font-bold">Concept {currentIdx + 1} of {cards.length}</p>
             <p className="text-xs font-black text-emerald-500 uppercase">{Math.round(progress)}% Complete</p>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 shadow-lg" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="relative group max-w-2xl mx-auto">
          <div className="perspective-2000 h-[480px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-full transition-all duration-1000 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 backface-hidden glass-panel rounded-[3rem] border shadow-2xl flex flex-col items-center justify-center p-14 text-center bg-white dark:bg-slate-900">
                <h3 className="text-4xl font-black leading-tight text-slate-900 dark:text-white">{card.front}</h3>
                <p className="mt-8 text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Click to Reveal Answer</p>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel rounded-[3rem] border shadow-2xl flex flex-col items-center justify-center p-14 text-center bg-indigo-50/50 dark:bg-indigo-950/50">
                <p className="text-2xl font-bold leading-relaxed text-slate-800 dark:text-slate-200">{card.back}</p>
                <p className="mt-8 text-xs font-black text-indigo-400 uppercase tracking-widest">Click to Flip Back</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <ReviewButton onClick={nextCard} icon={<X size={32} />} label="Uncertain" color="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white" shadow="shadow-rose-100" />
          <ReviewButton onClick={nextCard} icon={<Check size={32} />} label="Mastered" color="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white" shadow="shadow-emerald-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-6">
        <Sparkles className="mx-auto text-purple-600" size={32} />
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-tight">
          Summarize into <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Knowledge.</span>
        </h2>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          Built for the {user?.department} curriculum at {user?.institutionName}.
        </p>
      </div>

      <div className="glass-panel p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Paste your ${user?.department} notes here...`}
          className="w-full h-80 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-purple-500 outline-none resize-none transition-all text-xl font-medium"
        />
        <div className="mt-10 flex justify-end">
          <button onClick={generateCards} disabled={!inputText.trim() || isLoading} className="px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-[2rem] font-black text-xl hover:scale-[1.05] shadow-xl disabled:opacity-50 flex items-center gap-3 transition-all">
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
            Synthesize Flashcards
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewButton: React.FC<{ onClick: () => void, icon: React.ReactNode, label: string, color: string, shadow: string }> = ({ onClick, icon, label, color, shadow }) => (
  <div className="flex flex-col items-center gap-3">
    <button onClick={(e) => { e.stopPropagation(); onClick(); }} className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-xl ${shadow} ${color} border-2 border-transparent`}>{icon}</button>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
  </div>
);

export default FlashcardsView;
