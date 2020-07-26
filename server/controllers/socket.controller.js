const Room = require("../models/room.model");
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

module.exports = (io) => {
  return {
    onConnection: async (socket) => {
      const { roomId, token } = socket.handshake.query;

      const { _id } = jwt.decode(token);

      const user = await User.findById({ _id });

      const { users } = await Room.findByIdAndUpdate(
        roomId,
        {
          $push: { users: _id },
        },
        { new: true }
      );

      socket.join(roomId);

      if (users.filter((__id) => __id == _id).length == 1) {
        io.to(roomId).emit("joinRoom", {
          type: "join",
          user,
          date: new Date(),
        });
      }

      const onMessage = (text) => {
        io.to(roomId).emit("newMessage", {
          type: "message",
          text,
          user,
          date: new Date(),
        });
      };

      const onDisconnect = async (msg) => {
        console.log("disconnect: ", msg);

        const { users } = await Room.findById(roomId);
        const ownId = users.filter((__id) => __id == _id);

        await Room.findByIdAndUpdate(roomId, {
          $pull: { users: _id },
        });

        if (ownId.length == 1) {
          io.to(roomId).emit("leaveRoom", {
            type: "leave",
            user,
            date: new Date(),
          });
        } else {
          await Room.findByIdAndUpdate(roomId, {
            $push: { users: { $each: ownId.slice(1) } },
          });
        }
      };

      socket.on("message", onMessage);

      socket.on("disconnect", onDisconnect);

      socket.on("error", (message) => {
        console.log("error: ", message);
      });
    },
  };
};
