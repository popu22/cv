import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Certifications.css';

const Certifications = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="certifications"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.certifications?.title || 'Certifications & Permis'}</h3>
      </div>
      
      <div className="certifications-grid">
        {(t.certifications?.list || []).map((cert, index) => (
          <motion.div
            key={index}
            className="cert-badge"
            initial={{ opacity: 0, rotate: -10 }}
            animate={inView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -10 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="cert-icon">{cert.icon}</div>
            <div className="cert-name">{cert.name}</div>
            {cert.year && <div className="cert-year">{cert.year}</div>}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Certifications;