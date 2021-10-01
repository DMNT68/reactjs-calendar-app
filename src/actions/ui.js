import { types } from '../types/types';

export const uiOpenModal = () => ({
  type: types.uiOpenModal,
});

export const uiCloseModal = () => ({
  type: types.uiCloseModal,
});

export const dateSetDatesForm = (dates) => ({
  type: types.dateSetDatesForm,
  payload: dates,
});

export const  dateRestarDatesForm = () => ({ type: types.dateRestarDatesForm });
