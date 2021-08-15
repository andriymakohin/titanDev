import { createAction } from '@reduxjs/toolkit';

const getAllTasksRequest = createAction('persone/getTasksRequest');
const getAllTasksSuccess = createAction('persone/getTasksSuccess');
const getAllTasksError = createAction('persone/getTasksError');

export default {
  getAllTasksRequest,
  getAllTasksSuccess,
  getAllTasksError,
};
