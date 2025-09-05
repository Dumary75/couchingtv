"use client";

import { useProfiles } from '@/context/ProfileContext';
import VideoListRendering from '@/components/VideoListRendering';
import '../main.css';


export default function MyListPage() {
  const { activeProfile, user, isOpen, mobileActive } = useProfiles();
  const videos = activeProfile?.myList || [];

  return (
    <div className={`main-content ${isOpen || mobileActive ? 'BlurryMode' : ''}`}>
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
