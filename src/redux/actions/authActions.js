import { createAction } from '@reduxjs/toolkit';

const registrationUserRequest = createAction('user/registration/request');
const registrationUserSuccess = createAction('user/registration/success');
const registrationUserError = createAction('user/registration/error');

const loginUserRequest = createAction('user/login/request');
const loginUserSuccess = createAction('user/login/success');
const loginUserError = createAction('user/login/error');

const logoutRequest = createAction('auth/logoutRequest');
const logoutSuccess = createAction('auth/logoutSuccess');
const logoutError = createAction('auth/logoutError');

const getCurrentUserRequest = createAction('user/getCurrentUserRequest');
const getCurrentUserSuccess = createAction('user/getCurrentUserSuccess');
const getCurrentUserError = createAction('user/getCurrentUserError');


export default {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  registrationUserRequest,
  registrationUserSuccess,
  registrationUserError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError
};
