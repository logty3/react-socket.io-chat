import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Button, Grid } from "@material-ui/core";

import Chat from "../chat/Chat";
import MemberList from "./MemberList";

import { openSocket, getRoom } from "./api-room";

import { isAuthenticated } from "../auth/auth-helper";
const Room = () => {
  const { token } = isAuthenticated();

  const { params } = useRouteMatch("/:roomId");

  const [users, setUsers] = useState([]);
  const [actions, setActions] = useState({
    sendMessage: () => {},
    subcribeToMessage: () => {},
    subcribeToJoin: () => {},
    subcribeToLeave: () => {},
    socketClose: () => {},
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getRoom(signal, params.roomId, token).then((room) => {
      if (room.error) {
        return console.log(room.error);
      }
      const _actions = openSocket(params.roomId, token);
      setActions(() => _actions);
      setUsers(room.users);

      _actions.subcribeToJoin(({ user }) => {
        setUsers((users) => [...users, user]);
      });

      _actions.subcribeToLeave(({ user }) => {
        setUsers((prevUsers) =>
          prevUsers.filter((_user) => _user._id != user._id)
        );
      });
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const leaveRoom = () => {
    actions.socketClose();
  };

  return (
    <div>
      <Link
        to={{
          pathname: "/",
        }}
      >
        <Button onClick={leaveRoom}>Leave room </Button>
      </Link>

      <MemberList users={users} />

      <Chat actions={actions} />
    </div>
  );
};

export default Room;
