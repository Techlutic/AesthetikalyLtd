/* ============================================
   HERO SECTION - Premium Design
   Unique, Captivating, Conversion-Focused
   ============================================ */

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Hero.module.css';
// import pro from '../../../public/images/pro.PNG';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const portraitRef = useRef(null);

  // Initialize animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax mouse effect
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  }, []);

  // Smooth scroll functions
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split text into characters for animation
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={styles.char}
        style={{ 
          animationDelay: `${index * 0.03}s`,
          // Handle spaces
          ...(char === ' ' && { width: '0.3em' })
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      ref={heroRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        {/* Gradient Orbs */}
        <div 
          className={styles.gradientOrb1}
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
          }}
        />
        <div 
          className={styles.gradientOrb2}
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
          }}
        />
        <div className={styles.gradientOrb3} />
        
        {/* Grid Pattern */}
        <div className={styles.gridPattern} />
        
        {/* Floating Particles */}
        <div className={styles.particles}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className={styles.particle} />
          ))}
        </div>
      </div>


      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Side - Text Content */}
        <div className={`${styles.textColumn} ${isLoaded ? styles.visible : ''}`}>
          {/* Eyebrow Badge */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>NMC Registered Nurse</span>
          </div>

          {/* Main Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>
              <span className={styles.headlineText}>
                {isLoaded && splitText('Reveal Your Natural Glow')}
              </span>
            </span>
            
          </h1>

          {/* Subheadline */}
          <p className={styles.subheadline}>
            Experience transformative aesthetic treatments with expert care. 
            <span className={styles.subheadlineHighlight}> Nurse Erica Cunningham </span>
            brings over a decade of clinical excellence to help you achieve 
            naturally beautiful results.
          </p>

          {/* CTA Group */}
          <div className={styles.ctaGroup}>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={styles.primaryCta}
            >
              <span className={styles.ctaText}>Book Free Consultation</span>
              <span className={styles.ctaIconWrapper}>
                <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className={styles.ctaGlow} />
            </button>
            
            <button 
              onClick={() => scrollToSection('services')} 
              className={styles.secondaryCta}
            >
              <span className={styles.playIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>View Treatments</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span>Fully Insured</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>10+ Years Exp</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span>500+ Clients</span>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Content */}
        <div className={`${styles.visualColumn} ${isLoaded ? styles.visible : ''}`}>
          {/* Main Portrait */}
          <div 
            ref={portraitRef}
            className={styles.portraitContainer}
            style={{
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
            }}
          >
            {/* Decorative Elements */}
            <div className={styles.portraitDecor}>
              <div className={styles.decorRing1} />
              <div className={styles.decorRing2} />
              <div className={styles.decorDots} />
            </div>
            
            {/* Image Wrapper */}
            <div className={styles.portraitWrapper}>
              <div className={styles.portraitMask}>
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=750&fit=crop&crop=face&auto=format&q=85"
                  alt="Nurse Erica Cunningham - Professional Aesthetic Practitioner"
                  className={styles.portrait}
                  loading="eager"
                  fetchpriority="high"
                />
                <div className={styles.portraitOverlay} />
              </div>
              
              {/* Floating Frame */}
              <div className={styles.portraitFrame} />
            </div>

            {/* Floating Cards */}
            <div 
              className={styles.floatingCard1}
              style={{
                transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`
              }}
            >
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardValue}>5.0</span>
                <span className={styles.cardLabel}>Client Rating</span>
              </div>
            </div>

            <div 
              className={styles.floatingCard2}
              style={{
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
              }}
            >
              <div className={styles.cardIconSmall}>✓</div>
              <span className={styles.cardText}>Natural Results</span>
            </div>

            <div 
              className={styles.floatingCard3}
              style={{
                transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 15}px)`
              }}
            >
              <div className={styles.cardBadge}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span>Award Winning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className={`${styles.statsBar} ${isLoaded ? styles.visible : ''}`}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>10+</span>
          <span className={styles.statLabel}>Years Experience</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>500+</span>
          <span className={styles.statLabel}>Happy Clients</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>15+</span>
          <span className={styles.statLabel}>Treatments</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>100%</span>
          <span className={styles.statLabel}>Satisfaction</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`${styles.scrollIndicator} ${isLoaded ? styles.visible : ''}`}>
        <button 
          onClick={() => scrollToSection('services')}
          className={styles.scrollButton}
          aria-label="Scroll to explore"
        >
          <span className={styles.scrollMouse}>
            <span className={styles.scrollWheel} />
          </span>
          <span className={styles.scrollText}>Scroll to explore</span>
          <span className={styles.scrollArrows}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero;