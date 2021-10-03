import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';

import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import moment from 'moment';
import { eventClearActive, eventStartUpdate, eventStartAddNew } from '../../../actions/events';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActive: jest.fn(),
  eventStartAddNew: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola mundo',
      notes: 'algunas notas',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: '123',
    name: 'andres',
  },
  ui: {
    modalOpen: true,
    dates: {
      start: '2021-10-02T05:00:00.000Z',
      end: '2021-10-02T06:00:00.000Z',
    },
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Pruebas en <CalendarModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('debe de mostrar el modal', () => {
    // expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('debe de llamar la accion de actualizar y cerrar el modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActive).toHaveBeenCalled();
  });

  test('debe de mostrar error si falta el título', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  });

  test('debe de crear un nuevo evento', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: '123',
        name: 'andres',
      },
      ui: {
        modalOpen: true,
        dates: {
          start: '2021-10-02T05:00:00.000Z',
          end: '2021-10-02T06:00:00.000Z',
        },
      },
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({ end: expect.anything(), notes: '', start: expect.anything(), title: 'Hola pruebas' });
    expect(eventClearActive).toHaveBeenCalled();
  });

  test('debe de validar las fechas', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas',
      },
    });

    const hoy = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenLastCalledWith('Error', 'La fecha fin debe de ser mayor a la fecha inicio', 'error');
  });
});
