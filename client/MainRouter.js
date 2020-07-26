import React from "react";
import { Route, Switch } from "react-router-dom";

import Auth from "./auth/Auth";
import Room from "./room/Room";
import Rooms from "./room/Rooms";
import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/:roomId" component={Room} />
        <PrivateRoute path="/" component={Rooms} />
      </Switch>
    </div>
  );
};

export default MainRouter;
