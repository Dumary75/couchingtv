"use client";

import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useProfiles } from '@/context/ProfileContext';
import { Video } from '@/types/interface';

interface Props {
  video: Video;
  activeProfileId: string;
}

export default function RemoveFromMyListButton({ video, activeProfileId }: Props) {
  const { user } = useProfiles();

  const handleRemove = async () => {

    const profileRef = doc(database, "users", user.uid, "profiles", activeProfileId);

    try {
      await updateDoc(profileRef, {
        myList: arrayRemove(video),
      });
      alert("Video removed");
    } catch (err) {
      console.error("Error removing from myList", err);
    }
  };

  return (
    <button type="button" onClick={handleRemove} className="remove-from-mylist-btn">
      Remove from My List
    </button>
  );
}
