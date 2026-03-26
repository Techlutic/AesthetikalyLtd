/* ============================================
   ENHANCED ABOUT SECTION
   Meet Nurse Erica - Bio & Credentials
   With Unique Interactive Features
   ============================================ */

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './About.module.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeQuote, setActiveQuote] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);
  const [expandedJourney, setExpandedJourney] = useState(false);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  // Stats data
  const stats = [
    { value: 10, suffix: '+', label: 'Years Experience', icon: 'calendar' },
    { value: 5000, suffix: '+', label: 'Happy Clients', icon: 'users' },
    { value: 15, suffix: 'K+', label: 'Treatments Done', icon: 'sparkle' },
    { value: 100, suffix: '%', label: 'Satisfaction Rate', icon: 'heart' }
  ];

  // Testimonial quotes
  const quotes = [
    { text: "Absolutely transformed my confidence!", author: "Sarah M.", rating: 5 },
    { text: "The most professional experience ever.", author: "Jennifer L.", rating: 5 },
    { text: "Natural results that I love!", author: "Emma T.", rating: 5 },
    { text: "So gentle and caring, highly recommend!", author: "Michelle R.", rating: 5 }
  ];

  // Career journey milestones
  const journey = [
    { year: '2013', title: 'Qualified as RN', desc: 'Royal College of Nursing', icon: '🎓' },
    { year: '2016', title: 'Aesthetics Training', desc: 'Harley Street Academy', icon: '💉' },
    { year: '2018', title: 'Advanced Certification', desc: 'Level 7 Diploma', icon: '📜' },
    { year: '2020', title: 'Founded Practice', desc: 'Independent Practitioner', icon: '🏥' },
    { year: '2024', title: 'Master Injector', desc: 'Elite Provider Status', icon: '⭐' }
  ];

  // Credentials list
  const credentials = [
    { icon: 'shield', text: 'NMC Registered Nurse' },
    { icon: 'award', text: 'Level 7 Diploma in Aesthetic Medicine' },
    { icon: 'syringe', text: 'Advanced Botulinum Toxin Certified' },
    { icon: 'sparkle', text: 'Dermal Filler Specialist' },
    { icon: 'users', text: 'Member of British Association of Cosmetic Nurses' },
    { icon: 'check', text: 'Fully Insured & Accredited' }
  ];

  // Social links
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/nurse.erikacunningham/', icon: 'facebook', color: '#1877F2' },
    { name: 'Instagram', url: 'https://www.instagram.com/nurse.erikacunningham/', icon: 'instagram', color: '#E4405F' },
    { name: 'TikTok', url: '#', icon: 'tiktok', color: '#000000' },
    { name: 'WhatsApp', url: '#', icon: 'whatsapp', color: '#25D366' }
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCountersStarted(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Magnetic cursor effect for 3D tilt
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / 20;
    const y = (e.clientY - centerY) / 20;
    setMousePosition({ x: Math.max(-15, Math.min(15, x)), y: Math.max(-15, Math.min(15, y)) });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
  }, []);

  return (
    <section className={styles.about} id="about" ref={sectionRef}>
      {/* Animated background blobs */}
      <div className={styles.blobContainer} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      {/* Floating particles */}
      <div className={styles.particles} aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span 
            key={i} 
            className={styles.particle} 
            style={{ 
              '--delay': `${i * 0.7}s`,
              '--duration': `${6 + i * 0.5}s`
            }} 
          />
        ))}
      </div>

      <div className={styles.container}>
        {/* Section header */}
        <header className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowIcon}>✦</span>
            About Me
            <span className={styles.eyebrowIcon}>✦</span>
          </span>
          <h2 className={styles.sectionTitle}>
            The Face Behind <span className={styles.titleHighlight}>the Care</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Dedicated to enhancing your natural beauty with expertise and compassion
          </p>
        </header>

        <div className={styles.grid}>
          {/* Image Column */}
          <div 
            className={`${styles.imageColumn} ${isVisible ? styles.visible : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Main image wrapper with 3D effect */}
            <div 
              className={styles.imageWrapper}
              ref={imageRef}
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
              }}
            >
              {/* Animated glow effect */}
              <div className={styles.imageGlow} />
              
              {/* Main image */}
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=750&fit=crop&crop=face&auto=format&q=80"
                alt="Nurse Erica Cunningham - Aesthetic Practitioner"
                className={styles.image}
                loading="lazy"
                width="600"
                height="750"
              />
              
              {/* Gradient overlay */}
              <div className={styles.imageOverlay} />
              
              {/* Decorative border frame */}
              <div className={styles.imageFrame} />
              
              {/* Corner accents */}
              <div className={styles.cornerAccent} data-position="top-left" />
              <div className={styles.cornerAccent} data-position="bottom-right" />
            </div>

            {/* Decorative elements */}
            <div className={styles.decorCircle1} aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" className={styles.decorCirclePath} />
              </svg>
            </div>
            <div className={styles.decorCircle2} aria-hidden="true" />
            <div className={styles.decorDots} aria-hidden="true" />
            <div className={styles.decorLine} aria-hidden="true" />

            {/* Floating testimonial quote */}
            <div className={styles.floatingQuote} key={activeQuote}>
              <div className={styles.quoteStars}>
                {[...Array(quotes[activeQuote].rating)].map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>
              <p className={styles.quoteText}>"{quotes[activeQuote].text}"</p>
              <span className={styles.quoteAuthor}>— {quotes[activeQuote].author}</span>
              <div className={styles.quoteDots}>
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.quoteDot} ${i === activeQuote ? styles.active : ''}`}
                    onClick={() => setActiveQuote(i)}
                    aria-label={`Show quote ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Animated signature */}
            <div className={`${styles.signature} ${isVisible ? styles.visible : ''}`}>
              <svg viewBox="0 0 200 60" className={styles.signatureSvg}>
                <path
                  d="M10,45 C20,20 35,50 45,30 S60,45 75,25 S95,40 110,28 S130,45 150,30 S170,40 185,35"
                  className={styles.signaturePath}
                />
              </svg>
              <span className={styles.signatureText}>Nurse Erica</span>
            </div>

            {/* Experience badge */}
            <div className={styles.experienceBadge}>
              <div className={styles.badgeInner}>
                <span className={styles.badgeNumber}>10+</span>
                <span className={styles.badgeText}>Years of Excellence</span>
              </div>
              <div className={styles.badgeRing} />
            </div>
          </div>

          {/* Content Column */}
          <div className={`${styles.contentColumn} ${isVisible ? styles.visible : ''}`}>
            {/* Name tag */}
            <div className={styles.nameTag}>
              <div className={styles.nameTagAvatar}>
                <span>👩‍⚕️</span>
              </div>
              <div className={styles.nameTagContent}>
                <h3 className={styles.name}>Nurse Erica Cunningham</h3>
                <p className={styles.role}>
                  <span className={styles.roleIcon}>💎</span>
                  RN, Level 7 Aesthetic Practitioner
                </p>
              </div>
              <div className={styles.verifiedBadge} title="Verified Professional">
                <VerifiedIcon />
              </div>
            </div>

            {/* Tagline */}
            <h4 className={styles.tagline}>
              Crafting Natural Beauty Through <span>Expert Care</span>
            </h4>

            {/* Bio */}
            <div className={styles.bio}>
              <p>
                Hello, I'm Erica Cunningham, a registered nurse with over a decade 
                of experience in aesthetic medicine. My passion lies in helping 
                clients achieve <strong>natural, beautiful results</strong> that enhance their 
                unique features while maintaining the highest safety standards.
              </p>
              <p>
                I believe that everyone deserves to feel confident in their own 
                skin. That's why I take the time to truly understand your goals, 
                concerns, and expectations before recommending any treatment.
              </p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={styles.statCard}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className={styles.statIcon}>
                    <StatIcon name={stat.icon} />
                  </div>
                  <span className={styles.statValue}>
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      start={countersStarted}
                      delay={index * 200}
                    />
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Journey Timeline */}
            <div className={styles.journeySection}>
              <button 
                className={styles.journeyHeader}
                onClick={() => setExpandedJourney(!expandedJourney)}
                aria-expanded={expandedJourney}
              >
                <h4 className={styles.journeyTitle}>
                  <span className={styles.journeyTitleIcon}>🚀</span>
                  My Professional Journey
                </h4>
                <span className={`${styles.journeyToggle} ${expandedJourney ? styles.expanded : ''}`}>
                  <ChevronIcon />
                </span>
              </button>
              
              <div className={`${styles.timeline} ${expandedJourney ? styles.expanded : ''}`}>
                <div className={styles.timelineTrack}>
                  {journey.map((item, index) => (
                    <div 
                      key={index} 
                      className={`${styles.timelineItem} ${isVisible ? styles.visible : ''}`}
                      style={{ '--delay': `${0.3 + index * 0.15}s` }}
                    >
                      <div className={styles.timelineMarker}>
                        <span className={styles.timelineIcon}>{item.icon}</span>
                      </div>
                      <div className={styles.timelineYear}>{item.year}</div>
                      <div className={styles.timelineContent}>
                        <h5 className={styles.timelineTitle}>{item.title}</h5>
                        <p className={styles.timelineDesc}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className={styles.credentials}>
              <h4 className={styles.credentialsTitle}>
                <span className={styles.credentialsTitleIcon}>
                  <CertificateIcon />
                </span>
                Qualifications & Accreditations
              </h4>
              <div className={styles.credentialsList}>
                {credentials.map((credential, index) => (
                  <div 
                    key={index} 
                    className={`${styles.credentialItem} ${isVisible ? styles.visible : ''}`}
                    style={{ '--delay': `${0.5 + index * 0.08}s` }}
                  >
                    <span className={styles.credentialIcon}>
                      <CredentialIcon name={credential.icon} />
                    </span>
                    <span className={styles.credentialText}>{credential.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA & Social Section */}
            <div className={styles.ctaSection}>
              <a href="#contact" className={styles.ctaButton}>
                <span className={styles.ctaButtonBg} />
                <span className={styles.ctaButtonContent}>
                  <span>Book a Consultation</span>
                  <ArrowIcon />
                </span>
              </a>

              <div className={styles.socialSection}>
                <span className={styles.socialLabel}>Follow my work</span>
                <div className={styles.socialLinks}>
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ 
                        '--hover-color': link.color,
                        '--delay': `${index * 0.05}s`
                      }}
                      aria-label={`Follow on ${link.name}`}
                    >
                      <span className={styles.socialLinkBg} />
                      <SocialIcon name={link.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================
   ANIMATED COUNTER COMPONENT
   ========================================== */

const AnimatedCounter = ({ value, suffix, start, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    
    const timeout = setTimeout(() => {
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * value);
        
        setCount(currentCount);
        
        if (progress < 1) {
          countRef.current = requestAnimationFrame(animate);
        }
      };
      
      countRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [start, value, delay]);

  return <>{count.toLocaleString()}{suffix}</>;
};

/* ==========================================
   ICONS
   ========================================== */

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const CertificateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="14" rx="2"/>
    <path d="M7 8h10M7 12h6"/>
    <circle cx="17" cy="17" r="3"/>
    <path d="M17 14v6"/>
  </svg>
);

const StatIcon = ({ name }) => {
  const icons = {
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364"/>
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  };
  return icons[name] || null;
};

const CredentialIcon = ({ name }) => {
  const icons = {
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    award: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    syringe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m18 2 4 4M7.5 8.5l8 8M11 6l8.5 8.5-4.5 4.5-8.5-8.5L2 14l-1-1 10.5-10.5 1 1L11 6z"/>
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/>
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <path d="M22 4L12 14.01l-3-3"/>
      </svg>
    )
  };
  return icons[name] || null;
};

const SocialIcon = ({ name }) => {
  const icons = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    )
  };
  return icons[name] || null;
};

export default About;