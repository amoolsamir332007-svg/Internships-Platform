import React from 'react';
import ContactForm from '../components/common/ContactForm';
import './ContactPage.css';

const ContactPage = () => {
        return (
        <div className="contact-page-container">
        <div className="contact-page-header">
            <h1>Get In Touch</h1>
            <p>Have questions about internships, accounts, or the platform?
    Our team is here to help you.
    </p>
        </div>

        <div className="contact-page-content">
            <div className="contact-info-card">
            <h2>Contact Information</h2>
            <p>Feel free to reach out to us through any of the following channels.</p>
            
            <div className="info-items-list">
                <div className="info-item">
                <span className="info-icon">📍</span>
                <div className="info-text">
                    <strong>Location :</strong>
                    <span>Palestine, Gaza</span>
                </div>
                </div>

                <div className="info-item">
                <span className="info-icon">📧</span>
                <div className="info-text">
                    <strong>Email:</strong>
                    <span>support@internshipplatform.com</span>
                </div>
                </div>

                <div className="info-item">
                <span className="info-icon">📞</span>
                <div className="info-text">
                    <strong>Phone Number:</strong>
                    <span>+970 599 000 000</span>
                </div>
                </div>

                <div className="info-item">
                <span className="info-icon">⏰</span>
                <div className="info-text">
                    <strong>Working hours:</strong>
                    <span>From Sunday to Thursday (8:00 AM - 3:00 PM)</span>
                </div>
                </div>
            </div>
            </div>

            <div className="contact-form-wrapper">
            <ContactForm />
            </div>
        </div>
        </div>
    );
    };

    export default ContactPage;