import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './TechnicalSkills.css';

const TechnicalSkills = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="technical-skills"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.technicalSkills?.title || 'Compétences Techniques'}</h3>
      </div>
      
      <div className="tech-skills-grid">
        {(t.technicalSkills?.skills || []).map((skill, index) => (
          <motion.div
            key={index}
            className="tech-skill-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            data-testid={`tech-skill-${index}`}
          >
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-name">{skill.name}</div>
            <div className="skill-level">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < skill.level ? 'filled' : ''}`}>★</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TechnicalSkills;