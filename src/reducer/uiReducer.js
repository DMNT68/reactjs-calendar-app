import moment from 'moment';

import { types } from '../types/types';

const now = moment().minutes(0).seconds(0);
const nowPlus1 = now.clone().add(1, 'hours');

const initialState = {
  modalOpen: false,
  dates: {
    start: now,
    end: nowPlus1,
  },
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return { ...state, modalOpen: true };

    case types.uiCloseModal:
      return { ...state, modalOpen: false };

    case types.dateSetDatesForm:
      return {
        ...state,
        dates: {
          start: moment(action.payload).minutes(0).seconds(0),
          end: moment(action.payload).minutes(0).seconds(0).add(1, 'hours'),
        },
      };

    case types.dateRestarDatesForm:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
