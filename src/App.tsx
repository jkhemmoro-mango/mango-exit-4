// src/App.tsx
import React, { useState } from 'react';
import './index.css'; // Ensure global styles are loaded
// Import the images from the assets folder
import heroBgImage from './assets/image_0.png';
import exit4Sign from './assets/Group 1721.png';
import headerImage from './assets/unnamed.png';

function App() {
  // TypeScript State for form submission
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const smoothScrollTo = (targetY: number, duration: number = 1000) => {
    const startY = window.scrollY || window.pageYOffset;
    const distanceY = targetY - startY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutQuad = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startY + distanceY * easeInOutQuad);

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleHeroCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const claimSection = document.getElementById('claim');
    if (claimSection) {
      const rect = claimSection.getBoundingClientRect();
      const targetY = rect.top + (window.scrollY || window.pageYOffset);
      smoothScrollTo(targetY, 900);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Stop browser reload
    setIsSubmitted(true);
    
    // Smooth scroll to the thank you message after state update
    setTimeout(() => {
      const thankYouElement = document.getElementById('thankyou-step');
      if (thankYouElement) {
        thankYouElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="app-container">
      
      {/* --- TOP HEADER IMAGE --- */}
      <header className="top-header">
        <img src={headerImage} alt="Mango Cannabis" className="top-header-image" />
      </header>

      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        {/* Blurred Background Image Container */}
        <div 
          className="hero-background-image"
          style={{ backgroundImage: `url(${heroBgImage})` }}
        ></div>
        {/* Dark Overlay */}
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">Premium Cannabis. Zero Tourist Traps.</h1>
          <h2 className="hero-subhead">
            Shop a licensed, lab-tested dispensary trusted by locals
            just 3 minutes further, and <span style={{ fontWeight: 800 }}>SAVE MORE @ Exit 4</span> in New Buffalo.
          </h2>
          <a href="#claim" className="btn" onClick={handleHeroCtaClick}>Get My 50% Off Pass</a>
          <a
            href="https://mangocannabis.com/michigan-dispensaries/lansing/new-buffalo-menu-page/"
            className="btn"
            style={{ marginLeft: '12px' }}
            target="_blank"
            rel="noreferrer"
          >
            Shop Our Menu
          </a>
          <p style={{ marginTop: '14px', fontSize: '0.9rem', opacity: 0.9 }}>
            State-licensed · Lab-tested products · Friendly, knowledgeable budtenders
          </p>
        </div>
      </header>

      {/* --- EXIT 1 TRAP / EXIT 4A SECTION --- */}
      <section className="comparison-section">
        <h2 className="comparison-title">
          Skip the <span className="exit1-highlight">Exit 1</span> Trap!
        </h2>
        <div className="comparison-grid">
          <div className="exit-sign-wrapper">
            <img
              src={exit4Sign}
              alt="Exit 4A - Save more on Exit 4"
              className="exit-sign-image"
            />
          </div>
          <div className="comparison-copy">
            <p>
              At Mango Cannabis, we believe your cannabis shopping experience should be enjoyable,
              not a hassle. Unlike the crowded dispensaries at Exit 1, we offer a relaxed atmosphere,
              zero wait times, and personalized service.
            </p>
            <p>
              Discover the Mango difference and elevate your cannabis journey with us.
            </p>
          </div>
        </div>
      </section>

      {/* --- OFFER SECTION (React State Handled) --- */}
      <section className="offer-section" id="claim">
        <div className="offer-container">
          
          {/* CONDITIONAL RENDERING: Show Form IF NOT submitted yet */}
          {!isSubmitted && (
            <div id="optin-step">
              <h2 className="offer-title">UNLOCK YOUR 50% OFF FIRST-VISIT PASS.</h2>
              <div className="funnel-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input type="text" id="name" className="form-input" placeholder="Enter your first name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" className="form-input" placeholder="Enter your email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Mobile Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-input"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Get My 50% Off Pass</button>
                </form>
                <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#666' }}>
                  We respect your privacy. By submitting, you agree we may contact you about
                  Mango offers. Your info is never sold.
                </p>
              </div>
            </div>
          )}

          {/* CONDITIONAL RENDERING: Show Thank You IF submitted */}
          {isSubmitted && (
            <div id="thankyou-step" className="thank-you-message fade-in">
              <h2 style={{ color: 'black', marginBottom: '10px' }}>YOU'RE ALL SET!</h2>
              <p>Show your confirmation email to your budtender at checkout to redeem your 50% OFF.</p>
              
              <span className="coupon-code">THANK U</span>
              
              {/* Replace href with actual Google Maps Navigation Link */}
              <a
                href="https://maps.app.goo.gl/THu3tbyj86aNvnma9"
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{ width: '100%', marginTop: '20px' }}
              >
                DRIVE THERE NOW
              </a>
            </div>
          )}

        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="map-section">
        <h2>EASY ON. EASY OFF.</h2>
        <div className="map-layout">
          <div className="map-container">
            <iframe 
              title="Mango Cannabis New Buffalo Location"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade"
              // This URL searches specifically for your address
              src="https://maps.google.com/maps?q=10227+US+Highway+12+New+Buffalo+MI+49117&t=&z=14&ie=UTF8&iwloc=&output=embed"
            >
            </iframe>
          </div>

          <div className="map-info">
            <div className="info-card">
              <h3 className="info-label">Address</h3>
              <p className="info-text">10227 US Highway 12<br />New Buffalo, MI 49117</p>
            </div>
            <div className="info-card">
              <h3 className="info-label">Phone</h3>
              <p className="info-text">(269) 264-4444</p>
            </div>
            <div className="info-card">
              <h3 className="info-title">Hours</h3>
              <p className="info-text">Monday: 9AM – 9PM</p>
              <p className="info-text">Tuesday: 9AM – 9PM</p>
              <p className="info-text">Wednesday: 9AM – 9PM</p>
              <p className="info-text">Thursday: 9AM – 9PM</p>
              <p className="info-text">Friday: 9AM – 9PM</p>
              <p className="info-text">Saturday: 9AM – 9PM</p>
              <p className="info-text">Sunday: 9AM – 9PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer">
        <p className="footer-text">For use by individuals 21+. Keep out of reach of children. New customers only. <br /> © Mango Cannabis.</p>
      </footer>

    </div>
  );
}

export default App;

/**
 * COMPONENT-SPECIFIC CSS
 * In a larger app, you might use CSS Modules or Styled Components.
 * For simplicity in this conversion, we append styles here.
 */

/* HERO STYLES WITH BLUR */
const styles = `
  .top-header {
      width: 100%;
      padding: 10px 0;
      display: flex;
      justify-content: center;
      background-color: #ffffff;
  }
  .top-header-image {
      max-width: 220px;
      height: auto;
  }

  .hero-section {
      position: relative;
      height: 80vh;
      min-height: 600px;
      /* Flex centering */
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--white);
      overflow: hidden; /* Ensures blurred edges don't spill out */
  }

  /* The separate container for the image to apply blur */
  .hero-background-image {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-size: cover;
      background-position: center;
      z-index: -2; /* Send to back */
      filter: blur(1px); /* Adjust blur intensity here */
      transform: scale(1.1); /* Scale up slightly so blurred edges get cropped off */
  }

  .hero-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      /* Slightly darker overlay for better contrast against blurred busy image */
      background-color: rgba(0, 0, 0, 0.6); 
      z-index: -1;
  }

  .hero-content {
      position: relative;
      z-index: 1; /* Ensure text is on top */
      max-width: 800px;
      padding: 20px;
  }
  .hero-title { font-size: 3rem; line-height: 1.2; margin-bottom: 20px; text-transform: uppercase; }
  .hero-subhead { font-size: 1.5rem; margin-top: 16px; margin-bottom: 30px; line-height: 1.4; }

  /* COMPARISON STYLES - SKIP THE EXIT 1 TRAP */
  .comparison-section {
      padding: 50px 20px;
      max-width: 1100px;
      margin: 0 auto;
      text-align: center;
      background-color: #ffffff;
  }
  .comparison-title {
      font-size: 2.4rem;
      margin-bottom: 30px;
      color: var(--secondary-black);
  }
  .exit1-highlight {
      color: var(--primary-mango);
      position: relative;
      font-weight: 800;
  }
  .comparison-grid {
      display: grid;
      grid-template-columns: 1.3fr 1.7fr;
      gap: 40px;
      align-items: center;
  }
  .exit-sign-wrapper {
      display: flex;
      justify-content: center;
  }
  .exit-sign-image {
      max-width: 100%;
      height: auto;
      box-shadow: none;
      border-radius: 0;
  }
  .comparison-copy {
      text-align: center;
      font-size: 1rem;
      line-height: 1.6;
      color: var(--secondary-black);
  }
  .comparison-copy p + p {
      margin-top: 12px;
  }

  /* MAP STYLES */
  .map-section { padding: 60px 20px; background-color: var(--white); text-align: center; }
  .map-section h2 { margin-bottom: 30px; font-size: 2.5rem; color: var(--secondary-black); }
  .map-layout {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 30px;
      align-items: stretch;
  }
  .map-container { height: 460px; width: 100%; border-radius: 8px; overflow: hidden; }
  .map-info { display: flex; flex-direction: column; gap: 16px; text-align: left; }
  .info-card {
      background: #ffe1cc;
      border-radius: 16px;
      padding: 18px 20px;
      color: var(--secondary-black);
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }
  .info-title { font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
  .info-label { font-size: 0.85rem; text-transform: uppercase; opacity: 0.8; margin-bottom: 4px; }
  .info-text { font-size: 0.95rem; line-height: 1.5; }

  /* OFFER STYLES */
  .offer-section { background-color: var(--primary-mango); padding: 80px 20px; text-align: center; color: var(--white); min-height: 600px; } /* Added min-height for smoother transition */
  .offer-container { max-width: 600px; margin: 0 auto; }
  .offer-title { font-size: 2.2rem; margin-bottom: 30px; color: var(--white); }
  .funnel-form { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); color: var(--text-soft-black); text-align: center; }
  .form-group { margin-bottom: 20px; text-align: left; }
  .form-group label { display: block; font-weight: 600; margin-bottom: 8px; }
  .form-input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; }
  .submit-btn { width: 100%; background-color: #74AE3F; color: white; padding: 15px; font-size: 1.2rem; border: none; border-radius: 4px; cursor: pointer; font-weight: 700; text-transform: uppercase; font-family: 'Poppins', sans-serif; transition: background 0.3s; }
  .submit-btn:hover { background-color: #8bc857; }

  /* THANK YOU STYLES */
  .thank-you-message { background: white; color: var(--text-soft-black); padding: 40px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
  .coupon-code { font-size: 3rem; color: var(--primary-mango); font-weight: 800; letter-spacing: 2px; margin: 20px 0; display: block; border: 2px dashed var(--primary-mango); padding: 10px; }
  
  /* Simple fade in animation for React transition */
  .fade-in { animation: fadeIn 0.5s ease-in; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  /* FOOTER STYLES */
  .footer { background-color: var(--primary-mango); padding: 40px 20px; text-align: center; }
  .footer-text { color: #ffffff; font-size: 0.85rem; max-width: 600px; margin: 0 auto; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
      .hero-title { font-size: 2rem; }
      .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      .hero-content .btn {
          display: inline-block;
          width: auto;
          max-width: none;
          margin: 10px 0 0;
      }
      .hero-content .btn + .btn {
          margin-left: 0;
      }
      .comparison-grid { grid-template-columns: 1fr; }
      .card-us { transform: none; margin-top: 20px; }
      .map-layout { grid-template-columns: 1fr; }
      .map-container { height: 340px; }
  }
`;

// Inject styles into head (A simple way to handle CSS-in-JS for this demo without extra libraries)
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);