import axios from 'axios';
import getPersonesActions from '../actions/getAllPersones';
import { BACKEND_URI } from '../../constants.js';
import { refreshJWTmiddleware } from '../refresh';
// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

const getPersones = () => (dispatch, getState) => {
  const {
    user: { accessToken: acToken, refreshToken },
  } = getState();
  if (!acToken) {
    return;
  }
  // token.set(acToken);
  dispatch(getPersonesActions.getAllPersonesRequest());
  // axios
  //   .get(`${BACKEND_URI}/persone/allPersones`)
  const url = `${BACKEND_URI}/persone/allPersones`;
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
      // token.set(response.data.token);
      dispatch(getPersonesActions.getAllPersonesSuccess(response.data));
    })
    .catch((error) => console.log('error: getPersonesOperation'));
};

export default {
  getPersones,
};
