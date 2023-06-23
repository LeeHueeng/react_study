const mongoose = require("mongoose");

const repleSchema = new mongoose.Schema(
  {
    reple: String,

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { collection: "reples" }
);

const Reple = mongoose.model("reple", repleSchema);

module.exports = { Reple };
