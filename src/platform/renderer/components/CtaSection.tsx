import { Button } from '../../design-system/Button';
import { Card } from '../../design-system/Card';

type CtaSectionProps = {
  title?: string;
  text?: string;
  action?: {
    label: string;
    href: string;
  };
};

export default function CtaSection({ title, text, action }: CtaSectionProps) {
  return (
    <section className="renderer-layout-section">
      <div className="renderer-container">
        <Card className="r-card">
          {title && <h2 className="section-title">{title}</h2>}
          {text && <p className="section-subtitle">{text}</p>}
          {action && (
            <div className="r-actions">
              <Button href={action.href}>{action.label}</Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
