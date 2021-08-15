import { createAction } from '@reduxjs/toolkit';

const getAllPersonesRequest = createAction('user/getPersonesRequest');
const getAllPersonesSuccess = createAction('user/getPersonesSuccess');
const getAllPersonesError = createAction('user/getPersonesError');

export default {
  getAllPersonesRequest,
  getAllPersonesSuccess,
  getAllPersonesError,
};
