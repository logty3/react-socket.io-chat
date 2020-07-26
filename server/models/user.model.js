const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sockets: [{ socket: Object }],
});

module.exports = mongoose.model("User", UserSchema);
