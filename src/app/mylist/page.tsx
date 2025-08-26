"use client";

import { useAuth } from "@/hooks/useAuth";
import { database } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

type Profile = { id: string; name: string; avatarUrl: string; myList?: string[] };

export default function MyListPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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

      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  if (loading) return <p>Lade Inhalte...</p>;
  if (!user) return <p>Bitte einloggen</p>;

  const myList = activeProfile?.myList || [];

  return (
    <div className="main-content">
      <h1>Meine Liste</h1>

      {myList.length > 0 ? (
        <ul className="mylist-items">
          {myList.map(item => (
  <div key={item.id}>
    <p>{item.title}</p>
    <p>{item.url}</p>
    <img src={item.thumbN} alt={item.title} />
  </div>
))
}
        </ul>
      ) : (
        <p className="no-content">
          No Content found. Add your favorites to see them here.
        </p>
      )}
    </div>
  );
}
