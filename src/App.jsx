import './App.css';
import Calendar from './components/calendar/calendar';
import Menubar from './components/Menubar/Menubar';
import { addEvent } from './calendarService';

function App() {
  const event = {
    summary: 'Hello World',
    location: '',
    start: {
      dateTime: '2025-12-31T09:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2025-12-31T17:00:00-07:00',
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

  return (
    <>
      <div className="flex h-screen">
        {/* API Test */}
        <button
          type="button"
          onClick={() => {
            addEvent(event);
          }}
        >
          Add Event
        </button>
        <Menubar />
        <Calendar />
      </div>
    </>
  );
}

export default App;
