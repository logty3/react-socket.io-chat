import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Room from "./room/Room";
import Rooms from "./room/Rooms";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rooms" component={Rooms} />
        <Route path="/room/:roomId" component={Room} />
      </Switch>
    </div>
  );
};

export default MainRouter;
