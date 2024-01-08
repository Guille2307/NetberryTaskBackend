const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/updateImage");

const fileUpload = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;
  const validType = ["users"];

  if (!validType.includes(type)) {
    res.status(400).json({
      ok: false,
      msg: "no es un users ",
    });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  const file = req.files.image;
  const extentionFile = file.name.split(".");
  const extentionFileName = extentionFile[extentionFile.length - 1];
  const validExtention = ["png", "jpg", "pdf", "jpeg", "gif"];

  if (!validExtention.includes(extentionFileName)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un archivo válido",
    });
  }

  const fileName = `${uuidv4()}.${extentionFileName}`;
  const path = `./uploads/${type}/${fileName}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ ok: false, msg: "Error al mover la imagen" });
    }

    updateImage(type, id, fileName);

    res.json({
      ok: true,
      msg: "Archivo Subido",
      fileName,
    });
  });
};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const image = req.params.image;

  const pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = { fileUpload, returnImage };
