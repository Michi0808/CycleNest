import './App.css';
import Calendar from './components/Calendar/Calendar';
import Menubar from './components/Menubar/Menubar';
import Cycle from './components/Cycle/Cycle';
import ItemForm from './components/ItemForm/ItemForm';
import Register from './components/Register/Register';
import { addEvent } from './calendarService';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import auth from './utils/auth.js';

function App() {
  // const event = {
  //   summary: 'Hello World',
  //   location: '',
  //   start: {
  //     dateTime: '2025-12-31T09:00:00-07:00',
  //     timeZone: 'America/Los_Angeles',
  //   },
  //   end: {
  //     dateTime: '2025-12-31T17:00:00-07:00',
  //     timeZone: 'America/Los_Angeles',
  //   },
  //   recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
  //   attendees: [],
  //   reminders: {
  //     useDefault: false,
  //     overrides: [
  //       { method: 'email', minutes: 24 * 60 },
  //       { method: 'popup', minutes: 10 },
  //     ],
  //   },
  // };

  //Events to display on the calendar
  const [events, setEvents] = useState([]);

  // Track whether the user is logged in
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <>
      <div className="flex h-screen">
        {/* API Test */}
        {/* <button
          type="button"
          onClick={() => {
            addEvent(event);
          }}
        >
          Add Event
        </button> */}

        {/* Navigation */}
        <Menubar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Calendar events={events} />} />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/cycle" element={<Cycle />}>
            <Route index element={<div></div>}></Route>
            <Route
              path="new"
              element={<ItemForm setEvents={setEvents} />}
            ></Route>
            <Route path=":cycleId" element={<div></div>}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
