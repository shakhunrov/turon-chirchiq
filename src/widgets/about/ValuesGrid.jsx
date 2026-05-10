import { useLang } from '../../shared/i18n';

export default function ValuesGrid(props) {
  const { t } = useLang();
  const v = t.about.vision;
  const title = props.title || v.valuesTitle;
  const values = props.values || v.values;

  return (
    <section className="section">
      <div className="container">
        <div className="vision-values-section">
          <h2 className="section-title">{title}</h2>
          <div className="divider" />
          <div className="values-grid">
            {values.map((val, i) => (
              <div key={i} className="value-tag glass-card">
                <span className="value-dot" />
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
