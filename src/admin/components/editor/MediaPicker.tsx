import React, { useState } from 'react';
import { X, Search, Upload, Check, ImageIcon, RefreshCw } from 'lucide-react';
import { useMediaAssets, useUploadMedia } from '../../hooks/useCMS';
import { cn } from '../../../shared/utils/cn';

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPicker({ isOpen, onClose, onSelect }: MediaPickerProps) {
  const { data: mediaAssets, isLoading, refetch } = useMediaAssets();
  const uploadMutation = useUploadMedia();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name);
      const res = await uploadMutation.mutateAsync(formData);
      if (res.url) {
        onSelect(res.url);
        onClose();
      }
    }
  };

  const filteredMedia = mediaAssets?.filter((m: any) => 
    m.alt?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.file?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-8 bg-navy/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-5xl h-[80vh] rounded-[48px] shadow-[0_40px_100px_-20px_rgba(28,36,54,0.4)] flex flex-col overflow-hidden border border-white/20">
        {/* Header */}
        <div className="p-10 border-b border-navy/5 flex items-center justify-between bg-navy/[0.02]">
          <div>
            <h2 className="text-3xl font-head font-extrabold text-navy tracking-tight">Media Vault Selection</h2>
            <p className="text-[10px] text-navy/30 uppercase font-black tracking-[0.2em] mt-2">Select an architected visual asset</p>
          </div>
          <button 
            onClick={onClose}
            className="w-14 h-14 bg-white hover:bg-navy hover:text-white rounded-2xl border border-navy/5 shadow-sm transition-all duration-500 flex items-center justify-center group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-8 border-b border-navy/5 flex items-center gap-6">
           <div className="relative flex-1 group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5 group-focus-within:text-gold transition-colors" />
             <input 
               type="text" 
               placeholder="Search vault..."
               className="w-full pl-16 pr-6 py-5 bg-navy/[0.02] rounded-[24px] focus:ring-4 focus:ring-navy/5 focus:outline-none transition-all font-bold text-navy"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           
           <label className="grad-gold text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-4px] transition-all flex items-center gap-3 cursor-pointer shrink-0">
             {uploadMutation.isPending ? <RefreshCw size={20} className="animate-spin" /> : <Upload size={20} />}
             <span>{uploadMutation.isPending ? 'Syncing...' : 'Upload New'}</span>
             <input type="file" className="hidden" onChange={handleUpload} disabled={uploadMutation.isPending} />
           </label>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-10 admin-scroll bg-[var(--bg-main)]/30">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
               {[1,2,3,4,5,6,7,8,9,10].map(i => (
                 <div key={i} className="aspect-square bg-white rounded-3xl border border-navy/5 animate-pulse" />
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
               {filteredMedia?.map((asset: any) => (
                 <div 
                   key={asset.id}
                   onClick={() => setSelectedUrl(asset.url)}
                   className={cn(
                     "aspect-square relative rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 group",
                     selectedUrl === asset.url ? "ring-4 ring-gold ring-offset-4" : "hover:scale-105"
                   )}
                 >
                    <img src={asset.url} className="w-full h-full object-cover" alt={asset.alt} />
                    <div className={cn(
                      "absolute inset-0 bg-navy/40 flex items-center justify-center transition-opacity duration-500",
                      selectedUrl === asset.url ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-navy shadow-2xl">
                          <Check size={24} className={selectedUrl === asset.url ? "text-gold" : "text-navy/20"} />
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-navy/5 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <ImageIcon size={20} className="text-gold" />
              <p className="text-[10px] font-black text-navy/30 uppercase tracking-[0.3em]">Vault Engine v4.0</p>
           </div>
           <button 
             disabled={!selectedUrl}
             onClick={() => selectedUrl && onSelect(selectedUrl)}
             className="grad-luxury text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-4px] transition-all disabled:opacity-20 disabled:pointer-events-none"
           >
             Confirm Selection
           </button>
        </div>
      </div>
    </div>
  );
}
