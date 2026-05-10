import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Menu as MenuIcon, 
  Image as ImageIcon, 
  Globe, 
  Settings, 
  ChevronRight,
  Monitor,
  MessageSquare,
  Newspaper,
  Inbox
} from 'lucide-react';
import { cn } from '../../../shared/utils/cn';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Pages', icon: FileText, path: '/admin/cms/pages' },
  { name: 'Sections', icon: Layers, path: '/admin/cms/sections' },
  { name: 'Menus', icon: MenuIcon, path: '/admin/cms/menus' },
  { name: 'Media', icon: ImageIcon, path: '/admin/cms/media' },
  { name: 'Forms', icon: MessageSquare, path: '/admin/cms/forms' },
  { name: 'Translations', icon: Globe, path: '/admin/cms/translations' },
  { name: 'News', icon: Newspaper, path: '/admin/news' },
  { name: 'Inquiries', icon: Inbox, path: '/admin/inquiries' },
  { name: 'Global Settings', icon: Settings, path: '/admin/cms/settings' },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-[var(--sidebar-width)] h-screen luxury-glass flex flex-col sticky top-0 overflow-hidden z-50">
      <div className="p-8 pb-10">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 grad-luxury rounded-2xl flex items-center justify-center text-white font-extrabold shadow-xl shadow-navy/20 group-hover:rotate-12 transition-all duration-500 animate-float">
            T
          </div>
          <div>
            <h1 className="font-head font-extrabold text-navy text-lg tracking-tight leading-none">CMS Portal</h1>
            <p className="text-[10px] text-gold font-black uppercase tracking-[0.2em] mt-1.5">Elite Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 admin-scroll overflow-y-auto">
        <p className="px-4 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em] mb-4">Main Navigation</p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                isActive 
                  ? "grad-luxury text-white shadow-2xl shadow-navy/30 scale-[1.02]" 
                  : "text-navy/60 hover:bg-navy/5 hover:text-navy"
              )}
            >
              <div className="flex items-center gap-4 relative z-10">
                <item.icon className={cn("w-5 h-5 transition-transform duration-500 group-hover:scale-110", isActive ? "text-gold-light" : "text-navy/40 group-hover:text-navy")} />
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
              </div>
              {isActive && (
                <div className="absolute right-0 top-0 h-full w-1 bg-gold shadow-[0_0_15px_rgba(201,165,53,0.5)]" />
              )}
              {isActive && <ChevronRight className="w-4 h-4 text-white/40 relative z-10" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-navy/5 bg-navy/5">
        <Link 
          to="/" 
          target="_blank"
          className="flex items-center gap-4 px-5 py-4 text-navy/70 hover:bg-white rounded-2xl transition-all duration-500 shadow-sm hover:shadow-md group"
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-inner group-hover:bg-gold group-hover:text-white transition-colors duration-500">
            <Monitor className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">Live Site</span>
        </Link>
      </div>
    </aside>
  );
}
