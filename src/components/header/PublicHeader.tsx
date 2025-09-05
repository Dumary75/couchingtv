
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function PublicHeader() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePasswordReset = async (email: string) => {
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset email sent!!');
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Error: ' + (error as any).message);
  }
};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('The password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Error while signing in.');
    } finally {
      setIsLoading(false);
    }
  };

return (
    <header className="couching-header">
      <div className="logo"><Link className='logoName' href='/'>COUCHING TV</Link></div>

        <form onSubmit={handleLogin} className={`login-form ${showLogin ? 'visible' : ''}`}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? 'login...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button className='forgot-password-btn' onClick={() => handlePasswordReset(email)}>
            Forgot Password?
          </button>
        </form>

        <button
          onClick={() => setShowLogin(true)}
          className={showLogin? 'invisible-btn' : 'signin-btn'}
        >
          Sign In
        </button>
    </header>
  );
}