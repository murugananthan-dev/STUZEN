/**
 * STUZEN TECHNOLOGIES - Storage & State Utilities
 * Safe browser storage helpers with graceful fallbacks.
 */

/**
 * Safely retrieve parsed item from localStorage
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export function getStoredItem(key, defaultValue = null) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

/**
 * Safely store an item in localStorage
 * @param {string} key
 * @param {*} value
 * @returns {boolean} Success status
 */
export function setStoredItem(key, value) {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param {string} key
 */
export function removeStoredItem(key) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore error
  }
}

