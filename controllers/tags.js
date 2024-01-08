const { response } = require("express");
const Tag = require("../models/tag");
const Task = require("../models/task");

const getTags = async (req, res = response) => {
  const tags = await Tag.find().populate("tasks");
  return res.json({ ok: true, tags });
};

const getTagById = async (req, res) => {
  const id = req.params.id;
  const tag = await Tag.findById(id).populate("tasks");
  return res.json({ ok: true, tag });
};

const createTags = async (req, res = response) => {
  const tag = new Tag(req.body);

  try {
    const uniqueName = await Tag.findOne({ name: tag.name });

    if (uniqueName) {
      return res.status(400).json({
        ok: false,
        msg: "El tag ya está registrado",
      });
    }

    const task = await Task.findById(tag.tasks);

    const addTag = await Task.findByIdAndUpdate(task, {
      $push: { tags: tag.id },
    });
    await tag.save();

    return res.json({ ok: true, tag });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Hable con el Administrador" });
  }
};
const updateTags = async (req, res = response) => {
  const id = req.params.id;
  const tag = await Tag.findById(id);
  if (!tag) {
    return res.status(404).json({ ok: false, message: "No exite este tag" });
  }
  const changeTag = req.body;
  const updatedTag = await Tag.findByIdAndUpdate(id, changeTag, { new: true });
  return res.json({ ok: true, message: "updateTags", updatedTag });
};

// Para efectos del proyecto no se utilizará
// este endpoint pero queda aquí para de ser necesario hacer uso del mismo

const deleteTags = (req, res = response) => {
  return res.json({ ok: true, message: "deleteTags" });
};

module.exports = { getTags, getTagById, createTags, updateTags, deleteTags };
