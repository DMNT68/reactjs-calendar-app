import { types } from '../types/types';

export const uiOpenMdal = () => ({
  type: types.uiOpenModal,
});

export const uiCloseMdal = () => ({
  type: types.uiCloseModal,
});

export const dateSetDatesForm = (dates) => ({
  type: types.dateSetDatesForm,
  payload: dates,
});
