/**
 * Set Session Storage by key and where to set
 */
export const setSessionStorage = (key: string, varToSet: string) => {
  sessionStorage.setItem(key, window.btoa(varToSet));
};
/**
 * Get Session Storage by key
 */
export const getSessionStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const getStorage = sessionStorage.getItem(key);

    try {
      return getStorage ? window.atob(getStorage) : false;
    } catch (e) {
      return false;
    }
  }
};
/**
 * Remove the Spefic Session Storage by key
 */
export const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
/**
 * Remove All Session Storage
 */
export const unsetSessionStorage = () => {
  sessionStorage.clear();
};
/**
 * Set Local Storage by key and where to set
 */
export const setLocalStorage = (key: string, varToSet: string) => {
  localStorage.setItem(key, window.btoa(varToSet));
};
/**
 * Get Local Storage by key
 */
export const getLocalStorage = (key: string) => {
  const getStorage = localStorage.getItem(key);
  try {
    return getStorage ? window.atob(getStorage) : false;
  } catch (e) {
    return false;
  }
};
/**
 * Remove the Spefic Local Storage by key
 */
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
/**
 * Remove All Local Storage
 */
export const unsetLocalStorage = () => {
  localStorage.clear();
};
