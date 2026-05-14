import { useState, useEffect } from 'react';
import { useLang } from '../../shared/i18n';
import { getPageSections } from '../../shared/api/pageSections';
import './AboutCampus.css';

const TABS = ['education', 'houses', 'sports'];

const tabData = (t) => [
  {
    key: 'education',
    label: t.about.campus.educationTitle,
    icon: '📚',
    desc: t.about.campus.educationDesc,
  },
  {
    key: 'houses',
    label: t.about.campus.housesTitle,
    icon: '🏡',
    desc: t.about.campus.housesDesc,
  },
  {
    key: 'sports',
    label: t.about.campus.sportsTitle,
    icon: '🏆',
    desc: t.about.campus.sportsDesc,
  },
];

export default function AboutCampus() {
  const { t } = useLang();
  const branchId = localStorage.getItem('globalBranchId');
  const [activeTab, setActiveTab] = useState('education');
  const tabs = tabData(t);
  const current = tabs.find((tb) => tb.key === activeTab);
  const [sectionImages, setSectionImages] = useState({
    education: [],
    houses: [],
    sports: [],
  });

  // Backend'dan rasmlarni yuklash
  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await getPageSections({ branch: branchId, page: 'about-campus' });
        if (data && data.length > 0) {
          const newSectionImages = { education: [], houses: [], sports: [] };

          data.forEach(section => {
            if (TABS.includes(section.section_id)) {
              if (section.images && section.images.length > 0) {
                newSectionImages[section.section_id] = section.images.sort((a, b) => a.order - b.order);
              }
            }
          });

          setSectionImages(newSectionImages);
        }
      } catch (error) {
        console.error('Rasmlarni yuklashda xatolik:', error);
      }
    };
    loadImages();
  }, [branchId]);

  const currentImages = sectionImages[activeTab] || [];

  return (
    <div className="page">
      <div className="page-hero glass-card campus-hero">
        <div className="container">
          <span className="section-label">Biz haqimizda</span>
          <h1 className="section-title">{t.about.campus.title}</h1>
          <div className="divider" />
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Tabs */}
          <div className="campus-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`campus-tab ${activeTab === tab.key ? 'active' : ''}`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="campus-content">
            <div className="campus-desc glass-card">
              <h2 className="campus-desc-title">{current.label}</h2>
              <p>{current.desc}</p>
            </div>

            {/* Photo grid - backend'dan yuklangan rasmlar */}
            {currentImages.length > 0 ? (
              <div className="campus-photo-grid">
                {currentImages.map((img, i) => (
                  <div key={img.id} className={`campus-photo glass-card campus-photo-${i % 6}`}>
                    <img
                      src={img.image}
                      alt={`Campus ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                      }}
                    />
                    <div className="campus-photo-overlay" />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
                Rasmlar mavjud emas
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
