'use client';

import { useProfiles } from '@/context/ProfileContext';
import VideoListRendering from '../VideoListRendering';
import { videoList } from '@/app/videoList';

export default function UserLoggedIn() {
  const { isOpen, mobileActive } = useProfiles();

return (
    <div className={`main-content ${isOpen || mobileActive? 'BlurryMode' : ''}`}>
      <VideoListRendering videoList={videoList} mode="add" />
    </div>
  );
}