const { response } = require("express");
const Task = require("../models/task");

const getTasks = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;
  const [task, total] = await Promise.all([
    Task.find().populate("createdBy").populate("tags").skip(desde).limit(5),
    Task.countDocuments(),
  ]);
  return res.json({ ok: true, task, total });
};

const getTaskById = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id).populate("createdBy").populate("tags");
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
const updateTasks = (req, res = response) => {
  return res.json({ ok: true, message: "updateTasks" });
};
const deleteTasks = (req, res = response) => {
  return res.json({ ok: true, message: "deleteTasks" });
};

module.exports = {
  getTasks,
  getTaskById,
  createTasks,
  updateTasks,
  deleteTasks,
};
