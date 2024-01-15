const { Router } = require("express");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const { validateJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const cors = require("cors");
const { corsOptions } = require("../cors/corsOption");
const router = Router();

router.get("/", cors(corsOptions), validateJWT, getTasks);
router.get("/:id", cors(corsOptions), validateJWT, getTaskById);
router.post(
  "/",
  cors(corsOptions),
  [
    validateJWT,
    check("title", "Debe tener un titulo").not().isEmpty(),
    check("description", "Debe tener una descripción").not().isEmpty(),
    validateFields,
  ],
  createTask
);
router.patch(
  "/:id",
  cors(corsOptions),
  [
    validateJWT,
    check("title", "Debe tener un titulo").not().isEmpty(),
    check("description", "Debe tener una descripción").not().isEmpty(),
    validateFields,
  ],
  updateTask
);
router.delete("/:id", cors(corsOptions), validateJWT, deleteTask);

module.exports = router;
