import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import { startChecking, startLogin, startRgister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);
let token = '';

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones Auth', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('startLogin correcto ', async () => {
    await store.dispatch(startLogin('andressalgado1@gmail.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: types.authStartLogin, payload: { uid: '61437ae2d564856d4e6230ab', name: 'Andres' } });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));

    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    token = localStorage.setItem.mock.calls[0][1];
    // console.log(localStorage.setItem.mock.calls[0][1]);
  });

  test('startLogin incorrecto', async () => {
    await store.dispatch(startLogin('andressalg@gmail.com', '123456'));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'el usuario no existe con ese correo', 'error');

    await store.dispatch(startLogin('andressalgado1@gmail.com', '123453246'));
    actions = store.getActions();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'password incorrecto', 'error');
  });

  test('startRegister correcto', async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 1234,
          name: 'carlos',
          token: '1234asdf',
        };
      },
    }));

    await store.dispatch(startRgister('test@gmail.com', '123456', 'test'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: types.authStartLogin, payload: { uid: 1234, name: 'carlos' } });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', '1234asdf');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('startCheking correcto', async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 1234,
          name: 'carlos',
          token: '1234asdf',
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.authStartLogin, payload: { uid: 1234, name: 'carlos' } });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '1234asdf');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });
});
