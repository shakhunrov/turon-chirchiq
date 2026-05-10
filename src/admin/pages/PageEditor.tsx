import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
} from '@dnd-kit/sortable';
import { SortableSection } from '../components/editor/SortableSection';
import { PropField } from '../components/editor/PropField';
import { SectionLibrary } from '../components/editor/SectionLibrary';
import { useCMSPage, useUpdatePage } from '../hooks/useCMS';
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Settings, 
  Plus, 
  GripVertical, 
  Trash2, 
  Copy,
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  Tablet,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Search,
  Layout,
  Globe,
  Lock,
  Zap
} from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function PageEditor() {
  const { id } = useParams();
  const { data: pageData, isLoading } = useCMSPage(id || null);
  const updateMutation = useUpdatePage();
  
  const [sections, setSections] = useState<any[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    if (pageData?.sections) {
      const sorted = [...pageData.sections].sort((a, b) => a.sort_order - b.sort_order);
      setSections(sorted.map(s => ({ ...s, id: s.id.toString() })));
    }
  }, [pageData]);

  const activeSection = sections.find(s => s.id === activeSectionId);

  const handleAddSection = (component: any) => {
    const newSection = {
      id: `temp-${Date.now()}`,
      component: component,
      props: component.default_props || {},
      sort_order: sections.length,
      is_active: true,
      visibility: { roles: [], audience: 'public' }
    };
    setSections(prev => [...prev, newSection]);
    setActiveSectionId(newSection.id);
    setIsLibraryOpen(false);
  };

  const handleDuplicateSection = (section: any) => {
    const duplicated = {
      ...section,
      id: `temp-dup-${Date.now()}`,
      sort_order: sections.indexOf(section) + 1
    };
    const newSections = [...sections];
    newSections.splice(sections.indexOf(section) + 1, 0, duplicated);
    const updated = newSections.map((s, i) => ({ ...s, sort_order: i }));
    setSections(updated);
    setActiveSectionId(duplicated.id);
  };

  const handlePropChange = (propKey: string, newValue: any) => {
    setSections(prev => prev.map(s => (
      s.id === activeSectionId ? { ...s, props: { ...s.props, [propKey]: newValue } } : s
    )));
  };

  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
    if (activeSectionId === id) setActiveSectionId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered.map((item, idx) => ({ ...item, sort_order: idx }));
      });
    }
  };

  const handleSave = async () => {
    if (!id) return;
    const payload = {
      sections: sections.map((s, index) => ({
        id: s.id.startsWith('temp') ? undefined : parseInt(s.id),
        component: s.component?.id || s.component,
        props: s.props,
        sort_order: index,
        is_active: true,
        visibility: s.visibility || { roles: [], audience: 'public' }
      }))
    };
    
    try {
      const updatedPage = await updateMutation.mutateAsync({ id, data: payload });
      // Crucial: Update local state with real IDs from backend to prevent duplicates on next save
      if (updatedPage?.sections) {
        const sorted = [...updatedPage.sections].sort((a, b) => a.sort_order - b.sort_order);
        setSections(sorted.map(s => ({ ...s, id: s.id.toString() })));
      }
    } catch (err) {
      console.error("Failed to deploy architecture:", err);
    }
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-[var(--bg-main)]">
       <div className="flex flex-col items-center gap-6">
          <RefreshCw className="animate-spin text-gold" size={48} />
          <p className="text-[10px] font-black text-navy/30 uppercase tracking-[0.4em]">Initializing Architect Environment</p>
       </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-main)] font-body overflow-hidden">
      {/* Editor Header */}
      <header className="h-[var(--header-height)] luxury-glass flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link to="/admin/cms/pages" className="w-12 h-12 bg-white rounded-2xl border border-navy/5 flex items-center justify-center text-navy hover:grad-luxury hover:text-white transition-all shadow-sm">
            <ChevronLeft size={22} />
          </Link>
          <div className="h-8 w-px bg-navy/10" />
          <div>
            <h1 className="text-xl font-head font-extrabold text-navy tracking-tight leading-none">{pageData?.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-[10px] text-gold font-black uppercase tracking-[0.2em]">Architecture Engine</p>
              <div className="w-1 h-1 rounded-full bg-navy/20" />
              <p className="text-[10px] text-navy/30 font-black uppercase tracking-[0.2em]">/{pageData?.slug}</p>
            </div>
          </div>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center bg-navy/[0.03] p-1.5 rounded-2xl border border-navy/5">
          <button 
            onClick={() => setPreviewDevice('desktop')}
            className={cn("w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500", previewDevice === 'desktop' ? "bg-white shadow-xl text-navy scale-110" : "text-navy/20 hover:text-navy/40")}
          >
            <Monitor size={20} />
          </button>
          <button 
            onClick={() => setPreviewDevice('tablet')}
            className={cn("w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500", previewDevice === 'tablet' ? "bg-white shadow-xl text-navy scale-110" : "text-navy/20 hover:text-navy/40")}
          >
            <Tablet size={20} />
          </button>
          <button 
            onClick={() => setPreviewDevice('mobile')}
            className={cn("w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500", previewDevice === 'mobile' ? "bg-white shadow-xl text-navy scale-110" : "text-navy/20 hover:text-navy/40")}
          >
            <Smartphone size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-3 px-6 py-3 text-navy font-black text-[10px] uppercase tracking-widest hover:bg-navy/5 rounded-2xl transition-all"
          >
            <Globe size={18} className="text-gold" />
            <span>Deployment Settings</span>
          </button>
          
          <button 
            disabled={updateMutation.isPending}
            onClick={handleSave}
            className="flex items-center gap-3 px-10 py-4 grad-luxury text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-4px] active:translate-y-0 transition-all disabled:opacity-50"
          >
            {updateMutation.isPending ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
            <span>{updateMutation.isPending ? 'Synchronizing...' : 'Deploy Architecture'}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Structure */}
        <aside className="w-80 luxury-glass flex flex-col overflow-hidden m-4 mr-0 rounded-[32px] border border-navy/5 shadow-2xl">
          <div className="p-8 border-b border-navy/5 bg-navy/[0.01]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em]">Site Layout Units</h3>
              <button 
                onClick={() => setIsLibraryOpen(true)}
                className="w-10 h-10 grad-gold text-white rounded-xl shadow-lg hover:rotate-90 transition-all duration-500 flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20 w-4 h-4 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Find structure unit..." 
                className="w-full pl-11 pr-4 py-3 bg-navy/[0.03] border-none rounded-xl text-xs focus:ring-2 focus:ring-navy/5 transition-all font-bold text-navy"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 admin-scroll space-y-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {sections.map((section: any, index: number) => (
                  <SortableSection
                    key={section.id}
                    id={section.id}
                    name={section.component?.name || 'Unit Block'}
                    index={index}
                    isActive={activeSectionId === section.id}
                    onClick={() => setActiveSectionId(section.id)}
                    onDelete={() => handleDeleteSection(section.id)}
                    onDuplicate={() => handleDuplicateSection(section)}
                  />
                ))}
              </SortableContext>
            </DndContext>
            
            {sections.length === 0 && (
              <div className="py-20 text-center opacity-20">
                 <Layout size={48} className="mx-auto mb-4" />
                 <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Canvas Empty<br />Architect a Section</p>
              </div>
            )}
          </div>
        </aside>

        {/* Center: Intelligence Viewport */}
        <main className="flex-1 p-12 overflow-y-auto flex flex-col items-center admin-scroll">
           <div className={cn(
             "bg-white shadow-[0_40px_100px_-20px_rgba(28,36,54,0.3)] transition-all duration-700 rounded-[40px] overflow-hidden border border-navy/5 relative group",
             previewDevice === 'desktop' && "w-full max-w-6xl h-full min-h-[1000px]",
             previewDevice === 'tablet' && "w-[768px] h-[1024px]",
             previewDevice === 'mobile' && "w-[375px] h-[667px]"
           )}>
             {/* Virtual Viewport Content */}
             <div className="w-full h-full bg-slate-50 relative overflow-hidden flex flex-col">
                <div className="h-10 bg-white border-b border-navy/5 flex items-center px-6 justify-between">
                   <div className="flex gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20" />
                   </div>
                   <div className="bg-navy/[0.03] px-6 py-1 rounded-full text-[9px] text-navy/40 font-black uppercase tracking-widest">
                     Simulation Active
                   </div>
                   <div className="w-12" />
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                   <div className="relative">
                      <Eye size={120} className="text-navy/[0.02] animate-pulse" />
                      <Sparkles className="absolute top-0 right-0 text-gold animate-float" size={32} />
                   </div>
                   <h3 className="text-3xl font-head font-extrabold text-navy/10 tracking-tighter mt-8">Deployment Preview Engine</h3>
                   <p className="text-[10px] font-black text-navy/5 uppercase tracking-[0.5em] mt-6">Architectural Sync in Progress...</p>
                </div>

                {/* Animated Scanline */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-scan" />
             </div>

             {/* Deployment Overlay */}
             <div className="absolute inset-0 bg-navy/90 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center backdrop-blur-xl">
                <div className="w-24 h-24 grad-luxury rounded-[32px] flex items-center justify-center text-white mb-10 shadow-2xl shadow-navy/50 animate-float">
                   <Zap size={48} />
                </div>
                <h4 className="text-4xl font-head font-extrabold text-white tracking-tight mb-4 text-center">Live Site Sync</h4>
                <p className="text-white/40 text-sm max-w-sm text-center leading-relaxed mb-12 font-medium">Your architectural modifications are being live-rendered in the production sandbox.</p>
                <a 
                  href={`/${pageData?.slug}?preview=true`} 
                  target="_blank"
                  className="px-14 py-5 bg-gold text-white font-black rounded-2xl text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-110 transition-all hover:bg-white hover:text-navy"
                >
                  View Deployment
                </a>
             </div>
           </div>
        </main>

        {/* Right Sidebar: Module Engineering */}
        <aside className="w-80 luxury-glass flex flex-col overflow-hidden m-4 ml-0 rounded-[32px] border border-navy/5 shadow-2xl">
          <div className="p-8 border-b border-navy/5 flex items-center justify-between bg-navy/[0.01]">
            <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.3em]">Unit Specs</h3>
            {activeSection && (
               <div className="px-3 py-1 bg-emerald-50 text-accent-green rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-wider">Sync Active</span>
               </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-8 admin-scroll">
            {!activeSection ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-10">
                <Settings size={48} className="mb-6" />
                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Select a Block Unit<br />to Architect Specs</p>
              </div>
            ) : (
              <div className="space-y-10 animate-in slide-in-from-right duration-500">
                 <div className="p-6 bg-navy/[0.02] rounded-3xl border border-navy/5 relative overflow-hidden group">
                    <div className="relative z-10">
                       <p className="text-[9px] font-black text-gold uppercase tracking-[0.2em] mb-2">Engine Module</p>
                       <p className="text-lg font-head font-extrabold text-navy tracking-tight">{activeSection.component?.name}</p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-navy/[0.02] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                 </div>

                 <div className="space-y-8">
                    {Object.entries(activeSection.props || {}).map(([key, val]) => (
                      <PropField 
                        key={key}
                        label={key}
                        value={val}
                        type={key.toLowerCase().includes('image') ? 'image' : typeof val === 'boolean' ? 'boolean' : (val?.toString().length > 50) ? 'textarea' : 'text'}
                        onChange={(newVal: any) => handlePropChange(key, newVal)}
                      />
                    ))}
                 </div>

                 <div className="h-px bg-navy/5" />

                 {/* Advanced Unit Settings */}
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-navy uppercase tracking-widest">Logic Control</span>
                       <ChevronDown size={14} className="text-navy/20" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                       <div className="p-5 bg-navy/[0.02] rounded-2xl border border-navy/5">
                          <p className="text-[9px] font-black text-navy/20 uppercase mb-3">Audience Lock</p>
                          <div className="flex flex-wrap gap-2">
                             {['Public', 'Staff', 'Student'].map(role => (
                               <button key={role} className="px-3 py-1 bg-white border border-navy/5 rounded-lg text-[9px] font-black text-navy hover:bg-navy hover:text-white transition-all uppercase">
                                 {role}
                               </button>
                             ))}
                          </div>
                       </div>
                       <div className="p-5 bg-navy/[0.02] rounded-2xl border border-navy/5">
                          <p className="text-[9px] font-black text-navy/20 uppercase mb-3">Simulation ID</p>
                          <p className="text-[10px] font-black text-navy font-mono">ID_{activeSection.id.toString().slice(-8)}</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <SectionLibrary 
        isOpen={isLibraryOpen} 
        onClose={() => setIsLibraryOpen(false)} 
        onAdd={handleAddSection} 
      />
    </div>
  );
}
