/* ============================================
   TRUST BAR SECTION - Premium Design
   Credentials & Social Proof with Impact
   ============================================ */

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './TrustBar.module.css';

const TrustBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse move handler for parallax effect
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  }, []);

  // Trust items data with enhanced properties
  const trustItems = [
    {
      id: 1,
      icon: 'shield',
      value: 'NMC',
      label: 'Registered',
      sublabel: 'Nursing & Midwifery Council',
      description: 'Fully registered and regulated healthcare professional',
      color: 'primary',
      isCounter: false
    },
    {
      id: 2,
      icon: 'experience',
      value: 10,
      suffix: '+',
      label: 'Years',
      sublabel: 'Clinical Experience',
      description: 'Over a decade of aesthetic expertise',
      color: 'accent',
      isCounter: true
    },
    {
      id: 3,
      icon: 'clients',
      value: 500,
      suffix: '+',
      label: 'Happy',
      sublabel: 'Satisfied Clients',
      description: 'Trusted by hundreds of clients',
      color: 'success',
      isCounter: true
    },
    {
      id: 4,
      icon: 'rating',
      value: 5.0,
      suffix: '',
      label: 'Star Rating',
      sublabel: 'Google Reviews',
      description: 'Perfect score from verified reviews',
      color: 'gold',
      isCounter: false,
      showStars: true
    }
  ];

  return (
    <section 
      className={styles.trustBar} 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div 
          className={styles.gradientBlob1}
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
        <div 
          className={styles.gradientBlob2}
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
          }}
        />
        <div className={styles.gridOverlay} />
        <div className={styles.noiseOverlay} />
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeDot} />
            <span>Why Choose Us</span>
          </div>
          <h2 className={styles.headerTitle}>
            Trusted by <span className={styles.highlight}>Hundreds</span> of Clients
          </h2>
          <p className={styles.headerSubtitle}>
            Professional credentials and proven results that speak for themselves
          </p>
        </div>

        {/* Trust Cards Grid */}
        <div className={styles.grid}>
          {trustItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                ${styles.trustCard} 
                ${styles[`card${item.color}`]}
                ${isVisible ? styles.visible : ''}
                ${activeIndex === index ? styles.active : ''}
              `}
              style={{ 
                '--delay': `${index * 0.1}s`,
                transform: activeIndex === index 
                  ? `translateY(-8px) scale(1.02)` 
                  : 'translateY(0) scale(1)'
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Card Glow Effect */}
              <div className={styles.cardGlow} />
              
              {/* Card Border Gradient */}
              <div className={styles.cardBorder} />
              
              {/* Card Content */}
              <div className={styles.cardInner}>
                {/* Icon Container */}
                <div className={styles.iconContainer}>
                  <div className={styles.iconBg}>
                    <div className={styles.iconRing} />
                  </div>
                  <div className={styles.iconWrapper}>
                    <TrustIcon name={item.icon} />
                  </div>
                  {/* Floating particles around icon */}
                  <div className={styles.iconParticles}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                {/* Value Display */}
                <div className={styles.valueContainer}>
                  {item.showStars ? (
                    <div className={styles.starsValue}>
                      <span className={styles.valueNumber}>
                        {item.isCounter ? (
                          <Counter 
                            end={item.value} 
                            decimals={1}
                            isVisible={isVisible} 
                          />
                        ) : (
                          item.value
                        )}
                      </span>
                      <div className={styles.starsWrapper}>
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={styles.starIcon}
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.value}>
                      {item.isCounter ? (
                        <Counter 
                          end={item.value} 
                          suffix={item.suffix} 
                          isVisible={isVisible} 
                        />
                      ) : (
                        <>
                          <span className={styles.valueText}>{item.value}</span>
                          {item.suffix && (
                            <span className={styles.valueSuffix}>{item.suffix}</span>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Labels */}
                <div className={styles.labelContainer}>
                  <div className={styles.label}>{item.label}</div>
                  <div className={styles.sublabel}>{item.sublabel}</div>
                </div>

                {/* Hover Description */}
                <div className={styles.description}>
                  <p>{item.description}</p>
                </div>

                {/* Bottom Accent Line */}
                <div className={styles.accentLine} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Marquee */}
        <div className={`${styles.marqueeContainer} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.marqueeTrack}>
            <div className={styles.marqueeContent}>
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className={styles.marqueeSet}>
                  <span className={styles.marqueeItem}>✦ NMC Registered</span>
                  <span className={styles.marqueeItem}>✦ Fully Insured</span>
                  <span className={styles.marqueeItem}>✦ Premium Products</span>
                  <span className={styles.marqueeItem}>✦ Natural Results</span>
                  <span className={styles.marqueeItem}>✦ Personalized Care</span>
                  <span className={styles.marqueeItem}>✦ Safe Procedures</span>
                  <span className={styles.marqueeItem}>✦ Expert Training</span>
                  <span className={styles.marqueeItem}>✦ Confidential</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================
   COUNTER COMPONENT
   Smooth animated number counter with easing
   ========================================== */

const Counter = ({ end, suffix = '', decimals = 0, isVisible }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentValue = easedProgress * end;
      setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, end, decimals]);

  return (
    <span className={styles.counterValue}>
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix && <span className={styles.counterSuffix}>{suffix}</span>}
    </span>
  );
};

/* ==========================================
   TRUST ICONS
   Premium, detailed SVG icons
   ========================================== */

const TrustIcon = ({ name }) => {
  const icons = {
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
        />
      </svg>
    ),
    experience: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
        />
      </svg>
    ),
    clients: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" 
        />
      </svg>
    ),
    rating: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
        />
      </svg>
    )
  };

  return icons[name] || null;
};

export default TrustBar;