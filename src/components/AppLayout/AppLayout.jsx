import { Outlet } from 'react-router-dom';
import Menubar from './../Menubar/Menubar';

export default function AppLayout({ isAuthenticated }) {
  const handleGoogleSync = async () => {
    console.log('Google Sync clicked');
  };

  return (
    <div className="flex h-screen">
      <Menubar onGoogleSync={handleGoogleSync} />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
