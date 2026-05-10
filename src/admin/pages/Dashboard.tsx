import React from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useCMSPages, useMediaAssets } from '../hooks/useCMS';
import { 
  FileText, 
  Eye, 
  MousePointerClick, 
  TrendingUp, 
  Clock,
  ExternalLink,
  Sparkles,
  Zap,
  Globe,
  ImageIcon,
  Layout
} from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function AdminDashboard() {
  const { data: pages, isLoading: pagesLoading } = useCMSPages();
  const { data: assets, isLoading: assetsLoading } = useMediaAssets();

  const stats = [
    { label: 'Total Pages', value: pagesLoading ? '...' : pages?.length || '0', icon: FileText, trend: '+12% growth', color: 'bg-navy' },
    { label: 'Site Traffic', value: '42.8K', icon: TrendingUp, trend: 'High Peak', color: 'bg-gold' },
    { label: 'Active Sessions', value: '1,248', icon: Zap, trend: 'Real-time', color: 'bg-indigo-500' },
    { label: 'Visual Assets', value: assetsLoading ? '...' : assets?.length || '0', icon: ImageIcon, trend: 'Optimized', color: 'bg-emerald-500' },
  ];

  const activities = [
    { type: 'Update', title: 'Global SEO Schema Updated', user: 'System Architect', time: '5 min ago', icon: Globe },
    { type: 'Design', title: 'New Hero Component Architected', user: 'Lead Designer', time: '18 min ago', icon: Layout },
    { type: 'Media', title: 'High-Res Asset Uploaded', user: 'Content Manager', time: '42 min ago', icon: ImageIcon },
    { type: 'Publish', title: 'Admission Page Deployed', user: 'Admin', time: '1 hr ago', icon: Zap },
  ];

  return (
    <AdminLayout title="System Intelligence Hub">
      {/* Dynamic Performance Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="luxury-card p-8 group overflow-hidden relative">
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-8">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-700 group-hover:rotate-12 group-hover:scale-110", stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <div className="px-3 py-1 bg-navy/[0.03] rounded-full">
                     <span className="text-[9px] font-black text-navy uppercase tracking-widest">{stat.trend}</span>
                  </div>
               </div>
               <p className="text-[10px] font-black text-navy/30 mb-2 uppercase tracking-[0.2em]">{stat.label}</p>
               <h3 className="text-4xl font-head font-extrabold text-navy tracking-tighter">
                 {stat.value}
               </h3>
            </div>
            {/* Background Trace */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-navy/[0.01] rounded-full blur-2xl group-hover:bg-navy/[0.03] transition-all duration-1000" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Real-time Activity Stream */}
        <div className="lg:col-span-2 space-y-8">
          <div className="luxury-card overflow-hidden">
            <div className="p-10 border-b border-navy/5 flex items-center justify-between bg-navy/[0.02]">
              <div>
                <h3 className="text-2xl font-head font-extrabold text-navy tracking-tight">Intelligence Stream</h3>
                <p className="text-xs text-navy/40 mt-2 uppercase font-black tracking-[0.2em]">Active Administrative Operations</p>
              </div>
              <button className="p-4 bg-white border border-navy/5 rounded-2xl text-[10px] font-black text-navy uppercase tracking-widest hover:bg-navy hover:text-white transition-all shadow-sm">
                Access Audit Logs
              </button>
            </div>
            <div className="divide-y divide-navy/5 p-4">
              {activities.map((act, i) => (
                <div key={i} className="p-8 flex items-center justify-between hover:bg-navy/[0.01] rounded-3xl transition-all duration-500 group">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-white border border-navy/5 rounded-2xl flex items-center justify-center text-navy shadow-sm group-hover:grad-luxury group-hover:text-white group-hover:rotate-12 transition-all duration-700">
                      <act.icon size={26} className={i === 0 ? "text-gold animate-pulse" : ""} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                         <span className="text-[9px] font-black text-gold uppercase tracking-widest bg-gold/5 px-2 py-0.5 rounded-lg">{act.type}</span>
                         <p className="text-lg font-extrabold text-navy tracking-tight">{act.title}</p>
                      </div>
                      <p className="text-xs text-navy/30 font-bold uppercase tracking-widest">Managed by {act.user} • {act.time}</p>
                    </div>
                  </div>
                  <button className="w-12 h-12 flex items-center justify-center bg-white border border-navy/5 rounded-2xl transition-all shadow-sm group-hover:shadow-xl group-hover:translate-x-2">
                    <ExternalLink size={20} className="text-navy/20 group-hover:text-gold" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Control Center */}
        <div className="space-y-10">
          <div className="grad-luxury p-12 rounded-[48px] text-white shadow-[0_40px_100px_-20px_rgba(28,36,54,0.4)] relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-10 backdrop-blur-2xl border border-white/10 group-hover:rotate-12 transition-transform duration-700 shadow-2xl">
                <Sparkles className="text-gold" size={32} />
              </div>
              <h3 className="text-3xl font-head font-extrabold mb-4 tracking-tight leading-tight">Architect New<br />Digital Experience</h3>
              <p className="text-white/50 text-sm mb-12 leading-relaxed font-medium italic">"Deploy state-of-the-art marketing funnels with zero friction."</p>
              <button className="w-full bg-white text-navy font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-all shadow-2xl hover:translate-y-[-4px] active:translate-y-0">
                Launch Architect
              </button>
            </div>
            {/* High-end decorative elements */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold/20 rounded-full blur-[100px] group-hover:bg-gold/40 transition-all duration-1000" />
            <div className="absolute -left-20 -top-20 w-48 h-48 bg-white/5 rounded-full blur-[80px]" />
          </div>

          <div className="luxury-card p-10 bg-white relative overflow-hidden">
            <h3 className="text-xs font-black text-navy/30 mb-10 uppercase tracking-[0.3em] flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
               Global System Status
            </h3>
            <div className="space-y-8">
              {[
                { label: 'Edge Network', status: 'Healthy', load: '12%', color: 'bg-accent-green' },
                { label: 'Neural Renderer', status: 'Optimal', load: '4%', color: 'bg-accent-green' },
                { label: 'Media Indexer', status: 'Syncing', load: '85%', color: 'bg-gold' },
              ].map((s) => (
                <div key={s.label}>
                   <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-navy">{s.label}</span>
                      <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg text-white", s.color)}>{s.status}</span>
                   </div>
                   <div className="h-1.5 bg-navy/[0.03] rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-1000", s.color)} style={{ width: s.load }} />
                   </div>
                   <div className="flex justify-end mt-2">
                      <span className="text-[9px] font-black text-navy/20 uppercase tracking-widest">Load: {s.load}</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
