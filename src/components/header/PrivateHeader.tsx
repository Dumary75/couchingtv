'use client';

import { useAuth } from "@/hooks/useAuth";
import { signOut } from 'firebase/auth';
import { auth, database } from '../../lib/firebase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onSnapshot, collection, doc, getDoc } from "firebase/firestore";

type Profile = { id: string; name: string; avatarUrl: string };

export default function PrivateHeader() {
  const { user } = useAuth();
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [profileList, setProfileList] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) return;

    const profilesRef = collection(database, "users", user.uid, "profiles");
    const unsub = onSnapshot(profilesRef, async (snapshot) => {
      const profiles = snapshot.docs.map(
        (d) => ({ id: d.id, ...(d.data() as Omit<Profile, "id">) }) as Profile
      );
      setProfileList(profiles);

      // Aktives Profil aus users/{uid} laden
      const userRef = doc(database, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const activeProfilName = userSnap.data().activeProfilName as string;
        const active = profiles.find(p => p.name === activeProfilName) || null;
        setActiveProfile(active);
      }
    });

    return () => unsub();
  }, [user]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
  const startSearch = () => {
    setShowSearch(false);
    router.push(`/search?query=${encodeURIComponent(query)}`); 
  }
  const handleLogout = () => signOut(auth);
  const handleProfileClick = () => router.push('/profil');

  return (
    <header className="couching-header logged-in">
      <div className="logo"><a href='/'>COUCHING TV</a></div>
      <nav className="main-nav">

        {showSearch ? 
          <>
            <button onClick={startSearch} className="requestSender">Search</button>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search..."
              className="search-input"
            /> 
          </>
        : 
          <button onClick={() => setShowSearch(true)} className="search-btn">
            Search 
          </button>
        }

        <a href="#" className="nav-link" onClick={() => console.log(activeProfile)}>My List</a>

        {/* Avatar des aktiven Profils */}
        {activeProfile ? (
          <img
            src={activeProfile.avatarUrl}
            alt={activeProfile.name}
            className="header-avatar"
            onClick={handleProfileClick}
          />
        ) : (
          <button className="nav-link" onClick={handleProfileClick}>Profil</button>
        )}

        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
}
