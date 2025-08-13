
'use client';

import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function PrivateHeader() {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="couching-header">
      <div className="logo"><a href='/'>COUCHING TV</a></div>
      <nav>
        <a href="#" className="nav-link">Suchen</a>
        <a href="#" className="nav-link">Meine Liste</a>
        <a href="#" className="nav-link">Profil</a>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
    </header>
  );
}