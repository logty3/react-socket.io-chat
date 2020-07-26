import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import Chat from "../chat/Chat";
import MemberList from "./MemberList";

import { openSocket, getRoom } from "./api-room";

import { isAuthenticated } from "../auth/auth-helper";
const Room = () => {
  const { token } = isAuthenticated();

  const { params } = useRouteMatch("/:roomId");

  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [
    {
      socketClose,
      sendMessage,
      subcribeToMessage,
      subcribeToJoin,
      subcribeToLeave,
    },
  ] = useState(() => openSocket(params.roomId, token));

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getRoom(signal, params.roomId, token).then((room) => {
      if (users.error) {
        return history.push("/");
      }

      setUsers(room.users);

      subcribeToJoin(({ user }) => {
        setUsers((users) => [...users, user]);
      });

      subcribeToLeave(({ user }) => {
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
    socketClose();
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

      <Chat
        actions={{
          sendMessage,
          subcribeToMessage,
          subcribeToJoin,
          subcribeToLeave,
        }}
      />
    </div>
  );
};

export default Room;
