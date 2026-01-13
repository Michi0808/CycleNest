import { Outlet } from 'react-router-dom';
import Menubar from './../Menubar/Menubar';

export default function AppLayout() {
  return (
    <div className="flex h-screen">
      <div className="border-r-3 border-gray-200">
        <Menubar />
      </div>
      <main className="w-full px-6 pt-4">
        <Outlet />
      </main>
    </div>
  );
}
