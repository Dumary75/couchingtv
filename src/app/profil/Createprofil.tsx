"use client";

import { FormEvent } from "react";
import { auth, database } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useProfiles } from '@/context/ProfileContext';

export default function CreateProfil() {
const { user } = useProfiles();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("No user logged in!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      const profilesRef = collection(
        database,
        "users",
        user!.uid,
        'profiles'
      );

      await addDoc(profilesRef, {
        uid: auth.currentUser.uid,
        name,
        avatarUrl: './avatars/avatar1.png',
        myList: []
      });

      alert("Profile created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating profile!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" className="createProfil_Input" required/> <br />
      <button type="submit">Create Profil</button>
    </form>
  );
}
