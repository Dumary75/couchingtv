'use client';

import './main.css'; 

import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignup } from '../context/SignupContext';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  const [categories, setCategories] = useState<Array<{ category: string; videos: any[] }>>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const { dispatch } = useSignup();
  const [email, setEmail] = useState('');

  const categoryQueries = [
    { name: 'Trending', query: 'trending' },
    { name: 'Music', query: 'music' },
    { name: 'Gaming', query: 'gaming' },
    { name: 'Sports', query: 'sports' },
  ];


  // Fetch trending videos with categorys
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const fetchPromises = categoryQueries.map(async ({ name, query }) => {
          const res = await fetch(`/api/youtube/mainpage?searchitem=${encodeURIComponent(query)}`);
          const data = await res.json();

          return {
            category: name,
            videos: data.videos || [],
          };
        });

        const results = await Promise.all(fetchPromises);
        setCategories(results);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);



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

  if (loading) return <div className="main-content">Looking for content.....</div>;

  return (
    <div className="couching-container">
      {user ? (
        <>
          {categories.map(({ category, videos }) => (
            <section key={category}>
              <h2>{category}</h2>
              <div className="video-grid">
                {videos.map((video) => (
                  <div key={video.id} className="video-card">
                    <img src={video.thumbnail} alt={video.title} />
                    <h3>{video.title}</h3>
                  </div>
                ))}
              </div> 
            </section>  
          ))}
        </>
      ) : (
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
      )}
    </div>
  );
};
