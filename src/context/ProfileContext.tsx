'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "@/lib/firebase"; 
import { useAuth } from "@/hooks/useAuth"; 
import type { Video } from '@/components/VideoListRendering';

type Profile = {
  id: string;
  name: string;
  avatarUrl: string;
  myList?: Video[];
};

type ProfileContextType = {
  profiles: Profile[];
  activeProfile: Profile | null;
  setActiveProfile: (p: Profile | null) => void;
  user: any;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
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
        const active = profileData.find((p) => p.id === activeProfileId) || null;
        setActiveProfile(active);
      }
    });

    return () => unsub();
  }, [user]);

  return (
    <ProfileContext.Provider value={{ profiles, activeProfile, setActiveProfile, user }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfiles() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfiles must be used within a ProfileProvider");
  }
  return ctx;
}
