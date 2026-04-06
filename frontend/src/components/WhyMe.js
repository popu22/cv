import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './WhyMe.css';

const WhyMe = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const reasons = t.whyMe?.reasons || [];

  return (
    <motion.section
      id="why-me"
      ref={ref}
      className="cv-section why-me-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.whyMe?.title || 'Pourquoi Moi ?'}</h3>
      </div>
      
      <div className="why-me-grid">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="reason-card"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="reason-number">{index + 1}</div>
            <div className="reason-icon">{reason.icon}</div>
            <div className="reason-content">
              <h4>{reason.title}</h4>
              <p>{reason.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyMe;
