import { createAction } from '@reduxjs/toolkit';

const addPersoneRequest = createAction('persones/addRequest');
const addPersoneSuccess = createAction('persones/addSuccess');
const addPersoneError = createAction('persones/addError');

export default {
  addPersoneRequest,
  addPersoneSuccess,
  addPersoneError,
};
