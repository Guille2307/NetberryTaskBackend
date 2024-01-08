const { Router } = require("express");

const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");
const { getAll, getByCollection } = require("../controllers/search");

const router = Router();

router.get("/:search", validateJWT, getAll);
router.get("/collection/:table/:search", validateJWT, getByCollection);

module.exports = router;
