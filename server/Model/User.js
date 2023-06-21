const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userNum: { type: Number, default: 0 },
    email: String,
    displayName: String,
    uid: String,
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
