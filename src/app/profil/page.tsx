"use client";

import "./profil.css";
import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { database, auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import CreateProfil from "./Createprofil";
import { useProfiles } from '@/context/ProfileContext';
import { Profile } from '@/types/interface';

export default function Profil() {
  const { profiles, user } = useProfiles();
  const { loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingAvatarId, setEditingAvatarId] = useState<string | null>(null);


  // Name-Editing nur for ONE tile
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");

  const dropdownArray = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar12.png",
    "/avatars/avatar7.png",
    "/avatars/avatar8.png",
    "/avatars/avatar9.png",
    "/avatars/avatar10.png",
    "/avatars/avatar11.png",
    "/avatars/avatar6.png"
  ];

  if (loading) return <p>Loading User...</p>;
  if (!user) return <p>Please log in first</p>;

  // Save Avatar
  const saveAvatar = async (avatar: string, profileId: string) => {
    const profileRef = doc(database, "users", user.uid, "profiles", profileId);
    await updateDoc(profileRef, { avatarUrl: avatar });
  };


  // Name-Editing Functions
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


// Profil delete 
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
      alert('Profile successfully deleted!')
    } catch (err) {
      console.error("Deletion error::", err);
    }
  }



  return (
    <div className="main-content">
      <h1>Your profile area</h1>

      {profiles.map((profile) => (
        <div key={profile.id} className="profile-card">
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
          <button className="primary" onClick={() => saveName(profile.id)}>Save</button>
          <button className="secondary" onClick={cancelEditName}>Cancel</button>
        </div>
          ) : (
            <div className="name-display">
              <p>Name: {profile.name}</p>
              <button className="primary" onClick={() => startEditName(profile)}>Edit</button>
              <button className="danger" onClick={() => handleDelete(profile.id)}>Delete</button>
            </div>
          )}

          {/* Avatar + Dropdown editing*/}
          <img
            src={profile.avatarUrl}
            alt="Profil-Avatar"
            className="avatar"
            onClick={() => {
              setDropdownOpen(true);
              setEditingAvatarId(profile.id);
            }}
          />

      <div className={`dropdown ${editingAvatarId === profile.id ? 'dropdownActive' : ''}`}>
        {dropdownArray.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className="avatar-option"
            onClick={() => saveAvatar(avatar, profile.id)}
          />
        ))}
        <button
          className="danger dropdown-close"
          onClick={() => setEditingAvatarId(null)}
        >
          Close
        </button>
      </div>


          <br />
        </div>
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
