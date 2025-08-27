
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../lib/firebase"; 

export async function updateActiveProfileInDB(userId: string, profileId: string) {
  try {
    const userRef = doc(database, "users", userId);
    await updateDoc(userRef, {
      activeProfileId: profileId,
    });
  } catch (err) {
    alert('Error, Check console.log!');
    console.error("Error updating active profile:", err);
  }
}
