import { Link } from 'react-router-dom';
import { useLang } from '../../shared/i18n';
import schoolImg from '../../shared/assets/img/school.png';

export default function HomeAbout(props) {
  const { t } = useLang();
  const title = props.title || t.whoWeAre?.title;
  const text = props.text || t.whoWeAre?.text;
  const label = props.label || t.nav?.about;
  const btnText = props.btnText || (t.nav?.about ? 'Batafsil →' : 'More →');
  const btnPath = props.btnPath || '/about/vision';
  const image = props.image || schoolImg;

  return (
    <section className="section">
      <div className="container who-we-are">
        <div className="wwa-content">
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <div className="divider" />
          <p className="wwa-text">{text}</p>
          <Link to={btnPath} className="btn btn-primary" style={{ marginTop: 16 }}>{btnText}</Link>
        </div>
        <div className="wwa-image-side">
          <img src={image} alt="Turon International School" className="wwa-school-img" />
        </div>
      </div>
    </section>
  );
}
