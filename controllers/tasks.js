const { response } = require("express");
const Task = require("../models/task");
const User = require("../models/users");

const getTasks = async (req, res = response) => {
  let searchParams = {};
  const assignedTo = req.query.assignedTo;
  if (assignedTo) {
    searchParams.assignedTo = assignedTo;
  }
  const tasks = await Task.find(searchParams)
    .populate("createdBy")
    .populate("tags")
    .populate("assignedTo");

  return res.json({ ok: true, tasks });
};

const getTaskById = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  const task = await Task.findById(id)
    .populate("createdBy")
    .populate("tags")
    .populate("assignedTo");
  await Task.findByIdAndUpdate(id, { seen: true }, { new: true });
  return res.json({ ok: true, task });
};

const createTask = async (req, res = response) => {
  const uid = req.uid;
  const task = new Task({ createdBy: uid, seen: false, ...req.body });
  try {
    await task.save();
    return res.json({ ok: true, task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Hable con el Administrador" });
  }
};

const updateTask = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const task = await Task.findById(id);
    const user = await User.findById(uid);

    console.log(task, user);
    if (task.assignedTo !== user._id) {
      task.assignedTo = user;
      task.save();
    } else {
      return res.status(400).json({
        ok: false,
        message: "La tares ya esta asignada a este usuario",
      });
    }

    if (!task) {
      return res.status(404).json({
        ok: false,
        message: "Tarea no encontrada",
      });
    }
    const changesTask = {
      ...req.body,
      createdBy: uid,
      seen: true,
    };

    const updatedTask = await Task.findByIdAndUpdate(id, changesTask, {
      new: true,
    });
    return res.json({
      ok: true,
      id,
      message: "Updated Task",
      updatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Hable con el Administrador",
    });
  }
};

const deleteTask = async (req, res = response) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        ok: false,
        message: "Tarea no encontrada",
      });
    }

    await Task.findByIdAndDelete(id);

    return res.json({ ok: true, id, message: "Deleted Task" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Hable con el Administrador",
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
