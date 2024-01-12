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
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    seen: {
      type: Boolean,
    },

    createdBy: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Task", TaskSchema);
