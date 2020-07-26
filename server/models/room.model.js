const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [{ type: Schema.ObjectId, ref: "User" }],
});

module.exports = model("Room", schema);
