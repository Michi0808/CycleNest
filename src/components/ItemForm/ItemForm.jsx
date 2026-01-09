import { useState } from 'react';

export default function ItemForm() {
  const initialState = {
    CycleTitle: '',
    title: '',
    length: 1,
    color: '',
  };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { email, password, firstName, lastName } = state;
    // const user = { email, password, firstName, lastName };
    // const res = await apiService.register(user);
    // if (res.error) {
    //   alert(`${res.message}`);
    //   setState(initialState);
    // } else {
    //   props.setIsAuthenticated(true);
    //   auth.login(() => navigate('/profile'));
    // }
  };

  return (
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
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
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
        >
          Add Item
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Save Cycle
        </button>
      </div>
    </div>
  );
}
