import React, { useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useAdmissions, useContacts } from '../hooks/useCMS';
import { 
  Inbox, 
  Search, 
  Filter, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  GraduationCap,
  MessageSquare,
  RefreshCw,
  Eye,
  Trash2
} from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function InquiryManager() {
  const [activeTab, setActiveTab] = useState<'admissions' | 'contacts'>('admissions');
  const { data: admissions, isLoading: admissionsLoading, refetch: refetchAdmissions } = useAdmissions();
  const { data: contacts, isLoading: contactsLoading, refetch: refetchContacts } = useContacts();

  const isLoading = activeTab === 'admissions' ? admissionsLoading : contactsLoading;
  const currentData = activeTab === 'admissions' ? admissions : contacts;

  return (
    <AdminLayout title="Communication Intelligence">
      <div className="flex gap-4 mb-12">
        <button
          onClick={() => setActiveTab('admissions')}
          className={cn(
            "px-10 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3",
            activeTab === 'admissions' 
              ? "grad-luxury text-white shadow-2xl scale-[1.05]" 
              : "luxury-glass text-navy/40 hover:text-navy"
          )}
        >
          <GraduationCap size={20} />
          Student Admissions
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={cn(
            "px-10 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3",
            activeTab === 'contacts' 
              ? "grad-luxury text-white shadow-2xl scale-[1.05]" 
              : "luxury-glass text-navy/40 hover:text-navy"
          )}
        >
          <MessageSquare size={20} />
          Inquiry Messages
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="relative flex-1 max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5 group-focus-within:text-gold transition-colors" />
          <input 
            type="text" 
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-16 pr-6 py-5 luxury-glass rounded-[24px] focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy transition-all font-bold text-navy"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => activeTab === 'admissions' ? refetchAdmissions() : refetchContacts()}
            className="p-5 luxury-glass rounded-2xl text-navy/40 hover:text-navy transition-all"
          >
            <RefreshCw size={22} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button className="p-5 luxury-glass rounded-2xl text-navy/40 hover:text-navy transition-all">
            <Filter size={22} />
          </button>
        </div>
      </div>

      <div className="luxury-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy/[0.02] border-b border-navy/5">
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Sender Profile</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Contact Metadata</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">{activeTab === 'admissions' ? 'Grade/Status' : 'Message Subject'}</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Received</th>
                <th className="px-8 py-6 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {isLoading ? (
                [1,2,3].map(i => (
                  <tr key={i} className="animate-pulse h-24 bg-slate-50/50" />
                ))
              ) : currentData?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center opacity-20">
                     <Inbox size={48} className="mx-auto mb-4" />
                     <p className="text-[10px] font-black uppercase tracking-widest">No inquiries pending review</p>
                  </td>
                </tr>
              ) : (
                currentData?.map((item: any) => (
                  <tr key={item.id} className="hover:bg-navy/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-navy/5 rounded-xl flex items-center justify-center text-navy/20 group-hover:bg-navy group-hover:text-white transition-all duration-500">
                          <User size={24} />
                        </div>
                        <div>
                          <p className="text-base font-extrabold text-navy tracking-tight group-hover:text-gold transition-colors">{item.student_name || item.name}</p>
                          <p className="text-[10px] text-navy/30 font-bold uppercase tracking-widest mt-1">Ref ID: {item.application_id || `MSG-${item.id}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-navy/60">
                           <Phone size={12} className="text-navy/20" />
                           {item.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-navy/60">
                           <Mail size={12} className="text-navy/20" />
                           {item.email || 'No Email'}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       {activeTab === 'admissions' ? (
                         <div className="flex flex-col gap-2">
                            <span className="text-xs font-black text-navy uppercase tracking-widest">Grade {item.grade}</span>
                            <div className={cn(
                              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit border",
                              item.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                            )}>
                               {item.status}
                            </div>
                         </div>
                       ) : (
                         <div className="max-w-xs">
                            <p className="text-sm font-bold text-navy line-clamp-2 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                               {item.message}
                            </p>
                         </div>
                       )}
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2 text-xs font-bold text-navy/40">
                          <Calendar size={14} className="text-navy/10" />
                          {new Date(item.created_at).toLocaleDateString()}
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 hover:bg-navy hover:text-white rounded-xl transition-all text-navy/40">
                            <Eye size={18} />
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
      </div>
    </AdminLayout>
  );
}
