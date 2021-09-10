import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { dateSetDatesForm, uiOpenMdal } from '../../actions/ui';
import { eventClearActive, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    dispatch(uiOpenMdal());
  };

  const onSelecteEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const onSelectSlot = (e) => {
    console.log(e);
    if (e.action === 'doubleClick') {
      dispatch(uiOpenMdal());
      dispatch(dateSetDatesForm(e.start));
    }
    dispatch(eventClearActive());
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
      <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" messages={messages} eventPropGetter={eventStyleGetter} onDoubleClickEvent={onDoubleClick} onSelectEvent={onSelecteEvent} onView={onViewChange} onSelectSlot={onSelectSlot} selectable={true} view={lastView} components={{ event: CalendarEvent }} />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};
