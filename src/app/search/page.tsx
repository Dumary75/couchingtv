"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoListRendering from '@/components/VideoListRendering';
import { Video } from '@/types/interface';

export default function SearchPage() {
const [videos, setVideos] = useState<Video[]>([]);
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



  return (
       <div className='main-content'>
       <h2>Note: Only 6 results are displayed!</h2>
                  <VideoListRendering
                    videos={videos}           
                    mode="add"                      
                  />

        </div>
  );
}