'use client';


import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

import SearchButton from "./SearchButton";
import Profil from "./Profil";


export default function PrivateHeader() {

  const handleLogout = () => signOut(auth);


  return (
    <header className="couching-header logged-in">
      <div className="logo"><a href='/'>COUCHING TV</a></div>
      <nav className="main-nav">
        <SearchButton />
        <a href="#" className="nav-link">My List</a>
        <Profil />
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
}
