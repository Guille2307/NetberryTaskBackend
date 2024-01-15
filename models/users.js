const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  task: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = model("User", UserSchema);
