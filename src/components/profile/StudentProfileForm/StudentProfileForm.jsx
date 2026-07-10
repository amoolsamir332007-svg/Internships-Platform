    import React, { useState, useEffect } from 'react';
    import { validateStudentProfile } from '../../schemas/studentProfileSchema';
    import Button from '../common/Button';
    import './Profile.css';

    const StudentProfileForm = ({ initialData, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        university: '',
        major: '',
        bio: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
        setFormData({
            name: initialData.name || '',
            university: initialData.university || '',
            major: initialData.major || '',
            bio: initialData.bio || '',
        });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // التحقق من البيانات باستخدام الـ Schema
        const validation = validateStudentProfile(formData);
        if (!validation.isValid) {
        setErrors(validation.errors);
        return;
        }

        try {
        setIsSubmitting(true);
        await onSave(formData);
        } catch (error) {
        console.error('خطأ أثناء حفظ الملف الشخصي:', error);
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">الاسم الكامل</label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
            placeholder="أدخل اسمك الكامل"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
            <label htmlFor="university">الجامعة</label>
            <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            className={errors.university ? 'input-error' : ''}
            placeholder="مثال: جامعة النجاح الوطنية"
            />
            {errors.university && <span className="error-text">{errors.university}</span>}
        </div>

        <div className="form-group">
            <label htmlFor="major">التخصص الأكاديمي</label>
            <input
            type="text"
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className={errors.major ? 'input-error' : ''}
            placeholder="مثال: هندسة البرمجيات"
            />
            {errors.major && <span className="error-text">{errors.major}</span>}
        </div>

        <div className="form-group">
            <label htmlFor="bio">النبذة التعريفية (السيرة الذاتية)</label>
            <textarea
            id="bio"
            name="bio"
            rows="6"
            value={formData.bio}
            onChange={handleChange}
            className={errors.bio ? 'input-error' : ''}
            placeholder="اكتب نبذة مختصرة عن مهاراتك، مشاريعك، وما تبحث عنه في التدريب..."
            ></textarea>
            {errors.bio && <span className="error-text">{errors.bio}</span>}
        </div>

        <div className="form-actions">
            <Button
            text={isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            />
        </div>
        </form>
    );
    };

    export default StudentProfileForm;