import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { availabilityConfig } from '../config/availability';
import './AvailabilityBadge.css';

const AvailabilityBadge = () => {
  const { language } = useLanguage();
  const { status, labels, colors, icons } = availabilityConfig;
  
  const label = labels[language][status];
  const color = colors[status];
  const icon = icons[status];

  return (
    <div 
      className="availability-badge" 
      style={{ '--badge-color': color }}
      data-status={status}
    >
      <span className="badge-icon">{icon}</span>
      <span className="badge-label">{label}</span>
      <span className="badge-pulse"></span>
    </div>
  );
};

export default AvailabilityBadge;
