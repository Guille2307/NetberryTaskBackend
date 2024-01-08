const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const {
  getTags,
  getTagById,
  createTags,
  updateTags,
  deleteTags,
} = require("../controllers/tags");

const router = Router();

router.get("/", validateJWT, getTags);
router.get("/:id", validateJWT, getTagById);
router.post(
  "/",
  [
    validateJWT,
    check("name", "Debe tener un nombre").not().isEmpty(),
    check("tasks", "Debe tener una tarea con un id de mongo").isMongoId(),
    validateFields,
  ],
  createTags
);
router.patch(
  "/:id",
  [
    validateJWT,
    check("name", "Debe tener un nombre").not().isEmpty(),
    validateFields,
  ],
  updateTags
);
router.delete("/:id", deleteTags);

module.exports = router;
