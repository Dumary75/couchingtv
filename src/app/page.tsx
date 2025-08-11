
import bgTest from './Example.png';

export default function Home() {
  return (
    <div className="netflix-container">
      {/* Hintergrundbild mit Dunkel-Filter */}
      <div className="background">
        <img src={bgTest.src} alt="Netflix Background" className="background-image" />
      </div>

      {/* Navigation */}
      <header className="netflix-header">
        <div className="logo">NETFLIX</div>
        <button className="signin-btn">Sign In</button>
      </header>

      {/* Hauptinhalt */}
      <main className="main-content">
        <h1>Unlimited movies, TV shows, and more</h1>
        <p className="subtitle">Watch anywhere. Cancel anytime.</p>

        <p className="cta-text">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <div className="email-form">
          <input type="email" placeholder="Email address" className="email-input" />
          <button className="start-btn">Get Started</button>
        </div>
      </main>

      {/* Footer */}
      <footer className="netflix-footer">
        <p>Questions? Call <a href="tel:1800000000">1-800-NETFLIX</a></p>

        <div className="footer-links">
          <div className="footer-column">
            <a href="#">FAQ</a>
            <a href="#">Investor Relations</a>
            <a href="#">Privacy</a>
            <a href="#">Speed Test</a>
          </div>
          <div className="footer-column">
            <a href="#">Help Center</a>
            <a href="#">Jobs</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Legal Notices</a>
          </div>
          <div className="footer-column">
            <a href="#">Account</a>
            <a href="#">Ways to Watch</a>
            <a href="#">Corporate Information</a>
            <a href="#">Only on Netflix</a>
          </div>
          <div className="footer-column">
            <a href="#">Media Center</a>
            <a href="#">Terms of Use</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        <p className="footer-bottom">Netflix Germany</p>
      </footer>
    </div>
  );
}