const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repleNum: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Notice", timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = { Notice };
