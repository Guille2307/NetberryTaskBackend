const { Router } = require("express");
const cors = require("cors");
const { corsOptions } = require("../cors/corsOption");
const { validateJWT } = require("../middlewares/validateJWT");
const { getAll, getByCollection } = require("../controllers/search");

const router = Router();

router.get("/:search", cors(corsOptions), validateJWT, getAll);
router.get(
  "/collection/:table/:search",
  cors(corsOptions),
  validateJWT,
  getByCollection
);

module.exports = router;
