
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, User, Loader2, CheckCircle2, School, GraduationCap, Building2, Chrome, X } from 'lucide-react';
import { UserProfile } from '../types';

interface SignUpProps {
  onSignUp: (user: UserProfile) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institutionType: 'University' as 'University' | 'High School',
    institutionName: '',
    year: '',
    department: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const profile: UserProfile = {
        name: formData.name,
        email: formData.email,
        level: 1,
        xp: 0,
        badges: [],
        institutionType: formData.institutionType,
        institutionName: formData.institutionName,
        year: formData.year,
        department: formData.department,
      };
      onSignUp(profile);
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.includes('@')) return;

    setIsGoogleProcessing(true);
    setTimeout(() => {
      onSignUp({
        name: googleEmail.split('@')[0].charAt(0).toUpperCase() + googleEmail.split('@')[0].slice(1),
        email: googleEmail,
        level: 1,
        xp: 0,
        badges: [],
        institutionType: 'University',
        institutionName: 'Unassigned Institution',
        year: 'Freshman',
        department: 'Undecided',
      });
      setIsGoogleProcessing(false);
      setIsGoogleModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-50 dark:bg-slate-950" />
      <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block space-y-8 pr-12">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <BrainCircuit size={28} />
            </div>
            <span className="text-2xl font-black tracking-tighter">FlashMentor</span>
          </Link>
          <h2 className="text-5xl font-black leading-tight">Join the next <span className="text-indigo-600">generation</span> of scholars.</h2>
          
          <div className="space-y-6">
            <BenefitItem icon={<CheckCircle2 className="text-emerald-500" />} text="Personalized Study Paths" />
            <BenefitItem icon={<CheckCircle2 className="text-emerald-500" />} text="Level-Appropriate AI Tutoring" />
            <BenefitItem icon={<CheckCircle2 className="text-emerald-500" />} text="Note Summarization Foundry" />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="mb-8 flex justify-between items-center">
               <h2 className="text-2xl font-black">
                {step === 1 ? 'Create Account' : 'Academic Profile'}
               </h2>
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Step {step}/2</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="name@institution.edu"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="password" 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">Academic Level</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, institutionType: 'University'})}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${formData.institutionType === 'University' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-100 dark:border-slate-800 opacity-60'}`}
                      >
                        <GraduationCap size={24} className={formData.institutionType === 'University' ? 'text-indigo-600' : ''} />
                        <span className="text-xs font-black uppercase">University</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, institutionType: 'High School'})}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${formData.institutionType === 'High School' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-100 dark:border-slate-800 opacity-60'}`}
                      >
                        <School size={24} className={formData.institutionType === 'High School' ? 'text-indigo-600' : ''} />
                        <span className="text-xs font-black uppercase">High School</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">Institution Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        required
                        value={formData.institutionName}
                        onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                        placeholder={formData.institutionType === 'University' ? "e.g. Stanford University" : "e.g. West High School"}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 transition-all outline-none font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">
                        {formData.institutionType === 'University' ? 'Year' : 'Grade'}
                      </label>
                      <select 
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 transition-all outline-none font-medium text-sm appearance-none"
                      >
                        <option value="">Select</option>
                        {formData.institutionType === 'University' ? (
                          <>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Grad Student">Grad Student</option>
                          </>
                        ) : (
                          <>
                            <option value="Grade 9">Grade 9</option>
                            <option value="Grade 10">Grade 10</option>
                            <option value="Grade 11">Grade 11</option>
                            <option value="Grade 12">Grade 12</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">
                        {formData.institutionType === 'University' ? 'Major' : 'Stream'}
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        placeholder={formData.institutionType === 'University' ? "e.g. CS" : "e.g. Science"}
                        className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 transition-all outline-none font-medium text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 flex flex-col gap-3">
                <div className="flex gap-4">
                  {step === 2 && (
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-200"
                    >
                      Back
                    </button>
                  )}
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl transition-all flex items-center justify-center gap-3"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={24} /> : (step === 1 ? 'Next Step' : 'Launch Mentor')}
                  </button>
                </div>

                {step === 1 && (
                  <>
                    <div className="flex items-center gap-4 my-2">
                      <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Or</span>
                      <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsGoogleModalOpen(true)}
                      className="w-full py-4 px-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                      <Chrome size={20} className="text-indigo-600" />
                      Sign up with Google
                    </button>
                  </>
                )}
              </div>
            </form>

            <p className="text-center mt-6 text-slate-500 dark:text-slate-400 font-medium text-sm">
              Already a scholar? <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700">Log in</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Google Auth Mock Modal */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Chrome className="text-blue-500" size={24} />
                <span className="font-bold">Sign up with Google</span>
              </div>
              <button onClick={() => setIsGoogleModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-all">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
                  <BrainCircuit size={32} />
                </div>
                <h3 className="font-bold text-lg">Create FlashMentor Account</h3>
                <p className="text-xs text-slate-500 mt-1">Google will share your identity details with FlashMentor to create your workspace.</p>
              </div>

              <form onSubmit={handleGoogleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Account Email</label>
                  <input 
                    type="email" 
                    required
                    autoFocus
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isGoogleProcessing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isGoogleProcessing ? <Loader2 className="animate-spin" size={20} /> : 'Continue'}
                </button>
              </form>

              <div className="text-[10px] text-slate-400 text-center leading-relaxed">
                By continuing, you agree to Google's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BenefitItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-lg font-medium text-slate-600 dark:text-slate-400">
    <div className="shrink-0">{icon}</div>
    <span>{text}</span>
  </div>
);

export default SignUp;
