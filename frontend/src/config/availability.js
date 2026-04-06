// Configuration de la disponibilité - Modifier ici pour changer le statut

export const availabilityConfig = {
  status: 'available', // Options: 'available', 'open', 'unavailable'
  
  labels: {
    fr: {
      available: 'Disponible immédiatement',
      open: 'En poste, ouvert aux opportunités',
      unavailable: 'Non disponible actuellement'
    },
    de: {
      available: 'Sofort verfügbar',
      open: 'In Position, offen für Chancen',
      unavailable: 'Derzeit nicht verfügbar'
    },
    it: {
      available: 'Disponibile immediatamente',
      open: 'In posizione, aperto alle opportunità',
      unavailable: 'Attualmente non disponibile'
    },
    en: {
      available: 'Available immediately',
      open: 'In position, open to opportunities',
      unavailable: 'Currently unavailable'
    }
  },
  
  colors: {
    available: '#10b981', // Vert
    open: '#f59e0b',      // Orange/Jaune
    unavailable: '#ef4444' // Rouge
  },
  
  icons: {
    available: '✓',
    open: '◉',
    unavailable: '✕'
  }
};

// Pour changer le statut, modifiez la ligne 'status' ci-dessus:
// - 'available' : Vous cherchez activement un emploi
// - 'open' : Vous êtes en poste mais ouvert aux opportunités
// - 'unavailable' : Vous n'êtes pas disponible
