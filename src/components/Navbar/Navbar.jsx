/* ============================================
   NAVBAR - Premium Responsive Navigation
   Desktop + Mobile with Animations
   ============================================ */

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  // Navigation links
  const navLinks = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'testimonials', label: 'Reviews', href: '#testimonials' },
    { id: 'instagram', label: 'Gallery', href: '#instagram' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background change on scroll
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show navbar on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = useCallback((e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const navHeight = navRef.current?.offsetHeight || 80;
      const targetPosition = targetSection.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <nav 
        ref={navRef}
        className={`
          ${styles.navbar}
          ${isScrolled ? styles.scrolled : ''}
          ${isVisible ? styles.visible : styles.hidden}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.container}>
          {/* Logo */}
          <a 
            href="/" 
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="Derma Natura - Home"
          >
            <span className={styles.logoIcon}>
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                <path 
                  d="M16 8C16 8 10 14 10 18C10 21.3137 12.6863 24 16 24C19.3137 24 22 21.3137 22 18C22 14 16 8 16 8Z" 
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className={styles.logoText}>
              <span className={styles.logoMain}>Derma</span>
              <span className={styles.logoAccent}>Natura</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`
                      ${styles.navLink}
                      ${activeSection === link.id ? styles.active : ''}
                    `}
                    onClick={(e) => scrollToSection(e, link.href)}
                  >
                    <span className={styles.navLinkText}>{link.label}</span>
                    <span className={styles.navLinkUnderline} />
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <a 
              href="#contact"
              className={styles.ctaButton}
              onClick={(e) => scrollToSection(e, '#contact')}
            >
              <span className={styles.ctaText}>Book Consultation</span>
              <span className={styles.ctaIcon}>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <span className={styles.ctaGlow} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.menuButton} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={styles.menuButtonInner}>
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{
              width: typeof window !== 'undefined' 
                ? `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
                : '0%'
            }}
          />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.open : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div 
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Mobile Menu Header */}
        <div className={styles.mobileHeader}>
          <a 
            href="/" 
            className={styles.mobileLogo}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <span className={styles.logoIcon}>
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                <path 
                  d="M16 8C16 8 10 14 10 18C10 21.3137 12.6863 24 16 24C19.3137 24 22 21.3137 22 18C22 14 16 8 16 8Z" 
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className={styles.logoText}>
              <span className={styles.logoMain}>Derma</span>
              <span className={styles.logoAccent}>Natura</span>
            </span>
          </a>

          <button
            className={styles.closeButton}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link, index) => (
              <li 
                key={link.id}
                className={styles.mobileLinkItem}
                style={{ '--index': index }}
              >
                <a
                  href={link.href}
                  className={`
                    ${styles.mobileLink}
                    ${activeSection === link.id ? styles.active : ''}
                  `}
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  <span className={styles.mobileLinkNumber}>
                    0{index + 1}
                  </span>
                  <span className={styles.mobileLinkText}>{link.label}</span>
                  <span className={styles.mobileLinkArrow}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile CTA */}
        <div className={styles.mobileCta}>
          <a 
            href="#contact"
            className={styles.mobileCtaButton}
            onClick={(e) => scrollToSection(e, '#contact')}
          >
            <span>Book Free Consultation</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Mobile Footer Info */}
        <div className={styles.mobileFooter}>
          {/* Contact Info */}
          <div className={styles.mobileContact}>
            <a href="tel:+442012345678" className={styles.mobileContactItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>020 1234 5678</span>
            </a>
            <a href="mailto:hello@dermanatura.co.uk" className={styles.mobileContactItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>hello@dermanatura.co.uk</span>
            </a>
          </div>

          {/* Social Links */}
          <div className={styles.mobileSocials}>
            <a 
              href="https://www.instagram.com/nurse.erikacunningham/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.mobileSocialLink}
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/nurse.erikacunningham/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.mobileSocialLink}
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@nurse.erikacunningham" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.mobileSocialLink}
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className={styles.mobileCopyright}>
            © 2024 Derma Natura. All rights reserved.
          </p>
        </div>

        {/* Decorative Background */}
        <div className={styles.mobileDecor}>
          <div className={styles.mobileDecorCircle} />
          <div className={styles.mobileDecorCircle} />
        </div>
      </div>
    </>
  );
};

export default Navbar;