import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Skills.css';

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="skills"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.skills.title}</h3>
      </div>
      
      <div className="fn_cs_progress_bar">
        {t.skills.list.map((skill, index) => (
          <motion.div
            key={index}
            className="progress_item"
            data-value={skill.value}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            data-testid={`skill-${index}`}
          >
            <div className="item_in">
              <h3 className="progress_title">{skill.name}</h3>
              <motion.span
                className="progress_percent"
                initial={{ right: '100%', opacity: 0 }}
                animate={
                  inView
                    ? { right: `${100 - skill.value}%`, opacity: 1 }
                    : { right: '100%', opacity: 0 }
                }
                transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
              >
                {skill.value}%
              </motion.span>
              <div className="progress_bg">
                <motion.div
                  className="progress_fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.value}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
