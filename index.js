require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");

app.use(cors());
const routes = require("./routes/routes");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(routes);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});
app.use(morgan("tiny"));
app.listen(80, () => {
  console.log("Server is running on port 80");
});
mongoose
  .connect("mongodb://127.0.0.1:27017/newdatabase")
  .then(() => {
    console.log('Connected to database by the name of "newdatabase"');
  })
  .catch((error) => {
    console.log("Connection failed"), console.log(error);
  });

module.exports = app;
