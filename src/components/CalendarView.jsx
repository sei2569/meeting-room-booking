import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ROOMS } from '../data/mockData';

const CalendarView = ({ bookings, onEventClick, onDateSelect }) => {
  const events = bookings.map((booking) => {
    const room = ROOMS.find((r) => r.id === booking.roomId);
    return {
      id: booking.id,
      title: `${room?.name}: ${booking.title}`,
      start: booking.start,
      end: booking.end,
      backgroundColor: room?.color || '#6894CE',
      borderColor: room?.color || '#6894CE',
      extendedProps: { ...booking },
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        height="auto"
        eventClick={(info) => onEventClick(info.event.extendedProps)}
        select={(info) => onDateSelect(info)}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false
        }}
      />
      <style>{`
        .fc {
          --fc-button-bg-color: #6894CE;
          --fc-button-border-color: #6894CE;
          --fc-button-hover-bg-color: #5a83b8;
          --fc-button-hover-border-color: #5a83b8;
          --fc-button-active-bg-color: #4a72a8;
          --fc-button-active-border-color: #4a72a8;
          --fc-event-bg-color: #6894CE;
          --fc-event-border-color: #6894CE;
          --fc-today-bg-color: rgba(104, 148, 206, 0.05);
        }
        .fc-toolbar-title {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          color: #1f2937;
        }
        .fc-button {
          font-weight: 500 !important;
          text-transform: capitalize !important;
        }
      `}</style>
    </div>
  );
};

export default CalendarView;
