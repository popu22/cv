import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

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

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
    { code: 'it', label: 'IT' },
    { code: 'en', label: 'EN' }
  ];

  return (
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
  );
};

export default LanguageSwitcher;
