"use client";

import { useProfiles } from '@/context/ProfileContext';
import VideoListRendering from '@/components/VideoListRendering';
import '../main.css';


export default function MyListPage() {
  const { activeProfile } = useProfiles();
  const videos = activeProfile?.myList || [];

  return (
    <div className="main-content">
      <h1>Meine Liste</h1>

          <VideoListRendering
            videos={videos}           
            mode="remove"                      
          />
    </div>
  );
}
