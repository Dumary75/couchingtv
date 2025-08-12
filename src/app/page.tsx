
import './main.css'; 

export default function Home() {
  return (
    <div className="couching-container">
      <div className="background"></div>
      <main className="main-content">
        <h1>Unlimited movies, TV shows, and more</h1>
        <p className="subtitle">Watch anywhere. Cancel anytime.</p>
        <p className="cta-text">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="email-form">
          <input
            type="email"
            placeholder="Email address"
            className="email-input"
          />
          <button className="start-btn">Get Started</button>
        </div>
      </main>
    </div>
  );
}