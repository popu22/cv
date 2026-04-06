import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './ContactForm.css';

const ContactForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.contact?.title || 'Me Contacter'}</h3>
      </div>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder={t.contact?.namePlaceholder || 'Votre nom'}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t.contact?.emailPlaceholder || 'Votre email'}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder={t.contact?.messagePlaceholder || 'Votre message'}
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>
        <button type="submit" className="submit-btn" disabled={status === 'sending'}>
          {status === 'sending' && '⏳ '}
          {status === 'success' && '✓ '}
          {status === 'sending' ? (t.contact?.sending || 'Envoi...') : 
           status === 'success' ? (t.contact?.sent || 'Envoyé !') : 
           (t.contact?.send || 'Envoyer')}
        </button>
        {status === 'success' && (
          <div className="success-message">
            {t.contact?.successMessage || 'Message envoyé avec succès !'}
          </div>
        )}
      </form>
    </motion.section>
  );
};

export default ContactForm;