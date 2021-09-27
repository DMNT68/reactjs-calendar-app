import React from 'react';
import { useDispatch } from 'react-redux';
import { eventClearActive } from '../../actions/events';
import { uiOpenMdal } from '../../actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    console.log('fab')
    dispatch(uiOpenMdal());
    dispatch(eventClearActive());
  };

  return (
    <button className="btn btn-primary fab" onClick={handleOpenModal}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
