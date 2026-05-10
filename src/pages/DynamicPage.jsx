import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../shared/api/axiosInstance';
import { COMPONENT_MAP } from '../ComponentRegistry';

export default function DynamicPage() {
  const { slug = 'home' } = useParams();
  const locale = localStorage.getItem('locale') || 'uz';
  const branchId = localStorage.getItem('globalBranchId');

  const { data: page, isLoading, error } = useQuery({
    queryKey: ['page', slug, locale, branchId],
    queryFn: async () => {
      const res = await api.get(`/pages/${slug}/`, {
        params: { locale, branch: branchId },
      });
      return res.data;
    },
  });

  if (isLoading) return <div className="loading-screen"><span className="al-spinner" /></div>;
  if (error || !page) return <div className="error-screen">Page not found</div>;

  return (
    <div className="dynamic-page">
      {page.sections.map((section) => {
        const Component = COMPONENT_MAP[section.component_key];
        if (!Component) {
          console.warn(`Component ${section.component_key} not found in registry`);
          return null;
        }
        return <Component key={section.id} {...section.props} />;
      })}
    </div>
  );
}
