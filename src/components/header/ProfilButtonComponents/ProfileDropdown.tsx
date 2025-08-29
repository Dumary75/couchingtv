import "./ProfileDropdown.css";
import { updateActiveProfileInDB } from "./updateActiveProfileInDB";

interface Profile {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Props {
  userId: string;
  profiles: Profile[];
  activeProfile: Profile | null;
  setActiveProfile: (profile: Profile ) => void;
  onEditProfiles: () => void;
}

const ProfileDropdown = ({
  userId,
  profiles,
  activeProfile,
  setActiveProfile,
  onEditProfiles,
}: Props) => {
  const handleSelect = (profile: Profile) => {
    setActiveProfile(profile);
    updateActiveProfileInDB(userId, profile.id);
  };

  return (
    <div className="dropdown-list">
      {profiles.map((profile) => (
        <img
          key={profile.id}
          src={profile.avatarUrl}
          className={`dropdown-avatar ${
            activeProfile?.id === profile.id ? "active" : ""
          }`}
          onClick={() => handleSelect(profile)}
        />
      ))}
      <button className="dropdown-edit" onClick={onEditProfiles}>
        ⚙️ <br />
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileDropdown;
