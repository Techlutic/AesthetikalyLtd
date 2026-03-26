/* ============================================
   useLazyLoad Hook
   Lazy loading for images and components
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for lazy loading elements
 * @param {Object} options - Configuration options
 * @param {string} options.rootMargin - Margin before triggering load
 * @param {number} options.threshold - Visibility threshold
 * @returns {Array} [ref, hasLoaded, isLoading]
 */
export const useLazyLoad = (options = {}) => {
  const {
    rootMargin = '100px',
    threshold = 0,
  } = options;

  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    // Check for IntersectionObserver support
    if (!node || typeof IntersectionObserver === 'undefined') {
      setHasLoaded(true);
      return;
    }

    // Skip if already loaded
    if (hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoading(true);
          
          // Small delay to ensure smooth transition
          requestAnimationFrame(() => {
            setHasLoaded(true);
            setIsLoading(false);
          });
          
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasLoaded, rootMargin, threshold]);

  // Reset function
  const reset = useCallback(() => {
    setHasLoaded(false);
    setIsLoading(false);
  }, []);

  return [ref, hasLoaded, isLoading, reset];
};

export default useLazyLoad;