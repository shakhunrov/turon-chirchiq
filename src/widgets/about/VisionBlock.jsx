import { useLang } from '../../shared/i18n';

export default function VisionBlock(props) {
  const { t } = useLang();
  const v = t.about.vision;
  const title = props.title || v.vision;
  const text = props.text || v.visionText;
  const icon = props.icon || '🌟';

  return (
    <section className="section">
      <div className="container">
        <div className="vision-block glass-card">
          <div className="vision-icon">{icon}</div>
          <h2 className="vision-block-title">{title}</h2>
          <p className="vision-text">{text}</p>
        </div>
      </div>
    </section>
  );
}
