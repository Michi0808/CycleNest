import { useState } from 'react';
import CycleCards from '../CycleCards/CycleCards';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { save } from '../../calendarService';
import { useOutletContext } from 'react-router-dom';

export default function ItemForm({ setEvents }) {
  const initialState = {
    // Item title
    title: '',
    // Item duration
    length: '',
    color: '#55b2fa',
  };

  const { bumpCycles } = useOutletContext();
  const [state, setState] = useState(initialState);
  const [cycleTitle, setCycleTitle] = useState('');
  const [items, setItems] = useState([]);
  const isCycleTitleLocked = items.length > 0;
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

    setState({ title: '', length: '', color: '#55b2fa' });
  };

  const saveItem = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (event) => {
    event.preventDefault();

    // Get the start date from the dialog form
    const formData = new FormData(event.currentTarget);
    const { date, repeatCount } = Object.fromEntries(formData.entries());
    const repeats = Math.max(1, Number(repeatCount || 1));

    // Work with date-only strings in YYYY-MM-DD (no timezone/time parts)
    const addDays = (yyyyMMdd, days) => {
      const [y, m, d] = yyyyMMdd.split('-').map(Number);
      const dt = new Date(Date.UTC(y, m - 1, d));
      dt.setUTCDate(dt.getUTCDate() + days);
      return dt.toISOString().slice(0, 10);
    };

    // Cursor for chaining item start/end dates
    let cursor = date;
    const originalStartDate = date;
    let newItems = [];

    for (const item of items) {
      const startDate = cursor;
      const endDate = addDays(cursor, item.length);

      newItems.push({
        title: item.title,
        start: startDate,
        end: endDate,
        length: Number(item.length),
        allDay: true,
        backgroundColor: item.color,
        borderColor: item.color,
      });

      cursor = endDate;
    }

    // 1 cycle length in days (= how much to shift per repeat)
    const cycleLengthDays = items.reduce(
      (sum, it) => sum + Number(it.length || 0),
      0
    );

    // Make N repeats (including the first one)
    let repeatedEvents = [];

    for (let r = 0; r < repeats; r++) {
      const shift = cycleLengthDays * r;

      for (const ev of newItems) {
        repeatedEvents.push({
          ...ev,
          start: addDays(ev.start, shift),
          end: addDays(ev.end, shift),
        });
      }
    }

    const cycle = {
      cycleTitle,
      startDate: originalStartDate,
      items: repeatedEvents,
    };
    const res = await save(cycle);
    if (res.error) {
      alert(`${res.message}`);
      return;
    } else {
      // Add the generated items to the calendar
      setEvents((prev) => [...prev, ...repeatedEvents]);

      bumpCycles();

      setItems([]);

      //Clear the form
      setCycleTitle('');
      setState(initialState);
    }

    handleClose();
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
                value={cycleTitle}
                disabled={isCycleTitleLocked}
                onChange={(e) => setCycleTitle(e.target.value)}
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set a start date and a repeat count</DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirm} id="confirm-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="date"
              label="Start date"
              slotProps={{ inputLabel: { shrink: true } }}
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="repeatCount"
              name="repeatCount"
              label="Repeat count"
              slotProps={{ inputLabel: { shrink: true } }}
              type="number"
              fullWidth
              variant="standard"
              defaultValue={4}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="confirm-form">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
