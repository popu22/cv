import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Timeline.css';

const Timeline = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const timelineEvents = t.timeline?.events || [];

  return (
    <motion.section
      id="timeline"
      ref={ref}
      className="cv-section timeline-visual-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.timeline?.title || 'Mon Parcours'}</h3>
      </div>
      
      <div className="timeline-visual">
        <div className="timeline-line"></div>
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            className="timeline-event"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="timeline-year" style={{ backgroundColor: event.color }}>
              {event.year}
            </div>
            <div className="timeline-content">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Timeline;
