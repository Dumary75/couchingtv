'use client';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

import SearchButton from "./SearchButton";
import Profil_inHeader from "./Profil_inHeader";
import Profi_inHeader_MOBILE from './Profil_inHeader_MOBILE';


export default function PrivateHeader() {
const[mobileActive, setMobileActive] = useState(false);

  const handleLogout = () => signOut(auth);


  return (
    <header className={`couching-header logged-in ${mobileActive? 'mobile-active' : 'mobile-deactive'}`}>
      <div className="logo">
        <a href='/'>COUCHING TV</a> 
            <div className='Mobile-Header_btns'>
              <button className={`MobileHeaderSET-Btn ${mobileActive? 'mobile-active' : ''}`} onClick={() => setMobileActive((oldstate) => !oldstate)}>
                  <span></span>
                  <span></span>
                  <span></span>
              </button>
              <Profi_inHeader_MOBILE />
           </div>
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


