'use client';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

import SearchButton from "./SearchButton";
import Profil_inHeader from "./Profil_inHeader";


export default function PrivateHeader() {
const[mobileActive, setMobileActive] = useState(false);

  const handleLogout = () => signOut(auth);


  return (
    <header className={`couching-header logged-in ${mobileActive? 'mobile-active' : 'mobile-deactive'}`}>
      <div className="logo">
        <a href='/'>COUCHING TV</a> 
        <button className={`MobileHeaderSET-Btn ${mobileActive? 'mobile-active' : ''}`} onClick={() => setMobileActive((oldstate) => !oldstate)}>
            <span></span>
            <span></span>
            <span></span>
        </button>
      </div>
      <nav className={`main-nav ${mobileActive? 'mobile-nav-active' : 'mobile-nav-deactive'}`}>
        <SearchButton />
        <a href="/mylist" className="nav-link">My List</a>
        <Profil_inHeader />
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
}


