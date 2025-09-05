'use client';

import Link from 'next/link';
import { useProfiles } from '@/context/ProfileContext';

export default function Footer() {
const { isOpen, mobileActive } = useProfiles();

return (
    <footer className={`couching-footer  ${isOpen || mobileActive ? 'BlurryMode' : ''}`}>
      <div className="footer-links">
        <div className="footer-column">
          <Link className='footer-Link-dummy' href="#">FAQ</Link>
          <Link className='footer-Link-dummy' href="#">Investor Relations</Link>
          <Link className='footer-Link-dummy' href="#">Privacy</Link>
          <Link className='footer-Link-dummy' href="#">Speed Test</Link>
        </div>
        <div className="footer-column">
          <Link className='footer-Link-dummy' href="#">Help Center</Link>
          <Link className='footer-Link-dummy' href="#">Jobs</Link>
          <Link className='footer-Link-dummy' href="#">Cookie Preferences</Link>
          <Link className='footer-Link-dummy' href="#">Legal Notices</Link>
        </div>
        <div className="footer-column">
          <Link className='footer-Link-dummy' href="#">Account</Link>
          <Link className='footer-Link-dummy' href="#">Ways to Watch</Link>
          <Link className='footer-Link-dummy' href="#">Corporate Information</Link>
          <Link className='footer-Link-dummy' href="#">Only on CouchingTV</Link>
        </div>
        <div className="footer-column">
          <Link className='footer-Link-dummy' href="#">Media Center</Link>
          <Link className='footer-Link-dummy' href="#">Terms of Use</Link>
          <Link className='footer-Link-dummy' href="#">Contact Us</Link>
        </div>
      </div>

      <p className="footer-bottom">CouchingTV Germany</p>
    </footer>
  );
}