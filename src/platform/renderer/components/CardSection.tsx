import { Card } from '../../design-system/Card';

type CardSectionProps = {
  title?: string;
  text?: string;
  eyebrow?: string;
  image?: string;
};

export default function CardSection({ title, text, eyebrow, image }: CardSectionProps) {
  return (
    <Card className="r-card">
      {image && <img src={image} alt="" loading="lazy" />}
      {eyebrow && <span className="ui-eyebrow">{eyebrow}</span>}
      {title && <h3>{title}</h3>}
      {text && <p>{text}</p>}
    </Card>
  );
}
