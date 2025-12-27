
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Loader2, Brain, Paperclip, X, Maximize2, Copy, Check, BookOpen, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { geminiService } from '../geminiService';
import { ChatMessage, UserProfile } from '../types';

interface TutorProps {
  user: UserProfile | null;
}

const Tutor: React.FC<TutorProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: `## Welcome to your Academic Workspace! 👋\n\nHello **${user?.name.split(' ')[0]}**! I'm your FlashMentor. \n\nAs a **${user?.year}** studying **${user?.department}** at *${user?.institutionName}*, I'm ready to help you dominate your coursework. \n\n### 🛠️ What can we tackle today?\n- 📝 **Summarize** lecture notes\n- 🧪 **Explain** complex theories\n- 🎯 **Prepare** for upcoming exams\n- 💻 **Debug** coding challenges\n\nReady to start learning? Drop your topic or question below! 👇 📚`,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [readingContent, setReadingContent] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'auto'
      });
    }
  }, [messages, isLoading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        await analyzeFile(file.name, content);
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  const analyzeFile = async (fileName: string, content: string) => {
    setIsLoading(true);
    const userMsg: ChatMessage = {
      id: `file-up-${Date.now()}`,
      role: 'user',
      text: `📎 **File Attached:** \`${fileName}\`\n\nPlease provide a full academic README-style analysis of this content.`,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const analysisPrompt = `SYSTEM INSTRUCTION: You are FlashMentor, an elite academic AI. 
      I have uploaded: "${fileName}". 
      
      As a ${user?.year} level student in ${user?.department}, I need a high-fidelity academic synthesis.
      
      Please include an executive summary, critical domain concepts, and exam-relevant insights.`;

      const stream = await geminiService.getChatStream(analysisPrompt, history);
      let fullText = '';
      const modelMsgId = `analysis-${Date.now()}`;
      setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '', timestamp: Date.now() }]);

      for await (const chunk of stream) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => prev.map(m => m.id === modelMsgId ? { ...m, text: fullText } : m));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const stream = await geminiService.getChatStream(input, history);
      let fullText = '';
      const modelMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '', timestamp: Date.now() }]);

      for await (const chunk of stream) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => prev.map(m => m.id === modelMsgId ? { ...m, text: fullText } : m));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative h-full flex flex-col items-center">
      {/* Increased max-width to 7xl for a more spacious feel */}
      <div className="h-[calc(100vh-100px)] flex flex-col w-full max-w-[98%] 2xl:max-w-7xl mx-auto glass-panel rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-in zoom-in-95 duration-500">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[1.25rem] flex items-center justify-center text-white ring-4 ring-indigo-50 dark:ring-indigo-900/30 shadow-lg shrink-0">
              <Brain size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">AI Academic Tutor</h3>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">ACTIVE SPECIALIST: {user?.department || 'UNDECIDED'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setMessages([])} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-[10px] font-black text-slate-400 hover:text-rose-500 rounded-xl uppercase tracking-widest transition-all border border-transparent hover:border-rose-100 shadow-sm">
               Clear Context
             </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 bg-slate-50/10 dark:bg-slate-950/10 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500 group/msg`}>
              <div className={`flex gap-6 w-full ${m.role === 'user' ? 'flex-row-reverse max-w-[85%]' : 'flex-row max-w-[95%] lg:max-w-[92%]'}`}>
                <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-md transition-transform hover:scale-110 ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-indigo-200 dark:shadow-none' : 'bg-white dark:bg-slate-800 text-indigo-600 border border-slate-100 dark:border-slate-700'}`}>
                  {m.role === 'user' ? <User size={24} /> : <Sparkles size={24} />}
                </div>
                <div className={`
                  relative p-10 rounded-[2.5rem] text-base leading-relaxed shadow-xl w-full
                  ${m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'}
                `}>
                  {m.role === 'model' && (
                    <button 
                      onClick={() => setReadingContent(m.text)}
                      className="absolute top-6 right-6 p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-2xl transition-all opacity-0 group-hover/msg:opacity-100 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-2 font-bold text-xs"
                      title="Open Focus Mode"
                    >
                      <Maximize2 size={16} /> Enter Reader View
                    </button>
                  )}
                  <div className={`prose prose-lg max-w-none ${m.role === 'user' ? 'prose-invert' : 'dark:prose-invert text-slate-800 dark:text-slate-100'}`}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                  <div className={`text-[10px] mt-8 font-black uppercase tracking-widest flex items-center gap-2 ${m.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    <span className="opacity-50">•</span>
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-6 animate-pulse">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center"><Loader2 size={24} className="animate-spin text-indigo-500" /></div>
                <div className="p-8 rounded-[2.5rem] bg-white/50 dark:bg-slate-900/50 text-slate-400 text-sm italic shadow-md border border-slate-100 dark:border-slate-700">Synthesizing learning path...</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex gap-6 items-end max-w-[90%] mx-auto">
            <div className="flex-1 relative group">
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".txt,.md,.pdf" />
              <button onClick={() => fileInputRef.current?.click()} className="absolute left-6 bottom-6 text-slate-400 hover:text-indigo-600 transition-all hover:scale-110"><Paperclip size={24} /></button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask anything or drop notes for analysis..."
                className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 outline-none resize-none max-h-48 transition-all font-medium text-lg shadow-inner"
                rows={1}
              />
            </div>
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-6 bg-indigo-600 text-white rounded-[1.5rem] hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-105 active:scale-95 shrink-0"
            >
              <Send size={28} />
            </button>
          </div>
          <p className="mt-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Press Enter to send • Shift + Enter for new line</p>
        </div>
      </div>

      {/* High-Fidelity Focus Reading Mode Overlay */}
      {readingContent && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-white dark:bg-slate-950 opacity-98" />
          
          {/* Reader Top Navigation */}
          <div className="relative w-full border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-10 py-5 flex items-center justify-between z-10">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black">Focus Reader Mode</h2>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Optimized for Academic Retention</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => handleCopy(readingContent)} className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-all font-bold text-sm flex items-center gap-2">
                {isCopied ? <><Check size={18} className="text-emerald-500" /> Copied</> : <><Copy size={18} /> Save as Note</>}
              </button>
              <button onClick={() => setReadingContent(null)} className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:scale-110 transition-transform shadow-lg"><X size={24} /></button>
            </div>
          </div>

          {/* Reader Main Content Area */}
          <div className="relative flex-1 w-full overflow-y-auto z-10 scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-indigo-900">
            <div className="max-w-4xl mx-auto px-8 py-20 lg:py-32">
              <article className="prose prose-xl lg:prose-2xl max-w-none dark:prose-invert 
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
                prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-serif
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 dark:prose-blockquote:bg-indigo-950/20 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-3xl
                prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:font-mono prose-code:text-sm
                prose-pre:rounded-[2rem] prose-pre:shadow-2xl prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-800
                prose-img:rounded-[2.5rem] prose-img:shadow-2xl
                prose-li:text-slate-700 dark:prose-li:text-slate-300">
                <ReactMarkdown>{readingContent}</ReactMarkdown>
              </article>
              
              <div className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center">
                 <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6"><Brain size={40} className="text-slate-200 dark:text-slate-700" /></div>
                 <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">End of Study Module</p>
                 <button onClick={() => setReadingContent(null)} className="mt-10 px-16 py-6 bg-indigo-600 text-white rounded-full font-black text-2xl hover:bg-indigo-700 transition-all hover:scale-105 shadow-2xl shadow-indigo-100 dark:shadow-none">Exit Reader</button>
              </div>
            </div>
          </div>
          
          {/* Subtle Progress Bar */}
          <div className="fixed bottom-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-900 z-[110]">
             <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-300" style={{ width: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutor;
