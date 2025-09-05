'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "@/lib/firebase"; 
import { useAuth } from "@/hooks/useAuth"; 
import { Profile } from '@/types/interface';
import './loading.css';

type ProfileContextType = {
  profiles: Profile[];
  activeProfile: Profile | null;
  setActiveProfile: (p: Profile | null) => void;
  user: any;

  /* Things for MobileDropdown */
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;

  mobileActive: boolean;
  setMobileActive: (mobileActive: boolean) => void;
  toggleMobilemenu: () => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  /* Things for MobileDropdown */
  const [isOpen, setIsOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleMobilemenu = () => {
    setMobileActive((prev) => !prev);
  };

  useEffect(() => {
    if (!user?.uid) return; 

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
  }, [user?.uid]);

    if (loading) {
    return <div className="loading-screen">
              <div className="spinner"></div>
              <p className="loading-text">Loading User...</p>
           </div>; 
  }

  return (
    <ProfileContext.Provider value={{ profiles, activeProfile, setActiveProfile, user, isOpen, setIsOpen, toggleOpen, mobileActive, setMobileActive, toggleMobilemenu}}>
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