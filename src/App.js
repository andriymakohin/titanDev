import React, { useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies} from 'react-cookie';
import queryString from 'query-string';

import SiginUpPage from './components/SiginUpPage/SiginUpPage';
import AuthPage from './components/AuthPage/AuthPage';
import Main from './components/MainPage/MainPage.js';
import PersoneTaskPage from './components/PersoneTaskPage/PersoneTaskPage';
import PrivateRouter from './components/MainPage/PrivateRoutes';
import PresentPage from './components/PresentsPage/PresentPage';
import TasksPage from './components/TasksPage';

import SignInPage from './components/SignInPage/SignInPage';

import './assets/fonts.css';
import './assets/basic.css';
import authOperation from './redux/operations/authOperations';
import taskOperations from './redux/operations/tasksOperation';
import presentOperations from './redux/operations/presentOperation';
import personerenOperation from './redux/operations/getAllPersones';
import Layout from './components/Layout/Layout';

const App = ({
  userToken,
  onGetCurrentUser,
  getAllTasks,
  getAllPresents,
  getAllPersone,
  setTokenState,
}) => {
  const loc = window.location.search;
  const token = queryString.parse(loc);

  useEffect(() => {
    if (token.refreshToken) {
      setTokenState({
        accessToken: token.token,
        refreshToken: token.refreshToken,
      });
    }
    onGetCurrentUser();
    if (userToken) {
      getAllPersone();
      getAllTasks();
      getAllPresents();
    }
  }, []);

  return (
    <>
      <Switch>
        <Route path="/" exact component={AuthPage} />
        <Route path="/login" exact component={SignInPage} />
        <Route path="/register" component={SiginUpPage} />
        {userToken && (
          <>
            <Layout />
            <PrivateRouter path="/main" exact component={Main} />
            <PrivateRouter path="/presents" exact component={PresentPage} />
            <PrivateRouter
              path="/personeTasks/:name/:gender"
              exact
              component={PersoneTaskPage}
            />
            <PrivateRouter path="/tasks" exact component={TasksPage} />
          </>
        )}
        <Redirect to={'/'} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({
  userToken: state.user.accessToken,
});

const mapDispatchProps = (dispatch) => ({
  setTokenState: (tokens) => dispatch(authOperation.setTokenState(tokens)),
  onGetCurrentUser: () => dispatch(authOperation.getCurrentUser()),
  getAllTasks: () => dispatch(taskOperations.getAllTasks()),
  getAllPresents: () => dispatch(presentOperations.getAllPresents()),
  getAllPersone: () => dispatch(personerenOperation.getPersones()),
});

export default connect(mapStateToProps, mapDispatchProps)(withCookies(App));
