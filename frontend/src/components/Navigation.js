import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { useScrollSpy } from '../hooks/useScrollSpy';
import './Navigation.css';

const Navigation = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const sections = [
    { id: 'about', label: t.navigation.about },
    { id: 'timeline', label: t.timeline?.title || 'Mon Parcours' },
    { id: 'skills', label: t.navigation.skills },
    { id: 'references', label: t.navigation.references }
  ];

  const activeSection = useScrollSpy(sections.map(s => s.id));

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed-navigation">
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={activeSection === section.id ? 'active' : ''}
              onClick={() => scrollToSection(section.id)}
              data-testid={`nav-${section.id}`}
            >
              <span className="dot"></span>
              <span className="label">{section.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
