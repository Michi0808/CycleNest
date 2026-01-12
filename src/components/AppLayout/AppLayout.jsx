import { Outlet } from 'react-router-dom';
import Menubar from './../Menubar/Menubar';

export default function AppLayout({ isAuthenticated }) {
  return (
    <div className="flex h-screen">
      <Menubar isAuthenticated={isAuthenticated} />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
