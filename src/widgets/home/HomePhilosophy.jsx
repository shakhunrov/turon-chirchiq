import { Link } from 'react-router-dom';
import { useLang } from '../../shared/i18n';

export default function HomePhilosophy(props) {
  const { t } = useLang();
  const title = props.title || t.philosophy?.title;
  const text = props.text || t.philosophy?.text;
  const label = props.label || 'Falsafa';
  const tags = props.tags || ['STEAM', 'AI', 'Cambridge', 'Kelajak ko\'nikmalari'];
  const btnText = props.btnText || 'Bizning yondashuvimiz →';
  const btnPath = props.btnPath || '/education';

  return (
    <section className="section">
      <div className="container philosophy-section">
        <div className="philosophy-content">
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <div className="divider" />
          <p className="section-subtitle">{text}</p>
          <Link to={btnPath} className="btn btn-outline" style={{ marginTop: 24 }}>{btnText}</Link>
        </div>
        <div className="philosophy-cards">
          {tags.map((tag) => (
            <div key={tag} className="phil-tag glass-card">{tag}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
