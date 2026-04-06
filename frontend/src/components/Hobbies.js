import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Hobbies.css';

const Hobbies = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="hobbies"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.hobbies?.title || 'Centres d\'Intérêt'}</h3>
      </div>
      
      <div className="hobbies-grid">
        {(t.hobbies?.list || []).map((hobby, index) => (
          <motion.div
            key={index}
            className="hobby-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="hobby-icon">{hobby.icon}</div>
            <div className="hobby-name">{hobby.name}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Hobbies;