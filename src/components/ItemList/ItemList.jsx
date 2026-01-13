import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCycles } from '../../calendarService';

export default function ItemList({ cyclesVersion }) {
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    getCycles().then((data) => {
      if (data?.cycles) {
        setCycles(data.cycles);
      } else {
        setCycles([]);
      }
    });
  }, [cyclesVersion]);

  return (
    <div>
      {/* Click to create a new cycle */}
      <Link to="/cycle/new">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          New Cycle
        </button>
      </Link>

      {/* Saved cycles list */}
      <div className="mt-4">
        {cycles.map((cycle) => (
          <div key={cycle._id} className="border rounded p-3 mb-2">
            <div className="font-bold">{cycle.cycleTitle}</div>
            <div className="text-sm text-gray-600">{cycle.startDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
