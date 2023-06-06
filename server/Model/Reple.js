const mongoose = require("mongoose");

const repleSchema = new mongoose.Schema(
  {
    reple: String,

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postid: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { collection: "reples" }
);

const Reple = mongoose.model("reple", repleSchema);

module.exports = { Reple };
