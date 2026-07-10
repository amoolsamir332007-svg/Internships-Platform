
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

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'The email is incorrect';
    }
    if (!formData.message.trim()) newErrors.message = 'The message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSuccessMsg('Your message has been sent successfully! We will get in touch with you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Get in touch with us</h3>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="form-group">
        <label>Name</label>
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
        <label>Email</label>
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
        <label> Message</label>
        <textarea 
          name="message" 
          rows="5"
          value={formData.message} 
          onChange={handleChange} 
          className={errors.message ? 'input-error' : ''}
        ></textarea>
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <Button text="Send the message" type="submit" variant="primary" />
    </form>
  );
};

export default ContactForm;