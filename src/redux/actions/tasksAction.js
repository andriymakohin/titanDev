import { createAction } from '@reduxjs/toolkit';

const getAllTasksRequest = createAction('tasks/getAllTasksRequest');
const getAllTasksSuccess = createAction('present/getAllTasksSuccess');
const getAllTasksError = createAction('present/getAllTasksError');

const confirmTaskRequest = createAction('tasks/confirmTask');
const confirmTaskSuccess = createAction('present/confirmTask');
const confirmTaskError = createAction('present/confirmTask');

const notconfirmTaskRequest = createAction('tasks/confirmTask');
const notconfirmTaskSuccess = createAction('tasks/confirmTask');
const notconfirmTaskError = createAction('tasks/notconfirmTask');

const addTaskRequest = createAction('tasks/addRequest');
const addTaskSuccess = createAction('tasks/addSucces');
const addTaskError = createAction('tasks/addError');

const deleteTaskRequest = createAction('tasks/deleteRequest');
const deleteTaskSuccess = createAction('tasks/deleteSucces');
const deleteTaskError = createAction('tasks/deleteError');

const repeatTaskRequest = createAction('tasks/repeat/request');
const repeatTaskSuccess = createAction('tasks/repeat/success');
const repeatTaskError = createAction('tasks/repeat/error');

const updateTaskRequest = createAction('tasks/updateRequest');
const updateTaskSuccess = createAction('tasks/updateSucces');
const updateTaskError = createAction('tasks/updateError');

export default {
  getAllTasksRequest,
  getAllTasksSuccess,
  getAllTasksError,
  confirmTaskRequest,
  confirmTaskSuccess,
  confirmTaskError,
  notconfirmTaskRequest,
  notconfirmTaskSuccess,
  notconfirmTaskError,
  addTaskRequest,
  addTaskSuccess,
  addTaskError,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskError,
  repeatTaskRequest,
  repeatTaskSuccess,
  repeatTaskError,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskError,
};
