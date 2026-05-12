import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../../widgets/hero-banner/HeroBanner';
import EditableWhyChoose from '../../widgets/why-choose/EditableWhyChoose';
import EditableTestimonials from '../../widgets/testimonials/EditableTestimonials';
import NewsSection from '../../widgets/news-section/NewsSection';
import { EditableSection } from '../../shared/editable';
import { useLang } from '../../shared/i18n';
import { getPageSections, savePageSection } from '../../shared/api/pageSections';
import schoolImg from '../../shared/assets/img/school.png';
import '../home/Home.css';

export default function EditableHome() {
    const { t } = useLang();
    const branchId = localStorage.getItem('globalBranchId');

    // Section ma'lumotlari
    const [sections, setSections] = useState({
        whoWeAre: {
            label: t.nav.about,
            title: t.whoWeAre.title,
            text: t.whoWeAre.text,
            image: schoolImg,
        },
        stats: {
            title: t.stats.title,
            students: { val: t.stats.studentsVal, label: t.stats.students, icon: '👨‍🎓' },
            teachers: { val: t.stats.teachersVal, label: t.stats.teachers, icon: '👩‍🏫', note: t.stats.teachersNote },
            programs: { val: t.stats.programsVal, label: t.stats.programs, icon: '📚' },
            universities: { val: t.stats.universitiesVal, label: t.stats.universities, icon: '🏛️' },
        },
        philosophy: {
            label: 'Falsafa',
            title: t.philosophy.title,
            text: t.philosophy.text,
            tags: ['STEAM', 'AI', 'Cambridge', 'Kelajak ko\'nikmalari'],
        },
        cta: {
            title: t.cta.title,
            button: t.cta.button,
            consult: t.cta.consult,
        },
    });

    // Backend'dan ma'lumotlarni yuklash
    useEffect(() => {
        const loadSections = async () => {
            try {
                const data = await getPageSections({ branch: branchId, page: 'home' });
                if (data && data.length > 0) {
                    const loadedSections = {};
                    data.forEach(section => {
                        loadedSections[section.section_id] = JSON.parse(section.content);
                    });
                    setSections(prev => ({ ...prev, ...loadedSections }));
                }
            } catch (error) {
                console.error('Section ma\'lumotlarini yuklashda xatolik:', error);
            }
        };
        loadSections();
    }, [branchId]);

    // Section'ni saqlash
    const handleSaveSection = async (sectionId, data) => {
        try {
            await savePageSection({
                branch: branchId,
                page: 'home',
                section_id: sectionId,
                content: JSON.stringify(data),
            });

            setSections(prev => ({
                ...prev,
                [sectionId]: data,
            }));

            alert('Section muvaffaqiyatli saqlandi!');
        } catch (error) {
            console.error('Section saqlashda xatolik:', error);
            alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
        }
    };

    return (
        <div className="page">
            <HeroBanner />

            {/* Biz haqimizda - Editable */}
            <EditableSection
                sectionId="whoWeAre"
                data={sections.whoWeAre}
                onSave={(data) => handleSaveSection('whoWeAre', data)}
            >
                <section className="section">
                    <div className="container who-we-are">
                        <div className="wwa-content">
                            <span className="section-label">{sections.whoWeAre.label}</span>
                            <h2 className="section-title">{sections.whoWeAre.title}</h2>
                            <div className="divider" />
                            <p className="wwa-text">{sections.whoWeAre.text}</p>
                            <Link to="/about/vision" className="btn btn-primary" style={{ marginTop: 16 }}>
                                Batafsil →
                            </Link>
                        </div>
                        <div className="wwa-image-side">
                            <img
                                src={typeof sections.whoWeAre.image === 'string' ? sections.whoWeAre.image : schoolImg}
                                alt="Turon International School"
                                className="wwa-school-img"
                            />
                        </div>
                    </div>
                </section>
            </EditableSection>

            {/* Asosiy raqamlar - Editable */}
            <EditableSection
                sectionId="stats"
                data={sections.stats}
                onSave={(data) => handleSaveSection('stats', data)}
            >
                <section className="stats-section section">
                    <div className="container">
                        <div className="section-header center">
                            <span className="section-label">Ta'sir</span>
                            <h2 className="section-title">{sections.stats.title}</h2>
                            <div className="divider center" />
                        </div>
                        <div className="stats-grid">
                            {[
                                sections.stats.students,
                                sections.stats.teachers,
                                sections.stats.programs,
                                sections.stats.universities,
                            ].map((s, idx) => (
                                <div key={idx} className="stat-card glass-card">
                                    <div className="stat-icon">{s.icon}</div>
                                    <div className="stat-val">{s.val}</div>
                                    <div className="stat-label">{s.label}</div>
                                    {s.note && <div className="stat-note">{s.note}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </EditableSection>

            {/* Ta'lim falsafasi - Editable */}
            <EditableSection
                sectionId="philosophy"
                data={sections.philosophy}
                onSave={(data) => handleSaveSection('philosophy', data)}
            >
                <section className="section">
                    <div className="container philosophy-section">
                        <div className="philosophy-content">
                            <span className="section-label">{sections.philosophy.label}</span>
                            <h2 className="section-title">{sections.philosophy.title}</h2>
                            <div className="divider" />
                            <p className="section-subtitle">{sections.philosophy.text}</p>
                            <Link to="/education" className="btn btn-outline" style={{ marginTop: 24 }}>
                                Bizning yondashuvimiz →
                            </Link>
                        </div>
                        <div className="philosophy-cards">
                            {sections.philosophy.tags.map((tag) => (
                                <div key={tag} className="phil-tag glass-card">{tag}</div>
                            ))}
                        </div>
                    </div>
                </section>
            </EditableSection>

            <EditableWhyChoose />
            <EditableTestimonials />
            <NewsSection />

            {/* CTA Banner - Editable */}
            <EditableSection
                sectionId="cta"
                data={sections.cta}
                onSave={(data) => handleSaveSection('cta', data)}
            >
                <section className="cta-banner section">
                    <div className="container">
                        <div className="cta-box glass-card">
                            <div className="cta-glow" />
                            <h2 className="cta-title">{sections.cta.title}</h2>
                            <div className="cta-actions">
                                <Link to="/admissions" className="btn btn-primary">
                                    {sections.cta.button}
                                </Link>
                                <Link to="/contact" className="btn btn-outline">
                                    {sections.cta.consult}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </EditableSection>
        </div>
    );
}
