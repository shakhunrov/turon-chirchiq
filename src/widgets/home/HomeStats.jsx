import { useLang } from '../../shared/i18n';

export default function HomeStats(props) {
  const { t } = useLang();
  const title = props.title || t.stats?.title;
  const label = props.label || 'Ta\'sir';
  const stats_items = props.stats_items || t.stats_items;

  return (
    <section className="stats-section section">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <div className="divider center" />
        </div>
        <div className="stats-grid">
          {stats_items ? (
            stats_items.map((s, i) => (
              <div key={s.id || i} className="stat-card glass-card">
                <div className="stat-icon">{s.icon || '📊'}</div>
                <div className="stat-val">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))
          ) : (
            [
              { val: t.stats?.studentsVal, label: t.stats?.students, icon: '👨‍🎓', note: null },
              { val: t.stats?.teachersVal, label: t.stats?.teachers, icon: '👩‍🏫', note: t.stats?.teachersNote },
              { val: t.stats?.programsVal, label: t.stats?.programs, icon: '📚', note: null },
              { val: t.stats?.universitiesVal, label: t.stats?.universities, icon: '🏛️', note: null },
            ].map((s) => (
              <div key={s.label} className="stat-card glass-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
                {s.note && <div className="stat-note">{s.note}</div>}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
