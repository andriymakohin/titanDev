import axios from 'axios';
import authActions from '../actions/authActions';
import { BACKEND_URI } from '../../constants.js';
import { refreshJWTmiddleware } from '../refresh';

const setAuthToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const unsetAuthToken = (token) => {
  axios.defaults.headers.common.Authorization = ' ';
};

const loginUser = (user) => (dispatch) => {
  dispatch(authActions.loginUserRequest());

  axios
    .post(`${BACKEND_URI}/auth/login`, user)
    // .post(`http:localhost:1717/api/auth/login`, user)

    .then((response) => {
      setAuthToken(response.data.accessToken);
      dispatch(authActions.loginUserSuccess(response.data));
    })
    .catch((error) => dispatch(authActions.loginUserError(error)));
};

const registrationUser = (user) => (dispatch) => {
  dispatch(authActions.registrationUserRequest());
  axios
    .post(`${BACKEND_URI}/auth/register`, user)
    .then((response) => {
      setAuthToken(response.data.accessToken);
      dispatch(authActions.registrationUserSuccess(response.data));
    })
    .catch((error) => dispatch(authActions.registrationUserError(error)));
};
const logOut = () => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();
  if (!acToken) {
    return;
  }
  // setAuthToken(acToken);

  dispatch(authActions.logoutRequest());

  // axios
  //   .delete(`${BACKEND_URI}/auth/logout`)
  const url = `${BACKEND_URI}/auth/logout`;
  refreshJWTmiddleware(
    {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + acToken,
      },
      url,
    },
    refreshToken,
    dispatch,
  )
    .then(() => {
      unsetAuthToken();
      dispatch(authActions.logoutSuccess());
    })
    .catch((error) => dispatch(authActions.logoutError(error)));
};

const getCurrentUser = () => (dispatch, getState) => {
  const {
    user: { accessToken: accessToken, refreshToken },
  } = getState();

  if (!accessToken) {
    return;
  }
  dispatch(authActions.getCurrentUserRequest());

  // axios
  //   .get(`${BACKEND_URI}/auth/current`)
  const url = `${BACKEND_URI}/auth/current`;
  // const url = `http://localhost:1717/api/auth/current`;

  refreshJWTmiddleware(
    {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      url,
    },
    refreshToken,
    dispatch,
  )
    .then((response) => {
      return dispatch(authActions.getCurrentUserSuccess(response.data));
    })

    .catch((error) => dispatch(authActions.getCurrentUserError(error)));
};

const setTokenState = (accessToken) => (dispatch) => {
  dispatch(authActions.loginUserSuccess(accessToken));
};

export default {
  loginUser,
  registrationUser,
  logOut,
  getCurrentUser,
  setTokenState,
};
