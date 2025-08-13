
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignup } from '../../../context/SignupContext';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

export default function ProfilePage() {
  const router = useRouter();
  const { state, dispatch } = useSignup();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!name.trim()) {
      setError('Bitte gib einen Profilnamen ein');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Account bei Firebase erstellen
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      // 2. Bestätigungs-E-Mail senden
      await sendEmailVerification(userCredential.user);
      await signOut(auth);

      // 3. Profilnamen speichern
      dispatch({ type: 'SET_PROFILE', payload: name });

      // 4. Weiter zur Willkommensseite
      router.push('/signup/welcome');
    } catch (err: any) {
      setError(err.message || 'Error by creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <h2>Create Profil</h2>
      <p>E-Mail: {state.email}</p>
      <p>Plan: Free</p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name for the profile"
        required
      />

      {error && <p className="error">{error}</p>}

      <button 
        onClick={handleCreateAccount} 
        disabled={loading}
        className="create-account-btn"
      >
        {loading ? 'Creating Account...' : 'Account create'}
      </button>
    </div>
  );
}