
'use client';

import { useSignup } from '../../../context/SignupContext';

export default function WelcomePage() {
  const { state } = useSignup();

  return (
    <div className="welcome-page">
      <h1>Welcome by CouchingTV, {state.profileName}!</h1>
      <p>We have send an email to your email-adress: <strong>{state.email}</strong> </p>
      <p>Please confirm your email-adress, to start!</p>
    </div>
  );
}