import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { useGeoRestriction } from './hooks/useGeoRestriction';
import ReadingProgress from './components/ReadingProgress';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import Navigation from './components/Navigation';
import BackToTop from './components/BackToTop';
import Hero from './components/Hero';
import About from './components/About';
import KeyStats from './components/KeyStats';
import Experience from './components/Experience';
import Skills from './components/Skills';
import TechnicalSkills from './components/TechnicalSkills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Hobbies from './components/Hobbies';
import References from './components/References';
import ContactForm from './components/ContactForm';
import ShareButtons from './components/ShareButtons';
import './App.css';

const GeoRestrictedAccess = () => {
  return (
    <div className="geo-restricted">
      <div className="restriction-content">
        <h1>Accès restreint</h1>
        <p>
          Ce CV est uniquement accessible depuis la Suisse.
          <br />
          Si vous pensez qu'il s'agit d'une erreur, veuillez désactiver tout VPN ou proxy, puis actualiser la page.
        </p>
        <p>
          Si le problème persiste, veuillez contacter{' '}
          <a href="mailto:contact@jeremystalder.net">contact@jeremystalder.net</a>.
        </p>
      </div>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="spinner"></div>
        <p>Vérification de la localisation...</p>
      </div>
    </div>
  );
};

function AppContent() {
  const { isAllowed, isChecking } = useGeoRestriction();

  if (isChecking) {
    return <LoadingScreen />;
  }

  if (!isAllowed) {
    return <GeoRestrictedAccess />;
  }

  return (
    <div className="app-container">
      <ReadingProgress />
      <ThemeToggle />
      <LanguageSwitcher />
      <Navigation />
      <BackToTop />
      
      <div className="cv-content">
        <Hero />
        <div className="cv-sections">
          <About />
          <KeyStats />
          <Experience />
          <Skills />
          <TechnicalSkills />
          <Education />
          <Certifications />
          <Hobbies />
          <References />
          <ContactForm />
          <ShareButtons />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
