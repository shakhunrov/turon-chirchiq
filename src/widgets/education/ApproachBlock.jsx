import { useLang } from '../../shared/i18n';

export default function ApproachBlock(props) {
  const { t } = useLang();
  const title = props.title || t.education.approachTitle;
  const text = props.text || t.education.approachText;

  return (
    <section className="section">
      <div className="container">
        <div className="edu-approach">
          <h2 className="section-title">{title}</h2>
          <div className="divider" />
          <p className="section-subtitle">{text}</p>
        </div>
      </div>
    </section>
  );
}
