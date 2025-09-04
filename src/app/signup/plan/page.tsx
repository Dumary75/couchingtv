
'use client';

import { useRouter } from 'next/navigation';
import { useSignup } from '../../../context/SignupContext';

export default function PlanPage() {
  const router = useRouter();
  const { dispatch } = useSignup();

  const handleSelectPlan = () => {
    dispatch({ type: 'SET_PLAN', payload: 'free' });
    router.push('/signup/profile');
  };

  return (
    <div className="plan-page">
      <h2>Choose your plan</h2>
      <div className="plan-card">
        <h3>Free membership!</h3>
        <button type='button' onClick={handleSelectPlan}>Select</button>
      </div>
    </div>
  );
}