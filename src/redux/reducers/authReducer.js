import { createReducer } from '@reduxjs/toolkit';
import authActions from '../actions/authActions';

const initState = {
  name: '',
  accessToken: null,
  refreshToken: null,
  avatarURL: null,
  email: null,
};

export const authReducer = createReducer(initState, {
  [authActions.loginUserSuccess]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [authActions.registrationUserSuccess]: (state, action) => {
    return { ...state, ...action.payload.user };
  },
  [authActions.logoutSuccess]: () => initState,

  [authActions.getCurrentUserSuccess]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [authActions.getCurrentUserError]: () => initState,
});
