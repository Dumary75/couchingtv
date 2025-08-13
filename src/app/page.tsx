'use client';

import './main.css'; 

import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignup } from '../context/SignupContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { dispatch } = useSignup();
  const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_EMAIL', payload: email });
    router.push('/signup/password');
  };

   return ( user ? 
  <div className="couching-container">
    <p className="main-content">Looking for content...</p>
  </div> :  <div className="couching-container">
              <div className="background"></div>
                <main className="main-content">
                  <h1>Search, Filter, and Save <br/>Your Favorite YouTube Videos  Personalized Just for You!</h1>
                    <p className="subtitle">Watch anywhere. Cancel anytime.</p>
                    <p className="cta-text">Ready to watch? Enter your email to create your free membership.</p>
                  <form onSubmit={handleSubmit} className="email-form">
                    <input
                      type="email"
                      value={email}
                      placeholder="Email address"
                      className="email-input"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type='submit' className="start-btn">Get Started</button>
                  </form>
                </main>
            </div>
  ) 
}