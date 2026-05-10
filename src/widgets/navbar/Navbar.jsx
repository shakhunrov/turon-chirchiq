import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLang } from '../../shared/i18n';
import LanguageSwitcher from '../../features/language-switcher/LanguageSwitcher';
import logo from "../../shared/assets/logo/turonLogo.png";
import { useQuery } from '@tanstack/react-query';
import api from '../../shared/api/axiosInstance';
import { cn } from '../../shared/utils/cn';

export default function Navbar() {
  const { t } = useLang();
  const location = useLocation();
  const branchId = localStorage.getItem('globalBranchId');
  const locale = localStorage.getItem('locale') || 'uz';

  const { data: menuItems } = useQuery({
    queryKey: ['menu', 'main_nav', branchId, locale],
    queryFn: async () => {
      const res = await api.get(`/website-sources/cms/navigation/main_nav/`, {
        params: { branch: branchId }
      });
      return res.data.items;
    },
    staleTime: 60000
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const links = menuItems || [];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
      scrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-lg py-3 border-b border-navy/5" 
        : "bg-transparent py-6"
    )}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo Identity */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm group-hover:rotate-6 transition-transform duration-500">
            <img src={logo} alt="Turon Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-lg font-head font-black tracking-widest text-navy">TURON</span>
            <span className="text-[9px] font-black tracking-[0.2em] text-gold uppercase mt-1">International School</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {links.map((link, i) => (
            <div 
              key={`${link.path}-${i}`} 
              className="relative group"
              onMouseEnter={() => link.children && setActiveDropdown(link.path)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.path || '#'}
                className={cn(
                  "px-4 py-2 text-[13px] font-head font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                  location.pathname === link.path ? "text-gold" : "text-navy/70 hover:text-navy"
                )}
              >
                {link.label}
                {link.children && <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === link.path && "rotate-180")} />}
              </Link>
              
              {link.children && activeDropdown === link.path && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="w-64 bg-white rounded-2xl shadow-2xl border border-navy/5 p-3 grid gap-1">
                    {link.children.map((child, j) => (
                      <Link 
                        key={`${child.path}-${j}`} 
                        to={child.path}
                        className="px-5 py-3 rounded-xl text-xs font-bold text-navy/60 hover:bg-navy/5 hover:text-navy transition-all flex items-center justify-between group/item"
                      >
                        {child.label}
                        <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Center */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link 
            to="/admissions" 
            className="hidden sm:flex grad-luxury text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:translate-y-[-2px] transition-all"
          >
            {t.hero?.apply || 'Apply Now'}
          </Link>
          <button 
            className="lg:hidden w-12 h-12 flex items-center justify-center text-navy hover:bg-navy/5 rounded-xl transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Portal */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-navy/5 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-500">
          <div className="grid gap-2">
            {links.map((link, i) => (
              <div key={i} className="space-y-2">
                <Link to={link.path || '#'} className="block px-4 py-3 rounded-xl text-sm font-bold text-navy hover:bg-navy/5">
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 pl-4 border-l border-navy/5 grid gap-1">
                    {link.children.map((child, j) => (
                      <Link key={j} to={child.path} className="block px-4 py-2 rounded-lg text-xs font-medium text-navy/60">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-navy/5 flex items-center justify-between">
            <LanguageSwitcher />
            <Link to="/admissions" className="grad-gold text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">
              Join Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
