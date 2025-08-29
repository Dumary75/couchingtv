
import { database } from '../../lib/firebase';
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import ProfileDropdown from "./ProfilButtonComponents/ProfileDropdown";
import { useProfiles } from '@/context/ProfileContext';

type Profile = { id: string; name: string; avatarUrl: string };

export default function Profil() {
  const { activeProfile, user, setActiveProfile, profiles } = useProfiles(); 
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleProfileChange = async (profile: Profile |) => {
    setActiveProfile(profile);
    setIsOpen(false);

    // Save in User-document
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
          profiles={profiles}
          activeProfile={activeProfile}
          setActiveProfile={handleProfileChange}
          onEditProfiles={handleManageProfiles}
        />  
      )}
    </div>
  );
}
