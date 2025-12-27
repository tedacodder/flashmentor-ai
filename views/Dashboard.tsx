
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { Award, BookOpen, Clock, Zap, Target, ArrowUpRight, Sparkles, Brain, GraduationCap, School } from 'lucide-react';
import { UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile | null;
}

const studyData = [
  { date: 'Mon', minutes: 45, quizzes: 2 },
  { date: 'Tue', minutes: 120, quizzes: 5 },
  { date: 'Wed', minutes: 30, quizzes: 1 },
  { date: 'Thu', minutes: 85, quizzes: 3 },
  { date: 'Fri', minutes: 60, quizzes: 2 },
  { date: 'Sat', minutes: 150, quizzes: 6 },
  { date: 'Sun', minutes: 40, quizzes: 1 },
];

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#818cf8', '#6366f1', '#4f46e5'];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2">Welcome back, {user?.name.split(' ')[0]}! 👋</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            You're on a 5-day study streak. Keep the momentum going for {user?.institutionName}!
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-5 py-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50 rounded-2xl flex items-center gap-3">
             <div className="w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center text-white shadow-sm">
                <Zap size={18} fill="currentColor" />
             </div>
             <div>
                <p className="text-[10px] uppercase font-bold text-amber-600/60 dark:text-amber-400/60 tracking-widest leading-none">Daily Streak</p>
                <p className="text-lg font-black text-amber-700 dark:text-amber-400">5 Days</p>
             </div>
          </div>
          <div className="px-5 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                <Brain size={18} fill="currentColor" />
             </div>
             <div>
                <p className="text-[10px] uppercase font-bold text-indigo-600/60 dark:text-indigo-400/60 tracking-widest leading-none">Mastery Level</p>
                <p className="text-lg font-black text-indigo-700 dark:text-indigo-400">Lv. {user?.level}</p>
             </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Clock className="text-indigo-500" />} 
          label="Total Study Time" 
          value="12.5 hrs" 
          change="+15% vs last week"
          positive={true}
          bgColor="bg-indigo-50 dark:bg-indigo-900/20"
        />
        <StatCard 
          icon={<BookOpen className="text-purple-500" />} 
          label="Quizzes Mastered" 
          value="42" 
          change="+8 today"
          positive={true}
          bgColor="bg-purple-50 dark:bg-purple-900/20"
        />
        <StatCard 
          icon={<Award className="text-pink-500" />} 
          label="Concept Score" 
          value="84%" 
          change="+2.4%"
          positive={true}
          bgColor="bg-pink-50 dark:bg-pink-900/20"
        />
        <StatCard 
          icon={<Sparkles className="text-emerald-500" />} 
          label="XP Collected" 
          value={(user?.xp || 0) > 1000 ? `${((user?.xp || 0) / 1000).toFixed(1)}k` : user?.xp.toString() || '0'} 
          change="+450 today"
          positive={true}
          bgColor="bg-emerald-50 dark:bg-emerald-900/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold">Weekly Performance</h3>
              <p className="text-sm text-slate-500">Your engagement as a {user?.year} scholar</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
              {user?.institutionType === 'University' ? <GraduationCap size={16} /> : <School size={16} />}
              {user?.institutionName}
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e144" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dx={-10} />
                <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: 12 }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255,255,255,0.95)', padding: '12px 16px' }} itemStyle={{ fontWeight: 700, color: '#4f46e5' }} />
                <Bar dataKey="minutes" radius={[10, 10, 10, 10]} barSize={40}>
                  {studyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Target className="text-indigo-500" size={24} />
            Today's Focus
          </h3>
          <div className="space-y-8">
            <GoalItem label={`${user?.department} Review`} progress={100} completed={true} />
            <GoalItem label="Master Weekly Quiz" progress={65} />
            <GoalItem label="Personalized AI Tutor" progress={30} />
            <GoalItem label="Daily XP Goal (500)" progress={85} />
          </div>
          <button className="w-full mt-10 py-4 px-4 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-2xl font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all text-sm uppercase tracking-widest">
            View My {user?.institutionType === 'University' ? 'Major' : 'Stream'} Plan
          </button>
        </div>
      </div>

      <section className="pt-4">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-2xl font-black">AI Recommendations for {user?.department}</h3>
           <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Refresh Suggestions</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TopicCard title="Fundamentals" desc={`Core concepts for ${user?.year} students in ${user?.department}.`} img="https://picsum.photos/seed/fundamentals-univ/800/500" tag="Curriculum" />
          <TopicCard title="Advanced Concepts" desc="Take your knowledge beyond the classroom requirements." img="https://picsum.photos/seed/advanced-univ/800/500" tag="Expert" />
          <TopicCard title="Active Practice" desc="Daily challenges to boost your retention and exam confidence." img="https://picsum.photos/seed/practice-univ/800/500" tag="University Level" />
        </div>
      </section>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, change: string, positive: boolean, bgColor: string }> = ({ icon, label, value, change, positive, bgColor }) => (
  <div className="glass-panel p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:scale-[1.02] transition-all bg-white dark:bg-slate-900 group">
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 ${bgColor} rounded-2xl group-hover:scale-110 transition-transform`}>{icon}</div>
      <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-black">{value}</span>
      <span className={`text-xs ${positive ? 'text-emerald-500' : 'text-rose-500'} font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full`}>{change}</span>
    </div>
  </div>
);

const GoalItem: React.FC<{ label: string, progress: number, completed?: boolean }> = ({ label, progress, completed }) => (
  <div className="space-y-3 group cursor-pointer">
    <div className="flex justify-between items-center text-sm">
      <span className={`font-bold transition-all ${completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200 group-hover:text-indigo-600'}`}>{label}</span>
      <span className="text-[10px] font-black bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg text-slate-500">{progress}%</span>
    </div>
    <div className="h-2 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800">
      <div className={`h-full transition-all duration-1000 ${completed ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-600 to-indigo-400'}`} style={{ width: `${progress}%` }} />
    </div>
  </div>
);

const TopicCard: React.FC<{ title: string, desc: string, img: string, tag: string }> = ({ title, desc, img, tag }) => (
  <div className="group overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer shadow-sm hover:shadow-2xl">
    <div className="h-48 overflow-hidden relative">
      <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">{tag}</span>
      </div>
      <div className="absolute bottom-4 left-6 text-white">
        <h4 className="text-xl font-black">{title}</h4>
      </div>
    </div>
    <div className="p-6">
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{desc}</p>
      <div className="mt-6 flex items-center justify-between">
        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
