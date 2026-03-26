/* ============================================
   ENHANCED SERVICES SECTION
   Treatment offerings with interactive cards
   ============================================ */

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Services.module.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Categories
  const categories = [
    { id: 'all', label: 'All Treatments', icon: '✨' },
    { id: 'injectables', label: 'Injectables', icon: '💉' },
    { id: 'skin', label: 'Skin Care', icon: '🌟' },
    { id: 'consultation', label: 'Consultation', icon: '📋' }
  ];

  // Enhanced services data
  const services = [
    {
      id: 1,
      icon: 'wrinkle',
      title: 'Anti-Wrinkle',
      shortTitle: 'Botox',
      description: 'Smooth fine lines and wrinkles for a naturally refreshed, youthful appearance.',
      category: 'injectables',
      popular: true,
      duration: '30 min',
      startingPrice: '£150',
      benefits: ['Natural Results', 'Quick Recovery', 'Long-lasting'],
      rating: 4.9,
      reviews: 127,
      beforeAfter: true,
      color: '#4A9B8E'
    },
    {
      id: 2,
      icon: 'filler',
      title: 'Dermal Fillers',
      shortTitle: 'Fillers',
      description: 'Restore volume and enhance facial contours with premium hyaluronic acid fillers.',
      category: 'injectables',
      popular: true,
      duration: '45 min',
      startingPrice: '£200',
      benefits: ['Instant Results', 'Natural Look', 'Reversible'],
      rating: 4.8,
      reviews: 98,
      beforeAfter: true,
      color: '#D4AF37'
    },
    {
      id: 3,
      icon: 'lips',
      title: 'Lip Enhancement',
      shortTitle: 'Lips',
      description: 'Natural-looking lip augmentation for fuller, beautifully defined lips.',
      category: 'injectables',
      popular: true,
      duration: '30 min',
      startingPrice: '£180',
      benefits: ['Fuller Lips', 'Defined Shape', 'Subtle Results'],
      rating: 4.9,
      reviews: 156,
      beforeAfter: true,
      color: '#E8A4B8'
    },
    {
      id: 4,
      icon: 'skin',
      title: 'Skin Rejuvenation',
      shortTitle: 'Rejuvenation',
      description: 'Advanced treatments to improve texture, tone, and overall skin radiance.',
      category: 'skin',
      popular: false,
      duration: '60 min',
      startingPrice: '£120',
      benefits: ['Glowing Skin', 'Even Tone', 'Reduced Pores'],
      rating: 4.7,
      reviews: 64,
      beforeAfter: true,
      color: '#7BC4A8'
    },
    {
      id: 5,
      icon: 'consultation',
      title: 'Skin Consultation',
      shortTitle: 'Consult',
      description: 'Comprehensive analysis and personalized treatment plans for your unique needs.',
      category: 'consultation',
      popular: false,
      duration: '45 min',
      startingPrice: 'Free',
      benefits: ['Personalized Plan', 'Expert Advice', 'No Obligation'],
      rating: 5.0,
      reviews: 203,
      beforeAfter: false,
      color: '#6B8DD6'
    },
    {
      id: 6,
      icon: 'peel',
      title: 'Chemical Peels',
      shortTitle: 'Peels',
      description: 'Professional-grade peels to reveal brighter, smoother, renewed skin.',
      category: 'skin',
      popular: false,
      duration: '45 min',
      startingPrice: '£80',
      benefits: ['Brighter Skin', 'Smooth Texture', 'Anti-aging'],
      rating: 4.6,
      reviews: 42,
      beforeAfter: true,
      color: '#F4A460'
    }
  ];

  // Filter services
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D card tilt effect
  const handleMouseMove = useCallback((e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    
    setMousePosition({ x, y });
    setHoveredCard(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
    setHoveredCard(null);
  }, []);

  // Scroll to contact
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.services} id="services" ref={sectionRef}>
      {/* Animated Background */}
      <div className={styles.backgroundEffects} aria-hidden="true">
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
        <div className={styles.floatingShapes}>
          {[...Array(6)].map((_, i) => (
            <span 
              key={i} 
              className={styles.floatingShape}
              style={{ '--index': i }}
            />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <header className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeIcon}>💎</span>
            <span className={styles.badgeText}>Premium Treatments</span>
          </div>
          
          <h2 className={styles.title}>
            Treatments <span className={styles.titleHighlight}>Tailored</span> to You
          </h2>
          
          <p className={styles.subtitle}>
            Evidence-based aesthetic treatments delivered with precision, 
            care, and your safety as our priority.
          </p>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15K+</span>
              <span className={styles.statLabel}>Treatments</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Safe</span>
            </div>
          </div>
        </header>

        {/* Category Filter */}
        <div className={`${styles.categoryFilter} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.categoryTrack}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span className={styles.categoryLabel}>{cat.label}</span>
                {activeCategory === cat.id && (
                  <span className={styles.categoryActiveBg} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {filteredServices.map((service, index) => (
            <article
              key={service.id}
              ref={el => cardsRef.current[index] = el}
              className={`${styles.card} ${isVisible ? styles.visible : ''}`}
              style={{ 
                transitionDelay: `${200 + index * 100}ms`,
                '--card-color': service.color,
                transform: hoveredCard === index 
                  ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.02)`
                  : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Card Glow Effect */}
              <div className={styles.cardGlow} />
              
              {/* Popular Badge */}
              {service.popular && (
                <div className={styles.badge}>
                  <span className={styles.badgePulse} />
                  <span className={styles.badgeContent}>
                    <FireIcon />
                    Popular
                  </span>
                </div>
              )}

              {/* Duration Pill */}
              <div className={styles.durationPill}>
                <ClockIcon />
                <span>{service.duration}</span>
              </div>

              {/* Icon */}
              <div className={styles.iconWrapper}>
                <div className={styles.iconBg} />
                <div className={styles.iconInner}>
                  <ServiceIcon name={service.icon} />
                </div>
                <div className={styles.iconRing} />
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>

                {/* Benefits Tags */}
                <div className={styles.benefitsTags}>
                  {service.benefits.map((benefit, i) => (
                    <span key={i} className={styles.benefitTag}>
                      <CheckIcon />
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className={styles.ratingRow}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`${styles.star} ${i < Math.floor(service.rating) ? styles.filled : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={styles.ratingValue}>{service.rating}</span>
                  <span className={styles.reviewCount}>({service.reviews} reviews)</span>
                </div>
              </div>

              {/* Footer */}
              <div className={styles.cardFooter}>
                <div className={styles.priceSection}>
                  <span className={styles.priceLabel}>Starting from</span>
                  <span className={styles.priceValue}>{service.startingPrice}</span>
                </div>
                
                <button 
                  onClick={scrollToContact}
                  className={styles.cardButton}
                >
                  <span>Book Now</span>
                  <ArrowIcon />
                </button>
              </div>

              {/* Before/After Indicator */}
              {service.beforeAfter && (
                <div className={styles.beforeAfterBadge}>
                  <CompareIcon />
                  <span>View Results</span>
                </div>
              )}

              {/* Hover Particles */}
              <div className={styles.cardParticles} aria-hidden="true">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className={styles.cardParticle} style={{ '--i': i }} />
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Treatment Process */}
        <div className={`${styles.processSection} ${isVisible ? styles.visible : ''}`}>
          <h3 className={styles.processTitle}>
            <span className={styles.processTitleIcon}>🎯</span>
            Your Treatment Journey
          </h3>
          
          <div className={styles.processSteps}>
            {[
              { step: '01', title: 'Consultation', desc: 'Free assessment & planning', icon: '💬' },
              { step: '02', title: 'Treatment', desc: 'Expert care & precision', icon: '✨' },
              { step: '03', title: 'Aftercare', desc: 'Ongoing support & guidance', icon: '💝' },
              { step: '04', title: 'Results', desc: 'Natural, beautiful you', icon: '🌟' }
            ].map((item, index) => (
              <div 
                key={index} 
                className={styles.processStep}
                style={{ '--delay': `${0.6 + index * 0.15}s` }}
              >
                <div className={styles.stepNumber}>{item.step}</div>
                <div className={styles.stepIcon}>{item.icon}</div>
                <h4 className={styles.stepTitle}>{item.title}</h4>
                <p className={styles.stepDesc}>{item.desc}</p>
                {index < 3 && <div className={styles.stepConnector} />}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.bottomCta} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>🤔</div>
            <div className={styles.ctaText}>
              <h4>Not sure which treatment is right for you?</h4>
              <p>Book a free consultation and let's create your personalized plan.</p>
            </div>
          </div>
          
          <button onClick={scrollToContact} className={styles.ctaButton}>
            <span className={styles.ctaButtonBg} />
            <span className={styles.ctaButtonContent}>
              <CalendarIcon />
              <span>Book Free Consultation</span>
            </span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className={`${styles.trustBadges} ${isVisible ? styles.visible : ''}`}>
          {[
            { icon: '🛡️', text: 'Fully Insured' },
            { icon: '✅', text: 'NMC Registered' },
            { icon: '🏆', text: 'Award Winning' },
            { icon: '💯', text: 'FDA Approved Products' }
          ].map((badge, i) => (
            <div key={i} className={styles.trustBadge}>
              <span className={styles.trustIcon}>{badge.icon}</span>
              <span className={styles.trustText}>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==========================================
   ICONS
   ========================================== */

const FireIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.fireIcon}>
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
  </svg>
);

const CompareIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
  </svg>
);

const ServiceIcon = ({ name }) => {
  const icons = {
    wrinkle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M8.5 9.5a.5.5 0 11-1 0 .5.5 0 011 0zM16.5 9.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 15c1.333 1 2.667 1.5 4 1.5s2.667-.5 4-1.5" />
        <path strokeLinecap="round" d="M7 13c.5-.5 1.5-1 2-1M17 13c-.5-.5-1.5-1-2-1" opacity="0.5" />
      </svg>
    ),
    filler: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8 5h8l-1 2v4.5a1.5 1.5 0 001.5 1.5h0a1.5 1.5 0 001.5 1.5V17a2 2 0 01-2 2H8a2 2 0 01-2-2v-2.5a1.5 1.5 0 001.5-1.5h0A1.5 1.5 0 009 11.5V7L8 5z" />
        <path strokeLinecap="round" d="M10 14h4" opacity="0.5" />
      </svg>
    ),
    lips: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5C8 5 4 9 4 12c0 2 2 5 8 7 6-2 8-5 8-7 0-3-4-7-8-7z" />
        <path strokeLinecap="round" d="M4 12h16" />
        <path strokeLinecap="round" d="M12 5v7" opacity="0.5" />
      </svg>
    ),
    skin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path strokeLinecap="round" d="M5 20l1 3M19 20l-1 3M12 18v3" opacity="0.5" />
        <circle cx="5" cy="17" r="2" />
        <circle cx="19" cy="17" r="2" />
        <circle cx="12" cy="15" r="2" />
      </svg>
    ),
    consultation: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path strokeLinecap="round" d="M9 7h6M9 11h6M9 15h4" />
        <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    peel: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        <path strokeLinecap="round" d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" opacity="0.5" />
      </svg>
    )
  };

  return icons[name] || null;
};

export default Services;