import './App.css';
import Calendar from './components/Calendar/Calendar';
import Cycle from './components/Cycle/Cycle';
import ItemForm from './components/ItemForm/ItemForm';
import Register from './components/Register/Register';
import Login from './components/Login/Login.jsx';
import { addEvent, getCycles } from './calendarService';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import auth from './utils/auth.js';
import PublicLayout from './components/PublicLayout/PublicLayout.jsx';
import RequireAuth from './components/RequireAuth/RequireAuth.jsx';
import AppLayout from './components/AppLayout/AppLayout.jsx';
import GoogleSync from './components/GoogleSync/GoogleSync.jsx';

function App() {
  //Events to display on the calendar
  const [events, setEvents] = useState([]);

  // Track whether the user is logged in
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  useEffect(() => {
    if (!isAuthenticated) {
      setEvents([]);
      return;
    }

    getCycles().then((data) => {
      const cycles = data?.cycles ?? [];

      const loadedEvents = cycles.flatMap((cycle) => {
        const items = cycle.items ?? [];
        return items.map((it) => ({
          title: it.title,
          start: it.start,
          end: it.end,
          allDay: true,
          backgroundColor: it.color ?? it.backgroundColor,
          borderColor: it.color ?? it.borderColor,
        }));
      });

      setEvents(loadedEvents);
    });
  }, [isAuthenticated]);

  return (
    <>
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
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Route>

        {/* Protected routes (auth required) */}
        <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
          <Route element={<AppLayout isAuthenticated={isAuthenticated} />}>
            <Route path="/calendar" element={<Calendar events={events} />} />
            <Route path="/google-sync" element={<GoogleSync />} />
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
