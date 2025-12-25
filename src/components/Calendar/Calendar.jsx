import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import React from 'react'

const events = [
  { title: 'Meeting', start: new Date() }
]

export default function Calendar() {
  return (
    <div>
      <h1>Calendar Test</h1>
      <FullCalendar
        plugins={ [dayGridPlugin] }
        initialView='dayGridMonth'
        weekwnds={ false }
        events={ events }
        eventContent={ renderEventContent }
      />
    </div>
  )
}

function renderEventContent (eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}