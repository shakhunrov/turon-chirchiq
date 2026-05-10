import React, { useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useNews } from '../hooks/useCMS';
import { 
  Newspaper, 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  Edit2, 
  Trash2, 
  Clock, 
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function NewsManager() {
  const { data: news, isLoading, refetch } = useNews();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = news?.filter((article: any) => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Journalism & News Engine">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="relative flex-1 max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5 group-focus-within:text-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search news archives..."
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
            Publish New Article
          </button>
        </div>
      </div>

      <div className="luxury-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy/[0.02] border-b border-navy/5">
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Article Entity</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Performance</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Deployment</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {isLoading ? (
                [1,2,3,4].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-8 py-6 h-20 bg-slate-50/50" />
                  </tr>
                ))
              ) : filteredNews?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center opacity-20">
                     <FileText size={48} className="mx-auto mb-4" />
                     <p className="text-[10px] font-black uppercase tracking-widest">No articles found in archives</p>
                  </td>
                </tr>
              ) : (
                filteredNews?.map((article: any) => (
                  <tr key={article.id} className="hover:bg-navy/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-navy/5 rounded-xl flex items-center justify-center text-navy/20 group-hover:bg-navy group-hover:text-white transition-all duration-500">
                          <Newspaper size={24} />
                        </div>
                        <div>
                          <p className="text-base font-extrabold text-navy tracking-tight group-hover:text-gold transition-colors">{article.title}</p>
                          <p className="text-[10px] text-navy/30 font-bold uppercase tracking-widest mt-1">Locale: {article.locale}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 bg-navy/5 rounded-full text-[10px] font-black text-navy/60 uppercase tracking-widest border border-navy/5">
                        {article.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {article.published ? (
                          <div className="flex items-center gap-2 text-accent-green">
                            <CheckCircle2 size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-navy/30">
                            <Clock size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Draft</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <TrendingUp size={16} className="text-gold" />
                         <span className="text-sm font-bold text-navy">{article.views?.toLocaleString() || 0}</span>
                         <span className="text-[10px] font-bold text-navy/20 uppercase tracking-widest">Views</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-navy/40">
                      {new Date(article.date).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-3 hover:bg-navy hover:text-white rounded-xl transition-all text-navy/40">
                          <Eye size={18} />
                        </button>
                        <button className="p-3 hover:bg-gold hover:text-white rounded-xl transition-all text-navy/40">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-3 hover:bg-accent-red hover:text-white rounded-xl transition-all text-navy/40">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Info */}
        {!isLoading && filteredNews?.length > 0 && (
          <div className="p-8 border-t border-navy/5 bg-navy/[0.01] flex items-center justify-between">
             <p className="text-[10px] font-black text-navy/20 uppercase tracking-[0.2em]">Showing {filteredNews.length} articles</p>
             <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl text-[10px] font-black grad-luxury text-white shadow-lg">1</button>
             </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
