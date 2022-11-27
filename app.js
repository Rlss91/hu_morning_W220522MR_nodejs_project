const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("bizcard:app");
const cors = require("cors");

debug("test");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

/*
    create sub route for api
    url: http://localhost:3030/api
*/
app.use("/api", apiRouter);

//GET http://localhost:3030/
//end point
app.get("/", (req, res) => {
  res.json({ msg: "ok" });
});

//GET http://localhost:3030/new
app.get("/new", (req, res) => {
  res.json({ msg: "ok" });
});

//GET http://localhost:3030/new
app.get("/auth/login", (req, res) => {
  res.json({ msg: "ok" });
});
//GET http://localhost:3030/new
app.get("/auth/register", (req, res) => {
  res.json({ msg: "ok" });
});

module.exports = app;
