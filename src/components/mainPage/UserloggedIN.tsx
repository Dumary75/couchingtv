       
import { useState } from 'react';
import { videoList } from '../../app/videoList'; 
       
 export default function UserloggedIN() {
      const [activeVideo, setActiveVideo] = useState<string | null>(null);
      
      
    return (  
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
    );
}