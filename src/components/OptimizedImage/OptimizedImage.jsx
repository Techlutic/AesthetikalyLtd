/* ============================================
   OPTIMIZED IMAGE COMPONENT
   Lazy loading with blur placeholder
   ============================================ */

import { useState, useRef, useEffect } from 'react';
import styles from './OptimizedImage.module.css';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  priority = false,
  placeholder = 'blur',
  blurDataURL = null,
  onLoad = () => {},
  onError = () => {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width || 400} ${height || 300}">
      <rect fill="#f0f9f7" width="100%" height="100%"/>
    </svg>`
  )}`;

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const node = imgRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad(e);
  };

  // Handle image error
  const handleError = (e) => {
    setHasError(true);
    onError(e);
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!src || src.includes('unsplash.com')) {
      // Unsplash-specific srcSet
      const widths = [400, 600, 800, 1000, 1200];
      return widths
        .map((w) => {
          const url = new URL(src);
          url.searchParams.set('w', w);
          return `${url.toString()} ${w}w`;
        })
        .join(', ');
    }
    return undefined;
  };

  return (
    <div
      ref={imgRef}
      className={`${styles.wrapper} ${className}`}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && !hasError && (
        <div
          className={styles.placeholder}
          style={{
            backgroundImage: `url(${blurDataURL || defaultBlurDataURL})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          srcSet={generateSrcSet()}
          onLoad={handleLoad}
          onError={handleError}
          className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className={styles.error} role="img" aria-label={alt}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;