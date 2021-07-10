import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { navigation } from "./nav/navigation";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";

function App() {
  const { token } = useSelector((state) => state.session);
  const RouteLogin = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: navigation.redirect,
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
  const RouteNoLogin = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        !token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: navigation.home, state: { from: props.location } }}
            />
          )
      }
    />
  );
  const RoutePresentPage = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: navigation.redirect,
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
  const PrivateTasksPage = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: navigation.redirect,
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
  return (
    <div>
      <Switch>
        <RouteLogin path={navigation.home} component={Main} />
        <RouteNoLogin path={navigation.login} component={Login} />
        <RoutePresentPage path="/presents" component={Main} />
        <PrivateTasksPage path="/tasks" exact component={Main} />
        <Redirect to={navigation.login} />
      </Switch>
    </div>
  );
}

export default App;
