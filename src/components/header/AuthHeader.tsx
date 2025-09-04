
'use client';

import { useProfiles } from '@/context/ProfileContext';
import PublicHeader from './PublicHeader';
import PrivateHeader from './PrivateHeader';
import './headerFooter.css';

export default function AuthHeader() {
  const { user, loading } = useProfiles();

  if (loading) {
    return <div className="header-loading">Loading...</div>;
  }

  return user ? <PrivateHeader /> : <PublicHeader />;
}