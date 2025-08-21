'use client';

import './main.css'; 

import { useAuth } from '../hooks/useAuth';
import UserloggedIN from '../components/mainPage/UserloggedIN';
import UserloggedOUT from '@/components/mainPage/UserloggedOUT';


export default function Home() {
  const { user } = useAuth();

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
