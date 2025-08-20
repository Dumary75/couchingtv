'use client';

import './main.css'; 

import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignup } from '../context/SignupContext';
import FAQSection from '@/components/FAQSection';
import { videoList } from './videoList';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { dispatch } = useSignup();
  const [email, setEmail] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);



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
    <div className="couching-container">
      {user ? (
        <>
            <div>
                {videoList.map((category) => (
                  <section key={category.category}>
                    <h1>{category.category}</h1>
                      <div className='video-grid'>
                          {category.videos.map((video) => (
                            <div
                              key={video.id}
                              className='video-card' 
                              onClick={() => setActiveVideo(video.id)}
                            >
                                    <div>
                                      <img
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={video.title}
                                      />
                                    </div>
                                    <p>{video.title}</p>
                                  </div>
                  ))}
                        </div>
                  </section>
                ))}
          </div>

          {activeVideo && (
            <div className="video-overlay" onClick={() => setActiveVideo(null)}>
              <button className="close-btn" onClick={() => setActiveVideo(null)}>✕</button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            )}

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
