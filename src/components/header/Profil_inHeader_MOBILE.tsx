
import { database } from '../../lib/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import ProfileDropdown from "./ProfilButtonComponents/ProfileDropdown";
import { useProfiles } from '@/context/ProfileContext';
import { Profile } from '@/types/interface';

export default function Profil() {
  const { activeProfile, user, setActiveProfile, profiles, isOpen, toggleOpen } = useProfiles(); 
  const router = useRouter();

  const handleProfileChange = async (profile: Profile ) => {
    setActiveProfile(profile);
    toggleOpen();

    // Save in User-document
    const userRef = doc(database, "users", user.uid);
    await updateDoc(userRef, { activeProfileId: profile.id });
  };

  const handleManageProfiles = () => {
    toggleOpen();
    router.push('/profil');
  };

  return (
    <div className="profile-dropdown-MOBILEversion">
      {activeProfile ? (
        <img
          src={activeProfile.avatarUrl}
          alt={activeProfile.name}
          className="header-avatar"
          onClick={toggleOpen}
        />
      ) : (
        <button className="nav-link" onClick={toggleOpen} type='button'>Profil</button>
      )}

        <ProfileDropdown
          userId={user!.uid}
          profiles={profiles}
          activeProfile={activeProfile}
          setActiveProfile={handleProfileChange}
          onEditProfiles={handleManageProfiles}
          isOpen={isOpen}
        />  
    </div>
  );
}
