import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es');
const localizer = momentLocalizer(moment);
const events = [
  {
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar pastel',
    user: {
      _id: '123',
      name: 'Andrés',
    },
  },
];

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    console.log(e);
  };

  const onSelecteEvent = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0px',
      opacity: 'block',
      color: 'white',
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" messages={messages} eventPropGetter={eventStyleGetter} onDoubleClickEvent={onDoubleClick} onSelectEvent={onSelecteEvent} onView={onViewChange} view={lastView} components={{ event: CalendarEvent }} />
      <CalendarModal /> 
    </div>
  );
};
