const { response } = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { createJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({ ok: false, msg: "email no encontrado" });
    }
    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "la contraseña no es válida" });
    }
    //Generar token-JWT

    const token = await createJWT(userDB.id);

    res.json({
      ok: true,
      token,
      msg: "Usuario logueado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

module.exports = { login };
