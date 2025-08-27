'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { doc, collection, onSnapshot, getDoc } from 'firebase/firestore';
import { database } from '@/lib/firebase';
import type { Video } from '../VideoListRendering';
import VideoListRendering  from '../VideoListRendering';
import { videoList } from '@/app/videoList';

type Profile = {
  id: string;
  name: string;
  avatarUrl: string;
  myList?: Video[];
};


export default function UserLoggedIn() {
  const { user } = useAuth();
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) return;

    const profilesRef = collection(database, 'users', user.uid, 'profiles');
    const unsub = onSnapshot(profilesRef, async (snapshot) => {
      const profileData = snapshot.docs.map(
        (d) => ({ id: d.id, ...(d.data() as Omit<Profile, 'id'>) }) as Profile
      );

      // Aktives Profil aus users/{uid} laden
      const userRef = doc(database, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const activeProfileId = userSnap.data().activeProfileId as string;
        const active = profileData.find((p) => p.id === activeProfileId) || null;
        setActiveProfile(active);
      }
    });

    return () => unsub();
  }, [user]);

  if (!user) return <p>Bitte einloggen</p>;
  if (!activeProfile) return <p>Lade Profil...</p>;

  return (
    <div className="main-content">
      <VideoListRendering
        videoList={videoList}           
        activeProfile={activeProfile}
        mode="add"                      
      />
    </div>
  );
}
