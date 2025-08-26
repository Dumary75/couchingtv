"use client";

import { useAuth } from "@/hooks/useAuth";
import { database } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import AddToMyListButton from "@/app/search/AddToMyListButton";
import '../main.css';

type MyListItem = { id: string; title: string; url: string; thumbN: string };
type Profile = { id: string; name: string; avatarUrl: string; myList?: MyListItem[] };

export default function MyListPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const profilesRef = collection(database, "users", user.uid, "profiles");
    const unsub = onSnapshot(profilesRef, async (snapshot) => {
      const profileData = snapshot.docs.map(
        (d) => ({ id: d.id, ...(d.data() as Omit<Profile, "id">) }) as Profile
      );
      setProfiles(profileData);

      const userRef = doc(database, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const activeProfileId = userSnap.data().activeProfileId as string;
        const active = profileData.find(p => p.id === activeProfileId) || null;
        setActiveProfile(active);
      }

      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  if (loading) return <p>Lade Inhalte...</p>;
  if (!user) return <p>Bitte einloggen</p>;

  const videos = activeProfile?.myList || [];

  return (
    <div className="main-content">
      <h1>Meine Liste</h1>

      {videos.length > 0 ? (
        <div className="video-grid">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => setActiveVideo(video.id)}
            >
              <img
                src={video.thumbN || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
              />
              <p className="video-title">{video.title}</p>
              {activeProfile && (
                <AddToMyListButton video={video} activeProfileId={activeProfile.id} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-content">
          No content found. Add your favorites to see them here.
        </p>
      )}

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
