"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoListRendering from '@/components/VideoListRendering';
import { useProfiles } from '@/context/ProfileContext';

interface Video {
  id: string;
  title: string;
}



export default function SearchPage() {
const [videos, setVideos] = useState<Video[]>([]);
const searchParams = useSearchParams();
const { user, isOpen, mobileActive  } = useProfiles();
     
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



  return (
       <div className={`main-content ${isOpen ? 'BlurryMode' : ''} ${mobileActive ? 'BlurryMode' : ''}`}>
      {user? (
        <>
          <h2>Note: Only 6 results are displayed!</h2>
            <VideoListRendering
              videos={videos}           
              mode="add"                      
            />
        </>

      ): (<h2>Please log in to use this feature!</h2>)}
        </div>
  );
}