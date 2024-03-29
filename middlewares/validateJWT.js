const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(200).json({ ok: false, msg: "No existe el token" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, msg: "Token no válido" });
  }
};

module.exports = {
  validateJWT,
};
