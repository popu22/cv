import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './About.css';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const downloadCV = () => {
    // Créer un lien temporaire pour télécharger le CV
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Jeremy_Stalder_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const infoItems = [
    { label: t.about.name, value: t.about.fullName },
    { label: t.about.birthday, value: t.about.birthdayValue },
    { label: t.about.languages, value: t.about.languagesValue },
    { label: t.about.age, value: t.about.ageValue },
    { label: t.about.nationality, value: t.about.nationalityValue },
    { label: t.about.email, value: 'contact@jeremystalder.net' }
  ];

  return (
    <motion.section
      id="about"
      ref={ref}
      className="cv-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section_title">
        <h3>{t.about.title}</h3>
      </div>
      
      <div className="about-quote">
        <p>{t.about.quote}</p>
      </div>

      <p className="about-description">{t.about.description}</p>

      <div className="fn_cs_info_items">
        <ul>
          {infoItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p>
                {item.label}: <span>{item.value}</span>
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        className="download-cv-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <button
          onClick={downloadCV}
          className="btn-download"
          data-testid="download-cv"
        >
          📄 {t.navigation.download}
        </button>
      </motion.div>
    </motion.section>
  );
};

export default About;
