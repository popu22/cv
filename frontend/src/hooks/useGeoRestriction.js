import { useState, useEffect } from 'react';

export const useGeoRestriction = () => {
  const [isAllowed, setIsAllowed] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkGeolocation = async () => {
      try {
        const response = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=9c048e17ae0a4247b17c0a7463f12751');
        const data = await response.json();
        
        const isBlocked = data.security && (data.security.is_vpn || data.security.is_proxy || data.security.is_tor);
        const isNotSwiss = data.country_code !== 'CH';
        
        if (isBlocked || isNotSwiss) {
          setIsAllowed(false);
        } else {
          setIsAllowed(true);
        }
      } catch (error) {
        console.error('Erreur de géolocalisation IP:', error);
        // En cas d'erreur, on autorise l'accès pour ne pas bloquer injustement
        setIsAllowed(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkGeolocation();
  }, []);

  return { isAllowed, isChecking };
};
