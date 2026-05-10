import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useMenus, useUpdateMenu } from '../hooks/useCMS';
import { Menu as MenuIcon, Plus, GripVertical, Edit2, Trash2, ExternalLink, Save, RefreshCw } from 'lucide-react';
import { cn } from '../../shared/utils/cn';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableMenuItem({ item, id }: { item: any, id: string }) {
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
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className={cn("p-6 bg-white border border-navy/5 rounded-[24px] hover:border-navy/20 hover:shadow-xl hover:shadow-navy/5 transition-all duration-500 group flex items-center justify-between", isDragging && "shadow-2xl scale-[1.02] opacity-90")}>
      <div className="flex items-center gap-6">
         <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-navy/20 hover:text-navy transition-colors focus:outline-none">
            <GripVertical size={20} />
         </div>
         <div className="w-12 h-12 grad-luxury text-white rounded-2xl flex items-center justify-center font-black shadow-xl shadow-navy/10 group-hover:rotate-12 transition-all">
            {item.title?.[0] || 'L'}
         </div>
         <div>
            <p className="text-base font-extrabold text-navy tracking-tight">{item.title}</p>
            <p className="text-xs text-navy/40 font-bold mt-0.5 tracking-tight flex items-center gap-1.5">
               {item.url}
               <ExternalLink size={10} />
            </p>
         </div>
      </div>
      <div className="flex items-center gap-3">
         <div className="px-4 py-1.5 bg-emerald-50 text-accent-green rounded-full text-[10px] font-black uppercase tracking-widest">
            ACTIVE
         </div>
         <div className="h-8 w-px bg-navy/5 mx-2" />
         <button className="p-2.5 hover:bg-navy/5 text-navy/20 hover:text-navy rounded-xl transition-all">
            <Edit2 size={16} />
         </button>
         <button className="p-2.5 hover:bg-accent-red/5 text-navy/20 hover:text-accent-red rounded-xl transition-all">
            <Trash2 size={16} />
         </button>
      </div>
    </div>
  );
}

export default function MenuBuilder() {
  const { data: menus, isLoading, refetch } = useMenus();
  const updateMutation = useUpdateMenu();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [localItems, setLocalItems] = useState<any[]>([]);

  const activeMenu = menus?.find((m: any) => m.id === activeMenuId) || menus?.[0];

  useEffect(() => {
    if (activeMenu?.items) {
      setLocalItems([...activeMenu.items]);
    }
  }, [activeMenu]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLocalItems((items) => {
        const oldIndex = items.findIndex((i: any) => (i.id || i.title) === active.id);
        const newIndex = items.findIndex((i: any) => (i.id || i.title) === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleUpdateItems = () => {
    if (activeMenu) {
      updateMutation.mutate({
        id: activeMenu.id,
        data: { items: localItems }
      });
    }
  };

  return (
    <AdminLayout title="Architecture & Menus">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Menu List */}
        <div className="w-full lg:w-80 space-y-8">
           <div className="luxury-card p-8">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-sm font-black text-navy uppercase tracking-[0.2em]">Site Structures</h3>
                 <button 
                  onClick={() => refetch()}
                  className="p-2 bg-navy text-white rounded-lg hover:rotate-90 transition-all duration-500"
                 >
                    <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                 </button>
              </div>
              
              <div className="space-y-3">
                 {isLoading ? (
                   [1,2,3].map(i => <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-2xl" />)
                 ) : (
                   menus?.map((menu: any) => (
                    <button
                      key={menu.id}
                      onClick={() => setActiveMenuId(menu.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 group",
                        (activeMenuId === menu.id || (!activeMenuId && activeMenu?.id === menu.id))
                         ? "grad-luxury text-white shadow-xl scale-[1.02]" 
                         : "hover:bg-navy/5 text-navy/60"
                      )}
                    >
                      <div className="flex items-center gap-4">
                         <MenuIcon size={18} className={(activeMenuId === menu.id || (!activeMenuId && activeMenu?.id === menu.id)) ? "text-gold" : "text-navy/20"} />
                         <span className="text-sm font-bold tracking-tight">{menu.name}</span>
                      </div>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", (activeMenuId === menu.id || (!activeMenuId && activeMenu?.id === menu.id)) ? "text-white/40" : "text-navy/20")}>
                         {menu.items?.length || 0}
                      </span>
                    </button>
                  ))
                 )}
              </div>
           </div>

           <div className="grad-gold p-8 rounded-[32px] text-white shadow-2xl shadow-gold/20 relative overflow-hidden group">
              <div className="relative z-10">
                 <h4 className="font-head font-extrabold text-xl mb-2">Smart Links</h4>
                 <p className="text-white/70 text-xs mb-6 leading-relaxed">System automatically maps slugs to their respective page architectures.</p>
                 <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md border border-white/10">
                    Run Integrity Check
                 </button>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
           </div>
        </div>

        {/* Builder Area */}
        <div className="flex-1 space-y-8">
           {!activeMenu ? (
             <div className="luxury-card p-20 flex flex-col items-center justify-center text-center opacity-20">
                <MenuIcon size={64} className="mb-6" />
                <p className="text-xl font-head font-extrabold tracking-tight">Select a Navigation Structure</p>
             </div>
           ) : (
             <div className="luxury-card p-10 animate-in fade-in duration-700">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-navy/5">
                   <div>
                      <h3 className="text-2xl font-head font-extrabold text-navy tracking-tight">{activeMenu.name}</h3>
                      <p className="text-xs text-navy/40 mt-1 uppercase font-bold tracking-widest">Architectural Hierarchy Manager</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <button className="p-3 bg-navy/5 text-navy rounded-2xl hover:bg-navy/10 transition-colors">
                         <Plus size={20} />
                      </button>
                      <button 
                        onClick={handleUpdateItems}
                        className={cn(
                          "grad-luxury text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-2px] transition-all flex items-center gap-2",
                          updateMutation.isPending && "opacity-50 pointer-events-none"
                        )}
                      >
                         {updateMutation.isPending ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                         {updateMutation.isPending ? 'Syncing...' : 'Sync Menu'}
                      </button>
                   </div>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={localItems.map(i => i.id || i.title)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                       {localItems.map((item: any, idx: number) => (
                         <SortableMenuItem key={item.id || item.title} item={item} id={item.id || item.title} />
                       ))}
                       
                       {localItems.length === 0 && (
                         <div className="py-20 text-center opacity-20 bg-navy/[0.01] rounded-[32px] border-2 border-dashed border-navy/5">
                            <p className="font-bold">No items in this menu yet.</p>
                         </div>
                       )}
                    </div>
                  </SortableContext>
                </DndContext>
             </div>
           )}
        </div>
      </div>
    </AdminLayout>
  );
}
