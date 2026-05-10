import React from 'react';
import { X, Search, Plus, Layers, Sparkles, Filter } from 'lucide-react';
import { useCMSComponents } from '../../hooks/useCMS';
import { cn } from '../../../shared/utils/cn';

interface SectionLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (component: any) => void;
}

export function SectionLibrary({ isOpen, onClose, onAdd }: SectionLibraryProps) {
  const { data: components, isLoading } = useCMSComponents();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCat, setActiveCat] = React.useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Headers', 'Content', 'Features', 'Footers'];

  const filteredComponents = components?.filter((c: any) => 
    (activeCat === 'All' || c.category === activeCat) &&
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     c.key.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-navy/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[48px] shadow-[0_40px_100px_-20px_rgba(28,36,54,0.4)] flex flex-col overflow-hidden border border-white/20 relative">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Header */}
        <div className="p-10 border-b border-navy/5 flex items-center justify-between bg-navy/[0.02] relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 grad-gold rounded-xl flex items-center justify-center text-white shadow-lg">
                <Layers size={20} />
              </div>
              <h2 className="text-3xl font-head font-extrabold text-navy tracking-tight">Component Vault</h2>
            </div>
            <p className="text-xs text-navy/40 uppercase font-black tracking-[0.2em]">Select an architectural block to deploy</p>
          </div>
          <button 
            onClick={onClose}
            className="w-14 h-14 bg-white hover:bg-navy hover:text-white rounded-2xl border border-navy/5 shadow-sm transition-all duration-500 flex items-center justify-center group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-8 border-b border-navy/5 flex flex-col md:flex-row gap-6 relative z-10">
           <div className="relative flex-1 group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5 group-focus-within:text-gold transition-colors" />
             <input 
               type="text" 
               placeholder="Search architectural components..."
               className="w-full pl-16 pr-6 py-5 bg-navy/[0.02] rounded-[24px] focus:ring-4 focus:ring-navy/5 focus:outline-none transition-all font-bold text-navy"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           
           <div className="flex gap-2 overflow-x-auto pb-2 admin-scroll shrink-0">
             {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={cn(
                    "px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500",
                    activeCat === cat ? "grad-luxury text-white shadow-xl" : "bg-white text-navy/40 hover:bg-navy/5 border border-navy/5"
                  )}
                >
                  {cat}
                </button>
             ))}
           </div>
        </div>

        {/* Components Grid */}
        <div className="flex-1 overflow-y-auto p-10 admin-scroll relative z-10 bg-[var(--bg-main)]/30">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="aspect-video bg-white rounded-3xl border border-navy/5 animate-pulse" />
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredComponents?.map((comp: any) => (
                 <div 
                   key={comp.id}
                   className="luxury-card p-8 group cursor-pointer hover:translate-y-[-8px]"
                   onClick={() => onAdd(comp)}
                 >
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 bg-navy/[0.03] rounded-2xl flex items-center justify-center text-navy shadow-inner group-hover:bg-navy group-hover:text-white transition-all duration-700">
                        <Layers size={24} />
                      </div>
                      <div className="p-2 bg-emerald-50 text-accent-green rounded-xl scale-0 group-hover:scale-100 transition-all duration-500 shadow-sm">
                        <Plus size={18} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-head font-extrabold text-navy tracking-tight mb-2 group-hover:text-gold transition-colors">{comp.name}</h3>
                    <p className="text-xs text-navy/40 font-medium leading-relaxed mb-6 line-clamp-2">{comp.description || 'Enterprise-grade architectural component.'}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-navy/5">
                       <code className="text-[10px] font-black text-navy/20 uppercase tracking-widest">{comp.key}</code>
                       <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                          <span className="text-[9px] font-black text-navy/30 uppercase tracking-widest">Certified</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
          
          {!isLoading && filteredComponents?.length === 0 && (
            <div className="py-32 text-center opacity-20">
               <Layers size={80} className="mx-auto mb-8" />
               <p className="text-2xl font-head font-extrabold tracking-tight">No Components Found</p>
               <p className="text-xs uppercase font-black tracking-widest mt-2">Adjust your filters or architectural key</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-navy/5 flex items-center justify-center gap-3">
           <Sparkles size={16} className="text-gold" />
           <p className="text-[10px] font-black text-navy/30 uppercase tracking-[0.3em]">System Engine v4.0 • Components are live-rendered</p>
        </div>
      </div>
    </div>
  );
}
