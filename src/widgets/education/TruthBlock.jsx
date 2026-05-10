import { useLang } from '../../shared/i18n';

export default function TruthBlock(props) {
  const { t } = useLang();
  const title = props.title || t.education.truthTitle;
  const text = props.text || t.education.truthText;
  const num = props.num || '01';

  return (
    <section className="section">
      <div className="container">
        <div className="edu-truth glass-card">
          <div className="edu-truth-num">{num}</div>
          <div>
            <h2 className="edu-truth-title">{title}</h2>
            <p className="edu-truth-text">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
