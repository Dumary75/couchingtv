
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
      setError('Please enter a profilename');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Create account by firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      // 2. send confirmation email
      await sendEmailVerification(userCredential.user);
      await signOut(auth);

      // 3. save Profilename
      dispatch({ type: 'SET_PROFILE', payload: name });

      // 4. Continue to the welcome page
      router.push('/signup/welcome');
    } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error by creating account');
        }
    };
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
        type='button'
      >
        {loading ? 'Creating Account...' : 'Account create'}
      </button>
    </div>
  );
}