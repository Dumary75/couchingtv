
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignup } from '../../../context/SignupContext';

export default function PasswordPage() {
  const router = useRouter();
  const { state, dispatch } = useSignup();
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('The password must be at least 6 characters long.');
      return;
    }

    dispatch({ type: 'SET_PASSWORD', payload: password });
    router.push('/signup/plan');
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#2b2929ff'; 
  }, []);

  return (
    <div className="background_signup">
        <div className="signup-page">
        <h2>Create passwort</h2>
        <p>E-Mail: {state.email}</p>
        <form onSubmit={handleSubmit}>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            />
            <button type="submit">Continue</button>
        </form>
        </div>
    </div>
  );
}