import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './References.css';

const References = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="references"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.references.title}</h3>
      </div>
      
      <div className="fn_cs_service_list">
        <ul>
          {t.references.list.map((reference, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              data-testid={`reference-${index}`}
            >
              <div className="item reference-item">
                <div className="item_left">
                  <h3>{reference.name}</h3>
                  <p>{reference.company}</p>
                </div>
                <div className="item_right">
                  <p>{t.references.contactLabel}</p>
                  <h3>{reference.contact}</h3>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default References;
