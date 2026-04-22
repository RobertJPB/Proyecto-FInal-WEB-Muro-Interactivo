/**
 * Formats a date as a short relative time string in Spanish.
 * Replaces verbose date-fns output like "hace alrededor de 1 hora"
 * with concise equivalents like "hace 1h".
 *
 * @param {Date|import('firebase/firestore').Timestamp} date
 * @returns {string}
 */
export const formatTimeAgo = (date) => {
  // Acepta Timestamp de Firestore o Date nativo
  const d = date?.toDate ? date.toDate() : date instanceof Date ? date : null;
  if (!d) return 'hace un momento';

  const diffMs = Date.now() - d.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours   / 24);
  const weeks   = Math.floor(days    / 7);
  const months  = Math.floor(days    / 30);
  const years   = Math.floor(days    / 365);

  if (seconds < 10)  return 'ahora';
  if (seconds < 60)  return `hace ${seconds} seg`;
  if (minutes === 1) return 'hace 1 min';
  if (minutes < 60)  return `hace ${minutes} min`;
  if (hours === 1)   return 'hace 1h';
  if (hours < 24)    return `hace ${hours}h`;
  if (days === 1)    return 'ayer';
  if (days < 7)      return `hace ${days}d`;
  if (weeks === 1)   return 'hace 1 sem';
  if (weeks < 5)     return `hace ${weeks} sem`;
  if (months === 1)  return 'hace 1 mes';
  if (months < 12)   return `hace ${months} meses`;
  if (years === 1)   return 'hace 1 año';
  return `hace ${years} años`;
};
