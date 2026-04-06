import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Sidebar.css';
import './LanguageSkills.css';

const CountUp = ({ end, duration = 2, suffix = '' }) => {
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

  return <span ref={ref}>{count}{suffix}</span>;
};

const Sidebar = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2015;

  const stats = [
    { value: yearsOfExperience, suffix: '+', label: t.keyStats?.yearsExperience || "Années d'expérience", icon: '💼' },
    { value: 4, suffix: '', label: t.keyStats?.companies || 'Entreprises', icon: '🏢' },
    { value: 6, suffix: '', label: t.keyStats?.degrees || 'Diplômes', icon: '🎓' },
    { value: 3, suffix: '', label: t.keyStats?.languages || 'Langues', icon: '🌍' }
  ];

  return (
    <motion.aside
      ref={ref}
      className="cv-sidebar"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6 }}
    >
      {/* Stats Section */}
      <div className="sidebar-section stats-section">
        <h3 className="sidebar-title">{t.keyStats?.title || 'Aperçu'}</h3>
        <div className="stats-list">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Language Skills */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t.languageSkills?.title || 'Langues'}</h3>
        <div className="language-skills-list">
          {(t.languageSkills?.languages || []).map((lang, index) => (
            <motion.div
              key={index}
              className="language-skill"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="lang-header">
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-name">{lang.name}</span>
              </div>
              <div className="lang-level">
                <span className="level-badge" style={{ backgroundColor: lang.color }}>
                  {lang.level}
                </span>
                <span className="level-cecr">{lang.cecr}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t.technicalSkills?.title || 'Compétences Techniques'}</h3>
        <div className="sidebar-tech-skills">
          {(t.technicalSkills?.skills || []).map((skill, index) => (
            <motion.div
              key={index}
              className="sidebar-skill"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </div>
              <div className="skill-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < skill.level ? 'filled' : ''}`}>★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t.certifications?.title || 'Certifications & Permis'}</h3>
        <div className="sidebar-certifications">
          {(t.certifications?.list || []).map((cert, index) => (
            <motion.div
              key={index}
              className="sidebar-cert"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="cert-icon">{cert.icon}</div>
              <div className="cert-content">
                <div className="cert-name">{cert.name}</div>
                {cert.year && <div className="cert-year">{cert.year}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hobbies / Centres d'Intérêt */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t.hobbies?.title || "Centres d'Intérêt"}</h3>
        <div className="sidebar-hobbies">
          {(t.hobbies?.list || []).map((hobby, index) => (
            <motion.div
              key={index}
              className="sidebar-hobby"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="hobby-icon">{hobby.icon}</div>
              <div className="hobby-name">{hobby.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements / Réalisations Clés */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t.achievements?.title || 'Réalisations Clés'}</h3>
        <div className="sidebar-achievements">
          {(t.achievements?.list || []).map((achievement, index) => (
            <motion.div
              key={index}
              className="sidebar-achievement"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <div className="achievement-value">
                  <CountUp end={achievement.value} suffix={achievement.suffix || ''} />
                </div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Me / Pourquoi Moi */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t.whyMe?.title || 'Pourquoi Moi ?'}</h3>
        <div className="sidebar-whyme">
          {(t.whyMe?.reasons || []).map((reason, index) => (
            <motion.div
              key={index}
              className="sidebar-reason"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="reason-icon">{reason.icon}</div>
              <div className="reason-content">
                <div className="reason-title">{reason.title}</div>
                <div className="reason-description">{reason.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professionnalité / Soft Skills */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t.skills?.title || 'Professionnalité'}</h3>
        <div className="sidebar-skills">
          {(t.skills?.list || []).map((skill, index) => {
            // Convertir le pourcentage en nombre d'étoiles (sur 5)
            const stars = Math.round((skill.value / 100) * 5);
            const skillName = skill.name.replace(/^[^\s]+\s/, ''); // Retirer l'emoji du nom
            const skillEmoji = skill.name.match(/^[^\s]+/)?.[0] || '⭐'; // Extraire l'emoji
            
            return (
              <motion.div
                key={index}
                className="sidebar-skill-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="skill-card-icon">{skillEmoji}</div>
                <div className="skill-card-content">
                  <div className="skill-card-name">{skillName}</div>
                  <div className="skill-card-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < stars ? 'filled' : ''}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
