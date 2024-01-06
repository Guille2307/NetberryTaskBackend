const User = require("../models/users");
const { response } = require("express");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json({ ok: true, users });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const uniqueEmail = await User.findOne({ email });

    if (uniqueEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    return res.json({ ok: true, user, msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      res.status(404).json({ ok: false, msg: "EL usario no existe" });
    }
    const { email } = req.body;

    if (userDB.email !== email) {
      const uniqueEmail = await User.findOne({ email });
      if (uniqueEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con este email",
        });
      }
    }

    const fields = req.body;
    delete fields.password;

    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });
    res.json({ ok: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error inesperado" });
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({ ok: false, msg: "EL usario no existe" });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      uid,
      msg: "Usuarios borrado correctemente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };