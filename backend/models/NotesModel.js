const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
  },
  {
    timeStamps: true,
  }
);
module.exports = mongoose.model("note", noteSchema);
