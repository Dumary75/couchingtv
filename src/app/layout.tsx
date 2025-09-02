
import './globals.css';
import type { Metadata } from 'next';
import { SignupProvider } from '../context/SignupContext';
import { ProfileProvider } from '../context/ProfileContext';
import AuthHeader from '@/components/header/AuthHeader';
import Footer from '../components/mainPage/Footer';

export const metadata: Metadata = {
  title: 'CouchingTV',
  description: 'Watch your favorite youtube videos on CouchingTV',
  icons: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x515', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <body>
        <ProfileProvider>
          <SignupProvider>
              <AuthHeader />
                <main>{children}</main>
              <Footer />
          </SignupProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}