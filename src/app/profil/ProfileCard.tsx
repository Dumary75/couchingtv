
import { Profile } from '@/types/interface';

type Props = {

profile: Profile,
draftName: string,
editingNameId:  string | null,
setDraftName: (value: string) => void,
saveName: (profileId: string) => void,
cancelEditName: () => void,
startEditName: (p: Profile) => void,
handleDelete: (profileId: string) => void,
setEditingAvatarId: (value: string | null) => void,
editingAvatarId: string | null,
saveAvatar: (avatar: string, profileId: string) => void
};

export default function Profilcard({ 
    profile, 
    draftName, 
    editingNameId, 
    setDraftName, 
    saveName, 
    cancelEditName, 
    startEditName, 
    handleDelete, 
    setEditingAvatarId, 
    editingAvatarId,
    saveAvatar
    }: Props){

     const dropdownArray = [
       "/avatars/avatar1.png",
       "/avatars/avatar2.png",
       "/avatars/avatar3.png",
       "/avatars/avatar4.png",
       "/avatars/avatar5.png",
       "/avatars/avatar12.png",
       "/avatars/avatar7.png",
       "/avatars/avatar8.png",
       "/avatars/avatar9.png",
       "/avatars/avatar10.png",
       "/avatars/avatar11.png",
       "/avatars/avatar6.png"
     ];

    return (
                <div key={profile.id} className="profile-card">
                    <div className="name-container">
                    <div className="name-actions">
                        
                        {/* Namensanzeige oder Input-Feld */}
                        <div className="name-display-wrapper">
                        <span className={`name-text ${editingNameId === profile.id ? 'hidden' : 'visible'}`}>
                            Name: {profile.name}
                        </span>
                        <div className={`name-edit-field ${editingNameId === profile.id ? 'visible' : 'hidden'}`}>
                            <input
                            type="text"
                            value={draftName}
                            onChange={(e) => setDraftName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveName(profile.id);
                                if (e.key === "Escape") cancelEditName();
                            }}
                            autoFocus={editingNameId === profile.id}
                            />
                        </div>
                        </div>

                        {/* Buttons: abhängig vom Zustand */}
                        {editingNameId === profile.id ? (
                        <>
                            <button className="primary" onClick={() => saveName(profile.id)}>Save</button>
                            <button className="secondary" onClick={cancelEditName}>Cancel</button>
                        </>
                        ) : (
                        <>
                            <button className="primary" onClick={() => startEditName(profile)}>Edit</button>
                            <button className="danger" onClick={() => handleDelete(profile.id)}>Delete</button>
                        </>
                        )}
                    </div>
                    </div>

                    {/* Avatar + Dropdown */}
                    <img
                    src={profile.avatarUrl}
                    alt="Profil-Avatar"
                    className="avatar"
                    onClick={() => {
                        setEditingAvatarId(profile.id);
                    }}
                    />

                    <div className={`dropdown ${editingAvatarId === profile.id ? 'dropdownActive' : ''}`}>
                    {dropdownArray.map((avatar, index) => (
                        <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="avatar-option"
                        onClick={() => saveAvatar(avatar, profile.id)}
                        />
                    ))}
                    <button
                        className="danger dropdown-close"
                        onClick={() => setEditingAvatarId(null)}
                    >
                        Close
                    </button>
                    </div>
                </div>
    );
}