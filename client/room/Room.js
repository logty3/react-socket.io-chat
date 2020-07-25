import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

import Chat from "../chat/Chat";
import MemberList from "./MemberList";

import { openSocket } from "./api-room";

const Room = ({ match, location }) => {
  const [{ socketClose, sendMessage, subcribeToMessage }] = useState(() =>
    openSocket(match.params.roomId, location.userName)
  );

  const leaveRoom = () => {
    socketClose();
  };

  return (
    <div>
      <MemberList />

      <Link
        to={{
          pathname: "/rooms",
          state: {
            userName: location.userName,
          },
        }}
      >
        <Button onClick={leaveRoom}>Leave room </Button>
      </Link>

      <Chat
        roomId={match.params.roomId}
        actions={{ sendMessage, subcribeToMessage }}
      />
    </div>
  );
};

export default Room;
