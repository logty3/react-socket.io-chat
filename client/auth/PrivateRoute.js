import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./auth-helper";

const PrivateRoute = ({ location, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth",
            state: { from: location.pathname },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
