/* ============================================
   ENHANCED TESTIMONIALS SECTION
   Interactive carousel with rich features
   ============================================ */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const progressRef = useRef(null);

  const AUTO_PLAY_DURATION = 6000;

  // Treatment filter options
  const filterOptions = [
    { id: 'all', label: 'All Reviews', icon: '✨' },
    { id: 'botox', label: 'Anti-Wrinkle', icon: '💉' },
    { id: 'filler', label: 'Fillers', icon: '✨' },
    { id: 'lips', label: 'Lips', icon: '💋' },
    { id: 'skin', label: 'Skin Care', icon: '🌟' }
  ];

  // Enhanced testimonials data
  const testimonials = [
    {
      id: 1,
      text: "Nurse Erica is absolutely amazing! Her attention to detail and gentle approach made me feel completely at ease. The results are natural and exactly what I wanted. I've recommended her to all my friends!",
      author: "Sarah Mitchell",
      location: "London",
      rating: 5,
      treatment: "Anti-Wrinkle Treatment",
      category: 'botox',
      date: "2 weeks ago",
      verified: true,
      helpful: 24,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      hasVideo: false,
      beforeAfter: true,
      featured: true
    },
    {
      id: 2,
      text: "I've been seeing Erica for over two years now. She's professional, knowledgeable, and truly cares about achieving the best results. The clinic is immaculate and I always feel safe.",
      author: "Jennifer Clarke",
      location: "Manchester",
      rating: 5,
      treatment: "Dermal Fillers",
      category: 'filler',
      date: "1 month ago",
      verified: true,
      helpful: 18,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      hasVideo: true,
      videoThumb: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop",
      beforeAfter: true,
      featured: false
    },
    {
      id: 3,
      text: "After trying several practitioners, I finally found Erica. Her expertise and honest approach are refreshing. She only recommends what you actually need - no upselling!",
      author: "Emma Thompson",
      location: "Birmingham",
      rating: 5,
      treatment: "Lip Enhancement",
      category: 'lips',
      date: "3 weeks ago",
      verified: true,
      helpful: 31,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      hasVideo: false,
      beforeAfter: true,
      featured: true
    },
    {
      id: 4,
      text: "The consultation was thorough and informative. Erica explained everything clearly and made sure I understood the process. Couldn't be happier with my results - so natural!",
      author: "Rachel Green",
      location: "Leeds",
      rating: 5,
      treatment: "Skin Consultation",
      category: 'skin',
      date: "1 week ago",
      verified: true,
      helpful: 15,
      image: null,
      hasVideo: false,
      beforeAfter: false,
      featured: false
    },
    {
      id: 5,
      text: "Professional, skilled, and genuinely caring. Erica has transformed my skin confidence. The whole experience feels premium from booking to aftercare.",
      author: "Charlotte Davis",
      location: "Bristol",
      rating: 5,
      treatment: "Chemical Peel",
      category: 'skin',
      date: "2 months ago",
      verified: true,
      helpful: 12,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
      hasVideo: false,
      beforeAfter: true,
      featured: false
    },
    {
      id: 6,
      text: "I was so nervous for my first treatment but Erica made me feel completely comfortable. She took her time, explained everything, and the results exceeded my expectations!",
      author: "Sophie Williams",
      location: "Oxford",
      rating: 5,
      treatment: "Anti-Wrinkle Treatment",
      category: 'botox',
      date: "5 days ago",
      verified: true,
      helpful: 28,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      hasVideo: true,
      videoThumb: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=400&h=300&fit=crop",
      beforeAfter: false,
      featured: false
    }
  ];

  // Mini reviews for marquee
  const miniReviews = [
    { text: "Absolutely love my results!", author: "Lisa M.", rating: 5 },
    { text: "Best decision I ever made", author: "Kate R.", rating: 5 },
    { text: "So professional and caring", author: "Amy J.", rating: 5 },
    { text: "Natural looking results", author: "Helen P.", rating: 5 },
    { text: "Highly recommend!", author: "Claire S.", rating: 5 },
    { text: "Life changing experience", author: "Diana L.", rating: 5 },
    { text: "Worth every penny", author: "Fiona B.", rating: 5 },
    { text: "Exceptional service", author: "Grace T.", rating: 5 }
  ];

  // Rating breakdown
  const ratingBreakdown = {
    average: 4.9,
    total: 127,
    distribution: [
      { stars: 5, count: 118, percentage: 93 },
      { stars: 4, count: 7, percentage: 5 },
      { stars: 3, count: 2, percentage: 2 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 }
    ]
  };

  // Statistics
  const stats = [
    { value: 127, suffix: '+', label: 'Reviews' },
    { value: 4.9, suffix: '', label: 'Rating', decimals: 1 },
    { value: 100, suffix: '%', label: 'Recommend' }
  ];

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    if (activeFilter === 'all') return testimonials;
    return testimonials.filter(t => t.category === activeFilter);
  }, [activeFilter, testimonials]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Navigation handlers
  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? filteredTestimonials.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, filteredTestimonials.length, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === filteredTestimonials.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, filteredTestimonials.length, goToSlide]);

  // Auto-play with progress
  useEffect(() => {
    autoPlayRef.current = goToNext;
  });

  useEffect(() => {
    if (isPaused || playingVideo) return;

    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / AUTO_PLAY_DURATION) * 100;
      
      if (newProgress >= 100) {
        autoPlayRef.current();
      } else {
        setProgress(newProgress);
        progressRef.current = requestAnimationFrame(updateProgress);
      }
    };

    progressRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
    };
  }, [currentIndex, isPaused, playingVideo]);

  // Drag/Swipe handlers
  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    setIsPaused(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  }, []);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStart);
  }, [isDragging, dragStart]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    const threshold = 80;
    
    if (dragOffset > threshold) {
      goToPrevious();
    } else if (dragOffset < -threshold) {
      goToNext();
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setTimeout(() => setIsPaused(false), 1000);
  }, [isDragging, dragOffset, goToPrevious, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  const currentTestimonial = filteredTestimonials[currentIndex];

  // Handle video play
  const handlePlayVideo = useCallback((id) => {
    setPlayingVideo(id);
    setIsPaused(true);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setPlayingVideo(null);
    setIsPaused(false);
  }, []);

  return (
    <section 
      className={styles.testimonials} 
      id="testimonials" 
      ref={sectionRef}
      aria-label="Client testimonials"
    >
      {/* Animated Background */}
      <div className={styles.backgroundEffects} aria-hidden="true">
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.patternOverlay} />
      </div>

      {/* Floating Quote Marks */}
      <div className={styles.floatingQuotes} aria-hidden="true">
        <span className={styles.floatingQuote} style={{ '--delay': '0s' }}>"</span>
        <span className={styles.floatingQuote} style={{ '--delay': '2s' }}>"</span>
        <span className={styles.floatingQuote} style={{ '--delay': '4s' }}>"</span>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <header className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeIcon}>⭐</span>
            <span className={styles.badgeText}>Trusted by 100+ Happy Clients</span>
          </div>
          
          <h2 className={styles.title}>
            Real Stories, <span className={styles.titleHighlight}>Real Results</span>
          </h2>
          
          <p className={styles.subtitle}>
            Hear from our amazing clients about their transformation journey
          </p>
        </header>

        {/* Stats Bar */}
        <div className={`${styles.statsBar} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.googleRating}>
            <div className={styles.googleIcon}>
              <GoogleIcon />
            </div>
            <div className={styles.googleContent}>
              <div className={styles.googleStars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={styles.googleStar}>★</span>
                ))}
              </div>
              <span className={styles.googleText}>
                <strong>{ratingBreakdown.average}</strong> ({ratingBreakdown.total} reviews)
              </span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.statValue}>
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    start={countersStarted}
                    delay={index * 150}
                  />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`${styles.filterTabs} ${isVisible ? styles.visible : ''}`}>
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.filterTab} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className={styles.filterIcon}>{filter.icon}</span>
              <span className={styles.filterLabel}>{filter.label}</span>
              {activeFilter === filter.id && <span className={styles.filterActiveBg} />}
            </button>
          ))}
        </div>

        {/* Main Carousel */}
        <div 
          className={`${styles.carouselWrapper} ${isVisible ? styles.visible : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => !playingVideo && setIsPaused(false)}
        >
          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className={styles.carousel}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {filteredTestimonials.map((testimonial, index) => {
              const offset = index - currentIndex;
              const isActive = index === currentIndex;
              
              return (
                <article
                  key={testimonial.id}
                  className={`${styles.card} ${isActive ? styles.active : ''} ${testimonial.featured ? styles.featured : ''}`}
                  style={{
                    '--offset': offset,
                    '--drag-offset': isDragging ? `${dragOffset}px` : '0px',
                    transform: `
                      translateX(calc(${offset * 100}% + ${isDragging ? dragOffset : 0}px))
                      scale(${isActive ? 1 : 0.85})
                      rotateY(${offset * -5}deg)
                    `,
                    opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.3,
                    zIndex: isActive ? 10 : 5 - Math.abs(offset),
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                  aria-hidden={!isActive}
                >
                  {/* Featured Badge */}
                  {testimonial.featured && (
                    <div className={styles.featuredBadge}>
                      <StarIcon /> Featured Review
                    </div>
                  )}

                  {/* Card Inner */}
                  <div className={styles.cardInner}>
                    {/* Card Header */}
                    <div className={styles.cardHeader}>
                      {/* Avatar */}
                      <div className={styles.avatarWrapper}>
                        {testimonial.image ? (
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className={styles.avatar}
                            loading="lazy"
                          />
                        ) : (
                          <div className={styles.avatarFallback}>
                            {testimonial.author.charAt(0)}
                          </div>
                        )}
                        {testimonial.verified && (
                          <div className={styles.verifiedBadge} title="Verified Client">
                            <VerifiedIcon />
                          </div>
                        )}
                      </div>

                      {/* Author Info */}
                      <div className={styles.authorInfo}>
                        <cite className={styles.authorName}>{testimonial.author}</cite>
                        <span className={styles.authorLocation}>
                          <LocationIcon />
                          {testimonial.location}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className={styles.ratingBadge}>
                        <span className={styles.ratingNumber}>{testimonial.rating}.0</span>
                        <div className={styles.ratingStars}>
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`${styles.ratingStar} ${i < testimonial.rating ? styles.filled : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Treatment Tag */}
                    <div className={styles.treatmentTag}>
                      <TreatmentIcon category={testimonial.category} />
                      <span>{testimonial.treatment}</span>
                    </div>

                    {/* Quote */}
                    <div className={styles.quoteWrapper}>
                      <span className={styles.quoteIcon}>"</span>
                      <blockquote className={styles.quote}>
                        <p>{testimonial.text}</p>
                      </blockquote>
                    </div>

                    {/* Card Footer */}
                    <div className={styles.cardFooter}>
                      <span className={styles.reviewDate}>
                        <ClockIcon />
                        {testimonial.date}
                      </span>

                      <div className={styles.cardActions}>
                        {testimonial.hasVideo && (
                          <button 
                            className={styles.actionButton}
                            onClick={() => handlePlayVideo(testimonial.id)}
                            aria-label="Watch video review"
                          >
                            <PlayIcon />
                            <span>Watch</span>
                          </button>
                        )}
                        
                        {testimonial.beforeAfter && (
                          <button 
                            className={styles.actionButton}
                            aria-label="View before and after"
                          >
                            <CompareIcon />
                            <span>Results</span>
                          </button>
                        )}

                        <button 
                          className={styles.helpfulButton}
                          aria-label={`${testimonial.helpful} people found this helpful`}
                        >
                          <ThumbUpIcon />
                          <span>{testimonial.helpful}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Navigation */}
          <div className={styles.navigation}>
            <button
              onClick={goToPrevious}
              className={styles.navButton}
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <ChevronLeftIcon />
            </button>

            <div className={styles.pagination}>
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${styles.paginationDot} ${index === currentIndex ? styles.active : ''}`}
                  aria-label={`Go to review ${index + 1}`}
                  disabled={isAnimating}
                >
                  <span className={styles.dotInner} />
                </button>
              ))}
            </div>

            <button
              onClick={goToNext}
              className={styles.navButton}
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Slide Counter */}
          <div className={styles.slideCounter}>
            <span className={styles.currentSlide}>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className={styles.counterDivider}>/</span>
            <span className={styles.totalSlides}>{String(filteredTestimonials.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className={`${styles.ratingBreakdown} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.breakdownHeader}>
            <h3 className={styles.breakdownTitle}>Rating Breakdown</h3>
            <div className={styles.overallRating}>
              <span className={styles.overallNumber}>{ratingBreakdown.average}</span>
              <div className={styles.overallStars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={styles.overallStar}>★</span>
                ))}
              </div>
              <span className={styles.overallText}>{ratingBreakdown.total} reviews</span>
            </div>
          </div>

          <div className={styles.breakdownBars}>
            {ratingBreakdown.distribution.map((item) => (
              <div key={item.stars} className={styles.breakdownRow}>
                <span className={styles.breakdownStars}>{item.stars} ★</span>
                <div className={styles.breakdownBarTrack}>
                  <div 
                    className={styles.breakdownBarFill}
                    style={{ 
                      '--percentage': `${item.percentage}%`,
                      '--delay': `${(5 - item.stars) * 0.1}s`
                    }}
                  />
                </div>
                <span className={styles.breakdownCount}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Reviews Marquee */}
        <div className={`${styles.marqueeWrapper} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.marquee}>
            <div className={styles.marqueeContent}>
              {[...miniReviews, ...miniReviews].map((review, index) => (
                <div key={index} className={styles.miniReview}>
                  <div className={styles.miniStars}>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className={styles.miniText}>"{review.text}"</p>
                  <span className={styles.miniAuthor}>— {review.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Write Review CTA */}
        <div className={`${styles.writeReviewCta} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.ctaContent}>
            <span className={styles.ctaIcon}>💬</span>
            <div className={styles.ctaText}>
              <h4>Had a treatment with us?</h4>
              <p>We'd love to hear about your experience!</p>
            </div>
          </div>
          <a 
            href="https://g.page/r/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <PenIcon />
            <span>Write a Review</span>
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div className={styles.videoModal} onClick={handleCloseVideo}>
          <div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.videoCloseBtn} onClick={handleCloseVideo}>
              <CloseIcon />
            </button>
            <div className={styles.videoPlaceholder}>
              <PlayIcon />
              <span>Video testimonial would play here</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* ==========================================
   ANIMATED COUNTER COMPONENT
   ========================================== */

const AnimatedCounter = ({ value, suffix = '', decimals = 0, start, delay = 0 }) => {
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
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = easeOut * value;
        
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

  return <>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</>;
};

/* ==========================================
   ICONS
   ========================================== */

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const CompareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="12" y1="3" x2="12" y2="21"/>
  </svg>
);

const ThumbUpIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
  </svg>
);

const PenIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);

const TreatmentIcon = ({ category }) => {
  const icons = {
    botox: '💉',
    filler: '✨',
    lips: '💋',
    skin: '🌟'
  };
  return <span>{icons[category] || '✨'}</span>;
};

export default Testimonials;