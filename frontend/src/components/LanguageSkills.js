import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './LanguageSkills.css';

const LanguageSkills = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const languages = t.languageSkills?.languages || [];

  return (
    <div className="sidebar-section">
      <h3 className="sidebar-title">{t.languageSkills?.title || 'Langues'}</h3>
      <div className="language-skills-list">
        {languages.map((lang, index) => (
          <motion.div
            key={index}
            className="language-skill"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="lang-header">
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.name}</span>
            </div>
            <div className="lang-level">
              <span className="level-badge" style={{ backgroundColor: lang.color }}>
                {lang.level}
              </span>
              <span className="level-cecr">{lang.cecr}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSkills;
