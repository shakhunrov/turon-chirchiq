import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, selectAuth, clearAuthError } from '../../features/auth';
import { Eye, EyeOff, Lock, User, Shield, Sparkles, Zap, RefreshCw } from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, loading, error } = useSelector(selectAuth);

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (isAuth) navigate('/admin/dashboard');
  }, [isAuth, navigate]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ username: form.username, password: form.password }));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Neural Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-navy/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="w-full max-w-xl relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="luxury-card p-12 md:p-16 relative overflow-hidden bg-white/80 backdrop-blur-2xl border-white/40 shadow-[0_50px_100px_-20px_rgba(28,36,54,0.3)]">
          {/* Header */}
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="w-20 h-20 grad-luxury rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl shadow-navy/20 animate-float">
              <Shield size={40} />
            </div>
            <h1 className="text-3xl font-head font-extrabold text-navy tracking-tight mb-3">Architect Authentication</h1>
            <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">Elite Command Center Access</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3 group">
              <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em] ml-1">Architect Identity</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-gold transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Enter username..."
                  className="w-full pl-16 pr-6 py-5 bg-navy/[0.02] border border-navy/5 rounded-[24px] text-sm font-bold text-navy focus:ring-4 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all shadow-inner"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-3 group">
              <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em] ml-1">Security Keyphrase</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-gold transition-colors" size={18} />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-16 pr-14 py-5 bg-navy/[0.02] border border-navy/5 rounded-[24px] text-sm font-bold text-navy focus:ring-4 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all shadow-inner"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-navy/20 hover:text-navy transition-colors"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-5 bg-accent-red/5 border border-accent-red/10 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-2">
                <div className="w-10 h-10 bg-accent-red/10 rounded-xl flex items-center justify-center text-accent-red">
                  <Zap size={18} />
                </div>
                <p className="text-xs font-bold text-accent-red leading-relaxed">{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-6 grad-luxury text-white font-black rounded-[28px] text-xs uppercase tracking-[0.3em] shadow-2xl hover:translate-y-[-4px] active:translate-y-0 transition-all flex items-center justify-center gap-4 group"
            >
              {loading ? (
                <RefreshCw size={20} className="animate-spin" />
              ) : (
                <>
                  <Sparkles size={20} className="text-gold group-hover:rotate-90 transition-transform duration-500" />
                  <span>Initialize Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-16 flex items-center justify-between text-navy/20">
             <div className="flex items-center gap-3">
               <Shield size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Secure Link Active</span>
             </div>
             <span className="text-[9px] font-black uppercase tracking-widest">v4.2 Enterprise</span>
          </div>
        </div>

        {/* Dynamic Hint */}
        <div className="mt-8 text-center">
           <p className="text-[10px] font-black text-navy/30 uppercase tracking-[0.5em]">TIS Global Infrastructure</p>
        </div>
      </div>
    </div>
  );
}
