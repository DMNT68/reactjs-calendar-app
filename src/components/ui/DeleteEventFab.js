import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  
  const handleDeleted = () => {
    dispatch(eventDeleted());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDeleted}>
      <i className="far fa-trash-alt mr-2"></i>
      <span>Borrar evento</span>
    </button>
  );
};
