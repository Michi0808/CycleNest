import './App.css';
import Calendar from './components/Calendar/Calendar';
import Cycle from './components/Cycle/Cycle';
import ItemForm from './components/ItemForm/ItemForm';
import Register from './components/Register/Register';
import { addEvent } from './calendarService';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import auth from './utils/auth.js';
import PublicLayout from './components/PublicLayout/PublicLayout.jsx';
import RequireAuth from './components/RequireAuth/RequireAuth.jsx';
import AppLayout from './components/AppLayout/AppLayout.jsx';

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
      {/* API Test */}
      {/* <button
          type="button"
          onClick={() => {
            addEvent(event);
          }}
        >
          Add Event
        </button> */}

      {/* Routes */}
      <Routes>
        {/* Entry route: redirect to the right start page based on auth state */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/calendar" replace />
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />

        {/* Public routes (no sidebar/layout) */}
        <Route element={<PublicLayout />}>
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          {/* Login here */}
        </Route>

        {/* Protected routes (auth required) */}
        <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
          <Route element={<AppLayout isAuthenticated={isAuthenticated} />}>
            <Route path="/calendar" element={<Calendar events={events} />} />
            <Route path="/cycle" element={<Cycle />}>
              <Route index element={<div></div>}></Route>
              <Route
                path="new"
                element={<ItemForm setEvents={setEvents} />}
              ></Route>
              <Route path=":cycleId" element={<div></div>}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
