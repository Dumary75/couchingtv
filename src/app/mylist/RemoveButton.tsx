"use client";

import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

interface Video {
  id: string;
  title: string;
  url?: string;
  thumbN?: string;
  addedAt?: string; // optional, da beim Entfernen relevant
}

interface Props {
  video: Video;
  activeProfileId: string;
}

export default function RemoveFromMyListButton({ video, activeProfileId }: Props) {
  const { user } = useAuth();

  const handleRemove = async () => {
    if (!user) return;

    const profileRef = doc(database, "users", user.uid, "profiles", activeProfileId);

    try {
      await updateDoc(profileRef, {
        myList: arrayRemove(video),
      });
      alert("Video entfernt");
    } catch (err) {
      console.error("Fehler beim Entfernen aus myList:", err);
    }
  };

  return (
    <button onClick={handleRemove} className="remove-from-mylist-btn">
      Aus My List entfernen
    </button>
  );
}
