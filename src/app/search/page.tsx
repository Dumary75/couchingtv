"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { doc, collection, onSnapshot, getDoc} from "firebase/firestore";
import { database } from "@/lib/firebase";

import AddToMyListButton from './AddToMyListButton';

interface Video {
  id: string;
  title: string;
}

type Profile = {
  id: string;
  name: string;
  avatarUrl: string;
  myList?: Video[];
};

export default function SearchPage() {
const { loading, user } = useAuth();
const [profiles, setProfiles] = useState<Profile[]>([]);
const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) return;

    const profilesRef = collection(database, "users", user.uid, "profiles");
    const unsub = onSnapshot(profilesRef, async (snapshot) => {
      const profileData = snapshot.docs.map(
        (d) => ({ id: d.id, ...(d.data() as Omit<Profile, "id">) }) as Profile
      );
      setProfiles(profileData);

      // Aktives Profil aus users/{uid} laden
      const userRef = doc(database, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const activeProfileId = userSnap.data().activeProfileId as string;
        const active = profileData.find(p => p.id === activeProfileId) || null;
        setActiveProfile(active);
      }

    });

    return () => unsub();
  }, [user]);


const [videos, setVideos] = useState<Video[]>([]);
const [activeVideo, setActiveVideo] = useState<string | null>(null);
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


    if (loading) {
      return <main className='main-content'><p>Loading...</p></main>;
    }


  return (
       <>
       <h2>Note: Only 8 results are displayed!</h2>
          <div className='video-grid'>
                {videos.map((video) => (
                 
                            <div
                              key={video.id}
                              className='video-card search' 
                            >
                                    <div>
                                      <img
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={video.title}
                                        onClick={() => setActiveVideo(video.id)}
                                      />
                                    </div>
                                    <p>{video.title}</p> 
                                        {activeProfile && (
                                          <AddToMyListButton
                                            video={video}
                                            activeProfileId={activeProfile.id}
                                            myList={activeProfile.myList || []}
                                          />
                                        )}
                                </div>
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