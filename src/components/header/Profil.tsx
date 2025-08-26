// Profil.tsx
import { useAuth } from "@/hooks/useAuth";
import { database } from '../../lib/firebase';
import { useEffect, useState } from "react";
import { onSnapshot, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import ProfileDropdown from "./ProfilButtonComponents/ProfileDropdown";

type Profile = { id: string; name: string; avatarUrl: string };

export default function Profil() {
  const { user } = useAuth();
  const [profileList, setProfileList] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const profilesRef = collection(database, "users", user.uid, "profiles");
    const unsub = onSnapshot(profilesRef, async (snapshot) => {
      const profiles = snapshot.docs.map(
        (d) => ({ id: d.id, ...(d.data() as Omit<Profile, "id">) }) as Profile
      );
      setProfileList(profiles);

      const userRef = doc(database, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const activeProfileId = userSnap.data().activeProfileId as string;
        const active = profiles.find(p => p.id === activeProfileId) || null;
        setActiveProfile(active);
      }
    });

    return () => unsub();
  }, [user]);

  const handleProfileChange = async (profile: Profile) => {
    if (!user) return;
    setActiveProfile(profile);
    setIsOpen(false);

    // im User-Dokument speichern
    const userRef = doc(database, "users", user.uid);
    await updateDoc(userRef, { activeProfileId: profile.id });
  };

  const handleManageProfiles = () => {
    setIsOpen(false);
    router.push('/profil');
  };

  return (
    <div className="profile-dropdown">
      {activeProfile ? (
        <img
          src={activeProfile.avatarUrl}
          alt={activeProfile.name}
          className="header-avatar"
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <button className="nav-link" onClick={() => setIsOpen(!isOpen)}>Profil</button>
      )}

      {isOpen && (
        <ProfileDropdown
          userId={user!.uid}
          profiles={profileList}
          activeProfile={activeProfile}
          setActiveProfile={handleProfileChange}
          onEditProfiles={handleManageProfiles}
        />  
      )}
    </div>
  );
}
