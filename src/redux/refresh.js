import axios from 'axios';
import authAction from './actions/authActions';
import { BACKEND_URI } from '../constants';

export const refreshJWTmiddleware = async (req, refreshToken, dispatch) => {
  try {
    return await axios(req);
  } catch (error) {
    axios.defaults.headers.common.Authorization = `Bearer ` + refreshToken;
    const tokens = await axios
      .post(`${BACKEND_URI}/api/token/token_refresh/`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
    if (tokens) {
      dispatch(authAction.loginUserSuccess(tokens));
    }
    req.headers.Authorization = `Bearer ` + tokens.accessToken;
    const result = await axios(req);
    return result;
  }
};
