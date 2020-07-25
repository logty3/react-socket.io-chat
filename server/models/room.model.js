const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      name: { type: String, required: true },
    },
  ],
});

module.exports = model("Room", schema);
