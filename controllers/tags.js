const { response } = require("express");

const getTags = (req, res = response) => {
  return res.json({ ok: true, message: "getTags" });
};
const createTags = (req, res = response) => {
  return res.json({ ok: true, message: "createTags" });
};
const updateTags = (req, res = response) => {
  return res.json({ ok: true, message: "updateTags" });
};
const deleteTags = (req, res = response) => {
  return res.json({ ok: true, message: "deleteTags" });
};

module.exports = { getTags, createTags, updateTags, deleteTags };
