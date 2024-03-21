const express = require("express");
const products = require("./routes/products");
const home = require("./routes/home");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const fs = require("fs");
const { log, auth, logger } = require("./middleware/middlewareIndex");

// console.log(process.env.app_password);
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // default

// Configration
// console.log("Application name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}

app.use(express.json()); // parse the body of req
// app.use(express.urlencoded({ extended: true })); // parse the incoming req with url encoded payloads --> key=value&key=value--> req.body--> json

// console.log(`NODE_ENV ${process.env.NODE_ENV}`); // undefined
// console.log(`app: ${app.get("env")}`); // by default developement

// app.use(express.static("public")); // serves the static files like css or text files

app.use(logger);

app.use(helmet());
app.use(log);
app.use(auth);
app.use("/api/products", products);
app.use("/", home);

// app.post();
// app.put();
// app.patch();
// app.delete();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Listening to the port " + port));
