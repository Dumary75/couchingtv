'use client';

import { useState } from 'react';
import AddToMyListButton from '@/app/search/AddToMyListButton';
import RemoveFromMyListButton from '@/app/mylist/RemoveButton';

export interface Video {
  id: string;
  title: string;
  url?: string;
  thumbN?: string;
}

export interface Profile {
  id: string;
  myList?: Video[];
}

interface VideoCategory {
  category: string;
  videos: Video[];
}

interface Props {
  // entweder Kategorien oder flache Liste
  videoList?: VideoCategory[];
  videos?: Video[];
  activeProfile: Profile | null;
  mode?: 'add' | 'remove'; // bestimmt welcher Button gerendert wird
}

export default function videoListRendering({
  videoList,
  videos,
  activeProfile,
  mode = 'add',
}: Props) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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

  return (
    <div className="video-list-rendering">
      {/* Fall 1: Kategorien */}
      {videoList?.map((cat) => (
        <section key={cat.category}>
          <h1>{cat.category}</h1>
          <div className="video-grid">
            {cat.videos.map(renderVideoCard)}
          </div>
        </section>
      ))}

      {/* Fall 2: Flache Liste */}
      {videos && (
        <div className="video-grid">
          {videos.map(renderVideoCard)}
        </div>
      )}

      {/* Overlay für Video */}
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
