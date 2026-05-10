import React, { useState } from 'react';
import { X, Layout, Globe, Menu as MenuIcon, Check } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export function CreatePageModal({ isOpen, onClose, onCreate }: CreatePageModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    locale: 'uz',
    status: 'draft',
    branch: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-white/20">
        <div className="p-8 border-b border-navy-border/10 flex items-center justify-between">
           <h2 className="text-xl font-head font-bold text-navy">Create New Page</h2>
           <button onClick={onClose} className="text-text-muted hover:text-navy transition-colors"><X size={20} /></button>
        </div>

        <div className="p-8 space-y-6">
           <div className="space-y-1.5">
             <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Page Title</label>
             <input 
               type="text" 
               placeholder="e.g. About Our Academy"
               className="w-full px-4 py-3 bg-slate-50 border border-navy-border/10 rounded-2xl focus:ring-2 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all"
               value={formData.title}
               onChange={(e) => setFormData({...formData, title: e.target.value})}
             />
           </div>

           <div className="space-y-1.5">
             <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">URL Slug</label>
             <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">turon.uz/</span>
                <input 
                  type="text" 
                  placeholder="about-us"
                  className="w-full pl-20 pr-4 py-3 bg-slate-50 border border-navy-border/10 rounded-2xl focus:ring-2 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                />
             </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Language</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-navy-border/10 rounded-2xl focus:ring-2 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all"
                  value={formData.locale}
                  onChange={(e) => setFormData({...formData, locale: e.target.value})}
                >
                  <option value="uz">O'zbekcha</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Status</label>
                <div className="flex bg-slate-50 p-1 rounded-2xl border border-navy-border/10">
                   <button 
                     onClick={() => setFormData({...formData, status: 'draft'})}
                     className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", formData.status === 'draft' ? "bg-white text-navy shadow-sm" : "text-text-muted")}
                   >
                     Draft
                   </button>
                   <button 
                     onClick={() => setFormData({...formData, status: 'published'})}
                     className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", formData.status === 'published' ? "bg-emerald-500 text-white shadow-lg" : "text-text-muted")}
                   >
                     Publish
                   </button>
                </div>
              </div>
           </div>
        </div>

        <div className="p-8 pt-0 flex gap-4">
           <button onClick={onClose} className="flex-1 py-4 text-sm font-bold text-text-muted hover:text-navy transition-all">Cancel</button>
           <button 
             onClick={() => onCreate(formData)}
             className="flex-[2] py-4 bg-navy text-white rounded-2xl font-bold shadow-xl shadow-navy/20 hover:translate-y-[-2px] active:translate-y-0 transition-all flex items-center justify-center gap-2"
           >
             <Check size={18} />
             Create Page
           </button>
        </div>
      </div>
    </div>
  );
}
