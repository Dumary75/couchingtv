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
  myList: Video[]; // aktuelle MyList vom aktiven Profil
}

export default function AddToMyListButton({ video, activeProfileId, myList }: Props) {
  const { user } = useAuth();

  const handleAdd = async () => {
    if (!user) return;

    // Prüfung beim Klick
    const exists = myList.some(v => v.id === video.id);
    if (exists) return alert("Video ist bereits in deiner MyList!");

    const profileRef = doc(database, "users", user.uid, "profiles", activeProfileId);
    const videoToAdd = {
      ...video,
      addedAt: new Date().toISOString(),
    };

    try {
      await updateDoc(profileRef, {
        myList: arrayUnion(videoToAdd),
      });
      alert("Video hinzugefügt");
    } catch (err) {
      console.error("Fehler beim Hinzufügen zu MyList:", err);
      alert("Fehler beim Hinzufügen zu MyList, bitte erneut versuchen.");
    }
  };

  return (
    <button onClick={handleAdd} className="add-to-mylist-btn">
      Zur MyList hinzufügen
    </button>
  );
}
