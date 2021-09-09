import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenMdal } from '../../actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  return (
    <button className="btn btn-primary fab" onClick={() => dispatch(uiOpenMdal())}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
