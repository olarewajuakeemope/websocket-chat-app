/**
 * Sanitize input
 * @function htmlEntities
 * @export
 * @param {string} str
 * @returns {string} - Sanitized input
 */
export function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
}

/**
 * Check origin
 * @function originIsAllowed
 * @export
 * @param {string} origin
 * @returns {boolean} - Is origin accepted
 */
export function originIsAllowed(origin) {
  if (origin === 'http://localhost:3000') return true;
  return false;
}
