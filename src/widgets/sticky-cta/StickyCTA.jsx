import { Link } from 'react-router-dom';
import { useLang } from '../../shared/i18n';
import { useQuery } from '@tanstack/react-query';
import api from '../../shared/api/axiosInstance';
import { Phone, GraduationCap, MapPin } from 'lucide-react';
import './StickyCTA.css';

export default function StickyCTA() {
  const { t } = useLang();
  const branchId = localStorage.getItem('globalBranchId') || '6';

  const { data: ctaConfig } = useQuery({
    queryKey: ['global-setting', 'sticky_cta', branchId],
    queryFn: async () => {
      const res = await api.get(`/website-sources/cms/settings/sticky_cta/`, {
        params: { branch: branchId }
      });
      return res.data.value;
    }
  });

  const items = ctaConfig?.items || [
    { label: t.sticky?.consult || 'Consultation', path: '/admissions', icon: 'GraduationCap', primary: true },
    { label: t.sticky?.admission || 'Admissions', path: '/admissions', icon: 'GraduationCap' },
    { label: t.sticky?.tour || 'Tour', path: '/contact', icon: 'MapPin' },
  ];

  return (
    <div className="sticky-cta">
      {items.map((item, i) => (
        <Link key={i} to={item.path} className={`sticky-cta-btn ${item.primary ? 'primary' : ''}`}>
          {item.icon === 'GraduationCap' && <GraduationCap size={14} />}
          {item.icon === 'MapPin' && <MapPin size={14} />}
          {item.icon === 'Phone' && <Phone size={14} />}
          {item.label}
        </Link>
      ))}
    </div>
  );
}
