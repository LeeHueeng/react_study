const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userNum: String,
    email: String,
    displayName: String,
    uid: String,
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
