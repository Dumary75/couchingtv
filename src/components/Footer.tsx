

export default function Footer() {
  return (
    <footer className="couching-footer">
      <p>
        Questions? Call <a href="tel:1800000000" className="footer-phone-link">1-800-COUCHING</a>
      </p>

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
          <a href="#">Only on CouchingTV</a>
        </div>
        <div className="footer-column">
          <a href="#">Media Center</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
        </div>
      </div>

      <p className="footer-bottom">CouchingTV Germany</p>
    </footer>
  );
}