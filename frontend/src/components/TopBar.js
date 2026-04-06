import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './TopBar.css';

const FlagIcon = ({ code }) => {
  const flags = {
    fr: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="flag-svg">
        <rect width="900" height="600" fill="#ED2939"/>
        <rect width="600" height="600" fill="#fff"/>
        <rect width="300" height="600" fill="#002395"/>
      </svg>
    ),
    de: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="flag-svg">
        <rect width="900" height="600" fill="#000"/>
        <rect y="200" width="900" height="200" fill="#D00"/>
        <rect y="400" width="900" height="200" fill="#FFCE00"/>
      </svg>
    ),
    it: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="flag-svg">
        <rect width="900" height="600" fill="#CE2B37"/>
        <rect width="600" height="600" fill="#fff"/>
        <rect width="300" height="600" fill="#009246"/>
      </svg>
    ),
    en: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="flag-svg">
        <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
        <clipPath id="t"><path d="M30,15 h30 v15 z v-15 h-30 z h-30 v15 z v-15 h30 z"/></clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    )
  };

  return flags[code] || flags.fr;
};

const TopBar = () => {
  const { language, changeLanguage } = useLanguage();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('cv-theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.body.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.body.classList.remove('light');
      localStorage.setItem('cv-theme', 'dark');
    } else {
      document.body.classList.add('light');
      localStorage.setItem('cv-theme', 'light');
    }
  };

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
    { code: 'it', label: 'IT' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <div className="top-bar">
      {/* Language Switcher */}
      <div className="language-switcher">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`lang-btn ${language === lang.code ? 'active' : ''}`}
            onClick={() => changeLanguage(lang.code)}
            data-testid={`lang-${lang.code}`}
          >
            <span className="flag">
              <FlagIcon code={lang.code} />
            </span>
            <span className="label">{lang.label}</span>
          </button>
        ))}
      </div>

      {/* Theme Toggle avec Lune + Soleil */}
      <button 
        className="theme-toggle-new" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
        data-testid="theme-toggle"
        title={isDark ? "Mode clair" : "Mode sombre"}
      >
        <div className="theme-icons">
          {/* Soleil (mode clair) */}
          <svg 
            className={`sun-icon ${!isDark ? 'active' : ''}`} 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="5" fill="currentColor"/>
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          
          {/* Séparateur */}
          <div className="theme-separator"></div>
          
          {/* Lune (mode sombre) */}
          <svg 
            className={`moon-icon ${isDark ? 'active' : ''}`} 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default TopBar;
