       
import { useState, useEffect } from 'react';
import { videoList } from '../../app/videoList'; 
import AddToMyListButton from '@/app/search/AddToMyListButton';
import { doc, collection, onSnapshot, getDoc} from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useAuth } from '../../hooks/useAuth';

type Profile = { id: string; name: string; avatarUrl: string };
       
 export default function UserloggedIN() {
      const [activeVideo, setActiveVideo] = useState<string | null>(null);
      const [profiles, setProfiles] = useState<Profile[]>([]);
      const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
      const { user } = useAuth();  

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
      
      
    return (  
       <>
            <div>
                {videoList.map((category) => (
                  <section key={category.category}>
                    <h1>{category.category}</h1>
                      <div className='video-grid'>
                          {category.videos.map((video) => (
                            <div
                              key={video.id}
                              className='video-card' 
                              onClick={() => setActiveVideo(video.id)}
                            >
                                    <div>
                                      <img
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={video.title}
                                      />
                                    </div>
                                    <p>{video.title}</p>
                                                                        {activeProfile && (
                                                                            <AddToMyListButton video={video} activeProfileId={activeProfile.id} />
                                                                          )}
                                  </div>
                  ))}
                        </div>
                  </section>
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