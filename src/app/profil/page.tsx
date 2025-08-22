"use client";

import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import CreateProfil from "./Createprofil";

export default function Profil() {
  const { user, loading } = useAuth();
  const [profileList, setProfileList] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return; // warten, bis user da ist

    // Query: nur Dokumente holen, die zur UID des eingeloggten Users gehören
    const profilesRef = collection(database, "users");
    const q = query(profilesRef, where("uid", "==", user.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      const profiles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProfileList(profiles);
    });

    return () => unsub();
  }, [user]);

  if (loading) {
    return <p>Lade Benutzer...</p>;
  }

  if (!user) {
    return <p>Bitte einloggen</p>;
  }

  return (
    <div className="main-content">
      <h1>Dein Profilbereich</h1>
      {profileList.map((profile) => (
        <div key={profile.id}>
          <p>Email: {profile.email}</p>
          <p>Password: {profile.password}</p>
          <br />
        </div>
      ))}

      <h1>Profilerstellen</h1>
      <CreateProfil />
    </div>
  );
}
