const { Schema, model } = require("mongoose");

const TaskSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    createdBy: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    assignedto: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Task", TaskSchema);
