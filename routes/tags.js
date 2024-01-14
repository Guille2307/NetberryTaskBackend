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
const cors = require("cors");
const { corsOptions } = require("../cors/corsOption");
const router = Router();

router.get("/", cors(corsOptions), validateJWT, getTags);
router.get("/:id", cors(corsOptions), validateJWT, getTagById);
router.post(
  "/",
  cors(corsOptions),
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
  cors(corsOptions),
  [
    validateJWT,
    check("name", "Debe tener un nombre").not().isEmpty(),
    validateFields,
  ],
  updateTags
);
router.delete("/:id", cors(corsOptions), deleteTags);

module.exports = router;
