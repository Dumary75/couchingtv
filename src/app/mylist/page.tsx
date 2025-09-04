"use client";

import { useProfiles } from '@/context/ProfileContext';
import VideoListRendering from '@/components/VideoListRendering';
import '../main.css';


export default function MyListPage() {
  const { activeProfile, user, isOpen, mobileActive, loading } = useProfiles();

  if (loading) {
    return <div className="loading-screen">
              <div className="spinner"></div>
              <p className="loading-text">Loading User...</p>
           </div>; 
  }

  const videos = activeProfile?.myList || [];

  return (
    <div className={`main-content ${isOpen ? 'BlurryMode' : ''} ${mobileActive ? 'BlurryMode' : ''}`}>
      <h1>My List</h1>
      {user? (
          <VideoListRendering
            videos={videos}           
            mode="remove"                      
          />
      ): (<p>Please log in to use this feature!</p>)}
    </div>
  );
}
