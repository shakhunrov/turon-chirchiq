import { Link } from 'react-router-dom';
import { useLang } from '../../shared/i18n';

export default function HomeCTA(props) {
  const { t } = useLang();
  const title = props.title || t.cta?.title;
  const buttons = props.buttons || [
    { label: t.cta?.button, path: '/admissions', primary: true },
    { label: t.cta?.consult, path: '/contact', primary: false },
  ];

  return (
    <section className="cta-banner section">
      <div className="container">
        <div className="cta-box glass-card">
          <div className="cta-glow" />
          <h2 className="cta-title">{title}</h2>
          <div className="cta-actions">
            {buttons.map((btn, i) => (
              <Link 
                key={i} 
                to={btn.path} 
                className={`btn ${btn.primary ? 'btn-primary' : 'btn-outline'}`}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
