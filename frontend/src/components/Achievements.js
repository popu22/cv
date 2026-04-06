import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Achievements.css';

const CountUp = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearTimeout(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const Achievements = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="achievements"
      ref={ref}
      className="cv-section achievements-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.achievements?.title || 'Réalisations Clés'}</h3>
      </div>
      
      <div className="achievements-grid">
        {(t.achievements?.list || []).map((achievement, index) => (
          <motion.div
            key={index}
            className="achievement-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-value">
              {achievement.animated ? (
                <CountUp 
                  end={achievement.value} 
                  suffix={achievement.suffix || ''}
                  prefix={achievement.prefix || ''}
                />
              ) : (
                <span>{achievement.prefix}{achievement.value}{achievement.suffix}</span>
              )}
            </div>
            <div className="achievement-label">{achievement.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Achievements;
