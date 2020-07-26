import io from "socket.io-client";

const openSocket = (roomId, token) => {
  const socket = io("http://localhost:3000", {
    query: {
      roomId,
      token,
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

  const subcribeToJoin = (cb) => {
    socket.addEventListener("joinRoom", (user) => {
      cb(user);
    });
  };

  const subcribeToLeave = (cb) => {
    socket.addEventListener("leaveRoom", (user) => {
      cb(user);
    });
  };

  const socketClose = () => {
    socket.close();
  };

  return {
    sendMessage,
    subcribeToMessage,
    socketClose,
    subcribeToJoin,
    subcribeToLeave,
  };
};

const createRoom = async (name, token) => {
  try {
    const response = await fetch("/api/rooms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listRooms = async (signal, token) => {
  try {
    const response = await fetch("/api/rooms/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getRoom = async (signal, roomId, token) => {
  try {
    const response = await fetch(`/api/rooms/${roomId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { createRoom, listRooms, getRoom, openSocket };
