import { Outlet } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import { useState } from 'react';

export default function Cycle() {
  const [cyclesVersion, setCyclesVersion] = useState(0);

  const bumpCycles = () => {
    setCyclesVersion((v) => v + 1);
  };

  return (
    <div className="flex h-screen gap-12">
      <ItemList cyclesVersion={cyclesVersion} />
      <Outlet context={{ bumpCycles }} />
    </div>
  );
}
