
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, Eye, EyeOff, Loader2, Chrome, X } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        name: 'Alex Johnson',
        email: email,
        level: 12,
        xp: 12450,
        badges: [],
        institutionType: 'University',
        institutionName: 'Stanford University',
        year: 'Sophomore',
        department: 'Computer Science',
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.includes('@')) return;
    
    setIsGoogleProcessing(true);
    setTimeout(() => {
      onLogin({
        name: googleEmail.split('@')[0].charAt(0).toUpperCase() + googleEmail.split('@')[0].slice(1),
        email: googleEmail,
        level: 1,
        xp: 150,
        badges: [],
        institutionType: 'University',
        institutionName: 'Global Academic Institute',
        year: 'Freshman',
        department: 'General Studies',
      });
      setIsGoogleProcessing(false);
      setIsGoogleModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-50 dark:bg-slate-950" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 blur-[100px] rounded-full" />
      
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <BrainCircuit size={28} />
            </div>
            <span className="text-2xl font-black tracking-tighter">FlashMentor</span>
          </Link>
          <h2 className="text-3xl font-black mb-2">Welcome Back</h2>
          <p className="text-slate-500 dark:text-slate-400">Ready to crush your study goals?</p>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 transition-all outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1 text-[10px]">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 transition-all outline-none font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none transition-all flex items-center justify-center gap-3"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Login'}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="mt-8">
            <button 
              onClick={() => setIsGoogleModalOpen(true)}
              className="w-full py-4 px-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <Chrome size={20} className="text-indigo-600" />
              Continue with Google
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 dark:text-slate-400 font-medium">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:text-indigo-700">Sign up free</Link>
        </p>
      </div>

      {/* Google Auth Mock Modal */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Chrome className="text-blue-500" size={24} />
                <span className="font-bold">Sign in with Google</span>
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
                <h3 className="font-bold text-lg">Continue to FlashMentor</h3>
                <p className="text-xs text-slate-500 mt-1">To continue, Google will share your name, email address, language preference, and profile picture with FlashMentor.</p>
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

export default Login;
