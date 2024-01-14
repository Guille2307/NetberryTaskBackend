const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validateJWT } = require("../middlewares/validateJWT");
const { fileUpload, returnImage } = require("../controllers/uploads");
const cors = require("cors");
const { corsOptions } = require("../cors/corsOption");
const router = Router();

router.use(expressFileUpload());

router.put("/:type/:id", cors(corsOptions), validateJWT, fileUpload);
router.get("/:type/:image", cors(corsOptions), validateJWT, returnImage);

module.exports = router;
