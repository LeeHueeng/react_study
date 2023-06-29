const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    page: Number,
    image: String,
    displayname: String,

    repleNum: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Notice" }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = { Notice };
