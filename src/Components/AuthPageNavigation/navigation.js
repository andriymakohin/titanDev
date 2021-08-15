/* eslint-disable import/no-anonymous-default-export */
import AuthPage from '../AuthPage/AuthPage';
import SiginUpPage from '../SiginUpPage/SiginUpPage';

export default {
  // login: {
  //   path: '/login',
  //   component: ,
  // },
  register: {
    path: '/register',
    component: SiginUpPage,
  },
  auth: {
    path: '/auth',
    component: AuthPage,
  },
};
