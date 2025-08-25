"use client";

import './profil.css';
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where, doc, updateDoc } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import CreateProfil from "./Createprofil";

export default function Profil() {
  const { user, loading } = useAuth();
  const [profileList, setProfileList] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  const dropdownArray = [
    './avatars/avatar1.png',
    './avatars/avatar2.png',
    './avatars/avatar3.png',
    './avatars/avatar4.png',
    './avatars/avatar5.png',
    './avatars/avatar6.png',
    './avatars/avatar7.png',
    './avatars/avatar8.png',
    './avatars/avatar9.png',
    './avatars/avatar10.png',
    './avatars/avatar11.png',
  ];


  useEffect(() => {
    if (!user) return; // warten, bis user da ist

    // Query: nur Dokumente holen, die zur UID des eingeloggten Users gehören
const profilesRef = collection(database, "users", user.uid, "profiles"); // 4 Segmente
const unsub = onSnapshot(profilesRef, (snapshot) => {
  const profiles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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



const saveAvatar = async (avatar: string, profileId: string) => {
  const profileRef = doc(database, "users", user!.uid, "profiles", profileId);
  await updateDoc(profileRef, { avatarUrl: avatar });
};




  return (
    <div className="main-content">
      <h1>Dein Profilbereich</h1>
      {profileList.map((profile) => (
        <div key={profile.id}>
          <p>Name: {profile.name}</p>
          <img src={profile.avatarUrl} alt="profil avatar" onClick={() => {
                                                                      setDropdownOpen(true)
                                                                      setEditingProfileId(profile.id)
          }}/>

          {dropdownOpen && editingProfileId === profile.id && (
            <div className="dropdown">
              {dropdownArray.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => {
                    setSelectedAvatar(avatar);
                    saveAvatar(avatar, profile.id);
                    setDropdownOpen(false);
                  }}
                />
              ))}
            </div>
          )}


          <br />
        </div>
      ))}

      <h1>Profilerstellen</h1>
      <CreateProfil />
    </div>
  );
}
