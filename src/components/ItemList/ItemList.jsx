import { Link } from 'react-router-dom';

export default function ItemList() {
  return (
    <div>
      <Link to="/cycle/new">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          New Cycle
        </button>
      </Link>
    </div>
  );
}
