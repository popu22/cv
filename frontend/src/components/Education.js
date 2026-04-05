import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Education.css';

const Education = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.section
      id="education"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.education.title}</h3>
      </div>
      
      <div className="fn_cs_boxed_list timeline">
        <ul>
          {t.education.items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div
                className={`item timeline-item ${expandedIndex === index ? 'expanded' : ''}`}
                style={{ '--couleur-box': item.color }}
                onClick={() => item.description && toggleExpand(index)}
                data-testid={`education-${index}`}
              >
                <div className="timeline-marker" style={{ backgroundColor: item.color }}></div>
                <div className="item_top">
                  <h5 style={{ color: item.color }}>{item.institution}</h5>
                  <span>{item.period}</span>
                </div>
                <h3>{item.degree}</h3>
                {item.description && (
                  <>
                    <div className={`description ${expandedIndex === index ? 'show' : ''}`}>
                      <p>{item.description}</p>
                    </div>
                    <div className="expand-icon">
                      {expandedIndex === index ? '▲' : '▼'}
                    </div>
                  </>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default Education;
