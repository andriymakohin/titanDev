import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.user.accessToken,
});

export default connect(mapStateToProps)(PrivateRoute);
