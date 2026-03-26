/* ============================================
   DERMA NATURA - Main Application Component
   Premium Aesthetic Nursing Landing Page
   
   Features:
   - Premium responsive navigation
   - Code splitting with React.lazy
   - Suspense boundaries for loading states
   - Error boundary (production ready)
   - Accessibility features
   - Performance optimized
   ============================================ */

import React, { Suspense, lazy, useEffect } from 'react';

// Critical components (loaded immediately - above the fold)
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import TrustBar from './components/TrustBar/TrustBar';

// Loading fallback component
import Loading from './components/Loading/Loading';

// Lazy-loaded components (below the fold)
const Services = lazy(() => import('./components/Services/Services'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const About = lazy(() => import('./components/About/About'));
const Instagram = lazy(() => import('./components/Instagram/Instagram'));
const CTA = lazy(() => import('./components/CTA/CTA'));
const Footer = lazy(() => import('./components/Footer/Footer'));

/* ==========================================
   ERROR BOUNDARY COMPONENT
   ========================================== */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to service (e.g., Sentry, LogRocket)
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <h2>Something went wrong</h2>
            <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
            <button onClick={this.handleRetry} className="error-retry-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* ==========================================
   SECTION WRAPPER WITH SUSPENSE
   ========================================== */

const SuspenseSection = ({ children, fallbackHeight = '50vh', id }) => (
  <Suspense fallback={<Loading height={fallbackHeight} />}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Suspense>
);

/* ==========================================
   SCROLL RESTORATION HOOK
   ========================================== */

const useScrollRestoration = () => {
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);
};

/* ==========================================
   MAIN APP COMPONENT
   ========================================== */

function App() {
  // Handle scroll restoration for hash links
  useScrollRestoration();

  // Handle smooth scroll behavior
  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="App">
      {/* Skip Link for Accessibility - Keyboard Navigation */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation - Fixed Position, Always Visible */}
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      {/* Main Content Area */}
      <main id="main" role="main">
        {/* CRITICAL - Above the Fold (No Lazy Loading) */}
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        <ErrorBoundary>
          <TrustBar />
        </ErrorBoundary>

        {/* LAZY LOADED - Below the Fold */}
        <SuspenseSection fallbackHeight="60vh">
          <Services />
        </SuspenseSection>

        <SuspenseSection fallbackHeight="50vh">
          <Testimonials />
        </SuspenseSection>

        <SuspenseSection fallbackHeight="60vh">
          <About />
        </SuspenseSection>

        <SuspenseSection fallbackHeight="40vh">
          <Instagram />
        </SuspenseSection>

        <SuspenseSection fallbackHeight="60vh">
          <CTA />
        </SuspenseSection>
      </main>

      {/* Footer - Lazy Loaded */}
      <SuspenseSection fallbackHeight="300px">
        <Footer />
      </SuspenseSection>

      {/* Back to Top Button (Optional Enhancement) */}
      <BackToTop />
    </div>
  );
}

/* ==========================================
   BACK TO TOP BUTTON COMPONENT
   ========================================== */

const BackToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default App;