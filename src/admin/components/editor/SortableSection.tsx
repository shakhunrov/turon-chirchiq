import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Copy, Trash2, Layout } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';

interface SortableSectionProps {
  id: string;
  name: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function SortableSection({ 
  id, 
  name, 
  index, 
  isActive, 
  onClick, 
  onDelete, 
  onDuplicate 
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative transition-all duration-500 mb-4 group",
        isDragging ? "opacity-50 scale-105" : ""
      )}
    >
      <div
        onClick={onClick}
        className={cn(
          "p-5 rounded-[24px] border transition-all duration-500 cursor-pointer flex items-center justify-between",
          isActive 
            ? "bg-white border-navy shadow-[0_15px_30px_-5px_rgba(28,36,54,0.15)] scale-[1.02]" 
            : "bg-white/50 border-navy/5 hover:border-navy/20 hover:bg-white hover:shadow-xl hover:shadow-navy/5"
        )}
      >
        <div className="flex items-center gap-5">
          <div 
            {...attributes} 
            {...listeners}
            className="w-10 h-10 bg-navy/[0.03] rounded-xl flex items-center justify-center text-navy/20 hover:text-navy hover:bg-navy/5 transition-all cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className={cn("text-sm font-extrabold tracking-tight", isActive ? "text-navy" : "text-navy/60")}>
                {name}
              </p>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(201,165,53,0.6)]" />}
            </div>
            <p className="text-[9px] text-navy/20 font-black uppercase tracking-[0.2em] mt-1">Unit Index {index + 1}</p>
          </div>
        </div>

        <div className={cn(
          "flex items-center gap-2 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <button 
            onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
            className="w-9 h-9 bg-navy/[0.03] text-navy/20 hover:text-navy hover:bg-navy/5 rounded-xl transition-all flex items-center justify-center" 
            title="Duplicate Architecture"
          >
            <Copy size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-9 h-9 bg-navy/[0.03] text-navy/20 hover:text-accent-red hover:bg-accent-red/5 rounded-xl transition-all flex items-center justify-center" 
            title="Decommission Block"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
