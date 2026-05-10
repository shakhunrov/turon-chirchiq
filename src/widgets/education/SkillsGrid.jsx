import { useLang } from '../../shared/i18n';

export default function SkillsGrid(props) {
  const { t } = useLang();
  const title = props.title || t.education.skillsTitle;
  const skills = props.skills || t.education.skills;

  return (
    <section className="section">
      <div className="container">
        <div className="skills-section">
          <h2 className="section-title">{title}</h2>
          <div className="divider" />
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <div key={i} className="skill-card glass-card">
                <div className="skill-icon">{skill.icon}</div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-desc">{skill.desc}</p>
                <div className="skill-how">
                  <span className="skill-how-label">How:</span> {skill.how}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
