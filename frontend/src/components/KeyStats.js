import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { calculateAge } from '../utils/dateUtils';
import './KeyStats.css';

const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = useState(0);

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
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const KeyStats = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2015; // Depuis Manor SA en 2015
  const age = calculateAge('1993-08-22');

  const stats = [
    { value: yearsOfExperience, suffix: '+', label: t.keyStats?.yearsExperience || 'Années d\'expérience', icon: '💼' },
    { value: 4, suffix: '', label: t.keyStats?.companies || 'Entreprises', icon: '🏢' },
    { value: 6, suffix: '', label: t.keyStats?.degrees || 'Diplômes & Certifications', icon: '🎓' },
    { value: 3, suffix: '', label: t.keyStats?.languages || 'Langues parlées', icon: '🌍' }
  ];

  return (
    <motion.section
      id="keystats"
      ref={ref}
      className="keystats-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="keystats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">
              <CountUp end={stat.value} suffix={stat.suffix} />
            </div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default KeyStats;