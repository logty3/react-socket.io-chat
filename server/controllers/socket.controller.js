module.exports = (io) => {
  return {
    onConnection: (socket) => {
      const { roomId, userName } = socket.handshake.query;

      const onMessage = (text) => {
        io.to(roomId).emit("newMessage", {
          text,
          userName,
          date: new Date(),
        });
      };

      const onDisconnect = (msg) => {
        console.log("disconnect: ", msg);
        io.to(roomId).emit("leaveRoom", { userName, date: new Date() });
      };

      socket.join(roomId);

      io.to(roomId).emit("joinRoom", { userName, date: new Date() });

      socket.on("message", onMessage);

      socket.on("disconnect", onDisconnect);

      socket.on("error", (message) => {
        console.log("error: ", message);
      });
    },
  };
};
