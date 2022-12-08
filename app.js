const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const debug = require("debug")("bizcard:app");
const cors = require("cors");
const helmet = require("helmet");

const logger = require("./config/winston");
// debug("test");

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: logger.stream.write }));
// app.use(logger("dev"));
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
app.use("/api/*", (req, res) => {
  throw new Error("error thrown navigate to");
});
app.use((err, req, res, next) => {
  global.logger.error({
    method: req.method,
    error: err.message,
    url: req.originalUrl,
  });
  next(err);
});

/* React */
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// //GET http://localhost:3030/
// //end point
// app.get("/", (req, res) => {
//   res.json({ msg: "ok" });
// });

// //GET http://localhost:3030/new
// app.get("/new", (req, res) => {
//   res.json({ msg: "ok" });
// });

// //GET http://localhost:3030/new
// app.get("/auth/login", (req, res) => {
//   res.json({ msg: "ok" });
// });
// //GET http://localhost:3030/new
// app.get("/auth/register", (req, res) => {
//   res.json({ msg: "ok" });
// });

module.exports = app;
