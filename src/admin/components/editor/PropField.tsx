import React from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';

import { MediaPicker } from './MediaPicker';

interface PropFieldProps {
  label: string;
  value: any;
  onChange: (newValue: any) => void;
  type?: 'text' | 'textarea' | 'image' | 'number' | 'boolean' | 'json';
}

export function PropField({ label, value, onChange, type = 'text' }: PropFieldProps) {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  return (
    <div className="space-y-3 group">
      {/* ... existing header ... */}
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">
          {label.replace(/_/g, ' ')}
        </label>
        <span className="text-[9px] font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
          {type} Unit
        </span>
      </div>
      
      {type === 'text' && (
        <input 
          type="text" 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-5 py-4 bg-navy/[0.02] border border-navy/5 rounded-2xl text-sm font-bold text-navy focus:ring-4 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all shadow-inner"
        />
      )}

      {type === 'number' && (
        <input 
          type="number" 
          value={value || 0} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-5 py-4 bg-navy/[0.02] border border-navy/5 rounded-2xl text-sm font-bold text-navy focus:ring-4 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all shadow-inner"
        />
      )}

      {type === 'textarea' && (
        <textarea 
          rows={4}
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-5 py-4 bg-navy/[0.02] border border-navy/5 rounded-2xl text-sm font-bold text-navy focus:ring-4 focus:ring-navy/5 focus:outline-none focus:border-navy transition-all shadow-inner leading-relaxed"
        />
      )}

      {type === 'boolean' && (
        <div className="flex items-center justify-between p-4 bg-navy/[0.02] rounded-2xl border border-navy/5">
           <span className="text-xs font-bold text-navy/60">{value ? 'Active State' : 'Disabled State'}</span>
           <div 
             onClick={() => onChange(!value)}
             className={cn(
               "w-14 h-8 rounded-full p-1.5 cursor-pointer transition-all duration-500 relative",
               value ? 'grad-luxury shadow-lg shadow-navy/20' : 'bg-navy/10'
             )}
           >
             <div className={cn(
               "w-5 h-5 bg-white rounded-full transition-transform duration-500 shadow-sm",
               value ? 'translate-x-6' : 'translate-x-0'
             )} />
           </div>
        </div>
      )}
      
      {type === 'image' && (
        <div className="space-y-4">
           {value && (
             <div className="relative aspect-video rounded-3xl overflow-hidden border border-navy/10 shadow-2xl group/img">
               <img src={value} className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" alt="Preview" />
               <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => onChange(null)}
                    className="w-12 h-12 bg-white text-accent-red rounded-2xl shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>
               </div>
             </div>
           )}
           <button 
             onClick={() => setIsPickerOpen(true)}
             className="w-full py-6 border-2 border-dashed border-navy/10 rounded-[32px] text-[10px] font-black text-navy/30 hover:bg-navy/5 hover:text-navy hover:border-navy/20 transition-all uppercase tracking-[0.2em] flex flex-col items-center gap-3"
           >
             <div className="w-12 h-12 bg-navy/[0.03] rounded-2xl flex items-center justify-center">
               <Upload size={20} />
             </div>
             Architect Visual Asset
           </button>

           <MediaPicker 
             isOpen={isPickerOpen} 
             onClose={() => setIsPickerOpen(false)} 
             onSelect={(url) => {
               onChange(url);
               setIsPickerOpen(false);
             }} 
           />
        </div>
      )}
    </div>
  );
}
