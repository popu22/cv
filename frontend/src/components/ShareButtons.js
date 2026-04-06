import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import QRCode from 'qrcode';
import './ShareButtons.css';

const ShareButtons = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState('');
  
  const url = window.location.href;
  const title = "CV - Jeremy STALDER";

  const generateQR = async () => {
    try {
      const qr = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#0515a1',
          light: '#ffffff'
        }
      });
      setQrCode(qr);
      setShowQR(true);
    } catch (err) {
      console.error(err);
    }
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Consultez mon CV : ' + url)}`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert(t.share?.linkCopied || 'Lien copié !');
  };

  return (
    <div className="share-section">
      <h4>{t.share?.title || 'Partager ce CV'}</h4>
      <div className="share-buttons">
        <button onClick={shareLinkedIn} className="share-btn linkedin" title="Partager sur LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </button>
        <button onClick={shareEmail} className="share-btn email" title="Partager par email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </button>
        <button onClick={copyLink} className="share-btn copy" title="Copier le lien">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </button>
        <button onClick={generateQR} className="share-btn qr" title="QR Code">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3zm0-8h2v5h-2z"/>
          </svg>
        </button>
      </div>
      
      {showQR && (
        <div className="qr-modal" onClick={() => setShowQR(false)}>
          <div className="qr-content" onClick={(e) => e.stopPropagation()}>
            <button className="qr-close" onClick={() => setShowQR(false)}>×</button>
            <h3>{t.share?.qrTitle || 'Scannez pour accéder au CV'}</h3>
            <img src={qrCode} alt="QR Code" />
            <p>{t.share?.qrDesc || 'Scannez ce QR code avec votre smartphone'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;