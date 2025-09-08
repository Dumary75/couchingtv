"use client";

import "./profil.css";
import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { database, auth } from "@/lib/firebase";
import CreateProfil from "./Createprofil";
import Profilcard from './ProfileCard';
import { useProfiles } from '@/context/ProfileContext';
import { Profile } from '@/types/interface';

export default function Profil() {
  const { profiles, user, isOpen, mobileActive } = useProfiles();
  const [editingAvatarId, setEditingAvatarId] = useState<string | null>(null);


  // Name-Editing nur for ONE tile
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");


  if (!user) return <div className="main-content"><p>Please log in first</p></div>;

  // Save Avatar
  const saveAvatar = async (avatar: string, profileId: string) => {
    const profileRef = doc(database, "users", user!.uid, "profiles", profileId);
    await updateDoc(profileRef, { avatarUrl: avatar });
  };


  // Name-Editing Functions
  const startEditName = (p: Profile) => {
    setEditingNameId(p.id);
    setDraftName(p.name ?? ""); 
  };

  const cancelEditName = () => {
    setEditingNameId(null);
    setDraftName("");
  };

  const saveName = async (profileId: string) => {
    const name = draftName.trim();
    if (!name) return;
    const profileRef = doc(database, "users", user!.uid, "profiles", profileId);
    await updateDoc(profileRef, { name });
    setEditingNameId(null);
  };


// Profil delete 
async function handleDelete(profileId: string) {
    if (!auth.currentUser) return;

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this profile?"
      );

     if (!confirmDelete) return;

    try {
      await deleteDoc(
        doc(database, "users", auth.currentUser!.uid, "profiles", profileId)
      );
      alert('Profile successfully deleted!')
    } catch (err) {
      alert('Error deleting profile!');
      console.error("Deletion error:", err);
    }
  }



  return (
    <div className={`main-content ${isOpen || mobileActive? 'BlurryMode' : ''}`}>
      <h1>Your profile area</h1>

      {profiles.map((profile) => (
        <Profilcard
          key={profile.id}
          profile={profile}
          draftName={draftName}
          editingNameId={editingNameId}
          setDraftName={setDraftName}
          saveName={saveName}
          cancelEditName={cancelEditName}
          startEditName={startEditName}
          handleDelete={handleDelete}
          setEditingAvatarId={setEditingAvatarId}
          editingAvatarId={editingAvatarId}
          saveAvatar={saveAvatar}
        />
       ))}

        <h1>Create Profile</h1>
        {profiles.length < 5 ? (
          <CreateProfil />
          ) : (
          <p>Maximum number of profiles reached (5).</p>
          )}
          
</div>
  );
}
