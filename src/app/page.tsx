'use client';

import './main.css'; 

import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();

   return ( user ? 
 <div className="couching-container"><p className="main-content">Looking for content...</p></div> :  <div className="couching-container">
      <div className="background"></div>
      <main className="main-content">
        <h1>Search, Filter, and Save <br/>Your Favorite YouTube Videos  Personalized Just for You!</h1>
        <p className="subtitle">Watch anywhere. Cancel anytime.</p>
        <p className="cta-text">
          Ready to watch? Enter your email to create your free membership.
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
  ) 
}