
import React, { useState, useEffect } from 'react';
import { geminiService } from '../geminiService';
import { QuizQuestion, UserProfile } from '../types';
import { 
  Search, 
  Brain, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Award, 
  ArrowRight, 
  ChevronRight,
  Target,
  Trophy,
  RefreshCcw,
  BookOpen
} from 'lucide-react';

interface QuizViewProps {
  user: UserProfile | null;
}

const QuizView: React.FC<QuizViewProps> = ({ user }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (questions.length > 0 && !isFinished && !isLoading) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [questions.length, isFinished, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setTimer(0);
    try {
      // Pass academic context for better quiz generation
      const contextTopic = `${topic} (${user?.institutionType} Level: ${user?.year} in ${user?.department})`;
      const q = await geminiService.generateQuiz(contextTopic, difficulty);
      setQuestions(q);
      setCurrentIdx(0);
      setAnswers({});
      setIsFinished(false);
    } catch (error) {
      alert("Failed to generate quiz. Try a different topic.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (optionIdx: number) => {
    if (isFinished) return;
    setAnswers({ ...answers, [currentIdx]: optionIdx });
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++;
    });
    return (correct / questions.length) * 100;
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
        <div className="relative group">
          <div className="absolute -inset-8 bg-indigo-500/20 blur-[60px] rounded-full group-hover:bg-indigo-500/30 transition-all duration-1000 animate-pulse"></div>
          <div className="relative w-32 h-32 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
            <Brain className="w-16 h-16 text-indigo-600 animate-bounce" />
          </div>
          <Loader2 className="absolute -bottom-2 -right-2 w-10 h-10 text-indigo-600 animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-tight">Constructing Knowledge Matrix...</h2>
          <p className="text-slate-500 font-medium">Analyzing "{topic}" for {user?.year} level challenges</p>
        </div>
      </div>
    );
  }

  if (questions.length > 0 && !isFinished) {
    const q = questions[currentIdx];
    return (
      <div className="max-w-4xl mx-auto py-4 animate-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 dark:shadow-none">
              <BookOpen size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight">{topic}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  difficulty === 'Advanced' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30' : 
                  difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' : 
                  'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
                }`}>
                  {difficulty} Level
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Timer size={12} /> {formatTime(timer)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Progress: {currentIdx + 1}/{questions.length}</div>
            <div className="h-3 w-48 md:w-64 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 glass-panel p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl space-y-10">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest">Question {currentIdx + 1}</div>
              <h4 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">{q.question}</h4>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {q.options.map((opt, idx) => {
                const isSelected = answers[currentIdx] === idx;
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} className={`group relative flex items-center gap-5 p-6 rounded-[1.5rem] border-2 transition-all text-left overflow-hidden ${isSelected ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 scale-[1.02] shadow-lg shadow-indigo-100 dark:shadow-none' : 'border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white dark:bg-slate-900/40 hover:scale-[1.01]'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-lg transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={`text-lg font-medium transition-colors ${isSelected ? 'text-indigo-900 dark:text-indigo-100' : 'text-slate-700 dark:text-slate-300'}`}>{opt}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-6">
              <p className="text-xs text-slate-400 font-medium italic">Select the response aligned with {user?.department} standards.</p>
              <button onClick={nextQuestion} disabled={answers[currentIdx] === undefined} className="group relative px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-200 dark:shadow-none overflow-hidden">
                <div className="relative z-10 flex items-center gap-2">{currentIdx === questions.length - 1 ? 'Evaluate Result' : 'Next Challenge'} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></div>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 glass-panel rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-center">
              <h5 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Expert Mode</h5>
              <p className="text-xs font-bold text-slate-500 leading-relaxed">FlashMentor is adapting questions to the {user?.institutionType} level syllabus of {user?.department}.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const score = getScore();
    const isPassing = score >= 70;
    return (
      <div className="max-w-4xl mx-auto py-10 space-y-12 animate-in zoom-in-95 duration-700 text-center">
        <Trophy className={`w-24 h-24 ${isPassing ? 'text-amber-500' : 'text-slate-400'} mx-auto`} />
        <h2 className="text-5xl font-black tracking-tight">Assessment Over</h2>
        <div className="flex justify-center gap-4">
          <button onClick={() => { setQuestions([]); setTopic(''); }} className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 shadow-2xl transition-all">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
          <Brain size={14} /> Knowledge Validation Lab
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-none">
          Simulate. Analyze. <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Succeed.</span>
        </h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Tailored for {user?.year} students studying {user?.department} at {user?.institutionName}.
        </p>
      </div>

      <div className="glass-panel p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-2xl bg-white/40 dark:bg-slate-900/40 relative overflow-hidden group">
        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Research Topic</label>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={`Topic related to ${user?.department}...`} className="w-full pl-22 pr-8 py-7 rounded-[2.5rem] bg-white/60 dark:bg-slate-950 border-2 border-slate-50 dark:border-slate-800 focus:border-indigo-500 outline-none text-2xl font-black tracking-tight" />
            </div>
          </div>
          <button onClick={startQuiz} disabled={!topic.trim() || isLoading} className="w-full py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl hover:scale-[1.02] shadow-xl disabled:opacity-50 flex items-center justify-center gap-4">
            {isLoading ? <Loader2 className="animate-spin" size={32} /> : <Brain size={32} />}
            Initiate Assessment Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizView;
