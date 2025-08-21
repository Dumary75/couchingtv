
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignup } from '../../context/SignupContext';
import FAQSection from '@/components/mainPage/FAQSection';



export default function UserloggedOUT(){
const router = useRouter();
const { dispatch } = useSignup();
const [email, setEmail] = useState('');


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  };

      if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    dispatch({ type: 'SET_EMAIL', payload: email });
    router.push('/signup/password');
  };

    return (

        <>
          <div className="background"></div>
          <main className="main-content">
            <h1>
              Search, Filter, and Save <br /> Your Favorite YouTube Videos Personalized Just for You!
            </h1>
            <p className="subtitle">Watch anywhere. Cancel anytime.</p>
            <p className="cta-text">
              Ready to watch? Enter your email to create your free membership.
            </p>
            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                value={email}
                placeholder="Email address"
                className="email-input"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="start-btn">Get Started</button>
            </form>
            <FAQSection />
          </main>
        </>
    );
}