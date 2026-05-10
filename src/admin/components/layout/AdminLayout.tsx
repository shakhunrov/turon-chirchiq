import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { useLang } from '../../../shared/i18n';
import { LogOut, User } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { lang } = useLang();

  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] font-body text-navy overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-[var(--header-height)] luxury-glass flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <div className="w-1.5 h-8 bg-gold rounded-full hidden sm:block" />
            <h2 className="text-2xl font-head font-extrabold text-navy tracking-tight">{title}</h2>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-navy/5 rounded-2xl border border-navy/5">
              <div className="w-2 h-2 bg-accent-green rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
              <span className="text-[10px] font-black text-navy uppercase tracking-[0.2em]">{lang}</span>
            </div>

            <div className="h-8 w-px bg-navy/10" />

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-black text-navy leading-none">Super Admin</p>
                <p className="text-[10px] text-gold mt-1.5 uppercase font-bold tracking-widest">Active Session</p>
              </div>
              <div className="w-12 h-12 grad-luxury rounded-2xl flex items-center justify-center text-white shadow-xl shadow-navy/20 group-hover:scale-110 transition-all duration-500 overflow-hidden relative">
                <User size={22} className="relative z-10" />
                <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 admin-scroll">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
