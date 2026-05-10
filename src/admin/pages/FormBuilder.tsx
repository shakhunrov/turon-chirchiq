import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useDynamicForms, useUpdateForm, useCreateForm, useDeleteForm } from '../hooks/useCMS';
import { Plus, GripVertical, Trash2, Edit2, Save, RefreshCw, Send, CheckCircle, Search, MessageSquare, AlertCircle } from 'lucide-react';
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

function SortableField({ field, idx, updateField, removeField }: { field: any, idx: number, updateField: (i: number, f: any) => void, removeField: (i: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: `field-${idx}` });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 50 : 'auto' };

  return (
    <div ref={setNodeRef} style={style} className={cn("p-6 bg-white border border-navy/5 rounded-[24px] hover:border-navy/20 hover:shadow-xl hover:shadow-navy/5 transition-all duration-500 group flex flex-col gap-4", isDragging && "shadow-2xl scale-[1.02] opacity-90")}>
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-navy/20 hover:text-navy transition-colors focus:outline-none">
                <GripVertical size={20} />
             </div>
             <div className="w-14 h-14 bg-navy/[0.03] rounded-2xl flex items-center justify-center text-navy shadow-inner group-hover:bg-navy group-hover:text-white transition-all duration-700">
                <Send size={22} />
             </div>
             <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  value={field.label} 
                  onChange={(e) => updateField(idx, { ...field, label: e.target.value })}
                  className="text-base font-extrabold text-navy tracking-tight bg-transparent border-b border-transparent hover:border-navy/20 focus:border-navy focus:outline-none transition-colors"
                  placeholder="Field Label"
                />
                <div className="flex items-center gap-3">
                   <select 
                     value={field.type} 
                     onChange={(e) => updateField(idx, { ...field, type: e.target.value })}
                     className="text-[10px] font-black text-gold uppercase tracking-widest bg-transparent focus:outline-none"
                   >
                     <option value="text">Text</option>
                     <option value="email">Email</option>
                     <option value="textarea">Textarea</option>
                     <option value="select">Select</option>
                   </select>
                   <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={field.required} 
                        onChange={(e) => updateField(idx, { ...field, required: e.target.checked })}
                        className="accent-accent-red"
                      />
                      <span className="text-[9px] font-black text-accent-red uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-lg">Required</span>
                   </label>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
                onClick={() => removeField(idx)}
                className="w-10 h-10 flex items-center justify-center hover:bg-accent-red/5 text-navy/20 hover:text-accent-red rounded-xl transition-all"
             >
                <Trash2 size={18} />
             </button>
          </div>
       </div>
    </div>
  );
}

export default function FormBuilder() {
  const { data: forms, isLoading, refetch } = useDynamicForms();
  const updateMutation = useUpdateForm();
  const deleteMutation = useDeleteForm();
  const [activeFormId, setActiveFormId] = useState<number | null>(null);
  const [localFields, setLocalFields] = useState<any[]>([]);

  const activeForm = forms?.find((f: any) => f.id === activeFormId) || forms?.[0];

  useEffect(() => {
    if (activeForm?.fields) {
      setLocalFields([...activeForm.fields]);
    }
  }, [activeForm]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLocalFields((items) => {
        const oldIndex = items.findIndex((_, idx) => `field-${idx}` === active.id);
        const newIndex = items.findIndex((_, idx) => `field-${idx}` === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateField = (index: number, newField: any) => {
    const updated = [...localFields];
    updated[index] = newField;
    setLocalFields(updated);
  };

  const addField = () => {
    setLocalFields([...localFields, { label: 'New Field', type: 'text', required: false }]);
  };

  const removeField = (index: number) => {
    setLocalFields(localFields.filter((_, i) => i !== index));
  };

  const handleSyncSchema = () => {
    if (activeForm) {
      updateMutation.mutate({
        id: activeForm.id,
        data: { fields: localFields }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this form architecture?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout title="Intelligence Forms">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Forms List */}
        <div className="w-full lg:w-80 space-y-8">
           <div className="luxury-card p-8">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em]">Form Directory</h3>
                 <button 
                  onClick={() => {/* Open Create Modal */}}
                  className="w-10 h-10 grad-gold text-white rounded-xl shadow-lg hover:rotate-90 transition-all duration-500 flex items-center justify-center"
                 >
                    <Plus size={20} />
                 </button>
              </div>
              
              <div className="space-y-3">
                 {isLoading ? (
                   [1,2,3].map(i => <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-2xl" />)
                 ) : (
                   forms?.map((form: any) => (
                    <button
                      key={form.id}
                      onClick={() => setActiveFormId(form.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 group",
                        (activeFormId === form.id || (!activeFormId && activeForm?.id === form.id))
                         ? "grad-luxury text-white shadow-xl scale-[1.02]" 
                         : "hover:bg-navy/5 text-navy/60"
                      )}
                    >
                      <div className="flex items-center gap-4">
                         <MessageSquare size={18} className={(activeFormId === form.id || (!activeFormId && activeForm?.id === form.id)) ? "text-gold" : "text-navy/20"} />
                         <span className="text-sm font-bold tracking-tight">{form.title}</span>
                      </div>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", (activeFormId === form.id || (!activeFormId && activeForm?.id === form.id)) ? "text-white/40" : "text-navy/20")}>
                         {form.key}
                      </span>
                    </button>
                  ))
                 )}
              </div>
           </div>

           <div className="luxury-glass p-8 rounded-[32px] border border-navy/5 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-emerald-50 text-accent-green rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle size={24} />
                 </div>
                 <h4 className="text-xl font-head font-extrabold text-navy tracking-tight mb-2">Submission Sync</h4>
                 <p className="text-navy/40 text-xs leading-relaxed mb-6 font-medium">All submissions are encrypted and forwarded to the designated CRM endpoint.</p>
                 <button className="w-full py-4 bg-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl hover:translate-y-[-4px]">
                    Access Analytics
                 </button>
              </div>
           </div>
        </div>

        {/* Form Designer */}
        <div className="flex-1 space-y-8">
           {!activeForm ? (
             <div className="luxury-card p-20 flex flex-col items-center justify-center text-center opacity-20">
                <MessageSquare size={64} className="mb-6" />
                <p className="text-xl font-head font-extrabold tracking-tight">Select a Form to Architect</p>
             </div>
           ) : (
             <>
               <div className="luxury-card p-10 animate-in fade-in duration-700">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-navy/5">
                     <div>
                        <h3 className="text-2xl font-head font-extrabold text-navy tracking-tight">{activeForm.title}</h3>
                        <p className="text-xs text-navy/40 mt-1 uppercase font-bold tracking-widest">Logic & Field Designer • {activeForm.key}</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <button onClick={addField} className="w-12 h-12 bg-navy/[0.03] text-navy rounded-2xl hover:bg-navy/10 transition-colors flex items-center justify-center">
                           <Plus size={22} />
                        </button>
                        <button 
                          onClick={handleSyncSchema}
                          className={cn(
                            "grad-luxury text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-2px] transition-all flex items-center gap-3",
                            updateMutation.isPending && "opacity-50 pointer-events-none"
                          )}
                        >
                           {updateMutation.isPending ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                           {updateMutation.isPending ? 'Syncing...' : 'Sync Schema'}
                        </button>
                     </div>
                  </div>

                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={localFields.map((_, i) => `field-${i}`)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-4">
                         {localFields.map((field: any, idx: number) => (
                           <SortableField key={`field-${idx}`} field={field} idx={idx} updateField={updateField} removeField={removeField} />
                         ))}
                         {localFields.length === 0 && (
                           <div className="py-12 text-center text-navy/30 font-bold border-2 border-dashed border-navy/10 rounded-2xl">
                             No fields configured.
                           </div>
                         )}
                      </div>
                    </SortableContext>
                  </DndContext>
               </div>

               {/* Preview Area */}
               <div className="luxury-glass p-10 rounded-[44px] bg-white/40 border border-white/20">
                  <h4 className="text-sm font-black text-navy/30 uppercase tracking-[0.3em] mb-8 text-center">Live Logic Preview</h4>
                  <div className="max-w-lg mx-auto space-y-6 bg-white p-10 rounded-[32px] shadow-2xl shadow-navy/5">
                     {localFields.map((field: any, idx: number) => (
                       <div key={idx} className="space-y-2">
                          <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest">{field.label} {field.required && '*'}</label>
                          <input 
                            type={field.type === 'email' ? 'email' : 'text'} 
                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                            className="w-full px-6 py-4 bg-slate-50 border border-navy/5 rounded-2xl text-sm font-bold text-navy focus:ring-4 focus:ring-navy/5 focus:outline-none"
                          />
                       </div>
                     ))}
                     <button className="w-full py-5 grad-luxury text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:translate-y-[-2px] transition-all">
                        {activeForm.submit_text || 'Submit Inquiry'}
                     </button>
                  </div>
               </div>
             </>
           )}
        </div>
      </div>
    </AdminLayout>
  );
}
