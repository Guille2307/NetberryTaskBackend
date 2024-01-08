const User = require("../models/users");
const Task = require("../models/task");
const Tag = require("../models/tag");

const getAll = async (req, res) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  const [users, tasks, tags] = await Promise.all([
    User.find({ name: regex }),
    Task.find({ title: regex }),
    Tag.find({ name: regex }),
  ]);

  return res.json({ ok: true, users, tasks, tags });
};

const getByCollection = async (req, res) => {
  const search = req.params.search;
  const table = req.params.table;
  const regex = new RegExp(search, "i");
  let data = [];

  switch (table) {
    case "users":
      data = await User.find({ name: regex }).populate("task");
      break;
    case "tasks":
      data = await Task.find({ title: regex })
        .populate("tags")
        .populate("createdBy")
        .populate("assignedTo");

      break;
    case "tags":
      data = await Tag.find({ name: regex }).populate("tasks");
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "las tablas deben de ser users/tasks/tags",
      });
  }

  return res.json({ ok: true, response: data });
};

module.exports = { getAll, getByCollection };
