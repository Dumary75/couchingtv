
'use client';

import { useAuth } from '../../hooks/useAuth';
import PublicHeader from './PublicHeader';
import PrivateHeader from './PrivateHeader';
import './headerFooter.css';

export default function AuthHeader() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="header-loading">Loading...</div>;
  }

  return user ? <PrivateHeader /> : <PublicHeader />;
}