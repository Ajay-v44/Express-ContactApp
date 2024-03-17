const mongoose = require("mongoose");
const userschema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the  email"],
      unique: [true, "Email address already take"],
    },
    password: {
      type: String,
      required: [true, "Please add the  passwprd"],
    },
  },
  {
    timeStamps: true,
  }
);
module.exports = mongoose.model("users", userschema);
