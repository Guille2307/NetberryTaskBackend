const { Router } = require("express");
const {
  getTasks,
  createTasks,
  updateTasks,
  deleteTasks,
} = require("../controllers/tasks");
const { validateJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.get("/", getTasks);
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
router.patch("/:id", updateTasks);
router.delete("/:id", deleteTasks);

module.exports = router;
