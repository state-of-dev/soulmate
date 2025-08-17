import { content } from '@/lib/content';

/**
 * Hook para acceder al contenido centralizado de la aplicación
 * @returns {Object} Objeto con todo el contenido de texto de la aplicación
 */
export const useContent = () => {
  return content;
};