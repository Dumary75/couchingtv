
"use client";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

interface Video {
  id: string;
  title: string;
  url?: string;
  thumbN?: string;
}

interface Props {
  video: Video;
  activeProfileId: string;
}

export default function AddToMyListButton({ video, activeProfileId }: Props) {
  const { user } = useAuth();

  const handleAdd = async () => {
    if (!user) return;

    const profileRef = doc(database, "users", user.uid, "profiles", activeProfileId);

    const videoToAdd = {
      ...video,
      addedAt: new Date().toISOString(), // Timestamp für Sortierung
    };

    try {
      await updateDoc(profileRef, {
        myList: arrayUnion(videoToAdd),
      });
      alert("Video hinzugefügt:" + video.title);
    } catch (err) {
      console.error("Fehler beim Hinzufügen zu myList:", err);
    }
  };

  return <button onClick={handleAdd} className="add-to-mylist-btn ">Zur My List hinzufügen</button>;
}
