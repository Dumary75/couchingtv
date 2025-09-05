'use client';

import { useState } from 'react';
import { useProfiles } from '@/context/ProfileContext';
import './videoRendering.css';
import AddToMyListButton from '@/app/search/AddToMyListButton';
import RemoveFromMyListButton from '@/app/mylist/RemoveButton';
import { Video } from '@/types/interface';

interface VideoCategory {
  category: string;
  videos: Video[];
}

interface Props {
  // Either categories or simple video list
  videoList?: VideoCategory[];
  videos?: Video[];
  mode?: 'add' | 'remove'; // Determines which button is rendered
}

export default function VideoListRendering({
  videoList,
  videos,
  mode = 'add',
}: Props) {
  const { activeProfile } = useProfiles();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

const isLoading = (videoList == null) && (videos == null);

  const renderVideoCard = (video: Video) => (
    <div key={video.id} className="video-card">
      <div>
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          onClick={() => setActiveVideo(video.id)}
        />
      </div>
      <p>{video.title}</p>

      {activeProfile && mode === 'add' && (
        <AddToMyListButton
          video={video}
          activeProfileId={activeProfile.id}
          myList={activeProfile.myList || []}
        />
      )}

      {activeProfile && mode === 'remove' && (
        <RemoveFromMyListButton
          video={video}
          activeProfileId={activeProfile.id}
        />
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Content is loading...</p>
      </div>
    );
  };

  if(!videoList?.length && !videos?.length){
    return (
      <h2>No Content avialable!</h2>
    );
  };

  return (
    <div className="video-list-rendering">
      {/* Case 1: Categories */}
      {videoList?.map((cat) => (
        <section key={cat.category}>
          <h1>{cat.category}</h1>
          <div className="video-grid">
            {cat.videos.map(renderVideoCard)}
          </div>
        </section>
      ))}

      {/* Case 2: Simple video list */}
      {videos && (
        <div className="video-grid">
          {videos.map(renderVideoCard)}
        </div>
      )}

      {/* Video Overlay */}
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
    </div>
  );
}
