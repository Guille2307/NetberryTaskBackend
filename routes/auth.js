const { Router } = require("express");
const { login, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
