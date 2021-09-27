import { types } from '../../types/types';

describe('Pruebas en Types', () => {
  test('los types deven de ser iguales', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',

      dateSetDatesForm: '[date] Set dates form',
      dateRestarDatesForm: '[date] Restar dates form',

      eventSetActive: '[event] Set Active',
      eventLogout: '[event] Logout Events',

      eventStartAddNew: '[event Start add new]',
      eventAddNew: '[event] add new',
      eventClearActive: '[event] Clear active event',
      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deleted',
      eventLoaded: '[event] Evenst loaded',

      authCheking: '[auth] Cheking login state',
      authChekingFinish: '[auth] Finish Cheking login state',
      authStartLogin: '[auth] Start login',
      authStartRegister: '[auth] Start Register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    });
  });
});
