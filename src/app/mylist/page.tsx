"use client";

import { useAuth } from "@/hooks/useAuth";
import { database } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import VideoListRendering from '@/components/VideoListRendering';
import '../main.css';

type MyListItem = { id: string; title: string; url: string; thumbN: string };
type Profile = { id: string; name: string; avatarUrl: string; myList?: MyListItem[] };

export default function MyListPage() {
  const { user, loading } = useAuth(); // Nutze nur den Loading-State von useAuth
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

  if (loading) return 
  if (!user) return <div className="main-content"><p>Bitte einloggen</p></div>;

  const videos = activeProfile?.myList || [];

  return (
    <div className="main-content">
      <h1>Meine Liste</h1>

          <VideoListRendering
            videos={videos}           
            activeProfile={activeProfile}
            mode="remove"                      
          />
    </div>
  );
}
