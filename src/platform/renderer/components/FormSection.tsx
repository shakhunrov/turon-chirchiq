import { useState } from 'react';
import api from '../../../shared/api/axiosInstance';

type Field = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
  placeholder?: string;
};

type FormSectionProps = {
  title?: string;
  formKey?: string;
  submitLabel?: string;
  fields?: Field[];
};

export default function FormSection({ title, formKey, submitLabel = 'Submit', fields = [] }: FormSectionProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formKey) return;
    
    setStatus('loading');
    try {
      await api.post(`/website-sources/cms/forms/${formKey}/submit/`, {
        data: formData,
        branch: localStorage.getItem('globalBranchId') || '6'
      });
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Submission failed');
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
        <h3>Success!</h3>
        <p>Thank you for your submission. We will get back to you soon.</p>
        <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: 20 }}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: 32 }}>
      {title && <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: 24 }}>{title}</h2>}
      <form className="r-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                className="form-input"
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                style={{ minHeight: 120 }}
              />
            ) : (
              <input
                className="form-input"
                name={field.name}
                type={field.type ?? 'text'}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        
        {status === 'error' && (
          <div style={{ color: '#e74c3c', marginBottom: 16 }}>{errorMsg}</div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={status === 'loading'}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {status === 'loading' ? 'Submitting...' : submitLabel}
        </button>
      </form>
    </div>
  );
}
