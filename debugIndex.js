const express = require("express");
const morgan = require("morgan");
const startUpDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;

// app.set("view engine", "engine");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger("Morgan is Enabled");
}

dbDebugger("Connected to the DB");
app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
