
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
    dispatch({ type: 'SET_PASSWORD', payload: password });
    router.push('/signup/plan');
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#442e2eff'; 
  }, []);

  return (
    <div className="background_signup">
        <div className="signup-page">
        <h2>Passwort erstellen</h2>
        <p>E-Mail: {state.email}</p>
        <form onSubmit={handleSubmit}>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben"
            required
            />
            <button type="submit">Weiter</button>
        </form>
        </div>
    </div>

  );
}