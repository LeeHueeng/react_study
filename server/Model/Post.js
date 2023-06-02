const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
    auther: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { colletion: "Posts" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
