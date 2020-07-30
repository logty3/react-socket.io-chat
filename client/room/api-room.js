import io from "socket.io-client";

const openSocket = (roomId, token) => {
  const socket = io("http://localhost:3000", {
    query: {
      roomId,
      token,
    },
  });

  socket.on("myError", (message) => {
    console.log("myError: " + message);
  });
  socket.on("error", (message) => {
    console.log("error: " + message);
  });
  socket.on("disconnect", (message) => {
    console.log("disconnect: " + message);
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
    if (response.statusText == "Unauthorized") {
      return Promise.resolve({
        error: "Authorization error",
      });
    }
    return await response.json();
  } catch (err) {
    return Promise.resolve({
      error: "Some error",
    });
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

    if (response.statusText == "Unauthorized") {
      return Promise.resolve({
        error: "Authorization error",
      });
    }
    return await response.json();
  } catch (err) {
    return Promise.resolve({
      error: "Some error",
    });
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

    if (response.statusText == "Unauthorized") {
      return Promise.resolve({
        error: "Authorization error",
      });
    }
    return await response.json();
  } catch (err) {
    return Promise.resolve({
      error: "Some error",
    });
  }
};

export { createRoom, listRooms, getRoom, openSocket };
