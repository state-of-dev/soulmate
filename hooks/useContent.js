import { useState, useEffect } from 'react';
import { content as defaultContent } from '@/lib/content';
import { getContentFromCache, setContentCache } from '@/lib/content-cache';

/**
 * Hook para acceder al contenido centralizado de la aplicación
 * @returns {Object} Objeto con todo el contenido de texto de la aplicación
 */
export const useContent = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar contenido desde la API si está disponible
    const loadContent = async () => {
      try {
        // Intentar usar cache primero
        const cachedContent = getContentFromCache();
        if (cachedContent) {
          setContent(cachedContent);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/content');
        if (response.ok) {
          const apiContent = await response.json();
          // Merge with default content to ensure all required properties exist
          const mergedContent = {
            ...defaultContent,
            ...apiContent,
            navigation: {
              ...defaultContent.navigation,
              ...apiContent.navigation
            }
          };
          setContent(mergedContent);
          setContentCache(mergedContent);
        }
      } catch (error) {
        console.log('Using default content');
        // Usar contenido por defecto si falla la API
      } finally {
        setLoading(false);
      }
    };

    loadContent();

    // Escuchar eventos de actualización de contenido
    const handleContentUpdate = () => {
      loadContent();
    };

    window.addEventListener('content-updated', handleContentUpdate);
    return () => {
      window.removeEventListener('content-updated', handleContentUpdate);
    };
  }, []);

  return content;
};