import { useState } from 'react';
import { useLang } from '../../shared/i18n';
import { useAdmissionMutation } from '../../shared/api/hooks';
import { X } from 'lucide-react';
import './AdmissionModal.css';

const GRADES = ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11'];

export default function AdmissionModal({ onClose }) {
  const { t } = useLang();
  const m = t.admissions.modal;

  const mutation = useAdmissionMutation();
  const { mutate, isLoading: loading, isSuccess: submitSuccess, error: mutationError } = mutation;

  const [form, setForm] = useState({ name: '', phone: '', grade: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      student_name: form.name,
      phone: form.phone,
      grade: form.grade,
      branch: localStorage.getItem("globalBranchId") || null,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <div className="modal-header">
          <div className="modal-icon">🎓</div>
          <h2 className="modal-title">{m.title}</h2>
        </div>
        {submitSuccess ? (
          <div className="modal-success">
            <div className="success-icon">✅</div>
            <p>{m.success}</p>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-input"
                placeholder={m.namePlaceholder}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-input"
                placeholder={m.phonePlaceholder}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                type="tel"
              />
            </div>
            <div className="form-group">
              <select
                className="form-input"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
                required
              >
                <option value="">{m.gradePlaceholder}</option>
                {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            {mutationError && (
              <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 8 }}>
                {mutationError.response?.data?.errors?.student_name?.[0] || 
                 mutationError.response?.data?.message || 
                 "Xatolik yuz berdi. Qaytadan urinib ko'ring."}
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8, justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Yuborilmoqda…' : m.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
