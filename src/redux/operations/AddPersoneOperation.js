
import addPersoneActions from '../../components/AddPersoneForm/AddPersoneActions';
import { BACKEND_URI } from '../../constants.js';
import { refreshJWTmiddleware } from '../refresh';

const addPersone = (name, gender) => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();

  dispatch(addPersoneActions.addPersoneRequest());
  const url = `${BACKEND_URI}/persone/addpersone`;
  refreshJWTmiddleware(
    {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + acToken,
      },
      url,
      data: {
        name,
        gender,
      },
    },
    refreshToken,
    dispatch,
  )
    .then((response) => {
      dispatch(addPersoneActions.addPersoneSuccess(response.data));
    })
    .catch((error) => addPersoneActions.addPersoneError(error));
};

export default {
  addPersone,
};
