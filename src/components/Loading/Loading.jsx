/* ============================================
   LOADING COMPONENT
   Premium loading states with animations
   ============================================ */

import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ height = '50vh', showText = true }) => {
  return (
    <div 
      className={styles.loading} 
      style={{ minHeight: height }}
      role="status"
      aria-label="Loading content"
    >
      <div className={styles.loadingContent}>
        {/* Animated Logo/Spinner */}
        <div className={styles.spinnerWrapper}>
          <div className={styles.spinner}>
            <div className={styles.spinnerRing} />
            <div className={styles.spinnerRing} />
            <div className={styles.spinnerRing} />
          </div>
          
          {/* Center Logo */}
          <div className={styles.spinnerLogo}>
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
              <path 
                d="M16 8C16 8 10 14 10 18C10 21.3137 12.6863 24 16 24C19.3137 24 22 21.3137 22 18C22 14 16 8 16 8Z" 
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        {showText && (
          <div className={styles.loadingText}>
            <span className={styles.loadingDot}>Loading</span>
            <span className={styles.dots}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
      </div>

      {/* Skeleton Preview (optional) */}
      <div className={styles.skeletonPreview}>
        <div className={styles.skeletonLine} style={{ width: '60%' }} />
        <div className={styles.skeletonLine} style={{ width: '80%' }} />
        <div className={styles.skeletonLine} style={{ width: '40%' }} />
      </div>
    </div>
  );
};

export default Loading;