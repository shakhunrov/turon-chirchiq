import React, { useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useMediaAssets, useUploadMedia, useDeleteMedia } from '../hooks/useCMS';
import { 
  Image as ImageIcon, 
  Upload, 
  Search, 
  Trash2, 
  Download, 
  RefreshCw
} from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function MediaManager() {
  const { data: mediaAssets, isLoading, refetch } = useMediaAssets();
  const uploadMutation = useUploadMedia();
  const deleteMutation = useDeleteMedia();
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name);
      await uploadMutation.mutateAsync(formData);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filteredMedia = mediaAssets?.filter((m: any) => 
    m.alt?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.file?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Global Media Vault">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="relative flex-1 max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5 group-focus-within:text-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search assets by name or tag..."
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
          
          <label className="grad-gold text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-4px] transition-all flex items-center gap-3 cursor-pointer">
            {uploadMutation.isPending ? <RefreshCw size={20} className="animate-spin" /> : <Upload size={20} />}
            <span>{uploadMutation.isPending ? 'Processing...' : 'Upload New Asset'}</span>
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploadMutation.isPending} />
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} className="aspect-square bg-white rounded-[32px] border border-navy/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filteredMedia?.map((asset: any) => (
            <div key={asset.id} className="luxury-card group overflow-hidden">
               <div className="aspect-square relative overflow-hidden bg-slate-50">
                  <img 
                    src={asset.url} 
                    alt={asset.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                     <a href={asset.url} download className="w-10 h-10 bg-white rounded-xl text-navy flex items-center justify-center hover:bg-gold hover:text-white transition-all scale-75 group-hover:scale-100 duration-500 delay-75 shadow-xl">
                        <Download size={18} />
                     </a>
                     <button 
                        onClick={() => handleDelete(asset.id)}
                        className="w-10 h-10 bg-white rounded-xl text-accent-red flex items-center justify-center hover:bg-accent-red hover:text-white transition-all scale-75 group-hover:scale-100 duration-500 delay-150 shadow-xl"
                     >
                        <Trash2 size={18} />
                     </button>
                  </div>
                  <div className="absolute top-4 left-4 p-2 luxury-glass rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500">
                     <ImageIcon size={14} className="text-navy" />
                  </div>
               </div>
               <div className="p-5">
                  <p className="text-[11px] font-black text-navy truncate tracking-tight">{asset.alt || 'Untitled Asset'}</p>
                  <div className="flex items-center justify-between mt-2">
                     <span className="text-[9px] font-black text-navy/20 uppercase tracking-widest">{asset.metadata?.size || '0 KB'}</span>
                     <span className="text-[9px] font-black text-gold uppercase tracking-widest">{asset.metadata?.dimensions || 'SVG'}</span>
                  </div>
               </div>
            </div>
          ))}
          
          {filteredMedia?.length === 0 && (
            <div className="col-span-full py-40 text-center luxury-card bg-navy/[0.02] border-dashed border-2 border-navy/10 shadow-none">
               <ImageIcon size={64} className="mx-auto mb-6 text-navy/10" />
               <p className="text-xl font-head font-extrabold text-navy/40 tracking-tight">Vault is Empty</p>
               <p className="text-xs text-navy/20 uppercase font-black tracking-widest mt-2">Start architecting your visual assets library</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
