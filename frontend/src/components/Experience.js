import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Experience.css';

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.section
      id="experience"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.experience.title}</h3>
      </div>
      
      <div className="fn_cs_boxed_list timeline">
        <ul>
          {t.experience.jobs.map((job, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div
                className={`item timeline-item ${expandedIndex === index ? 'expanded' : ''}`}
                style={{ '--couleur-box': job.color }}
                onClick={() => toggleExpand(index)}
                data-testid={`experience-${index}`}
              >
                <div className="timeline-marker" style={{ backgroundColor: job.color }}></div>
                <div className="item_top">
                  <h5 style={{ color: job.color }}>{job.company}</h5>
                  <span>{job.period}</span>
                </div>
                <h3>{job.position}</h3>
                <div className={`description ${expandedIndex === index ? 'show' : ''}`}>
                  {job.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="expand-icon">
                  {expandedIndex === index ? '▲' : '▼'}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default Experience;
