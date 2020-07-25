import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, InputBase, Paper, Card } from "@material-ui/core";

import { createRoom, listRooms } from "./api-room";

const Rooms = ({ location }) => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listRooms(signal).then((rooms) => {
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
    createRoom(roomName).then((data) => {
      setRooms([...rooms, data]);
      setRoomName("");
    });
  };

  return (
    <Paper component="form">
      {rooms.map((room, i) => (
        <Card key={i}>
          <Link
            to={{
              pathname: `/room/${room._id}`,
              userName: location.state.userName,
            }}
          >
            {room.name}
          </Link>
        </Card>
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
