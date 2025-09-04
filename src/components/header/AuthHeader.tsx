
'use client';

import { useProfiles } from '@/context/ProfileContext';
import PublicHeader from './PublicHeader';
import PrivateHeader from './PrivateHeader';
import './headerFooter.css';

export default function AuthHeader() {
  const { user } = useProfiles();

  return user ? <PrivateHeader /> : <PublicHeader />;
}