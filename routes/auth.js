const { Router } = require("express");
const { login, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT");
const { corsOptions } = require("../cors/corsOption");
const cors = require("cors");
const router = Router();

router.post(
  "/",
  cors(corsOptions),
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);

router.get("/renew", cors(corsOptions), validateJWT, renewToken);

module.exports = router;
