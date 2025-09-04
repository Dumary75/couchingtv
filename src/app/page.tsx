'use client';

import './main.css'; 

import { useProfiles } from '@/context/ProfileContext';
import UserloggedIN from '../components/mainPage/UserloggedIN';
import UserloggedOUT from '@/components/mainPage/UserloggedOUT';


export default function Home() {
  const { user, loading } = useProfiles();

if (loading) {
    return <div className="loading-screen">
              <div className="spinner"></div>
              <p className="loading-text">Loading User...</p>
           </div>; 
  }

  return (
    <div className="couching-container">
      {user ? (
            <UserloggedIN />
      ) : (
            <UserloggedOUT />
      )}
    </div>
  );
};
