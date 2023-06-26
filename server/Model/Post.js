const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    page: Number,
    image: String,
    userPage: Number,
    PW: String,
    displayname: String,

    repleNum: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Post" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
