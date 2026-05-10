import React, { useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useCMSPages, useCreatePage, useUpdatePage } from '../hooks/useCMS';
import { CreatePageModal } from '../components/editor/CreatePageModal';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink,
  RefreshCw,
  FileText,
  Power
} from 'lucide-react';
import { cn } from '../../shared/utils/cn';
import { Link, useNavigate } from 'react-router-dom';

export default function PagesManager() {
  const { data: pages, isLoading, refetch } = useCMSPages();
  const createMutation = useCreatePage();
  const updateMutation = useUpdatePage();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreate = (data: any) => {
    createMutation.mutate(data, {
      onSuccess: (newPage) => {
        setIsCreateModalOpen(false);
        navigate(`/admin/cms/pages/${newPage.id}`);
      }
    });
  };

  const handleToggleStatus = (pageId: string, currentStatus: string) => {
    updateMutation.mutate({
      id: pageId,
      data: { status: currentStatus === 'published' ? 'draft' : 'published' }
    });
  };

  const filteredPages = pages?.filter((p: any) => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Content Architecture">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="relative flex-1 max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5 group-focus-within:text-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search architected pages by title or slug..."
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
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="grad-gold text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-4px] transition-all flex items-center gap-3"
          >
            <Plus size={20} />
            Architect New Page
          </button>
        </div>
      </div>

      <div className="luxury-card overflow-hidden">
        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="animate-spin text-gold" size={48} />
            <p className="text-xs font-black text-navy/20 uppercase tracking-[0.2em]">Retrieving Site Index...</p>
          </div>
        ) : (
          <div className="overflow-x-auto admin-scroll">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-navy/[0.02] border-b border-navy/5">
                  <th className="px-8 py-6 text-left text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Page Identity</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Structure</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Deployment</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Version</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Engineering</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {filteredPages?.map((page: any) => (
                  <tr key={page.id} className="group hover:bg-navy/[0.01] transition-all duration-500">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 grad-luxury rounded-2xl flex items-center justify-center text-white shadow-xl shadow-navy/10 group-hover:rotate-12 transition-all duration-500">
                          <FileText size={22} />
                        </div>
                        <div>
                          <h4 className="text-base font-extrabold text-navy tracking-tight group-hover:text-gold transition-colors">{page.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[10px] font-bold text-navy/30 tracking-tight">turon.uz/</span>
                             <span className="text-[10px] font-black text-gold uppercase tracking-widest">{page.slug}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-4">
                          <div className="px-4 py-1.5 luxury-glass rounded-full text-[10px] font-black text-navy uppercase tracking-widest">
                             {page.locale}
                          </div>
                          <span className="text-[10px] font-bold text-navy/20 uppercase tracking-widest">{page.sections?.length || 0} Sections</span>
                       </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className={cn(
                        "inline-flex items-center gap-2.5 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-inner transition-all duration-500",
                        page.status === 'published' 
                          ? "bg-emerald-50 text-accent-green shadow-[0_0_15px_rgba(34,197,94,0.1)]" 
                          : "bg-amber-50 text-gold shadow-[0_0_15px_rgba(201,165,53,0.1)]"
                      )}>
                        <div className={cn("w-2 h-2 rounded-full", page.status === 'published' ? "bg-accent-green animate-pulse" : "bg-gold")} />
                        {page.status}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                       <span className="text-xs font-black text-navy/20 tabular-nums">v{page.version}.0</span>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button 
                          onClick={() => handleToggleStatus(page.id, page.status)}
                          disabled={updateMutation.isPending}
                          className={cn(
                             "w-12 h-12 rounded-xl border border-navy/10 flex items-center justify-center transition-all shadow-sm",
                             page.status === 'published' ? "bg-amber-50 text-gold hover:bg-gold hover:text-white" : "bg-emerald-50 text-accent-green hover:bg-accent-green hover:text-white"
                          )}
                          title={page.status === 'published' ? 'Switch to Draft' : 'Publish Page'}
                        >
                          <Power size={18} />
                        </button>
                        <Link 
                          to={`/admin/cms/pages/${page.id}`}
                          className="w-12 h-12 bg-white rounded-xl border border-navy/10 flex items-center justify-center text-navy hover:grad-luxury hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-xl hover:scale-110"
                          title="Open Architect"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <a 
                          href={`/${page.slug}`} 
                          target="_blank" 
                          className="w-12 h-12 bg-white rounded-xl border border-navy/10 flex items-center justify-center text-navy hover:bg-slate-50 transition-all shadow-sm"
                          title="Live Preview"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPages?.length === 0 && (
              <div className="py-40 text-center opacity-20">
                <FileText size={64} className="mx-auto mb-6" />
                <p className="text-xl font-head font-extrabold tracking-tight">No architected pages found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <CreatePageModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreate} 
      />
    </AdminLayout>
  );
}
