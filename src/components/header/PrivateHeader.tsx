
'use client';

import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivateHeader() {
const [showSearch, setShowSearch] = useState(false);
const [query, setQuery] = useState('');
const router = useRouter();

const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
   setQuery(e.target.value);
};


const startSearch = () => {
  setShowSearch(false);
  router.push(`/search?query=${encodeURIComponent(query)}`); 
}


const handleLogout = () => {
    signOut(auth);
  };


const handleProfileClick = () => {
    router.push('/profil');
  };


  return ( 
        <header className="couching-header logged-in">
          <div className="logo"><a href='/'>COUCHING TV</a></div>
          <nav className="main-nav">

            {showSearch ? 
            <>
                <button onClick={startSearch} className="requestSender">Search</button>
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="search-input"
                /> 
                
            </>
                : 
              <button onClick={() => setShowSearch(true)} className="search-btn">
                Search 
              </button>}

            <a href="#" className="nav-link">My List</a>
            <a className="nav-link" onClick={handleProfileClick}>Profil</a>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </nav>
        </header>
  );
}