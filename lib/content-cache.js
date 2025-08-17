// Sistema de cache simple para el contenido
let contentCache = null;
let cacheTime = 0;
const CACHE_DURATION = 30000; // 30 segundos

export const clearContentCache = () => {
  contentCache = null;
  cacheTime = 0;
};

export const getContentFromCache = () => {
  const now = Date.now();
  if (contentCache && (now - cacheTime) < CACHE_DURATION) {
    return contentCache;
  }
  return null;
};

export const setContentCache = (content) => {
  contentCache = content;
  cacheTime = Date.now();
};