const { Schema, model } = require("mongoose");

const TagSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  tasks: {
    type: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
});

module.exports = model("Tag", TagSchema);
