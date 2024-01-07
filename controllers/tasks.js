const { response } = require("express");
const Task = require("../models/task");

const getTasks = (req, res = response) => {
  return res.json({ ok: true, message: "getTasks" });
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

module.exports = { getTasks, createTasks, updateTasks, deleteTasks };
