/* ============================================
   ENHANCED FOOTER SECTION
   Premium footer with rich features
   ============================================ */

import { useState, useEffect, useRef } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const footerRef = useRef(null);

  /////////////////////

  // Quick links data
  const quickLinks = [
    { label: 'Services', href: '#services', icon: '✨' },
    { label: 'About', href: '#about', icon: '👩‍⚕️' },
    { label: 'Testimonials', href: '#testimonials', icon: '⭐' },
    { label: 'Contact', href: '#contact', icon: '📞' },
    { label: 'Privacy Policy', href: '/privacy', icon: '🔒' },
    { label: 'Terms & Conditions', href: '/terms', icon: '📄' }
  ];

  // Treatments data
  const treatments = [
    { label: 'Anti-Wrinkle', href: '#services', emoji: '💉' },
    { label: 'Dermal Fillers', href: '#services', emoji: '✨' },
    { label: 'Lip Enhancement', href: '#services', emoji: '💋' },
    { label: 'Skin Rejuvenation', href: '#services', emoji: '🌟' },
    { label: 'Chemical Peels', href: '#services', emoji: '🧴' },
    { label: 'Skin Consultation', href: '#services', emoji: '💬' }
  ];

  // Contact info
  const contactInfo = {
    phone: {
      display: '020 1234 5678',
      href: 'tel:+442012345678'
    },
    email: {
      display: 'hello@dermanatura.co.uk',
      href: 'mailto:hello@dermanatura.co.uk'
    },
    whatsapp: {
      display: 'WhatsApp',
      href: 'https://wa.me/442012345678'
    },
    address: 'London, United Kingdom'
  };

  // Opening hours
  const hours = [
    { days: 'Mon - Fri', time: '9:00 AM - 6:00 PM', open: true },
    { days: 'Saturday', time: '10:00 AM - 4:00 PM', open: true },
    { days: 'Sunday', time: 'Closed', open: false }
  ];

  // Social links
  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/nurse.erikacunningham/', icon: 'facebook', color: '#1877F2' },
    { name: 'Instagram', href: 'https://www.instagram.com/nurse.erikacunningham/', icon: 'instagram', color: '#E4405F' },
    { name: 'TikTok', href: '#', icon: 'tiktok', color: '#000000' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin', color: '#0A66C2' }
  ];

  // Accreditations
  const accreditations = [
    { name: 'NMC Registered', logo: '🏥', tooltip: 'Nursing & Midwifery Council' },
    { name: 'BACN Member', logo: '🎓', tooltip: 'British Association of Cosmetic Nurses' },
    { name: 'Fully Insured', logo: '🛡️', tooltip: 'Comprehensive Insurance Cover' },
    { name: 'Save Face', logo: '✅', tooltip: 'Accredited Practitioner' }
  ];

  // Payment methods
  const paymentMethods = ['visa', 'mastercard', 'amex', 'paypal', 'applepay'];

  // Instagram posts (mock data)
  const instagramPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=150&h=150&fit=crop', likes: 234 },
    { id: 2, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop', likes: 189 },
    { id: 3, image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=150&h=150&fit=crop', likes: 312 },
    { id: 4, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=150&h=150&fit=crop', likes: 276 }
  ];

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Back to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Newsletter submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || isNewsletterSubmitting) return;

    setIsNewsletterSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setNewsletterStatus('success');
    setEmail('');
    setIsNewsletterSubmitting(false);

    setTimeout(() => setNewsletterStatus(null), 5000);
  };

  // Cookie banner
  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowCookieBanner(false);
  };

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (accepted) {
      setShowCookieBanner(false);
    }
  }, []);

  return (
    <>
      <footer className={styles.footer} ref={footerRef}>
        {/* Wave Divider */}
        <div className={styles.waveDivider} aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className={styles.wavePath} />
          </svg>
        </div>

        <div className={styles.container}>
          {/* Newsletter Section */}
          <div className={styles.newsletterSection}>
            <div className={styles.newsletterContent}>
              <div className={styles.newsletterText}>
                <h3 className={styles.newsletterTitle}>
                  <span className={styles.newsletterIcon}>💌</span>
                  Stay Updated
                </h3>
                <p className={styles.newsletterSubtitle}>
                  Get exclusive offers, tips, and the latest treatments delivered to your inbox
                </p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                <div className={styles.newsletterInputWrapper}>
                  <EmailIcon />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={styles.newsletterInput}
                    disabled={isNewsletterSubmitting}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className={styles.newsletterButton}
                  disabled={isNewsletterSubmitting}
                >
                  {isNewsletterSubmitting ? (
                    <span className={styles.spinner} />
                  ) : newsletterStatus === 'success' ? (
                    <>
                      <CheckIcon />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowIcon />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              {accreditations.map((badge, index) => (
                <div 
                  key={index} 
                  className={styles.trustBadge}
                  title={badge.tooltip}
                >
                  <span className={styles.badgeLogo}>{badge.logo}</span>
                  <span className={styles.badgeName}>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className={styles.grid}>
            {/* Column 1: Brand */}
            <div className={styles.brandColumn}>
              <a href="/" className={styles.logo}>
                <span className={styles.logoIcon}>✨</span>
                Derma Natura
              </a>
              <p className={styles.brandDescription}>
                Expert aesthetic care by Registered Nurse Erica Cunningham. 
                Transforming skin naturally with professional, personalized treatments.
              </p>

              {/* Awards */}
              <div className={styles.awards}>
                <div className={styles.award}>
                  <span className={styles.awardIcon}>🏆</span>
                  <div className={styles.awardText}>
                    <span className={styles.awardTitle}>Best Clinic 2024</span>
                    <span className={styles.awardOrg}>UK Aesthetics Awards</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className={styles.socialSection}>
                <span className={styles.socialLabel}>Follow Us</span>
                <div className={styles.socialLinks}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ '--social-color': social.color }}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className={styles.linksColumn}>
              <h3 className={styles.columnTitle}>Quick Links</h3>
              <nav aria-label="Footer navigation">
                <ul className={styles.linksList}>
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={styles.link}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        <span className={styles.linkIcon}>{link.icon}</span>
                        <span>{link.label}</span>
                        <ChevronIcon />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Treatments */}
            <div className={styles.linksColumn}>
              <h3 className={styles.columnTitle}>Our Treatments</h3>
              <ul className={styles.linksList}>
                {treatments.map((treatment) => (
                  <li key={treatment.label}>
                    <a
                      href={treatment.href}
                      className={styles.link}
                      onClick={(e) => handleNavClick(e, treatment.href)}
                    >
                      <span className={styles.linkIcon}>{treatment.emoji}</span>
                      <span>{treatment.label}</span>
                      <ChevronIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Instagram */}
            <div className={styles.contactColumn}>
              <h3 className={styles.columnTitle}>Get in Touch</h3>
              
              {/* Contact Info */}
              <div className={styles.contactInfo}>
                <a href={contactInfo.phone.href} className={styles.contactItem}>
                  <PhoneIcon />
                  <span>{contactInfo.phone.display}</span>
                </a>
                <a href={contactInfo.email.href} className={styles.contactItem}>
                  <EmailIconOutline />
                  <span>{contactInfo.email.display}</span>
                </a>
                <a 
                  href={contactInfo.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItem}
                >
                  <WhatsAppIcon />
                  <span>{contactInfo.whatsapp.display}</span>
                </a>
                <div className={styles.contactItem}>
                  <LocationIcon />
                  <span>{contactInfo.address}</span>
                </div>
              </div>

              {/* Opening Hours */}
              <div className={styles.hours}>
                <h4 className={styles.hoursTitle}>
                  <ClockIcon />
                  Opening Hours
                </h4>
                <ul className={styles.hoursList}>
                  {hours.map((item) => (
                    <li key={item.days} className={`${styles.hoursItem} ${!item.open ? styles.closed : ''}`}>
                      <span className={styles.hoursDay}>
                        {item.open && <span className={styles.openDot} />}
                        {item.days}
                      </span>
                      <span className={styles.hoursTime}>{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instagram Feed */}
              <div className={styles.instagramSection}>
                <h4 className={styles.instagramTitle}>
                  <InstagramColorIcon />
                  @nurse.erikacunningham
                </h4>
                <div className={styles.instagramGrid}>
                  {instagramPosts.map((post) => (
                    <a
                      key={post.id}
                      href="https://www.instagram.com/nurse.erikacunningham/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.instagramPost}
                    >
                      <img src={post.image} alt="Instagram post" loading="lazy" />
                      <div className={styles.instagramOverlay}>
                        <HeartIcon />
                        <span>{post.likes}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className={styles.paymentSection}>
            <span className={styles.paymentLabel}>We Accept</span>
            <div className={styles.paymentMethods}>
              {paymentMethods.map((method) => (
                <div key={method} className={styles.paymentIcon} title={method}>
                  <PaymentIcon type={method} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.bottomContent}>
              <p className={styles.copyright}>
                © {currentYear} Derma Natura. All rights reserved.
              </p>
              <div className={styles.legalLinks}>
                <a href="/privacy" className={styles.legalLink}>Privacy</a>
                <span className={styles.legalDivider}>•</span>
                <a href="/terms" className={styles.legalLink}>Terms</a>
                <span className={styles.legalDivider}>•</span>
                <a href="/sitemap" className={styles.legalLink}>Sitemap</a>
              </div>
              <p className={styles.credits}>
                <span className={styles.creditIcon}>💝</span>
                Designed with care for your skin
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        className={`${styles.backToTop} ${showBackToTop ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg className={styles.progressRing} viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r="26"
            className={styles.progressRingCircle}
            style={{ strokeDashoffset: 163.36 - (163.36 * scrollProgress) / 100 }}
          />
        </svg>
        <ArrowUpIcon />
      </button>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className={styles.cookieBanner}>
          <div className={styles.cookieContent}>
            <div className={styles.cookieText}>
              <span className={styles.cookieIcon}>🍪</span>
              <p>
                We use cookies to enhance your experience. By continuing, you agree to our{' '}
                <a href="/privacy" className={styles.cookieLink}>Privacy Policy</a>.
              </p>
            </div>
            <div className={styles.cookieActions}>
              <button onClick={acceptCookies} className={styles.cookieAccept}>
                Accept
              </button>
              <button onClick={() => setShowCookieBanner(false)} className={styles.cookieDecline}>
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Trigger */}
      <button className={styles.chatButton} aria-label="Open live chat">
        <div className={styles.chatButtonInner}>
          <ChatIcon />
        </div>
        <div className={styles.chatBadge}>1</div>
      </button>
    </>
  );
};

/* ==========================================
   ICONS
   ========================================== */

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

const ArrowUpIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
  </svg>
);

const EmailIconOutline = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
  </svg>
);

const InstagramColorIcon = () => (
  <svg viewBox="0 0 24 24" fill="url(#instagram-gradient)">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FED373"/>
        <stop offset="50%" stopColor="#F15245"/>
        <stop offset="100%" stopColor="#D92E7F"/>
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

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
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  };
  return icons[name] || null;
};

const PaymentIcon = ({ type }) => {
  // Simplified payment icons (in production, use actual brand logos)
  return (
    <div className={styles.paymentCard}>
      <span>{type.toUpperCase()}</span>
    </div>
  );
};

export default Footer;