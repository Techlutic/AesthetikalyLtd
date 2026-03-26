/* ============================================
   ENHANCED CTA / CONTACT SECTION - FIXED
   Multi-step form with interactive elements
   ============================================ */

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import styles from './CTA.module.css';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    treatments: [],
    preferredDay: '',
    preferredTime: '',
    message: '',
    consent: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const totalSteps = 3;

  // Treatment options
  const treatmentOptions = [
    { id: 'botox', label: 'Anti-Wrinkle', icon: '💉', popular: true },
    { id: 'filler', label: 'Dermal Fillers', icon: '✨', popular: true },
    { id: 'lips', label: 'Lip Enhancement', icon: '💋', popular: true },
    { id: 'skin', label: 'Skin Rejuvenation', icon: '🌟', popular: false },
    { id: 'peel', label: 'Chemical Peels', icon: '🧴', popular: false },
    { id: 'consultation', label: 'Just Consultation', icon: '💬', popular: false }
  ];

  // Available days
  const availableDays = [
    { id: 'mon', label: 'Mon', full: 'Monday', available: true },
    { id: 'tue', label: 'Tue', full: 'Tuesday', available: true },
    { id: 'wed', label: 'Wed', full: 'Wednesday', available: true },
    { id: 'thu', label: 'Thu', full: 'Thursday', available: true },
    { id: 'fri', label: 'Fri', full: 'Friday', available: true },
    { id: 'sat', label: 'Sat', full: 'Saturday', available: true },
    { id: 'sun', label: 'Sun', full: 'Sunday', available: false }
  ];

  // Time slots
  const timeSlots = [
    { id: 'morning', label: 'Morning', time: '9AM - 12PM', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon', time: '12PM - 4PM', icon: '☀️' },
    { id: 'evening', label: 'Evening', time: '4PM - 7PM', icon: '🌆' }
  ];

  // FAQ items
  const faqItems = [
    { 
      q: 'Is the consultation really free?', 
      a: 'Yes! Your initial consultation is completely free with no obligation.' 
    },
    { 
      q: 'How quickly will you respond?', 
      a: 'We typically respond within 2 hours during business hours.' 
    },
    { 
      q: 'Can I reschedule my appointment?', 
      a: 'Absolutely! You can reschedule up to 24 hours before your appointment.' 
    }
  ];

  // Contact methods
  const contactMethods = [
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      value: 'Quick Response',
      href: 'https://wa.me/442012345678',
      color: '#25D366',
      icon: 'whatsapp'
    },
    { 
      id: 'call', 
      label: 'Call Us', 
      value: '020 1234 5678',
      href: 'tel:+442012345678',
      color: '#4A9B8E',
      icon: 'phone'
    },
    { 
      id: 'email', 
      label: 'Email', 
      value: 'hello@dermanatura.co.uk',
      href: 'mailto:hello@dermanatura.co.uk',
      color: '#D4AF37',
      icon: 'email'
    }
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Show social proof notification
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVisible && !isSubmitted) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, isSubmitted]);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Handle blur for validation
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Please enter your name';
        else if (value.trim().length < 2) error = 'Name is too short';
        break;
      case 'email':
        if (!value.trim()) error = 'Please enter your email';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email';
        break;
      case 'phone':
        if (!value.trim()) error = 'Please enter your phone number';
        else if (!/^[\d\s\-+()]{10,}$/.test(value.replace(/\s/g, ''))) error = 'Please enter a valid phone number';
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // Handle treatment selection
  const toggleTreatment = useCallback((treatmentId) => {
    setFormState(prev => ({
      ...prev,
      treatments: prev.treatments.includes(treatmentId)
        ? prev.treatments.filter(t => t !== treatmentId)
        : [...prev.treatments, treatmentId]
    }));
  }, []);

  // Handle day selection
  const selectDay = useCallback((dayId) => {
    setFormState(prev => ({ ...prev, preferredDay: dayId }));
  }, []);

  // Handle time selection
  const selectTime = useCallback((timeId) => {
    setFormState(prev => ({ ...prev, preferredTime: timeId }));
  }, []);

  // ✅ FIX: Check if step can proceed (without setting state)
  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return formState.treatments.length > 0;
      case 2:
        return formState.preferredDay !== '' && formState.preferredTime !== '';
      case 3:
        const nameValid = formState.name.trim().length >= 2;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);
        const phoneValid = /^[\d\s\-+()]{10,}$/.test(formState.phone.replace(/\s/g, ''));
        return nameValid && emailValid && phoneValid && formState.consent;
      default:
        return false;
    }
  }, [currentStep, formState]);

  // ✅ FIX: Validate step 3 fields and set errors (only called on submit)
  const validateStep3 = useCallback(() => {
    const newErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formState.name.trim().length < 2) {
      newErrors.name = 'Name is too short';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[\d\s\-+()]{10,}$/.test(formState.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true });
    
    return Object.keys(newErrors).length === 0 && formState.consent;
  }, [formState]);

  // ✅ FIX: Handle step navigation
  const nextStep = useCallback(() => {
    if (canProceed && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [canProceed, currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate step 3 fields
    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', formState);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Reset form
  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormState({
      name: '',
      email: '',
      phone: '',
      treatments: [],
      preferredDay: '',
      preferredTime: '',
      message: '',
      consent: false
    });
    setErrors({});
    setTouched({});
  }, []);

  // Progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <section className={styles.cta} id="contact" ref={sectionRef}>
      {/* Animated Background */}
      <div className={styles.backgroundEffects} aria-hidden="true">
        <div className={styles.gradientMesh} />
        <div className={styles.floatingOrbs}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={styles.orb} style={{ '--index': i }} />
          ))}
        </div>
        <div className={styles.gridLines} />
      </div>

      {/* Social Proof Notification */}
      <div className={`${styles.notification} ${showNotification ? styles.show : ''}`}>
        <div className={styles.notificationIcon}>👋</div>
        <div className={styles.notificationContent}>
          <span className={styles.notificationTitle}>Sarah just booked</span>
          <span className={styles.notificationText}>Lip Enhancement consultation</span>
        </div>
        <span className={styles.notificationTime}>2 min ago</span>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <header className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.headerBadge}>
            <span className={styles.liveDot} />
            <span>Booking Open</span>
          </div>
          
          <h2 className={styles.title}>
            Ready to Begin Your <span className={styles.titleHighlight}>Journey</span>?
          </h2>
          
          <p className={styles.subtitle}>
            Book your free consultation and discover your path to confident, radiant skin.
          </p>

          {/* Response Promise */}
          <div className={styles.responsePromise}>
            <div className={styles.promiseIcon}>⚡</div>
            <span>Average response time: <strong>Under 2 hours</strong></span>
          </div>
        </header>

        {/* Quick Contact Methods */}
        <div className={`${styles.quickContact} ${isVisible ? styles.visible : ''}`}>
          {contactMethods.map((method, index) => (
            <a
              key={method.id}
              href={method.href}
              className={styles.contactMethod}
              style={{ 
                '--method-color': method.color,
                '--delay': `${index * 0.1}s`
              }}
              target={method.id === 'whatsapp' ? '_blank' : undefined}
              rel={method.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
            >
              <div className={styles.methodIcon}>
                <ContactMethodIcon name={method.icon} />
              </div>
              <div className={styles.methodContent}>
                <span className={styles.methodLabel}>{method.label}</span>
                <span className={styles.methodValue}>{method.value}</span>
              </div>
              <div className={styles.methodArrow}>
                <ArrowIcon />
              </div>
              <div className={styles.methodGlow} />
            </a>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className={styles.content}>
          {/* Form Card */}
          <div className={`${styles.formCard} ${isVisible ? styles.visible : ''}`} ref={formRef}>
            {isSubmitted ? (
              // Success State with Confetti
              <div className={styles.successState}>
                <div className={styles.confettiContainer}>
                  {[...Array(50)].map((_, i) => (
                    <span 
                      key={i} 
                      className={styles.confetti}
                      style={{ 
                        '--x': Math.random(),
                        '--delay': `${Math.random() * 0.5}s`,
                        '--color': ['#4A9B8E', '#D4AF37', '#E8A4B8', '#7BC4A8', '#FFD700'][Math.floor(Math.random() * 5)]
                      }}
                    />
                  ))}
                </div>
                
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" className={styles.successCircle} />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-6" className={styles.successCheck} />
                  </svg>
                </div>
                
                <h3 className={styles.successTitle}>Booking Request Sent! 🎉</h3>
                <p className={styles.successText}>
                  Thank you, <strong>{formState.name.split(' ')[0]}</strong>! We've received your consultation request 
                  for <strong>{formState.treatments.length} treatment{formState.treatments.length > 1 ? 's' : ''}</strong>.
                </p>
                
                <div className={styles.successDetails}>
                  <div className={styles.successDetail}>
                    <span className={styles.detailIcon}>📅</span>
                    <span>{availableDays.find(d => d.id === formState.preferredDay)?.full}</span>
                  </div>
                  <div className={styles.successDetail}>
                    <span className={styles.detailIcon}>🕐</span>
                    <span>{timeSlots.find(t => t.id === formState.preferredTime)?.time}</span>
                  </div>
                </div>

                <p className={styles.successNote}>
                  📱 We'll confirm your appointment via <strong>phone/email</strong> within 2 hours.
                </p>

                <button onClick={resetForm} className={styles.resetButton}>
                  Book Another Consultation
                </button>
              </div>
            ) : (
              // Multi-Step Form
              <>
                {/* Progress Header */}
                <div className={styles.formHeader}>
                  <div className={styles.stepIndicator}>
                    <span className={styles.stepText}>Step {currentStep} of {totalSteps}</span>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${progressPercentage}%` }} 
                      />
                    </div>
                  </div>
                  
                  <div className={styles.stepDots}>
                    {[1, 2, 3].map((step) => (
                      <button
                        key={step}
                        type="button"
                        className={`${styles.stepDot} ${currentStep >= step ? styles.active : ''} ${currentStep === step ? styles.current : ''}`}
                        onClick={() => step < currentStep && setCurrentStep(step)}
                        disabled={step > currentStep}
                        aria-label={`Go to step ${step}`}
                      >
                        {currentStep > step ? (
                          <CheckIcon />
                        ) : (
                          step
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  {/* Step 1: Treatment Selection */}
                  <div 
                    className={styles.formStep} 
                    style={{ display: currentStep === 1 ? 'block' : 'none' }}
                  >
                    <div className={styles.stepHeader}>
                      <span className={styles.stepEmoji}>💆‍♀️</span>
                      <h3 className={styles.stepTitle}>What are you interested in?</h3>
                      <p className={styles.stepSubtitle}>Select one or more treatments</p>
                    </div>

                    <div className={styles.treatmentGrid}>
                      {treatmentOptions.map((treatment) => (
                        <button
                          key={treatment.id}
                          type="button"
                          className={`${styles.treatmentCard} ${formState.treatments.includes(treatment.id) ? styles.selected : ''}`}
                          onClick={() => toggleTreatment(treatment.id)}
                        >
                          {treatment.popular && (
                            <span className={styles.treatmentBadge}>Popular</span>
                          )}
                          <span className={styles.treatmentIcon}>{treatment.icon}</span>
                          <span className={styles.treatmentLabel}>{treatment.label}</span>
                          <span className={styles.treatmentCheck}>
                            <CheckIcon />
                          </span>
                        </button>
                      ))}
                    </div>

                    {formState.treatments.length === 0 && (
                      <p className={styles.selectionHint}>
                        👆 Please select at least one treatment to continue
                      </p>
                    )}

                    {formState.treatments.length > 0 && (
                      <p className={styles.selectionSuccess}>
                        ✅ {formState.treatments.length} treatment{formState.treatments.length > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>

                  {/* Step 2: Preferred Time */}
                  <div 
                    className={styles.formStep} 
                    style={{ display: currentStep === 2 ? 'block' : 'none' }}
                  >
                    <div className={styles.stepHeader}>
                      <span className={styles.stepEmoji}>📅</span>
                      <h3 className={styles.stepTitle}>When works best for you?</h3>
                      <p className={styles.stepSubtitle}>Select your preferred day and time</p>
                    </div>

                    <div className={styles.scheduleSection}>
                      <div className={styles.daysSection}>
                        <label className={styles.scheduleLabel}>Preferred Day</label>
                        <div className={styles.daysGrid}>
                          {availableDays.map((day) => (
                            <button
                              key={day.id}
                              type="button"
                              className={`${styles.dayButton} ${formState.preferredDay === day.id ? styles.selected : ''} ${!day.available ? styles.unavailable : ''}`}
                              onClick={() => day.available && selectDay(day.id)}
                              disabled={!day.available}
                            >
                              <span className={styles.dayLabel}>{day.label}</span>
                              {!day.available && <span className={styles.dayUnavailable}>Closed</span>}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={styles.timesSection}>
                        <label className={styles.scheduleLabel}>Preferred Time</label>
                        <div className={styles.timeGrid}>
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              className={`${styles.timeButton} ${formState.preferredTime === slot.id ? styles.selected : ''}`}
                              onClick={() => selectTime(slot.id)}
                            >
                              <span className={styles.timeIcon}>{slot.icon}</span>
                              <span className={styles.timeLabel}>{slot.label}</span>
                              <span className={styles.timeRange}>{slot.time}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {(!formState.preferredDay || !formState.preferredTime) && (
                      <p className={styles.selectionHint}>
                        👆 Please select both a day and time to continue
                      </p>
                    )}

                    {formState.preferredDay && formState.preferredTime && (
                      <p className={styles.selectionSuccess}>
                        ✅ {availableDays.find(d => d.id === formState.preferredDay)?.full}, {timeSlots.find(t => t.id === formState.preferredTime)?.label}
                      </p>
                    )}
                  </div>

                  {/* Step 3: Contact Details */}
                  <div 
                    className={styles.formStep} 
                    style={{ display: currentStep === 3 ? 'block' : 'none' }}
                  >
                    <div className={styles.stepHeader}>
                      <span className={styles.stepEmoji}>📝</span>
                      <h3 className={styles.stepTitle}>Your contact details</h3>
                      <p className={styles.stepSubtitle}>We'll use these to confirm your booking</p>
                    </div>

                    <div className={styles.formFields}>
                      {/* Name Field */}
                      <div className={`${styles.formGroup} ${formState.name ? styles.hasValue : ''} ${errors.name && touched.name ? styles.hasError : ''}`}>
                        <div className={styles.inputWrapper}>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={styles.input}
                            disabled={isSubmitting}
                            autoComplete="name"
                            placeholder=" "
                            required
                          />
                          <label htmlFor="name" className={styles.floatingLabel}>
                            Full Name *
                          </label>
                          <div className={styles.inputIcon}>
                            <UserIcon />
                          </div>
                          <div className={styles.inputBorder} />
                        </div>
                        {errors.name && touched.name && (
                          <span className={styles.errorText}>
                            <ErrorIcon /> {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className={`${styles.formGroup} ${formState.email ? styles.hasValue : ''} ${errors.email && touched.email ? styles.hasError : ''}`}>
                        <div className={styles.inputWrapper}>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={styles.input}
                            disabled={isSubmitting}
                            autoComplete="email"
                            placeholder=" "
                            required
                          />
                          <label htmlFor="email" className={styles.floatingLabel}>
                            Email Address *
                          </label>
                          <div className={styles.inputIcon}>
                            <EmailIcon />
                          </div>
                          <div className={styles.inputBorder} />
                        </div>
                        {errors.email && touched.email && (
                          <span className={styles.errorText}>
                            <ErrorIcon /> {errors.email}
                          </span>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div className={`${styles.formGroup} ${formState.phone ? styles.hasValue : ''} ${errors.phone && touched.phone ? styles.hasError : ''}`}>
                        <div className={styles.inputWrapper}>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={styles.input}
                            disabled={isSubmitting}
                            autoComplete="tel"
                            placeholder=" "
                            required
                          />
                          <label htmlFor="phone" className={styles.floatingLabel}>
                            Phone Number *
                          </label>
                          <div className={styles.inputIcon}>
                            <PhoneIcon />
                          </div>
                          <div className={styles.inputBorder} />
                        </div>
                        {errors.phone && touched.phone && (
                          <span className={styles.errorText}>
                            <ErrorIcon /> {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* Message Field */}
                      <div className={`${styles.formGroup} ${styles.fullWidth} ${formState.message ? styles.hasValue : ''}`}>
                        <div className={styles.inputWrapper}>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            className={styles.textarea}
                            rows="3"
                            disabled={isSubmitting}
                            placeholder=" "
                          />
                          <label htmlFor="message" className={styles.floatingLabel}>
                            Any specific questions? (Optional)
                          </label>
                          <div className={styles.inputBorder} />
                        </div>
                      </div>

                      {/* Consent Checkbox */}
                      <div className={`${styles.consentGroup} ${styles.fullWidth}`}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            name="consent"
                            checked={formState.consent}
                            onChange={handleChange}
                            className={styles.checkbox}
                          />
                          <span className={styles.checkboxCustom}>
                            <CheckIcon />
                          </span>
                          <span className={styles.checkboxText}>
                            I agree to the <a href="/privacy">Privacy Policy</a> and consent to be contacted *
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className={styles.formNav}>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className={styles.backButton}
                        disabled={isSubmitting}
                      >
                        <ChevronLeftIcon />
                        <span>Back</span>
                      </button>
                    )}

                    <div className={styles.navSpacer} />

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className={styles.nextButton}
                        disabled={!canProceed}
                      >
                        <span>Continue</span>
                        <ChevronRightIcon />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting || !canProceed}
                      >
                        {isSubmitting ? (
                          <>
                            <span className={styles.spinner} />
                            <span>Booking...</span>
                          </>
                        ) : (
                          <>
                            <CalendarIcon />
                            <span>Book Consultation</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>

                {/* Form Footer */}
                <div className={styles.formFooter}>
                  <div className={styles.trustIndicators}>
                    <span className={styles.trustItem}>
                      <LockIcon />
                      <span>Secure & Encrypted</span>
                    </span>
                    <span className={styles.trustItem}>
                      <ShieldIcon />
                      <span>GDPR Compliant</span>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Info Sidebar */}
          <div className={`${styles.sidebar} ${isVisible ? styles.visible : ''}`}>
            {/* Why Choose Us */}
            <div className={styles.whyChooseCard}>
              <h3 className={styles.sidebarTitle}>
                <span className={styles.sidebarIcon}>✨</span>
                Why Book With Us
              </h3>
              
              <div className={styles.benefitsList}>
                {[
                  { icon: '🎁', text: 'Free Consultation - No obligation' },
                  { icon: '👩‍⚕️', text: '10+ Years of Experience' },
                  { icon: '💎', text: 'Premium Products Only' },
                  { icon: '🛡️', text: 'Fully Insured & NMC Registered' },
                  { icon: '💯', text: '5-Star Client Reviews' }
                ].map((benefit, i) => (
                  <div 
                    key={i} 
                    className={styles.benefitItem}
                    style={{ '--delay': `${0.4 + i * 0.1}s` }}
                  >
                    <span className={styles.benefitIcon}>{benefit.icon}</span>
                    <span className={styles.benefitText}>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Hours */}
            <div className={styles.hoursCard}>
              <h3 className={styles.sidebarTitle}>
                <span className={styles.sidebarIcon}>🕐</span>
                Opening Hours
              </h3>
              
              <div className={styles.hoursList}>
                <div className={styles.hoursRow}>
                  <span>Monday - Friday</span>
                  <span className={styles.hoursTime}>9:00 AM - 7:00 PM</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Saturday</span>
                  <span className={styles.hoursTime}>10:00 AM - 5:00 PM</span>
                </div>
                <div className={`${styles.hoursRow} ${styles.closed}`}>
                  <span>Sunday</span>
                  <span className={styles.hoursTime}>Closed</span>
                </div>
              </div>

              <div className={styles.liveStatus}>
                <span className={styles.liveIndicator} />
                <span>Currently Open</span>
              </div>
            </div>

            {/* FAQ */}
            <div className={styles.faqCard}>
              <h3 className={styles.sidebarTitle}>
                <span className={styles.sidebarIcon}>❓</span>
                Quick Questions
              </h3>
              
              <div className={styles.faqList}>
                {faqItems.map((item, i) => (
                  <div 
                    key={i} 
                    className={`${styles.faqItem} ${activeFaq === i ? styles.active : ''}`}
                  >
                    <button 
                      type="button"
                      className={styles.faqQuestion}
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    >
                      <span>{item.q}</span>
                      <ChevronDownIcon />
                    </button>
                    <div className={styles.faqAnswer}>
                      <p>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Preview */}
            <div className={styles.locationCard}>
              <div className={styles.locationMap}>
                <span className={styles.mapPin}>📍</span>
                <span className={styles.mapText}>London, UK</span>
              </div>
              <p className={styles.locationNote}>
                Clinic address provided upon booking confirmation
              </p>
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

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 10-16 0" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 6L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const ContactMethodIcon = ({ name }) => {
  const icons = {
    whatsapp: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M22 7l-10 6L2 7"/>
      </svg>
    )
  };
  return icons[name] || null;
};

export default CTA;