require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./DB/config");

const app = express();
app.use(cors());
dbConnection();

app.get("/", (req, res) => {
  return res.json({ ok: true, message: "Hello, world!" });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
