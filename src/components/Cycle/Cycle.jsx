import { Outlet } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';

export default function Cycle() {
  return (
    <div className="flex h-screen">
      <ItemList />
      <Outlet />
    </div>
  );
}
