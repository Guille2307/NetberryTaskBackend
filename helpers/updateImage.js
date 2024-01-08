const fs = require("fs");
const User = require("../models/users");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, fileName) => {
  let oldPath = "";
  switch (type) {
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("No es un users por id");
        return false;
      }
      oldPath = `./uploads/users/${user.img}`;
      deleteImage(oldPath);

      user.img = fileName;
      await user.save();
      return true;

    default:
      break;
  }
};

module.exports = {
  updateImage,
};
