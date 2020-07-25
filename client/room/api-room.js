import io from "socket.io-client";

const openSocket = (roomId, userName) => {
  console.log(roomId);
  const socket = io("http://localhost:3000", {
    query: {
      roomId,
      userName,
    },
  });

  const sendMessage = (message) => {
    socket.emit("message", message);
  };

  const subcribeToMessage = (cb) => {
    socket.on("newMessage", (message) => {
      cb(message);
    });
  };

  const socketClose = () => {
    socket.close();
  };

  return { sendMessage, subcribeToMessage, socketClose };
};

const createRoom = async (name) => {
  try {
    const response = await fetch("/api/rooms/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listRooms = async (signal) => {
  try {
    const response = await fetch("/api/rooms/", {
      method: "GET",
      signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { createRoom, listRooms, openSocket };
