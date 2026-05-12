import { useState, useEffect } from 'react';
import { getPageSections, savePageSection } from './pageSections';

/**
 * useEditableSections - Editable sections uchun custom hook
 *
 * @param {string} pageName - Sahifa nomi (home, education, about-vision, etc.)
 * @param {object} defaultSections - Default section ma'lumotlari
 * @returns {object} { sections, handleSaveSection }
 */
export function useEditableSections(pageName, defaultSections) {
    const branchId = localStorage.getItem('globalBranchId');
    const [sections, setSections] = useState(defaultSections);

    useEffect(() => {
        const loadSections = async () => {
            try {
                const data = await getPageSections({ branch: branchId, page: pageName });
                if (data && data.length > 0) {
                    const loadedSections = {};
                    data.forEach(section => {
                        try {
                            loadedSections[section.section_id] = JSON.parse(section.content);
                        } catch (e) {
                            console.error(`Section ${section.section_id} parse error:`, e);
                        }
                    });
                    setSections(prev => ({ ...prev, ...loadedSections }));
                }
            } catch (error) {
                console.error('Section ma\'lumotlarini yuklashda xatolik:', error);
            }
        };
        loadSections();
    }, [branchId, pageName]);

    const handleSaveSection = async (sectionId, data) => {
        try {
            await savePageSection({
                branch: branchId,
                page: pageName,
                section_id: sectionId,
                content: JSON.stringify(data),
            });
            setSections(prev => ({ ...prev, [sectionId]: data }));
            alert('Section muvaffaqiyatli saqlandi!');
        } catch (error) {
            console.error('Section saqlashda xatolik:', error);
            alert('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
        }
    };

    return { sections, handleSaveSection };
}
