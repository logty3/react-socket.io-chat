const Room = require("../models/room.model");
const User = require("../models/user.model");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./../../config");

module.exports = (io) => {
  return {
    onConnection: async (socket) => {
      const roomId = socket.handshake.query.roomId;
      const token = socket.handshake.query.token;

      try {
        if (!roomId) {
          const err = new Error("RoomId required");
          err.name = "ConnectionError";
          throw err;
        }
        if (!token) {
          const err = new Error("Token required");
          err.name = "ConnectionError";
          throw err;
        }
        const { _id } = await promisify(jwt.verify)(token, JWT_SECRET);

        const user = await User.findById(_id);

        if (!user) {
          const err = new Error("User not found");
          err.name = "MongoError";
          throw err;
        }

        const room = await Room.findByIdAndUpdate(
          roomId,
          {
            $push: { users: _id },
          },
          { new: true }
        );

        if (!room) {
          const err = new Error("Room not found");
          err.name = "MongoError";
          throw err;
        }

        const { users } = room;

        socket.join(roomId);

        if (users.filter((__id) => __id == _id).length == 1) {
          io.to(roomId).emit("joinRoom", {
            type: "join",
            user,
            date: new Date(),
          });
        }

        socket.on("message", (text) => {
          io.to(roomId).emit("newMessage", {
            type: "message",
            text,
            user,
            date: new Date(),
          });
        });

        socket.on("disconnect", async (msg) => {
          console.log("disconnect: ", msg);

          try {
            const room = await Room.findByIdAndUpdate(roomId, {
              $pull: { users: _id },
            });
            if (!room) {
              const err = new Error("Room not found");
              err.name = "MongoError";
              throw err;
            }
            const { users } = room;
            const ownId = users.filter((__id) => __id == _id);

            if (ownId.length == 1) {
              io.to(roomId).emit("leaveRoom", {
                type: "leave",
                user,
                date: new Date(),
              });
            } else {
              const _room = await Room.findByIdAndUpdate(roomId, {
                $push: { users: { $each: ownId.slice(1) } },
              });
              if (!_room) {
                const err = new Error("Room not found");
                err.name = "MongoError";
                throw err;
              }
            }
          } catch (error) {
            switch (error.name) {
              case "MongoError":
                socket.emit("myError", error.message);
                break;
              case "CastError":
                socket.emit("myError", "Room not found");
                break;
              default:
                socket.emit("myError", "Internal server error");
            }
            socket.disconnect();
          }
        });

        socket.on("error", (message) => {
          socket.emit("myError", message);
          socket.disconnect();
        });
      } catch (error) {
        switch (error.name) {
          case "JsonWebTokenError":
            socket.emit("myError", "Token invalid");
            break;
          case "MongoError":
            socket.emit("myError", error.message);
            break;
          case "ConnectionError":
            socket.emit("myError", error.message);
            break;
          case "CastError":
            socket.emit("myError", "Room not found");
            break;
          default:
            console.log(error);
            socket.emit("myError", "Internal server error");
        }
        socket.disconnect();
      }
    },
  };
};
