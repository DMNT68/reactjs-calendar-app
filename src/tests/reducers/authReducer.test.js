import { authReducer } from '../../reducer/authReducer';
import { types } from '../../types/types';

const initState = {
  checking: true,
  // uid:null,
  // name: null
};

describe('Pruebas en el authReducer', () => {
  test('Debe de retornar el estado por defecto', () => {
    const state = authReducer(initState, {});

    expect(state).toEqual(initState);
  });

  test('debe de autenticar el usuario', () => {
    const action = {
      type: types.authStartLogin,
      payload: {
        uid: 123,
        name: 'Andres',
      },
    };

    const state = authReducer(initState, action);
    
    expect(state).toEqual( { checking: false, uid: 123, name: 'Andres' })
  });
});
