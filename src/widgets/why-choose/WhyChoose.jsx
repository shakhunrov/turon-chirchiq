import { useLang } from '../../shared/i18n';
import './WhyChoose.css';

const icons = ['🌍', '🔬', '👨‍🏫', '❤️', '🎓', '🏫', '💻', '🤖'];

export default function WhyChoose() {
  const { t } = useLang();

  return (
    <section className="why-choose section">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">TIS afzalliklari</span>
          <h2 className="why-choose-title">{t.whyChoose.title}</h2>
          <div className="divider center" />
        </div>

        <div className="why-grid">
          {(t.why_choose_items || t.whyChoose.items).map((item, i) => (
            <div key={i} className="why-card glass-card">
              <div className="why-icon">{typeof item === 'object' ? (item.icon || icons[i % icons.length]) : icons[i % icons.length]}</div>
              <p className="why-text">{typeof item === 'object' ? item.text : item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
