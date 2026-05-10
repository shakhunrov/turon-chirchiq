import React, { useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useCMSComponents, useDeleteComponent, useCreateComponent } from '../hooks/useCMS';
import { Layers, Search, Plus, Code, Eye, Settings, Filter, Trash2, RefreshCw, Sparkles } from 'lucide-react';
import { cn } from '../../shared/utils/cn';

const categories = ['All', 'Headers', 'Content', 'Features', 'Galleries', 'Footers'];

export default function ComponentsLibrary() {
  const { data: components, isLoading, refetch } = useCMSComponents();
  const deleteMutation = useDeleteComponent();
  const [activeCat, setActiveCat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComponents = components?.filter((comp: any) => 
    (activeCat === 'All' || comp.category === activeCat) &&
    (comp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     comp.key.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: number) => {
    if (window.confirm('Decommission this architectural block? This may affect pages using it.')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout title="Component Engineering">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="relative flex-1 max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5 group-focus-within:text-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search architected components..."
            className="w-full pl-16 pr-6 py-5 luxury-glass rounded-[24px] focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy transition-all font-bold text-navy"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => refetch()}
            className="p-5 luxury-glass rounded-2xl text-navy/40 hover:text-navy transition-all"
          >
            <RefreshCw size={22} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button className="grad-gold text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-4px] transition-all flex items-center gap-3">
            <Plus size={20} />
            Engineer New Component
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-10 overflow-x-auto pb-4 admin-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={cn(
              "px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap",
              activeCat === cat 
                ? "grad-luxury text-white shadow-xl scale-[1.05]" 
                : "bg-white text-navy/40 hover:bg-navy/5 hover:text-navy border border-navy/5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          [1,2,3,4,5,6].map(i => (
            <div key={i} className="luxury-card h-80 animate-pulse bg-white/50" />
          ))
        ) : (
          filteredComponents?.map((comp: any) => (
            <div key={comp.id} className="luxury-card p-10 group overflow-hidden relative transition-all duration-500 hover:translate-y-[-8px]">
               <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-16 h-16 bg-navy/[0.03] rounded-2xl flex items-center justify-center text-navy shadow-inner group-hover:bg-navy group-hover:text-white transition-all duration-700">
                        <Layers size={28} />
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">{comp.category || 'Standard'}</span>
                        <div className="flex items-center gap-2">
                           <Sparkles size={10} className="text-accent-green" />
                           <span className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">Verified Module</span>
                        </div>
                     </div>
                  </div>

                  <h3 className="text-2xl font-head font-extrabold text-navy tracking-tight mb-2 group-hover:text-gold transition-colors duration-500">{comp.name}</h3>
                  <code className="text-[11px] font-black text-navy/20 bg-navy/[0.03] px-3 py-1.5 rounded-lg uppercase tracking-widest mb-10 block w-fit">{comp.key}</code>

                  <div className="mt-auto pt-8 border-t border-navy/5 grid grid-cols-2 gap-4">
                     <button className="flex items-center justify-center gap-2 py-4 bg-navy/[0.03] rounded-2xl text-[10px] font-black uppercase tracking-widest text-navy/40 hover:bg-navy hover:text-white transition-all duration-500">
                        <Code size={16} />
                        Schema
                     </button>
                     <button 
                        onClick={() => handleDelete(comp.id)}
                        className="flex items-center justify-center gap-2 py-4 bg-navy/[0.03] rounded-2xl text-[10px] font-black uppercase tracking-widest text-navy/40 hover:bg-accent-red hover:text-white transition-all duration-500"
                     >
                        <Trash2 size={16} />
                        Drop
                     </button>
                  </div>
               </div>
               
               {/* Decorative background element */}
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-navy/[0.02] rounded-full blur-3xl group-hover:bg-gold/[0.05] transition-all duration-1000" />
            </div>
          ))
        )}
        
        {!isLoading && filteredComponents?.length === 0 && (
          <div className="col-span-full py-40 text-center opacity-20">
             <Layers size={80} className="mx-auto mb-8" />
             <p className="text-2xl font-head font-extrabold tracking-tight">No architected modules found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
