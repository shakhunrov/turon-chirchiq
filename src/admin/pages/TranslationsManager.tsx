import React, { useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useTranslations, useUpdateTranslation, useCreateTranslation } from '../hooks/useCMS';
import { Search, Globe, Save, RefreshCw, Languages, Check, AlertCircle } from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function TranslationsManager() {
  const { data: translations, isLoading, refetch } = useTranslations();
  const updateMutation = useUpdateTranslation();
  const createMutation = useCreateTranslation();
  
  const [activeLang, setActiveLang] = useState<'uz' | 'ru' | 'en'>('uz');
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdate = (id: number, key: string, value: string) => {
    updateMutation.mutate({ 
      id, 
      data: { [activeLang]: value } 
    });
  };

  const filteredTranslations = translations?.filter((t: any) => 
    t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.uz?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.ru?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.en?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Linguistic Architecture">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar/Filters */}
        <div className="w-full lg:w-72 space-y-6">
          <div className="luxury-card p-8">
            <h3 className="font-head font-extrabold text-navy mb-6 uppercase tracking-widest text-xs">Target Languages</h3>
            <div className="space-y-3">
              {[
                { id: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
                { id: 'ru', name: 'Русский', flag: '🇷🇺' },
                { id: 'en', name: 'English', flag: '🇬🇧' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLang(l.id as any)}
                  className={cn(
                    "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500",
                    activeLang === l.id ? "grad-luxury text-white shadow-xl scale-[1.02]" : "hover:bg-navy/5 text-navy/60"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{l.flag}</span>
                    <span className="text-sm font-bold tracking-tight">{l.name}</span>
                  </div>
                  {activeLang === l.id && <Check size={16} className="text-gold" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grad-gold p-8 rounded-[32px] text-white shadow-2xl shadow-gold/20 relative overflow-hidden group">
             <div className="relative z-10">
                <RefreshCw size={28} className={cn("mb-6 opacity-80", isLoading ? "animate-spin" : "")} />
                <h4 className="font-head font-extrabold text-lg mb-2">Edge Sync</h4>
                <p className="text-white/70 text-xs mb-6 leading-relaxed">Pull latest localization keys from the production cluster.</p>
                <button 
                  onClick={() => refetch()}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md border border-white/10"
                >
                  Refresh Dictionary
                </button>
             </div>
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Translation Grid */}
        <div className="flex-1 space-y-8">
          <div className="luxury-glass p-4 rounded-[28px] flex items-center gap-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search by key or translation content..."
                className="w-full pl-16 pr-6 py-4 bg-navy/[0.02] border-none rounded-2xl focus:ring-4 focus:ring-navy/5 focus:outline-none transition-all font-bold text-navy"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="grad-luxury text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-2px] transition-all flex items-center gap-3">
              <Save size={18} />
              Publish All
            </button>
          </div>

          <div className="luxury-card overflow-hidden">
            <div className="grid grid-cols-12 bg-navy/[0.02] border-b border-navy/5 p-6 gap-6">
               <div className="col-span-4 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Architecture Key</div>
               <div className="col-span-8 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Value ({activeLang.toUpperCase()})</div>
            </div>
            
            <div className="divide-y divide-navy/5">
              {isLoading ? (
                [1,2,3,4,5].map(i => (
                  <div key={i} className="p-8 animate-pulse bg-white flex gap-6">
                    <div className="w-1/3 h-6 bg-slate-100 rounded-lg" />
                    <div className="w-2/3 h-12 bg-slate-100 rounded-xl" />
                  </div>
                ))
              ) : (
                filteredTranslations?.map((t: any) => (
                  <div key={t.id} className="grid grid-cols-12 p-8 gap-8 items-center hover:bg-navy/[0.01] transition-all duration-500 group">
                     <div className="col-span-4">
                       <code className="text-[11px] font-black text-navy/40 bg-navy/[0.03] px-3 py-1.5 rounded-lg uppercase tracking-widest leading-relaxed">{t.key}</code>
                     </div>
                     <div className="col-span-8 relative">
                       <textarea 
                          className="w-full bg-white border border-navy/5 rounded-2xl px-6 py-4 text-sm font-bold text-navy focus:ring-4 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all min-h-[56px] shadow-inner group-hover:border-navy/20"
                          defaultValue={t[activeLang]}
                          rows={1}
                          onBlur={(e) => handleUpdate(t.id, t.key, e.target.value)}
                          onInput={(e: any) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                       />
                       <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-3">
                         <div className="flex gap-1.5">
                            {['uz', 'ru', 'en'].map(l => (
                               <div 
                                 key={l} 
                                 className={cn(
                                   "w-2 h-2 rounded-full shadow-sm",
                                   t[l] ? "bg-emerald-400" : "bg-red-400"
                                 )} 
                                 title={`${l.toUpperCase()} is ${t[l] ? 'Translated' : 'Missing'}`} 
                               />
                            ))}
                         </div>
                       </div>
                     </div>
                  </div>
                ))
              )}
              
              {!isLoading && (
                <div className="p-8 border-t border-navy/5 bg-navy/[0.01]">
                   <form 
                     onSubmit={(e) => {
                       e.preventDefault();
                       const form = e.target as HTMLFormElement;
                       const keyInput = form.elements.namedItem('newKey') as HTMLInputElement;
                       const valueInput = form.elements.namedItem('newValue') as HTMLInputElement;
                       
                       if (keyInput.value && valueInput.value) {
                         createMutation.mutate({
                           key: keyInput.value,
                           [activeLang]: valueInput.value
                         }, {
                           onSuccess: () => form.reset()
                         });
                       }
                     }}
                     className="grid grid-cols-12 gap-6 items-center"
                   >
                      <div className="col-span-4">
                         <input 
                           name="newKey"
                           placeholder="e.g. hero.welcome"
                           className="w-full bg-white border border-navy/5 rounded-xl px-4 py-3 text-xs font-bold text-navy focus:ring-2 focus:ring-navy/5 focus:outline-none"
                           required
                         />
                      </div>
                      <div className="col-span-6">
                         <input 
                           name="newValue"
                           placeholder={`Value in ${activeLang.toUpperCase()}...`}
                           className="w-full bg-white border border-navy/5 rounded-xl px-4 py-3 text-xs font-bold text-navy focus:ring-2 focus:ring-navy/5 focus:outline-none"
                           required
                         />
                      </div>
                      <div className="col-span-2 text-right">
                         <button type="submit" className="w-full py-3 grad-luxury text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:translate-y-[-2px] transition-all">
                           Add Key
                         </button>
                      </div>
                   </form>
                </div>
              )}
              
              {!isLoading && filteredTranslations?.length === 0 && (
                <div className="py-40 text-center opacity-20">
                  <Languages size={64} className="mx-auto mb-6" />
                  <p className="text-xl font-head font-extrabold tracking-tight">Dictionary Entry Not Found</p>
                </div>
              )}
            </div>
          </div>

          <div className="luxury-glass bg-gold/[0.03] border-gold/10 p-8 rounded-[32px] flex gap-6 items-start">
             <div className="w-12 h-12 grad-gold rounded-2xl flex items-center justify-center text-white shadow-xl shadow-gold/20 shrink-0">
                <AlertCircle size={24} />
             </div>
             <div>
                <h5 className="text-lg font-head font-extrabold text-navy tracking-tight mb-1">Staging Changes</h5>
                <p className="text-sm text-navy/60 font-medium">Your dictionary modifications are saved locally but require a "Global Sync" to be reflected on the production environment across all regions.</p>
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
