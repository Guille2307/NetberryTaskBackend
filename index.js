require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./DB/config");

const app = express();
app.use(cors());
app.use(express.json());
dbConnection();

app.use("/users", require("./routes/users"));
app.use("/login", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));
app.use("/tags", require("./routes/tags"));
app.use("/search", require("./routes/search"));
app.use("/upload", require("./routes/uploads"));

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
