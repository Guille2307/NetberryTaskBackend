const { Router } = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    validateFields,
  ],
  updateUser
);

router.delete("/:id", deleteUser);

module.exports = router;