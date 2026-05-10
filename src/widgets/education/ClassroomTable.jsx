import { useLang } from '../../shared/i18n';

export default function ClassroomTable(props) {
  const { t } = useLang();
  const title = props.title || t.education.classroomTitle || 'Ko\'nikmalar → Sinf amaliyoti';
  const skillLabel = props.skillLabel || t.education.classroomSkillLabel || 'Ko\'nikma';
  const practiceLabel = props.practiceLabel || t.education.classroomPracticeLabel || 'Sinfda qanday ko\'rinadi';
  const skills = props.skills || t.education.skills;

  return (
    <section className="section">
      <div className="container">
        <div className="classroom-section">
          <h2 className="section-title">{title}</h2>
          <div className="divider" />
          <div className="classroom-table glass-card">
            <div className="classroom-header">
              <span>{skillLabel}</span>
              <span>{practiceLabel}</span>
            </div>
            {skills.map((skill, i) => (
              <div key={i} className="classroom-row">
                <span className="classroom-skill">{skill.title}</span>
                <span className="classroom-practice">{skill.how}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
