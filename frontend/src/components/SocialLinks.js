import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './SocialLinks.css';

const SocialLinks = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const socialLinks = t.socialLinks?.links || [];

  return (
    <motion.div
      ref={ref}
      className="social-links"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          style={{ '--link-color': link.color }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          title={link.name}
        >
          <span className="social-icon" dangerouslySetInnerHTML={{ __html: link.icon }} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
