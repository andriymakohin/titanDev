import getAllComplitedTasksActions from '../actions/getAllComplitedTasks';
import { BACKEND_URI } from '../../constants.js';
import { refreshJWTmiddleware } from '../refresh';

const getTasks = (personeId) => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();
  if (!acToken) {
    return;
  }
  // token.set(acToken);
  dispatch(getAllComplitedTasksActions.getAllTasksRequest());
  const url = `${BACKEND_URI}/tasks/${personeId}`;
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
    .then((response) => {
      return dispatch(
        getAllComplitedTasksActions.getAllTasksSuccess(response.data),
      );
    })
    .catch((error) => console.log('error: getAllComplitedTasksOperation'));
};

export default {
  getTasks,
};
