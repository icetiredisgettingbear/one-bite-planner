'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import koLocale from '@fullcalendar/core/locales/ko'
import TemplateLayout from '@/components/layouts/TemplateLayout'
import { useState } from 'react'
import { EventContentArg } from '@fullcalendar/core'

const CalendarTemplate = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([{ title: 'Meeting', start: new Date() }])

  // a custom render function
  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (
    <TemplateLayout>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        locale={koLocale}
        firstDay={1}
        weekends={weekendsVisible}
        events={currentEvents}
        eventContent={renderEventContent}
        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        // select={this.handleDateSelect}
        // eventContent={renderEventContent} // custom render function
        // eventClick={this.handleEventClick}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
         */
      />
    </TemplateLayout>
  )
}

export default CalendarTemplate
