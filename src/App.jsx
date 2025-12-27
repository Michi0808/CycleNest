import './App.css';
import Calendar from './components/calendar/calendar';
import { gapi } from 'gapi-script';
import Menubar from './components/Menubar/Menubar';

function App() {
  const calendarID = import.meta.env.VITE_CALENDAR_ID;
  const accessToken = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN;

  const event = {
    summary: 'Hello World',
    location: '',
    start: {
      dateTime: '2025-12-27T09:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2025-12-27T17:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  const addEvent = (calendarID, event) => {
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          method: 'POST',
          body: event,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            return [true, response];
          },
          function (err) {
            console.log(err);
            return [false, err];
          }
        );
    }
    gapi.load('client', initiate);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* API Test */}
        <button type="button" onClick={() => addEvent(calendarID, event)}>
          Add Event
        </button>
        <Menubar />
        <Calendar />
      </div>
    </>
  );
}

export default App;
