import React, { useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Settings, Save, Globe, Smartphone, Bell, Shield, Palette } from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function GlobalSettings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  return (
    <AdminLayout title="System Configuration">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-72 space-y-4">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                 "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-500 group",
                 activeTab === tab.id 
                  ? "grad-luxury text-white shadow-2xl shadow-navy/30 scale-[1.02]" 
                  : "bg-white text-navy/40 hover:bg-navy/5 hover:text-navy"
               )}
             >
               <tab.icon size={20} className={cn("transition-transform group-hover:scale-110", activeTab === tab.id ? "text-gold-light" : "")} />
               <span className="text-sm tracking-tight">{tab.name}</span>
             </button>
           ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-8">
           <div className="luxury-card p-10">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-navy/5">
                 <div>
                    <h3 className="text-2xl font-head font-extrabold text-navy tracking-tight capitalize">{activeTab} Parameters</h3>
                    <p className="text-xs text-navy/40 mt-1 uppercase font-bold tracking-widest">Global system behavior & defaults</p>
                 </div>
                 <button className="grad-gold text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-2px] transition-all flex items-center gap-2">
                    <Save size={16} />
                    Push Changes
                 </button>
              </div>

              <div className="space-y-10">
                 {/* Mock Fields */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Website Name</label>
                       <input 
                         type="text" 
                         defaultValue="Turon International School"
                         className="w-full px-5 py-4 bg-navy/[0.02] border border-navy/5 rounded-2xl focus:ring-2 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all font-bold text-navy"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Primary Domain</label>
                       <input 
                         type="text" 
                         defaultValue="turon.uz"
                         className="w-full px-5 py-4 bg-navy/[0.02] border border-navy/5 rounded-2xl focus:ring-2 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all font-bold text-navy"
                       />
                    </div>
                 </div>

                 <div className="h-px bg-navy/5" />

                 <div className="space-y-6">
                    <h4 className="text-sm font-black text-navy uppercase tracking-widest">SEO Meta Defaults</h4>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Global Description</label>
                       <textarea 
                         rows={4}
                         defaultValue="A leading international school in Tashkent providing world-class education."
                         className="w-full px-5 py-4 bg-navy/[0.02] border border-navy/5 rounded-2xl focus:ring-2 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all font-bold text-navy"
                       />
                    </div>
                 </div>

                 <div className="p-8 bg-gold/5 rounded-3xl border border-gold/10">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-white shadow-lg">
                          <Settings size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-navy tracking-tight">Enterprise Scaling</p>
                          <p className="text-[10px] text-gold font-bold uppercase tracking-widest">Advanced Mode Active</p>
                       </div>
                    </div>
                    <p className="text-xs text-navy/60 leading-relaxed">System-wide configurations are synchronized across all nodes in the edge network within 60 seconds of publishing.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
