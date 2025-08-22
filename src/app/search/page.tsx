"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';



export default function SearchPage() {
const { loading } = useAuth();

interface Video {
  id: string;
  title: string;
}

const [videos, setVideos] = useState<Video[]>([]);
const [activeVideo, setActiveVideo] = useState<string | null>(null);
const searchParams = useSearchParams();
     
useEffect(() => {
  
  const query = searchParams.get('query');

  async function fetchSearchResults() {
    if (!query) {
      alert('No search query provided, please enter a search term.');
      return;
    }

    try {
      const response = await fetch('/api/youtube/mainpage?searchitem=' + query);
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      alert('Error fetching search results, please try again later.');
    }
  }

  fetchSearchResults();
}, []);


    if (loading) {
      return <main className='main-content'><p>Loading...</p></main>;
    }


  return (
       <>
       <h2>Note: Only 8 results are displayed!</h2>
          <div className='video-grid'>
                {videos.map((video) => (
                            <div
                              key={video.id}
                              className='video-card search' 
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
  );
}