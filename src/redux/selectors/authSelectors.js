const getUser = (state) => state.user;
const onAuthUser = (state) => state.user.accessToken;
export default {
  getUser,
  onAuthUser
};
