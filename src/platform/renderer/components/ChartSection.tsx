import { Card } from '../../design-system/Card';

type ChartSectionProps = {
  title?: string;
  data?: Array<{ label: string; value: number }>;
};

export default function ChartSection({ title, data = [] }: ChartSectionProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <Card className="r-card">
      {title && <h3>{title}</h3>}
      <div className="r-chart-bars">
        {data.map((item) => (
          <div key={item.label} className="r-chart-row">
            <span>{item.label}</span>
            <div className="r-chart-track">
              <div className="r-chart-bar" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
