import React from "react";
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
  setActiveProfile: (profile: Profile | null) => void;
  onEditProfiles: () => void; // z. B. Navigation zur Profilseite
}

const ProfileDropdown: React.FC<Props> = ({
  userId,
  profiles,
  activeProfile,
  setActiveProfile,
  onEditProfiles
}) => {

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
          className={`dropdown-avatar ${activeProfile?.id === profile.id ? "active" : ""}`}
          onClick={() => handleSelect(profile)}
        />
      ))}
      <button className="dropdown-edit" onClick={onEditProfiles}>
        ⚙️ Profile bearbeiten
      </button>
    </div>
  );
};

export default ProfileDropdown;
