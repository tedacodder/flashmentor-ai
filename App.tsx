
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  Moon, 
  Sun, 
  Award, 
  BrainCircuit,
  LogOut,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X
} from 'lucide-react';

import Dashboard from './views/Dashboard';
import Tutor from './views/Tutor';
import QuizView from './views/QuizView';
import FlashcardsView from './views/FlashcardsView';
import Profile from './views/Profile';
import Landing from './views/Landing';
import Login from './views/Login';
import SignUp from './views/SignUp';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  
  const handleAuth = (profile: UserProfile) => {
    setUser(profile);
    setIsAuthenticated(true);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login onLogin={handleAuth} />} />
            <Route path="/signup" element={<SignUp onSignUp={handleAuth} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex transition-colors duration-300 bg-slate-50 dark:bg-slate-950">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
            onClick={toggleSidebar}
          />
        )}

        <aside className={`
          fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
          z-50 transition-all duration-300 ease-in-out transform
          ${isSidebarCollapsed ? 'w-20' : 'w-72'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex flex-col h-full overflow-hidden">
            <div className={`p-6 flex items-center justify-between transition-all ${isSidebarCollapsed ? 'px-4' : 'px-8'}`}>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="min-w-[48px] w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                  <BrainCircuit size={28} />
                </div>
                {!isSidebarCollapsed && (
                  <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white truncate animate-in fade-in slide-in-from-left-2 duration-300">FlashMentor</h1>
                )}
              </div>
              <button 
                onClick={toggleCollapse}
                className="hidden md:flex p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isSidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
              </button>
            </div>

            <nav className={`flex-1 px-4 space-y-1.5 py-4 overflow-y-auto overflow-x-hidden ${isSidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
              <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" isCollapsed={isSidebarCollapsed} onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink to="/tutor" icon={<MessageSquare size={20} />} label="AI Tutor" isCollapsed={isSidebarCollapsed} onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink to="/quiz" icon={<BookOpen size={20} />} label="Quizzes" isCollapsed={isSidebarCollapsed} onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink to="/flashcards" icon={<Award size={20} />} label="Flashcards" isCollapsed={isSidebarCollapsed} onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink to="/profile" icon={<Settings size={20} />} label="Profile" isCollapsed={isSidebarCollapsed} onClick={() => setIsSidebarOpen(false)} />
            </nav>

            <div className={`p-4 border-t border-slate-100 dark:border-slate-800 space-y-4 ${isSidebarCollapsed ? 'flex flex-col items-center px-2' : 'p-6'}`}>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-full flex items-center gap-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 font-medium ${isSidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3'}`}
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                {!isSidebarCollapsed && <span className="animate-in fade-in duration-300">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
              </button>
              
              <div className={`flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden transition-all ${isSidebarCollapsed ? 'p-2' : 'px-4 py-3'}`}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} className="min-w-[40px] w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 bg-indigo-100 shrink-0" alt="Avatar" />
                {!isSidebarCollapsed && (
                  <>
                    <div className="flex-1 overflow-hidden animate-in fade-in duration-300">
                      <p className="text-sm font-bold truncate text-slate-900 dark:text-white">{user?.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight truncate">{user?.year} • {user?.department}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Logout"
                    >
                      <LogOut size={18} />
                    </button>
                  </>
                )}
              </div>
              {isSidebarCollapsed && (
                <button 
                  onClick={handleLogout}
                  className="p-3 text-slate-400 hover:text-rose-500 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              )}
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col w-full max-w-full overflow-hidden transition-all duration-300">
          <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black">
              <BrainCircuit size={24} />
              <span>FlashMentor</span>
            </div>
            <button onClick={toggleSidebar} className="p-2 text-slate-600 dark:text-slate-400">
              <Menu size={24} />
            </button>
          </header>

          <div className="p-4 md:p-8 lg:p-10 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/tutor" element={<Tutor user={user} />} />
              <Route path="/quiz" element={<QuizView user={user} />} />
              <Route path="/flashcards" element={<FlashcardsView user={user} />} />
              <Route path="/profile" element={<Profile user={user} onUpdate={updateUser} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isCollapsed, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      title={isCollapsed ? label : ""}
      className={`
        flex items-center gap-3 rounded-2xl transition-all duration-200 group
        ${isCollapsed ? 'justify-center p-3.5 w-12' : 'px-4 py-3.5 w-full'}
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none font-bold scale-[1.02]' 
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}
      `}
    >
      <span className={`shrink-0 transition-transform ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:scale-110'}`}>
        {icon}
      </span>
      {!isCollapsed && (
        <span className="truncate animate-in fade-in slide-in-from-left-2 duration-300">
          {label}
        </span>
      )}
      {!isCollapsed && isActive && <ChevronRight className="ml-auto opacity-50 shrink-0" size={16} />}
    </Link>
  );
};

export default App;
