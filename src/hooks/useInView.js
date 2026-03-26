/* ============================================
   useInView Hook
   Intersection Observer for animations
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to detect when an element is in viewport
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin around root
 * @param {boolean} options.triggerOnce - Only trigger once (default: true)
 * @param {boolean} options.initialInView - Initial inView state
 * @returns {Array} [ref, isInView, entry]
 */
export const useInView = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    initialInView = false,
  } = options;

  const [isInView, setIsInView] = useState(initialInView);
  const [entry, setEntry] = useState(null);
  const ref = useRef(null);
  const hasTriggered = useRef(false);

  const callback = useCallback(
    ([entry]) => {
      setEntry(entry);

      if (triggerOnce) {
        if (entry.isIntersecting && !hasTriggered.current) {
          setIsInView(true);
          hasTriggered.current = true;
        }
      } else {
        setIsInView(entry.isIntersecting);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const node = ref.current;
    
    // Check for IntersectionObserver support
    if (!node || typeof IntersectionObserver === 'undefined') {
      // Fallback: set to visible immediately
      setIsInView(true);
      return;
    }

    // Skip if already triggered (for triggerOnce)
    if (triggerOnce && hasTriggered.current) {
      return;
    }

    const observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [callback, threshold, rootMargin, triggerOnce]);

  // Reset function for reusability
  const reset = useCallback(() => {
    setIsInView(initialInView);
    hasTriggered.current = false;
  }, [initialInView]);

  return [ref, isInView, entry, reset];
};

export default useInView;