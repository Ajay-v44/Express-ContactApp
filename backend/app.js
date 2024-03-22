var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var contactRouter = require("./routes/contactRoute");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
var app = express();
connectDb();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// app.engine('hbs',hbs({extname}))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contact", contactRouter);
app.use("/api/user", require("./routes/userRouter"));
app.use("/api/note", require("./routes/noteRouter"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  const status = err.status ? err.status : 500;
  res.status(status);
  res.render("error");
  res.status(status).json({
    error: String(res.locals.error),
  });
});

module.exports = app;
