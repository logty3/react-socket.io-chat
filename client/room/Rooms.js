import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button, InputBase, Paper, Typography } from "@material-ui/core";

import { createRoom, listRooms } from "./api-room";

import { isAuthenticated } from "../auth/auth-helper";

const Rooms = () => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  const { token } = isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listRooms(signal, token).then((rooms) => {
      setRooms(rooms);
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const handleChange = (event) => {
    setRoomName(event.target.value);
  };

  const addRoom = () => {
    createRoom(roomName, token).then((data) => {
      setRooms([...rooms, data]);
      setRoomName("");
    });
  };

  return (
    <Paper component="form">
      {rooms.map((room, i) => (
        <div key={i}>
          <Link
            to={{
              pathname: `/${room._id}`,
            }}
          >
            <Button>
              <Typography>{room.name}</Typography>
            </Button>
          </Link>
          <br />
        </div>
      ))}

      <InputBase
        onChange={handleChange}
        value={roomName}
        placeholder="Room name"
      />
      <Button onClick={addRoom}>CREATE</Button>
    </Paper>
  );
};

export default Rooms;
