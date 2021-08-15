import React from 'react';

import navigation from './navigation';
import { Switch, Route, Redirect } from 'react-router-dom';

function AuthPageNavigation() {
  return (
    <Switch>
      {/* <Route path={navigation.login.path} component={navigation.login.component} />} /> */}
      <Route
        path={navigation.register.path}
        component={navigation.register.component}
      />
      <Route
        path={navigation.auth.path}
        component={navigation.auth.component}
      />
      <Redirect to={navigation.auth.path} />
    </Switch>
  );
}

export default AuthPageNavigation;
