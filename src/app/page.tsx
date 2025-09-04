'use client';

import './main.css'; 

import { useProfiles } from '@/context/ProfileContext';
import UserloggedIN from '../components/mainPage/UserloggedIN';
import UserloggedOUT from '@/components/mainPage/UserloggedOUT';


export default function Home() {
  const { user } = useProfiles();

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
