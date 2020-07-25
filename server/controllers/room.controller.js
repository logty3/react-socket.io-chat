const Room = require("../models/room.model");

const list = async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms);
};
const create = async (req, res) => {
  console.log(req.body);
  const room = new Room(req.body);
  const result = await room.save();
  res.json(result);
};

const roomById = async (req, res, next, id) => {
  const room = await Room.findById(id);
  if (!room)
    return res.status("400").json({
      error: "Room  not found",
    });
  req.room = room;
  next();
};

const read = (req, res) => {
  return res.json(req.room);
};

module.exports = {
  list,
  create,
  read,
  roomById,
};
