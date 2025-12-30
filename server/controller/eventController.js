import { google } from 'googleapis';

export default async function sendEvent(req, res) {
  try {
    const { calendarID } = req.params;
    const { event, accessToken } = req.body;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.insert({
      calendarId: calendarID,
      requestBody: event,
    });

    console.log('Event created:', response.data);
    res.status(201).json({ message: 'event is sent to Google Calendar' });
  } catch (error) {
    console.log('error', error);
    res.sendStatus(500);
  }
}

// function initiate() {
//   gapi.client
//     .request({
//       path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
//       method: 'POST',
//       body: event,
//       headers: {
//         'Content-type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     .then(
//       (response) => {
//         return [true, response];
//       },
//       function (err) {
//         console.log(err);
//         return [false, err];
//       }
//     );
// }
// gapi.load('client', initiate);
