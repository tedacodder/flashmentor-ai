
import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Sparkles, BookOpen, MessageSquare, Award, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <BrainCircuit size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter">FlashMentor</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors">Log In</Link>
          <Link to="/signup" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none">Sign Up Free</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center md:pt-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-2">
          <Zap size={14} />
          <span>The Future of Learning is Here</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
          Master Any Subject with your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Study Partner</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          FlashMentor combines advanced AI with proven learning techniques to help university students crush exams, summarize notes, and learn faster.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-2xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2">
            Get Started for Free <ArrowRight size={20} />
          </Link>
          <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            View Live Demo
          </Link>
        </div>

        {/* Mockup Preview */}
        <div className="mt-20 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-video max-w-5xl mx-auto">
             <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="mx-auto bg-slate-100 dark:bg-slate-800 px-4 py-1 rounded-lg text-[10px] text-slate-400 font-mono">flashmentor.ai/dashboard</div>
             </div>
             <div className="p-8 grid grid-cols-12 gap-6 h-full">
                <div className="col-span-3 space-y-4">
                   <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                   <div className="h-8 w-full bg-indigo-600/10 rounded-xl"></div>
                   <div className="h-8 w-full bg-slate-50 dark:bg-slate-800 rounded-xl"></div>
                   <div className="h-8 w-full bg-slate-50 dark:bg-slate-800 rounded-xl"></div>
                </div>
                <div className="col-span-9 space-y-6">
                   <div className="flex justify-between items-center">
                     <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                     <div className="h-8 w-24 bg-indigo-600 rounded-lg"></div>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="h-32 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"></div>
                      <div className="h-32 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"></div>
                      <div className="h-32 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"></div>
                   </div>
                   <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-3xl"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 dark:bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Everything you need to <span className="text-indigo-600">Excel</span></h2>
            <p className="text-slate-500 dark:text-slate-400">Designed specifically for the rigor of university life.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="text-indigo-600" size={32} />}
              title="24/7 AI Tutor"
              description="Ask complex questions on any subject. Our AI breaks down difficult topics into digestible explanations."
            />
            <FeatureCard 
              icon={<BookOpen className="text-purple-600" size={32} />}
              title="Instant Quiz Lab"
              description="Upload your syllabus or text to generate practice exams that mimic real university-level testing."
            />
            <FeatureCard 
              icon={<Award className="text-pink-600" size={32} />}
              title="Smart Flashcards"
              description="Automatic summarization and spaced repetition to ensure long-term mastery of critical concepts."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-black text-indigo-600 mb-2">50k+</p>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Active Students</p>
          </div>
          <div>
            <p className="text-4xl font-black text-indigo-600 mb-2">1M+</p>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Quizzes Taken</p>
          </div>
          <div>
            <p className="text-4xl font-black text-indigo-600 mb-2">98%</p>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Grade Improvement</p>
          </div>
          <div>
            <p className="text-4xl font-black text-indigo-600 mb-2">24/7</p>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">AI Support</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-indigo-600 py-24 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Ready to transform your grades?</h2>
        <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto">Join thousands of students from Harvard, MIT, and Oxford who use FlashMentor to stay ahead.</p>
        <Link to="/signup" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-xl">
          Get Started Now <Sparkles size={24} />
        </Link>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="text-indigo-600" size={24} />
          <span className="font-bold">FlashMentor</span>
        </div>
        <p className="text-slate-400 text-sm">© 2025 FlashMentor AI. All rights reserved.</p>
        <div className="flex gap-6 text-slate-400 text-sm">
          <a href="#" className="hover:text-indigo-600">Privacy</a>
          <a href="#" className="hover:text-indigo-600">Terms</a>
          <a href="#" className="hover:text-indigo-600">Contact</a>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-indigo-500 transition-all group">
    <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl inline-block group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    <div className="mt-6 flex items-center gap-2 text-indigo-600 font-bold text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
      Learn more <ArrowRight size={16} />
    </div>
  </div>
);

export default Landing;
