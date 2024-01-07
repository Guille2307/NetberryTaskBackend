const { Router } = require("express");

const {
  getTags,
  createTags,
  updateTags,
  deleteTags,
} = require("../controllers/tags");

const router = Router();

router.get("/", getTags);
router.post("/", createTags);
router.patch("/:id", updateTags);
router.delete("/:id", deleteTags);

module.exports = router;
