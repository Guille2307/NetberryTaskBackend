const { response } = require("express");
const Task = require("../models/task");
const User = require("../models/users");

const getTasks = async (req, res = response) => {
  const [task, total] = await Promise.all([
    Task.find().populate("createdBy").populate("tags").populate("assignedTo"),

    Task.countDocuments(),
  ]);
  return res.json({ ok: true, task, total });
};

const getTaskById = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  const task = await Task.findById(id)
    .populate("createdBy")
    .populate("tags")
    .populate("assignedTo");
  const seenTas = await Task.findByIdAndUpdate(
    id,
    { seen: true },
    { new: true }
  );
  return res.json({ ok: true, seenTas });
};

const createTasks = async (req, res = response) => {
  const uid = req.uid;
  const task = new Task({ createdBy: uid, seen: false, ...req.body });
  const assignedTo = req.body.assignedTo;

  try {
    const addTaskToUser = await User.findByIdAndUpdate(assignedTo, {
      $push: { task: task },
    });

    await task.save();
    return res.json({ ok: true, task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Hable con el Administrador" });
  }
};

const updateTasks = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  const assignedTo = req.body.assignedTo;
  try {
    const task = await Task.findById(id);

    const addTaskToUser = await User.findByIdAndUpdate(assignedTo, {
      $push: { task: task },
    });
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

    const updateTask = await Task.findByIdAndUpdate(id, changesTask, {
      new: true,
    });

    return res.json({ ok: true, id, message: "Updated Task", updateTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Hable con el Administrador",
    });
  }
};

const deleteTasks = async (req, res = response) => {
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
  createTasks,
  updateTasks,
  deleteTasks,
};
