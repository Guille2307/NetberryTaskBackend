const { response } = require("express");
const Task = require("../models/task");

const getTasks = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;
  const [task, total] = await Promise.all([
    Task.find()
      .populate("createdBy")
      .populate("tags")
      .populate("assignedTo")
      .skip(desde)
      .limit(5),
    Task.countDocuments(),
  ]);
  return res.json({ ok: true, task, total });
};

const getTaskById = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id)
    .populate("createdBy")
    .populate("tags")
    .populate("assignedTo");
  return res.json({ ok: true, task });
};

const createTasks = async (req, res = response) => {
  const uid = req.uid;
  const task = new Task({ createdBy: uid, ...req.body });

  try {
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
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        ok: false,
        message: "Tarea no encontrada",
      });
    }
    const changesTask = {
      ...req.body,
      createdBy: uid,
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
