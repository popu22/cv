/**
 * Calcule l'âge à partir d'une date de naissance
 * @param {string} birthDate - Date de naissance au format 'YYYY-MM-DD'
 * @returns {number} L'âge en années
 */
export const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // Si l'anniversaire n'est pas encore passé cette année, on retire 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Formate l'âge selon la langue
 * @param {number} age - L'âge en années
 * @param {string} language - Code de langue (fr, de, it, en)
 * @returns {string} L'âge formaté
 */
export const formatAge = (age, language) => {
  const formats = {
    fr: `${age} Ans`,
    de: `${age} Jahre`,
    it: `${age} anni`,
    en: `${age} Years`
  };
  
  return formats[language] || formats.fr;
};
