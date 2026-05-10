import { useLang } from '../../shared/i18n';

export default function OutcomesList(props) {
  const { t } = useLang();
  const v = t.about.vision;
  const title = props.title || v.outcomesTitle;
  const outcomes = props.outcomes || v.outcomes;

  return (
    <section className="section">
      <div className="container">
        <div className="outcomes-section">
          <h2 className="section-title">{title}</h2>
          <div className="divider" />
          <div className="outcomes-list">
            {outcomes.map((o, i) => (
              <div key={i} className="outcome-item glass-card">
                <span className="outcome-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{o}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
