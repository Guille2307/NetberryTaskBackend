const { Router } = require("express");
const {
  getTasks,
  getTaskById,
  createTasks,
  updateTasks,
  deleteTasks,
} = require("../controllers/tasks");
const { validateJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.get("/", validateJWT, getTasks);
router.get("/:id", validateJWT, getTaskById);
router.post(
  "/",
  [
    validateJWT,
    check("title", "Debe tener un titulo").not().isEmpty(),
    check("description", "Debe tener una descripción").not().isEmpty(),
    validateFields,
  ],
  createTasks
);
router.patch(
  "/:id",
  [
    validateJWT,
    check("title", "Debe tener un titulo").not().isEmpty(),
    check("description", "Debe tener una descripción").not().isEmpty(),
    validateFields,
  ],
  updateTasks
);
router.delete("/:id", validateJWT, deleteTasks);

module.exports = router;
