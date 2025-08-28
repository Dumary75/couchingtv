"use client";

import "./profil.css";
import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { database, auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import CreateProfil from "./Createprofil";
import { useProfiles } from '@/context/ProfileContext';

type Profile = { id: string; name: string; avatarUrl: string };

export default function Profil() {
  const { profiles, user } = useProfiles();
  const { loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingAvatarId, setEditingAvatarId] = useState<string | null>(null);


  // Name-Editing nur für EINE Kachel
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");

  // Nutze im Next.js `public/`-Ordner absolute Pfade:
  const dropdownArray = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
    "/avatars/avatar7.png",
    "/avatars/avatar8.png",
    "/avatars/avatar9.png",
    "/avatars/avatar10.png",
    "/avatars/avatar11.png",
  ];

  if (loading) return <p>Lade Benutzer...</p>;
  if (!user) return <p>Bitte einloggen</p>;

  // Avatar speichern
  const saveAvatar = async (avatar: string, profileId: string) => {
    const profileRef = doc(database, "users", user.uid, "profiles", profileId);
    await updateDoc(profileRef, { avatarUrl: avatar });
  };


  // Name-Editing Funktionen
  const startEditName = (p: Profile) => {
    setEditingNameId(p.id);
    setDraftName(p.name);
  };

  const cancelEditName = () => {
    setEditingNameId(null);
    setDraftName("");
  };

  const saveName = async (profileId: string) => {
    const name = draftName.trim();
    if (!name) return;
    const profileRef = doc(database, "users", user.uid, "profiles", profileId);
    await updateDoc(profileRef, { name });
    setEditingNameId(null);
  };


// Profil löschen 
async function handleDelete(profileId: string) {
    if (!auth.currentUser) return;

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this profile?"
      );

     if (!confirmDelete) return;

    try {
      await deleteDoc(
        doc(database, "users", auth.currentUser.uid, "profiles", profileId)
      );
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  }



  return (
    <div className="main-content">
      <h1>Dein Profilbereich</h1>

      {profiles.map((profile) => (
        <div key={profile.id} className="profile-card">
          {/* Name-Block: genau eine Kachel im Edit-Modus */}
          {editingNameId === profile.id ? (
            <div className="name-edit">
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveName(profile.id);
                  if (e.key === "Escape") cancelEditName();
                }}
                autoFocus
              />
              <button onClick={() => saveName(profile.id)}>Save</button>
              <button onClick={cancelEditName}>Cancel</button>
            </div>
          ) : (
            <div className="name-display">
              <p>Name: {profile.name}</p>
              <button onClick={() => startEditName(profile)}>Edit</button>
              <button onClick={() => handleDelete(profile.id)}>Delete</button>
            </div>
          )}

          {/* Avatar + Dropdown nur für die angeklickte Kachel */}
          <img
            src={profile.avatarUrl}
            alt="Profil-Avatar"
            className="avatar"
            onClick={() => {
              setDropdownOpen(true);
              setEditingAvatarId(profile.id);
            }}
          />

          {dropdownOpen && editingAvatarId === profile.id && (
            <div className="dropdown">
              {dropdownArray.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="avatar-option"
                  onClick={() => {
                    saveAvatar(avatar, profile.id);
                    setDropdownOpen(false);
                    setEditingAvatarId(null);
                  }}
                />
              ))}
              <button
                className="dropdown-close"
                onClick={() => {
                  setDropdownOpen(false);
                  setEditingAvatarId(null);
                }}
              >
                Schließen
              </button>
            </div>
          )}

          <br />
        </div>
      ))}

  <h1>Profilerstellen</h1>
  {profiles.length < 5 ? (
    <CreateProfil />
     ) : (
    <p>Maximale Anzahl an Profilen erreicht (5).</p>
    )}

    </div>
  );
}
