import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Hero.css';

const TypeWriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span className="typing-text">{currentText}<span className="cursor">|</span></span>;
};

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-container">
        <div className="hero-left">
          <div className="circle">
            <div className="bg_img" style={{ backgroundImage: 'url(/avatar.jpg)' }}></div>
            <img src="/avatar.jpg" alt="Jeremy Stalder" onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23333" width="400" height="400"/%3E%3Ctext fill="%23fff" font-family="Arial" font-size="50" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EJS%3C/text%3E%3C/svg%3E'; }} />
            <div className="circle_holder_blue"><span></span></div>
            <div className="circle_holder_orange"><span></span></div>
            <div className="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <motion.div
            className="my_self"
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4>{t.hero.greeting}</h4>
            <h2>
              <TypeWriter text={`${t.hero.name} ${t.hero.surname}`} delay={100} />
            </h2>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
