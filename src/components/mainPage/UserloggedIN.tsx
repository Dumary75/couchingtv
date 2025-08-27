'use client';

import VideoListRendering  from '../VideoListRendering';
import { videoList } from '@/app/videoList';

export default function UserLoggedIn() {
  return (
    <div className="main-content">
      <VideoListRendering
        videoList={videoList}           
        mode="add"                      
      />
    </div>
  );
}
