const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validateJWT } = require("../middlewares/validateJWT");
const { fileUpload, returnImage } = require("../controllers/uploads");

const router = Router();

router.use(expressFileUpload());

router.put("/:type/:id", validateJWT, fileUpload);
router.get("/:type/:image", validateJWT, returnImage);

module.exports = router;
