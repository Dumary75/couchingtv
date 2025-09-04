"use client";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useProfiles } from '@/context/ProfileContext';
import { Video } from '@/types/interface';

interface Props {
  video: Video;
  activeProfileId: string;
  myList: Video[]; // currently myList from profile
}

export default function AddToMyListButton({ video, activeProfileId, myList }: Props) {
  const { user } = useProfiles();

  const handleAdd = async () => {

    // Checking by klick if the video already is in my List
    const exists = myList.some(v => v.id === video.id);
    if (exists) return alert("Video is already in your MyList!");

    const profileRef = doc(database, "users", user.uid, "profiles", activeProfileId);
    const videoToAdd = {
      ...video,
      addedAt: new Date().toISOString(),
    };

    try {
      await updateDoc(profileRef, {
        myList: arrayUnion(videoToAdd),
      });
      alert("Video added");
    } catch (err) {
      console.error("Error adding to MyList:", err);
      alert("Error adding to MyList, please try again.");
    }
  };

  return (
    <button type="button" onClick={handleAdd} className="add-to-mylist-btn">
      Add to my List
    </button>
  );
}
