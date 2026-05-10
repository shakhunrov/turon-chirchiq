import { Card } from '../../design-system/Card';

type StatsSectionProps = {
  eyebrow?: string;
  title?: string;
  items?: Array<{
    label: string;
    value: string;
    note?: string;
  }>;
};

export default function StatsSection({ eyebrow, title, items = [] }: StatsSectionProps) {
  return (
    <section className="r-stats">
      <div className="renderer-container">
        {(eyebrow || title) && (
          <div className="section-header center">
            {eyebrow && <span className="ui-eyebrow">{eyebrow}</span>}
            {title && <h2 className="section-title">{title}</h2>}
          </div>
        )}
        <div className="r-stats-grid">
          {items.map((item) => (
            <Card key={item.label} className="r-stat">
              <div className="r-stat-value">{item.value}</div>
              <div>{item.label}</div>
              {item.note && <small>{item.note}</small>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
