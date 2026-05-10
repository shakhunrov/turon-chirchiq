import { Link } from 'react-router-dom';
import { useLang } from '../../shared/i18n';
import './HeroBanner.css';

export default function HeroBanner(props) {
  const { t } = useLang();
  
  const titleText = props.title || t.hero?.subtitle || t.hero?.vision || "Welcome to Turon International School";
  const subText = props.subtitle || t.hero?.description || t.whoWeAre?.text || "Empowering students through innovation and community.";
  const ctaText = props.ctaText || t.hero?.cta || "Learn More";
  const applyText = props.applyText || t.hero?.apply || "Apply Now";

  const words = titleText.split(' ');

  return (
    <section className="hero">
      {/* Animated background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Grid overlay */}
      <div className="hero-grid" />

      <div className="container hero-content">
        <div className="hero-badge fade-up">
          <span className="badge badge-cyan">🎓 {t.hero?.title || "International Education"}</span>
        </div>

        <h1 className="hero-title fade-up-d1">
          {words.slice(0, 5).join(' ')}{' '}
          <span className="text-gradient">{words.slice(5, 9).join(' ')}</span>{' '}
          {words.slice(9).join(' ')}
        </h1>

        <p className="hero-sub fade-up-d2">{subText}</p>

        <div className="hero-actions fade-up-d3">
          <Link to="/about/vision" className="btn btn-primary">
            {ctaText} →
          </Link>
          <Link to="/admissions" className="btn btn-outline">
            {applyText}
          </Link>
        </div>

        {/* Stats row */}
        <div className="hero-stats fade-up-d3">
          {[
            { val: '200+', label: t.stats?.students || 'Students' },
            { val: '30+', label: t.stats?.teachers || 'Teachers' },
            { val: '15+', label: t.stats?.universities || 'Universities' },
            { val: '3', label: 'Languages' },
          ].map((s) => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-val">{s.val}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="scroll-dot" />
      </div>
    </section>
  );
}
