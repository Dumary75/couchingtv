"use client";

import { FormEvent } from "react";
import { auth, database } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateProfil() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Kein User eingeloggt!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const profilesRef = collection(
        database,
        "users",


      );

      await addDoc(profilesRef, {
        uid: auth.currentUser.uid,
        email,
        password,
      });


      alert("Profil erfolgreich erstellt!");
    } catch (error) {
      console.error(error);
      alert("Fehler beim Erstellen des Profils");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="email" placeholder="Email" required />
      <input type="text" name="password" placeholder="Passwort" required />
      <button type="submit">Profil erstellen</button>
    </form>
  );
}
