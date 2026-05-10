import type { CSSProperties } from 'react';
import CardSection from './CardSection';

type CardsSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: Array<{
    title?: string;
    text?: string;
    eyebrow?: string;
    image?: string;
  }>;
};

export default function CardsSection({ eyebrow, title, subtitle, items = [] }: CardsSectionProps) {
  return (
    <section className="renderer-layout-section">
      <div className="renderer-container">
        {(eyebrow || title || subtitle) && (
          <div className="section-header center">
            {eyebrow && <span className="ui-eyebrow">{eyebrow}</span>}
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="renderer-grid" style={{ '--renderer-columns': 3 } as CSSProperties}>
          {items.map((item, index) => (
            <CardSection key={`${item.title ?? 'card'}-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
