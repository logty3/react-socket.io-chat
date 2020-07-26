import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./auth-helper";

const PrivateRoute = ({ location, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location.pathname },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
