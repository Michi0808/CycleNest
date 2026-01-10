import { useState } from 'react';
import CycleCards from '../CycleCards/CycleCards';
import Dialog from '@mui/material/Dialog';

export default function ItemForm({ setEvents }) {
  const initialState = {
    CycleTitle: '',
    title: '',
    length: '',
    color: '#ffffff',
  };

  const [state, setState] = useState(initialState);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'length') {
      value = Number(value);
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const addItem = () => {
    const { title, length, color } = state;
    setItems([...items, { title: title, length: length, color: color }]);

    //Clear the form
    setState(initialState);
  };

  const saveItem = () => {
    const testEvents = [
      { title: 'XXXX', start: new Date() },
      {
        title: 'event 2',
        date: '2026-01-02',
        backgroundColor: '#34eb64',
        borderColor: '#34eb64',
      },
    ];

    setEvents((prev) => [...prev, ...testEvents]);

    //Clear the form
    setState(initialState);
  };

  return (
    <div className="flex">
      <div className="w-full max-w-xs">
        <section>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Cycle Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="e.g., Weekly Routine"
                name="CycleTitle"
                value={state.CycleTitle}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Cycle Item
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="e.g., Workout"
                name="title"
                value={state.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Length (Days)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter the number of days"
                name="length"
                value={state.length}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Color
              </label>
              <input
                className="shadow appearance-none border rounded w-full px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="color"
                placeholder="e.g., blue"
                name="color"
                value={state.color}
                onChange={handleChange}
              />
            </div>
          </form>
        </section>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addItem}
          >
            Add Item
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={saveItem}
          >
            Save Cycle
          </button>
        </div>
      </div>
      <CycleCards list={items} />
      <Dialog open={open} onClose={handleClose}></Dialog>
    </div>
  );
}
