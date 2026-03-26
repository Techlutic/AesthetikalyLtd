/* ============================================
   INSTAGRAM SECTION - Premium Design
   Social Media Feed with Visual Impact
   ============================================ */

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Instagram.module.css';

const Instagram = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

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

  // Mouse move handler for parallax
  const handleMouseMove = useCallback((e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  }, []);

  // Instagram posts data with engagement metrics
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop&auto=format&q=85',
      alt: 'Skincare products arranged aesthetically',
      likes: '1.2K',
      comments: '48',
      category: 'Products'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop&auto=format&q=85',
      alt: 'Relaxing facial treatment',
      likes: '2.4K',
      comments: '156',
      category: 'Treatment'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=600&fit=crop&auto=format&q=85',
      alt: 'Natural beauty portrait',
      likes: '3.1K',
      comments: '203',
      category: 'Results'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop&auto=format&q=85',
      alt: 'Lip enhancement results',
      likes: '1.8K',
      comments: '92',
      category: 'Lips'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop&auto=format&q=85',
      alt: 'Skincare routine essentials',
      likes: '956',
      comments: '67',
      category: 'Skincare'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=600&fit=crop&auto=format&q=85',
      alt: 'Professional aesthetic clinic',
      likes: '1.5K',
      comments: '84',
      category: 'Clinic'
    }
  ];

  const instagramUrl = 'https://www.instagram.com/nurse.erikacunningham/';
  const followerCount = '12.5K';

  return (
    <section 
      className={styles.instagram} 
      id="instagram" 
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
        
        {/* Floating Instagram Icons */}
        <div className={styles.floatingIcons}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={styles.floatingIcon}>
              <InstagramIcon />
            </span>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <header className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.headerContent}>
            {/* Badge */}
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>
                <InstagramIcon />
              </span>
              <span className={styles.badgeText}>Follow Our Journey</span>
            </div>

            {/* Title */}
            <h2 className={styles.title}>
              <span className={styles.titleLine}>Stay Connected</span>
              <span className={styles.titleLine}>
                <span className={styles.titleGradient}>@nurse.erikacunningham</span>
              </span>
            </h2>

            {/* Subtitle */}
            <p className={styles.subtitle}>
              Join our community of <span className={styles.highlight}>{followerCount} followers</span> for 
              daily skincare tips, treatment insights, and behind-the-scenes moments
            </p>

            {/* Stats Row */}
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{followerCount}</span>
                <span className={styles.statLabel}>Followers</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>500+</span>
                <span className={styles.statLabel}>Posts</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>98%</span>
                <span className={styles.statLabel}>Engagement</span>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.profileCardInner}>
              <div className={styles.profileImageWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face&auto=format&q=85"
                  alt="Nurse Erica Cunningham"
                  className={styles.profileImage}
                />
                <div className={styles.profileRing} />
                <div className={styles.profileBadge}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className={styles.profileInfo}>
                <h3 className={styles.profileName}>Nurse Erica</h3>
                <p className={styles.profileHandle}>@nurse.erikacunningham</p>
                <p className={styles.profileBio}>
                  NMC Registered Nurse | Aesthetic Practitioner | Natural Beauty Expert ✨
                </p>
              </div>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileFollowBtn}
              >
                <span>Follow</span>
              </a>
            </div>
          </div>
        </header>

        {/* Instagram Grid */}
        <div 
          ref={gridRef}
          className={`${styles.grid} ${isVisible ? styles.visible : ''}`}
          onMouseMove={handleMouseMove}
        >
          {posts.map((post, index) => (
            <a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.post} ${hoveredPost === post.id ? styles.postActive : ''}`}
              style={{ 
                '--delay': `${index * 0.1}s`,
                '--mouse-x': `${mousePosition.x * (index % 2 === 0 ? 10 : -10)}px`,
                '--mouse-y': `${mousePosition.y * (index % 2 === 0 ? 10 : -10)}px`
              }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              aria-label={`View on Instagram: ${post.alt}`}
            >
              {/* Image Container */}
              <div className={styles.postImageWrapper}>
                <img
                  src={post.image}
                  alt={post.alt}
                  className={styles.postImage}
                  loading="lazy"
                  width="600"
                  height="600"
                />
                
                {/* Shine Effect */}
                <div className={styles.postShine} />
              </div>

              {/* Overlay */}
              <div className={styles.overlay}>
                {/* Gradient Background */}
                <div className={styles.overlayGradient} />
                
                {/* Content */}
                <div className={styles.overlayContent}>
                  {/* Category Tag */}
                  <span className={styles.postCategory}>{post.category}</span>
                  
                  {/* Stats */}
                  <div className={styles.postStats}>
                    <div className={styles.postStat}>
                      <HeartIcon />
                      <span>{post.likes}</span>
                    </div>
                    <div className={styles.postStat}>
                      <CommentIcon />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  {/* View Button */}
                  <div className={styles.postView}>
                    <InstagramIcon />
                    <span>View Post</span>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className={styles.overlayCorner} />
              </div>

              {/* Border Glow */}
              <div className={styles.postGlow} />
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`${styles.cta} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaText}>
              Want to see more transformations and skincare tips?
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.followButton}
            >
              <span className={styles.followButtonBg} />
              <span className={styles.followButtonContent}>
                <InstagramIcon />
                <span>Follow on Instagram</span>
                <svg className={styles.followButtonArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Social Links */}
          <div className={styles.socialLinks}>
            <span className={styles.socialLabel}>Also find us on:</span>
            <div className={styles.socialIcons}>
              <a 
                href="https://www.facebook.com/nurse.erikacunningham/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a 
                href="https://www.tiktok.com/@nurse.erikacunningham" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================
   ICONS
   ========================================== */

const InstagramIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export default Instagram;