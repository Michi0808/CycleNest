import './App.css';
import Calendar from './components/calendar/calendar';
import { Sidebar, Menu, MenuItem, Submenu, Logo } from 'react-mui-sidebar';
import AccessAlarms from '@mui/icons-material/AccessAlarms';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { Link } from 'react-router-dom';
import { gapi } from 'gapi-script';

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
        <Sidebar width={'270px'}>
          <Logo
            component={Link}
            href="/"
            img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png"
          >
            AdminMart
          </Logo>
          <Menu subHeading="HOME">
            <MenuItem
              icon={<CottageOutlinedIcon />}
              component={Link}
              link="/tes"
              badge={true}
              isSelected={true}
            >
              {' '}
              {/* Set badge to boolean true */}
              Modern
            </MenuItem>
            <MenuItem icon={<AccessAlarms />} component={Link} link="/test">
              eCommerce
            </MenuItem>
            <MenuItem component={Link} link="/ana">
              Analytical
            </MenuItem>
          </Menu>
          <Menu subHeading="APPS">
            <MenuItem>Chat</MenuItem>
            <MenuItem>Calendar</MenuItem>
          </Menu>
          <Menu subHeading="OTHERS">
            <Submenu title="Menu Level">
              <MenuItem>Post</MenuItem>
              <MenuItem>Details</MenuItem>
              <Submenu title="Level 2">
                <MenuItem>new</MenuItem>
                <MenuItem>Hello</MenuItem>
              </Submenu>
            </Submenu>

            <MenuItem>Chip</MenuItem>
            <MenuItem
              target="_blank"
              component={Link}
              link="https://google.com"
            >
              External Link
            </MenuItem>
          </Menu>
        </Sidebar>
        <Calendar />
      </div>
    </>
  );
}

export default App;
