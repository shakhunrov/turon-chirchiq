import { useState, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import './EditableSection.css';

/**
 * EditableSection - har bir section'ni edit qilish imkoniyatini beradi
 *
 * @param {string} sectionId - section identifikatori
 * @param {object} data - section ma'lumotlari
 * @param {function} onSave - saqlash callback
 * @param {ReactNode} children - section content
 */
export default function EditableSection({ sectionId, data, onSave, children }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
        setIsEditing(true);
        setIsFocused(true);
        // Body scroll'ni to'xtatmaslik - modal ichida scroll bo'ladi
        // Boshqa section'larni blur qilish uchun event
        window.dispatchEvent(new CustomEvent('section-focus', { detail: { sectionId } }));
    };

    const handleClose = () => {
        setIsEditing(false);
        setIsFocused(false);
        // Body scroll'ni qayta yoqish
        window.dispatchEvent(new CustomEvent('section-blur'));
    };

    // Boshqa section focus bo'lganda blur qilish
    useEffect(() => {
        const handleFocus = (e) => {
            if (e.detail.sectionId !== sectionId) {
                setIsFocused(false);
            }
        };
        const handleBlur = () => {
            setIsFocused(false);
        };

        window.addEventListener('section-focus', handleFocus);
        window.addEventListener('section-blur', handleBlur);

        return () => {
            window.removeEventListener('section-focus', handleFocus);
            window.removeEventListener('section-blur', handleBlur);
        };
    }, [sectionId]);

    return (
        <div
            className={`editable-section ${isFocused ? 'focused' : ''} ${!isFocused && isEditing ? 'blurred' : ''}`}
            data-section-id={sectionId}
        >
            {/* Edit tugmasi */}
            <button
                className="edit-section-btn"
                onClick={handleEdit}
                title="Bu section'ni tahrirlash"
            >
                <Edit2 size={16} />
            </button>

            {/* Section content */}
            <div className="section-content">
                {children}
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <EditModal
                    sectionId={sectionId}
                    data={data}
                    onSave={(newData) => {
                        onSave(newData);
                        handleClose();
                    }}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}

/**
 * EditModal - section ma'lumotlarini tahrirlash uchun modal
 */
function EditModal({ sectionId, data, onSave, onClose }) {
    const [formData, setFormData] = useState(data);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
        } finally {
            setLoading(false);
        }
    };

    const renderField = (key, value) => {
        // Rasm uchun
        if (key.toLowerCase().includes('image') || key.toLowerCase().includes('img')) {
            return (
                <div className="form-group" key={key}>
                    <label className="form-label">{formatLabel(key)}</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-input"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setFormData({ ...formData, [key]: file });
                            }
                        }}
                    />
                    {typeof value === 'string' && value && (
                        <img
                            src={value}
                            alt="Preview"
                            style={{ marginTop: 8, maxWidth: 200, borderRadius: 8 }}
                        />
                    )}
                </div>
            );
        }

        // Uzun matn uchun
        if (typeof value === 'string' && value.length > 100) {
            return (
                <div className="form-group" key={key}>
                    <label className="form-label">{formatLabel(key)}</label>
                    <textarea
                        className="form-input"
                        value={formData[key] || ''}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        rows={4}
                    />
                </div>
            );
        }

        // Oddiy matn uchun
        if (typeof value === 'string') {
            return (
                <div className="form-group" key={key}>
                    <label className="form-label">{formatLabel(key)}</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData[key] || ''}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    />
                </div>
            );
        }

        // Raqam uchun
        if (typeof value === 'number') {
            return (
                <div className="form-group" key={key}>
                    <label className="form-label">{formatLabel(key)}</label>
                    <input
                        type="number"
                        className="form-input"
                        value={formData[key] || ''}
                        onChange={(e) => setFormData({ ...formData, [key]: parseFloat(e.target.value) })}
                    />
                </div>
            );
        }

        // Array uchun (masalan, list items)
        if (Array.isArray(value)) {
            return (
                <div className="form-group" key={key}>
                    <label className="form-label">{formatLabel(key)}</label>
                    <textarea
                        className="form-input"
                        value={formData[key]?.join('\n') || ''}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value.split('\n') })}
                        rows={4}
                        placeholder="Har bir qatorga bitta element"
                    />
                </div>
            );
        }

        return null;
    };

    const formatLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/_/g, ' ')
            .replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div className="edit-modal-overlay" onClick={onClose}>
            <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
                <div className="edit-modal-header">
                    <h3>Section'ni tahrirlash</h3>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="edit-modal-form">
                    <div className="edit-modal-body">
                        {Object.entries(data).map(([key, value]) => renderField(key, value))}
                    </div>

                    <div className="edit-modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="al-spinner" />
                                    Saqlanmoqda...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Saqlash
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
