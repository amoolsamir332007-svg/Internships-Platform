// Name
// Email
// Message
// Validation بسيط
// Loading أثناء الإرسال
// قابل للربط مع Backend API لاحقاً

// ContactForm.jsx فوررم التواصل (اسم، إيميل، رسالة) - بيتستخدم بصفحة Contact
// فيه validation بسيط ودالة submit (ترسل الرسالة أو تعرض رسالة نجاح)
// [cite: 91, 92, 93, 94]

import React, { useState } from 'react';
import Button from './Button';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    if (!formData.message.trim()) newErrors.message = 'الرسالة مطلوبة';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // محاكاة إرسال الرسالة بنجاح
    setSuccessMsg('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>تواصل معنا</h3>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="form-group">
        <label>الاسم</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>البريد الإلكتروني</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>الرسالة</label>
        <textarea 
          name="message" 
          rows="5"
          value={formData.message} 
          onChange={handleChange} 
          className={errors.message ? 'input-error' : ''}
        ></textarea>
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <Button text="إرسال الرسالة" type="submit" variant="primary" />
    </form>
  );
};

export default ContactForm;