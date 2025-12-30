const baseURL = 'http://localhost:3000';

const calendarID = import.meta.env.VITE_CALENDAR_ID;
const accessToken = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN;

export async function addEvent(event) {
  try {
    const body = {
      event,
      accessToken,
    };

    const response = await fetch(`${baseURL}/integration/${calendarID}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
