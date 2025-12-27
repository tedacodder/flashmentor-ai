
import React, { useState } from 'react';
import { Award, Star, Zap, Book, Users, Edit3, ShieldCheck, MapPin, GraduationCap, School, Check, X, Building2 } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile | null;
  onUpdate?: (updates: Partial<UserProfile>) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>(user || {});

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editForm);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(user || {});
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="relative glass-panel rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900">
        <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="px-12 pb-12 pt-0 -mt-16 flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="relative">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
              className="w-40 h-40 rounded-full border-8 border-white dark:border-slate-900 shadow-2xl object-cover bg-indigo-50" 
              alt="Profile" 
            />
            <div className="absolute bottom-2 right-2 p-3 bg-indigo-600 rounded-full border-4 border-white dark:border-slate-900 text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4 pt-16 md:pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="text-lg font-black bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 outline-none w-full focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Academic Track</label>
                    <select 
                      value={editForm.institutionType} 
                      onChange={(e) => setEditForm({...editForm, institutionType: e.target.value as any})}
                      className="text-sm font-bold bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none w-full focus:border-indigo-500 transition-all"
                    >
                      <option value="University">University</option>
                      <option value="High School">High School</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Institution</label>
                    <input 
                      type="text" 
                      value={editForm.institutionName} 
                      onChange={(e) => setEditForm({...editForm, institutionName: e.target.value})}
                      className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none w-full text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Current Year</label>
                    <select 
                      value={editForm.year} 
                      onChange={(e) => setEditForm({...editForm, year: e.target.value})}
                      className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none w-full text-sm font-bold"
                    >
                      {editForm.institutionType === 'University' ? (
                        ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student'].map(y => <option key={y} value={y}>{y}</option>)
                      ) : (
                        ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(y => <option key={y} value={y}>{y}</option>)
                      )}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Department / Stream</label>
                    <input 
                      type="text" 
                      value={editForm.department} 
                      onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                      className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none w-full text-sm font-bold"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">{user?.name}</h2>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-slate-500 font-medium mb-4">
                  <span className="flex items-center justify-center md:justify-start gap-1.5">
                    {user?.institutionType === 'University' ? <GraduationCap size={18} /> : <School size={18} />}
                    {user?.year} • {user?.department}
                  </span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="flex items-center justify-center md:justify-start gap-1.5">
                    <MapPin size={18} />
                    {user?.institutionName}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-bold flex items-center gap-2">
                    <Star size={14} /> Level {user?.level}
                  </span>
                  <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-sm font-bold">
                    {user?.xp.toLocaleString()} Total XP
                  </span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                >
                  <Check size={18} /> Save
                </button>
                <button 
                  onClick={cancelEdit}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-bold flex items-center gap-2 transition-all"
                >
                  <X size={18} /> Cancel
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-bold flex items-center gap-2 transition-all"
              >
                <Edit3 size={18} /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold px-4">Badges & Achievements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <BadgeItem name="Early Bird" icon={<Zap className="text-amber-500" />} unlocked={true} />
            <BadgeItem name="Quiz Master" icon={<Award className="text-indigo-500" />} unlocked={true} />
            <BadgeItem name="Flash Genius" icon={<Star className="text-purple-500" />} unlocked={true} />
            <BadgeItem name="Consistency" icon={<Book className="text-emerald-500" />} unlocked={true} />
            <BadgeItem name="Collaborator" icon={<Users className="text-pink-500" />} unlocked={false} />
            <BadgeItem name="Deep Thinker" icon={<Zap className="text-rose-500" />} unlocked={false} />
          </div>

          <div className="p-8 glass-panel rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h4 className="font-bold mb-6 text-xl">Academic Progress</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600">
                    <Book size={20} />
                  </div>
                  <div>
                    <p className="font-bold">{user?.department} Mastery</p>
                    <p className="text-xs text-slate-500">Based on recent quizzes</p>
                  </div>
                </div>
                <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <div className="w-[84%] h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h4 className="font-bold mb-4">Study Groups</h4>
            <div className="space-y-4">
              <GroupItem name={`${user?.department} Hub`} members={12} active={true} />
              <GroupItem name={`${user?.institutionName} Finals`} members={156} active={true} />
            </div>
          </div>

          <div className="p-6 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl">
            <h4 className="font-bold mb-2">Upgrade to Scholar Pro</h4>
            <p className="text-sm opacity-80 mb-6 font-medium">Get unlimited AI analytics and deep syllabus integration tailored for {user?.institutionName}.</p>
            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-black hover:bg-indigo-50 transition-all">
              Try Free for 7 Days
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BadgeItem: React.FC<{ name: string, icon: React.ReactNode, unlocked: boolean }> = ({ name, icon, unlocked }) => (
  <div className={`
    p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border transition-all
    ${unlocked 
      ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-800 opacity-100 hover:scale-105 hover:bg-white dark:hover:bg-slate-700' 
      : 'border-dashed border-slate-200 dark:border-slate-800 opacity-40 grayscale'}
  `}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${unlocked ? 'bg-white dark:bg-slate-900 shadow-sm' : ''}`}>
      {icon}
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest">{name}</p>
  </div>
);

const GroupItem: React.FC<{ name: string, members: number, active: boolean }> = ({ name, members, active }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-bold group-hover:text-indigo-600 transition-colors">{name}</p>
        <p className="text-[10px] text-slate-500 font-medium">{members} scholars</p>
      </div>
    </div>
    {active && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
  </div>
);

export default Profile;
