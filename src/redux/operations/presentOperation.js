import action from '../actions/presentAction';
import { BACKEND_URI } from '../../constants.js';
import { refreshJWTmiddleware } from '../refresh';

const addPresent = (fD) => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();
  if (!acToken) {
    return;
  }

  dispatch(action.addPresentRequest());
  const url = `${BACKEND_URI}/presents/`;
  refreshJWTmiddleware(
    {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + acToken,
      },
      url,
      data: fD,
    },
    refreshToken,
    dispatch,
  )
    .then((res) => dispatch(action.addPresentSuccess(res.data)))
    .catch((error) => dispatch(action.addPresentError(error)));
};

const updatePresent = (fD, idPresent) => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();
  if (!acToken) {
    return;
  }
  dispatch(action.updatePresentRequest());
  const url = `${BACKEND_URI}/presents/${idPresent}`;
  console.log('url',url)
  refreshJWTmiddleware(
    {
      method: 'patch',
      headers: {
        Authorization: 'Bearer ' + acToken,
      },
      url,
      data: fD,
    },
    refreshToken,
    dispatch,
  )
    .then((res) => {
      console.log(res.data);
      return dispatch(action.updatePresentSuccess(res.data));
    })
    .catch((error) => dispatch(action.updatePresentError(error)));
};

const removePresent = (id) => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();
  if (!acToken) {
    return;
  }
  dispatch(action.removePresentRequest());
  const url = `${BACKEND_URI}/presents/${id}`;
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
    .then(() => dispatch(action.removePresentSuccess(id)))
    .catch((error) => console.log(error));
};

const getAllPresents = () => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();
  if (!acToken) {
    return;
  }

  dispatch(action.getAllPresentRequest());
  const url = `${BACKEND_URI}/presents`;
  refreshJWTmiddleware(
    {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + acToken,
      },
      url,
    },
    refreshToken,
    dispatch,
  )
    .then((res) => {
      return dispatch(action.getAllPresentSuccess(res.data));
    })
    .catch((error) => dispatch(action.getAllPresentError(error)));
};

const buyPresentById = (idPresent, reward, personeId) => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();
  if (!acToken) {
    return;
  }

  dispatch(action.buyPresentRequest());
  const url = `${BACKEND_URI}/presents/buy/${idPresent}`;
  refreshJWTmiddleware(
    {
      method: 'patch',
      headers: {
        Authorization: 'Bearer ' + acToken,
      },
      url,
    },
    refreshToken,
    dispatch,
  )
    .then((response) => {
      const refreshData = {
        newReward: reward,
        personeId: personeId,
      };
      return dispatch(
        action.buyPresentSuccess(refreshData),
        dispatch(action.removePresentSuccess(idPresent)),
      );
    })
    .catch((error) => dispatch(action.buyPresentError(error)));
};

export default {
  addPresent,
  updatePresent,
  removePresent,
  getAllPresents,
  buyPresentById,
};
