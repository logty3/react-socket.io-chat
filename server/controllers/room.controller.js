const Room = require("../models/room.model");

const list = async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms);
};
const create = async (req, res) => {
  const room = new Room(req.body);
  try {
    const result = await room.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const roomById = async (req, res, next, id) => {
  try {
    const room = await Room.findById(id).populate("users", "_id name");

    if (!room)
      return res.status("404").json({
        error: "Room not found",
      });
    req.room = room;
    next();
  } catch (error) {
    return res.status("404").json({
      error: "Room not found",
    });
  }
};

const read = (req, res) => {
  return res.json({ ...req.room, users: [...new Set(req.room.users)] });
};

module.exports = {
  list,
  create,
  read,
  roomById,
};
