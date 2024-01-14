const { Router } = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");
const cors = require("cors");
const { corsOptions } = require("../cors/corsOption");
const router = Router();

router.get("/", validateJWT, getUsers);

router.post(
  "/",
  cors(corsOptions),
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
  cors(corsOptions),
  [
    validateJWT,
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    validateFields,
  ],
  updateUser
);
router.get("/:id", cors(corsOptions), [validateJWT], getUserById);

router.delete("/:id", cors(corsOptions), validateJWT, deleteUser);

module.exports = router;
